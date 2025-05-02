import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../../Assets/Images/header/icons/search.svg";
import { baseUrl } from "../../const/url.const";

const categoryMap = {
  1: "spices",
  2: "readytoeat",
  3: "fruitspreserves",
  4: "granolabars",
  5: "mres",
};

const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchResultsDiv, setShowSearchResultsDiv] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setShowSearchResultsDiv(false);
      }
    };

    if (showSearch || showSearchResultsDiv) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch, showSearchResultsDiv]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setShowSearchResultsDiv(true);

    try {
      const response = await fetch(`${baseUrl}/api/products/search?name=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data : [data]); 
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId, category) => {
    setShowSearch(false);
    setShowSearchResultsDiv(false); // Hide both on product click
    navigate(`/product-details?productId=${productId}&category=${category}`);
  };

  return (
    <div className="search-wrapper" ref={searchRef}>
      <img
        src={SearchIcon}
        className="searchHeader"
        alt="Search"
        onClick={() => setShowSearch((prev) => !prev)} // Toggle search visibility
      />

      {showSearch && (
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <img src={SearchIcon} className="search-icon" alt="Search" onClick={handleSearch} />
        </div>
      )}

      {showSearchResultsDiv && (
        <div className="search-results-container">
          {loading && <p>Loading...</p>}
          {error && <p className="error-text">{error}</p>}
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="product-card-row display-flex"
              onClick={() => handleProductClick(product.id, categoryMap[product.category_id] || "unknown")}
            >
              <div className="display-flex search-result-card-content">
                <img src={`${baseUrl}/api/products/image/${product.image}`} alt={product.name} />
                <p>{product.name}</p>
              </div>
              <h6>{product.price > 0 ? `Rs ${product.price}` : "Out of stock"}</h6>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
