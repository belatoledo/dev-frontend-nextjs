'use client';

import { useState } from 'react';

import { ActionsDropdown } from '@/components/shared/ActionsDropdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Coupon } from '@/hooks/useCoupons';

type CouponCardProps = {
  coupon: Coupon;
  onUpdate: (id: string, newCode: string) => void;
  onDelete: (id: string) => void;
};

export const CouponCard = ({ coupon, onUpdate, onDelete }: CouponCardProps) => {
  const [editedCode, setEditedCode] = useState(coupon.code);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleUpdate = () => {
    onUpdate(coupon.id, editedCode);
    setIsEditDialogOpen(false);
  };

  return (
    <Card className="relative mb-4 sm:w-full md:w-56 h-28">
      <div className="flex h-full items-center justify-center">
        <h3 className="text-2xl text-cyan-500 font-bold tracking-wider break-all text-center px-2">
          {coupon.code}
        </h3>
      </div>

      <div className="absolute top-2 right-2">
        <ActionsDropdown>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Cupom</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  value={editedCode}
                  onChange={(e) => setEditedCode(e.target.value.toUpperCase())}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleUpdate}>Salvar Alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                Excluir
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="grid gap-4 py-6">
              <DialogHeader className="mt-2">
                <DialogTitle>Você tem certeza?</DialogTitle>
                <DialogDescription className="mt-2">
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente
                  o cupom <strong>{coupon.code}</strong>.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={() => onDelete(coupon.id)}>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ActionsDropdown>
      </div>
    </Card>
  );
};
