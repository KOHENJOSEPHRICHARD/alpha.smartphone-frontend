export type Language = "en" | "sw"

export const translations = {
  en: {
    // Navigation
    home: "Home",
    phones: "Phones",
    about: "About",
    contact: "Contact",
    admin: "Admin",

    // Hero Section
    premiumCollection: "Premium Collection 2025",
    discoverFuture: "Discover the",
    futureOfMobile: "Future of Mobile",
    heroDescription:
      "Experience cutting-edge technology and stunning design. Your perfect smartphone awaits in our curated collection of premium devices.",
    explorePhones: "Explore Phones",
    contactUs: "Contact Us",

    // Featured Section
    featuredPhones: "Featured Phones",
    featuredSubtitle: "Explore our hand-picked selection of premium smartphones",
    viewDetails: "View Details",

    // Features Section
    whyChooseUs: "Why Choose Us",
    featuresSubtitle: "Experience excellence in every aspect",
    authenticProducts: "Authentic Products",
    authenticDesc: "Only genuine, certified smartphones from authorized distributors",
    expertSupport: "Expert Support",
    expertDesc: "24/7 customer service to help you choose the perfect device",
    securePayment: "Secure Payment",
    secureDesc: "Safe and encrypted transactions for your peace of mind",
    fastDelivery: "Fast Delivery",
    fastDesc: "Quick and reliable shipping directly to your doorstep",

    // CTA Section
    readyToUpgrade: "Ready to Upgrade?",
    ctaDescription: "Join thousands of satisfied customers who trust Alpha.SmartPhone for their mobile needs",
    getStarted: "Get Started Now",

    // Footer
    aboutCompany: "About Company",
    footerDescription:
      "Your trusted partner for premium smartphones. Quality, authenticity, and excellent service guaranteed.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    followUs: "Follow Us",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday (Online Only)",
    allRightsReserved: "All rights reserved",

    // Phone Listing
    searchPlaceholder: "Search phones...",
    filterByBrand: "Filter by Brand",
    filterByCondition: "Filter by Condition",
    allBrands: "All Brands",
    allConditions: "All Conditions",
    newCondition: "New",
    likeNew: "Like New",
    used: "Used",
    noPhones: "No phones found",
    noPhonesToDisplay: "No phones to display",

    // Common
    loading: "Loading...",
    verified: "Verified",
    popular: "Popular",
    newArrival: "New Arrival",
  },
  sw: {
    // Navigation
    home: "Nyumbani",
    phones: "Simu",
    about: "Kuhusu",
    contact: "Wasiliana",
    admin: "Msimamizi",

    // Hero Section
    premiumCollection: "Mkusanyiko wa Kifahari 2025",
    discoverFuture: "Gundua",
    futureOfMobile: "Mustakabali wa Simu",
    heroDescription:
      "Furahia teknolojia ya hali ya juu na muundo wa kupendeza. Simu yako kamili inasubiri katika mkusanyiko wetu maalum wa vifaa vya kifahari.",
    explorePhones: "Chunguza Simu",
    contactUs: "Wasiliana Nasi",

    // Featured Section
    featuredPhones: "Simu Maarufu",
    featuredSubtitle: "Chunguza uteuzi wetu maalum wa simu za kifahari",
    viewDetails: "Angalia Maelezo",

    // Features Section
    whyChooseUs: "Kwa Nini Utuchague",
    featuresSubtitle: "Furahia ubora katika kila upande",
    authenticProducts: "Bidhaa Halisi",
    authenticDesc: "Simu halisi zilizoidhinishwa kutoka kwa wasambazaji walioidhinishwa",
    expertSupport: "Msaada wa Kitaalamu",
    expertDesc: "Huduma kwa wateja 24/7 kukusaidia kuchagua kifaa kinachokufaa",
    securePayment: "Malipo Salama",
    secureDesc: "Miamala salama na iliyosimbwa kwa amani yako",
    fastDelivery: "Utoaji wa Haraka",
    fastDesc: "Usafirishaji wa haraka na wa kuaminika moja kwa moja hadi mlangoni mwako",

    // CTA Section
    readyToUpgrade: "Uko Tayari Kuboresha?",
    ctaDescription: "Jiunge na maelfu ya wateja wenye kuridhika wanaotuamini Alpha.SmartPhone kwa mahitaji yao ya simu",
    getStarted: "Anza Sasa",

    // Footer
    aboutCompany: "Kuhusu Kampuni",
    footerDescription:
      "Mshirika wako wa kuaminika kwa simu za kifahari. Ubora, uhalisi, na huduma bora imethibitishwa.",
    quickLinks: "Viungo vya Haraka",
    contactInfo: "Maelezo ya Mawasiliano",
    followUs: "Tufuate",
    businessHours: "Masaa ya Biashara",
    mondayFriday: "Jumatatu - Ijumaa",
    saturday: "Jumamosi",
    sunday: "Jumapili (Mtandaoni Tu)",
    allRightsReserved: "Haki zote zimehifadhiwa",

    // Phone Listing
    searchPlaceholder: "Tafuta simu...",
    filterByBrand: "Chuja kwa Chapa",
    filterByCondition: "Chuja kwa Hali",
    allBrands: "Chapa Zote",
    allConditions: "Hali Zote",
    newCondition: "Mpya",
    likeNew: "Kama Mpya",
    used: "Iliyotumika",
    noPhones: "Hakuna simu zilizopatikana",
    noPhonesToDisplay: "Hakuna simu za kuonyesha",

    // Common
    loading: "Inapakia...",
    verified: "Imethibitishwa",
    popular: "Maarufu",
    newArrival: "Mpya",
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k]
    } else {
      return key
    }
  }

  return typeof value === "string" ? value : key
}
