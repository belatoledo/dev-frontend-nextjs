'use client';

import { useState, useEffect } from 'react';

import { toast } from 'sonner';

export interface Coupon {
  id: string;
  code: string;
}

const LOCAL_STORAGE_KEY = 'coupons_list';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCoupons = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedCoupons) {
        setCoupons(JSON.parse(storedCoupons));
      }
    } catch (error) {
      console.error('Falha ao carregar cupons do localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(coupons));
    } catch (error) {
      console.error('Falha ao salvar cupons no localStorage', error);
    }
  }, [coupons]);

  const addCoupon = (code: string) => {
    if (!code.trim()) {
      toast.error('O código do cupom não pode estar vazio.');
      return;
    }
    if (coupons.some((c) => c.code.toLowerCase() === code.toLowerCase())) {
      toast.error('Este cupom já existe.');
      return;
    }

    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: code.toUpperCase(),
    };
    setCoupons((prev) => [...prev, newCoupon]);
    toast.success(`Cupom "${newCoupon.code}" adicionado!`);
  };

  const updateCoupon = (id: string, newCode: string) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === id ? { ...coupon, code: newCode.toUpperCase() } : coupon
      )
    );
    toast.success('Cupom atualizado com sucesso!');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
    toast.success('Cupom removido com sucesso!');
  };

  return { coupons, isLoading, addCoupon, updateCoupon, deleteCoupon };
};
