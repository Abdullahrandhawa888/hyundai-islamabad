import type {
  FeatureTile,
  FormOption,
  HeroSlide,
  Location,
  NavItem,
  NewsArticle,
  Offer,
  StockItem,
  TeamMember,
  Vehicle,
  VehicleRange,
  VehicleSeries,
} from "./types";

export const site = {
  name: "Hyundai Islamabad",
  dealer: "Hyundai Islamabad",
  group: "Ittehad Automotive",
  parent: "Hyundai Nishat Motor (Private) Limited",
  tagline: "Progress for Humanity",
  description:
    "Hyundai Islamabad is an authorised Hyundai dealership offering a wide selection of sedans, SUVs, hybrids and electric vehicles, with professional service and maintenance performed by Hyundai-trained technicians.",
  phoneDisplay: "051 111 500 200",
  phoneHref: "tel:+9251111500200",
  email: "info@hyundai-islamabad.com",
  whatsapp: "https://wa.me/9251111500200",
  address: "Off 9th Ave, I-9/3, Islamabad Capital Territory 44000",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hyundai+Islamabad+I-9/3",
  hours: {
    sales: "Mon–Fri: 10:00 AM – 06:00 PM · Sat: 11:00 AM – 07:00 PM",
    service: "Mon–Fri: 09:00 AM – 05:00 PM · Sat: 09:00 AM – 06:00 PM",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    nishat: "https://hyundai-nishat.com/",
  },
  logo: "/images/logo.png",
  dealerImage: "/images/dealer.jpg",
};

export const extraPhones = [
  { label: "Sales", display: "051 444 4546", href: "tel:+92514444546" },
  { label: "Sales", display: "051 444 4547", href: "tel:+92514444547" },
  { label: "Service", display: "0304 111 1603", href: "tel:+923041111603" },
];

export const navItems: NavItem[] = [
  { label: "Models", href: "/models" },
  { label: "View Stock", href: "/stock" },
  { label: "Offers", href: "/offers" },
  {
    label: "After Sales",
    href: "/services",
    children: [
      { label: "Warranty T&Cs", href: "/warranty" },
      { label: "Customer Promise", href: "/services#customer-promise" },
      { label: "Free Services", href: "/services#free-services" },
      { label: "Periodic Maintenance Charts", href: "/services#maintenance" },
      { label: "Owner's Manual", href: "/owners-manual" },
      { label: "Book a Service", href: "/services/book" },
    ],
  },
  {
    label: "More Tools",
    href: "/news",
    children: [
      { label: "Corporate Sales", href: "/corporate" },
      { label: "News & Events", href: "/news" },
      { label: "Price List", href: "/prices" },
      { label: "Our Team", href: "/team" },
    ],
  },
];

export const locations: Location[] = [
  {
    id: "isb-sales",
    name: "Hyundai Showroom, Islamabad",
    type: "Sales",
    phone: "+92 51 111 500 200",
    phoneHref: "tel:+9251111500200",
    address: "Off 9th Ave, I-9/3, Islamabad Capital Territory 44000",
  },
  {
    id: "isb-service",
    name: "Hyundai Service, Islamabad",
    type: "Service",
    phone: "+92 304 111 1603",
    phoneHref: "tel:+923041111603",
    address: "Off 9th Ave, I-9/3, Islamabad Capital Territory 44000",
  },
];

const sedanColors = [
  { name: "Polar White", hex: "#F4F4F2" },
  { name: "Silver Metallic", hex: "#A8ADB3" },
  { name: "Magnetic Force", hex: "#4A4E55" },
  { name: "Phantom Black", hex: "#111111" },
  { name: "Oxford Blue", hex: "#1B3A6B" },
  { name: "Fiery Red", hex: "#B3121B" },
];

const suvColors = [
  ...sedanColors,
  { name: "Rain Forest", hex: "#2F4A3C" },
  { name: "Hampton Grey", hex: "#6E7278" },
];

