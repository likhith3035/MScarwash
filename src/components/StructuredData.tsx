export function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoWash', 'AutoRepair', 'AutomotiveBusiness'],
    name: 'MS Auto Care — Car Mechanic & Car Wash Srikalahasti',
    alternateName: [
      'MS Auto Care',
      'MS Auto Care Srikalahasti',
      'Water Wash Srikalahasti',
      'Car Repairs Srikalahasti',
      'Auto Repairs Srikalahasti',
      'Best Water Wash in Srikalahasti',
      'Best Car Repairs in Srikalahasti',
      'Best Auto Repairs Srikalahasti',
      'Auto Repair Shop Srikalahasti',
      'Auto Repair Garage Srikalahasti',
      'Water Wash in Srikalahasti',
      'Car Water Wash SKHT',
      'MS Auto Care Car Mechanic & Car Wash',
      'MS Car Mechanic & Car Wash',
      'MS Car Mechanic & Car Wash Srikalahasti',
      'MS Car mechanic & Car Wash Srikalahasti',
      'MS Car Wash & Car Services',
      'MS Car Mechanics',
      'MS Car Mechanics Srikalahasti',
      'Best Car Mechanic Shop Near SKHT',
      'Car Mechanic Shop Srikalahasti',
      'MS Car Repair Srikalahasti',
      'MS Car Mechanic SKHT',
      'Car Breakdown Service Srikalahasti',
      'Emergency Car Repair SKHT',
      'Car Service Center Srikalahasti',
      'Panagal Car Services & Water Wash',
    ],
    image: 'https://mscarwash.vercel.app/logo.png',
    logo: 'https://mscarwash.vercel.app/logo.png',
    telephone: ['+918309390902', '8309390902'],
    founder: {
      '@type': 'Person',
      name: 'Naveen Kami',
      alternateName: 'Naveen K',
      jobTitle: 'Owner & Founder',
      telephone: '+918309390902',
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Naveen Kami (Naveen K)',
        jobTitle: 'Owner & Lead Technician',
        telephone: '+918309390902',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+918309390902',
      contactType: 'customer service & roadside breakdown emergency',
      areaServed: 'IN',
      availableLanguage: ['English', 'Telugu', 'Hindi'],
    },
    knowsLanguage: ['English', 'Telugu', 'Hindi'],
    priceRange: '₹100 - ₹5000',
    paymentAccepted: 'Cash, UPI, PhonePe, Google Pay, Paytm',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Panagal, Opposite Old RTO Office, Beside Bharat Petroleum',
      addressLocality: 'Srikalahasti',
      addressRegion: 'Andhra Pradesh',
      postalCode: '517644',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.74241,
      longitude: 79.683174,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Srikalahasti' },
      { '@type': 'AdministrativeArea', name: 'Panagal' },
      { '@type': 'AdministrativeArea', name: 'RTO Office Area' },
      { '@type': 'AdministrativeArea', name: 'Highway Srikalahasti' },
      { '@type': 'AdministrativeArea', name: 'Naidupeta Road' },
      { '@type': 'AdministrativeArea', name: 'Tirupati Highway' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '22:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Kishore Reddy' },
        datePublished: '2025-01-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Best car wash in Srikalahasti! Completely scratch-free snow foam and the underbody pressure washing removed all highway mud.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Venkatesh Babu' },
        datePublished: '2025-01-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Quick 20-minute bike foam wash with chain lube. MS Car Mechanic & Car Wash SKHT is definitely the top choice for daily commuters.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ravi Kumar' },
        datePublished: '2025-02-02',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Pickup and drop service was seamless. Car returned spotless inside and out. Mineral water bottle and tissue box were a wonderful free touch!',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car Wash & Complete Auto Repair Services Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bike & Scooter Snow Foam Wash',
            description: 'High pressure foam wash, degreasing, microfiber wipe down, chain cleaning and lubrication in Srikalahasti.',
          },
          price: '100',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hatchback & Compact Car Foam Wash',
            description: 'Scratch-free snow foam bath, high-pressure underbody rinse, mat wash, tire dressing, and dashboard wipe.',
          },
          price: '350',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sedan Complete Pressure & Foam Wash',
            description: 'Premium exterior snow foam wash, underbody mud removal, interior cabin vacuuming, and dashboard polish.',
          },
          price: '450',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SUV & MUV Full Deep Wash & Detailing',
            description: 'Complete SUV snow foam detailing, deep underbody pressure blast, full vacuuming, body wax shine.',
          },
          price: '600',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car Engine Diagnostic & Periodic Synthetic Oil Service',
            description: 'Computerized engine checkup, synthetic engine oil change, oil filter replacement, spark plug cleaning, and general multi-point inspection in Srikalahasti.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car AC Service & Refrigerant Gas Top-Up',
            description: 'Car air conditioning cooling coil clean, leak check, compressor diagnostic, and genuine refrigerant cooling gas refill.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brake Pad Replacement & Disc Rotor Repair',
            description: 'Front and rear brake pad replacement, disc rotor resurfacing, brake fluid flush, and ABS brake line bleeding.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car Clutch & Gearbox Overhaul',
            description: 'Clutch plate replacement, pressure plate inspection, flywheel resurfacing, and smooth transmission gear shifting adjustment.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '24/7 Emergency Highway Breakdown Assistance & Jumpstart',
            description: 'On-spot roadside repair, dead battery jumpstart, flat tire puncture assistance, and emergency towing help along Srikalahasti highway (Panagal, NH).',
          },
          priceSpecification: '24/7 Helpline: 8309390902',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Doorstep Car Repair & Water Wash Pickup Service',
            description: 'Free doorstep vehicle pickup and delivery for car repairs, periodic maintenance, and water washing across Srikalahasti town.',
          },
          priceSpecification: 'Free Pickup in Srikalahasti',
        },
      ],
    },
    sameAs: [
      'https://maps.app.goo.gl/i8Wa5ef1dZZwnJmF9',
      'https://share.google/bN5KNns6mgg3uI4tP',
      'https://maps.google.com/?q=13.742410,79.683174',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mscarwash.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing & Services',
        item: 'https://mscarwash.vercel.app/pricing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Book Service',
        item: 'https://mscarwash.vercel.app/book',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Track Live Status',
        item: 'https://mscarwash.vercel.app/track',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is the owner of MS Car Care SKHT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Care SKHT (located in Panagal, Srikalahasti) is owned and operated by Naveen Kami (also known as Naveen K). Direct contact: +91 8309390902.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the owner of MS Auto Care Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Auto Care in Srikalahasti is founded, owned, and operated by Naveen Kami (Naveen K). Phone: +91 8309390902.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the owner of MS Care?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Naveen Kami (Naveen K) is the owner and proprietor of MS Care in Srikalahasti. Phone: +91 8309390902.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the owner of MS Car Wash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Wash in Panagal, Srikalahasti is owned and managed by Naveen Kami (Naveen K).',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the owner of MS Car Mechanic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Naveen Kami is the owner and lead technician of MS Car Mechanic workshop in Srikalahasti.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the proprietor of MS Auto Care / MS Car Care SKHT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Naveen Kami (Naveen K) is the sole proprietor and owner of MS Auto Care and MS Car Care SKHT.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best car mechanic and car repair shop in Srikalahasti (SKHT)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Auto Care (located opposite Old RTO Office, beside Bharat Petroleum in Panagal, Srikalahasti) is the top-rated automobile garage offering complete car engine repair, AC gas refilling, brake overhaul, and 100% scratch-free foam washing. Call 8309390902 for instant assistance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you do all types of car mechanic repairs and engine oil changes in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Auto Care handles all mechanical and electrical repairs including computerized engine diagnostics, synthetic oil changes, brake/clutch overhaul, suspension repair, car AC cooling gas refilling, and battery jumpstarts. Call 8309390902 to book a mechanic slot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I get 24/7 emergency car breakdown help on the Srikalahasti highway?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Auto Care provides 24/7 highway roadside assistance across the Srikalahasti-Tirupati-Naidupeta highway corridor. Call our emergency helpline directly at 8309390902 for on-spot mechanic assistance or towing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is doorstep pickup available for car repairs and water wash in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Auto Care offers doorstep vehicle pickup and drop service across all localities in Srikalahasti and surrounding highway areas. Book online at mscarwash.vercel.app/book or call 8309390902.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the operating hours for MS Auto Care?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Auto Care center is open daily from 7:00 AM to 10:00 PM (Monday to Sunday), with 24/7 roadside emergency breakdown assistance on call at 8309390902.',
        },
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MS Auto Care — Car Mechanic & Car Wash Srikalahasti',
    url: 'https://mscarwash.vercel.app',
    creator: {
      '@type': 'Person',
      name: 'Likhith',
      url: 'https://devlikhith.vercel.app/',
      jobTitle: 'Full Stack Web Developer & Software Engineer',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
