import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

export default function ProjFooter(props) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);
  useEffect(() => {
    console.log(dimensions);
  }, [dimensions]);
  return (
    <footer
      ref={targetRef}
      className="bg-dark text-center text-white"
      style={{ minWidth: "359.2px" }}
    >
      <div className="container p-4">
        {/* <section className="mb-4"> */}
        <Link
          className="btn btn-outline-light btn-floating m-1"
          to={{ pathname: "https://wa.link/5xeqp9" }}
          target="_blank"
        >
          <WhatsAppIcon />
        </Link>

        <Link
          className="btn btn-outline-light btn-floating m-1"
          to={{ pathname: "https://mobile.twitter.com/KingSim68784724" }}
          target="_blank"
        >
          <TwitterIcon />
        </Link>

        <Link
          className="btn btn-outline-light btn-floating m-1"
          to={{ pathname: "https://www.linkedin.com/in/simcha-podolsky" }}
          target="_blank"
        >
          <LinkedInIcon />
        </Link>

        <Link
          className="btn btn-outline-light btn-floating m-1"
          to={{ pathname: "mailto:simchapodo@gmail.com" }}
          target="_blank"
        >
          <MailIcon />
        </Link>

        <Link
          className="btn btn-outline-light btn-floating m-1"
          to={{ pathname: "https://github.com/SimchaPo" }}
          target="_blank"
        >
          <GitHubIcon />
        </Link>
        {/* </section> */}
        {/* <section className="mb-4">
          <p>
            Gift Card Shop is happy to keep in touch with consumers in all
            media. We invite you to communicate with us and follow our
            publications. Of course you can contact us with any questions or
            inquiries.
          </p>
        </section> */}
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright: Gift Cards Shop Production
      </div>
    </footer>
  );
}
