import { Link } from 'react-router-dom';
import { LuArrowRight, LuChevronLeft, LuChevronRight, LuLeaf, LuDollarSign, LuSprout, LuTruck, LuStar, LuLoader } from 'react-icons/lu';
import { Navigation, Autoplay } from 'swiper/modules';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProducts } from '../context/ProductContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  const { products, loading } = useProducts();

  // Show latest products first
  const latestProducts = [...products].reverse();

  // 1. New Arrivals: The 8 most recently added items
  const newArrivals = latestProducts.slice(0, 8);
  
  // 2. Featured: Filter for Featured or Best Sellers
  const featuredProducts = latestProducts.filter(p => 
    p.tag === 'Featured' || p.tag === 'Best Seller'
  ).slice(0, 8);

  // 3. Premium: Filter for Premium or Rare
  const premiumProducts = latestProducts.filter(p => 
    p.tag === 'Premium' || p.tag === 'Rare' || p.category === 'Rare'
  ).slice(0, 8);

  const feedbacks = [
    {
      id: 1,
      name: "Aman Sharma",
      role: "Interior Designer",
      comment: "The quality of the Ficus Lyrata I received was exceptional. It has completely transformed my client's living space. Professional nursery care shows in every leaf.",
      avatar: "https://i.pravatar.cc/150?u=aman"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Landscape Architect",
      comment: "Oasí. provides specimens that are truly premium. Their bonsai collection is one of the best I've found in the country. Highly recommended for high-end projects.",
      avatar: "https://i.pravatar.cc/150?u=priya"
    },
    {
      id: 3,
      name: "Rahul Mehra",
      role: "Collector",
      comment: "Shipping was flawless. The plant arrived in perfect condition, perfectly acclimated and ready for my indoor garden. The premium packaging is a great touch.",
      avatar: "https://i.pravatar.cc/150?u=rahul"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center overflow-hidden mx-4 my-4 rounded-xl">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" alt="expansive wholesale nursery garden with premium botanical specimens" src="/featured/nursery_garden.webp" />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed/20 backdrop-blur-md text-primary-fixed font-bold tracking-widest uppercase mb-6">Direct From Growers</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6 tracking-tight font-headline">Wholesale Plants Directly from Growers</h1>
            <p className="text-lg md:text-2xl font-body mb-10 opacity-90 max-w-2xl mx-auto font-medium">Bulk orders • Best prices • Fresh nursery stock delivered across the region.</p>
            <div className="flex justify-center">
              <Link to="/browse" className="bg-primary-fixed text-on-primary-fixed px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-max mx-auto md:mx-0">
                Browse Plants <LuArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-2 block">Just In</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-2 font-headline tracking-tight">New Arrivals</h2>
              <p className="text-on-surface-variant font-body text-lg">Freshly sourced specimens straight from our botanical nursery</p>
            </div>
            <div className="flex gap-2">
              <button className="new-prev p-3 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <LuChevronLeft className="w-6 h-6" />
              </button>
              <button className="new-next p-3 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <LuChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LuLoader className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : newArrivals.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              navigation={{ prevEl: '.new-prev', nextEl: '.new-next' }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="product-swiper"
            >
              {newArrivals.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-20 bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant">
              <p className="text-on-surface-variant font-medium">No botanical specimens found in the inventory yet.</p>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link to="/browse" className="bg-primary text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-secondary transition-colors flex items-center gap-2">
              View All Products <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 font-headline">Featured Collection</h2>
                <p className="text-on-surface-variant font-body">Our hand-picked best sellers and featured landscaping choices</p>
              </div>
            <div className="flex gap-2">
              <button className="featured-prev p-3 rounded-full bg-white text-primary hover:bg-primary-fixed transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <button className="featured-next p-3 rounded-full bg-white text-primary hover:bg-primary-fixed transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <LuChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <LuLoader className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              navigation={{
                prevEl: '.featured-prev',
                nextEl: '.featured-next',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="product-swiper"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
            
            <div className="mt-16 flex justify-center">
              <Link to="/browse" className="bg-primary text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-secondary transition-colors flex items-center gap-2">
                View All Products <LuArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Premium Products */}
      {premiumProducts.length > 0 && (
        <section className="py-24 bg-surface overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 font-headline">Premium Specimens</h2>
                <p className="text-on-surface-variant font-body">Exclusive and rare specimens for high-end landscape architecture</p>
              </div>
              <div className="flex gap-2">
                <button className="premium-prev p-3 rounded-full bg-white text-primary hover:bg-primary-fixed transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  <LuChevronLeft className="w-5 h-5" />
                </button>
                <button className="premium-next p-3 rounded-full bg-white text-primary hover:bg-primary-fixed transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  <LuChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <LuLoader className="w-12 h-12 text-primary animate-spin" />
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={32}
                slidesPerView={1}
                navigation={{
                  prevEl: '.premium-prev',
                  nextEl: '.premium-next',
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="product-swiper"
              >
                {premiumProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard 
                      product={product} 
                      className="border border-outline-variant/30" 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            
            <div className="mt-16 flex justify-center">
              <Link to="/browse" className="bg-primary text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-secondary transition-colors flex items-center gap-2">
                View All Products <LuArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-24 bg-primary px-8 text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline text-primary-fixed">Why Choose Us</h2>
          <p className="text-primary-fixed/80 font-body text-lg">The standard for botanical excellence and professional nursery services</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#F9FBE7] hover:shadow-xl transition-all border border-primary/10 group">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LuLeaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline text-[#00450D]">Direct from Nursery</h3>
            <p className="text-[#44483D] font-body">Eliminate middlemen. Our plants are grown and cared for on-site by botanical experts.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#F9FBE7] hover:shadow-xl transition-all border border-primary/10 group">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LuDollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline text-[#00450D]">Bulk Pricing</h3>
            <p className="text-[#44483D] font-body">Tiered pricing models designed specifically for landscape designers and garden centers.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#F9FBE7] hover:shadow-xl transition-all border border-primary/10 group">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LuSprout className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline text-[#00450D]">Fresh Stock</h3>
            <p className="text-[#44483D] font-body">Daily harvests ensure that every tray delivered is at the peak of its vitality and health.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#F9FBE7] hover:shadow-xl transition-all border border-primary/10 group">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LuTruck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline text-[#00450D]">Fast Delivery</h3>
            <p className="text-[#44483D] font-body">Temperature controlled logistics to maintain plant integrity from our greenhouse to your door.</p>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-24 bg-surface-container overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 font-headline">Client Testimonials</h2>
              <p className="text-on-surface-variant font-body italic opacity-80">Voices of Oasí. botanical excellence across the region</p>
            </div>
            <div className="flex gap-2">
              <button className="feedback-prev p-3 rounded-full bg-white text-primary hover:bg-primary-fixed transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <button className="feedback-next p-3 rounded-full bg-white text-primary hover:bg-primary-fixed transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <LuChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.feedback-prev',
              nextEl: '.feedback-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="feedback-swiper"
          >
            {feedbacks.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white p-10 rounded-[40px] border border-primary/5 hover:shadow-xl transition-all h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-6">
                      <LuStar className="w-4 h-4 fill-current" />
                      <LuStar className="w-4 h-4 fill-current" />
                      <LuStar className="w-4 h-4 fill-current" />
                      <LuStar className="w-4 h-4 fill-current" />
                      <LuStar className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-lg text-[#00450D] font-body italic leading-relaxed mb-8">"{item.comment}"</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#00450D] font-headline">{item.name}</h4>
                    <p className="text-sm font-bold text-primary tracking-widest uppercase opacity-60">{item.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
