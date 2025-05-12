import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { registerApiSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = registerApiSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create new user
    const newUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email.toLowerCase(),
      password: body.password, // Will be hashed by the pre-save hook
    });
    
    await newUser.save();
    
    // Return success response (without sensitive data)
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { message: 'Internal server error', error: errorMessage },
      { status: 500 }
    );
  }
}
