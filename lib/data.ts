export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: "Shirts" | "Outerwear" | "Pants" | "Accessories"
  imageBg: string
  tag: string
  collections: ("men" | "women" | "outerwear")[]
  discountPercent?: number
  countdownDays?: number
  priceRange?: string
  imageUrl?: string
  hoverImageUrl?: string
}

export interface Slide {
  id: number
  subtitle: string
  titleLight: string
  titleBold: string
  description: string
  buttonText: string
  buttonLink: string
  bgColorClass: string
  imageSrc?: string
  imageAlt?: string
  visualIcon?: "shopping-bag" | "none"
}

export interface TrustPoint {
  id: string
  iconName: "Truck" | "RefreshCw" | "ShieldCheck"
  title: string
  description: string
}

export interface Announcement {
  code: string
  discountText: string
  fullMessage: string
}

// Unified products list
export const products: Product[] = [
  {
    id: 102,
    name: "Basic Colored Sweatpants With Elastic Hems",
    price: 19.90,
    originalPrice: 25.90,
    rating: 5.0,
    reviews: 2,
    category: "Pants",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "24%",
    discountPercent: 24,
    imageUrl: "/products/orange-hoodie.png",
    hoverImageUrl: "/products/orange-hoodie-back.png",
    collections: ["women", "men"]
  },
  {
    id: 101,
    name: "Basic High Neck Puff Jacket",
    price: 69.00,
    originalPrice: 89.00,
    rating: 5.0,
    reviews: 1,
    category: "Outerwear",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "TRENDING",
    discountPercent: 23,
    imageUrl: "/products/puffer-jacket.png",
    hoverImageUrl: "/products/puffer-jacket-back.png",
    collections: ["women", "outerwear"]
  },
  {
    id: 104,
    name: "Basic Relax Fit Leggings",
    price: 24.90,
    originalPrice: 29.90,
    rating: 5.0,
    reviews: 1,
    category: "Pants",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "17%",
    discountPercent: 17,
    imageUrl: "/products/sweatshirt-dress.png",
    hoverImageUrl: "/products/sweatshirt-dress-back.png",
    collections: ["women"]
  },
  {
    id: 105,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 106,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 107,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 108,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 109,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 110,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 111,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 112,
    name: "Blue Starter Logo T-Shirt",
    price: 18.70,
    originalPrice: 22.70,
    rating: 5.0,
    reviews: 1,
    category: "Shirts",
    imageBg: "from-zinc-100 to-zinc-200",
    tag: "18%",
    discountPercent: 18,
    countdownDays: 78,
    imageUrl: "/products/orange-tshirt.png",
    hoverImageUrl: "/products/orange-tshirt-back.png",
    collections: ["women"]
  },
  {
    id: 1,
    name: "Minimalist Linen Blend Shirt",
    price: 59.00,
    originalPrice: 89.00,
    rating: 4.8,
    reviews: 124,
    category: "Shirts",
    imageBg: "from-amber-100 to-orange-100 dark:from-zinc-900 dark:to-zinc-800",
    tag: "Best Seller",
    collections: ["women", "men"]
  },
  {
    id: 2,
    name: "Relaxed Fit Trench Coat",
    price: 149.00,
    rating: 4.9,
    reviews: 86,
    category: "Outerwear",
    imageBg: "from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700",
    tag: "New Arrival",
    collections: ["outerwear", "men"]
  },
  {
    id: 3,
    name: "Classic Leather Crossbody Bag",
    price: 85.00,
    originalPrice: 120.00,
    rating: 4.7,
    reviews: 62,
    category: "Accessories",
    imageBg: "from-rose-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-850",
    tag: "Sale",
    collections: ["women"]
  },
  {
    id: 4,
    name: "Tailored Wide-Leg Trousers",
    price: 75.00,
    rating: 4.6,
    reviews: 95,
    category: "Pants",
    imageBg: "from-sky-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-900",
    tag: "Popular",
    collections: ["women"]
  },
  {
    id: 5,
    name: "Premium Cotton Tee",
    price: 49.99,
    rating: 4.8,
    reviews: 410,
    category: "Shirts",
    imageBg: "from-purple-50 to-indigo-50 dark:from-zinc-855 dark:to-zinc-900",
    tag: "Essential",
    collections: ["men"]
  },
  {
    id: 6,
    name: "Wool Bomber Jacket",
    price: 199.00,
    originalPrice: 249.00,
    rating: 4.9,
    reviews: 34,
    category: "Outerwear",
    imageBg: "from-emerald-50 to-teal-50 dark:from-zinc-900 dark:to-zinc-800",
    tag: "Premium",
    collections: ["outerwear"]
  },
  {
    id: 7,
    name: "Linen Drawstring Shorts",
    price: 45.00,
    rating: 4.5,
    reviews: 58,
    category: "Pants",
    imageBg: "from-amber-50 to-stone-100 dark:from-zinc-850 dark:to-zinc-800",
    tag: "Summer",
    collections: ["men"]
  },
  {
    id: 8,
    name: "Suede Chelsea Boots",
    price: 180.00,
    rating: 4.8,
    reviews: 79,
    category: "Accessories",
    imageBg: "from-yellow-100/30 to-amber-100/40 dark:from-zinc-900 dark:to-zinc-850",
    tag: "Classic",
    collections: ["men"]
  }
]

