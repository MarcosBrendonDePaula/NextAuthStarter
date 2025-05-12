import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { profileUpdateSchema } from '@/lib/validations';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const result = profileUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Check if email is already taken by another user
    if (body.email !== session.user.email) {
      const existingUser = await User.findOne({
        email: body.email.toLowerCase(),
        _id: { $ne: session.user.id },
      });
      
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already taken by another user' },
          { status: 409 }
        );
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email.toLowerCase(),
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return success response (without sensitive data)
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error: unknown) {
    console.error('Profile update error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { message: 'Internal server error', error: errorMessage },
      { status: 500 }
    );
  }
}
