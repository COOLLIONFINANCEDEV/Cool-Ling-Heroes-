import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectLogin } from "../Toolkit/Login/LoginSlice";
import React from "react";
import { PhotoCamera } from "@mui/icons-material";

const AccountProfile = () => {
  const { user } = useSelector(selectLogin);
  React.useEffect(() => {
    console.log(user)
  },[user])
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography color="text.secondary" variant="body2">
          {user.firstName?.length > 2 ? user.firstName + " " + user.lastName : user.email}
          </Typography>
       
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
      <Button
        variant="outlined"
        component="label"
        sx={{ width: "100%" }}
        startIcon={<PhotoCamera />}
      >
        <Typography textAlign={"center"} component={"span"} fontSize={"0.8rem"}>
            Upload picture
        </Typography>
        <input
          hidden
          accept=".jpg, .jpeg, .png, .pdf,"
          multiple
          type="file"
        />
      </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
