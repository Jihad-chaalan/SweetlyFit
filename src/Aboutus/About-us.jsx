import React from "react";
import "./About-us.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        At <span>SweetlyFit</span>, we believe that sweet treats can be both
        delicious and nutritious. Born from a passion for wholesome ingredients
        and a love for baking, we specialize in crafting homemade sweets that
        satisfy your sweet tooth without compromising on health.
      </p>
      <p>
        Each of our treats is made with care, using only natural, high-quality
        ingredients. Whether it’s our energy-packed date bars or our decadent
        nut-filled bites, you can indulge guilt-free, knowing that every bite is
        as good for your body as it is for your taste buds.
      </p>
      {/* <p>
        Our mission is simple: to bring the joy of sweets to those who crave
        something healthier. We believe that food should nourish the soul and
        fuel the body—without artificial additives, preservatives, or processed
        sugars. That’s why every recipe is thoughtfully designed to balance
        flavor and nutrition, making it easy to treat yourself while staying
        true to a healthy lifestyle.
      </p> */}
      <p>
        Welcome to a world of sweet, healthy goodness—handcrafted with love in
        every bite!
      </p>
    </div>
  );
};

export default AboutUs;
