import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import CustomInput from "../Inputs/CustomInput";
import AuthInputPopOver from "../Inputs/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { UpdateSubCategoryApi } from "../../ApiRequests";
import { fetchSubCategories } from "../../store/Slices/SubCategorySlice";

const EditSubCategoryModal = ({ open, setOpen, subCategory }) => {
  const [SelectedCategory, setSelectedCategory] = useState(
    subCategory?.catId || ""
  );
  const [SubCatName, setSubCatName] = useState(subCategory?.name || "");
  const [anchorElCat, setAnchorElCat] = useState(null);
  const [Loading, setLoading] = useState(false);

  const handleClickCat = (event) => {
    setAnchorElCat(event.currentTarget);
  };

  const handleCloseCat = () => {
    setAnchorElCat(null);
  };

  const openCat = Boolean(anchorElCat);
  const idCat = openCat ? "simple-popover" : undefined;

  const dispatch = useDispatch();
  const CatState = useSelector((state) => state.CategoryState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await UpdateSubCategoryApi(subCategory._id, {
        catId: SelectedCategory._id,
        name: SubCatName,
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        dispatch(fetchSubCategories());
        setOpen(false);
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("err", err);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="flex flex-col px-8 py-4">
        <div className="flex w-full justify-center items-center font-bold text-4xl border-b-[3px] border-b-[#0e2480] py-4 pb-6">
          <div className="text-3xl text-black">Edit Sub Category</div>
        </div>
        <div className="flex flex-col justify-center items-center py-6">
          <div className="flex gap-x-4 py-0 pb-6">
            <div className="flex flex-col gap-y-4">
              <div className="w-[400px]">
                <div className="flex flex-col gap-y-1 font-poppins">
                  <label htmlFor="Category" className="text-black opacity-40">
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
                        borderRadius: "25px",
                        backgroundColor: "white",
                        width: "400px",
                        overflow: "hidden",
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
                      <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                        <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                          {CatState.data.map((dt) => (
                            <div
                              className="flex gap-x-3 items-center cursor-pointer"
                              onClick={() => {
                                handleCloseCat();
                                setSelectedCategory(dt);
                              }}
                              key={dt._id}
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
              </div>
              <div className="w-[400px]">
                <CustomInput
                  LabelName="Sub Category Name"
                  placeholder="Enter Sub Category Name"
                  value={SubCatName}
                  setValue={setSubCatName}
                />
              </div>
            </div>
          </div>
          {Loading ? (
            <div className="flex gap-x-5 pt-4"></div>
          ) : (
            <div className="flex gap-x-5 pt-4">
              <button
                className="border-[2px] border-[green] text-[green] font-bold hover:text-white hover:bg-[green] transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px]"
                onClick={onSubmit}
              >
                Update
              </button>
              <button
                className="border-[2px] border-[red] text-[red] font-bold hover:text-white hover:bg-[red] transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditSubCategoryModal;
