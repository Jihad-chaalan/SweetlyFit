import "./items.css";
import { useEffect, useState } from "react";

export default function Items({
  url = "https://dummyjson.com/products?limit=10",
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flippedItem, setFlippedItem] = useState(null);

  async function fetchUrl(getURL) {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      const response = await fetch(getURL);
      const result = await response.json();
      if (result?.products?.length) {
        setData(result.products);
      } else {
        setData([]); // Handle empty or malformed data
      }
    } catch (e) {
      setError(e.message || "An unexpected error occurred."); // Handle any fetch errors
    } finally {
      setLoading(false); // Ensure loading state is stopped in both success and error cases
    }
  }

  useEffect(() => {
    fetchUrl(url);
  }, [url]);

  const handleFlip = (id) => {
    setFlippedItem(id);
  };

  if (error) {
    return (
      <div className="error">
        Oops! Something went wrong. Please try again later. <br />
        Error: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">Loading items... Please wait a moment.</div>
    );
  }

  return (
    <>
      <div className="item-header">Our items:</div>
      <div className="items-container">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="item-box"
              onClick={() =>
                handleFlip(item.id === flippedItem ? null : item.id)
              }
            >
              <div
                className={`inner-box ${
                  item.id === flippedItem ? "flipped" : ""
                }`}
              >
                <div className="item-box-front">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="item-image"
                  />
                  <span className="item-name">{item.title}</span>
                  <span className="item-price">Price: ${item.price}</span>
                </div>
                <div className="item-box-back">
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No items found.</div>
        )}
      </div>
    </>
  );
}
