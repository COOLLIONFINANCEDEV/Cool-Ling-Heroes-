import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import Redirect from "../../Helpers/Redirect";

interface SIDENAVITEM {
  icon: ReactNode;
  path: string;
  title: string;
}

export const SideNavItem: React.FC<SIDENAVITEM> = ({ icon, path, title }) => {
  const { palette } = useTheme();

  return (
    <li>
      <Redirect link={path}>
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(window.location.pathname === path && {
              backgroundColor: palette.secondary.main,
            }),
            "&:hover": {
              backgroundColor: palette.secondary.main,
            },
          }}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                color: palette.primary.main,
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            <Typography
              component="span"
              sx={{
                color: "neutral.400",
                flexGrow: 1,
                fontSize: 13,
                fontWeight: 600,
                lineHeight: "24px",
                whiteSpace: "nowrap",
                ...(window.location.pathname === path && {
                  color: palette.primary.main,
                }),
              }}
            >
              {title}
            </Typography>
          </Box>
        </ButtonBase>
      </Redirect>
    </li>
  );
};
