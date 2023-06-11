import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadButton from "../Form/UploadButton";
import PaymentsInformation from "./PaymentsInformation";

interface PAYMENTS {
  handleImage: Function;
  defaultImage: string;
}

const Payments: React.FC<PAYMENTS> = ({ handleImage, defaultImage }) => {
  const [choice, setChoice] = React.useState<number>(1);
  const [steps, setSteps] = React.useState({ state: 1 });
  const [file, setFile] = React.useState(defaultImage);
  const { palette } = useTheme();

  const ChooseData: Array<{
    id: number;
    img: string;
    title: string;
    content: string;
  }> = [
    {
      id: 1,
      img: "Assets/Illustrations/Show.svg",
      title: "See the different payment methods",
      content:
        "The Options allow you to view the different payment methods so you can pay.",
    },
    {
      id: 2,
      img: "Assets/Illustrations/Upload.svg",
      title: "Upload a Payment Record",
      content:
        "this option allows you to upload the payment receipt to activate your investment.",
    },
  ];


  return (
    <Stack
      sx={{ padding: "10px 10px", minWidth: { xs: "70vw", md: "40vw" } }}
      alignItems="center"
      justifyContent={"space-between"}
    >
      {steps.state === 2 && (
        <Stack
          justifyContent={"flex-end"}
          direction={"row"}
          alignItems={"flex-end"}
          sx={{ width: "100%" }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            size="small"
            onClick={() => setSteps({ state: 1 })}
          >
            Process modification
          </Button>
        </Stack>
      )}
      <Alert severity="info" sx={{ m: 1 }}>
        <List>
          <ListItem>
            Explore our platform's various payment methods: You can discover the
            different payment methods available on our platform. Choose the one
            that suits you best to make your investment.
          </ListItem>
          <ListItem>
            Upload your payment receipt: If you have already made a payment
            using one of our supported methods, you can upload the receipt here.
            This will ensure that your investment is accurately recorded and
            processed.
          </ListItem>
        </List>
      </Alert>
      {steps.state === 1 && (
        <>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Stack
              direction={{ sm: "row" }}
              rowGap={5}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%", m: "5px 0px" }}
            >
              {ChooseData.map((item) => (
                <Card
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    cursor: "pointer",
                    border: "5px solid white",
                    borderColor:
                      item.id === choice ? palette.primary.main : "white",

                    transition: "all 0.4s",
                  }}
                  onClick={() => setChoice(item.id)}
                  key={item.id}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor:
                            item.id === choice
                              ? palette.primary.main
                              : palette.secondary.main,
                        }}
                        aria-label="recipe"
                      >
                        {item.id}
                      </Avatar>
                    }
                  />
                  <CardMedia
                    sx={{ height: 150, width: 150, margin: "auto" }}
                    image={item.img}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign={"center"}
                    >
                      {item.content}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "30px" }}
              disabled={!choice}
              onClick={() => setSteps({ state: 2 })}
            >
              I have made my choice
            </Button>
          </Stack>
        </>
      )}
      {steps.state === 2 && (
        <>
          <Box>
            {choice === 2 ? (
              <UploadButton
                imageSelected={(
                  file: React.SetStateAction<string>
                ) => {
                  if (file) {
                    setFile(file);
                  }
                  handleImage(file);
                }}
                defaultImage={file}
                title="Upload a Payment Record"
              />
            ) : (
              <Box sx={{ width: "calc(90vw)", minHeight: "50vh" }}>
                <PaymentsInformation />
              </Box>
            )}
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Payments;
