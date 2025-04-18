import { Box, Modal, styled } from "@mui/material";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalWindow = ({
  open,
  close,
  children,
}: {
  open: boolean;
  close: any;
  children: React.ReactNode;
}) => {
  return (
    <>
      <SytledModal
        open={open}
        onClose={() => close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" mx-2 "
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          sx={{
            outline: "none",
            minWidth: { sm: 400 },
          }}
        >
          {children}
        </Box>
      </SytledModal>
    </>
  );
};

export default ModalWindow;
