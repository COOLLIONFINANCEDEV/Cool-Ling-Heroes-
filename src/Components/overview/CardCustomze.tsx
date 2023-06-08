import {
  Avatar,
  Card,
  CardContent,
  Skeleton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { OverViewContext } from "../../Pages/OverView";

export interface CARD {
  title: string;
  value: string;
  Icon: any;
  color: string;
}

const CardCustomze: React.FC<CARD> = ({ title, value, Icon, color }) => {
  const OverViewContextValue = useContext(OverViewContext);
  const state = OverViewContextValue ? OverViewContextValue.state : false;
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "70%" }}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          height={"100%"}
        >
          <Stack
            spacing={1}
            justifyContent={"space-between"}
            sx={{ height: "100%" }}
          >
            {!state ? (
              <>
                <Typography
                  color="text.secondary"
                  variant="overline"
                  textTransform={"capitalize"}
                >
                  {title}
                </Typography>
                <Typography variant="h4">{value}</Typography>
              </>
            ) : (
              <>
                <Skeleton variant="rounded" width={"90px"} height={'100px'}/>
                <Skeleton variant="rectangular" width={"90px"} height={'30px'}/>
              </>
            )}
          </Stack>
          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>{Icon}</SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardCustomze;
