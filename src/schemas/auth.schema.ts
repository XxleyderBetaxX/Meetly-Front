import { z } from 'zod';

/**
 * Login Form Validation Schema
 * Uses Zod for type-safe validation with custom error messages
 */
export const loginSchema = z.object({
  email: z
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

/**
 * Type inference from the schema
 * Automatically generates TypeScript types from Zod schema
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Registration Form Validation Schema
 * Comprehensive validation for user registration with all field constraints
 */
export const registrationSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),

  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address format'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),

  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
);

/**
 * Type inference from the registration schema
 */
export type RegistrationFormData = z.infer<typeof registrationSchema>;