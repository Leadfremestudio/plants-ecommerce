import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div>
          <h1 className="text-5xl font-extrabold text-[#00450D] mb-6 font-headline tracking-tight">Contact Us</h1>
          <p className="text-xl text-on-surface-variant font-body mb-12">Have questions about our wholesale availability or custom specimen sourcing? Our botanical experts are ready to assist you.</p>
          
          <div className="space-y-8">
            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiMail className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary mb-1">Email Our Nursery</h4>
                <a href="mailto:hello@verdantarchive.com" className="text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4">hello@verdantarchive.com</a>
                <p className="text-on-surface-variant text-sm mt-1">Response time: ~2 hours</p>
              </div>
            </div>
            
            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiPhone className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary mb-1">Wholesale Hotline</h4>
                <a href="tel:+919747830192" className="text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4">+91 97478 30192</a>
                <p className="text-on-surface-variant text-sm mt-1">Mon-Fri, 9am - 6pm IST</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiMapPin className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary mb-1">Main Arboretum</h4>
                <p className="text-on-surface-variant group-hover:text-on-surface transition-colors">42 Greenhouse Row, Botanical District</p>
                <p className="text-on-surface-variant group-hover:text-on-surface transition-colors">Pune, MH - 411001</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiClock className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary mb-1">Visiting Hours</h4>
                <p className="text-on-surface-variant group-hover:text-on-surface transition-colors">Tours available by appointment only.</p>
                <p className="text-on-surface-variant text-sm italic mt-1 group-hover:text-on-surface transition-colors">Closed on Sundays.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="w-full h-[500px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3956694572244!2d73.8569528!3d18.5113945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06950275817%3A0xe543c7267571dbb!2sEmpress%20Botanical%20Garden!5e0!3m2!1sen!2sin!4v1712773456789!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Oasí. Botanical Garden Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
