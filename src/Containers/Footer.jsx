import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Redirect from "../Helpers/Redirect";
import { menuList } from "./NavBar";
import routes from "../Router/routes";

const ContactList = [
  { name: "+225 0708064848", link: routes.tel },
  { name: "team@coollionfi.com", link: routes.email },
  { name: "WhatsApp", link: routes.contact },
];

const Footer = () => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: palette.primary.main,
          display: "flex",
          flexWrap: "wrap",

          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "10vh 0 0 0",
          rowGap: "50px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",

            alignItems: "flex-start",
            flexDirection: "row",
            rowGap: "30px",
            columnGap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              flexWrap: "wrap",

              flexDirection: "column",
            }}
          >
            <FooterBlock Title={"CONTACT US"} Items={ContactList} target />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              flexWrap: "wrap",

              flexDirection: "column",
            }}
          >
            <FooterBlock Title={"PAGES"} Items={menuList} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              flexWrap: "wrap",

              flexDirection: "column",
            }}
          >
            <Typography variant="h6" fontWeight={800} color={"secondary"}>
              A New Approach
            </Typography>
            <Typography color="secondary">
              Invest in real estate and make your money grow
            </Typography>
            <Redirect link={routes.simulator}>
              <Button
                fontSize="large"
                color="secondary"
                variant="contained"
                sx={{ borderRadius: "5px", width: "100%" }}
              >
                START INVESTING
              </Button>
            </Redirect>
          </Box>
        </Box>

        <Box sx={{ width: "90%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                columnGap: { xs: "auto", sm: "10px" },
                rowGrap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h6" fontWeight={800} color={"secondary"}>
                Follow Us
              </Typography>
              <IconButton size="medium" color="secondary" variant="contained">
                <FacebookTwoToneIcon fontSize="medium" />
              </IconButton>
              <IconButton size="medium" color="secondary" variant="contained">
                <InstagramIcon fontSize="medium" />
              </IconButton>
              <IconButton size="medium" color="secondary" variant="contained">
                <LinkedInIcon fontSize="medium" />
              </IconButton>
              <IconButton size="medium" color="secondary" variant="contained">
                <TwitterIcon fontSize="medium" />
              </IconButton>{" "}
              <IconButton size="medium" color="secondary" variant="contained">
                <YouTubeIcon fontSize="medium" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "10px",
              }}
            ></Box>
          </Box>
          <Divider color={palette.secondary.main} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "0.7rem", margin: "10px 0 10px 0" }} color={'secondary'}>
              © 2023- 2022 Kori ®.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const FooterItems = ({ Items ,target}) => {
  return (
    <>
      {Items.map((item, key) => {
        return (
          <Redirect
            link={item.link}
            key={key}
            target={[routes.contact, routes.videoChat].includes(item.link) || target}
          >
            <Typography
              sx={{
                "&:hover": { textDecoration: "underline" },
                textTransform: "capitalize",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
              color={"secondary"}
            >
              {item.name}
            </Typography>
          </Redirect>
        );
      })}
    </>
  );
};

const FooterBlock = ({ Title, Items, target = false }) => {
  return (
    <>
      <Typography variant="h6" fontWeight={800} color={"secondary"}>
        {Title}
      </Typography>
      <FooterItems Items={Items} target={target} />
    </>
  );
};

export default Footer;
