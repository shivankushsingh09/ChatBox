import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logo from "../assets/icon.png";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      {/* <img src={Robot} alt="" /> */}
      <img src={Logo} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // color: white;
  // color: #efeae2;
  flex-direction: column;
  // background-color: #f0f2f5;
  background-color: #fff;
  img {
    // height: 20rem;
    // height: 12.5rem;
    height: 10rem;
  }
  span {
    // color: #4e0eff;
    color: #32cd32;
  }
  h3 {
    font-weight: 500;
  }
`;
