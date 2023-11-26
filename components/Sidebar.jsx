import React, { useState } from "react";
import Link from "next/link";
import { RxSketchLogo, RxHome, RxPerson, RxBackpack } from "react-icons/rx";

const Sidebar = ({ children }) => {
  const [activeLink, setActiveLink] = useState("home");

  const avtiveClass = "bg-purple-800 text-white";

  const handleLinkClick = (link) => {
    
    setActiveLink(link);
  };

  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div
              className={`bg-gray-100 p-3 rounded-lg inline-block ${
                activeLink === "home" ? avtiveClass : ""
              }`}
              onClick={() => handleLinkClick("home")}
            >
              <RxHome size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          {/* <Link href='/products'>
            <div className={`bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block ${activeLink === 'products' ? avtiveClass : ''}`} onClick={() => handleLinkClick('products')}>
              <RxStar size={20} />
            </div>
          </Link> */}
          <Link href="/patients">
            <div
              className={`bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block ${
                activeLink === "purchases" ? avtiveClass : ""
              }`}
              onClick={() => handleLinkClick("purchases")}
            >
              <RxSketchLogo size={20} />
            </div>
          </Link>
          {/* <Link href="/customers">
            <div
              className={`bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block ${
                activeLink === "customers" ? avtiveClass : ""
              }`}
              onClick={() => handleLinkClick("customers")}
            >
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href="/shops">
            <div
              className={`bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block ${
                activeLink === "shops" ? avtiveClass : ""
              }`}
              onClick={() => handleLinkClick("shops")}
            >
              <RxBackpack size={20} />
            </div>
          </Link> */}
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
