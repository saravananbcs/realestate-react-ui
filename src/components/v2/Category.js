import React, { useState, useEffect } from "react";

const CatItem = ({ iconSrc, title, count, onClick }) => (
  <div className="col-lg-4 col-md-6 col-sm-12 mb-4 wow fadeInUp">
    <div
      className="cat-item d-block bg-light text-center rounded p-3"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="rounded p-4">
        <div className="icon mb-3">
          <img className="img-fluid" src={iconSrc} alt="Icon" />
        </div>
        <h6>{title}</h6>
        <span>{count} Properties</span>
      </div>
    </div>
  </div>
);

const Category = (props) => {
  const { handleCategoryTypeClick } = props;
  const [propertyCounts, setPropertyCounts] = useState({
    townhouse: 0,
    individual_house: 0,
    apartment: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "http://aitalk.in:8080/api/real-estate/getTotalPropertyCount"
          "https://aitalk.in/api-get-total-property.php"
        );
        const data = await response.json();
        setPropertyCounts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-3">Property Types</h1>
        </div>
        <div className="row g-3 justify-content-center">
          <CatItem
            iconSrc="img/icon-apartment.png"
            title="Apartment"
            count={propertyCounts.apartment}
            onClick={() => handleCategoryTypeClick("apartment")}
          />
          <CatItem
            iconSrc="img/icon-house.png"
            title="Home"
            onClick={() => handleCategoryTypeClick("individual_house")}
            count={propertyCounts.individual_house}
          />
          <CatItem
            iconSrc="img/icon-neighborhood.png"
            title="Townhouse"
            onClick={() => handleCategoryTypeClick("townhouse")}
            count={propertyCounts.townhouse}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
