import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FormatDate from "../../Helpers/FormatDate";

interface ANNOUCEMENTINFOS {
  information: any;
}
const AnnoucementInfos: React.FC<ANNOUCEMENTINFOS> = ({ information }) => {
  return (
    <Box mt={4}>
      <Typography
        variant="h5"
        fontWeight={500}
        sx={{
          fontSize: "1.5rem",
          width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
          minWidth: { xs: "90vw !important", sm: "50vw !important" },
          p: { xs: "10px", sm: "50px" },
        }}
      >
        View all information about your ad
      </Typography>
      <Paper
        elevation={1}
        sx={{
          width: { xs: "calc(100% - 20px)", sm: "calc(100% - 100px)" },
          p: { xs: "0 10px 10px 10px", sm: "0 50px 50px 50px" },
        }}
      >
        <Typography variant="h5" fontWeight={500} fontSize={"1.1rem"}>
          Announcement details
        </Typography>
        <Divider sx={{ fontWeight: 500 }} />
        <List>
          <Row title="Ad identifier" value={information.id} />
          <Row title="Ad title" value={information.title} />
          <Row
            title="Ad status"
            value={
              <Chip
                label={information.status ? "Active" : "disable"}
                color={information.status ? "success" : "error"}
                variant="outlined"
              />
            }
          />
          <Row
            title="Ad identifier"
            value={
              <Button
                variant="contained"
                color="info"
                component="a" // Use "component" instead of "LinkComponent"
                href={`https://api.investKori.com${information.image}`} // Make sure to use backticks (`) for template literals
                target="_blank"
                rel="noopener noreferrer" // Add rel attribute for security purposes
                sx={{ borderRadius: "5px" }}
              >
                Display image
              </Button>
            }
          />
          <Row title="Created at" value={FormatDate(information.created_at)} />
          <Row title="Updated at" value={FormatDate(information.updated_at)} />
        </List>
      </Paper>
    </Box>
  );
};

interface ROW {
  title: string;
  value: string | ReactNode;
  dark?: boolean;
}
export const Row: React.FC<ROW> = ({ title, value, dark = false }) => {
  return (
    <ListItem sx={{ width: "100%" }}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            fontWeight: dark ? 800 : "inital",
            fontSize: dark ? "1.6rem" : "intial",
          }}
        >
          {title}
        </Typography>
        {typeof value === "string" ? (
          <Typography
            sx={{
              fontWeight: dark ? 800 : "inital",
              fontSize: dark ? "1.6rem" : "intial",
            }}
          >
            {value}
          </Typography>
        ) : (
          value
        )}
      </Stack>
    </ListItem>
  );
};
export default AnnoucementInfos;
