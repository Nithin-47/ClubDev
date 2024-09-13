

import * as z from 'zod'; 

const MAX_UPLOAD_SIZE = 1024 * 1024 * 200; 
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),

}).superRefine(({confirmPassword,password},ctx) => {
    
    if(password !== confirmPassword){
        ctx.addIssue({
            code:"custom",
            message:"Passwords do not match",
            path:["confirmPassword"]
        });

    }
});


export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),

});


export const CreateClubSchema = z.object({
    name: z.string().min(3, {
        message: 'Club name must be at least 3 characters long'
    }),
    shortDescription: z.string().min(3, {
        message: 'Description must be at least 3 characters long'
    }),
    longDescription: z.string().min(3, {
        message: 'Description must be at least 3 characters long'
    }),
    image: z
    .instanceof(File)
    ,
    contact: z.string().min(3, {
        message: 'Contact must be at least 3 characters long'
    }),

});