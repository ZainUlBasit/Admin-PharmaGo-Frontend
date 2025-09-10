import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function ModalWrapper({ open, setOpen, children }) {
  const [pageWidth, setPageWidth] = React.useState(window.innerWidth);

  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth); // Update state on resize
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: pageWidth < 390 ? "90%" : "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "0px solid #fff !important",
    borderRadius: 2,
    outline: "none",
    overflow: "hidden",
    height: "auto",
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col p-4 px-6 !text-[#0e2480]">
              {/* Use the page width anywhere in the component */}
              {/* <div>Page Width: {pageWidth}px</div> */}
              {children}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
