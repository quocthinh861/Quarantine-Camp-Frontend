import React from "react";
import Link from "next/link";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <img
      className="max-w-xs mb-8"
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    />
    <p className="text-lg font-semibold mb-4">
      Oops! The page you are looking for does not exist.
    </p>
  </div>
);

export default NotFound;
