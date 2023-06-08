import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface SIDENAVITEM {
  active: boolean;
  disabled: boolean | undefined;
  external: boolean | undefined;
  icon: ReactNode;
  path: string;
  title: string;
}

export const SideNavItem: React.FC<SIDENAVITEM> = ({
  active = false,
  disabled,
  external,
  icon,
  path,
  title,
}) => {
  const { palette } = useTheme();

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: "a",
          href: path,
        }
    : {};

  return (
    <li>
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
          ...(active && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              color: palette.info.main,
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
              ...(active && {
                color: "common.white",
              }),
              ...(disabled && {
                color: "neutral.500",
              }),
            }}
          >
            {title}
          </Typography>
        </Box>
      </ButtonBase>
    </li>
  );
};
