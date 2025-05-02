import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Styles/product-owl-nav.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import arrow from "../../Assets/Images/all-sections/product-category-sec/cat_arrow.png";
import {
  GiChiliPepper,
  GiHotMeal,
  GiFruitBowl,
  GiWrappedSweet,
  GiMeal,
} from 'react-icons/gi';

import spicesBanner from '../../Assets/Images/all-sections/product-category-sec/spices-cat-slider-banner.png';
import readyToEatBanner from '../../Assets/Images/all-sections/product-category-sec/ready-to-cat-slider-banner.png';
import fruitPreservesBanner from '../../Assets/Images/all-sections/product-category-sec/fruite-preserves-slider-banner.png';
import granolaBarsBanner from '../../Assets/Images/all-sections/product-category-sec/granola_bars.png';
import mresBanner from '../../Assets/Images/all-sections/product-category-sec/mre-cat-slider-banner.png';

import spicesDynamic from '../../Assets/Images/all-sections/product-category-sec/spicea-ab-cat-sli.png';
import readyToEatDynamic from '../../Assets/Images/all-sections/product-category-sec/ready-to-cat-ab-slid.png';
import fruitPreservesDynamic from '../../Assets/Images/all-sections/product-category-sec/fruite-absloute-cat-slider.png';
import granolaBarsDynamic from '../../Assets/Images/all-sections/product-category-sec/bars-abslo-cat.png';
import mresDynamic from '../../Assets/Images/all-sections/product-category-sec/MRES-ab-cat.png';
import SectionHeading from './SectionHeading';

const categories = [
  { id: 'spices', icon: <GiChiliPepper />, name: 'Spices' },
  { id: 'readytoeat', icon: <GiHotMeal />, name: 'Ready to Eat' },
  { id: 'fruitspreserves', icon: <GiFruitBowl />, name: 'Fruits Preserves' },
  { id: 'granolabars', icon: <GiWrappedSweet />, name: 'Granola Bars' },
  { id: 'mres', icon: <GiMeal />, name: 'One Day Meals', description: "No description available No description available No description available" },
];

