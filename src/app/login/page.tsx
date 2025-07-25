import Image from 'next/image';

import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="absolute inset-0 -z-10 lg:relative lg:z-auto">
        <Image
          src="https://images.unsplash.com/photo-1731533621957-d33e6939ae9e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Diamantes azuis sobre uma superfície escura"
          fill
          priority
          className="w-full h-auto object-cover"
        />

        <div className="absolute inset-0 bg-black/70 lg:bg-black/30" />

        <div className="hidden lg:block absolute bottom-8 left-8 right-8 text-center text-white">
          <h2 className="text-2xl font-semibold">Bem-vindo de volta!</h2>
          <p className="mt-2 text-sm">
            Mantenha seu negócio sob controle com Diamond Management.
          </p>
        </div>
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 p-4 lg:bg-gray-900">
        <div className="flex flex-col items-center w-full max-w-md">
          <LoginForm />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Diamond Management. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
