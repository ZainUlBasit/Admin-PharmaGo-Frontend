import React, { useEffect, useState } from "react";
import TableComp from "../../../components/Tables/TableComp";
import { CitiesTableColumns } from "../../../assets/TableColumns/CitiesTableColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../store/Slices/CustomerSlice";
import AddingLightLoader from "../../../components/Loaders/AddingLightLoader";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { DeleteCityApi } from "../../../ApiRequests";
import { SuccessToast } from "../../../utils/ShowToast";
import ChangePasswordModal from "../../../components/Modals/ChangePasswordModal";
import StatsCards from "../../../components/Cards/StatsCards";
import Header from "../../../components/Header/Header";
import { fetchCities } from "../../../store/Slices/CitiesSlice";
import AddCityModal from "../../../components/Modals/AddCityModal";
import EditCityModal from "../../../components/Modals/EditCityModal";

const UserManagement = () => {
  const [CurrentTab, setCurrentTab] = useState("approved");

  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [OpenChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Selected, setSelected] = useState(null);
  const [OpenAddCityModal, setOpenAddCityModal] = useState(false);
  const [OpenEditCityModal, setOpenEditCityModal] = useState(false);
  const CitiesState = useSelector((state) => state.CitiesState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
  }, []);
  return (
    <div className="flex-1">
      <Header
        title={"Cities Management"}
        desc={"Manage and keep track of your cities."}
      >
        <button
          className="bg-main hover:bg-main/80 whitespace-nowrap justify-center font-roboto text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all ease-in-out duration-500"
          onClick={() => {
            setOpenAddCityModal(true);
          }}
        >
          <span className="text-2xl">+</span>
          Add City
        </button>
      </Header>

      {CitiesState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col bg-white my-4">
            <TableComp
              Rows={CitiesState.data}
              Columns={CitiesTableColumns}
              setOpenEditModal={setOpenEditCityModal}
              setSelected={setSelected}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </>
      )}

      {OpenAddCityModal && (
        <AddCityModal open={OpenAddCityModal} setOpen={setOpenAddCityModal} />
      )}

      {OpenEditCityModal && (
        <EditCityModal
          open={OpenEditCityModal}
          setOpen={setOpenEditCityModal}
          city={CitiesState.data.find((dt) => dt._id === Selected._id)}
        />
      )}

      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteCityApi(Selected._id);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchCities());
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

export default UserManagement;
