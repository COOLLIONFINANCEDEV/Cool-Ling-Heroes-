import React from "react";
import { Button, Stack, SvgIcon, Typography } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/solid";
import { OVERVIEWCONTEXT, OverViewContext } from "../Context/OverViewContext";

interface BLOCKTITLE {
  title: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonContent?: string;
  disabled: boolean;
}

const BlocTitle: React.FC<BLOCKTITLE> = ({
  title,
  handleClick,
  buttonContent,
  disabled = false,
}) => {
  return (
    <OverViewContext.Consumer>
      {(ContextValue: OVERVIEWCONTEXT | undefined) => (
        <Stack spacing={3} mb={4}>
          <Stack
            spacing={4}
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h4">{title}</Typography>
            </Stack>
            <div>
              {!disabled && (
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleClick}
                  disabled={ContextValue ? ContextValue.state : false}
                >
                  {buttonContent}
                </Button>
              )}
            </div>
          </Stack>
        </Stack>
      )}
    </OverViewContext.Consumer>
  );
};

export default BlocTitle;
