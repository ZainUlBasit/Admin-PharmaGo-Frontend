import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import AuthInputPopOver from "../../../components/Inputs/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import CustomInput from "../../../components/Inputs/CustomInput";
import TextEditor from "../../../components/TextEditor/TextEditor";
import OptionToggle from "../../../components/Toggles/OptionToggle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/Slices/CategorySlice";
import { fetchSubCategories } from "../../../store/Slices/SubCategorySlice";
import { CreateProductApi } from "../../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../../utils/ShowToast";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../Config/firebase";

const AddProduct = () => {
  const [SelectedCategory, setSelectedCategory] = useState("");
  // const [SubSelectedCategory, setSubSelectedCategory] = useState("");
  const [Name, setName] = useState("");
  const [Desc, setDesc] = useState("");
  const [Images, setImages] = useState([]);
  const [VideoLink, setVideoLink] = useState("");
  const [SalePrice, setSalePrice] = useState("");
  const [CostPrice, setCostPrice] = useState("");
  const [SelColor, setSelColor] = useState("");
  const [ColorOptions, setColorOptions] = useState([]);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Qty, setQty] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const imageUrls = await Promise.all(
      //   Images.map(async (dt) => {
      //     const imageRef = storage.ref(`/game-point/${Name}`);
      //     const snapshot = await imageRef.put(dt);
      //     const downloadURL = await snapshot.ref.getDownloadURL();
      //     return downloadURL;
      //   })
      // );

      // const { name, cat_id, subcat_id, desc, images, video, cost, price, colors } =

      const formData = new FormData();

      // Append individual fields
      formData.append("name", Name);
      formData.append("cat_id", SelectedCategory._id);
      // if (SubSelectedCategory) {
      //   formData.append("subcat_id", SubSelectedCategory._id);
      // }
      formData.append("desc", Desc);
      formData.append("video", VideoLink);
      formData.append("cost", Number(CostPrice));
      formData.append("price", Number(SalePrice));
      formData.append("qty", Number(Qty));

      // Append colors (if it's an array of objects, stringify it)
      formData.append("colors", JSON.stringify(ColorOptions));

      // Append images (if it's an array of File objects)
      Images.forEach((image, index) => {
        console.log(image);
        formData.append("images", image); // Field name must match the backend's multer configuration
      });
      console.log(formData);

      const response = await CreateProductApi(formData);
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        console.log(response.data);
        navigate("/admin/products");
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("err", err);
    }
    setLoading(false);
  };

  const [anchorElColor, setAnchorElColor] = useState(null);
  const handleClickColor = (event) => {
    setAnchorElColor(event.currentTarget);
  };
  const handleCloseColor = () => {
    setAnchorElColor(null);
  };

  const openColor = Boolean(anchorElColor);
  const idColor = openColor ? "simple-popover" : undefined;
  const [anchorElCat, setAnchorElCat] = useState(null);
  const handleClickCat = (event) => {
    setAnchorElCat(event.currentTarget);
  };
  const handleCloseCat = () => {
    setAnchorElCat(null);
  };

  const openCat = Boolean(anchorElCat);
  const idCat = openCat ? "simple-popover" : undefined;

  const [anchorElSubCat, setAnchorElSubCat] = useState(null);
  const handleClickSubCat = (event) => {
    setAnchorElSubCat(event.currentTarget);
  };
  const handleCloseSubCat = () => {
    setAnchorElSubCat(null);
  };

  const dispatch = useDispatch();
  const CatState = useSelector((state) => state.CategoryState);
  const SubCatState = useSelector((state) => state.SubCategoryState);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, []);

  const handleImageAdd = (files) => {
    const updatedImages = [...Images];
    Array.from(files).forEach((file) => {
      if (updatedImages.length < 10) {
        updatedImages.push(file);
      }
    });
    setImages(updatedImages);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const openSubCat = Boolean(anchorElSubCat);
  const idSubCat = openSubCat ? "simple-popover" : undefined;

  return (
    <div className="flex-1 flex flex-col gap-y-2 max-h-[100vh] overflow-hidden">
      <div className="flex w-full gap-x-2 justify-start items-center h-[5vh]">
        <IoMdArrowRoundBack className="text-2xl" />
        <div className="text-2xl font-semibold">Add New Product</div>
      </div>
      <div className="bg-white p-5 h-[90vh] overflow-y-auto">
        <div className="flex flex-col w-full gap-y-3">
          <div className="text-xl font-semibold">Information</div>
          <div className="grid grid-cols-2 gap-4 max750:grid-cols-1">
            <div className="">
              <CustomInput
                LabelName={"Product Name"}
                placeholder={"Enter Product Name"}
                className="rounded-[10px]"
                value={Name}
                setValue={setName}
              />
            </div>
            <div className="flex flex-col gap-y-1 font-poppins">
              <label htmlFor="Category" className="text-black">
                Select Category
              </label>
              <AuthInputPopOver
                placeholder={"Select Category"}
                Value={SelectedCategory ? SelectedCategory.name : ""}
                onClick={handleClickCat}
              />
              <Popover
                id={idCat}
                open={openCat}
                anchorEl={anchorElCat}
                onClose={handleCloseCat}
                PaperProps={{
                  sx: {
                    borderRadius: "25px", // Add rounded corners
                    backgroundColor: "white", // Set background color to white
                    width: "400px", // Set the width as needed
                    overflow: "hidden", // Hide overflowing content
                    //   marginTop: "6px",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    borderColor: "#465462",
                    backgroundColor: "#465462",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "25px",
                  }}
                >
                  <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      {CatState.data &&
                        CatState.data.map((dt) => (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleCloseCat();
                              console.log(dt);

                              setSelectedCategory(dt);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={SelectedCategory._id === dt._id}
                            />
                            <span>{dt.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Typography>
              </Popover>
            </div>
            {/* <div className="flex flex-col gap-y-1 font-poppins">
              <label htmlFor="Category" className="text-black">
                Select Sub Category
              </label>
              <AuthInputPopOver
                placeholder={"Select Sub Category"}
                Value={SubSelectedCategory ? SubSelectedCategory.name : ""}
                onClick={handleClickSubCat}
              />
              <Popover
                id={idSubCat}
                open={openSubCat}
                anchorEl={anchorElSubCat}
                onClose={handleCloseSubCat}
                PaperProps={{
                  sx: {
                    borderRadius: "25px", // Add rounded corners
                    backgroundColor: "white", // Set background color to white
                    width: "400px", // Set the width as needed
                    overflow: "hidden", // Hide overflowing content
                    //   marginTop: "6px",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    borderColor: "#465462",
                    backgroundColor: "#465462",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "25px",
                  }}
                >
                  <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      {SubCatState.data
                        .filter((dt) => dt.catId?._id === SelectedCategory?._id)
                        .map((dt) => (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleCloseSubCat();
                              setSubSelectedCategory(dt);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={SubSelectedCategory._id === dt._id}
                            />
                            <span>{dt.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Typography>
              </Popover>
            </div> */}
          </div>
          <div className="grid grid-cols-3 gap-4 pb-4 max750:grid-cols-1">
            <CustomInput
              LabelName={"Product Sale Price"}
              placeholder={"Enter Product Sale Price"}
              className="rounded-[10px]"
              value={SalePrice}
              setValue={setSalePrice}
              type={"number"}
            />
            <CustomInput
              LabelName={"Product Cost Price"}
              placeholder={"Enter Product Cost Price"}
              className="rounded-[10px]"
              value={CostPrice}
              setValue={setCostPrice}
              type={"number"}
            />
            <CustomInput
              LabelName={"Product Quantity"}
              placeholder={"Enter Product Quantity"}
              className="rounded-[10px]"
              value={Qty}
              setValue={setQty}
              type={"number"}
            />
          </div>
          <div className="grid grid-cols-1">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="Category" className="text-black">
                Product Description
              </label>
              <TextEditor value={Desc} setValue={setDesc} />
            </div>
          </div>
        </div>
        <hr className="bg-gray-300 mt-3" />
        <div className="flex flex-col gap-y-4 py-2">
          <label className="text-black text-xl font-semibold">Images</label>
          <div className="flex gap-x-3 items-end flex-wrap gap-y-2">
            {Images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  className="min-h-20 min-w-20 w-20 h-20 rounded-[5px] border-[1px] border-gray-500 object-cover"
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={() => handleImageRemove(index)}
                >
                  ×
                </button>
              </div>
            ))}
            {Images.length < 10 && (
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageAdd(e.target.files)}
              />
            )}
          </div>
        </div>
        <div className="py-4">
          <CustomInput
            LabelName={"Video Link"}
            placeholder={"e.g., https://www.youtube.com/embed/VIDEO_ID"}
            className="rounded-[10px]"
            value={VideoLink}
            setValue={setVideoLink}
          />
        </div>
        <hr className="bg-gray-300 mt-3" />
        <div className="py-2 pt-5 flex flex-col gap-y-5">
          {/* <div className="py-2 pt-5 flex flex-col gap-y-5">
            <label className="text-black text-xl font-semibold">
              Different Options
            </label>
            <div className="flex items-center gap-x-2 font-inter">
              <OptionToggle />
              <div className="">This product has multiple options</div>
            </div>
            <div className="flex gap-x-1">
              {ColorOptions.map((opt, index) => (
                <div
                  key={index}
                  className="h-8 w-8 rounded-full"
                  style={{
                    backgroundColor: opt,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }} // Fallback to white if `hex` is empty
                ></div>
              ))}
            </div>

            <div className="max-w-[400px]">
              <div className="flex flex-col gap-y-1 font-poppins">
                <label htmlFor="Category" className="text-black">
                  Select Color
                </label>
                <input
                  type="color"
                  className="h-10 w-32"
                  value={SelColor}
                  onChange={(e) => {
                    setSelColor(e.target.value);
                  }}
                />
                <button
                  className="text-white bg-[green] hover:bg-green-600 transition-all ease-in-out duration-500 font-inter w-fit px-3 py-2 my-2 rounded-lg"
                  onClick={() => {
                    const updatedColors = [...ColorOptions];
                    updatedColors.push(SelColor);
                    setColorOptions(updatedColors);
                    setSelColor("");
                  }}
                >
                  Add More
                </button>
              </div>
            </div>
          </div> */}
          <div className="flex justify-end w-full">
            {Loading ? (
              <div></div>
            ) : (
              <button
                className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500"
                onClick={onSubmit}
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
