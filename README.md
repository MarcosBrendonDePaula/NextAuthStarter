<div align="center">

# 🔐 NextAuth Starter Template

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.15-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <!-- Replace with an actual screenshot of your application -->
  <img src="https://via.placeholder.com/1200x600?text=NextAuth+Starter+Template" alt="NextAuth Starter Template" width="800" />
</p>

<p align="center">
  A complete authentication solution for Next.js applications with MongoDB integration and beautiful UI.
</p>

[Features](#features) • [Demo](#demo) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Customization](#customization) • [Contributing](#contributing) • [License](#license)

</div>

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <h3>🔐 Authentication</h3>
        <ul align="left">
          <li>User registration with validation</li>
          <li>Login with credentials</li>
          <li>Protected routes with middleware</li>
          <li>Session management</li>
          <li>Password encryption with bcrypt</li>
        </ul>
      </td>
      <td align="center" width="33%">
        <h3>👤 User Management</h3>
        <ul align="left">
          <li>Beautiful profile page</li>
          <li>Profile information update</li>
          <li>Avatar generation</li>
          <li>Account security settings</li>
        </ul>
      </td>
      <td align="center" width="33%">
        <h3>🎨 UI/UX</h3>
        <ul align="left">
          <li>Responsive design</li>
          <li>Modern form styling</li>
          <li>Tailwind CSS components</li>
          <li>Loading states and animations</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center" width="33%">
        <h3>🗄️ Database</h3>
        <ul align="left">
          <li>MongoDB integration</li>
          <li>Mongoose ODM</li>
          <li>Docker Compose setup</li>
          <li>Data validation with Zod</li>
        </ul>
      </td>
      <td align="center" width="33%">
        <h3>🛠️ Development</h3>
        <ul align="left">
          <li>Next.js 15 with App Router</li>
          <li>React 19 with latest features</li>
          <li>TypeScript for type safety</li>
          <li>React Hook Form for validation</li>
          <li>Turbopack for fast development</li>
        </ul>
      </td>
      <td align="center" width="33%">
        <h3>🚀 Deployment</h3>
        <ul align="left">
          <li>Docker ready</li>
          <li>Environment configuration</li>
          <li>Production optimizations</li>
          <li>Easy deployment to Vercel</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 🎮 Demo

<div align="center">
  <table>
    <tr>
      <td align="center" width="100%">
        <p><strong>Main Interface</strong></p>
        <!-- Replace with actual screenshot of your application -->
        <img src="https://via.placeholder.com/600x400?text=Main+Interface" alt="Main Interface" width="100%" />
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <p><strong>Authentication</strong></p>
        <!-- Replace with actual screenshot of your authentication page -->
        <img src="https://via.placeholder.com/600x400?text=Authentication" alt="Authentication" width="100%" />
      </td>
      <td align="center" width="50%">
        <p><strong>Profile Management</strong></p>
        <!-- Replace with actual screenshot of your profile page -->
        <img src="https://via.placeholder.com/600x400?text=Profile+Management" alt="Profile Management" width="100%" />
      </td>
    </tr>
  </table>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for MongoDB)

### Environment Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/nextauth-starter.git
   cd nextauth-starter
   ```

2. Copy the `.env.example` file to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

3. Update the following environment variables in the `.env` file:
   ```
   NEXTAUTH_SECRET=your-secret-key-change-this-in-production
   MONGODB_URI=mongodb://admin:password@localhost:27017/nextauth-starter?authSource=admin
   NEXTAUTH_URL=http://localhost:3000
   ```

### Running the Application

1. Start the MongoDB database using Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server with Turbopack:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
├── docker-compose.yml    # Docker Compose configuration for MongoDB
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication API routes
│   │   │   └── user/     # User API routes
│   │   ├── auth/         # Authentication pages
│   │   └── profile/      # User profile page
│   ├── components/       # React components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   └── SessionProvider.tsx # NextAuth session provider
│   ├── lib/              # Utility functions
│   │   ├── mongodb.ts    # MongoDB connection utility
│   │   └── validations.ts # Zod validation schemas
│   ├── models/           # Mongoose models
│   │   └── User.ts       # User model
│   └── types/            # TypeScript type definitions
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
├── next.config.ts        # Next.js configuration
└── .env                  # Environment variables
```

## 🔄 Authentication Flow

<div align="center">
  <!-- Replace with actual diagram of your authentication flow -->
  <img src="https://via.placeholder.com/800x400?text=Authentication+Flow" alt="Authentication Flow" width="800" />
</div>

1. **Registration**: Users can create an account with email, first name, last name, and password.
2. **Login**: Users can sign in with their email and password.
3. **Session Management**: NextAuth.js handles session creation and validation.
4. **Profile Management**: Authenticated users can view and update their profile information.
5. **Protected Routes**: Middleware ensures certain routes are only accessible to authenticated users.

## 🎨 UI Features

### Responsive Design

All pages are fully responsive and work well on:
- Mobile devices
- Tablets
- Desktop computers

### Modern UI Components

- Beautiful form inputs with icons
- Show/hide password toggles
- Loading states and animations
- Toast notifications for success/error messages
- Avatar generation based on user initials

## 🛠️ Customization

This template is designed to be a starting point for your application. You can customize it by:

- Adding additional models for your application's data
- Creating new API routes for your application's functionality
- Extending the user model with additional fields
- Adding more authentication providers (Google, GitHub, etc.)
- Customizing the UI to match your brand

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style of the project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📦 Dependencies

### Main Dependencies
- Next.js 15.2.4
- React 19.0.0
- NextAuth.js 4.24.11
- MongoDB 6.15.0
- Mongoose 8.13.2
- Tailwind CSS 4.0
- TypeScript 5
- React Hook Form 7.55.0
- Zod 3.24.2
- bcryptjs 3.0.2

### Development Dependencies
- ESLint 9
- Tailwind CSS PostCSS 4

---

<div align="center">

Made with ❤️ by [Your Name](https://github.com/your-username)

Star ⭐ this repository if you find it useful!

</div>
