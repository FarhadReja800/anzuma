// "use client";

// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import Image from "next/image";
// import { Product } from "@/lib/data";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
//   CarouselDots
// } from "@/components/ui/carousel";

// // Custom type extending Product to include gallery images for 4-angle hover effect
// interface GalleryProduct extends Product {
//   galleryImages: string[];
// }

// const products: GalleryProduct[] = [
//   {
//     id: 1,
//     name: "Short Nylon-Effect Puffer Jacket",
//     price: 29.90,
//     originalPrice: 39.90,
//     priceRange: "$29.90 – $39.90",
//     rating: 4.5,
//     reviews: 2,
//     category: "Outerwear",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "26%",
//     collections: ["women"],
//     discountPercent: 26,
//     countdownDays: 76,
//     imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
//     galleryImages: [
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 2,
//     name: "Pouch Pocket Hoodie Orange",
//     price: 29.50,
//     originalPrice: 37.50,
//     rating: 5,
//     reviews: 1,
//     category: "Outerwear",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "22%",
//     collections: ["men"],
//     discountPercent: 22,
//     imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
//     galleryImages: [
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 3,
//     name: "Blue Starter Logo T-shirt",
//     price: 18.70,
//     originalPrice: 22.70,
//     rating: 4.8,
//     reviews: 1,
//     category: "Shirts",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "18%",
//     collections: ["men"],
//     discountPercent: 18,
//     countdownDays: 77,
//     imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
//     galleryImages: [
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 4,
//     name: "Long Sleeve Sweatshirt Dress",
//     price: 24.90,
//     originalPrice: 29.90,
//     rating: 4,
//     reviews: 1,
//     category: "Outerwear",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "17%",
//     collections: ["women"],
//     discountPercent: 17,
//     imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
//     galleryImages: [
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 5,
//     name: "Basic Colored Sweatpants With Elastic Hems",
//     price: 19.90,
//     originalPrice: 25.90,
//     rating: 5.0,
//     reviews: 2,
//     category: "Pants",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "24%",
//     collections: ["women", "men"],
//     discountPercent: 24,
//     imageUrl: "/products/orange-hoodie.png",
//     galleryImages: [
//       "/products/orange-hoodie.png",
//       "/products/orange-hoodie-back.png",
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 6,
//     name: "Basic High Neck Puff Jacket",
//     price: 69.00,
//     originalPrice: 89.00,
//     rating: 5.0,
//     reviews: 1,
//     category: "Outerwear",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "TRENDING",
//     collections: ["women", "outerwear"],
//     discountPercent: 23,
//     imageUrl: "/products/puffer-jacket.png",
//     galleryImages: [
//       "/products/puffer-jacket.png",
//       "/products/puffer-jacket-back.png",
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 7,
//     name: "Basic Relax Fit Leggings",
//     price: 24.90,
//     originalPrice: 29.90,
//     rating: 5.0,
//     reviews: 1,
//     category: "Pants",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "17%",
//     collections: ["women"],
//     discountPercent: 17,
//     imageUrl: "/products/sweatshirt-dress.png",
//     galleryImages: [
//       "/products/sweatshirt-dress.png",
//       "/products/sweatshirt-dress-back.png",
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
//     ]
//   },
//   {
//     id: 8,
//     name: "Blue Starter Logo T-Shirt",
//     price: 18.70,
//     originalPrice: 22.70,
//     rating: 5.0,
//     reviews: 1,
//     category: "Shirts",
//     imageBg: "from-zinc-100 to-zinc-200",
//     tag: "18%",
//     collections: ["women", "men"],
//     discountPercent: 18,
//     countdownDays: 78,
//     imageUrl: "/products/orange-tshirt.png",
//     galleryImages: [
//       "/products/orange-tshirt.png",
//       "/products/orange-tshirt-back.png",
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
//     ]
//   }
// ];

