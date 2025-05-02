import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import ProductDetails from '../components/ProductDetails';
import Contact from '../components/Contact';
import Blogs from '../components/Blogs';
import './styles.css';
import Shop from '../components/Shop';
import About from '../components/About';
import BlogDetails from '../components/Blogs/BlogDetails';
import { CartProvider } from '../CartContext/CartContext';
import { ToastProvider } from '../ToastContext/ToastContext';
import Login from "../components/Accounts/Login";
import Signup from "../components/Accounts/Signup";
import Profile from "../components/Accounts/Profile";
import OrdersHistory from "../components/Accounts/OrdersHistory";
import { UserProvider } from '../UserContext/UserContext';
const App = () => {
  return (
    <Router>
       <CartProvider>
          <ToastProvider> 
          <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders-history" element={<OrdersHistory />} />
         </Routes>
       <Footer />
       </UserProvider>
       </ToastProvider>
         </CartProvider>
    </Router>
  );
};

export default App;
