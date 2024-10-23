import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import getCategory from '../../_actions/get-category';
import CreateProductForm from './create-product-form';
import BackButton from '../../employees/new/back-button';

const NewProductPage = async () => {
  const result = await getCategory();

  // Ensure categories are properly formatted for the form
  const categories =
    Array.isArray(result) && result.length > 0
      ? result
      : [{ name: 'Aucune catégorie disponible', slug: 'none', id: '-' }];

  return (
    <Card className='border-[0.1px] shadow-none'>
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
        <CardContent className='border-[0.1px] bg-muted/50  rounded-lg m-8 mt-4 p-8'>
          <CreateProductForm
            categories={categories.map((category) => ({
              ...category,
              slug: category.slug || 'none',
            }))}
          />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default NewProductPage;
