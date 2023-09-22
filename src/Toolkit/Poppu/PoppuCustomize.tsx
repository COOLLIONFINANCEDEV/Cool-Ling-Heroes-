import React from "react";
import { useSelector } from "react-redux";
import Poppu from "./Poppu";
import { selectPoppu } from "./PoppuSlice";
import CreateModal from "../../Components/Modal/CreateModal";

const PoppuContext = () => {
  const poppuList = useSelector(selectPoppu);
  return (
    <>
      {poppuList.map((item) => {
        return (
          <CreateModal
            ModalContent={Poppu}
            makeOpen
            noLeave={item.noLeave ? item.noLeave : false}
            contentProps={{
              message: item.message,
              status: item.state,
            }}
          />
        );
      })}
    </>
  );
};

export default PoppuContext;
