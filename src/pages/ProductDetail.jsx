import { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LuShoppingCart, LuChevronRight, LuChevronLeft, LuStar, LuTruck, LuShieldCheck, LuLeaf } from 'react-icons/lu';
import QuantitySelector from '../components/QuantitySelector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { addToCart } = useCart();

  const product = useMemo(() => {
    return products.find(p => p.id === parseInt(id)) || products[0];
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-primary">Product not found</h2>
        <Link to="/browse" className="text-primary hover:underline mt-4 inline-block">Back to Browse</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-on-surface-variant font-body mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <LuChevronRight className="w-4 h-4" />
        <Link to="/browse" className="hover:text-primary transition-colors">{product.category} Plants</Link>
        <LuChevronRight className="w-4 h-4" />
        <span className="text-on-surface font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images Carousel */}
        <div className="space-y-4">
          <div className="relative group rounded-2xl overflow-hidden shadow-sm">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation={{
                prevEl: '.product-prev',
                nextEl: '.product-next',
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              className="product-main-swiper aspect-[4/5] bg-surface-container-low"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img className="w-full h-full object-cover" alt={`${product.name} view ${index + 1}`} src={img} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Arrows */}
            <button className="product-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-primary hover:bg-primary hover:text-white transition-all shadow-md disabled:opacity-0 pointer-events-auto">
              <LuChevronLeft className="w-6 h-6" />
            </button>
            <button className="product-next absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-primary hover:bg-primary hover:text-white transition-all shadow-md disabled:opacity-0 pointer-events-auto">
              <LuChevronRight className="w-6 h-6" />
            </button>
            
            {product.inStock && (
              <span className="absolute top-6 right-6 z-10 bg-primary-fixed text-on-primary-fixed text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">In Stock</span>
            )}
          </div>

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="product-thumbs-swiper h-24"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index} className="overflow-hidden rounded-xl cursor-pointer border-2 border-transparent transition-colors !h-full">
                <img className="w-full h-full object-cover" alt={`Thumbnail ${index + 1}`} src={img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 font-headline tracking-tight">{product.name}</h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body mb-6">{product.scientificName} • Specimen Grade</p>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-amber-400">
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm text-on-surface-variant font-body">4.9 (128 wholesale reviews)</span>
          </div>

          <div className="mb-10">
            <div className="text-2xl font-bold text-on-surface mb-4">{product.price} <span className="text-lg text-on-surface-variant font-normal">/ unit</span></div>
            <p className="text-on-surface-variant font-body leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-3 font-headline">Quantity</h3>
              <div className="flex items-center gap-4">
                <QuantitySelector 
                  size="md"
                  quantity={quantity}
                  onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                  onIncrease={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-12">
            <button 
              className="flex-1 bg-surface-container-highest text-on-surface py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <LuShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button 
              className="flex-1 bg-primary text-white py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-secondary transition-colors"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-outline-variant/30">
            <div className="flex flex-col gap-2">
              <LuTruck className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-on-surface font-headline">Shipping</h4>
              <p className="text-xs text-on-surface-variant font-body">Palletized delivery available nationwide.</p>
            </div>
            <div className="flex flex-col gap-2">
              <LuShieldCheck className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-on-surface font-headline">Quality Guarantee</h4>
              <p className="text-xs text-on-surface-variant font-body">Inspected for pests and disease before dispatch.</p>
            </div>
            <div className="flex flex-col gap-2">
              <LuLeaf className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-on-surface font-headline">Acclimated</h4>
              <p className="text-xs text-on-surface-variant font-body">Grown in 60% shade for indoor readiness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
