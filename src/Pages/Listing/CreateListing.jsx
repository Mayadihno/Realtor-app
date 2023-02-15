import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, db } from "../../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const [geoLocation, setGeoLocation] = useState(true);
  const [loading, setLoading] = useState(false);
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
    longitude: 0,
    latitude: 0,
    images: {},
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
    longitude,
    latitude,
    images,
  } = formData;
  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted Price should be less than Regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("selected images should not be more than 6");
      return;
    }

    const storeImages = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImages(image))
    ).catch((error) => {
      if (error.code === "storage/unauthorized") {
        setLoading(false);
        toast.error("Image Size is greater than 2mb");
      }

      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listening is Created Successfully");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <React.Fragment>
      <main className="px-2 max-w-md mx-auto">
        <h1 className="text-center text-3xl font-bold mt-7">
          Create a Listing
        </h1>
        <form onSubmit={handleSubmit}>
          <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
          <div className="flex justify-between items-center ">
            <button
              type="button"
              id="type"
              value={"sale"}
              onClick={handleChange}
              className={` mr-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              sell
            </button>
            <button
              type="button"
              id="type"
              value={"rent"}
              onClick={handleChange}
              className={` ml-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
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
              onClick={handleChange}
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
              onClick={handleChange}
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
              onClick={handleChange}
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
              onClick={handleChange}
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
            className="w-full px-4 py-2 text-xl font-medium text-gray-700 border border-gray-300 rounded-sm transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600"
          />
          {!geoLocation && (
            <div className="my-5 flex space-x-6">
              <div className="">
                <p className="text-lg font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  required
                  min={"-90"}
                  max="90"
                  onChange={handleChange}
                  className="w-full text-center text-gray-700 bg-white transition-all px-4 py-2 border border-gray-300 text-xl rounded"
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  min={"-180"}
                  max="180"
                  required
                  onChange={handleChange}
                  className="w-full text-center text-gray-700 bg-white transition-all px-4 py-2 border border-gray-300 text-xl rounded"
                />
              </div>
            </div>
          )}
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
              onClick={handleChange}
              className={` mr-3 px-7 py-3 shadow-md text-sm uppercase font-medium rounded-sm hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !offer ? "bg-white" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={handleChange}
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
          {offer && (
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
