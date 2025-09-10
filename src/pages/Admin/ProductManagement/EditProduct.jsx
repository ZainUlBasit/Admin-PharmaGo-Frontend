import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import AuthInputPopOver from "../../../components/Inputs/AuthInputPopOver";
import CustomInput from "../../../components/Inputs/CustomInput";
import TextEditor from "../../../components/TextEditor/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/Slices/CategorySlice";
import { fetchSubCategories } from "../../../store/Slices/SubCategorySlice";
import { UpdateProductApi, UpdateProductImagesApi } from "../../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../../utils/ShowToast";
import { fetchProducts } from "../../../store/Slices/ProductSlice";
import { Popover, Typography } from "@mui/material";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from the route
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [SelectedCategory, setSelectedCategory] = useState("");
  // const [SubSelectedCategory, setSubSelectedCategory] = useState("");
  const [Name, setName] = useState("");
  const [Desc, setDesc] = useState("");
  const [Images, setImages] = useState(Array(4).fill(null));
  const [DeletedImages, setDeletedImages] = useState([]);
  const [VideoLink, setVideoLink] = useState("");
  const [SalePrice, setSalePrice] = useState("");
  const [CostPrice, setCostPrice] = useState("");
  const [Qty, setQty] = useState("");
  const [ColorOptions, setColorOptions] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [addNewImage, setaddNewImage] = useState("");

  const CatState = useSelector((state) => state.CategoryState);
  const SubCatState = useSelector((state) => state.SubCategoryState);
  const ProductState = useSelector((state) => state.ProductState);

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

  const openSubCat = Boolean(anchorElSubCat);
  const idSubCat = openSubCat ? "simple-popover" : undefined;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (ProductState.data) {
      const product = ProductState.data.find((dt) => dt._id === id);
      console.log(product);

      if (product) {
        setSelectedCategory(product.cat_id._id || "");
        // setSubSelectedCategory(product.subcat_id || "");
        setName(product.name || "");
        setDesc(product.desc || "");
        setImages(product.images || []);
        setDeletedImages(product.deletedImages || []);
        setVideoLink(product.video || "");
        setSalePrice(product.price || "");
        setCostPrice(product.cost || "");
        setColorOptions(product.colors || []);
        setQty(product.qty || 0);
      }
    }
  }, [ProductState, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //   const imageUrls = await Promise.all(
      //     Images.map(async (image) => {
      //       if (typeof image === "string") {
      //         return image;
      //       } else {
      //         const imageRef = storage.ref(`/products/${Name}`);
      //         const snapshot = await imageRef.put(image);
      //         const downloadURL = await snapshot.ref.getDownloadURL();
      //         return downloadURL;
      //       }
      //     })
      //   );

      const formData = new FormData();
      formData.append("name", Name);
      formData.append("cat_id", SelectedCategory);
      formData.append("desc", Desc);
      Images.forEach((image, index) => {
        formData.append("images", image); // Field name must match the backend's multer configuration
      });
      DeletedImages.forEach((image, index) => {
        formData.append("deletedImages", image); // Field name must match the backend's multer configuration
      });
      formData.append("video", VideoLink);
      formData.append("cost", Number(CostPrice));
      formData.append("price", Number(SalePrice));
      formData.append("qty", Number(Qty));
      formData.append("colors", JSON.stringify(ColorOptions));

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await UpdateProductApi(id, formData);

      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        navigate("/admin/products");
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Failed to update product");
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-y-2 max-h-[100vh] overflow-hidden">
      <div className="flex w-full gap-x-2 justify-start items-center h-[5vh]">
        <IoMdArrowRoundBack className="text-2xl" onClick={() => navigate(-1)} />
        <div className="text-2xl font-semibold">Edit Product</div>
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
                Value={
                  SelectedCategory
                    ? CatState.data.find((ct) => ct._id === SelectedCategory)
                        ?.name
                    : ""
                }
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

                              setSelectedCategory(dt._id);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={SelectedCategory === dt._id}
                            />
                            <span>{dt.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Typography>
              </Popover>
            </div>
            {/*   <div className="flex flex-col gap-y-1 font-poppins">
              <label htmlFor="Category" className="text-black">
                Select Sub Category
              </label>
              <AuthInputPopOver
                placeholder={"Select Sub Category"}
                Value={
                  SubSelectedCategory
                    ? SubCatState.data.find(
                        (ct) => ct._id === SubSelectedCategory
                      )?.name
                    : ""
                }
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
                        .filter((dt) => dt.catId._id === SelectedCategory)
                        .map((dt) => (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleCloseSubCat();
                              setSubSelectedCategory(dt._id);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={SubSelectedCategory === dt._id}
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
          <div className="py-2 grid grid-cols-3 gap-4 max750:grid-cols-1">
            <CustomInput
              LabelName={"Sale Price"}
              placeholder={"Enter Sale Price"}
              value={SalePrice}
              setValue={setSalePrice}
              type={"number"}
            />
            <CustomInput
              LabelName={"Cost Price"}
              placeholder={"Enter Cost Price"}
              value={CostPrice}
              setValue={setCostPrice}
              type={"number"}
            />
            <CustomInput
              LabelName={"Quantity"}
              placeholder={"Enter Quantity"}
              value={Qty}
              setValue={setQty}
              type={"number"}
            />
          </div>
          <TextEditor value={Desc} setValue={setDesc} />
        </div>

        <div className="flex flex-col gap-y-4 py-2">
          <label className="text-black text-xl font-semibold">Images</label>
          <div className="flex gap-x-3 items-end flex-wrap gap-y-2">
            {Images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  className="min-h-20 min-w-20 w-20 h-20 rounded-[5px] border-[1px] border-gray-500 object-cover"
                  src={
                    typeof image === "string"
                      ? image
                      : image instanceof Blob
                      ? URL.createObjectURL(image)
                      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  }
                  alt={`Product Image ${index + 1}`}
                />
                {image && (
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => {
                      setDeletedImages((prevDeletedImages) => [
                        ...prevDeletedImages,
                        image,
                      ]);
                      setImages((prevImages) =>
                        prevImages.filter((dt, i) => index !== i)
                      );
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setImages((prevImages) => [...prevImages, file]);
              }}
            />
          </div>
        </div>

        <div className="py-2">
          <CustomInput
            LabelName={"Video Link"}
            placeholder={"Enter Video Link"}
            value={VideoLink}
            setValue={setVideoLink}
          />
        </div>

        <button
          className="bg-main text-white px-4 py-2 rounded-xl"
          onClick={onSubmit}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
