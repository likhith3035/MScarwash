export function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    name: 'MS Car Wash Srikalahasti',
    alternateName: [
      'MS Car Wash SKHT',
      'SKHT Car Wash',
      'Best Car Wash in Srikalahasti',
      'Water Wash in Srikalahasti',
      'Best Water Wash in SKHT',
      'Top Water Wash SKHT',
      'Car Water Wash Srikalahasti',
      'MS Auto Wash',
      'Panagal Water Wash',
    ],
    image: 'https://mscarwash.vercel.app/logo.png',
    logo: 'https://mscarwash.vercel.app/logo.png',
    '@id': 'https://mscarwash.vercel.app/#autowash',
    url: 'https://mscarwash.vercel.app',
    telephone: ['+919494829450', '+918309390902'],
    priceRange: '₹100 - ₹600',
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
        author: { '@type': 'Person', name: 'Sekhar Reddy' },
        datePublished: '2026-07-02',
        reviewBody: 'The doorstep pickup wash service near highway Srikalahasti is super convenient. Returned my Innova spotless & shiny.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car & Bike Wash Services Catalog',
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
            name: 'Sedan Car Complete Wash',
            description: 'Full exterior snow foam bath, high-pressure underbody rinse, dashboard dusting & cabin vacuum.',
          },
          price: '450',
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
            name: 'Doorstep Vehicle Pickup & Drop Wash Service',
            description: 'Convenient doorstep vehicle pickup from your home, office or location anywhere in Srikalahasti.',
          },
          price: '350',
          priceCurrency: 'INR',
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
        name: 'Pricing',
        item: 'https://mscarwash.vercel.app/pricing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Book Wash Slot',
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
        name: 'What is the best car wash in Srikalahasti (SKHT)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Wash located in Panagal, Srikalahasti (opposite Old RTO Office, beside Bharat Petroleum) is top-rated for 100% scratch-free foam washing, pressure underbody rinse, and free perks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a doorstep pickup car wash service near Srikalahasti highway?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MS Car Wash offers doorstep vehicle pickup and drop service across Srikalahasti town and near the highway area. Book online or call 9494829450.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the car wash timings for MS Car Wash SKHT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MS Car Wash is open daily from 7:00 AM to 10:00 PM (Monday to Sunday).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the price of car and bike wash in Srikalahasti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bike wash starts at ₹100, Hatchback car wash is ₹350, Sedan is ₹450, and SUV wash is ₹600. Every wash includes a free mineral water bottle and car tissue box.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does MS Car Wash offer underbody pressure washing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, MS Car Wash provides high-pressure underbody cleaning to clear highway mud, road grime, and salt deposits, helping prevent chassis rust.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I get free gifts with every car wash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Every car wash booking includes a complimentary mineral water bottle and a premium car tissue box.',
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
