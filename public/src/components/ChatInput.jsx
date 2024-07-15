import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          // placeholder="type your message here"
          placeholder="type a message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  // background-color: #080420;
  // background-color: #f0f2f5;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        // color: #ffff00c8;
        // color: rgba(0, 0, 0, 0.125);
        color: rgb(137, 155, 189);
        cursor: pointer;
      }
      .emoji-picker-react {
        font-family: "Josefin Sans", sans-serif;
        position: absolute;
        top: -350px;
        // background-color: #080420;
        background-color: #f0f2f5;
        // box-shadow: 0 5px 10px #9a86f3;
        box-shadow: 0 0.1875rem 0.4375rem 0 rgba(0, 0, 0, 0.13),
          0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.11);
        // border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          // background-color: #080420;
          width: 5px;
          &-thumb {
            // background-color: #9a86f3;
            background-color: rgb(137, 155, 189);
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          // border-color: #9a86f3;
          border-color: #d3d3d3;
        }
        .emoji-group:before {
          // background-color: #080420;
          background-color: #f0f2f5;
          // border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        }
      }
    }
  }
  .input-container {
    width: 100%;
    // border-radius: 2rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 2rem;
    // background-color: #ffffff34;
    background-color: #ffffff;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      // color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      font-weight: inherit;
      font-family: inherit;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      // border-radius: 2rem;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: #9a86f3;
      background-color: rgb(137, 155, 189);
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
