import React, { useState, useRef } from "react";
import supabase from "../../client/SuperbaseClient";
import { uploadImage } from "../../shared/Utils";
import Autocomplete from "react-google-autocomplete";

function UploadForm() {
  // Refs
  const fileInputRef = useRef(null);

  // Form fields
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({});

  // State to show loading spinner
  const [isUploading, setIsUploading] = useState(false);

  // Define a variable for the button class
  const buttonClass = isUploading
    ? "bg-gray-500 cursor-not-allowed"
    : "bg-blue-500";

  // Defind functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    scrollToTop();

    if (validate()) {
      setIsUploading(true);

      const userConfirmed = window.confirm(
        "Bạn có chắc chắn muốn thêm sản phẩm này không?"
      );
      if (!userConfirmed) return;
      scrollToTop();

      try {
        // Insert product to database
        const customer = {
          name: address,
          address: address,
        };

        const { data, error } = await supabase
          .from("customers")
          .insert([customer]);

        if (error) {
          throw error;
        }

        // Reset form fields
        setShopName("");
        setAddress("");

        alert("Thêm sản phẩm thành công!");
      } catch (error) {
        alert("Đã xảy ra lỗi, vui lòng thử lại!");
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

    if (!shopName) {
      errors.customerName = "Vui lòng nhập tên sản phẩm.";
    }

    if (!address) {
      errors.email = "Vui lòng nhập giá sản phẩm.";
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
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
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
            <strong className="font-bold">Đã xảy ra lỗi! </strong>
            <span className="block sm:inline">Hãy sửa các lỗi dưới đây:</span>
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
        <div className="mb-4">
          <label
            htmlFor="product-name"
            className="block text-gray-700 font-medium mb-2"
          >
            Tên cửa hàng
          </label>
          <input
            type="text"
            id="shop-name"
            name="shop-name"
            className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
            value={shopName}
            onChange={(event) => setShopName(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="customer-email"
            className="block text-gray-700 font-medium mb-2"
          >
            Địa điểm
          </label>
          <Autocomplete
            apiKey={"AIzaSyCjo_9j3O1KlsrVY9lPM8_CLOrZrthaZ8A"}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
            className="w-full py-2 px-4 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 mt-1"
          />
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
