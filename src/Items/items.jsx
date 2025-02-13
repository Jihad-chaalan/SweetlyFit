import "./items.css";
import { useMemo, useEffect, useState, useCallback } from "react";
import { createClient } from "contentful";
import { ArrowRightCircle } from "lucide-react";

export default function Items() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flippedItem, setFlippedItem] = useState(null);

  const client = useMemo(
    () =>
      createClient({
        space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
      }),
    []
  );

  const fetchUrl = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await client.getEntries({
        content_type: "product",
      });

      if (response.items.length) {
        const transformedData = response.items.map((item) => ({
          id: item.sys.id,
          title: item.fields.title,
          thumbnail: item.fields.thumbnail.fields.file.url,
          price: item.fields.price,
          prices: item.fields.prices,
          description: item.fields.description,
        }));
        setData(transformedData);
      } else {
        setData([]);
      }
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

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
                  <div>
                    {item.prices?.prices.map((price, index) => (
                      <span key={index} className="item-price">
                        {price}
                      </span>
                    ))}
                  </div>
                  <div className="flip-icon">
                    <ArrowRightCircle size={20} color="rgba(0, 0, 0, 0.6)" />
                  </div>
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
