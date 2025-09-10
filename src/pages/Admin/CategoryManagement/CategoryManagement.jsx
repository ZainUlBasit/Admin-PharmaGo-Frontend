import React, { useEffect, useState } from "react";
import TableComp from "../../../components/Tables/TableComp";
import { CategoryTableColumns } from "../../../assets/TableColumns/CategoryTableColumns";
import { SubCategoryTableColumns } from "../../../assets/TableColumns/SubCategoryTableColumns";
import AddCategoryModal from "../../../components/Modals/AddCategoryModal";
import AddSubCategoryModal from "../../../components/Modals/AddSubCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/Slices/CategorySlice";
import { fetchSubCategories } from "../../../store/Slices/SubCategorySlice";
import AddingLightLoader from "../../../components/Loaders/AddingLightLoader";
import EditCategoryModal from "../../../components/Modals/EditCategoryModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { DeleteCategoryApi, DeleteSubCategoryApi } from "../../../ApiRequests";
import { SuccessToast } from "../../../utils/ShowToast";
import EditSubCategoryModal from "../../../components/Modals/EditSubCategoryModal";
import StatsCards from "../../../components/Cards/StatsCards";
import Header from "../../../components/Header/Header";

const CategoryManagement = () => {
  const [CurrentTab, setCurrentTab] = useState("Cat");
  const [AddCatModal, setAddCatModal] = useState(false);
  const [AddSubCatModal, setAddSubCatModal] = useState(false);
  const [OpenCatEditModal, setOpenCatEditModal] = useState(false);
  const [OpenCatDeleteModal, setOpenCatDeleteModal] = useState(false);
  const [OpenSubCatEditModal, setOpenSubCatEditModal] = useState(false);
  const [OpenSubCatDeleteModal, setOpenSubCatDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const CatState = useSelector((state) => state.CategoryState);
  const SubCatState = useSelector((state) => state.SubCategoryState);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, []);
  useEffect(() => {
    console.log("yes");
    console.log(OpenCatEditModal);
    console.log(Selected);
  }, [Selected, OpenCatEditModal]);
  return (
    <div className="flex-1 ">
      <Header
        title={"Cities Management"}
        desc={"Manage and keep track of your cities."}
      >
        <button
          className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500"
          onClick={() => {
            setAddCatModal(true);
          }}
        >
          <span className="text-2xl">+</span>
          Add City
        </button>
      </Header>

      <StatsCards
        title={"City Overview"}
        statsData={[
          {
            title: "All Cities",
            value: CatState.data.length || 0,
            subtitle: "",
            textColor: "text-[black]",
          },
        ]}
      />
      {CatState.loading || SubCatState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
        <>
          {CurrentTab === "Cat" ? (
            <div className="w-full flex flex-col bg-white my-4">
              <TableComp
                Rows={CatState.data}
                Columns={CategoryTableColumns}
                setOpenEditModal={setOpenCatEditModal}
                setOpenDeleteModal={setOpenCatDeleteModal}
                setSelected={setSelected}
              />
            </div>
          ) : (
            CurrentTab === "SubCat" && (
              <div className="w-full flex flex-col bg-white my-4">
                <TableComp
                  Rows={SubCatState.data}
                  Columns={SubCategoryTableColumns}
                  setOpenEditModal={setOpenSubCatEditModal}
                  setOpenDeleteModal={setOpenSubCatDeleteModal}
                  setSelected={setSelected}
                />
              </div>
            )
          )}
        </>
      )}
      {AddCatModal && (
        <AddCategoryModal open={AddCatModal} setOpen={setAddCatModal} />
      )}
      {AddSubCatModal && (
        <AddSubCategoryModal
          open={AddSubCatModal}
          setOpen={setAddSubCatModal}
        />
      )}
      {OpenCatEditModal && (
        <EditCategoryModal
          category={CatState.data.find((dt) => dt._id === Selected._id)}
          open={OpenCatEditModal}
          setOpen={setOpenCatEditModal}
        />
      )}
      {OpenSubCatEditModal && (
        <EditSubCategoryModal
          subCategory={SubCatState.data.find((dt) => dt._id === Selected._id)}
          open={OpenSubCatEditModal}
          setOpen={setOpenSubCatEditModal}
        />
      )}

      {OpenCatDeleteModal && (
        <DeleteModal
          Open={OpenCatDeleteModal}
          setOpen={setOpenCatDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteCategoryApi(Selected._id);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenCatDeleteModal(false);
                dispatch(fetchCategories());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
          Loading={Loading}
        />
      )}
      {OpenSubCatDeleteModal && (
        <DeleteModal
          Open={OpenSubCatDeleteModal}
          setOpen={setOpenSubCatDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteSubCategoryApi(Selected._id);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenSubCatDeleteModal(false);
                dispatch(fetchSubCategories());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
          Loading={Loading}
        />
      )}
    </div>
  );
};

export default CategoryManagement;
