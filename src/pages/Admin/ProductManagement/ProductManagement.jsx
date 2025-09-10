import React, { useEffect, useState } from "react";
import TableComp from "../../../components/Tables/TableComp";
import { ProductTableColumns } from "../../../assets/TableColumns/ProductTableColumns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/Slices/ProductSlice";
import AddingLightLoader from "../../../components/Loaders/AddingLightLoader";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { DeleteProductApi } from "../../../ApiRequests";
import { SuccessToast } from "../../../utils/ShowToast";
import StatsCards from "../../../components/Cards/StatsCards";
import Header from "../../../components/Header/Header";

const ProductManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.ProductState);

  const [NavigateToEditProduct, setNavigateToEditProduct] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (NavigateToEditProduct && Selected) {
      navigate(`/admin/edit-product/${Selected._id}`);
    }
  }, [NavigateToEditProduct, Selected, navigate]);

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title={"Product Management"}
        desc={"Manage and keep track of your products."}
      >
        
        <button
          className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500"
          onClick={() => navigate("/admin/add-product")}
        >
          <span className="text-2xl">+</span>
          Add Product
        </button>
      </Header>

      {ProductState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white my-4">
          <StatsCards
            title={"Product Overview"}
            statsData={[
              {
                title: "All Products",
                value: Array.isArray(ProductState.data)
                  ? ProductState.data?.length || 0
                  : "0",
                subtitle: "",
                textColor: "text-[green]",
              },
              {
                title: "Total Stock",
                value: Array.isArray(ProductState.data)
                  ? ProductState.data.reduce(
                      (acc, curr) => acc + curr.qty,
                      0
                    ) || 0
                  : "0",
                subtitle: "",
                textColor: "text-orange-500",
              },
            ]}
          />
          <TableComp
            Rows={ProductState.data || []}
            Columns={ProductTableColumns}
            setOpenEditModal={setNavigateToEditProduct}
            setOpenDeleteModal={setOpenDeleteModal}
            setSelected={setSelected}
          />
        </div>
      )}

      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteProductApi(Selected._id);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchProducts());
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

export default ProductManagement;
