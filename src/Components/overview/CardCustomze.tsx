import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export interface CARD {
  title: string;
  value: string;
  Icon: any;
  color: string;
}

const CardCustomze: React.FC<CARD> = ({ title, value, Icon, color }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1} justifyContent={'space-between'} sx={{height:'100%'}}>
            <Typography
              color="text.secondary"
              variant="overline"
              textTransform={"capitalize"}
            >
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
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
