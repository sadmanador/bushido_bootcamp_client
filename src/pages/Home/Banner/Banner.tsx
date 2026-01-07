import "keen-slider/keen-slider.min.css";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import "./styles.css";

const carousel = (slider: KeenSliderInstance<any, any, any>) => {
  const z = 300;
  function rotate() {
    const trackDetails = slider.track.details;
    if (!trackDetails) return;
    const deg = 360 * trackDetails.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

export default function Banner() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [
      carousel,
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
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

  return (
    <div className="wrapper hidden lg:block">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          <div className="carousel__cell number-slide1 flex flex-col">
            <img src="assets/image/banner/aikido.jpg" alt="Aikido" />
            <div className="carousel__overlay"></div>
            <p>Aikido</p>
          </div>
          <div className="carousel__cell number-slide2 flex flex-col">
            <img src="assets/image/banner/judo.jpg" alt="Judo" />
            <div className="carousel__overlay"></div>
            <p>Judo</p>
          </div>
          <div className="carousel__cell number-slide3 flex flex-col">
            <img src="assets/image/banner/kendo.jpg" alt="Kendo" />
            <div className="carousel__overlay"></div>
            <p>Kendo</p>
          </div>
          <div className="carousel__cell number-slide4 flex flex-col">
            <img src="assets/image/banner/kung_fu.jpg" alt="Kung Fu" />
            <div className="carousel__overlay"></div>
            <p>Kung Fu</p>
          </div>
          <div className="carousel__cell number-slide5 flex flex-col">
            <img src="assets/image/banner/sumo.jpg" alt="Sumo" />
            <div className="carousel__overlay"></div>
            <p>Sumo</p>
          </div>
          <div className="carousel__cell number-slide6 flex flex-col">
            <img src="assets/image/banner/taekwondo.webp" alt="Taekwondo" />
            <div className="carousel__overlay"></div>
            <p>Taekwondo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
