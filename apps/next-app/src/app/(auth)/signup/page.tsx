'use client'

import { useState } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Zivelle
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-gray-400">
            Join Zivelle and discover your unique style.
          </p>
        </div>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">
                  First name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Create account
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-white hover:text-gray-300 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;