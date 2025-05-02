import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../Login/FormComponent";
import { useToast } from "../../../ToastContext/ToastContext";
import { useUser } from "../../../UserContext/UserContext";
import { baseUrl } from "../../../const/url.const";

const Signup = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);


  const handleSignupSubmit = async (formData) => {
    setLoading(true);
  
    // Show loading toast
    showToast({
      message: "Processing your registration...",
      status: "loading",
    });
  
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        login({ ...data, isAuthenticated: true });
  
        showToast({
          message: "Registration successful!",
          status: "success",
        });
  
        navigate(`/products?category=all`);
      } else {
        showToast({
          message: data.message || "Signup failed!",
          status: "error",
        });
      }
    } catch (error) {
      showToast({
        message: "An error occurred. Please try again.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <FormComponent
      title="Sign Up"
      inputs={[
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Password", required: true },
      ]}
      onSubmit={handleSignupSubmit}
      isLoading={loading}
    />
  );
};

export default Signup;
