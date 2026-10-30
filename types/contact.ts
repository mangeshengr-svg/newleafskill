export interface ContactCardItem {
  title: string;
  badge: string;
  description: string;
  primaryDetail: string;
  secondaryDetail?: string;
  icon: string;
  actionText: string;
  actionHref: string;
}

export interface ContactContentItem {
  id: number;
  
  // 1. Home Section (QuoteFaqSection)
  homeBadge: string;
  homeHeading: string;
  homeDescription: string;
  homeSupportTitle: string;
  homeSupportDesc: string;
  homeSupportPhone: string;
  homeSupportEmail: string;
  homeFaqBadge: string;
  homeFaqHeading: string;
  homeFaqDesc: string;
  
  // 2. Contact Page Hero
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroBgImage: string;
  
  // 3. Contact Page Intro & Trust Highlights
  introBadge: string;
  introTitlePrefix: string;
  introTitleHighlight: string;
  introTitleSuffix: string;
  introDescription: string;
  trustHighlights: string[];
  
  // 4. Contact Cards (4 cards)
  contactCards: ContactCardItem[];
  
  // 5. Form & Studio Showcase
  formBadge: string;
  formHeading: string;
  formDescription: string;
  studioImage1: string;
  studioTitle1: string;
  studioDesc1: string;
  studioBadge1: string;
  studioStat1: string;
  studioStatSub1: string;
  studioStatTag1: string;
  
  studioImage2: string;
  studioBadge2: string;
  studioTitle2: string;
  studioDesc2: string;
  
  urgentBadge: string;
  urgentHeading: string;
  urgentDesc: string;
  urgentWhatsappText: string;
  urgentWhatsappNumber: string;
  urgentCallText: string;
  urgentCallNumber: string;
  
  // 6. Office Location & Map
  mapBadge: string;
  mapHeading: string;
  mapDesc: string;
  officeTitle: string;
  officeName: string;
  officeLine1: string;
  officeLine2: string;
  officeCityState: string;
  officeCountry: string;
  officePhone: string;
  officePhoneFormatted: string;
  officeEmail: string;
  officeHours: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  
  // 7. FAQ Section & CTA
  faqBadge: string;
  faqHeading: string;
  faqDescription: string;
  faqCtaHeading: string;
  faqCtaDesc: string;
  
  sortOrder: number;
  isActive: number;
  createdAt?: string;
  updatedAt?: string;
}

