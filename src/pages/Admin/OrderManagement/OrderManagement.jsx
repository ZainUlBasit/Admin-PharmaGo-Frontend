import React, { useEffect, useState } from "react";
import TableComp from "../../../components/Tables/TableComp";
import { OrderTableColumns } from "../../../assets/TableColumns/OrderTableColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../store/Slices/OrderSlice";
import AddingLightLoader from "../../../components/Loaders/AddingLightLoader";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { DeleteOrderApi } from "../../../ApiRequests";
import { SuccessToast } from "../../../utils/ShowToast";
import StatsCards from "../../../components/Cards/StatsCards";
import Header from "../../../components/Header/Header";
import SearchBox from "../../../components/SearchBox/SearchBox";

const OrderManagement = () => {
  const [Selected, setSelected] = useState("");
  const [Loading, setLoading] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const OrderState = useSelector((state) => state.OrderState);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <div className="flex-1">
      <Header
        title={"Order Management"}
        desc={"Manage and keep track of your orders."}
      />
      {OrderState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
        <div className="flex flex-col bg-white my-4 flex-1 overflow-auto">
          <StatsCards
            title={"Order Overview"}
            statsData={[
              {
                title: "Placed Orders",
                value:
                  OrderState.data.filter((order) => order.status === 2)
                    .length || "0",
                subtitle: "",
                textColor: "text-orange-500",
              },
              {
                title: "Approved Orders",
                value:
                  OrderState.data.filter((order) => order.status === 3)
                    .length || "0",
                subtitle: "",
                textColor: "text-green-500",
              },
              {
                title: "Delivered Orders",
                value:
                  OrderState.data.filter((order) => order.status === 4)
                    .length || "0",
                subtitle: "",
                textColor: "text-green-600",
              },
              {
                title: "Cancelled Orders",
                value:
                  OrderState.data.filter((order) => order.status === 5)
                    .length || "0",
                subtitle: "",
                textColor: "text-orange-500",
              },
            ]}
          />
          <div className="flex justify-end mb-2">
            <div className="border-[2px] border-main p-2  max-w-[300px] rounded-full">
              <SearchBox
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Order No."
              />
            </div>
          </div>
          <TableComp
            Rows={
              OrderState.data
                ? OrderState.data.filter((order) =>
                    SearchText === ""
                      ? true
                      : order.order_no.includes(SearchText)
                  )
                : []
            }
            Columns={OrderTableColumns}
            setOpenDeleteModal={setOpenDeleteModal}
            setSelected={setSelected}
          />
        </div>
      )}

      {OpenDeleteModal && (
        <DeleteModal
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteOrderApi(Selected._id);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchOrders());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
          setOpen={setOpenDeleteModal}
          Open={OpenDeleteModal}
          Loading={Loading}
        />
      )}
    </div>
  );
};

export default OrderManagement;
