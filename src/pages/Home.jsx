import { Link } from 'react-router-dom';
import { LuArrowRight, LuChevronLeft, LuChevronRight, LuLeaf, LuDollarSign, LuSprout, LuTruck } from 'react-icons/lu';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {

  const featuredProducts = [
    { id: 1, name: 'Desert Rose', category: 'Flowering', price: '₹4,500', image: '/featured/desert_rose.webp', tag: 'In Stock' },
    { id: 2, name: 'Exotic Monstera', category: 'Indoor', price: '₹2,600', image: '/featured/indoor_cat.webp', tag: 'Available' },
    { id: 3, name: 'Asian Juniper Bonsai', category: 'Rare', price: '₹3,900', image: '/featured/hero_bonsai.webp', tag: 'Wholesale Only' },
    { id: 4, name: 'Premium Adenium', category: 'Flowering', price: '₹6,900', image: '/featured/adenium_cat.webp', tag: 'Best Seller' },
  ];

  const premiumProducts = [
    { id: 5, name: 'Rare Philodendron', category: 'Indoor', price: '₹5,200', image: '/featured/exotic_indoor_plant.webp', tag: 'Premium' },
    { id: 6, name: 'Masterpiece Bonsai', category: 'Rare', price: '₹9,800', image: '/featured/bonsai_cat.webp', tag: 'Landscaping' },
    { id: 7, name: 'Nursery Garden Scape', category: 'Outdoor', price: '₹4,100', image: '/featured/nursery_garden.webp', tag: 'Seasonal' },
    { id: 8, name: 'Specimen Desert Rose', category: 'Flowering', price: '₹3,200', image: '/featured/desert_rose.webp', tag: 'Organic' },
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6 tracking-tight font-headline">Wholesale Plants Directly from Growers</h1>
            <p className="text-lg md:text-2xl font-body mb-10 opacity-90 max-w-2xl mx-auto font-medium">Bulk orders • Best prices • Fresh nursery stock delivered across the region.</p>
            <div className="flex justify-center">
              <Link to="/browse" className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-max">
                Browse Plants <LuArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-2 font-headline">Featured Products</h2>
              <p className="text-on-surface-variant font-body">Premium stock ready for immediate wholesale dispatch</p>
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
          
          <div className="mt-16 flex justify-center">
            <Link to="/browse" className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors flex items-center gap-2">
              View All Products <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Products */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-2 font-headline">Premium Products</h2>
              <p className="text-on-surface-variant font-body">Exclusive and rare specimens for high-end landscaping</p>
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
          
          <div className="mt-16 flex justify-center">
            <Link to="/browse" className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors flex items-center gap-2">
              View All Products <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary px-8 text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-primary-fixed">Why Choose Us</h2>
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
    </div>
  );
}
