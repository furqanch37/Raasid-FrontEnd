import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SectionHeading from "../Home/SectionHeading";
import Newsletter from "../Home/Newsletter";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useCart } from "../../CartContext/CartContext";
import { baseUrl } from "../../const/url.const";
import { useToast } from "../../ToastContext/ToastContext";
import "./style.css";
const ProductsSection = ({ selectedBanner }) => {
  const categoryMap = {
    1: "spices",
    2: "readytoeat",
    3: "fruitspreserves",
    4: "granolabars",
    5: "onedaymeals",
  };
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };
  const { addToCart } = useCart();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category")?.toLowerCase();
  const subcategory = searchParams.get("subcategory")?.toLowerCase();
  const { showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/products?category=${category || "all"}&page=${currentPage}&size=${productsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, subcategory]);

  useEffect(() => {
    if (category === "onedaymeals" && subcategory) {
      const filtered = products.filter((product) => {
        if (subcategory === "with-flameless-ration-heaters") {
          return product.name.toLowerCase().includes("flameless ration heater");
        }
        if (subcategory === "with-fuel-tablets") {
          return product.name.toLowerCase().includes("fuel tablets");
        }
        return true;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, category, subcategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast({
      message: "Item successfully added to cart!",
      link: "/cart",
      linkText: "View Cart",
      status: "success",
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="products-section">
      <SectionHeading>
        {selectedBanner ? (
          selectedBanner.name === "fruitsPreserves" ? (
            <>
              <h1>Fruits</h1>
              <h2>Preserves</h2>
            </>
          ) : selectedBanner.name === "granolaBars" ? (
            <>
              <h1>Granola</h1>
              <h2>Bars</h2>
            </>
          ) : selectedBanner.name === "spices" ? (
            <>
              <h1>Spices</h1>
              <h2>Essentials</h2>
            </>
          ) : (
            <>
              <h1>Ready To Eat</h1>
              <h2>Meals</h2>
            </>
          )
        ) : (
          <h2 className="highlight-top" style={{ marginTop: "-45px", paddingBottom: "10px" }}>
            Products
          </h2>
        )}
      </SectionHeading>

      <div className="products-card-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isOutOfStock = product.price === 0;

            return (
              <div
                className="product-card"
                key={product.id}
                style={{ cursor: isOutOfStock ? "not-allowed" : "pointer" }}
              >
                <div className="product-image-wrapper display-flex">
                  <Link
                    to={`/product-details?productId=${encodeURIComponent(product.id)}&category=${encodeURIComponent(categoryMap[product.category_id])}`}
                    onClick={handleScrollTop}
                  >
                    <img src={`${baseUrl}/api/products/image/${product.image}`} alt={product.name} />
                  </Link>
                </div>
                <h1>{product.name}</h1>
                <p>{isOutOfStock ? "Out of stock" : `Rs. ${product.price}`}</p>
                <button
                  onClick={() =>
                    handleAddToCart({
                      ...product,
                      image: `${baseUrl}/api/products/image/${product.image}`,
                      category: categoryMap[product.category_id] || "Unknown",
                    })
                  }
                  disabled={isOutOfStock}
                  style={{ opacity: isOutOfStock ? 0.5 : 1 }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })
        ) : (
          <p className="no-products-message">No products available in this category.</p>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="pagination-buttons-products display-flex">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "disabled" : ""}
          >
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "disabled" : ""}
          >
            <FaArrowRight />
          </button>
        </div>
      )}

    
    </section>
  );
};

export default ProductsSection;
