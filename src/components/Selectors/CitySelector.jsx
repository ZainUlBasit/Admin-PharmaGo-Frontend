import React, { useState, useEffect } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPopover from "../Inputs/AnimatedPopover";
import { fetchCities } from "../../store/Slices/CitiesSlice";

const CitySelector = ({ SelectedCity, setSelectedCity }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("Closing popover...");
    setAnchorEl(null); // ✅ Ensures popover closes
  };
  const open = Boolean(anchorEl);
  const id = open ? "my-popover" : undefined;

  const CitiesState = useSelector((state) => state.CitiesState);
  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  return (
    <div className="flex flex-col px-0 gap-y-4">
      <AnimatedPopover
        placeholder={"City"}
        id={"City"}
        onClick={handleClick}
        Value={SelectedCity}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "25px", // Add rounded corners
            backgroundColor: "white", // Set background color to white
            width: "100%", // Set the width as needed
            maxWidth: "300px",
            overflow: "hidden", // Hide overflowing content
            marginTop: "10px",
            boxShadow: "none",
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
            pt: 2,
            pl: 4,
            pr: 5,
            pb: 5,
            borderColor: "#465462",
            backgroundColor: "#465462",
            // width: "400px",
            overflow: "hidden",
            borderRadius: "20px",
          }}
        >
          <div className="bg-[#465462] text-white font-quicksand  flex flex-col justify-center items-center rounded-[50px]">
            <div className="w-full flex flex-col justify-between gap-y-3 items-start">
              {CitiesState.data &&
                CitiesState.data.map((tab, i) => {
                  return (
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => {
                        setSelectedCity(tab);
                        handleClose();
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={tab.name === SelectedCity.name}
                      />
                      <span>{tab.name}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
};

export default CitySelector;
