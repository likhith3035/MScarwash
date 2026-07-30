export function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    name: 'MS Car Wash Srikalahasti',
    alternateName: ['MS Car Wash SKHT', 'SKHT Car Wash', 'Best Car Wash in Srikalahasti'],
    image: 'https://mscarwash.vercel.app/logo.png',
    '@id': 'https://mscarwash.vercel.app/#autowash',
    url: 'https://mscarwash.vercel.app',
    telephone: ['+919494829450', '+918309390902'],
    priceRange: '₹100 - ₹600',
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
      latitude: 13.7538202,
      longitude: 79.6914561,
    },
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
    },
    sameAs: [
      'https://maps.google.com/?q=Panagal+Srikalahasti+Bharat+Petroleum',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
