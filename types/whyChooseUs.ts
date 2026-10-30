export interface WhyChooseUsPillar {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsItem {
  id: number;
  title: string;
  subtitle: string;
  eyebrow?: string;
  image: string;
  studioBadge?: string;
  studioDesc?: string;
  experienceYears?: string;
  experienceTitle?: string;
  experienceSub?: string;
  badge2Icon?: string;
  badge2Title?: string;
  badge2Sub?: string;
  description1: string;
  description2?: string;
  description3?: string;
  pillars: WhyChooseUsPillar[];
  capabilities: string[];
  btn1Text?: string;
  btn1Link?: string;
  btn2Text?: string;
  btn2Link?: string;
  sortOrder?: number;
  isActive?: number;
}
