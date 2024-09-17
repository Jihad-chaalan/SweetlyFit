import "./items.css";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "contentful";

export default function Items() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flippedItem, setFlippedItem] = useState(null);

  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  });

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
  }, []);
  // async function fetchUrl() {
  //   try {
  //     setLoading(true);
  //     setError("");
  //     const response = await client.getEntries({
  //       content_type: "product",
  //     });

  //     if (response.items.length) {
  //       const transformedData = response.items.map((item) => ({
  //         id: item.sys.id,
  //         title: item.fields.title,
  //         thumbnail: item.fields.thumbnail.fields.file.url,
  //         price: item.fields.price,
  //         description: item.fields.description,
  //       }));
  //       setData(transformedData);
  //     } else {
  //       setData([]);
  //     }
  //   } catch (e) {
  //     setError(e.message || "An unexpected error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function fetchUrl(getURL) {
  //   try {
  //     setLoading(true);
  //     setError("");
  //     const response = await fetch(getURL);
  //     const result = await response.json();
  //     if (result?.products?.length) {
  //       setData(result.products);
  //     } else {
  //       setData([]);
  //     }
  //   } catch (e) {
  //     setError(e.message || "An unexpected error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
