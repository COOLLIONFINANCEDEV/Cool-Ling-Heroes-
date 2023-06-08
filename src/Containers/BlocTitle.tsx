import React from "react";
import { Button, Stack, SvgIcon, Typography } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/solid";

interface BLOCKTITLE {
  title: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonContent: string;
}

const BlocTitle: React.FC<BLOCKTITLE> = ({ title, handleClick,buttonContent }) => {
  return (
    <Stack spacing={3} mb={4}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h4">{title}</Typography>
        </Stack>
        <div>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={handleClick}
          >
            {buttonContent}
          </Button>
        </div>
      </Stack>
    </Stack>
  );
};

export default BlocTitle;
