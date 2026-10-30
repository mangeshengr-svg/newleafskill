import { ServiceItem } from '@/types/service';

export const serviceCategories = [
  'All',
  'Cap & Curved Visor',
  '3D Foam Puff',
  'Jacket Back',
  'Left Chest Uniform',
  'Embroidered Patches',
  'Vector Art',
];

export const servicesData: ServiceItem[] = [
  {
    id: 'embroidery-digitizing-services',
    slug: 'embroidery-digitizing',
    num: '01',
    title: 'Embroidery Digitizing Services',
    tag: 'Master Hand-Punched Files',
    badge: 'Worldwide Favorite • 22+ Years',
    category: 'Digitizing Services',
    image: '/services/embroidery-digitizing.png',
    secondaryImage: '/sample1-after.jpg',
    shortDesc: 'Veteran manual punching converting logos, artwork, and sketches into machine-ready embroidery files with fabric-calibrated underlays and zero thread breaks.',
    fullDesc: [
      'At New Leaf Skills, we provide professional embroidery digitizing services that go beyond simply converting artwork into embroidery files. Our goal is to ensure every design stitches smoothly, looks clean, and delivers outstanding results on every fabric. With over 22 years of experience, we have helped embroidery businesses, apparel manufacturers, promotional product companies, and fashion brands create accurate, production-ready files that improve embroidery quality and reduce machine downtime.',
      'Whether you need logo digitizing services, cap embroidery, left chest logos, jacket backs, patches, or custom embroidery digitizing for unique designs, our experienced digitizers create every file manually for the best stitch quality. We never rely solely on auto-digitizing software because every design, fabric, and embroidery project requires careful attention to detail.',
      'Every embroidery digitizing project undergoes strict quality checks to ensure precision, durability, and a professional finish. Serving clients across the USA, UK, Canada, Australia, Europe, and worldwide, New Leaf Skills delivers high-quality digitizing solutions that reduce production issues and help your business achieve outstanding results every time.'
    ],
    keyHighlights: [
      'Over 22 years of veteran manual digitizing expertise',
      'Standard turnaround within 6 to 8 hours (2-hour super rush available)',
      '100% Free and unlimited minor revisions until flawless sewout',
      'Machine-ready stitch sequencing optimized for 1,000+ SPM speeds',
      'Precise pull compensation and underlay stabilization tailored to your fabric',
      'Sharp micro-lettering down to 3.8mm with high legibility'
    ],
    subOfferings: [
      {
        title: 'Logo Embroidery Digitizing',
        desc: 'Precision conversion of corporate brand logos with balanced satin outlines and smooth fill patterns.'
      },
      {
        title: 'Left Chest & Polo Digitizing',
        desc: 'Optimized for pique knit and jersey fabrics with lightweight underlays that prevent fabric bunching.'
      },
      {
        title: 'Cap & Hat Digitizing',
        desc: 'Center-out and bottom-up sequencing specifically calibrated for curved 6-panel and 5-panel headwear.'
      },
      {
        title: 'Jacket Back & Large-Format Digitizing',
        desc: 'High stitch count jacket back designs with balanced density to avoid heavy, stiff garment sewouts.'
      },
      {
        title: 'Custom Patch & Emblem Digitizing',
        desc: 'Merrowed border and hot-cut satin border digitizing with tear-away backing compensations.'
      },
      {
        title: 'Applique Digitizing',
        desc: 'Accurate placement stitch, tack-down, and satin cover borders for sports jerseys and Greek letters.'
      }
    ],
    fabrics: ['Cotton', 'Pique Polo', 'Fleece & Hoodies', 'Structured Twill Caps', 'Polyester Athletic Knit', 'Denim & Canvas', 'Leather & Suede'],
    machineFormats: ['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'JEF (Janome)', 'DSB (Barudan)', 'VP3 (Husqvarna)', 'EMB (Wilcom)'],
    turnaround: '6–8 Hours (2h Rush Available)',
    revisions: '100% Free & Unlimited',
    targetIndustries: ['Embroidery Shops', 'Apparel Decorators', 'Corporate Merchandisers', 'Sports Teams', 'Garment Manufacturers']
  },
  {
    id: 'computerized-embroidery-services',
    slug: 'computerized-embroidery',
    num: '02',
    title: 'Computerized Embroidery Services',
    tag: 'Industrial Machine Runs',
    badge: 'High-Volume Production',
    category: 'Computerized Stitching',
    image: '/services/computerized-embroidery.png',
    secondaryImage: '/embroidery-service-nagpur.jpg',
    shortDesc: 'High-speed multi-head computerized embroidery for commercial apparel, corporate uniforms, and bulk garments with calibrated tensions and zero thread breaks.',
    fullDesc: [
      'Looking for a reliable Computerized Embroidery Service that delivers exceptional quality, precision, and consistency? New Leaf Skills is a trusted global provider of professional computerized embroidery solutions with over 22 years of industry experience. We combine advanced embroidery technology with skilled craftsmanship to create premium embroidered products for apparel manufacturers, fashion brands, promotional product companies, corporate businesses, embroidery shops, and individual customers.',
      'From corporate uniforms and school apparel to designer garments, promotional merchandise, sportswear, caps, patches, and custom fashion, New Leaf Skills delivers high-quality computerized embroidery services that enhance your brand identity with precision, durability, and outstanding craftsmanship.',
      'We use only the best-quality materials and threads in our embroidery work, ensuring that your custom items will look great and last for years to come. In addition to our top-quality embroidery services, we offer competitive pricing with no hidden costs, handling orders of any size from prototype samples to large bulk runs.'
    ],
    keyHighlights: [
      'High-speed multi-head industrial embroidery machines (Tajima & Barudan)',
      'Multi-thread capacity supporting up to 15 colors per design seamlessly',
      'Premium colorfast threads resistant to industrial laundry and fading',
      'Step-by-step physical sample sewout approval before mass production',
      'Strict 5-point quality inspection and automated thread trimming',
      'Capable of handling bulk runs from 50 pieces to 50,000+ pieces'
    ],
    subOfferings: [
      {
        title: 'Custom Corporate Uniform Embroidery',
        desc: 'Professional logo stitching for office staff, hospitality aprons, medical scrubs, and workwear.'
      },
      {
        title: 'Cap & Headwear Multi-Head Runs',
        desc: 'Automated 270-degree cap frame stitching across baseball caps, snapbacks, and winter beanies.'
      },
      {
        title: 'Custom Patch & Badge Manufacturing',
        desc: 'High-definition embroidered patches with iron-on, Velcro, or heat-seal backing options.'
      },
      {
        title: 'Designer & Fashion Ethnic Embroidery',
        desc: 'Intricate embroidery production for kurtas, sarees, bridal wear, and high-fashion boutique collections.'
      },
      {
        title: 'School & Institutional Badges',
        desc: 'Durable, wash-tested blazer crests and athletic track uniform embroidery.'
      }
    ],
    fabrics: ['Uniform Twill', 'Jersey Knits', 'Spandex Blends', 'Heavy Canvas', 'Poly-Cotton Blends', 'Silk & Rayon', 'Fleece Outerwear'],
    machineFormats: ['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'DSB (Barudan)'],
    turnaround: '24–48 Hours for Samples, Bulk Timelines on Request',
    revisions: 'Full Proof Approval Provided',
    targetIndustries: ['Corporate Brands', 'Hospitals & Healthcare', 'Schools & Universities', 'Hotels & Restaurants', 'Fashion Boutiques']
  },
  {
    id: 'vestments-embroidery-services',
    slug: 'vestments-embroidery',
    num: '03',
    title: 'Vestments Embroidery Services',
    tag: 'Sacred & Liturgical Garments',
    badge: 'Hand-Crafted Gold Bullion Detailing',
    category: 'Liturgical & Sacred',
    image: '/services/vestments-embroidery.png',
    secondaryImage: '/sample2-after.jpg',
    shortDesc: 'Specialized high-density digitizing and embroidery for church vestments, ceremonial robes, altar cloths, and ecclesiastical stoles with metallic gold bullion threadwork.',
    fullDesc: [
      'At New Leaf Skills, we provide premium Vestments Embroidery Services for churches, cathedrals, religious institutions, and liturgical vestment manufacturers worldwide. With over 22+ years of experience, we specialize in creating elegant, custom embroidery for liturgical garments that reflects faith, tradition, and exceptional craftsmanship.',
      'Using advanced computerized embroidery machines, premium-quality metallic and silk threads, and precision digitizing, we produce intricate designs with outstanding accuracy, durability, and vibrant detailing. Our embroidery services cover Chasubles, Stoles, Albs, Copes, Mitres, Choir Robes, Altar Cloths, and Church Banners.',
      'From Christian vestments to Hindu, Sikh, and ceremonial garments, New Leaf Skills offers complete vestment embroidery tailored to your religious and cultural requirements. We work with delicate liturgical fabrics like velvet, silk damask, brocade, and pure linen, ensuring stability without garment distortion.'
    ],
    keyHighlights: [
      'Over two decades of specialized liturgical and religious embroidery artistry',
      'Genuine metallic gold and silver bullion threadwork with non-tarnish coating',
      'Gentle needle density calibration specifically designed for velvet, silk, and brocade',
      'Custom ecclesiastical symbols, Christograms (IHS, Chi-Rho), crosses, and Marian monograms',
      'High-relief padded stitching for ceremonial altar linens and processional banners',
      'Worldwide discreet packaging and door-to-door delivery'
    ],
    subOfferings: [
      {
        title: 'Chasubles & Liturgical Copes',
        desc: 'Ornate back and front cross orphreys digitized with rich satin gradients and metallic accents.'
      },
      {
        title: 'Clergy & Deacon Stoles',
        desc: 'Detailed fringe and cross emblems balanced for drape, flexibility, and neck comfort.'
      },
      {
        title: 'Altar Frontals & Pulpit Falls',
        desc: 'Large-scale symmetrical sacred banners, Eucharistic motifs, and chalice symbols.'
      },
      {
        title: 'Ceremonial & Cultural Robes',
        desc: 'Exquisite traditional motifs for Hindu temple attire, Sikh rumalas, and liturgical garments.'
      },
      {
        title: 'Choir & Baptismal Linens',
        desc: 'Subtle tone-on-tone or white-on-white embroidery for baptismal towels and choir robes.'
      }
    ],
    fabrics: ['Silk Brocade', 'Liturgical Velvet', 'Pure Linen', 'Heavy Satin', 'Wool Damask', 'Cotton Jacquard'],
    machineFormats: ['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'EMB (Wilcom)'],
    turnaround: '12–24 Hours for Digitizing, Fast Production Schedules',
    revisions: '100% Dedicated Design Refinements',
    targetIndustries: ['Churches & Cathedrals', 'Religious Garment Makers', 'Diocesan Tailors', 'Ceremonial Robe Designers']
  },
  {
    id: 'apparel-logo-digitizing-service',
    slug: 'apparel-logo-digitizing',
    num: '04',
    title: 'Apparel Logo Digitizing',
    tag: 'Apparel & Uniforms',
    badge: 'Fabric-Calibrated Stitches',
    category: 'Apparel & Uniforms',
    image: '/services/apparel-logo-services.png',
    secondaryImage: '/services/apparel-logo-digitizing.png',
    shortDesc: 'Custom logo digitizing designed specifically for polo shirts, t-shirts, fleece hoodies, and corporate outerwear with fabric-calibrated underlays that eliminate puckering.',
    fullDesc: [
      'At New Leaf Skills, we provide premium Apparel Logo Digitizing Services for embroidery businesses, apparel manufacturers, promotional product companies, fashion brands, corporate organizations, schools, sports teams, and garment decorators worldwide. With 22+ years of experience, we transform your logos, artwork, and branding elements into high-quality, machine-ready embroidery files that deliver exceptional stitch quality and smooth production.',
      'Our experienced digitizers carefully optimize every design by adjusting stitch density, underlay, pull compensation, stitch direction, and sequencing to ensure your logo stitches cleanly on different fabric types. Whether you need embroidery for T-shirts, Polo Shirts, Hoodies, Jackets, Uniforms, Caps, Bags, Towels, Workwear, or Promotional Apparel, we create embroidery files that produce sharp details, consistent results, and professional finishes.',
      'We test every file against common garment issues such as fabric puckering, thread looping, and uneven fill lines, ensuring your embroidery machine runs at top efficiency without costly ruined garments.'
    ],
    keyHighlights: [
      'Engineered specifically for commercial apparel decorators and garment decorators',
      'Custom underlay types (tatami, double edge-walk, zigzag) matched to fabric stretch',
      'Sharp small text digitizing down to 3.8mm with high needle clearance',
      'Zero distortion between satin outlines and background fill stitches',
      'Automatic loop trims and pathing to minimize jump stitches between characters',
      'Full PDF thread stop sheet with recommended needles and hooping advice'
    ],
    subOfferings: [
      {
        title: 'Left Chest Corporate Apparel',
        desc: 'Crisp company name and logo placement sized perfectly for business casual polo shirts.'
      },
      {
        title: 'Jacket Back & Outerwear Emblems',
        desc: 'Heavyweight outerwear digitizing with density relief to prevent bulky, bulletproof feel.'
      },
      {
        title: 'Fleece & Hoodie Logo Digitizing',
        desc: 'Knockdown lattice underlay stitches that press down deep fleece pile so embroidery pops.'
      },
      {
        title: 'Sports Team Uniform & Jersey Crests',
        desc: 'Athletic numbers, player names, and team mascots for moisture-wicking synthetic jerseys.'
      },
      {
        title: 'Promotional Merchandise & Bags',
        desc: 'Stitch files calibrated for tote bags, computer backpacks, aprons, and hospitality gear.'
      }
    ],
    fabrics: ['Cotton Jersey', 'Pique Polo Knit', 'Polar Fleece', 'Waterproof Shell Jackets', 'Spandex Performance', 'Denim Twill'],
    machineFormats: ['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'JEF (Janome)', 'DSB (Barudan)', 'VP3 (Husqvarna)', 'EMB (Wilcom)'],
    turnaround: '6–8 Hours Standard (Rush 2h)',
    revisions: '100% Free Minor Revisions',
    targetIndustries: ['Corporate Apparel Brands', 'Screen Printers & Embroiders', 'School Uniform Suppliers', 'Workwear Companies']
  },
  {
    id: 'custom-logo-digitizing',
    slug: 'custom-logo-digitizing',
    num: '05',
    title: 'Custom Logo Digitizing',
    tag: 'Corporate & Brand Emblems',
    badge: 'Vector-to-Stitch Precision',
    category: 'Digitizing Services',
    image: '/services/custom-logo-digitizing.png',
    secondaryImage: '/sample1-before.jpg',
    shortDesc: 'Transform company logos, mascot emblems, and brand insignias into clean embroidery files with crisp micro-lettering, sharp satin borders, and rich tatami fills.',
    fullDesc: [
      'Custom Logo Digitizing is the foundation of professional brand representation. At New Leaf Skills, we specialize in converting complex raster images (JPG, PNG) and vector graphics (AI, EPS, PDF, SVG) into clean, high-precision stitch paths that honor your brand guidelines to the millimeter.',
      'Our veteran punchers analyze every angle, line curve, and gradient transition in your logo. We assign complementary stitch directions that create natural light sheen and dimensionality across satin columns and tatami fills, preventing stitch bunching and thread buildup at sharp apexes.',
      'Whether you are digitizing an intricate corporate shield, a sports mascot, or a minimalist modern monogram, our files ensure zero gap between outlines and fills, exact Pantone thread matches, and flawless run-times.'
    ],
    keyHighlights: [
      'True-to-artwork digital translation with exact brand font kerning',
      'Pantone, Madeira, Isacord, and Gunold color chart matching',
      'Advanced density variation to prevent stitch crowding at sharp corners',
      'Clean push-pull compensation calculated along the direction of thread tension',
      'Free artwork cleanup for low-resolution, blurry raster files',
      'Works seamlessly across commercial and single-needle home embroidery machines'
    ],
    subOfferings: [
      {
        title: 'Vector Art to Stitch Conversion',
        desc: 'Flawless translation of vector paths into satin, run, and tatami stitch types.'
      },
      {
        title: 'Micro-Lettering Logo Digitizing',
        desc: 'Specialized 60-weight thread settings for tiny taglines, copyright marks, and phone numbers.'
      },
      {
        title: 'Gradient & Color Blending',
        desc: 'Artistic tatami stitch blending recreating modern color fades and ombre graphic effects.'
      },
      {
        title: 'Mascot & Detailed Illustration Digitizing',
        desc: 'Dynamic stitch angles that give fur, scales, feathers, and shadows organic depth.'
      }
    ],
    fabrics: ['All Standard Fabrics', 'Cotton & Blends', 'Nylon Outerwear', 'Pique Knits', 'Structured Hats'],
    machineFormats: ['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'JEF (Janome)', 'DSB (Barudan)', 'VP3 (Husqvarna)', 'EMB (Wilcom)'],
    turnaround: '6–8 Hours',
    revisions: '100% Free & Unlimited',
    targetIndustries: ['Design Agencies', 'Brand Consultancies', 'Uniform Distributors', 'Promotional Product Suppliers']
  },
  {
    id: '3d-puff-digitizing',
    slug: '3d-puff-digitizing',
    num: '06',
    title: '3D Puff Digitizing (Raised Foam Relief)',
    tag: 'Raised 3D Foam Relief',
    badge: 'Streetwear & Cap Specialty',
    category: 'Digitizing Services',
    image: '/services/3d-puff-digitizing.png',
    secondaryImage: '/cat-puff.jpg',
    shortDesc: 'Raised 3D foam relief embroidery engineered for snapbacks, baseball caps, and athletic jackets with high-density satin caps and perforation cuts that sever 3mm EVA foam cleanly.',
    fullDesc: [
      '3D Puff Embroidery delivers the bold, tactile aesthetic popular on premium snapbacks, pro sports headwear, and streetwear outerwear. However, it is also the most technically demanding form of digitizing: improper density reveals exposed foam underneath, while missing perforation cuts leave messy foam remnants on edges.',
      'At New Leaf Skills, our punchers have perfected 3D puff digitizing over 22 years. We program capped satin endings that encase 2mm, 2.5mm, or 3mm EVA craft foam completely. We incorporate micro-perforation stitches that cleanly sever the foam border when peeled away, leaving razor-sharp, crisp 3D letterforms.',
      'Every 3D puff file also accounts for curved cap seam tension, preventing needle breakage when stitching across heavy buckram front panels.'
    ],
    keyHighlights: [
      'High-density satin column programming (0.18mm–0.22mm density) to completely cover foam',
      'Automated perforation cuts at letter terminals for clean, effortless foam tear-away',
      'Center-out and bottom-up sequencing to eliminate hat seam puckering and bird nests',
      'Pre-stitch tack-down run lines that hold the EVA foam sheet securely in place',
      'Dual flat-and-puff combination digitizing for complex layered typography',
      'Tajima, Barudan, Brother, and Melco machine tested'
    ],
    subOfferings: [
      {
        title: 'Snapback & Fitted Cap Letters',
        desc: 'High-profile 3D monogram and initial stitching across cap center seams.'
      },
      {
        title: 'Flat + 3D Puff Hybrid Designs',
        desc: 'Dynamic multi-layered designs combining flat tatami backgrounds with 3D satin letters.'
      },
      {
        title: 'Streetwear Jacket Backs',
        desc: 'Heavyweight raised embroidery on varsity jackets, bombers, and heavyweight hoodies.'
      },
      {
        title: 'Custom 3D Puff Patches',
        desc: 'Dimensional badges with overlocked borders ready for heat press or sew-on application.'
      }
    ],
    fabrics: ['Structured Twill Caps', 'Wool Blend Snapbacks', 'Heavy Canvas', 'Varsity Wool', 'Heavy Fleece'],
    machineFormats: ['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'DSB (Barudan)', 'EMB (Wilcom)'],
    turnaround: '6–8 Hours',
    revisions: '100% Free & Unlimited',
    targetIndustries: ['Streetwear Apparel Brands', 'Cap & Hat Brands', 'Sports Teams', 'Merchandise Manufacturers']
  }
];

export const serviceWorkflowSteps = [
  {
    step: '01',
    title: 'Design Submission',
    desc: 'Share your artwork, logo, sketch, or idea in JPG, PNG, AI, EPS, PDF, or hand sketch format with fabric specifications.',
    icon: '📤'
  },
  {
    step: '02',
    title: 'Master Manual Digitizing',
    desc: 'Our veteran digitizers hand-place every stitch, path, and underlay calibrated for your fabric stretch and machine speed.',
    icon: '⚡'
  },
  {
    step: '03',
    title: 'Sample Sewout Approval',
    desc: 'We generate an authentic virtual sewout preview and stitch metrics for your review and approval before final run.',
    icon: '🔍'
  },
  {
    step: '04',
    title: 'Machine-Ready Output',
    desc: 'Files exported in DST, PES, EXP, JEF, or EMB along with a detailed PDF color stop worksheet and thread instructions.',
    icon: '🧵'
  },
  {
    step: '05',
    title: 'Quality Guarantee & Free Edits',
    desc: 'Run the file on your machine. If any thread breaks or tension issues occur, we provide 100% free minor revisions.',
    icon: '🛡️'
  }
];

export const servicesFaqList = [
  {
    category: 'Digitizing Services',
    question: 'What is embroidery digitizing, and why is manual punching better than auto-software?',
    answer: 'Embroidery digitizing is the specialized technical process of converting digital artwork into a coordinate stitch file that commercial embroidery machines execute. Auto-software lacks understanding of fabric pull, push physics, loop trims, and proper underlays, which results in thread breaks, needle breaks, and puckering. Our 22+ years of veteran manual punching places every stitch with intention, guaranteeing zero thread breaks and 1,000 SPM machine performance.'
  },
  {
    category: 'Digitizing Services',
    question: 'What file formats do you accept, and what formats do you deliver?',
    answer: 'We accept all standard artwork formats including AI, EPS, PDF, SVG, CDR, PNG, JPG, BMP, and TIFF. We deliver your digitized files in all leading machine formats: Tajima (.DST), Brother (.PES), Melco (.EXP), Janome (.JEF), Barudan (.DSB), Husqvarna (.VP3), Wilcom (.EMB), and include a comprehensive PDF sewout and color stop worksheet.'
  },
  {
    category: 'Turnaround & Orders',
    question: 'What is your standard turnaround time for embroidery digitizing?',
    answer: 'Our standard turnaround is 6 to 8 hours. We also offer a 2-hour super rush service for urgent production jobs. Our punching studio operates 24/7 with over 40 veteran digitizers on rotation across all global time zones.'
  },
  {
    category: 'Computerized Stitching',
    question: 'Can New Leaf Skills handle bulk production orders for apparel embroidery?',
    answer: 'Yes! We regularly complete bulk embroidery projects ranging from 50 to 50,000+ pieces for garment exporters, uniform manufacturers, corporate brands, and educational institutions. We operate high-speed multi-head computerized machines with multi-thread color setups.'
  },
  {
    category: 'Vestments & Sacred',
    question: 'Do you create custom vestments embroidery with metallic gold threadwork?',
    answer: 'Yes, we specialize in sacred and liturgical vestment embroidery for churches, cathedrals, and religious tailors worldwide. We use specialized non-tarnish gold bullion threads and high-density, low-impact underlays designed for delicate velvet, silk brocade, and linen.'
  },
  {
    category: 'Revisions & Guarantee',
    question: 'What is your revision policy if I need changes or size adjustments?',
    answer: 'We offer 100% free and unlimited minor revisions. Whether you need color change sequences, slight size modifications, or density adjustments for a different fabric, our team adjusts the file free of charge until your machine runs perfectly.'
  }
];
