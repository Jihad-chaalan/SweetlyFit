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

  function DelayedSpan() {
    // State to manage whether the span is shown or not
    const [showSpan, setShowSpan] = useState(false);

    useEffect(() => {
      // Set a timeout to update state after 1000ms (1 second)
      const timer = setTimeout(() => {
        setShowSpan(true);
      }, 1000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
      <>
        {/* Render the span only if showSpan is true */}
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
        {/* <span>
          
        </span> */}
      </div>
    </div>
  );
}