// Unified Hero slides
export const heroSlides: Slide[] = [
  {
    id: 1,
    subtitle: "WINTER 2022 COLLECTION",
    titleLight: "Valentin Paul",
    titleBold: "Essential Collection",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    buttonText: "Shop Collection",
    buttonLink: "/shop",
    bgColorClass: "bg-[#eaeaea] dark:bg-zinc-900",
    imageSrc: "/products/ImageBag1.png",
    imageAlt: "Valentin Paul Winter Collection"
  },
  {
    id: 2,
    subtitle: "SPRING 2026 SELECTIONS",
    titleLight: "Organic Cotton",
    titleBold: "Minimalist Essentials",
    description: "Lightweight, breathable staples made from organically sourced cotton fibers. Designed to fit the modern home lifestyle.",
    buttonText: "View Catalog",
    buttonLink: "/shop",
    bgColorClass: "bg-[#e6e9e4] dark:bg-zinc-850",
     imageSrc: "/products/ImageBag2.png",
    visualIcon: "shopping-bag"
  },
  {
    id: 3,
    subtitle: "SPRING 2026 SELECTIONS",
    titleLight: "Organic Cotton",
    titleBold: "Minimalist Essentials",
    description: "Lightweight, breathable staples made from organically sourced cotton fibers. Designed to fit the modern home lifestyle.",
    buttonText: "View Catalog",
    buttonLink: "/shop",
     imageSrc: "/products/ImageBag3.png",
    bgColorClass: "bg-[#e6e9e4] dark:bg-zinc-850",
    visualIcon: "shopping-bag"
  },
  {
    id: 4,
    subtitle: "SPRING 2026 SELECTIONS",
    titleLight: "Organic Cotton",
    titleBold: "Minimalist Essentials",
    description: "Lightweight, breathable staples made from organically sourced cotton fibers. Designed to fit the modern home lifestyle.",
    buttonText: "View Catalog",
    imageSrc: "/products/ImageBag4.png",
    buttonLink: "/shop",
    bgColorClass: "bg-[#e6e9e4] dark:bg-zinc-850",
    visualIcon: "shopping-bag"
  }
]

// Trust points
export const trustPoints: TrustPoint[] = [
  {
    id: "shipping",
    iconName: "Truck",
    title: "Free Shipping Worldwide",
    description: "Complimentary delivery on all orders over $150."
  },
  {
    id: "returns",
    iconName: "RefreshCw",
    title: "30-Day Free Returns",
    description: "No questions asked return policy with prepaid shipping labels."
  },
  {
    id: "security",
    iconName: "ShieldCheck",
    title: "Secured Checkout",
    description: "Top level SSL protection with secure credit card and payment processing."
  }
]

