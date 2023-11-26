import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../Button";
import UploadForm from "./UploadForm";
import Table from "./Table";
import axiosInstance from "../../lib/axiosInstance";

export default function Listing() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleFilter = () => {
    // Filter by keyword
    setData((prev) => {
      return prev.filter((item) => {
        const fullName = item.lastName + " " + item.middleName + " " + item.firstName;
        return (
          item.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.middleName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
          fullName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.address.toLowerCase().includes(keyword.toLowerCase()) ||
          item.phoneNumber.toLowerCase().includes(keyword.toLowerCase())
        );
      });
    });
  };

  useEffect(() => {
    axiosInstance
      .get("/patient/getAllPatients")
      .then((res) => {
        if(res.status === 200) {
          setData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword]);



  const handleReset = () => {
    setKeyword("");
    setMinPrice(0);
    setMaxPrice(0);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
      <Link href="/patient">
          <Button className="text-blue-500">Add New Patient</Button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* Serch keyword */}
          <label>Search: </label>
          <input
            type="text"
            name="keyword"
            placeholder="Keyword"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value.trim())}
            className="w-80 mr-4 py-1 px-2 bg-white-200 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
          />
          {/* Filter by Price*/}
          {/* <label>Price: </label>
          <input
            type="number"
            name="min"
            value={minPrice || ""}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Min Price"
            className="w-40 py-1 px-2 bg-white-200 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
          />
          {" - "}
          <input
            type="number"
            name="max"
            value={maxPrice || ""}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Max Price"
            className="w-40 py-1 px-2 bg-white-200 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
          /> */}
          <a
            className="text-sm underline text-blue-500 ml-2 cursor-pointer"
            onClick={handleReset}
          >
            Clear
          </a>
        </div>
        <Button
          className="text-green-500"
          onClick={() => {
            handleFilter();
          }}
        >
          Filter
        </Button>
      </div>
      <Table data={data} />
    </>
  );
}
