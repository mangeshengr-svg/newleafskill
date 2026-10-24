export interface ContactOfficeInfo {
  title: string;
  badge: string;
  description: string;
  primaryDetail: string;
  secondaryDetail?: string;
  icon: string;
  actionText: string;
  actionHref: string;
}

export interface ContactFaq {
  question: string;
  answer: string;
  category: string;
}

export const contactDetails = {
  companyName: "NewLeaf Skills Studio",
  experience: "22+ Years",
  tagline: "Professional Manual Embroidery Digitizing & Vector Art Services",
  introText: "We love to hear from our customers. Please feel free to contact us with any questions you may have. Whether you are an embroidery shop, apparel brand, or custom decorator, our master punchers are here 24/7.",
  
  phoneIndia: "+91 9923790520",
  phoneIndiaFormatted: "+91 99237 90520",
  phoneUS: "+91 99237 90520",
  
  emailPrimary: "info@newleafskills.com",
  emailSecondary: "newleafskills@gmail.com",
  emailSupport: "info@newleafskills.com",
  
  address: {
    line1: "C/O, Chaudhari Cable Network, 1440",
    line2: "Near Budh Nagar, Asi Nagar Gurudwara",
    city: "Nagpur",
    state: "Maharashtra",
    pincode: "440017",
    country: "India",
    fullAddress: "C/O Chaudhari Cable Network, 1440, Near Budh Nagar, Asi Nagar Gurudwara, Nagpur, Maharashtra 440017, India"
  },
  
  hours: {
    digitizing: "24 Hours / 7 Days a Week (Round-the-clock shifts)",
    customerSupport: "24/7 Live Chat, Phone & Email Support",
    standardTurnaround: "6–8 Hours Guaranteed",
    rushTurnaround: "2–4 Hours Priority Rush Available"
  },
  
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0906325510617!2d79.1176211758781!3d21.188556582236353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c70034d650ff%3A0xc39bc6dfa42bf43!2sCodereva%20-%20AI%20and%20Software%20Development%20Company!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.app.goo.gl/6EQSKCUPYBFZ5knd6"
};

export const contactInfoCards: ContactOfficeInfo[] = [
  {
    title: "Phone & Live Hotline",
    badge: "Instant Response",
    description: "Speak directly with our studio manager or production supervisor.",
    primaryDetail: "+91 99237 90520 (India HQ)",
    secondaryDetail: "+91 99237 90520 (US Toll-Free)",
    icon: "📞",
    actionText: "Call India Studio",
    actionHref: "tel:+919923790520"
  },
  {
    title: "Official Email Inquiries",
    badge: "15-Min Reply",
    description: "Send artwork, mockups, or custom quotation specifications.",
    primaryDetail: "info@newleafskills.com",
    secondaryDetail: "newleafskills@gmail.com",
    icon: "✉️",
    actionText: "Send Email",
    actionHref: "mailto:info@newleafskills.com"
  },
  {
    title: "Production Studio & HQ",
    badge: "Nagpur Hub",
    description: "Our physical digitization facility & computerized testing lab.",
    primaryDetail: "1440 Near Budh Nagar, Asi Nagar",
    secondaryDetail: "Nagpur, Maharashtra 440017, India",
    icon: "📍",
    actionText: "Open in Maps",
    actionHref: contactDetails.googleMapsDirectionsUrl
  },
  {
    title: "Studio Production Hours",
    badge: "24/7 Active",
    description: "Non-stop production shifts serving US, UK, Europe & India.",
    primaryDetail: "24 Hours / 7 Days a Week",
    secondaryDetail: "Turnaround: 6–8 hrs (Rush: 2 hrs)",
    icon: "⚡",
    actionText: "WhatsApp Quick Chat",
    actionHref: "https://wa.me/919923790520?text=Hi%20NewLeaf%20Skills,%20I%20have%20an%20embroidery%20digitizing%20inquiry."
  }
];

export const contactServiceOptions = [
  "Embroidery Digitizing Services (Manual 1000 SPM)",
  "Computerized Embroidery (Bulk Multi-Head Production)",
  "Vestments Embroidery Services (Gold Bullion & Sacred)",
  "Apparel Logo Digitizing (Caps, Polos, Hoodies)",
  "3D Puff Headwear Digitizing (Raised Foam Relief)",
  "Custom Vector Art Conversion & Redraw",
  "Free Quote & Sewout Sample Check"
];

export const contactTurnaroundOptions = [
  "Standard Turnaround (6–8 Hours)",
  "Priority Rush (2–4 Hours)",
  "Same Day Delivery (8–12 Hours)",
  "Next Day Regular (24 Hours)"
];

export const contactMachineFormats = [
  ".DST (Tajima / Universal Commercial)",
  ".PES (Brother / Babylock)",
  ".EXP (Melco / Bernina)",
  ".JEF (Janome / Elna)",
  ".EMB (Wilcom Native Source File)",
  ".VP3 / .HUS (Husqvarna Viking / Pfaff)",
  ".OFM (Melco Amaya)",
  "All Machine Formats + PDF Worksheet"
];

export const contactFaqs: ContactFaq[] = [
  {
    category: "Turnaround & Timing",
    question: "How quickly will you respond to my contact message or quote inquiry?",
    answer: "Our customer desk operates 24/7. During typical studio hours, inquiries are reviewed and answered within 10 to 15 minutes. For quote requests with artwork attached, we provide exact stitch count estimates and turnaround timelines immediately."
  },
  {
    category: "Rush Orders",
    question: "Can I request emergency or rush 2-hour digitizing?",
    answer: "Yes! We offer 2-hour priority rush turnaround for time-sensitive commercial jobs, sudden fashion drops, and trade show deadlines. Simply select 'Priority Rush (2–4 Hours)' on the form or call our direct phone hotline."
  },
  {
    category: "Artwork & Formats",
    question: "What types of artwork files can I send for digitizing?",
    answer: "We accept all standard image and vector formats including JPG, PNG, PDF, AI, EPS, SVG, PSD, and TIFF. Even if you only have a low-resolution photo or sketch, our digitizers can redraw and optimize it."
  },
  {
    category: "Revisions & Guarantee",
    question: "What is your revision policy if I need thread density or size adjustments?",
    answer: "We provide 100% free unlimited minor edits and tension recalibrations. If a design needs tweaks for a different fabric (e.g. pique cotton to fleece or cap buckram), our punchers adjust it at no extra charge."
  },
  {
    category: "Machine Compatibility",
    question: "Are your files guaranteed to run without thread breaks on my machines?",
    answer: "Yes. Every single design is manually punched with planned travel stitches, underlays matched to the fabric type, and calibrated densities. We test sewouts on Tajima, Barudan, Brother, and Melco commercial machines to ensure 1,000+ stitches per minute with zero thread breakage."
  },
  {
    category: "Pricing & Billing",
    question: "How do you calculate digitizing rates?",
    answer: "Our rates are competitive and transparent, starting from simple flat fees or stitch count tiers with zero hidden charges. We accept secure digital payments, credit cards, bank transfers, and international payment methods."
  }
];
