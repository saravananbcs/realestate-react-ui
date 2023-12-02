import React from "react";

const Team = () => {
  // Team members data in JSON format
  const teamMembers = [
    {
      name: "Saravanan Chandrasekaran",
      role: "Senior Full Stack Developer",
      image: "img/saravanan.jpeg",
      social: [
        { platform: "facebook", link: "" },
        { platform: "twitter", link: "" },
        { platform: "instagram", link: "" },
      ],
    },
    {
      name: "Dhruvi Kunvarani",
      role: "Full Stack Developer",
      image: "img/dhruvi.jpeg",
      social: [
        { platform: "facebook", link: "" },
        { platform: "twitter", link: "" },
        { platform: "instagram", link: "" },
      ],
    },
    {
      name: "Meghna Singh",
      role: "Backend Developer",
      image: "img/meghna.png",
      social: [
        { platform: "facebook", link: "" },
        { platform: "twitter", link: "" },
        { platform: "instagram", link: "" },
      ],
    },
    {
      name: "Mohammad Ammar",
      role: "Backend Developer",
      image: "img/ammar.png",
      social: [
        { platform: "facebook", link: "" },
        { platform: "twitter", link: "" },
        { platform: "instagram", link: "" },
      ],
    },
    {
      name: "Vignesh Sridhar",
      role: "UI Developer",
      image: "img/vignesh.jpeg",
      social: [
        { platform: "facebook", link: "" },
        { platform: "twitter", link: "" },
        { platform: "instagram", link: "" },
      ],
    },
  ];
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-3">Developers</h1>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`col-lg-3 col-md-6 wow fadeInUp`}
              data-wow-delay={`${0.1 * (index + 1)}s`}
            >
              <div className="team-item rounded overflow-hidden">
                <div className="position-relative">
                  <img className="img-fluid" src={member.image} alt="" />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    {member.social.map((social, i) => (
                      <a
                        key={i}
                        className="btn btn-square mx-1"
                        href={social.link}
                      >
                        <i className={`fab fa-${social.platform}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">{member.name}</h5>
                  <small>{member.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
