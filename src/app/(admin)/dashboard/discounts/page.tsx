'use client';

import React, { useState } from 'react';

import { CouponCard } from '@/components/coupons/CouponCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCoupons } from '@/hooks/useCoupons';

export default function DiscountsPage() {
  const { coupons, isLoading, addCoupon, updateCoupon, deleteCoupon } =
    useCoupons();
  const [newCouponCode, setNewCouponCode] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon(newCouponCode);
    setNewCouponCode('');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Gerenciar cupons de desconto</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cadastrar Novo Cupom</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCoupon} className="flex items-center gap-4">
            <Input
              placeholder="Ex: PROMO10"
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Cupons Ativos</h2>
        {isLoading ? (
          <LoadingSpinner text="Carregando cupons..." />
        ) : coupons.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onUpdate={updateCoupon}
                onDelete={deleteCoupon}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nenhum cupom cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
