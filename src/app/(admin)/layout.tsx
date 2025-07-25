import React from 'react';

import { AdminHeader } from '@/components/layout/header/AdminHeader';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import { ProductsProvider } from '@/context/productContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductsProvider>
      <div className="relative w-full">
        <Sidebar />
        <div className="flex flex-col">
          <AdminHeader />
          <main className="p-4 md:p-8 md:pl-[240px] lg:pl-[300px]">
            {children}
          </main>
        </div>
      </div>
    </ProductsProvider>
  );
}
