import AboutMainImg from '../../Assets/Images/all-sections/two/one.svg';
import FoodTurkeyIcon from '../../Assets/Images/all-sections/two/mdi_food-turkey.png';
import NaturalProductsIcon from '../../Assets/Images/all-sections/two/Group.svg';
import GreenLeafImg from '../../Assets/Images/all-sections/two/vecteezy_ai-generated-3d-green-leaf-isolated-on-transparent-background_36743863 1.png';
import GroupImg from '../../Assets/Images/all-sections/two/Group 4.png';
import PakistanMealImg from '../../Assets/Images/all-sections/two/top-view-pakistan-meal-composition 2.png';

const AboutSection = () => {
  return (
    <section className="second-section">
      <img
        src={AboutMainImg}
        alt="RAASID"
        style={{ zIndex: 5 }}
        className="about-main-img"
      />
      <div className="about-text">
        <h1>A Promise of Excellence</h1>
        <p>
          Welcome to RAASID, where tradition meets innovation to deliver premium
          food products crafted with excellence at PANA Force Food Processing
          Center.
          <br />
          <br />
          We offer ready-to-eat meals, refreshing juices, premium spices,
          mineral water, and nutritious granola bars, all designed to simplify
          your life and elevate the dining experience.
          <br />
          <br />
          At RAASID, food is more than sustenance—it’s about connection and
          celebration. Every product reflects our commitment to quality,
          authenticity, and customer satisfaction, making RAASID a trusted
          choice for unforgettable flavors.
        </p>

        <div className="about-branding">
          <div className="about-branding-card">
            <img src={FoodTurkeyIcon} alt="Authentic food" />
            <h2>Authentic food</h2>
          </div>
          <div className="about-branding-card">
            <img src={NaturalProductsIcon} alt="Natural products" />
            <h2>Natural products</h2>
          </div>
        </div>
        <img src={GreenLeafImg} alt="Green Leaf" className="second-three" />
      </div>
      <img src={GroupImg} alt="Decoration" className="second-one" />
      <img src={PakistanMealImg} alt="Pakistani Meal" className="second-two" />
    </section>
  );
};

export default AboutSection;
