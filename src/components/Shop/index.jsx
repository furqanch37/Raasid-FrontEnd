import React from "react";
import { useLocation } from "react-router-dom";
import bannersData from "../Home/BannersData";
import Products from "../Home/Products";
import BannerSlider from "../Home/BannerSlider";
import ProductsSection from "./ProductsSection"; // ⬅️ New component
import Newsletter from "../Home/Newsletter";

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category")?.toLowerCase();

  const selectedBanner = bannersData.find(
    (banner) => banner.name.toLowerCase() === category
  );

  return (
    <>
      {selectedBanner ? (
        <section className="banner-section">
          <div className="banner-one active">
            {selectedBanner.images}
            {selectedBanner.text}
          </div>
        </section>
      ) : (
        <BannerSlider />
      )}

      <Products />

      <ProductsSection selectedBanner={selectedBanner} />
       <center> <Newsletter /></center>
    </>
  );
};

export default Shop;
