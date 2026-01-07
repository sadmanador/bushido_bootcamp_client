
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-bushido-red rounded-lg flex items-center justify-center font-black text-white text-xl">B</div>
               <span className="text-white font-black text-xl tracking-tight russo-one-regular">BUSHIDO</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering individuals through the ancient wisdom and discipline of martial arts. Join our community and discover your true potential.
            </p>
            <div className="flex gap-4">
              {/* Simple Social Icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-bushido-red hover:text-white transition-all flex items-center justify-center cursor-pointer">f</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-bushido-red hover:text-white transition-all flex items-center justify-center cursor-pointer">t</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-bushido-red hover:text-white transition-all flex items-center justify-center cursor-pointer">i</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Academy</h4>
              <ul className="space-y-4 text-sm">
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Our Story</a></li>
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Grand Masters</a></li>
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Training Gallery</a></li>
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Disciplines</h4>
              <ul className="space-y-4 text-sm">
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Aikido</a></li>
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Jujitsu</a></li>
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Kung Fu</a></li>
                <li><a className="hover:text-bushido-red transition-colors cursor-pointer">Sumo</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-xs">Subscribe to get training tips and updates.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="warrior@email.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all font-medium"
              />
              <button className="absolute right-2 top-1.5 bg-bushido-red text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs">
          <p>© 2024 Bushido Bootcamp. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Privacy Policy</a>
            <a className="hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
