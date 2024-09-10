import "./logo.css";
import { FaHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function Logo() {
  const TypeWriter = ({ texts, speed = 100, pauseDuration = 1000 }) => {
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
      let timer;

      if (isTyping) {
        // Type the entire string
        if (displayText.length < texts[textIndex].length) {
          timer = setTimeout(() => {
            setDisplayText(
              (prevText) => prevText + texts[textIndex][displayText.length]
            );
          }, speed);
        } else if (textIndex < texts.length - 1) {
          // Pause before moving to the next text
          timer = setTimeout(() => {
            setTextIndex((prevIndex) => prevIndex + 1);
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        // Pause before starting to type the next text
        timer = setTimeout(() => {
          setDisplayText("");
          setIsTyping(true);
        }, pauseDuration);
      }

      return () => clearTimeout(timer);
    }, [displayText, textIndex, isTyping, texts, speed, pauseDuration]);

    return <span>{displayText}</span>;
  };

  return (
    <div className="logo-container">
      <div className="image-container">
        <img src={require("./logo.png")} alt="" />
      </div>

      <div className="text-container">
        <TypeWriter texts={["WELCOME "]} />
        {/* <span>
          <FaHeart />
        </span> */}
      </div>
    </div>
  );
}
