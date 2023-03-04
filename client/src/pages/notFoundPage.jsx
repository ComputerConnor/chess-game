import React from "react";
import "./pagesCss/notFoundPage.css";

function NotFound() {
  return (
    <div className="not-found">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="360"
        height="380"
        viewBox="0 0 360 380"
        fill="none"
        className="not-found-svg"
      >
        <path
          d="M20 380L340 380C354.912 380 367 367.912 367 353L367 27C367 12.0881 354.912 0 340 0L20 0C5.08787 0 0.0042872 14.2949 0 29.3804L0 353C0 367.912 12.0879 380 27 380Z"
          fill="#F5F5F5"
        />
        <rect
          x="65"
          y="70"
          width="230"
          height="230"
          fill="#444"
          rx="20"
        />
        <path
          d="M165 165H135V195H165V165ZM135 135H165V165H135V135ZM135 195H165V225H135V195ZM195 165H225V195H195V165ZM225 135H195V165H225V135ZM195 195H225V225H195V195Z"
          fill="#F5F5F5"
        />
        <rect x="0" y="380" width="360" height="2" fill="#E0E0E0" />
      </svg>
      <h1>Oops! Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <a href="/">Return to Home Page</a>
    </div>
  );
}

export default NotFound;