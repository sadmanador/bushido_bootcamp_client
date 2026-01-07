import "keen-slider/keen-slider.min.css";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import React from "react";
import { Fade } from "react-awesome-reveal";
import SectionHeader from "../../../components/common/SectionHeader";

const Gallery: React.FC = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
    },
    [
      (slider: KeenSliderInstance) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const galleryItems = [
    {
      quote: "Achieve what you wish for",
      img: "assets/image/gallery/gallery1.png"
    },
    {
      quote: "Obedience and peace is the key",
      img: "assets/image/gallery/gallery2.webp"
    },
    {
      quote: "Fire up your inner warrior",
      img: "assets/image/gallery/gallery3.jpg"
    },
    {
      quote: "The consistent one stays ahead",
      img: "assets/image/gallery/gallery4.jpg"
    },
    {
      quote: "Become who you were meant to be",
      img: "assets/image/gallery/gallery5.jpg"
    }
  ];

  return (
    <div className="bg-slate-900 py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <SectionHeader heading="Training Gallery" subHeading="A glimpse into the life of a modern warrior" />
        
        <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl shadow-bushido-red/10 border border-white/5">
          <div ref={sliderRef} className="keen-slider h-[500px] md:h-[700px]">
            {galleryItems.map((item, index) => (
              <div key={index} className="keen-slider__slide relative overflow-hidden">
                <img 
                   // Using public path or relative path - assuming assets is in public
                  src={item.img} 
                  alt={`Gallery ${index + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-20 left-10 md:left-20 max-w-2xl">
                  <Fade triggerOnce direction="up">
                    <p className="text-bushido-red font-bold tracking-[0.3em] uppercase text-xs mb-4">Training Moments</p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white russo-one-regular leading-tight italic">
                      &quot;{item.quote}&quot;
                    </h2>
                  </Fade>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Hints */}
          <div className="absolute bottom-10 right-10 flex gap-2">
            <div className="w-12 h-1 w-2 bg-bushido-red rounded-full"></div>
            <div className="w-2 h-1 bg-white/20 rounded-full"></div>
            <div className="w-2 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
