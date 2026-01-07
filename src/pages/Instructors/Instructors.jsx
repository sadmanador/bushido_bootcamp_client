import { useLoaderData } from "react-router-dom";
import InstructorCard from "../../components/common/InstructorCard";
import MiddleAlign from "../../components/common/MiddleAlign";
import SectionHeader from "../../components/common/SectionHeader";
import SectionImgBg from "../../components/common/SectionImgBg";

const Instructors = () => {
  const teachers = useLoaderData();
  return (
    <SectionImgBg bg_img={"https://photos.tpn.to/nk/fr/in/fm/1600x900.webp"}>
      <SectionHeader
        heading="Instructors"
        subHeading="Martial arts is not just about fighting, it's about building character."
      ></SectionHeader>
      <MiddleAlign>
        <div className="grid grid-cols-master pb-12">
          <div className="card glass p-4 rounded-tr-none rounded-br-none">
            <h2 className="text-center font-semibold text-2xl">
              Honoring Our Masters: Guardians of Martial Arts Excellence
            </h2>
            <p>
              In the realm of martial arts, our summer camp school stands as a
              sanctuary of learning, growth, and self-discovery. As we invite
              you to embark on an unforgettable journey, we do so under the
              guidance and expertise of our esteemed martial arts masters. Allow
              us to share why joining our summer camp school is an opportunity
              you won't want to miss, from the perspective of these exceptional
              mentors.
              <br />
              <br />
              Our masters, with their extensive experience and profound
              understanding of martial arts, have designed our summer camp as a
              transformative experience. They have crafted a curriculum that
              blends traditional teachings with innovative training techniques,
              tailored to inspire and challenge students of all levels. By
              joining our summer camp, you open yourself up to a world of
              knowledge and skill enhancement under their expert guidance.
              <br />
              <br />
              Each master embodies the true essence of martial arts and serves
              as a living testament to the power of dedication and discipline.
              They have dedicated their lives to the pursuit of excellence,
              honing their craft with unwavering commitment. By training under
              these masters, you have the opportunity to absorb their wisdom, to
              witness firsthand the artistry and precision that comes with years
              of practice. Beyond their technical proficiency, our masters are
              passionate educators and compassionate mentors. They possess an
              innate ability to ignite the spark of inspiration within each
              student, fostering an environment of encouragement and support.
              <br />
              <br /> By joining our summer camp school, you will be embraced by
              a community that values growth, camaraderie, and the pursuit of
              personal excellence. In the presence of our masters, you will not
              only learn the physical aspects of martial arts but also gain
              invaluable life lessons. They impart the values of respect,
              discipline, and resilience, nurturing the development of
              well-rounded individuals both on and off the training floor.
              <br />
              <br />
              The teachings extend far beyond the technical skills, empowering
              students to become better versions of themselves in every aspect
              of life. Our summer camp school is a unique opportunity to train
              alongside and be mentored by these extraordinary masters. It is a
              chance to be part of a lineage of martial arts excellence, to
              carry forward the knowledge and traditions that have been passed
              down through generations. By joining our summer camp, you become a
              custodian of the martial arts legacy, embodying the spirit of
              those who came before you. In conclusion, joining our summer camp
              school means embracing the wisdom, guidance, and inspiration of
              our martial arts masters.
              <br />
              <br />
              It is an opportunity to embark on a transformative journey, guided
              by their expertise and fueled by their passion. By immersing
              yourself in this experience, you not only refine your martial arts
              skills but also nurture personal growth, forge lifelong
              friendships, and become part of a legacy that transcends time.
              Embrace the teachings of our masters, seize the opportunity to
              train under their guidance, and join our summer camp school to
              unlock your full potential in the art of martial arts. The path to
              greatness awaits you.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {teachers.map((item, index) => {
              return <InstructorCard key={index} item={item} email={false} />;
            })}
          </div>
        </div>
      </MiddleAlign>
    </SectionImgBg>
  );
};

export default Instructors;
