import { Modal, Box } from "@mui/material";
import { BaseColor } from "../../config/color";
import LoginComponent from "../Login/Login";

interface ModalProps {
  open: boolean;
  modalClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: BaseColor.blueDarkColor,
  border: "2px solid #000",

  p: 4,
};

const ModalLoginVIew = ({ open, modalClose }: ModalProps) => {
  return (
    <div>
      <Modal open={open} onClose={modalClose}>
        <Box sx={style}>
          <LoginComponent />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLoginVIew;
