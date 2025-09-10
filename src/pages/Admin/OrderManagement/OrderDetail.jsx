import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrintSimpleTable from "../../../components/Tables/PrintSimpleTable";
import { fetchOrders } from "../../../store/Slices/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { FaArrowLeft } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";

const OrderDetail = () => {
  const { id } = useParams(); // Order ID from the URL params
  const dispatch = useDispatch();
  const OrderState = useSelector((state) => state.OrderState);
  const currentOrderDetail = OrderState.data.find((order) => order._id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!OrderState.data.length) {
      dispatch(fetchOrders());
    }
  }, [OrderState.data, dispatch]);

  const contentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  if (!currentOrderDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col justify-start mt-10">
      <div className="flex w-full justify-between items-center py-0 pb-2 flex-wrap h-[10vh]">
        <div className="text-2xl font-semibold flex items-center gap-x-2">
          <FaArrowLeft
            className="hover:scale-[1.3] transition-all ease-in-out duration-500 border-2 border-white hover:bg-main text-2xl flex items-center justify-center h-10 w-10 p-1 hover:text-white hover:rounded-full cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          Order Invoice
        </div>
      </div>

      <div className="flex-1 h-[85vh] overflow-y-auto font-quicksand">
        <div className="flex w-full justify-end">
          <button
            className="px-2 py-2 border-2 border-main transition-all ease-in-out duration-700 hover:bg-white hover:text-main bg-main text-white cursor-pointer w-fit flex justify-center items-center font-bold my-3 text-2xl rounded-full"
            onClick={() => {
              const invoiceElement = document.querySelector("#Invoice");
              html2pdf(invoiceElement);
            }}
          >
            <MdLocalPrintshop />
          </button>
        </div>
        <div
          id="Invoice"
          style={{ border: "2px solid", padding: "20px" }}
          className="flex-1 border-main"
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ marginRight: "10px" }}
                className="w-[250px]"
              />
            </div>
            <h2 style={{ fontSize: "32px", margin: 0 }}>INVOICE</h2>
          </div>

          <hr />

          {/* Invoice Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <p style={{ margin: "5px 0" }}>
                <strong>Invoice No:</strong> {currentOrderDetail?._id}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Date:</strong>{" "}
                {moment(new Date(currentOrderDetail.order_date)).format(
                  "MMM DD YYYY"
                )}
              </p>
            </div>
            <div>
              <p style={{ margin: "5px 0", textAlign: "right" }}>
                <strong>Invoice to:</strong>
              </p>
              <p style={{ margin: "5px 0", textAlign: "right" }}>
                {currentOrderDetail.customer}
              </p>
              <p style={{ margin: "5px 0", textAlign: "right" }}>
                {currentOrderDetail.address}
              </p>
              <p style={{ margin: "5px 0", textAlign: "right" }}>
                {currentOrderDetail.contact_no}
              </p>
            </div>
          </div>

          <hr />

          <PrintSimpleTable
            columns={[
              {
                id: "name",
                title: "Name",
              },
              {
                id: "price",
                title: "Price",
                format: (value) => value.toLocaleString("en-US"),
              },
              {
                id: "qty",
                title: "Qty",
                format: (value) => value.toLocaleString("en-US"),
              },
              {
                id: "total",
                title: "Total",
                format: (value) => value.toLocaleString("en-US"),
              },
            ]}
            rows={currentOrderDetail.items}
          />

          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "5px 0", fontSize: "20px" }}>
                <strong>Total:</strong> PKR{" "}
                {currentOrderDetail.items
                  .reduce((total, item) => total + item.price * item.qty, 0)
                  .toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <hr />

          <div style={{ marginBottom: "20px" }}>
            <p style={{ margin: "5px 0" }}>
              <strong>Shipping Address:</strong> {currentOrderDetail.address}
            </p>
          </div>
          {/* Payment Method */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ margin: "5px 0" }}>
              <strong>Shipping Method:</strong> {currentOrderDetail.shipping}
            </p>
          </div>

          {/* Footer */}
          <div className="flex w-full justify-center items-center">
            <div
              style={{ textAlign: "center", marginTop: "20px" }}
              className="max-w-[300px]"
            >
              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                Thank you for your purchase!
              </p>
              <p className="font-bold font-quicksand text-[1.4rem]">
                Contact Us
              </p>
              <p className="text-main font-[700] font-quicksand">
                +92315-9166758
              </p>

              <p className="font-quicksand font-semibold text-main">
                Shop No. 22 Abbas Computer Market, Near Gul Haji Plaza,
                University Road Peshawar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
