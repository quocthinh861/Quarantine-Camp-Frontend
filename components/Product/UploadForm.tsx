import React, { useState, useRef } from "react";
import supabase from "../../client/SuperbaseClient";
import { uploadImage } from "../../shared/Utils";
import axiosInstance from "../../lib/axiosInstance";

function UploadForm() {
  // Refs
  const fileInputRef = useRef(null);

  // Form fields
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [errors, setErrors] = useState({});

  const [commorbity, setCommorbity] = useState("");
  const [commorbitites, setComorbitites] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [previousAddress, setPreviousAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Male");

  // State to show loading spinner
  const [isUploading, setIsUploading] = useState(false);

  // Define a variable for the button class
  const buttonClass = isUploading
    ? "bg-gray-500 cursor-not-allowed"
    : "bg-blue-500";

  // Defind functions
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setIsUploading(true);

      const userConfirmed = window.confirm("Do you want to add this patient?");
      if (!userConfirmed) {
        setIsUploading(false);
        return;
      }
      scrollToTop();

      try {
        const payload = {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          gender: gender,
          address: address,
          phoneNumber: phoneNumber,
          previousLocation: previousAddress,
          condition: "Discharge",
          comorbidities: commorbitites,
        };

        const reponse  = await axiosInstance.post("/patient/create", payload);

        if (reponse.status === 200) {
          console.log("reponse", reponse);
          alert("Successfully added patient!");
        }

        // Reset form fields
        setAddress("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setPhoneNumber("");
        setGender("");
        setComorbitites([]);

        alert("Successfully added patient!");
      } catch (error) {
        console.error("Error Patient Adding:", error);
        alert("Failed to add patient!");
        console.log("error", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }

  const validate = () => {
    let errors: any = {};

    if (!firstName) {
      errors.firstName = "Please enter first name.";
    }

    if (!middleName) {
      errors.middleName = "Please enter middle name.";
    }

    if (!lastName) {
      errors.lastName = "Please enter last name.";
    }

    if (!address) {
      errors.address = "Please enter address.";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Please enter phone number.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      {
        // Hiển thị lỗi ở đây
        Object.keys(errors).length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <button
              className="absolute top-0 right-0 px-2 py-1"
              onClick={() => setErrors({})}
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M14.348 5.652a.999.999 0 00-1.414 0L10 8.586 6.066 4.652a.999.999 0 10-1.414 1.414L8.586 10l-3.934 3.934a.999.999 0 101.414 1.414L10 11.414l3.934 3.934a.999.999 0 101.414-1.414L11.414 10l3.934-3.934a.999.999 0 000-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <strong className="font-bold">Invalid input </strong>
            <span className="block sm:inline">Help us to check it out:</span>
            <ul className="list-disc list-inside">
              {Object.keys(errors).map((key) => (
                <li key={key}>{errors[key]}</li>
              ))}
            </ul>
          </div>
        )
      }
      {
        // Hiển thị loading spinner
        isUploading && (
          <div className="flex flex-col items-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <p className="text-gray-700 mt-2">Đang xử lý...</p>
          </div>
        )
      }
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex">
            <div className="w-1/3 pr-2">
              <label
                htmlFor="first-name"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="w-1/3 px-2">
              <label
                htmlFor="middle-name"
                className="block text-gray-700 font-medium mb-2"
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middle-name"
                name="middle-name"
                className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
                value={middleName}
                onChange={(event) => setMiddleName(event.target.value)}
              />
            </div>
            <div className="w-1/3 pl-2">
              <label
                htmlFor="last-name"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="product-description"
            className="block text-gray-700 font-medium mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="product-description"
            className="block text-gray-700 font-medium mb-2"
          >
            Previous Address (if any)
          </label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
            value={previousAddress}
            onChange={(event) => setPreviousAddress(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="product-description"
            className="mr-5 text-gray-700 font-medium mb-2"
          >
            Gender
          </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="product-description"
            className="block text-gray-700 font-medium mb-2"
          >
            Phone Number
          </label>
          <input
            type="telephone"
            id="product-name"
            name="product-name"
            className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <div className="flex">
            <div className="w-1/3 pr-2">
              <label
                htmlFor="first-name"
                className="block text-gray-700 font-medium mb-2"
              >
                Comorbidities
              </label>
              <p>{commorbitites.map((item) => item.comorbidity).join(", ")}</p>
              <input
                type="text"
                id="first-name"
                name="first-name"
                className="py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
                value={commorbity}
                onChange={(event) => setCommorbity(event.target.value)}
              />
              <a
                className="ml-3 underline"
                onClick={() => {
                  setComorbitites([
                    ...commorbitites,
                    { comorbidity: commorbity },
                  ]);
                  setCommorbity("");
                }}
              >
                Add
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isUploading}
            className={`${buttonClass} text-white rounded-md py-2 px-4 font-medium text-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700 transition duration-150 ease-in-out`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default UploadForm;