// interface ProductCardItemProps {
//   product: GalleryProduct;
// }

// function ProductCardItem({ product }: ProductCardItemProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     isExpired: false
//   });

//   // Dynamic countdown calculations
//   useEffect(() => {
//     if (!product.countdownDays) return;

//     const targetDate = new Date();
//     targetDate.setDate(targetDate.getDate() + product.countdownDays);
//     targetDate.setHours(targetDate.getHours() + 7);
//     targetDate.setMinutes(targetDate.getMinutes() + 12);
//     targetDate.setSeconds(targetDate.getSeconds() + 22);

//     const updateTimer = () => {
//       const now = new Date().getTime();
//       const difference = targetDate.getTime() - now;

//       if (difference <= 0) {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
//         return;
//       }

//       const d = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const s = Math.floor((difference % (1000 * 60)) / 1000);

//       setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isExpired: false });
//     };

//     updateTimer();
//     const timer = setInterval(updateTimer, 1000);
//     return () => clearInterval(timer);
//   }, [product.countdownDays]);

//   const formatPrice = (price: number) => {
//     return `$${price.toFixed(2)}`;
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setActiveImageIndex(0); // Reset to primary image when cursor leaves
//   };

//   return (
//     <div
//       className="flex flex-col w-full text-left group cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Image Container */}
//       <div className="relative aspect-[3/4] bg-[#EDEDED] w-full overflow-hidden mb-3">
//         {/* Layered images with dynamic opacity for instant hover transitions */}
//         {product.galleryImages.map((imgUrl, idx) => (
//           <Image
//             key={idx}
//             src={imgUrl}
//             alt={product.name}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
//             className={`object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
//               idx === activeImageIndex ? "opacity-100" : "opacity-0 pointer-events-none"
//             }`}
//           />
//         ))}

//         {/* Hover Zones - 4 invisible panels side-by-side to track cursor angle */}
//         <div className="absolute inset-0 flex z-30 opacity-0 group-hover:opacity-100">
//           <div
//             className="flex-1 h-full cursor-pointer"
//             onMouseEnter={() => setActiveImageIndex(0)}
//           />
//           <div
//             className="flex-1 h-full cursor-pointer"
//             onMouseEnter={() => setActiveImageIndex(1)}
//           />
//           <div
//             className="flex-1 h-full cursor-pointer"
//             onMouseEnter={() => setActiveImageIndex(2)}
//           />
//           <div
//             className="flex-1 h-full cursor-pointer"
//             onMouseEnter={() => setActiveImageIndex(3)}
//           />
//         </div>

//         {/* Discount Badge */}
//         {product.discountPercent && (
//           <span className="absolute top-3 left-3 bg-[#eefcf3] text-[#10b981] px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase rounded-xs z-10 shadow-xs">
//             {product.discountPercent}%
//           </span>
//         )}

//         {/* Countdown Timer (Pill styled like screenshot) */}
//         {product.countdownDays && !timeLeft.isExpired && (
//           <div
//             className={`absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs py-1 px-2.5 text-center shadow-xs rounded-[2px] transition-all duration-300 z-10 min-w-[160px] flex items-center justify-center ${
//               isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
//             }`}
//           >
//             <div className="flex items-center justify-center gap-0.5 font-sans text-[10px]">
//               <span className="font-semibold text-neutral-800 mx-0.5">{timeLeft.days}</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">d</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">:</span>
//               <span className="font-semibold text-neutral-800 mx-0.5">{timeLeft.hours.toString().padStart(2, "0")}</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">h</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">:</span>
//               <span className="font-semibold text-neutral-800 mx-0.5">{timeLeft.minutes.toString().padStart(2, "0")}</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">m</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">:</span>
//               <span className="font-semibold text-neutral-800 mx-0.5">{timeLeft.seconds.toString().padStart(2, "0")}</span>
//               <span className="text-neutral-400 font-light text-[9px] mx-0.5">s</span>
//             </div>
//           </div>
//         )}

