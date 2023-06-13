import { PhotoCamera } from "@mui/icons-material";
import { Button, Chip, Typography } from "@mui/material";
import React from "react";
import ConvertFileInBase64 from "../../Helpers/ConvertFileInBase64";

interface UPLOADEFORM {
  imageSelected: Function;
  defaultImage?: string;
  title: string;
  error?: boolean;
  buttonMode?: boolean;
  disabled?: boolean;
}

const UploadForm: React.FC<UPLOADEFORM> = ({
  imageSelected,
  defaultImage,
  title,
  error = false,
  buttonMode = false,
  disabled = false,
}) => {
  const [fileName, setFileName] = React.useState("");
  const uploadImg = async (e: any) => {
    if (e.target) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (!validateFileType(file)) {
        alert("Only image, PDF, or document files are allowed.");
        return;
      }
      if (file.size > 1024 * 1024) {
        alert("File size exceeds the limit of 1MB.");
        return;
      }
      const base64 = await ConvertFileInBase64(file);
      imageSelected(base64);
    }
  };

  const validateFileType = (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
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
      {fileName && (
        <Chip
          color="info"
          label={fileName}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      )}
      <Button
        variant="outlined"
        component="label"
        color={error ? "error" : "primary"}
        sx={{
          width: "100%",
          height: buttonMode ? "initial" : "100px",
          borderRadius: "5px",
        }}
        startIcon={<PhotoCamera />}
        disabled={disabled}
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
