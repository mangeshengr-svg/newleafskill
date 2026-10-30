import { getActiveContactContent } from '@/lib/contactActions';
import { getActiveFaqs } from '@/lib/faqActions';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const instant = false;

export const metadata: Metadata = {
  title: 'Contact Us — 24/7 Global Commercial Punching Studio | New Leaf Skills',
  description:
    'Connect with master embroidery digitizers at New Leaf Skills. Request free sewout estimates, stitch count evaluations, or discuss custom commercial contracts 24/7.',
};

export default async function ContactPage() {
  const [contactData, faqsList] = await Promise.all([
    getActiveContactContent(),
    getActiveFaqs('contact'),
  ]);

  return <ContactClient initialContent={contactData} initialFaqs={faqsList} />;
}
