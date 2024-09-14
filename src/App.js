import AboutUs from "./Aboutus/About-us";
import "./App.css";
import ContactUs from "./contactUs/contact-us";
import Items from "./Items/items";
import Logo from "./Logo/logo";

function App() {
  return (
    <div className="App">
      <Logo />
      <Items />
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default App;
