import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bannersData from '../Home/BannersData';
import heartIcon from '../../Assets/Images/productDetails/mdi_heart-outline.svg';
import '../../Styles/products.css';
import Newsletter from '../Home/Newsletter';
import SectionHeading from '../Home/SectionHeading';
import { useCart } from '../../CartContext/CartContext';
import ToastNotification from '../UI/ToastNotification';
import QuantitySelector from '../UI/QuantitySelector';
import { baseUrl } from '../../const/url.const';
  
const ProductDetails = () => {
  const categoryMap = {
    1: 'spices',
    2: 'readytoeat',
    3: 'fruitspreserves',
    4: 'granolabars',
    5: 'mres',
  };

  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart();

  const [showToast, setShowToast] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); 
  const category = searchParams.get('category')?.toLowerCase();
  const productId = searchParams.get('productId');

  const formatCategory = (category) => {
    const formattedCategories = {
      spices: 'Spices',
      readytoeat: 'Ready To Eat Meals',
      fruitspreserves: 'Fruit Preserves',
      granolabars: 'Granola Bars',
      mres: 'One Day Meals',
    };

    return formattedCategories[category] || '';
  };

  const selectedBanner = bannersData.find(
    (banner) => banner.name.toLowerCase() === category
  );
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const product = await response.json();
          const formattedProduct = {
            id: product.id,
            name: product.name || 'Unknown Product',
            servings: product.serving || '2-3 Persons',
            category: categoryMap[product.category_id] || 'Unknown',
            ingredients: product.ingredients || [],
            price: product.price ?? 0,
            description: product.description || 'No description available.',
            packaging: [product.packaging || 'Box'],
            tags: product.tags?.length ? product.tags : ['Best Seller', 'High Quality'],
            image: product.image ? `${baseUrl}/api/products/image/${product.image}` : '/default-image.png',
            quantity: 1,
            tabledata: {
              "Total Carbohydrates": product.nutritions?.["Total Carbohydrates"] || { value: 45.2, UOM: true },
              "Crude Fiber": product.nutritions?.["Crude Fiber"] || { value: 3.1, UOM: false },
              "Crude Protein": product.nutritions?.["Crude Protein"] || { value: 12.5, UOM: true },
              "Total Sugar": product.nutritions?.["Total Sugar"] || { value: 2.0, UOM: false },
              Sodium: product.nutritions?.["Sodium"] || { value: 420.0, UOM: true },
              "Saturated Fat": product.nutritions?.["Saturated Fat"] || { value: 5.3, UOM: false },
              "Trans Fat": product.nutritions?.["Trans Fat"] || { value: 0.1, UOM: false },
              "Polyunsaturated Fat": product.nutritions?.["Polyunsaturated Fat"] || { value: 2.4, UOM: true },
              "Monounsaturated Fat": product.nutritions?.["Monounsaturated Fat"] || { value: 6.8, UOM: true },
              Cholesterol: product.nutritions?.["Cholesterol"] || { value: 55.0, UOM: false },
              Calcium: product.nutritions?.["Calcium"] || { value: 120.5, UOM: true },
              Iron: product.nutritions?.["Iron"] || { value: 2.3, UOM: false },
              Potassium: product.nutritions?.["Potassium"] || { value: 350.0, UOM: true },
              "Vitamin A": product.nutritions?.["Vitamin A"] || { value: 900.0, UOM: true },
              "Vitamin C": product.nutritions?.["Vitamin C"] || { value: 15.0, UOM: false },
            },
          };
          setProduct(formattedProduct);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [productId]);


  if (!product) {
    return <h1>Product not found</h1>;
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowToast(true);
  };
  
  const getNetWeight = (product) => {
    if (!product || !product.category) return "";
  
    switch (product.category) {
      case "spices":
        return "Net Weight: 100g";
      case "readytoeat":
        return "Net Weight: 300g";
      case "fruitspreserves":
        return "Net Weight: 500g";
      case "granolabars":
        return product.name === "Nut Bars" ? "Net Weight: 60g" : "Net Weight: 80g";
      case "mres":
        return "Net Weight: 1280g";
      default:
        return "";
    }
  };
  
  
  return (
    <>
      {selectedBanner && (
        <section className="banner-section">
          <div className="banner-one active">
            {selectedBanner.images}
            {selectedBanner.text}
          </div>
        </section>
      )}

      <section className="products-details-section">
        <SectionHeading className="section-heading">
          <h2 className='specialDetailHeading'>
            {product.name.split(' ').map((word, index) => (
              <React.Fragment key={index}>
                {word}
                <br />
              </React.Fragment>
            ))}
          </h2>
        </SectionHeading>

        <div className="products-details-wrap">
          <div className="product-details-section-one">
            <div className="detail-img-wrap">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="detail-buttons">
              <button onClick={() => handleAddToCart(product)}
                 disabled={product.price === 0} 
                 style={{ opacity: product.price === 0 ? 0.5 : 1, cursor:product.price === 0 ? "not-allowed" : "pointer" }}>
                Add to Cart
              </button>
            {/*  <button>
                <img src={heartIcon} alt="Wishlist" />
              </button> */}
            </div>

            {/* Ingredients */}
            <div className="ingredients-div">
              <h1>INGREDIENTS:</h1>
              {product.ingredients.map((item, index) => (
                <div className="ingredient-item" key={index}>
                  <div className="ingredient-no">{index + 1}</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* Packaging */}
            <div className="ingredients-div">
  <h1>PACKAGING:</h1>
  <div className="ingredient-item">
    <p>{getNetWeight(product)}</p>
  </div>
</div>


            <div className="ingredients-div">
              <h1>SERVINGS:</h1>
              <div className="ingredient-item">
                <p>{product.servings}</p>
              </div>
            </div>
          </div>

          <div className="product-details-section-two">
            <h1>
              {product.name} - {formatCategory(category)}
            </h1>
            <h2>{product.price > 0 ? `${product.price} Rs` : "Out of stock"}</h2>

            <h3>Product DESCRIPTION:</h3>
            <p>{product.description}</p>

            <div className="quantity-wrapper">
              <h5>Quantity:</h5>

              <QuantitySelector
                product={product}
                cart={cart}
                handleAddToCart={handleAddToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </div>

            <h3 style={{ marginTop: '30px' }}>Nutrition Facts:</h3>
            <table className="custom-table">
              <thead>
                <tr style={{ background: '#CECDCB' }}>
                  <th style={{ borderTopLeftRadius: '20px' }}>
                    <h1>Parameter</h1>
                  </th>
                  <th>
                    <h1>UoM</h1>
                  </th>
                  <th style={{ borderTopRightRadius: '20px' }}>
                    <h1>Results</h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product.tabledata).map(
                  ([parameter, data], index) => (
                    <tr key={index}>
                      <td>{parameter}</td>
                      <td>{data.UOM ? 'g/100g' : 'mg/100g'}</td>
                      <td>{data.value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastNotification
        message="Item successfully added to cart!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
       
        <Newsletter />
      </section>
    </>
  );
};

export default ProductDetails;
