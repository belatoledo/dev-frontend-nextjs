'use server';

import { loginSchema, LoginFormData } from '@/lib/schemas';

export async function loginAction(data: LoginFormData) {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: 'Dados inválidos.' };
  }

  const AUTH_EMAIL = 'admin@diamond.com';
  const AUTH_PASSWORD = 'store123';

  if (
    validation.data.email === AUTH_EMAIL &&
    validation.data.password === AUTH_PASSWORD
  ) {
    return { success: true };
  }

  return { success: false, error: 'Credenciais inválidas.' };
}
