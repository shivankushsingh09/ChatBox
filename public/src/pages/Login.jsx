import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    const usernameRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric characters only
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least one uppercase, one lowercase, one digit, one special character, and minimum 8 characters

    if (!username && !password) {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (!username) {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (!usernameRegex.test(username)) {
      toast.error(
        "Username should contain only alphanumeric characters.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (!password) {
      toast.error("Password is required.", toastOptions);
      return false;
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8+ characters, with uppercase, lowercase, digit, and special character.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );

          // Show success toast
          toast.success("Login successfully!", toastOptions);

          // Wait for the toast to appear before navigating
          setTimeout(() => {
            navigate("/");
          }, 1000); // Adjust timeout as necessary
        }
      } catch (error) {
        console.error("Error logging in:", error);
        // Handle error, show error toast or log message
        toast.error("Error logging in. Please try again later.", toastOptions);
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={8}
            maxLength={12}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One</Link>
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
    border: 0.1rem solid rgb(92, 27, 134);
    border: 0.1rem solid #d3d3d3;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #1e90ff;
      outline: none;
    }
  }
  button {
    background-color: #fd7e14;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: inherit;
    font-family: inherit;
    cursor: pointer;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      bakground-color: #fd7e14;
    }
  }
  span {
    text-transform: uppercase;
    a {
      color: #008080;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
