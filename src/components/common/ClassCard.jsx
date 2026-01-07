const ClassCard = ({ item }) => {
  const { image, name, instructor, seats, price, instructor_img, enrolled } = item;
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-bushido-red/20 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-bushido-red text-white font-bold px-4 py-1 rounded-full shadow-lg">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 pt-12 relative">
        {/* Instructor Avatar */}
        <div className="absolute -top-10 left-8">
          <div className="w-20 h-20 rounded-2xl ring-4 ring-slate-900 overflow-hidden shadow-xl rotate-3 transition-transform duration-500 group-hover:rotate-0">
            <img src={instructor_img} alt={instructor} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-bushido-red text-xs font-bold tracking-widest uppercase mb-1">Master: {instructor}</p>
          <h2 className="text-2xl font-black text-white russo-one-regular leading-tight group-hover:text-bushido-red transition-colors">{name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Students</span>
            <span className="text-white font-bold">{enrolled} Enrolled</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Availability</span>
            <span className={`font-bold ${seats === 0 ? 'text-red-500' : 'text-emerald-400'}`}>
              {seats === 0 ? 'Full' : `${seats} Seats`}
            </span>
          </div>
        </div>
        
        <button className="w-full mt-6 btn-premium py-3 rounded-xl font-bold uppercase text-xs tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Book Class
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
