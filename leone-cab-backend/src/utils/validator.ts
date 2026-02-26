import { z } from 'zod';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),

  phone: z.string().refine(
    (value) => {
      try {
        const number = phoneUtil.parse(value, 'SL');
        return phoneUtil.isValidNumber(number);
      } catch {
        return false;
      }
    },
    {
      message: 'Ungültige Telefonnummer',
    },
  ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginValidate = (req: any, res: any) => {
  const result = req.body['phone']
    ? registerSchema.safeParse(req.body)
    : loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: result.error.flatten(),
    });
  }
};
