import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric characters only
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least one uppercase, one lowercase, one digit, one special character, and minimum 8 characters

    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (!usernameRegex.test(username)) {
      toast.error(
        "Username should contain only alphanumeric characters.",
        toastOptions
      );
      return false;
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8+ characters, with uppercase, lowercase, digit, and special character.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = values;

    // Check if all fields are filled
    if (!email || !username || !password || !confirmPassword) {
      toast.error("All fields are required to Register", toastOptions);
      return;
    }

    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        // Show success toast
        toast.success("Register successfully!", toastOptions);

        // Wait for the toast to appear before navigating
        setTimeout(() => {
          navigate("/");
        }, 1000); // Adjust timeout as necessary
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatBox</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={8}
            maxLength={12}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength={8}
            maxLength={12}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      // color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-shadow: 0 0.1875rem 0.4375rem 0 rgba(0, 0, 0, 0.13),
      0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.11);
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #d3d3d3;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #1e90ff;
      outline: none;
    }
  }
  button {
    background-color: #008080;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: inherit;
    font-family: inherit;
    cursor: pointer;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #008080;
    }
  }
  span {
    text-transform: uppercase;
    a {
      // color: #4e0eff;
      color: #fd7e14;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
