import React from 'react';
import GroupIcon from '../../Assets/Images/all-sections/four/Group.svg';
import HalalIcon from '../../Assets/Images/all-sections/four/emojione-monotone_shallow-pan-of-food.svg';
import PlantIcon from '../../Assets/Images/all-sections/four/ri_plant-fill.svg';
import SectionHeading from './SectionHeading';

const whyChooseData = [
  { id: 1, imgSrc: GroupIcon, title: 'Halal' },
  { id: 2, imgSrc: HalalIcon, title: 'Authentic Taste' },
  { id: 3, imgSrc: PlantIcon, title: 'No Preservatives' },
];

const WhyChooseRaasid = () => {
  return (
    <section className="fourth-section">
      <SectionHeading title="Why choose" subtitle="Raasid" />

      <div className="fourth-cards-wrap">
        {whyChooseData.map((item) => (
          <div key={item.id} className="card">
            <div className="card-image">
              <img src={item.imgSrc} alt={item.title} />
            </div>
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseRaasid;
