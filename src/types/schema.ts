import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters long',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters long',
    }),
    address: z.string().min(1, {
      message: 'Address is required',
    }),
    dob: z.date({
      required_error: 'Date of birth is required',
    }),
    gender: z.enum(['male', 'female', 'other']),
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    city: z.string().min(1, {
      message: 'City is required',
    }),
    state: z.string().min(1, {
      message: 'State is required',
    }),
    postalCode: z.string().min(1, {
      message: 'Postal code is required',
    }),
    ssn: z.string().min(1, {
      message: 'SSN is required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
