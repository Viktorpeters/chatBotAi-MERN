import { object, string } from 'zod';
export const signUpSchema = object({
    body: object({
        name: string({ required_error: 'name is required' }),
        email: string({ required_error: 'email is required' }).email(),
        password: string({ required_error: 'password is required' }).min(6, 'invalid password length')
    })
});
export const signInSchema = object({
    body: object({
        email: string({ required_error: 'email is required' }),
        password: string({ required_error: 'password is required' })
    })
});
//# sourceMappingURL=user-schema.js.map