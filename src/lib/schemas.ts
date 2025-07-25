import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const productSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  price: z.coerce.number().positive('O preço deve ser um número positivo.'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  category: z.string().min(3, 'A categoria é obrigatória.'),
  image: z.string().url('Por favor, insira uma URL de imagem válida.'),
});

export type ProductFormData = z.infer<typeof productSchema>;
