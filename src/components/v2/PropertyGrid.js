import React from "react";

const propertyData = [
  {
    id: 1,
    type: "For Sell",
    category: "Appartment",
    price: "$12,345",
    title: "Golden Urban House For Sell",
    location: "123 Street, New York, USA",
    sqft: "1000 Sqft",
    beds: "3 Bed",
    baths: "2 Bath",
    image: "img/property-1.jpg",
  },
  // Add more property data as needed
];
const PropertyGrid = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="tab-content">
          {propertyData.map((property) => (
            <div key={property.id}>
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div className="property-item rounded overflow-hidden">
                    <div className="position-relative overflow-hidden">
                      <a href="javascript:void(0)">
                        <img
                          className="img-fluid"
                          src={property.image}
                          alt=""
                        />
                      </a>
                      <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-2">
                        {property.type}
                      </div>
                      <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-2">
                        {property.category}
                      </div>
                    </div>
                    <div className="p-4 pb-0">
                      <h5 className="text-primary mb-3">{property.price}</h5>
                      <a className="d-block h5 mb-2" href="javascript:void(0)">
                        {property.title}
                      </a>
                      <p>
                        <i className="fa fa-map-marker-alt text-primary me-2"></i>
                        {property.location}
                      </p>
                    </div>
                    <div className="d-flex border-top">
                      <small className="flex-fill text-center border-end py-2 px-3">
                        <i className="fa fa-ruler-combined text-primary me-2"></i>
                        {property.sqft}
                      </small>
                      <small className="flex-fill text-center border-end py-2 px-3">
                        <i className="fa fa-bed text-primary me-2"></i>
                        {property.beds}
                      </small>
                      <small className="flex-fill text-center py-2 px-3">
                        <i className="fa fa-bath text-primary me-2"></i>
                        {property.baths}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
