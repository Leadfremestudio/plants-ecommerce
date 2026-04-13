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
      <section className="relative min-h-[70vh] flex items-center overflow-hidden mx-4 my-4 rounded-[2rem] md:rounded-[3rem]">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" alt="expansive wholesale nursery garden with premium botanical specimens" src="/featured/nursery_garden.webp" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed/20 backdrop-blur-md text-primary-fixed font-bold tracking-widest uppercase mb-4 text-xs md:text-sm">Direct From Growers</span>
            <h1 className="mb-6 tracking-tight font-black leading-[1.05]">Wholesale Plants <br className="hidden md:block"/> Directly from Growers</h1>
            <p className="text-lg md:text-2xl font-body mb-10 opacity-90 max-w-2xl mx-auto font-medium">Bulk orders • Best prices • Fresh nursery stock delivered across the region.</p>
            <div className="flex justify-center">
              <Link to="/browse" className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 w-max">
                Browse Plants <LuArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="fluid-py bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 block">Just In</span>
              <h2 className="mb-4 text-primary font-black">New Arrivals</h2>
              <p className="text-on-surface-variant font-body text-base md:text-lg">Freshly sourced specimens straight from our botanical nursery</p>
            </div>
            <div className="flex gap-3">
              <button className="new-prev p-3 md:p-4 rounded-2xl bg-surface-container-high text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                <LuChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button className="new-next p-3 md:p-4 rounded-2xl bg-surface-container-high text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                <LuChevronRight className="w-5 h-5 md:w-6 md:h-6" />
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
              spaceBetween={20}
              slidesPerView={1.2}
              navigation={{ prevEl: '.new-prev', nextEl: '.new-next' }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 32 },
              }}
              className="product-swiper !overflow-visible"
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

          <div className="mt-12 md:mt-16 flex justify-center">
            <Link to="/browse" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-secondary transition-all hover:shadow-lg flex items-center gap-2">
              View All Products <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="fluid-py bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-primary font-black">Featured Collection</h2>
                <p className="text-on-surface-variant font-body">Our hand-picked best sellers and featured landscaping choices</p>
              </div>
              <div className="flex gap-3">
                <button className="featured-prev p-3 md:p-4 rounded-2xl bg-white text-primary hover:bg-primary-fixed transition-all shadow-sm active:scale-95 disabled:opacity-50">
                  <LuChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button className="featured-next p-3 md:p-4 rounded-2xl bg-white text-primary hover:bg-primary-fixed transition-all shadow-sm active:scale-95 disabled:opacity-50">
                  <LuChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              navigation={{
                prevEl: '.featured-prev',
                nextEl: '.featured-next',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 32 },
              }}
              className="product-swiper !overflow-visible"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="mt-12 md:mt-16 flex justify-center">
              <Link to="/browse" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all flex items-center gap-2">
                Explore Best Sellers <LuArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="fluid-py bg-primary text-white rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto mb-16 px-6 md:px-12 text-center">
          <h2 className="text-primary-fixed font-black mb-4">Why Choose Us</h2>
          <p className="text-primary-fixed/80 font-body text-base md:text-lg max-w-2xl mx-auto">The standard for botanical excellence and professional nursery services</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: LuLeaf, title: "Direct Nursery", desc: "Eliminate middlemen. Our plants are grown on-site by botanical experts." },
            { icon: LuDollarSign, title: "Bulk Pricing", desc: "Tiered pricing models designed specifically for landscape designers." },
            { icon: LuSprout, title: "Fresh Stock", desc: "Daily harvests ensure every tray delivered is at peak vitality." },
            { icon: LuTruck, title: "Fast Delivery", desc: "Climate controlled logistics to maintain integrity until your door." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 md:p-10 rounded-[2.5rem] bg-surface-container-low/5 backdrop-blur-sm hover:bg-[#F9FBE7] hover:scale-[1.02] transition-all border border-white/10 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <item.icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 text-primary-fixed group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-primary-fixed/70 group-hover:text-on-surface-variant transition-colors text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials section */}
      <section className="fluid-py bg-surface-container overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
            <div>
              <h2 className="text-primary font-black">Client Voices</h2>
              <p className="text-on-surface-variant font-body italic opacity-80">Voices of Oasí. botanical excellence across the region</p>
            </div>
            <div className="flex gap-3">
              <button className="feedback-prev p-3 md:p-4 rounded-2xl bg-white text-primary hover:bg-primary-fixed transition-all active:scale-95 disabled:opacity-50">
                <LuChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button className="feedback-next p-3 md:p-4 rounded-2xl bg-white text-primary hover:bg-primary-fixed transition-all active:scale-95 disabled:opacity-50">
                <LuChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: '.feedback-prev', nextEl: '.feedback-next' }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 32 },
            }}
            className="feedback-swiper !overflow-visible"
          >
            {feedbacks.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-primary/5 hover:shadow-2xl transition-all h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-6 md:mb-8">
                      {[...Array(5)].map((_, i) => <LuStar key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-base md:text-xl text-primary font-body italic leading-relaxed mb-10">"{item.comment}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={item.avatar} className="w-12 h-12 rounded-full border-2 border-primary/10" alt={item.name} />
                    <div>
                      <h4 className="text-base md:text-lg font-black text-primary">{item.name}</h4>
                      <p className="text-[10px] md:text-xs font-bold text-primary/50 tracking-widest uppercase">{item.role}</p>
                    </div>
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
