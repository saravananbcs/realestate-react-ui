import React from "react";

const About = () => {
  return (
    <div className="container-xxl py-5" id="aboutSection">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="about-img position-relative overflow-hidden p-5 pe-0">
              <img
                className="img-fluid w-100"
                src="img/about.jpg"
                alt="About"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4">#1 Place To Find The Perfect Property</h1>
            <p className="mb-4">
              Experience a moment of refined comfort and relaxation. Feel the
              gentle embrace of plush surroundings, where every detail is
              crafted for your delight. Allow yourself the luxury of serene
              moments in a cozy haven, where tranquility meets exceptional
              living.
            </p>
            <p>
              <i className="fa fa-check text-primary me-3"></i>Discover a
              temporary haven of refined comfort and serenity.
            </p>
            <p>
              <i className="fa fa-check text-primary me-3"></i>Indulge in the
              luxury of plush accommodations designed for ultimate relaxation.
            </p>
            <p>
              <i className="fa fa-check text-primary me-3"></i>Experience the
              perfect blend of tranquility and sophistication in a cozy retreat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
