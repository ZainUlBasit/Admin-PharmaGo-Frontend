import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/Slices/OrderSlice";
import { fetchCustomerOrders } from "../../store/Slices/CustomerOrderSlice";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";
import TableComp from "../../components/Tables/TableComp";
import { OrderTableColumns } from "../../assets/TableColumns/OrderTableColumns";
const user_id = JSON.parse(localStorage.getItem("user"))?.cust_id?._id;

const MyOrders = () => {
  const dispatch = useDispatch();
  const CustomerOrderState = useSelector((state) => state.CustomerOrderState);
  useEffect(() => {
    dispatch(fetchCustomerOrders(user_id));
  }, []);
  const items = [
    {
      id: 1,
      name: "Skullcandy - Crusher anc 2 wireless headphones",
      color: "Black",
      price: 299.99,
    },
    {
      id: 2,
      name: "APPLE AirPods Pro MagSafe Case",
      color: "White",
      price: 399.99,
    },
    { id: 3, name: "RODE PodMic", color: "Black", price: 199.99 },
  ];

  const totalAmount = items.reduce((total, item) => total + item.price, 0);
  return (
    <div className="w-full p-4">
      <div className="flex w-full justify-start items-center py-4 pb-2 flex-wrap">
        <div className="text-2xl font-semibold">My Orders</div>
      </div>
      {CustomerOrderState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
        <div className="flex flex-col bg-white my-4 flex-1 overflow-auto">
          <TableComp
            Rows={CustomerOrderState.data ? CustomerOrderState.data : []}
            Columns={OrderTableColumns.filter((dt) => dt.id !== "delete")}
            // setOpenDeleteModal={setOpenDeleteModal}
            // setSelected={setSelected}
          />
        </div>
      )}
    </div>
  );
  // <div className="border-[1px]  gap-y-2 shadow-lg p-8 w-[98%] mt-4">
  //   <h2 className="font-bold mb-4 mt-1 font-roboto">My Orders</h2>
  //   <div className="flex flex-col gap-y-4 font-roboto text-[.9rem]">
  //     <div className="flex justify-between gap-x-8">
  //       <div className="">Price</div>
  //       <div className="">Rs 8765</div>
  //     </div>
  //     <div className="flex justify-between gap-x-8">
  //       <div className="">Discount</div>
  //       <div className="">Rs 0/-</div>
  //     </div>
  //     <div className="flex justify-between gap-x-8">
  //       <div className="">Shipping</div>
  //       <div className="">Free</div>
  //     </div>
  //   </div>
  //   <hr className="my-2" />
  //   <div className="flex flex-col gap-y-4 font-roboto text-[.9rem]">
  //     <div className="flex justify-between gap-x-8">
  //       <span>Total Amount</span>
  //       <span>PKR {totalAmount.toFixed(2)}</span>
  //     </div>
  //     <div className="flex justify-between gap-x-8">
  //       <span>Estimated Delivery by</span>
  //       <span>16 Dec, 2024</span>
  //     </div>
  //     <div className="flex justify-between gap-x-8">
  //       <span>Contact Number</span>
  //       <span>0311-1234567</span>
  //     </div>
  //   </div>
  // </div>
};

export default MyOrders;
