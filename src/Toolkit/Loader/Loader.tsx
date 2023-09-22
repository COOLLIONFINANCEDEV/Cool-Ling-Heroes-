import { Backdrop, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { LOADERSLICEITEM, selectLoader } from "./LoaderSlice";
import "./loader.css";

const Loader = () => {
  const LoaderList = useSelector(selectLoader);

  return (
    <>
      {LoaderList.map((items: LOADERSLICEITEM) => {
        return (
          <Backdrop sx={{ color: "#fff", zIndex: 200 }} open key={items.key}>
            <Stack
              sx={{ height: "100vh", width: "100vw" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <div className="wrapper flex-center">
                <div className="container">
                  <div className="container-dot dot-a">
                    <div className="dot"></div>
                  </div>

                  <div className="container-dot dot-b">
                    <div className="dot"></div>
                  </div>
                  <div className="container-dot dot-c">
                    <div className="dot"></div>
                  </div>

                  <div className="container-dot dot-d">
                    <div className="dot"></div>
                  </div>

                  <div className="container-dot dot-e">
                    <div className="dot"></div>
                  </div>

                  <div className="container-dot dot-f">
                    <div className="dot"></div>
                  </div>
                  <div className="container-dot dot-g">
                    <div className="dot"></div>
                  </div>

                  <div className="container-dot dot-h">
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </Stack>
          </Backdrop>
        );
      })}
    </>
  );
};

export default Loader;
