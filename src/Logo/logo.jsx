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
        if (displayText.length < texts[textIndex].length) {
          timer = setTimeout(() => {
            setDisplayText(
              (prevText) => prevText + texts[textIndex][displayText.length]
            );
          }, speed);
        } else if (textIndex < texts.length - 1) {
          timer = setTimeout(() => {
            setTextIndex((prevIndex) => prevIndex + 1);
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        timer = setTimeout(() => {
          setDisplayText("");
          setIsTyping(true);
        }, pauseDuration);
      }

      return () => clearTimeout(timer);
    }, [displayText, textIndex, isTyping, texts, speed, pauseDuration]);

    return <span>{displayText}</span>;
  };

  function DelayedSpan() {
    const [showSpan, setShowSpan] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSpan(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {showSpan && (
          <span>
            <FaHeart />
          </span>
        )}
      </>
    );
  }

  return (
    <div className="logo-container">
      <div className="image-container">
        <img src={require("./logo.png")} alt="" />
      </div>

      <div className="text-container">
        <TypeWriter texts={["WELCOME "]} />
        <DelayedSpan />
      </div>
    </div>
  );
}
