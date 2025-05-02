import Newsletter from './Newsletter';
import SectionHeading from './SectionHeading';

const SixthSection = () => {
  return (
    <section className="sixth-section">
      <SectionHeading title="Savoring our" subtitle="Heritage" />

      <div className="sixth-card-wrap">
        <div className="card">
          <h1>70+</h1>
          <p>Cities, nation-wide products available</p>
        </div>
        <div className="card">
          <h1>35+</h1>
          <p>Pure and blended spices are part of Rassid</p>
        </div>
        <div className="card">
          <h1>1.2 million</h1>
          <p>Products of Rassid are distributed each year</p>
        </div>
      </div>

      <Newsletter />
    </section>
  );
};

export default SixthSection;
