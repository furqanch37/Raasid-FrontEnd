import React from 'react';
import './style.css';
import Group from '../../../Assets/Images/certification/Group.svg';
import Group2 from '../../../Assets/Images/certification/Group2.svg';
import Group3 from '../../../Assets/Images/certification/Group3.svg';
import Group4 from '../../../Assets/Images/certification/Group4.svg';
import Group5 from '../../../Assets/Images/certification/Group5.svg';
import Group6 from '../../../Assets/Images/certification/Group6.svg';
import Group7 from '../../../Assets/Images/certification/Group7.svg';
import SectionHeading from '../../Home/SectionHeading';

const certifications = [
  {
    id: 1,
    name: 'ISO 9001:2015',
    image: Group4,
    pdf: 'EC-204183D202-Q-PANA Force Food Processing Centre (2024) (2).pdf',
  },
  {
    id: 2,
    name: 'ISO 14001:2015',
    image: Group5,
    pdf: 'EC-204183D202-E-PANA Force Food Processing Centre -2024 (2).pdf',
  },
  {
    id: 3,
    name: 'Halal Certificate',
    image: Group,
    pdf: 'EC-204183D202-HF-PANA Force Food Processing Centre -2024 (4).pdf',
  },
  {
    id: 4,
    name: 'ISO 45001:2018',
    image: Group6,
    pdf: 'EC-204183D202-O-PANA Force Food Processing Centre -2024 (1).pdf',
  },
  {
    id: 5,
    name: 'ISO 22000:2018',
    image: Group7,
    pdf: 'EC-204183D202-F-PANA Force Food Processing Centre -2024 (1).pdf',
  },
  {
    id: 6,
    name: 'ISO 14001:2015',
    image: Group3,
    pdf: 'PANA Force Food Processing Centre 14001 (4).pdf',
  },
  {
    id: 7,
    name: 'ISO 22000:2018',
    image: Group2,
    pdf: 'PANA Force Food Processing Centre 22000 (1).pdf',
  },
];

const Certifications = () => {
  const handleOpenPDF = (pdfFile) => {
    const pdfPath = `/certificates/${pdfFile}`;
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="certifications-container">
      <SectionHeading className="home-products-sec">
        <h2
          className="highlight-top lower-font"
          style={{ marginTop: '-45px', paddingBottom: '10px' }}
        >
          CERTIFICATIONS
        </h2>
      </SectionHeading>

      <div className="certifications-grid">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="cert-card"
            onClick={() => handleOpenPDF(cert.pdf)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={cert.image}
              alt={`Certification: ${cert.name}`}
              className="cert-image"
            />
            <p className="cert-name">{cert.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
