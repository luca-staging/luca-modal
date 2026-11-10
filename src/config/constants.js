import { REAL_ESTATE_IMAGES } from "./propertyImages";

export const APP_NAME = "RestateFi";
export const APP_FULL_NAME = "RestateFi Markets";
export const APP_TAGLINE =
  "Institutional access to tokenized real estate, with fractional ownership and documented rental distributions.";

export const RESTATEFI_FEATURES = [
  {
    icon: "lock",
    title: "Secure Settlement",
    desc: "Smart-contract escrow with independently verifiable ownership records.",
  },
  {
    icon: "pieChart",
    title: "Fractional Ownership",
    desc: "Allocate capital to institutional assets with a lower minimum commitment.",
  },
  {
    icon: "shield",
    title: "Investor Verification",
    desc: "Identity review is completed before any subscription is accepted.",
  },
];

/** Showcase — varied background styles */
export const RESTATEFI_SHOWCASE_PROPERTIES = [
  {
    city: "Dubai Marina",
    country: "UAE",
    type: "Living Room",
    yield: "7.4%",
    price: "$2.4M",
    featured: true,
    image: REAL_ESTATE_IMAGES.livingRoom,
  },
  {
    city: "London",
    country: "UK",
    type: "Office Room",
    yield: "6.1%",
    price: "$8.5M",
    image: REAL_ESTATE_IMAGES.officeRoom,
  },
  {
    city: "Miami Beach",
    country: "USA",
    type: "Beach",
    yield: "6.9%",
    price: "$3.2M",
    image: REAL_ESTATE_IMAGES.beach,
  },
  {
    city: "Zermatt",
    country: "Switzerland",
    type: "Hotel Room",
    yield: "4.8%",
    price: "$6.8M",
    image: REAL_ESTATE_IMAGES.hotelRoom,
  },
  {
    city: "Barcelona",
    country: "Spain",
    type: "Swimming Pool",
    yield: "7.6%",
    price: "$5.1M",
    image: REAL_ESTATE_IMAGES.pool,
  },
  {
    city: "Toronto",
    country: "Canada",
    type: "Living Room",
    yield: "5.4%",
    price: "$6.3M",
    image: REAL_ESTATE_IMAGES.livingRoomAlt,
  },
  {
    city: "Hong Kong",
    country: "Hong Kong",
    type: "Hotel Room",
    yield: "4.9%",
    price: "$18.5M",
    image: REAL_ESTATE_IMAGES.hotelRoomAlt,
  },
];

export const RESTATEFI_HERO_IMAGES = {
  livingRoom: REAL_ESTATE_IMAGES.livingRoom,
  hotelRoom: REAL_ESTATE_IMAGES.hotelRoom,
  officeRoom: REAL_ESTATE_IMAGES.officeRoom,
  beach: REAL_ESTATE_IMAGES.beach,
  pool: REAL_ESTATE_IMAGES.pool,
};

export const RESTATEFI_LOGIN_COPY = {
  eyebrow: "Institutional Real Estate · Digital Ownership",
  headline: "Invest in global property with institutional transparency",
  subhead:
    "RestateFi presents residential, commercial, and hospitality assets as tokenized interests. Qualified investors receive proportional income and a complete ownership record.",
  highlights: [
    { label: "Minimum allocation", value: "$100" },
    { label: "Average net yield", value: "6.2%" },
    { label: "Markets covered", value: "50+" },
  ],
  showcaseTitle: "Selected investment opportunities",
  showcaseDesc:
    "A cross-section of residential, commercial, and mixed-use assets currently available to qualified investors.",
};

export const PROPERTY_TYPES = [
  { value: "", label: "All Types" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "LAND", label: "Land" },
  { value: "MIXED_USE", label: "Mixed Use" },
];
