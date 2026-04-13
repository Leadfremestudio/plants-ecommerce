import { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LuShoppingCart, LuChevronRight, LuChevronLeft, LuStar, LuTruck, LuShieldCheck, LuLeaf, LuLoader } from 'react-icons/lu';
import QuantitySelector from '../components/QuantitySelector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { addToCart } = useCart();

  const product = useMemo(() => {
    if (!products || products.length === 0) return null;
    return products.find(p => String(p.id) === String(id));
  }, [products, id]);

  // CRITICAL SAFETY GUARD: Prevent crash if product is loading or missing
  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LuLoader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-primary mb-4">Plant Not Found</h2>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">
          The specimen you're searching for might have moved to a different greenhouse or is temporarily unavailable.
        </p>
        <button 
          onClick={() => window.location.href = '/browse'}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
        >
          Back to Greenhouse
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LuLoader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-primary">Product not found</h2>
        <Link to="/browse" className="text-primary hover:underline mt-4 inline-block">Back to Browse</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 fluid-px max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant font-body mb-6 md:mb-10 uppercase tracking-widest font-black">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <LuChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        <Link to="/browse" className="hover:text-primary transition-colors">{product.category}</Link>
        <LuChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        <span className="text-on-surface truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {/* Product Images Carousel */}
        <div className="space-y-4">
          <div className="relative group rounded-3xl overflow-hidden shadow-sm aspect-square md:aspect-[4/5]">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation={{
                prevEl: '.product-prev',
                nextEl: '.product-next',
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              className="product-main-swiper w-full h-full bg-surface-container-low"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img 
                    className="w-full h-full object-cover" 
                    alt={`${product.name} view ${index + 1}`} 
                    src={img} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Arrows */}
            <button className="product-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-primary hover:bg-primary hover:text-white transition-all shadow-md active:scale-90 hidden md:flex">
              <LuChevronLeft className="w-6 h-6" />
            </button>
            <button className="product-next absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-primary hover:bg-primary hover:text-white transition-all shadow-md active:scale-90 hidden md:flex">
              <LuChevronRight className="w-6 h-6" />
            </button>
            
            {product.inStock && (
              <span className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-primary-fixed text-on-primary-fixed text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">In Stock</span>
            )}
          </div>

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="product-thumbs-swiper h-20 md:h-24"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index} className="overflow-hidden rounded-2xl cursor-pointer border-2 border-transparent transition-colors !h-full">
                <img 
                  className="w-full h-full object-cover" 
                  alt={`Thumbnail ${index + 1}`} 
                  src={img} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-primary font-black mb-2 md:mb-4">{product.name}</h1>
          {product.scientificName && (
            <p className="text-base md:text-xl text-on-surface-variant font-body mb-6 italic opacity-70">
              {product.scientificName}
            </p>
          )}
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <LuStar key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-[10px] md:text-xs text-on-surface-variant font-black uppercase tracking-widest opacity-60">128 Wholesale Reviews</span>
          </div>

          <div className="mb-10">
            <div className="text-2xl md:text-3xl font-black text-on-surface mb-6">{product.price} <span className="text-sm md:text-base text-on-surface-variant font-medium">/ unit</span></div>
            <p className="text-sm md:text-lg text-on-surface-variant font-body leading-relaxed md:leading-loose">{product.description}</p>
          </div>

          <div className="space-y-6 mb-10">
            {product.inStock ? (
              <div>
                <h3 className="text-[10px] md:text-xs font-black text-on-surface uppercase tracking-[0.2em] mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <QuantitySelector 
                    size="md"
                    quantity={quantity}
                    onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                    onIncrease={() => setQuantity(quantity + 1)}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-error/5 text-error px-6 py-4 rounded-3xl flex items-center gap-3 border border-error/10">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">Temporarily Out of Stock</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {!product.inStock ? (
              <button 
                disabled
                className="flex-1 bg-surface-container-highest text-on-surface-variant/40 py-4 rounded-2xl font-black text-lg cursor-not-allowed border border-outline-variant/10 flex items-center justify-center gap-2"
              >
                In Production
              </button>
            ) : (
              <>
                <button 
                  className="flex-1 bg-surface-container-high text-on-surface py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 md:gap-4 group shadow-sm"
                  onClick={handleAddToCart}
                >
                  <LuShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Add to Cart
                </button>
                <button 
                  className="flex-1 bg-primary text-white py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg hover:bg-secondary transition-all active:scale-95 shadow-lg shadow-primary/10"
                  onClick={handleBuyNow}
                >
                  Quick Checkout
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-outline-variant/10">
            {[
              { icon: LuTruck, title: "Shipping", desc: "Express wholesale logistics." },
              { icon: LuShieldCheck, title: "Quality", desc: "Nursery inspected specimens." },
              { icon: LuLeaf, title: "Acclimated", desc: "Greenhouse conditioned stock." }
            ].map((item, i) => (
              <div key={i} className="flex items-start sm:flex-col gap-4 sm:gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                   <h4 className="font-black text-xs md:text-sm text-on-surface uppercase tracking-widest mb-1">{item.title}</h4>
                   <p className="text-[10px] md:text-xs text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
