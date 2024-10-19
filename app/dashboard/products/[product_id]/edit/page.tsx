import getCategory from '@/app/dashboard/_actions/get-category';
import { getProductById } from '@/app/dashboard/_actions/get-product-by-id';
import EditProductFormData from '@/app/dashboard/_types/edit-product-form-data';
import BackButton from '@/app/dashboard/employees/new/back-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditProductForm from './edit-product-form';

interface Props {
  params: { product_id: string };
}

const NewProductPage = async ({ params: { product_id } }: Props) => {
  const result = await getCategory();

  const response = await getProductById(product_id);

  if (!response.success) {
    return;
  }

  // Ensure categories are properly formatted for the form
  const categories =
    Array.isArray(result) && result.length > 0
      ? result
      : [{ name: 'Aucune catégorie disponible', slug: 'none', id: '-' }];

  return (
    <Card className='border-[0.1px] bg-zinc-900'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          <div className='flex items-center gap-2'>
            <BackButton />
            <span> Enregistrement d'article</span>
          </div>
        </CardTitle>
        <CardDescription>
          Veuillez saisir les informations du nouveau produit ci-dessous.
        </CardDescription>
      </CardHeader>
      <ScrollArea className='h-[80vh]'>
        <CardContent className='border-[0.1px] border-zinc-800 rounded-lg m-8 mt-4 p-8'>
          <EditProductForm
            categories={categories.map((category) => ({
              ...category,
              slug: category.slug || 'none',
            }))}
            initialData={response.product as unknown as EditProductFormData}
            product_id={product_id}
          />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default NewProductPage;
