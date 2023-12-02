import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  useEffect(() => {
    // Initialize the slider when the component mounts
    const slider = document.querySelector(".slider");
    if (slider) {
      // You can customize the settings based on your requirements
      // Example: $(slider).slick({ settings });
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <i className="bi bi-chevron-left"></i>
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <div className="container-fluid header bg-white p-0">
      <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
        <div className="col-md-6 p-5 mt-lg-5">
          <h1 className="display-5 animated fadeIn mb-4">
            Find A <span className="text-primary">Perfect Home</span> To Live
            With Your Family
          </h1>
          <p className="animated fadeIn mb-4 pb-2">
            Cozy Rentals: Discover the ideal abode for your family with our
            expert guidance, turning houses into homes. Your perfect living
            space awaits – find it today!
          </p>
        </div>
        <div className="col-md-6 animated fadeIn">
          <Slider className="slider" {...settings}>
            {/* Carousel items */}
            <div>
              <img className="img-fluid" src="img/carousel-1.jpg" alt="" />
            </div>
            <div>
              <img className="img-fluid" src="img/carousel-2.jpg" alt="" />
            </div>
            {/* Add more items as needed */}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Header;
