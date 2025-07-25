import React from 'react';

import { ProductsProvider } from '@/context/useProduct';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductsProvider>{children}</ProductsProvider>;
}
