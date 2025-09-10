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

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    console.log("yes");
    console.log(OpenCatEditModal);
    console.log(Selected);
  }, [Selected, OpenCatEditModal]);
  return (
    <div className="flex-1 ">
      <Header
        title={"Category Management"}
        desc={"Manage and keep track of your categories."}
      >
        <button
          className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500"
          onClick={() => {
            setAddCatModal(true);
          }}
        >
          <span className="text-2xl">+</span>
          Add Category
        </button>
      </Header>

      <StatsCards
        title={"Category Overview"}
        statsData={[
          {
            title: "All Categories",
            value: CatState.data.length || 0,
            subtitle: "",
            textColor: "text-[black]",
          },
        ]}
      />
      {CatState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
          <div className="w-full flex flex-col bg-white my-4">
            <TableComp
              Rows={CatState.data}
              Columns={CategoryTableColumns}
              setOpenEditModal={setOpenCatEditModal}
              setOpenDeleteModal={setOpenCatDeleteModal}
              setSelected={setSelected}
            />
          </div>
      )}
      {AddCatModal && (
        <AddCategoryModal open={AddCatModal} setOpen={setAddCatModal} />
      )}
      
      {OpenCatEditModal && (
        <EditCategoryModal
          category={CatState.data.find((dt) => dt._id === Selected._id)}
          open={OpenCatEditModal}
          setOpen={setOpenCatEditModal}
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
      
    </div>
  );
};

export default CategoryManagement;
