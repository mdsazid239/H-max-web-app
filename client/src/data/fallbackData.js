/**
 * Used only when the API cannot be reached, so the pages still render
 * during design review or if the database is temporarily down.
 * The live values always come from MySQL.
 */

export const FALLBACK_RATES = {
  currency: [
    { code: 'AED', name: 'UAE Dirham', flagEmoji: '🇦🇪', buyRate: 26.44, sellRate: 24.94 },
    { code: 'AUD', name: 'Australian Dollar', flagEmoji: '🇦🇺', buyRate: 68.07, sellRate: 64.07 },
    { code: 'CHF', name: 'Swiss Franc', flagEmoji: '🇨🇭', buyRate: 119.76, sellRate: 113.76 },
    { code: 'EUR', name: 'Euro', flagEmoji: '🇪🇺', buyRate: 110.15, sellRate: 106.15 },
    { code: 'GBP', name: 'Pound Sterling', flagEmoji: '🇬🇧', buyRate: 126.8, sellRate: 122.4 },
    { code: 'USD', name: 'US Dollar', flagEmoji: '🇺🇸', buyRate: 95.96, sellRate: 92.76 },
  ],
  travel_card: [
    { code: 'AED', name: 'UAE Dirham', flagEmoji: '🇦🇪', buyRate: 26.45, sellRate: 24.95 },
    { code: 'AUD', name: 'Australian Dollar', flagEmoji: '🇦🇺', buyRate: 67.11, sellRate: 63.11 },
    { code: 'CHF', name: 'Swiss Franc', flagEmoji: '🇨🇭', buyRate: 119.54, sellRate: 113.54 },
    { code: 'EUR', name: 'Euro', flagEmoji: '🇪🇺', buyRate: 109.46, sellRate: 105.46 },
    { code: 'GBP', name: 'Pound Sterling', flagEmoji: '🇬🇧', buyRate: 126.81, sellRate: 122.41 },
    { code: 'USD', name: 'US Dollar', flagEmoji: '🇺🇸', buyRate: 95.98, sellRate: 92.78 },
  ],
};

export const FALLBACK_CURRENCIES = FALLBACK_RATES.currency.map(
  ({ code, name, flagEmoji }) => ({ code, name, flagEmoji }),
);

export const FALLBACK_NEWS = [
  {
    slug: 'euro-two-month-high',
    category: 'Market Update',
    title: 'Euro Hits Two-Month High as ECB Signals Rate Cut Pause',
    excerpt:
      'The euro climbed to its strongest level in two months after the European Central Bank indicated it would hold rates steady through the next quarter.',
    isFeatured: true,
    publishedAt: '2026-06-18',
  },
  {
    slug: 'rbi-tightens-lrs-rules',
    category: 'Regulation News',
    title: 'RBI Tightens Rules for Forex Transactions Under LRS',
    excerpt:
      'Fresh reporting requirements apply to outward remittances made under the Liberalised Remittance Scheme.',
    isFeatured: false,
    publishedAt: '2026-06-12',
  },
  {
    slug: 'summer-travel-surge',
    category: 'Travel Update',
    title: 'Summer Travel Surge: Top Destinations & Forex Tips',
    excerpt:
      'Bookings to Dubai, London and Singapore are up sharply this season. A short guide to carrying money on each route.',
    isFeatured: false,
    publishedAt: '2026-06-05',
  },
];

export const FALLBACK_FAQS = [
  {
    category: 'general',
    question: 'How can I locate the nearest branch?',
    answer:
      'We have two branches in Mumbai — Fort (280 Shahid Bhagat Singh Road) and Dombivli East (Guru Prasad Building, Manpada Road). Both are listed with directions on our Contact page.',
  },
  {
    category: 'general',
    question: 'I have a concern about a transaction, who can I contact?',
    answer:
      'Call 7710033233 or write to info@hmaxforex.com with your transaction reference. Our team responds on the same working day.',
  },
  {
    category: 'general',
    question: 'What is a transaction fee?',
    answer:
      'A transaction fee is a charge applied for processing an exchange. At HMAX the rate you are quoted is the rate you get, with no hidden markup added on top.',
  },
  {
    category: 'general',
    question: 'What is an exchange rate?',
    answer:
      'An exchange rate is the value of one currency expressed in another. Our rates show how many rupees one unit of a foreign currency costs to buy or sell.',
  },
  {
    category: 'general',
    question: 'Where do I find the exchange rates?',
    answer:
      'Live buy and sell rates for over 30 currencies are published on our home page and on the Currency Exchange page.',
  },
  {
    category: 'remittance',
    question: 'How much money can I send abroad in a year?',
    answer:
      'Under the RBI Liberalised Remittance Scheme, a resident individual may remit up to USD 250,000 per financial year for permitted purposes.',
  },
  {
    category: 'remittance',
    question: 'What documents do I need for an outward remittance?',
    answer:
      'A PAN card, a valid photo ID, and documents supporting the purpose of the transfer.',
  },
  {
    category: 'currency_exchange',
    question: 'What documents do I need to buy foreign currency?',
    answer:
      'Your original passport, a valid visa, a confirmed flight ticket, and a PAN card wherever applicable.',
  },
  {
    category: 'currency_exchange',
    question: 'Do you deliver currency to my home?',
    answer:
      'Yes. Doorstep delivery is available across Mumbai for orders placed in advance.',
  },
];

export const FALLBACK_BRANCHES = [
  {
    label: 'Head Office',
    address:
      'Shop no 1 & 2, 280 Shahid Bhagat Singh Road, Opp Lalit Restaurant, CST – Fort',
    city: 'Mumbai',
    pincode: '400001',
    phones: ['7710033233', '02222643355'],
    email: 'info@hmaxforex.com',
    mapUrl: 'https://maps.google.com/?q=280+Shahid+Bhagat+Singh+Road+Fort+Mumbai',
  },
  {
    label: 'Branch Office',
    address:
      '1st Floor, Office No. 3, Guru Prasad Building, Near Chhatrapati Shivaji Maharaj Statue, Manpada Road, Dombivli East',
    city: 'Mumbai',
    pincode: '421201',
    phones: ['9136926325', '9321627630'],
    email: 'hmaxdombivli@gmail.com',
    mapUrl: 'https://maps.google.com/?q=Guru+Prasad+Building+Manpada+Road+Dombivli+East',
  },
];
