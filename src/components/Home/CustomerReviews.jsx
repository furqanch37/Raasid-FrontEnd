import React, { useEffect, useState } from "react";
import LeftArrow from "../../Assets/Images/all-sections/five/left.svg";
import RightArrow from "../../Assets/Images/all-sections/five/right.svg";
import QuoteIcon from "../../Assets/Images/all-sections/five/quote.svg";
import LeafIcon from "../../Assets/Images/all-sections/five/leaf.png";
import FoodImage from "../../Assets/Images/all-sections/five/food.png";
import SectionHeading from "./SectionHeading";
import { baseUrl } from "../../const/url.const";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import FontAwesome stars

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [clicked, setClicked] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Reviews from API
  useEffect(() => {
    fetch(`${baseUrl}/api/testimonials`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const formattedReviews = data.map((review) => ({
            name: review.personalInfo?.name || review.user.email.split("@")[0] || "Anonymous",
            role: "Customer",
            text: review.comment || "No feedback provided.",
            rating: review.rating || 0, // Ensure rating is included
          }));
          setReviews(formattedReviews);
        } else {
          setReviews([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Navigate to Next Review
  const handleNext = () => {
    setClicked("right");
    setTimeout(() => setClicked(""), 300);
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
      setFadeIn(true);
    }, 100);
  };

  // Navigate to Previous Review
  const handlePrev = () => {
    setClicked("left");
    setTimeout(() => setClicked(""), 300);
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
      setFadeIn(true);
    }, 100);
  };

  // Function to generate star ratings with white outline
  const renderStars = (rating) => {
    return (
      <div style={{ display: "flex", gap: "2px" }}>
        {[...Array(5)].map((_, index) => (
          index < rating ? (
            <FaStar
              key={index}
              style={{
                color: "#FFD700", // Gold color for filled stars
                textShadow: "0 0 2px white, 0 0 4px white", // White outline effect
                fontSize: "20px",
              }}
            />
          ) : (
            <FaRegStar
              key={index}
              style={{
                color: "white", // White outline for empty stars
                fontSize: "20px",
              }}
            />
          )
        ))}
      </div>
    );
  };
  

  return (
    <section className="fifth-section">
      <SectionHeading title="Loved by our" subtitle="Customers" />

      <div className="fifth-outer">
        <div className="back-arrow-buttons">
          <img src={LeftArrow} alt="Left Arrow" onClick={handlePrev} className={clicked === "left" ? "clicked" : ""} />
          <img src={RightArrow} alt="Right Arrow" onClick={handleNext} className={clicked === "right" ? "clicked" : ""} />
        </div>

        <div className="fifth-wrap">
          <div className="fifth-text">
            <img src={QuoteIcon} alt="Quote Icon" />

            {/* Loading State */}
            {loading ? (
              <p>Loading reviews...</p>
            ) : error ? (
              <p>{error}</p>
            ) : reviews.length === 0 ? (
              <p>No reviews available yet.</p>
            ) : (
              <>
                <h1 className={fadeIn ? "fade-in" : ""}>{reviews[currentIndex]?.name}</h1>
                <h2 className={fadeIn ? "fade-in" : ""}>{reviews[currentIndex]?.role}</h2>
                
                {/* Display Star Ratings */}
                <div className="rating">{renderStars(reviews[currentIndex]?.rating)}</div>

                <p className={fadeIn ? "fade-in" : ""}>{reviews[currentIndex]?.text}</p>
              </>
            )}

            <img src={LeafIcon} alt="Leaf Icon" className={`five-one`} />
          </div>
          <img src={FoodImage} alt="Food" className={`five-food`} />
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
