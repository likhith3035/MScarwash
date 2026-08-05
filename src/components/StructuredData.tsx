export function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoWash', 'AutoRepair', 'AutomotiveBusiness'],
    name: 'MS Car Wash & Car Services Srikalahasti',
    alternateName: [
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
    telephone: ['+919494829450', '+918309390902'],
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
      reviewCount: '154',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Subba Rao K.' },
        datePublished: '2026-06-15',
        reviewBody: 'Best car wash in Srikalahasti! Completely scratch-free snow foam and the underbody pressure washing removed all highway mud.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'V. Naresh' },
        datePublished: '2026-06-20',
        reviewBody: 'Quick 20-minute bike foam wash with chain lube. MS Car Wash SKHT is definitely the top choice for daily commuters.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'M. Ramesh' },
        datePublished: '2026-07-25',
        reviewBody: 'Excellent car repair service! Fixed my Swift engine oil leak and brake squeak quickly. Very trustworthy mechanic in Srikalahasti.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
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
            name: 'Two-Wheeler Bike & Scooter Foam Wash',
            description: 'Scratch-free snow foam wash, pressure cleaning & chain lube for bikes and scooters.',
          },
          price: '100',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hatchback Car Foam & Underbody Wash',
            description: 'Foam wash, high-pressure underbody rinse, cabin vacuum, free water bottle & tissue box.',
          },
          price: '350',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SUV & Compact SUV Deep Wash',
            description: 'Deep foam wash, heavy underbody blast, interior sanitization & free perks.',
          },
          price: '600',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Car Mechanic General Repair & Oil Service',
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
      telephone: '+919494829450',
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
        name: 'What is the best car wash and repair center in Srikalahasti (SKHT)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Wash & Car Services located in Panagal, Srikalahasti (opposite Old RTO Office, beside Bharat Petroleum) offers both scratch-free foam washing and all types of car repairs, engine mechanic service, and AC repairs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you do all types of car mechanic repairs in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Car Wash & Car Services handles all vehicle repairs including engine diagnostic, oil change, brake/clutch service, electrical repairs, car AC gas refilling, and emergency roadside breakdown support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is doorstep pickup available for car repairs and water wash in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Car Wash & Car Services offers doorstep vehicle pickup and drop service across Srikalahasti town and near the highway area. Book online or call 9494829450.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the operating hours for MS Car Wash & Car Services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Wash & Car Services is open daily from 7:00 AM to 10:00 PM (Monday to Sunday).',
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
