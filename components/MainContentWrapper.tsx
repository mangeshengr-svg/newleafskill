'use client';

import { useState } from 'react';
import OurWorkSection from '@/components/OurWorkSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FormatsSection from '@/components/FormatsSection';
import BlogSection from '@/components/BlogSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import QuoteFaqSection from '@/components/QuoteFaqSection';
import Footer from '@/components/Footer';
import WorkLightboxModal from '@/components/WorkLightboxModal';
import { WorkProject } from '@/types/work';
import { BlogPost } from '@/types/blog';
import { WhyChooseUsItem } from '@/types/whyChooseUs';
import { FaqItem } from '@/types/faq';
import { ContactContentItem } from '@/types/contact';

interface MainContentWrapperProps {
  workProjects?: WorkProject[];
  blogs?: BlogPost[];
  whyChooseUs?: WhyChooseUsItem | null;
  faqs?: FaqItem[];
  contactContent?: ContactContentItem | null;
}

export default function MainContentWrapper({ workProjects, blogs, whyChooseUs, faqs, contactContent }: MainContentWrapperProps) {
  const [selectedWorkProject, setSelectedWorkProject] = useState<WorkProject | null>(null);
  const [selectedService, setSelectedService] = useState<string>('Embroidery Digitizing');

  return (
    <>
      <OurWorkSection projects={workProjects} onSelectProject={setSelectedWorkProject} />
      <WhyChooseUsSection data={whyChooseUs} />
      <FormatsSection />
      <BlogSection blogs={blogs} />
      <TestimonialsSection />
      <QuoteFaqSection
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        faqs={faqs}
        contactContent={contactContent}
      />
      <Footer />

      {selectedWorkProject && (
        <WorkLightboxModal
          project={selectedWorkProject}
          onClose={() => setSelectedWorkProject(null)}
          onOrderStyle={(service) => {
            setSelectedService(service);
            setSelectedWorkProject(null);
          }}
        />
      )}
    </>
  );
}
