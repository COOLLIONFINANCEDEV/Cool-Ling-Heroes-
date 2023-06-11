import { PhotoCamera } from "@mui/icons-material";
import {  Button, Typography } from "@mui/material";
import React  from "react";
import ConvertFileInBase64 from "../../Helpers/ConvertFileInBase64";

interface UPLOADEFORM {
  imageSelected: Function;
  defaultImage: string;
  title: string;
  error?: boolean;
}

const UploadForm: React.FC<UPLOADEFORM> = ({
  imageSelected,
  defaultImage,
  title,
  error = false,
}) => {
  const [baseImage, setBaseImage] = React.useState(defaultImage);
  const uploadImg = async (e: any) => {
    if (e.target) {
      const file = e.target.files[0];
      const base64 = await ConvertFileInBase64(file);
      setBaseImage(base64);
      imageSelected(base64);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        rowGap: "5px",
      }}
    >
      <img
        src={baseImage ? baseImage : ""}
        style={{ borderRadius: "20%", width: "25%", margin: "auto" }}
        alt=""
      />
      <Button
        variant="outlined"
        component="label"
        color={error ? "error" : "primary"}
        sx={{ width: "100%", height: "100px", borderRadius: "100px" }}
        startIcon={<PhotoCamera />}
      >
        <Typography textAlign={"center"} component={"span"} fontSize={"0.8rem"}>
          {title} <br /> (Must be a .jpg, .jpeg or .png)
        </Typography>
        <input
          hidden
          accept=".jpg, .jpeg, .png, .pdf,"
          multiple
          type="file"
          onChange={uploadImg}
        />
      </Button>
    </div>
  );
};

export default UploadForm;
