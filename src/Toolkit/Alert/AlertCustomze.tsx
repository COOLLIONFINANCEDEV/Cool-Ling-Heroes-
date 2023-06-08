import { Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALERTINITIALSTATE, deleteAlert, selectAlert } from "./AlertSlice";

const AlertCustomize = () => {
  const alertStyle = {
    width: { xs: "80%", md: "60%" },
    margin: "2.5vh",
    position: "fixed",
    right: "0",
    zIndex: "200",
  };

  const alertItems: ALERTINITIALSTATE = useSelector(selectAlert);

  React.useEffect(() => {
    if (alertItems.length > 0) {
      const interval = setInterval(() => {
        const lastItem = alertItems[alertItems.length - 1];
        if (lastItem.key) {
          dispatch(deleteAlert({ key: lastItem.key }));
        }
      }, 5000);

      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertItems]);

  const dispatch = useDispatch();

  return <>
   {
    alertItems.map((item) => {
      return (
        <Alert
          severity={item.state}
          sx={alertStyle}
          onClose={() => {
            if(item.key){
              dispatch(deleteAlert({ key: item.key }));
            }
          }}
          key={item.key}
        >
          {item.message}
        </Alert>
      );
    })
   }
  </>
};

export default AlertCustomize;