//         {/* Image Slide Indicators (Bottom border lines, hides if countdown is showing and card is not hovered) */}
//         <div
//           className={`absolute bottom-0 left-0 right-0 h-[2.5px] flex gap-[2px] px-1 transition-opacity duration-300 z-20 ${
//             product.countdownDays && !timeLeft.isExpired && !isHovered ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           {Array.from({ length: 4 }).map((_, idx) => (
//             <div
//               key={idx}
//               className={`flex-1 h-full transition-colors duration-200 ${
//                 idx === activeImageIndex ? "bg-neutral-800" : "bg-neutral-300/60"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Product Metadata */}
//       <div className="flex flex-col gap-1 px-0.5">
//         {/* Reviews */}
//         <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
//           <Star className="w-3 h-3 fill-[#FFC107] stroke-[#FFC107]" />
//           <span>{product.reviews} {product.reviews > 1 ? "reviews" : "review"}</span>
//         </div>

//         {/* Title */}
//         <h3 className="text-xs md:text-[13px] font-normal text-neutral-900 tracking-wide leading-snug line-clamp-2 min-h-[36px]">
//           {product.name}
//         </h3>

//         {/* Price Tag (Renders range or discount dynamically) */}
//         <div className="flex items-center gap-2 mt-0.5 text-[13px]">
//           {product.priceRange ? (
//             <span className="font-semibold text-neutral-900">
//               {product.priceRange}
//             </span>
//           ) : (
//             <>
//               {product.originalPrice && (
//                 <span className="text-neutral-400 line-through font-normal">
//                   {formatPrice(product.originalPrice)}
//                 </span>
//               )}
//               <span className="font-semibold text-neutral-900">
//                 {formatPrice(product.price)}
//               </span>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function FeaturedProducts() {
//   // Chunk 8 products into pages of 4 items for the Carousel slides
//   const chunkedProducts = [
//     products.slice(0, 4),
//     products.slice(4, 8)
//   ];

//   return (
//     <section className="w-full px-4 py-16 bg-white text-neutral-900 font-sans">
//       {/* Centered Desktop Layout Container with expanded maximum width */}
//       <div className="max-w-[1200px] mx-auto relative">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
//           <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 whitespace-nowrap">
//             Featured Products
//           </h2>
//           <p className="text-xs md:text-sm text-neutral-400 max-w-[600px] leading-relaxed font-normal">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//             dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
//             lacus vel facilisis.
//           </p>
//         </div>

//         {/* Carousel / Grid Wrapper with Navigation Arrows */}
//         <div className="relative px-2 sm:px-0">
//           <Carousel autoplay={false} className="group relative w-full !overflow-visible">
//             <div className="overflow-hidden w-full">
//               <CarouselContent>
//                 {chunkedProducts.map((chunk, pageIndex) => (
//                   <CarouselItem key={pageIndex}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                       {chunk.map((product) => (
//                         <ProductCardItem key={product.id} product={product} />
//                       ))}
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//             </div>

//             {/* Premium navigation arrows overlay */}
//             <CarouselPrevious className="absolute -left-4 md:-left-8 lg:-left-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-400 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />
//             <CarouselNext className="absolute -right-4 md:-right-8 lg:-left-12 top-[35%] -translate-y-1/2 z-30 hidden md:inline-flex !bg-transparent hover:!bg-transparent !border-none text-zinc-400 hover:text-zinc-900 dark:text-zinc-650 dark:hover:text-zinc-150 !opacity-100 hover:!opacity-100 !shadow-none h-12 w-12 cursor-pointer transition-colors" />

//             {/* Pagination indicator dots below */}
//             <CarouselDots className="relative bottom-0 left-0 translate-x-0 mt-10 justify-center" />
//           </Carousel>
//         </div>

//       </div>
//     </section>
//   );
// }