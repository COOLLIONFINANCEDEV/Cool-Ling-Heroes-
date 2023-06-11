import { PhotoCamera } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
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
      if (!validateFileType(file)) {
        alert("Only image, PDF, or document files are allowed.");
        return;
      }
      if (file.size > 1024 * 1024) {
        alert("File size exceeds the limit of 1MB.");
        return;
      }
      const base64 = await ConvertFileInBase64(file);
      setBaseImage(base64);
      imageSelected(base64);
    }
  };

  const validateFileType = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    return allowedTypes.includes(file.type);
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
        style={{ width: "200px", margin: "10px auto" }}
        alt=""
      />
      <Button
        variant="outlined"
        component="label"
        color={error ? "error" : "primary"}
        sx={{ width: "100%", height: "100px", borderRadius: "5px" }}
        startIcon={<PhotoCamera />}
      >
        <Typography textAlign={"center"} component={"span"} fontSize={"0.8rem"}>
          {title} <br /> (Only image, PDF, or document files)
        </Typography>
        <input
          hidden
          accept="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          type="file"
          onChange={uploadImg}
        />
      </Button>
    </div>
  );
};

export default UploadForm;