// Category metadata
export const categoriesMetadata = {
  women: {
    title: "Womens Collection",
    subtitle: "Collections",
    description: "Discover a curation of refined, modern essentials crafted with meticulous attention to comfort, fit, and materials.",
    tagline: "EXQUISITE MATERIALS • TIMELESS AESTHETICS"
  },
  men: {
    title: "Mens Collection",
    subtitle: "Collections",
    description: "Upgrade your signature look with our selection of modern mens knitwear, casual shirts, tailored pants, and timeless boots.",
    tagline: "MODERN SILHOUETTES • EVERYDAY LUXURY"
  },
  outerwear: {
    title: "Outerwear Collection",
    subtitle: "Collections",
    description: "Stay warm in premium cuts. Our outerwear collection features organic wool blend bombers, water-resistant trenches, and classic heavy coats.",
    tagline: "WEATHER RESISTANT • TAILORED FINISH"
  }
}

// Announcement details
export const announcement: Announcement = {
  code: "CLOTYA50",
  discountText: "Up to 50% OFF",
  fullMessage: "Mid-Season Sale: Up to 50% OFF. Use Code: CLOTYA50"
}

export interface DetailedProductMeta {
  description: string
  colors: { name: string; hex: string }[]
  sizes: string[]
  defaultSize: string
  weight: string
  dimensions: string
  tags: string[]
}

export function getProductDetails(product: Product): DetailedProductMeta {
  const category = product.category;
  
  if (category === "Pants") {
    return {
      description: "Super comfortable joggers featuring elasticized waist and hems. Designed for the perfect casual fit, made from organic heavy-weight cotton fleece.",
      colors: [
        { name: "black", hex: "#000000" },
        { name: "gray", hex: "#718096" },
        { name: "beige", hex: "#ecdccf" },
        { name: "blue", hex: "#2b6cb0" },
        { name: "green", hex: "#22543d" },
        { name: "red", hex: "#9b2c2c" },
        { name: "pink", hex: "#d53f8c" },
      ],
      sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
      defaultSize: "XL",
      weight: "0.55 kg",
      dimensions: "30 x 20 x 4 cm",
      tags: ["pants", "casual", "sweatpants", "elastic"]
    }
  } else if (category === "Outerwear") {
    return {
      description: "A premium cut outerwear piece designed to shield you from elements. Filled with lightweight insulation and finished with custom zipper detailing.",
      colors: [
        { name: "black", hex: "#000000" },
        { name: "beige", hex: "#ecdccf" },
        { name: "green", hex: "#22543d" },
        { name: "orange", hex: "#dd6b20" },
        { name: "white", hex: "#ffffff" },
      ],
      sizes: ["S", "M", "L", "XL"],
      defaultSize: "M",
      weight: "0.85 kg",
      dimensions: "40 x 30 x 8 cm",
      tags: ["outerwear", "jacket", "warm", "insulated"]
    }
  } else if (category === "Shirts") {
    return {
      description: "Classic fit essential cotton top. Crafted with soft, highly breathable natural fibers to ensure day-long comfort and a clean modern silhouette.",
      colors: [
        { name: "white", hex: "#ffffff" },
        { name: "gray", hex: "#718096" },
        { name: "blue", hex: "#2b6cb0" },
        { name: "orange", hex: "#dd6b20" },
        { name: "pink", hex: "#d53f8c" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      defaultSize: "S",
      weight: "0.25 kg",
      dimensions: "25 x 18 x 2 cm",
      tags: ["shirt", "cotton", "tshirt", "breathable"]
    }
  } else {
    return {
      description: "Fine minimalist accessory. The perfect addition to your curated wardrobe, crafted with durable premium materials for daily utility.",
      colors: [
        { name: "black", hex: "#000000" },
        { name: "beige", hex: "#ecdccf" },
        { name: "orange", hex: "#dd6b20" },
      ],
      sizes: ["One Size"],
      defaultSize: "One Size",
      weight: "0.40 kg",
      dimensions: "20 x 15 x 6 cm",
      tags: ["accessory", "leather", "classic", "essential"]
    }
  }
}