export const vehicles: Vehicle[] = [
  {
    slug: "elantra-hybrid",
    name: "THE Elantra Hybrid",
    shortName: "Elantra Hybrid",
    tagline: "Pakistan’s first hybrid sedan.",
    description:
      "The all-new Hyundai ELANTRA Hybrid embodies the spirit of innovation through parametric design. Powered by a Smartstream GDi HEV engine and EcoShift dual-clutch transmission, it blends petrol and electric power for a smoother, more economical drive - assembled locally to global standards.",
    highlights: [
      "1.6L Smartstream GDi HEV engine",
      "EcoShift 6-speed dual-clutch transmission",
      "10.25-inch TFT LCD cluster and infotainment",
      "Wireless Android Auto and Apple CarPlay",
      "Heated and ventilated seats",
      "Dual-zone automatic climate control",
      "Electronic parking brake with Auto-Hold",
      "LED headlamps, DRLs and tail lights",
    ],
    ranges: ["hyundai", "ioniq"],
    series: "E",
    category: "Sedan",
    fuel: "Hybrid",
    cardImage: "/images/vehicles/elantra-hybrid.webp",
    heroImage: "/images/vehicles/elantra-hybrid.webp",
    gallery: [
      "/images/vehicles/elantra-hybrid.webp",
      "/images/vehicles/elantra-hybrid.webp",
      "/images/news/elantra-launch.jpg",
    ],
    colors: sedanColors,
    specs: [
      { label: "Engine", value: "1.6 Smartstream GDi HEV" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Transmission", value: "6-speed EcoShift DCT" },
      { label: "Wheels", value: "16-inch alloy" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [
      {
        name: "Elantra Hybrid Blue",
        price: 11400000,
        discountedPrice: 10761000,
        note: "Promotional price valid until 31 Aug 2026",
      },
    ],
    brochure: "/enquiry?type=brochure&model=elantra-hybrid",
  },
  {
    slug: "sonata",
    name: "THE Sonata",
    shortName: "Sonata",
    tagline: "A refined business sedan.",
    description:
      "The Hyundai Sonata is a spacious, well-equipped sedan designed for comfort on long motorway runs and daily city driving. Available in 2.0L and 2.5L petrol variants with a premium cabin, dual-zone climate control and Hyundai safety systems.",
    highlights: [
      "2.0L and 2.5L petrol options",
      "Push-button start and smart entry",
      "Cruise control",
      "Leather interior",
      "Powered driver’s seat with lumbar support",
      "Wireless charging",
      "Dual-zone automatic climate control",
      "ESC and traction control",
    ],
    ranges: ["hyundai"],
    series: "S",
    category: "Sedan",
    fuel: "Petrol",
    cardImage: "/images/vehicles/sonata.webp",
    heroImage: "/images/vehicles/sonata.webp",
    gallery: ["/images/vehicles/sonata.webp"],
    colors: sedanColors,
    specs: [
      { label: "Engine", value: "2.0L / 2.5L GDi" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Transmission", value: "Automatic" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [
      { name: "Sonata 2.0", price: 10385000 },
      { name: "Sonata 2.5", price: 11205000 },
    ],
    brochure: "/enquiry?type=brochure&model=sonata",
  },
  {
    slug: "sonata-n-line",
    name: "THE Sonata N Line",
    shortName: "Sonata N Line",
    tagline: "Performance, dressed for the city.",
    description:
      "Sonata N Line brings Hyundai N performance cues to the executive sedan: a 2.5 turbo GDi engine, sport-tuned presence and a cabin finished for drivers who want more than a commute.",
    highlights: [
      "2.5 Turbo GDi",
      "N Line exterior and interior styling",
      "Sport-focused driving modes",
      "Premium infotainment",
      "Performance-oriented design",
    ],
    ranges: ["n"],
    series: "S",
    category: "Sedan",
    fuel: "Petrol",
    cardImage: "/images/vehicles/sonata-n-line.webp",
    heroImage: "/images/vehicles/sonata-n-line.webp",
    gallery: ["/images/vehicles/sonata-n-line.webp"],
    colors: sedanColors,
    specs: [
      { label: "Engine", value: "2.5 Turbo GDi" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Transmission", value: "Automatic" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [
      {
        name: "Sonata 2.5 N Line",
        price: 15890000,
        note: "On-road figure may include freight, NEV levy and WHT",
      },
    ],
    brochure: "/enquiry?type=brochure&model=sonata-n-line",
  },
  {
    slug: "tucson-hybrid",
    name: "THE Tucson Hybrid",
    shortName: "Tucson Hybrid",
    tagline: "The hybrid SUV for every journey.",
    description:
      "Tucson Hybrid pairs Hyundai’s parametric SUV design with a 1.6 GDi hybrid powertrain. Choose Smart FWD or Signature AWD - both with an 8-speed DCT and a cabin built for family miles.",
    highlights: [
      "1.6 GDi HEV powertrain",
      "Smart FWD or Signature AWD",
      "8-speed EcoShift DCT",
      "Panoramic presence and LED lighting",
      "Advanced driver assistance",
      "Family-ready cargo space",
    ],
    ranges: ["hyundai", "ioniq"],
    series: "T",
    category: "SUV",
    fuel: "Hybrid",
    cardImage: "/images/vehicles/tucson-hybrid.webp",
    heroImage: "/images/vehicles/tucson-hybrid.webp",
    gallery: [
      "/images/vehicles/tucson-hybrid.webp",
      "/images/vehicles/tucson-hybrid.webp",
    ],
    colors: suvColors,
    specs: [
      { label: "Engine", value: "1.6 GDi HEV" },
      { label: "Drivetrain", value: "FWD or AWD" },
      { label: "Transmission", value: "8-speed DCT" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [
      {
        name: "Tucson Hybrid Smart FWD",
        price: 12926000,
        discountedPrice: 12202000,
        note: "Promotional price valid until 31 Aug 2026",
      },
      {
        name: "Tucson Hybrid Signature AWD",
        price: 14101000,
        discountedPrice: 13300000,
        note: "Promotional price valid until 31 Aug 2026",
      },
    ],
    brochure: "/enquiry?type=brochure&model=tucson-hybrid",
  },
  {
    slug: "tucson",
    name: "THE Tucson",
    shortName: "Tucson",
    tagline: "The SUV that started a design language.",
    description:
      "The petrol Tucson brings Hyundai’s jewel-like lighting, sculpted bodywork and a practical, family-first cabin. Available in FWD and AWD petrol configurations from Hyundai Islamabad.",
    highlights: [
      "Parametric hidden-lamp design",
      "FWD and AWD petrol options",
      "Power tailgate on higher grades",
      "HTRAC all-wheel drive (AWD)",
      "ESC, DBC, BAS and VSM",
    ],
    ranges: ["hyundai"],
    series: "T",
    category: "SUV",
    fuel: "Petrol",
    cardImage: "/images/vehicles/tucson.png",
    heroImage: "/images/vehicles/tucson.png",
    gallery: ["/images/vehicles/tucson.png"],
    colors: suvColors,
    specs: [
      { label: "Engine", value: "2.0L petrol" },
      { label: "Drivetrain", value: "FWD / AWD" },
      { label: "Transmission", value: "Automatic" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [
      { name: "Tucson FWD", price: 11275000 },
      { name: "Tucson AWD", price: 12295000 },
    ],
    brochure: "/enquiry?type=brochure&model=tucson",
  },
  {
    slug: "santa-fe-hybrid",
    name: "THE Santa Fe Hybrid",
    shortName: "Santa Fe Hybrid",
    tagline: "Experience everything.",
    description:
      "The all-new Hyundai SANTA FE Hybrid is a leap towards sustainable mobility - a three-row hybrid SUV with presence, space and a 1.6 T-GDi HEV powertrain in Smart FWD and Signature AWD.",
    highlights: [
      "1.6 T-GDi HEV",
      "Three-row family SUV",
      "Smart FWD and Signature AWD",
      "6-speed EcoShift DCT",
      "Commanding road presence",
    ],
    ranges: ["hyundai", "ioniq"],
    series: "S",
    category: "SUV",
    fuel: "Hybrid",
    cardImage: "/images/vehicles/santa-fe.png",
    heroImage: "/images/vehicles/santa-fe.png",
    gallery: [
      "/images/vehicles/santa-fe.png",
      "/images/vehicles/santa-fe.png",
      "/images/news/santa-fe.jpg",
    ],
    colors: suvColors,
    specs: [
      { label: "Engine", value: "1.6 T-GDi HEV" },
      { label: "Drivetrain", value: "FWD or AWD" },
      { label: "Transmission", value: "6-speed EcoShift DCT" },
      { label: "Seating", value: "Three-row" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [
      {
        name: "Santa Fe Hybrid Smart FWD",
        price: 14574000,
        discountedPrice: 13258000,
        note: "Promotional price valid until 31 Aug 2026",
      },
      {
        name: "Santa Fe Hybrid Signature AWD",
        price: 16123000,
        discountedPrice: 14720000,
        note: "Promotional price valid until 31 Aug 2026",
      },
    ],
    brochure: "/enquiry?type=brochure&model=santa-fe-hybrid",
  },
  {
    slug: "ioniq-5",
    name: "THE IONIQ 5",
    shortName: "IONIQ 5",
    tagline: "Lead the charge.",
    description:
      "Breathtakingly beautiful and amazingly advanced, the IONIQ 5 is redefining the way people look at electric cars. Concept-car design, environmentally friendly materials and an astonishing array of smart tech - this all-electric midsize CUV is a game changer.",
    highlights: [
      "Parametric Pixel dual LED DRLs",
      "20-inch alloy rims",
      "Auto-flush door handles",
      "Panoramic sunroof",
      "12.25-inch dual displays",
      "Vehicle-to-Load (V2L)",
      "Premium Bose sound system",
      "360° surround view monitor",
      "Heated and ventilated front seats",
    ],
    ranges: ["ioniq"],
    series: "I",
    category: "Electric",
    fuel: "Electric",
    cardImage: "/images/vehicles/ioniq-5.webp",
    heroImage: "/images/vehicles/ioniq-5.webp",
    gallery: ["/images/vehicles/ioniq-5.webp", "/images/vehicles/ioniq-5.webp"],
    colors: sedanColors,
    specs: [
      { label: "Powertrain", value: "100% Electric" },
      { label: "Displays", value: "12.25\" cluster + 12.25\" infotainment" },
      { label: "Audio", value: "Premium Bose" },
      { label: "V2L", value: "Vehicle-to-Load equipped" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [{ name: "IONIQ 5", price: 22540000 }],
    brochure: "/enquiry?type=brochure&model=ioniq-5",
  },
  {
    slug: "ioniq-6",
    name: "THE IONIQ 6",
    shortName: "IONIQ 6",
    tagline: "Electrified streamliner.",
    description:
      "IONIQ 6 is Hyundai’s electric streamliner - a sleek, aerodynamic sedan with pixel lighting, a digital cockpit and long-distance EV comfort for Pakistan’s motorways.",
    highlights: [
      "100% electric streamliner",
      "Parametric Pixel lighting",
      "Digital cockpit",
      "Aerodynamic silhouette",
      "Hyundai SmartSense safety",
    ],
    ranges: ["ioniq"],
    series: "I",
    category: "Electric",
    fuel: "Electric",
    cardImage: "/images/vehicles/ioniq-6.webp",
    heroImage: "/images/vehicles/ioniq-6.webp",
    gallery: ["/images/vehicles/ioniq-6.webp", "/images/vehicles/ioniq-6.webp"],
    colors: sedanColors,
    specs: [
      { label: "Powertrain", value: "100% Electric" },
      { label: "Body", value: "Streamliner sedan" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [{ name: "IONIQ 6", price: 22540000 }],
    brochure: "/enquiry?type=brochure&model=ioniq-6",
  },
  {
    slug: "porter",
    name: "THE Porter",
    shortName: "Porter",
    tagline: "The commercial workhorse.",
    description:
      "The Hyundai Porter (H-100) is built for business - a durable light commercial vehicle trusted by fleets and family enterprises across Islamabad and beyond.",
    highlights: [
      "Light commercial payload",
      "Durable workhorse platform",
      "Practical cargo bed",
      "Trusted by Pakistani fleets",
    ],
    ranges: ["hyundai"],
    series: "C",
    category: "Commercial",
    fuel: "Diesel",
    cardImage: "/images/vehicles/porter.webp",
    heroImage: "/images/vehicles/porter.webp",
    gallery: ["/images/vehicles/porter.webp", "/images/vehicles/porter.webp"],
    colors: [
      { name: "Polar White", hex: "#F4F4F2" },
      { name: "Silver Metallic", hex: "#A8ADB3" },
    ],
    specs: [
      { label: "Engine", value: "2.6L diesel" },
      { label: "Body", value: "Light commercial / H-100" },
      { label: "Warranty", value: "48 months / 100,000 km" },
    ],
    variants: [{ name: "Porter H-100", price: 4500000 }],
    brochure: "/enquiry?type=brochure&model=porter",
  },
];

export const rangeTabs: { id: VehicleRange; label: string }[] = [
  { id: "hyundai", label: "Hyundai" },
  { id: "n", label: "Hyundai N" },
  { id: "ioniq", label: "Hyundai IONIQ" },
];

export const seriesFilters: { id: VehicleSeries; label: string }[] = [
  { id: "E", label: "E" },
  { id: "S", label: "S" },
  { id: "T", label: "T" },
  { id: "I", label: "I" },
  { id: "C", label: "C" },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "elantra",
    title: "The New Elantra Hybrid",
    subtitle: "Pakistan’s first hybrid sedan",
    cta: { label: "Find Out More", href: "/models/elantra-hybrid" },
    image: "/images/hero/1.PNG",
  },
  {
    id: "ioniq-5",
    title: "The IONIQ 5",
    subtitle: "100% Electric",
    cta: { label: "Find Out More", href: "/models/ioniq-5" },
    image: "/images/hero/2.PNG",
  },
  {
    id: "sonata-n-line",
    title: "The Sonata N Line",
    subtitle: "Performance, dressed for the city",
    cta: { label: "Find Out More", href: "/models/sonata-n-line" },
    image: "/images/hero/sonata-n-line.png",
  },
];

export const featureTiles: FeatureTile[] = [
  {
    id: "ioniq-5",
    title: "The IONIQ 5",
    href: "/models/ioniq-5",
    image: "/images/vehicles/ioniq-5-tile.jpg",
  },
  {
    id: "ioniq-6",
    title: "THE New IONIQ 6",
    href: "/models/ioniq-6",
    image: "/images/vehicles/ioniq-6-tile.jpg",
  },
];

export const electricModels = vehicles.filter((vehicle) =>
  vehicle.ranges.includes("ioniq"),
);

export const stock: StockItem[] = [
  {
    id: "STK-2401",
    vehicleSlug: "elantra-hybrid",
    year: 2026,
    color: "Oxford Blue",
    transmission: "6-speed DCT",
    mileage: "New",
    price: 10761000,
    status: "In Stock",
    image: "/images/vehicles/elantra-hybrid.webp",
  },
  {
    id: "STK-2402",
    vehicleSlug: "elantra-hybrid",
    year: 2026,
    color: "Polar White",
    transmission: "6-speed DCT",
    mileage: "New",
    price: 10761000,
    status: "In Stock",
    image: "/images/vehicles/elantra-hybrid.webp",
  },
  {
    id: "STK-2403",
    vehicleSlug: "tucson-hybrid",
    year: 2026,
    color: "Phantom Black",
    transmission: "8-speed DCT",
    mileage: "New",
    price: 12202000,
    status: "In Stock",
    image: "/images/vehicles/tucson-hybrid.webp",
  },
  {
    id: "STK-2404",
    vehicleSlug: "tucson-hybrid",
    year: 2026,
    color: "Hampton Grey",
    transmission: "8-speed DCT AWD",
    mileage: "New",
    price: 13300000,
    status: "Incoming",
    image: "/images/vehicles/tucson-hybrid.webp",
  },
  {
    id: "STK-2405",
    vehicleSlug: "santa-fe-hybrid",
    year: 2026,
    color: "Magnetic Force",
    transmission: "6-speed DCT",
    mileage: "New",
    price: 13258000,
    status: "In Stock",
    image: "/images/vehicles/santa-fe.png",
  },
  {
    id: "STK-2406",
    vehicleSlug: "sonata",
    year: 2025,
    color: "Silver Metallic",
    transmission: "Automatic",
    mileage: "Demo · 1,200 km",
    price: 10385000,
    status: "Demo",
    image: "/images/vehicles/sonata.webp",
  },
  {
    id: "STK-2407",
    vehicleSlug: "sonata-n-line",
    year: 2025,
    color: "Fiery Red",
    transmission: "Automatic",
    mileage: "New",
    price: 15890000,
    status: "Incoming",
    image: "/images/vehicles/sonata-n-line.webp",
  },
  {
    id: "STK-2408",
    vehicleSlug: "ioniq-5",
    year: 2025,
    color: "Polar White",
    transmission: "Single-speed",
    mileage: "New",
    price: 22540000,
    status: "In Stock",
    image: "/images/vehicles/ioniq-5.webp",
  },
  {
    id: "STK-2409",
    vehicleSlug: "porter",
    year: 2025,
    color: "Polar White",
    transmission: "Manual",
    mileage: "New",
    price: 4500000,
    status: "In Stock",
    image: "/images/vehicles/porter.webp",
  },
];

export const offers: Offer[] = [
  {
    id: "hybrid-promo",
    title: "Hybrid range promotional pricing",
    summary:
      "Ex-factory promotional prices on Elantra Hybrid, Tucson Hybrid and Santa Fe Hybrid, valid until 31 August 2026.",
    validUntil: "31 August 2026",
    image: "/images/vehicles/elantra-hybrid.webp",
    href: "/prices",
    savings: "Save up to Rs 1,403,000",
  },
  {
    id: "elantra-limited",
    title: "All-new Elantra Hybrid - limited units",
    summary:
      "Pakistan’s first locally assembled hybrid sedan is available now at Hyundai Islamabad. Enquire for current allocation.",
    validUntil: "While stocks last",
    image: "/images/news/elantra-launch.jpg",
    href: "/models/elantra-hybrid",
  },
  {
    id: "test-drive",
    title: "Request a complimentary test drive",
    summary:
      "Experience the Hyundai range at our I-9/3 showroom. Book a test drive with our sales team.",
    validUntil: "Ongoing",
    image: "/images/vehicles/santa-fe.png",
    href: "/testdrive",
  },
];

export const news: NewsArticle[] = [
  {
    slug: "elantra-hybrid-launch",
    title: "Hyundai Launches Pakistan’s First Hybrid Sedan – The ELANTRA Hybrid",
    date: "25 October 2024",
    author: "Hyundai Islamabad",
    excerpt:
      "Hyundai has turned a new page in Pakistan’s automotive history with the launch of the locally assembled ELANTRA Hybrid.",
    image: "/images/news/elantra-launch.jpg",
    body: [
      "October 25, 2024 – Hyundai has just turned a new page in Pakistan’s automotive history with the launch of the Hyundai ELANTRA Hybrid, the country’s first locally assembled hybrid sedan. This is not merely about a new model - it represents a shift towards a smarter, cleaner and more efficient mobility solution.",
      "At a time when rising fuel costs and environmental concerns are on everyone’s mind, the ELANTRA Hybrid offers the perfect solution. It is designed not only for today but for the future, combining hybrid technology with the sleek, modern design Hyundai is known for.",
      "Powered by a Smartstream GDi HEV engine and EcoShift Dual Clutch Transmission, the ELANTRA Hybrid blends gasoline and electric power so every drive is as smooth as it is economical. An advanced energy management system adapts to driving conditions in real time.",
      "Inside, a 10.25-inch high-resolution TFT LCD cluster and infotainment with Apple CarPlay and Android Auto sit alongside heated and ventilated seats, dual-zone climate control and Hyundai safety systems including electronic parking brake with Auto-Hold and electronic stability control.",
      "By assembling the ELANTRA Hybrid in Pakistan, Hyundai is investing in the country’s manufacturing industry and leading towards a future where efficiency, performance and sustainability work together.",
    ],
  },
  {
    slug: "40000-units",
    title: "Hyundai Nishat Celebrates a Key Milestone with the Roll-out of 40,000 Units",
    date: "22 August 2024",
    author: "Hyundai Islamabad",
    excerpt:
      "Hyundai Nishat Motor celebrated the roll-out of its 40,000th unit at the Faisalabad assembly facility.",
    image: "/images/news/40000-units.jpg",
    body: [
      "Faisalabad – August 22, 2024 – Hyundai Nishat Motor (Pvt) Ltd (HNMPL) celebrated a key milestone with the roll-out of its 40,000th unit at the Faisalabad assembly facility. Mr. Hasan Mansha, Chairman of HNMPL, Mr. Yamada Masaki, CEO, and Mr. Sohail Nawaz, COO, along with senior management, attended the event.",
      "Employees were honoured for their contributions, receiving appreciation certificates for their dedication and hard work. The event highlights Hyundai Nishat Motor’s continued growth and its dedication to setting new standards in production and quality.",
      "Mr. Hasan Mansha remarked, “This milestone reflects the strength and capability of our entire team. Reaching this milestone is not just about numbers; it’s about the consistency and dedication our people bring daily.”",
      "CEO Mr. Yamada Masaki added, “This is a significant step, but our focus is always on what’s next. We’re committed to continuous improvement and ensuring our customers receive the best Hyundai has to offer.”",
    ],
  },
  {
    slug: "strategic-alliances",
    title: "Hyundai Pakistan accelerates growth through strategic alliances",
    date: "26 July 2024",
    author: "Hyundai Islamabad",
    excerpt:
      "Hyundai Nishat Motor signed an MOU focused on exporting SANTA FE HEV body-in-paint and outer painted parts.",
    image: "/images/news/alliances.jpg",
    body: [
      "Lahore – July 26, 2024 – Hyundai Nishat Motor (Pvt) Ltd signed a Memorandum of Understanding at the Nishat Hotel.",
      "The agreement focuses on exporting TM Body in Paint (BIP) and outer painted parts, aiming to meet export targets and enhance economic cooperation. Specifically, the export will include SANTA FE HEV BIP and outer auto parts, supporting production lines that lack a Body and Paint facility.",
      "Mr. Hassan Mansha said, “We are committed to expanding Hyundai’s footprint and aligning with governmental policies. This partnership represents a significant opportunity for collaboration, reinforcing our dedication to sustainability and fostering local industry growth.”",
    ],
  },
  {
    slug: "santa-fe-hybrid-launch",
    title:
      "Hyundai Pakistan Introduces the All-New Hyundai SANTA FE Hybrid: A Leap Towards Sustainable Mobility",
    date: "3 November 2023",
    author: "Hyundai Islamabad",
    excerpt:
      "Hyundai Pakistan introduced the all-new SANTA FE Hybrid, expanding the locally available hybrid SUV range.",
    image: "/images/news/santa-fe.jpg",
    body: [
      "Hyundai Pakistan introduced the all-new Hyundai SANTA FE Hybrid - a leap towards sustainable mobility for families who want three-row space without leaving hybrid efficiency behind.",
      "The SANTA FE Hybrid is available at Hyundai Islamabad in Smart FWD and Signature AWD, with Hyundai-trained technicians ready to support ownership from the first service onwards.",
    ],
  },
];

export const team: TeamMember[] = [
  { name: "Aqeel Abdullah Malik", role: "Sr. Sales Manager" },
  { name: "Tahir Hassan Qureshi", role: "Sr. Manager Sales (Fleet)" },
  { name: "Qasim Waleed", role: "Sales Executive" },
  { name: "Sadaf Hafeez", role: "Customer Relations Officer" },
  { name: "Syed Hasnain Ali Shah", role: "Sales Executive" },
  { name: "Sikandar Babar Paracha", role: "Service Manager" },
];

export const ownerManuals = [
  { name: "Elantra", href: "/enquiry?type=brochure&model=elantra-hybrid" },
  { name: "Sonata", href: "/enquiry?type=brochure&model=sonata" },
  { name: "Tucson", href: "/enquiry?type=brochure&model=tucson" },
  { name: "Santa Fe Hybrid", href: "/enquiry?type=brochure&model=santa-fe-hybrid" },
  { name: "Staria", href: "/enquiry?type=brochure" },
  { name: "Porter", href: "/enquiry?type=brochure&model=porter" },
];

export const customerPromise = {
  intro:
    "We pledge to provide outstanding service and go above and beyond to surpass your expectations.",
  pledges: [
    "Listen attentively and actively follow through on your requests.",
    "Uphold a clean, safe, and welcoming environment.",
    "Schedule appointments at your convenience.",
    "Greet you promptly upon arrival with a friendly and professional demeanor.",
    "Provide precise time and cost estimates.",
    "Seek your authorization before commencing any additional work.",
    "Thoroughly explain all repairs performed and review all associated costs.",
    "Ensure your vehicle is returned to you as agreed upon, in a clean and orderly condition.",
    "Initiate contact within three business days to confirm your satisfaction with all the services provided.",
  ],
};

export const maintenanceCharts = {
  intro:
    "Stay on top of your vehicle’s maintenance with Hyundai Islamabad’s periodic maintenance chart. Intervals below are a guide; always follow your owner’s manual.",
  columns: ["Elantra", "Sonata", "Tucson", "Santa Fe", "IONIQ", "Staria", "Grand Starex", "Porter"] as const,
  items: [
    { item: "Engine oil", values: ["5,000 km", "5,000 km", "5,000 km", "5,000 km", "5,000 km", "5,000 km", "5,000 km", "3,000 km"] },
    { item: "Oil filter", values: ["5,000 km", "5,000 km", "5,000 km", "5,000 km", "5,000 km", "5,000 km", "5,000 km", "3,000 km"] },
    { item: "Element air cleaner", values: ["20,000 km", "20,000 km", "20,000 km", "20,000 km", "20,000 km", "10,000 km", "10,000 km", "15,000 km"] },
    { item: "AC filter", values: ["15,000 km", "15,000 km", "15,000 km", "15,000 km", "15,000 km", "20,000 km", "20,000 km", "-"] },
    { item: "Spark plugs", values: ["100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km"] },
    { item: "Fuel filter", values: ["40,000 km", "40,000 km", "40,000 km", "40,000 km", "40,000 km", "60,000 km", "60,000 km", "20,000 km"] },
    { item: "Brake fluid", values: ["60,000 km", "60,000 km", "60,000 km", "60,000 km", "30,000 km", "60,000 km", "60,000 km", "60,000 km"] },
    { item: "Transmission oil", values: ["100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km", "100,000 km", "40,000 km"] },
    { item: "HSG belt", values: ["-", "-", "-", "-", "10,000 km", "-", "-", "-"] },
    { item: "Engine clutch actuator fluid", values: ["-", "-", "-", "-", "40,000 km", "-", "-", "-"] },
  ],
};

export const freeServices = [
  {
    title: "First free service",
    detail:
      "Due at 1,000 kilometres or one month from purchase, whichever comes first. Labour is complimentary; parts, lubricants or accessories if required are charged separately.",
  },
  {
    title: "Second free service",
    detail:
      "Due at 5,000 kilometres or three months from the previous service, whichever comes first.",
  },
  {
    title: "Third free service",
    detail:
      "Due at 10,000 kilometres or six months from the previous service, whichever comes first.",
  },
];

export const warranty = {
  intro:
    "A written promise from Hyundai Nishat Motor Limited to repair or replace a vehicle component that experiences a fault due to material or workmanship issues within a specified time frame.",
  period:
    "Coverage for any component in your new Hyundai vehicle, with the exceptions listed below, extends for 48 months from the original retail delivery or first use, whichever occurs first, and up to 100,000 kilometres.",
  paint:
    "The paint warranty addresses paint defects and surface corrosion (excluding perforation) resulting from defects in paint material or workmanship. It lasts 24 months from original retail delivery or first use, and up to 50,000 kilometres.",
  oem: "Tires, batteries and audio navigation units are covered by the warranties offered by their respective manufacturers. Refer to the warranty condition card supplied with your vehicle.",
  service:
    "Authorised Hyundai distributors or dealers provide warranty services at no cost for parts and labour. Warranty work performed elsewhere is not covered.",
  covered:
    "Repair or replacement of any component originally manufactured by Hyundai that is found defective in material or workmanship during normal use and maintenance, except items listed as not covered.",
  notCovered: [
    "Normal maintenance: tune-ups, alignments, lubrication, oil changes and fluid top-ups unless a replacement is required due to a defect",
    "Wear items: spark plugs, brake pads, clutch linings, wiper blades, filters, bulbs, fuses and V-belts",
    "Damage from neglect, misuse, overload, accident, theft, flooding or fire",
    "Improper fuel, fluids or non-genuine parts",
    "Modification, alteration, tampering or improper repair",
    "Incidental costs: fuel, travel, rental, lodging or loss of use",
    "Odometer alteration, airborne fallout, stone chips and similar paint or glass damage",
  ],
  owner: [
    "Follow the Owner’s Manual for use and maintenance, including severe-driving schedules.",
    "Keep records of maintenance services.",
    "Deliver the vehicle to an authorised Hyundai dealer during service hours for warranty work.",
    "Inspect trim, paint and appearance at delivery.",
  ],
};

export const aboutParagraphs = [
  "Welcome to Hyundai Islamabad, an authorised Hyundai dealership offering a wide selection of luxury-leaning sedans, SUVs, hybrids and electric vehicles, along with professional service and maintenance performed by Hyundai-trained technicians. Our showroom and workshop are located at Off 9th Avenue, I-9/3, Islamabad.",
  "Hyundai Islamabad aims to provide its valued customers with a total ownership experience that constantly satisfies each individual’s needs and exceeds their expectations in a comfortable, supportive and, above all, a safe environment.",
];

export const electricCopy = {
  heading: "HYUNDAI ELECTRIC & HYBRID",
  title: "IONIQ 5, IONIQ 6 AND THE HYBRID RANGE.",
  body: "Hyundai Islamabad offers the all-electric IONIQ 5 and IONIQ 6 alongside Elantra Hybrid, Tucson Hybrid and Santa Fe Hybrid. Enquire at the I-9/3 showroom for availability, pricing and a test drive.",
};

export const modelOptions: FormOption[] = vehicles.map((vehicle) => ({
  label: vehicle.shortName,
  value: vehicle.slug,
}));

export const serviceModelOptions: FormOption[] = [
  { label: "Elantra", value: "elantra" },
  { label: "Sonata", value: "sonata" },
  { label: "Tucson", value: "tucson" },
  { label: "Porter", value: "porter" },
  { label: "Staria", value: "staria" },
  { label: "Santa Fe Hybrid", value: "santa-fe-hybrid" },
  { label: "Starex", value: "starex" },
  { label: "Ioniq", value: "ioniq" },
  { label: "Other", value: "other" },
];

export const serviceYearOptions: FormOption[] = [
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
];

export const serviceTypes: FormOption[] = [
  { label: "General", value: "general" },
  { label: "Periodic Maintenance", value: "periodic" },
  { label: "Body Paint", value: "body" },
  { label: "Mechanical", value: "mechanical" },
  { label: "Free Service", value: "free" },
];

export const feedbackTypes: FormOption[] = [
  { label: "Query", value: "query" },
  { label: "Complaint", value: "complaint" },
  { label: "Suggestion", value: "suggestion" },
];

export function getVehicle(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getNews(slug: string) {
  return news.find((article) => article.slug === slug);
}

export function vehiclesByRange(range: VehicleRange) {
  return vehicles.filter((vehicle) => vehicle.ranges.includes(range));
}

export function formatPrice(value: number) {
  return `Rs ${value.toLocaleString("en-PK")}`;
}
