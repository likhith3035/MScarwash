export function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoWash', 'AutoRepair', 'AutomotiveBusiness'],
    name: 'MS Car Mechanic & Car Wash Srikalahasti',
    alternateName: [
      'MS Car Mechanic & Car Wash',
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
      'Best Car Wash in Srikalahasti',
      'Water Wash in Srikalahasti',
      'Car Service Center Srikalahasti',
      'Best Car Mechanic in SKHT',
      'Panagal Car Services & Water Wash',
    ],
    image: 'https://mscarwash.vercel.app/logo.png',
    logo: 'https://mscarwash.vercel.app/logo.png',
    '@id': 'https://mscarwash.vercel.app/#autowash',
    url: 'https://mscarwash.vercel.app',
    hasMap: 'https://maps.app.goo.gl/i8Wa5ef1dZZwnJmF9',
    telephone: ['+918309390902'],
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
            name: 'Car Engine Diagnostic & Periodic Oil Service',
            description: 'Complete engine checkup, oil filter change, spark plug cleaning, and general car maintenance in Srikalahasti.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car AC Service & Cooling Gas Top-Up',
            description: 'Car AC filter cleaning, leak detection, and high-efficiency refrigerant gas refill.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brake Pad Replacement & Suspension Overhaul',
            description: 'Front/rear brake pad replacement, disc rotor inspection, and suspension squeak fixing.',
          },
          priceSpecification: 'Inspection & Quote on Request',
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+918309390902',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Telugu', 'Hindi'],
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
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best car mechanic and wash center in Srikalahasti (SKHT)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Mechanic & Car Wash located in Panagal, Srikalahasti (opposite Old RTO Office, beside Bharat Petroleum) offers both complete car repairs, engine mechanic service, AC repairs, and scratch-free foam washing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you do all types of car mechanic repairs in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Car Mechanic & Car Wash handles all vehicle repairs including engine diagnostic, oil change, brake/clutch service, electrical repairs, car AC gas refilling, and emergency roadside breakdown support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is doorstep pickup available for car repairs and water wash in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Car Mechanic & Car Wash offers doorstep vehicle pickup and drop service across Srikalahasti town and near the highway area. Book online or call 8309390902.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the operating hours for MS Car Mechanic & Car Wash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Mechanic & Car Wash is open daily from 7:00 AM to 10:00 PM (Monday to Sunday).',
        },
      },
    ],
  };

  return (
    <>
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
