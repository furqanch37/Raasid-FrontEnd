import React from "react";
import FormComponent from "./FormComponent";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../ToastContext/ToastContext";
import { useUser } from "../../../UserContext/UserContext";
import { baseUrl } from "../../../const/url.const";

const Index = () => {
  const { showToast } = useToast();
  const { user,login } = useUser();
  const navigate = useNavigate();
console.log("user status in context is: ",user);

const handleLoginSubmit = async (formData) => {
  showToast({
    message: "Processing your registration...",
    status: "loading",
  });

  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
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
        message: "Login successful!",
        status: "success",
      });

      navigate(`/products?category=all`);
    } else {
      showToast({
        message: data.message || "Login failed!",
        status: "error",
      });
    }
  } catch (error) {
    showToast({
      message: "An error occurred. Please try again.",
      status: "error",
    });
  }
};



  return (
    <FormComponent
      title="Login"
      inputs={[
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Password", required: true },
      ]}
      onSubmit={handleLoginSubmit}
    />
  );
};

export default Index;
