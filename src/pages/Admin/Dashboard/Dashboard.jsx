import React, { useEffect } from "react";
import DashboardCard from "../../../components/Cards/DashboardCard";
import TableComp from "../../../components/Tables/TableComp";
import { DashboardTableColumns } from "../../../assets/TableColumns/DashboardTableColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardData } from "../../../store/Slices/CardSlice";
import { fetchTopTenProduct } from "../../../store/Slices/TopTenProductSlice";
import AddingLightLoader from "../../../components/Loaders/AddingLightLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const CardState = useSelector((state) => state.CardState);
  const TopTenProductState = useSelector((state) => state.TopTenProductState);

  useEffect(() => {
    dispatch(fetchCardData());
    dispatch(fetchTopTenProduct());
  }, []);
  useEffect(() => {
    console.log(TopTenProductState.data);
  }, [TopTenProductState]);

  return (
    <div className="flex-1 ">
      <div className="flex w-full justify-between items-center">
        <div className="text-2xl font-semibold">Dashboard </div>
        {/* <div className="flex gap-4">
          <button className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500">
            <span className="text-2xl">+</span>
            Add Category
          </button>
          <button className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500">
            <span className="text-2xl">+</span>
            Add Sub Category
          </button>
          <button className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500">
            <span className="text-2xl">+</span>
            Add Product
          </button>
        </div> */}
      </div>
      <div className="w-full grid grid-cols-3 gap-4 mt-8 max1240:grid-cols-1">
        <DashboardCard
          title="Total Sales"
          amount={`Rs ${CardState.data.totalSale}`}
        />
        <DashboardCard
          title="Total Revenue"
          amount={`Rs ${CardState.data.totalRevenue}`}
        />
        <DashboardCard
          title="Total Order"
          amount={`${CardState.data.allOrder}`}
        />
      </div>
      <div className="w-full flex flex-col bg-white my-4">
        <div className="px-4 py-3 font-roboto text-xl font-semibold">
          Top 5 Products by Units Sold
        </div>
        {TopTenProductState.loading ? (
          <div className="w-full flex justify-center items-center py-20">
            <AddingLightLoader />
          </div>
        ) : (
          <TableComp
            Rows={TopTenProductState.data}
            Columns={DashboardTableColumns}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
