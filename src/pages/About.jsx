import { LuLeaf, LuUsers, LuHeart } from 'react-icons/lu';

export default function About() {
  return (
    <div className="pt-24 pb-0">
      {/* Hero Section */}
      <section className="relative py-32 flex items-center overflow-hidden mx-4 my-4 rounded-3xl bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="botanists working in a lush greenhouse" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPtY7VnBmPUkg0pgt3HtgfKnsmcqrTcSKrtFfU8Xpv2nlDpO-S2ydWYr5tU3UOzG3Huf5SVfnE05Iw9WjfAHoJ1MxGRJsp74w-PQKrOU9Hjt2POvlh3KIkG5U2UbsRLngUr9jbkH11UfRlPG6GgnUMY-97AdByX1X-3xa-dVsW5hk3MyKR4cnTAu6EF8c_oj-qmUT6iRvjer1LOpklsp0jYKbGqEHXzCeR1YoZoDAx6VHC5o3Xu1UQpROGzYG0kE4ufhBrjoAO5_-O" 
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-headline tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto opacity-90">Growing excellence and cultivating green spaces since 1994.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#00450D] mb-8 font-headline">A Legacy of Growth</h2>
            <div className="space-y-6 text-on-surface-variant font-body text-lg leading-relaxed">
              <p>Founded three decades ago in the heart of the countryside, Oasí. began as a small family greenhouse with a simple mission: to provide professional-grade greenery to the most demanding landscapers.</p>
              <p>Today, we represent one of the region's premier botanical archives, housing over 500 species of rare and exotic plants, all cultivated with meticulous care and temperature-controlled precision.</p>
              <p>Our commitment to sustainability and botanical integrity ensures that every plant leaving our nursery is prepared to thrive in its new environment.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="bg-primary-fixed/20 p-8 rounded-2xl">
                <LuLeaf className="w-10 h-10 text-primary mb-4" />
                <h4 className="font-bold text-xl text-primary mb-2">Purity</h4>
                <p className="text-sm text-on-surface-variant">100% organic growth methods used across our nurseries.</p>
              </div>
              <div className="bg-surface-container-high p-8 rounded-2xl">
                <h4 className="font-bold text-3xl text-primary mb-1 tracking-tight">30+</h4>
                <p className="text-sm text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">Years Experience</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-high p-8 rounded-2xl">
                <h4 className="font-bold text-3xl text-primary mb-1 tracking-tight">500+</h4>
                <p className="text-sm text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">Unique Species</p>
              </div>
              <div className="bg-secondary/10 p-8 rounded-2xl">
                <LuUsers className="w-10 h-10 text-secondary mb-4" />
                <h4 className="font-bold text-xl text-secondary mb-2">Community</h4>
                <p className="text-sm text-on-surface-variant">Supporting over 2,000 landscape professionals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-primary pt-24 pb-24 px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <LuHeart className="w-10 h-10 text-primary-fixed" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-headline text-primary-fixed">Our Philosophy</h2>
          <p className="text-2xl md:text-3xl font-body italic leading-relaxed text-white/90">
            "We don't just sell plants; we archive the living beauty of our planet to ensure it continues to inspire future generations."
          </p>
          <div className="mt-12 w-24 h-1 bg-primary-fixed/30 mx-auto rounded-full"></div>
        </div>
      </section>
    </div>
  );
}
