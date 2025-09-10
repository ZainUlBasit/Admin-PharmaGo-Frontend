import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import CustomPagination from "../TablePagination/TablePagination";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AcceptRequestApi,
  DeclineRequestApi,
  UpdateOrderStatusApi,
  UpdateProductStatusApi,
} from "../../ApiRequests";
import { SuccessToast, ErrorToast } from "../../utils/ShowToast";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { fetchOrders } from "../../store/Slices/OrderSlice";
import { TbPasswordUser } from "react-icons/tb";
import { fetchProducts } from "../../store/Slices/ProductSlice";

const cRole = Number(localStorage.getItem("role")) || 0;

const TableComp = ({
  Rows,
  Columns,
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenChangePasswordModal,
  setSelected,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const [anchorElStatusProduct, setAnchorElStatusProduct] = useState(null);
  const [currentRowId, setCurrentRowId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const handleClickStatusProduct = (event, rowId) => {
    setAnchorElStatusProduct(event.currentTarget);
    setCurrentRowId(rowId);
  };

  const handleClickStatus = (event, rowId) => {
    setAnchorElStatus(event.currentTarget);
    setCurrentRowId(rowId);
  };

  const handleCloseStatusProduct = () => {
    setAnchorElStatusProduct(null);
    setCurrentRowId(null);
  };

  const handleCloseStatus = () => {
    setAnchorElStatus(null);
    setCurrentRowId(null);
  };

  const statusToText = (status) => {
    switch (status) {
      case 1:
        return "In Stock";
      case 2:
        return "Low Stock";
      case 3:
        return "Out of Stock";
      default:
        return "";
    }
  };

  const orderStatusToText = (status) => {
    switch (status) {
      case 1:
        return "Pending";
      case 2:
        return "Placed";
      case 3:
        return "Approved";
      case 4:
        return "Shipped";
      case 5:
        return "Delivered";
      case 6:
        return "Cancelled";
      default:
        return "";
    }
  };

  const renderCellContent = (Data, column) => {
    if (column.id === "cat_id") {
      return <div>{Data?.cat_id?.name}</div>;
    } else if (column.id === "image" && column.type === "dashboard") {
      return (
        <div>
          <img src={Data.image} alt="" className="w-16 h-16 rounded-full" />
        </div>
      );
    } else if (column.id === "order_date") {
      return moment(Data.order_date * 1000).format("DD/MM/YYYY");
    } else if (column.id === "change_password") {
      return (
        <div className="flex items-center justify-center gap-x-2">
          <TbPasswordUser
            className="hover:text-[green] transition-all ease-in-out duration-500 text-2xl cursor-pointer"
            onClick={() => {
              setOpenChangePasswordModal(true);
              setSelected(Data);
            }}
          />
        </div>
      );
    } else if (column.id === "signed_up_at") {
      return moment(Data.signed_up_at * 1000).format("DD/MM/YYYY");
    } else if (column.id === "delivery_date") {
      return moment(Data.delivery_date * 1000).format("DD/MM/YYYY");
    } else if (column.id === "name") {
      return column.type === "product" ? (
        <div className="flex items-center gap-x-2">
          <img src={Data.images[0]} alt="" className="w-16 h-16 rounded-full" />
          <div className="font-medium">{Data.name}</div>
        </div>
      ) : column.type === "user" ? (
        <div className="flex flex-col items-start gap-x-2 flex-1">
          <div className="font-medium">{Data.name}</div>
          <div className="text-sm text-gray-500">@{Data.shopName}</div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <div className="font-medium">{Data.name}</div>
        </div>
      );
    } else if (column.id === "customer") {
      return <div>{Data?.customer?.name}</div>;
    } else if (column.id === "order") {
      return (
        <div className="flex items-center gap-x-2">
          <div>{Data._id}</div>
        </div>
      );
    } else if (column.id === "catId") {
      return <div>{Data?.catId?.name}</div>;
    } else if (column.id === "actions") {
      return (
        <div className="flex items-center gap-x-2">
          <BiEdit
            className="text-lg cursor-pointer hover:text-green-500"
            onClick={() => {
              setOpenEditModal(true);
              setSelected(Data);
            }}
          />
          <RiDeleteBin5Line
            className="text-lg cursor-pointer hover:text-red-500"
            onClick={() => {
              setOpenDeleteModal(true);
              setSelected(Data);
            }}
          />
        </div>
      );
    } else if (column.id === "user_actions") {
      return (
        <div className="flex items-center gap-x-2">
          <button
            className="bg-transparent px-3 rounded-full py-1 text-[1rem] border-[2px] border-[green] text-[green] hover:bg-[green] hover:text-white transition-all ease-in-out duration-500"
            onClick={async () => {
              try {
                const response = await AcceptRequestApi(Data._id);
                if (response.data.success) {
                  SuccessToast(response.data.data.msg);
                  console.log(response.data);
                  navigate("/admin/users");
                } else {
                  ErrorToast(response.data.error.msg);
                }
              } catch (err) {
                ErrorToast(err?.response?.data?.message);
                console.log("err", err);
              }
            }}
          >
            Accept
          </button>
          <button
            className="bg-transparent px-3 rounded-full py-1 text-[1rem] border-[2px] border-[red] text-[red] hover:bg-[red] hover:text-white transition-all ease-in-out duration-500"
            onClick={async () => {
              try {
                const response = await DeclineRequestApi(Data._id);
                if (response.data.success) {
                  SuccessToast(response.data.data.msg);
                  console.log(response.data);
                  navigate("/admin/users");
                } else {
                  ErrorToast(response.data.error.msg);
                }
              } catch (err) {
                ErrorToast(err?.response?.data?.message);
                console.log("err", err);
              }
            }}
          >
            Decline
          </button>
        </div>
      );
    } else if (column.id === "delete") {
      return (
        <RiDeleteBin5Line
          className="text-lg cursor-pointer hover:text-red-500"
          onClick={() => {
            setOpenDeleteModal(true);
            setSelected(Data);
          }}
        />
      );
    } else if (column.id === "view") {
      return (
        <FaEye
          className="text-lg cursor-pointer hover:text-blue-500"
          onClick={() => {
            if (column.type === "user") navigate(`/admin/user/${Data._id}`);
            else
              navigate(
                cRole === 1 ? `/admin/order/${Data._id}` : `/order/${Data._id}`
              );
          }}
        />
      );
    } else if (column.id === "status") {
      if (column.type && column.type === "product")
        return (
          <>
            <Typography
              onClick={(event) => handleClickStatusProduct(event, Data._id)}
              className={`cursor-pointer border-[1px] border-main text-center py-1 rounded-full text-white ${
                Data.status === 1
                  ? "bg-[#28A745]"
                  : Data.status === 2 && "bg-red-600"
              }`}
            >
              {statusToText(Data.status)}
            </Typography>
            {cRole === 1 && (
              <Popover
                open={
                  Boolean(anchorElStatusProduct) && currentRowId === Data._id
                }
                anchorEl={anchorElStatusProduct}
                onClose={handleCloseStatusProduct}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    borderRadius: "25px",
                    backgroundColor: "#465462",
                    width: "150px",
                    overflow: "hidden",
                  },
                }}
              >
                <div className="p-4 flex flex-col gap-y-1">
                  {["In Stock", "Low Stock"].map((status, index) => (
                    <div
                      key={index}
                      className="flex gap-x-3 items-center cursor-pointer text-white"
                      onClick={async () => {
                        try {
                          const response = await UpdateProductStatusApi(
                            Data._id,
                            {
                              status: index + 1,
                            }
                          );
                          if (response.data.success) {
                            SuccessToast(response.data.data.msg);
                            dispatch(fetchProducts());
                          } else {
                            ErrorToast(response.data.error.msg);
                          }
                        } catch (err) {
                          ErrorToast(err?.response?.data?.message);
                        }
                        handleCloseStatusProduct();
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={index + 1 === Data.status}
                      />
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              </Popover>
            )}
          </>
        );
      else
        return (
          <>
            <Typography
              onClick={(event) => handleClickStatus(event, Data._id)}
              className={`cursor-pointer border-[1px] border-main text-center py-1 rounded-full text-white ${
                Data.status === 1
                  ? "bg-[#007BFF]"
                  : Data.status === 2
                  ? "bg-[#FFA500]"
                  : Data.status === 3
                  ? "bg-[#800080]"
                  : Data.status === 4
                  ? "bg-[#28A745]"
                  : Data.status === 5
                  ? "bg-[#006400]"
                  : Data.status === 6 && "bg-red-600"
              }`}
            >
              {orderStatusToText(Data.status)}
            </Typography>

            {cRole === 1 && (
              <Popover
                open={Boolean(anchorElStatus) && currentRowId === Data._id}
                anchorEl={anchorElStatus}
                onClose={handleCloseStatus}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    borderRadius: "25px",
                    backgroundColor: "#465462",
                    width: "150px",
                    overflow: "hidden",
                  },
                }}
              >
                <div className="p-4 flex flex-col gap-y-1">
                  {[
                    "Pending",
                    "Placed",
                    "Approved",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status, index) => (
                    <div
                      key={index}
                      className="flex gap-x-3 items-center cursor-pointer text-white"
                      onClick={async () => {
                        try {
                          const response = await UpdateOrderStatusApi(
                            Data._id,
                            {
                              status: index + 1,
                            }
                          );
                          if (response.data.success) {
                            SuccessToast(response.data.data.msg);
                            dispatch(fetchOrders());
                          } else {
                            ErrorToast(response.data.error.msg);
                          }
                        } catch (err) {
                          ErrorToast(err?.response?.data?.message);
                        }
                        handleCloseStatus();
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={index + 1 === Data.status}
                      />
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              </Popover>
            )}
          </>
        );
    } else {
      return Data[column.id];
    }
  };

  return (
    <div className="border-2 border-main rounded-t-lg">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align || "left"}
                  sx={{ backgroundColor: "#465462", color: "white" }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Rows.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((Data, index) => (
              <TableRow key={Data._id}>
                {Columns.map((column, i) => (
                  <TableCell key={i} align={column.align || "left"}>
                    {renderCellContent(Data, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={Rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        RowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableComp;
