'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Gem, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import { loginAction } from '@/actions/authActions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginFormData, loginSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      const result = await loginAction(data);
      if (result.success) {
        toast.success('Login bem-sucedido!');
        router.push('/dashboard/products');
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Gem className="mx-auto h-8 w-8 text-cyan-500" />
        <CardTitle className="text-2xl text-center">Bem vindo</CardTitle>
        <CardDescription className="text-cyan-600 text-center">
          Entre com seu e-mail mais brilhante e senha para acessar o painel de
          gerenciamento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Entrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