const sliderItems = [
  {
    id: 'spices',
    title: 'Spices',
    desc: 'Add flavor, elevate every dish.',
    img: spicesBanner,
    dynamicImg: spicesDynamic,
  },
  {
    id: 'readytoeat',
    title: 'Ready to Eat',
    desc: 'Convenient and delicious.',
    img: readyToEatBanner,
    dynamicImg: readyToEatDynamic,
  },
  {
    id: 'fruitspreserves',
    title: 'Fruits Preserves',
    desc: 'Taste of nature, preserved.',
    img: fruitPreservesBanner,
    dynamicImg: fruitPreservesDynamic,
  },
  {
    id: 'granolabars',
    title: 'Granola Bars',
    desc: 'Nutritious and energy-packed.',
    img: granolaBarsBanner,
    dynamicImg: granolaBarsDynamic,
  },
  {
    id: 'mres',
    title: 'One Day Meals',
    desc: 'Ready for any adventure.',
    img: mresBanner,
    dynamicImg: mresDynamic,
  },
]; const mresSubCategories = [
  { id: 'all', name: 'All' },
  { id: 'with-fuel-tablets', name: 'With Fuel Tablets' },
  { id: 'with-flameless-ration-heaters', name: 'Flameless Ration Heaters' }
];
const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [showSubCategories, setShowSubCategories] = useState(null);
  useEffect(() => {
    if (categoryParam && categoryParam !== 'all') return;

    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
        setIsExiting(false);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [categoryParam]);
  
  
  const handleCategoryClick = (category) => {
      navigate(`/products?category=${category}`);
    setSelectedCategory(category);
    setShowSubCategories((prev) => (prev === category ? null : category));
  };
  
  const handleSubCategoryClick = (subcategory) => {
    setSelectedSubCategory(subcategory);
  
    setTimeout(() => {
      navigate(`/products?category=mres&subcategory=${subcategory}`);
    }, 50);
  };
  

  const activeCategory =
    categoryParam && categoryParam !== 'all'
      ? sliderItems.find((item) => item.id === categoryParam)
      : null;
  const isProductsPage = location.pathname === '/products';

  return (
    <section
      className={`product-category-sec ${isProductsPage ? '' : 'with-padding'}`}
    >
      <SectionHeading
        className="home-products-sec"
        style={isProductsPage ? { marginTop: '70px' } : {}}
      >
        {isProductsPage ? (
          <h2
            className="highlight-top"
            style={{ marginTop: '-45px', paddingBottom: '10px' }}
          >
            Categories
          </h2>
        ) : (
          <>
            <h1>You Will Love</h1>
            <h2>Products</h2>
          </>
        )}
      </SectionHeading>

      <div className="cust-container">
        <div className="cust-row">
          <div className="col-100">
            <div
              className={`product-category-slider-wrap ${
                isProductsPage ? 'auto-height' : 'fixed-height'
              }`}
            >
              {/* Category Navigation */}
              <div
                className="cat-navigation"
                style={
                  isProductsPage
                    ? { paddingTop: '50px', paddingBottom: '50px' }
                    : {}
                }
              >
              {categories.map((cat, index) => (
        <div
          key={cat.id}
          className={`cat-nav-item ${
            cat.id === categoryParam || (!categoryParam && index === currentIndex) ? 'active' : ''
          }`}
          onClick={() => {
            if (location.pathname === '/products') {
              handleCategoryClick(cat.id);
            } else {
              handleCategoryClick(cat.id);
            }
          }}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <div className="cat-nav-im-wrap">
            <div className="cat-icon">{cat.icon}</div>
          </div>
          <div className={` ${cat.id === "mres" && showSubCategories === "mres" ? "bordered-div" : ""}`}>


          <span style={{ gap: '15px' }} className='display-flex'>
          <span 
  className={`mres-cat-name ${cat.id === "mres" && location.pathname === "/products" && (!showSubCategories || selectedSubCategory === "") ? "adjust-margin" : ""}`}
>
  {cat.name}
</span>

  {cat.id === "mres" && location.pathname === "/products" && (
    <img 
      src={arrow} 
      alt="arrow" 
      style={{ transform: showSubCategories === "mres" ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s ease" }}
      className='cat-arrow-img' 
    />
  )}
</span>


          {showSubCategories === "mres" && cat.id === "mres" && (
  <div className="category-tooltip">
    {mresSubCategories.map((subCat) => (
      <div
        key={subCat.id}
        className={`sub-cat-item ${subCat.id === selectedSubCategory ? "active" : ""}`}
        onClick={() => handleSubCategoryClick(subCat.id)}
      >
        {subCat.name}
      </div>
    ))} 
  </div>
)}</div>

        </div>
      ))}

              </div>

              {/* Only render when the route is NOT exactly "/products" */}
              {location.pathname !== '/products' &&
                (activeCategory ? (
                  <div className="category-slider">
                    <div className="slider-item">
                      <div className="cat-slider-content active">
                        <div className="heading-cat">
                          <h2>{activeCategory.title}</h2>
                          <p>{activeCategory.desc}</p>
                        </div>
                        <div className="cat-slider-banner">
                          <img
                            className="slider-image"
                            src={activeCategory.img}
                            alt={activeCategory.title}
                          />
                        </div>
                        <div className="explore-btn-wrap">
                          <Link
                            className="explore-btn"
                            to={`/products?category=${activeCategory.id}`}
                          >
                            Explore More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Auto-slider when ?category=all or no category param
                  <div className="category-slider">
                    <div className="slider-item">
                      <div
                        className={`cat-slider-content ${isExiting ? 'exit' : 'active'}`}
                        key={currentIndex}
                      >
                        <div className="heading-cat">
                          <h2>{sliderItems[currentIndex].title}</h2>
                          <p>{sliderItems[currentIndex].desc}</p>
                        </div>
                        <div className="cat-slider-banner">
                          <img
                            className="slider-image"
                            src={sliderItems[currentIndex].img}
                            alt={sliderItems[currentIndex].title}
                          />
                        </div>
                        <div className="explore-btn-wrap">
                          <Link
                            className="explore-btn"
                            to={`/products?category=${sliderItems[currentIndex].id}`}
                          >
                            Explore More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="prod-cat-dynamic-images">
                {sliderItems.map((item, index) => (
                  <img
                    key={index}
                    id={`dynamic-img-${index + 1}`}
                    className={`floating-img ${
                      location.pathname === '/products'
                        ? '' // Hide all floating images when on "/products"
                        : categoryParam
                          ? categoryParam === categories[index]?.id
                            ? 'active'
                            : 'hidden'
                          : index === currentIndex
                            ? 'active'
                            : ''
                    }`}
                    src={item.dynamicImg}
                    alt={item.title}
                  />
                ))}
              </div>

              {location.pathname !== '/products' && !activeCategory && (
                <div className="custom-nav-cat-slider">
                  <button
                    className="custom-cat-prev"
                    onClick={() =>
                      setCurrentIndex(
                        (prevIndex) =>
                          (prevIndex - 1 + sliderItems.length) %
                          sliderItems.length
                      )
                    }
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    className="custom-cat-next"
                    onClick={() =>
                      setCurrentIndex(
                        (prevIndex) => (prevIndex + 1) % sliderItems.length
                      )
                    }
                  >
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
