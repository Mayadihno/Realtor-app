import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    regularPrice: 0,
    offer: false,
    discountedPrice: 0,
  });
  const {
    type,
    regularPrice,
    discountedPrice,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    description,
  } = formData;
  const handleChange = () => {};
  return (
    <React.Fragment>
      <main className="px-2 max-w-md mx-auto">
        <h1 className="text-center text-3xl font-bold mt-7">
          Create a Listing
        </h1>
        <form>
          <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
          <div className="flex justify-between items-center ">
            <button
              type="button"
              id="type"
              value={"sale"}
              onChange={handleChange}
              className={` mr-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                type === "rent" ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              sell
            </button>
            <button
              type="button"
              id="type"
              value={"rent"}
              onChange={handleChange}
              className={` ml-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                type === "sale" ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              Rent
            </button>
          </div>
          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            value={name}
            onChange={handleChange}
            maxLength="30"
            minLength={"10"}
            className="w-full mb-6 px-4 py-2 text-xl font-medium text-gray-700 border border-gray-300 rounded-sm transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600"
          />
          <div className="flex space-x-6">
            <div className="">
              <p className="text-lg font-semibold">Bedrooms</p>
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="50"
                required
                value={bedrooms}
                onChange={handleChange}
                className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition-all text-center"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">Bathrooms</p>
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="50"
                required
                value={bathrooms}
                onChange={handleChange}
                className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition-all text-center"
              />
            </div>
          </div>
          <p className="text-lg mt-6 font-semibold">Parking Spot</p>
          <div className="flex justify-between items-center ">
            <button
              type="button"
              id="parking"
              value={true}
              onChange={handleChange}
              className={` mr-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !parking ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onChange={handleChange}
              className={` ml-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                parking ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
          <p className="text-lg mt-6 font-semibold">Furnished</p>
          <div className="flex justify-between items-center ">
            <button
              type="button"
              id="furnished"
              value={true}
              onChange={handleChange}
              className={` mr-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !furnished ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onChange={handleChange}
              className={` ml-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                furnished ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            placeholder="Address"
            id="address"
            required
            value={address}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 text-xl font-medium text-gray-700 border border-gray-300 rounded-sm transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600"
          />
          <p className="text-lg font-semibold">Description</p>
          <textarea
            placeholder="Description"
            id="description"
            required
            value={description}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 text-xl font-medium text-gray-700 border border-gray-300 rounded-sm transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600"
          />
          <p className="text-lg font-semibold">Offer</p>
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              id="offer"
              value={true}
              onChange={handleChange}
              className={` mr-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !offer ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onChange={handleChange}
              className={` ml-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                offer ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
          <div className=" mb-6">
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex items-center space-x-7">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                min="50"
                max="9000000000000"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-xl bg-white text-gray-700 text-center border border-gray-300 rounded-sm transition-all"
              />
              {type === "rent" && (
                <div className="w-full">
                  <p className="text-md whitespace-nowrap w-full">$ / Month</p>
                </div>
              )}
            </div>
          </div>
          {!offer && (
            <div className=" mb-6">
              <p className="text-lg font-semibold">Discounted Price</p>
              <div className="flex items-center space-x-7">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  min="50"
                  max="9000000000000"
                  onChange={handleChange}
                  required={offer}
                  className="w-full px-4 py-2 text-xl bg-white text-gray-700 text-center border border-gray-300 rounded-sm transition-all"
                />
                {type === "rent" && (
                  <div className="w-full">
                    <p className="text-md whitespace-nowrap w-full">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="mb-6">
            <p className="text-lg font-semibold">Images</p>
            <p className="text-sm text-gray-500 my-1">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={handleChange}
              accept=".jpg,.png,.jpeg"
              required
              multiple
              className="w-full bg-white px-3 py-1.5 text-gray-700 border border-gray-300 rounded-sm transition-all"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-7 uppercase text-sm hover:bg-blue-800 hover:shadow-lg transition-all py-3 bg-blue-600 text-white font-medium rounded shadow-md"
            >
              create listing
            </button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
};

export default CreateListing;
