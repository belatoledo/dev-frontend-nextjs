'use client';

import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserData {
  name: string;
  lastName: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

const mockUserData: UserData = {
  name: 'Jurandir',
  lastName: 'Silva',
  cpfCnpj: '123.456.789-00',
  email: 'admin@diamond.com',
  phone: '(31) 99999-9999',
  avatarUrl: 'https://github.com/shadcn.png',
};

export default function AccountPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Minha Conta</h1>
      <Card>
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={mockUserData.avatarUrl} alt="Avatar do usuário" />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Olá, {mockUserData.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={`${mockUserData.name} ${mockUserData.lastName}`}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
            <Input id="cpfCnpj" value={mockUserData.cpfCnpj} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={mockUserData.email}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" type="tel" value={mockUserData.phone} readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
