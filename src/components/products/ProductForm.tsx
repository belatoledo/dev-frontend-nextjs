'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import {
  createProductAction,
  updateProductAction,
} from '@/actions/productActions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProducts } from '@/context/productContext';
import { productSchema, ProductFormData } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

type ProductFormProps = {
  initialData?: ProductFormData;
  productId?: number;
};

export const ProductForm = ({ initialData, productId }: ProductFormProps) => {
  const { addProduct, updateProduct } = useProducts();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isEditMode = !!productId;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: ProductFormData) => {
    startTransition(async () => {
      try {
        const action = isEditMode
          ? updateProductAction(productId, data)
          : createProductAction(data);

        const result = await action;

        if (result.success && result.product) {
          toast.success(isEditMode ? 'Produto atualizado!' : 'Produto criado!');

          if (isEditMode) {
            updateProduct(result.product);
          } else {
            addProduct(result.product);
          }

          router.push('/dashboard/products');
        } else {
          toast.error(result.error || 'Ocorreu um erro.');
        }
      } catch {
        toast.error('Erro inesperado');
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Produto</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Mochila de Couro Fina" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 109.95"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os detalhes do produto aqui..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ex: men's clothing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://exemplo.com/imagem.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}
          className="w-full"
        >
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {isEditMode ? 'Salvar Alterações' : 'Criar Produto'}
        </Button>
      </form>
    </Form>
  );
};
