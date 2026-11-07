import { getActiveServices } from '@/lib/serviceActions';
import { getActiveFaqs } from '@/lib/faqActions';
import { getServiceCategoriesHierarchy } from '@/lib/categoryActions';
import ServicesPageContent from '@/components/ServicesPageContent';

export const instant = false;

export const metadata = {
  title: 'Commercial Embroidery Digitizing Services | New Leaf Skills',
  description: 'Explore our master commercial embroidery services, including custom logo digitizing, 3D puff digitizing, vestments embroidery, and apparel punching solutions.',
};

interface ServicesPageProps {
  searchParams?: Promise<{
    category?: string;
    subcategory?: string;
    search?: string;
  }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const [dbServices, faqsList, categoriesHierarchy] = await Promise.all([
    getActiveServices(),
    getActiveFaqs('services'),
    getServiceCategoriesHierarchy(),
  ]);

  return (
    <ServicesPageContent
      initialServices={dbServices}
      faqs={faqsList}
      categoriesHierarchy={categoriesHierarchy}
      initialCategory={resolvedSearchParams.category}
      initialSubcategory={resolvedSearchParams.subcategory}
      initialSearch={resolvedSearchParams.search}
    />
  );
}
