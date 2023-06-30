import { Stack } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ApiSession from "../../Service/ApiSession";

const Annoucement = () => {
  const [data, setData] = React.useState([]);
  const [carouselItems, setCarouselItems] = React.useState<any>([]);
  const GetData = React.useCallback(async () => {
    const response = await ApiSession.annoucement.list();
    if (!response.error) setData(response.data);
  }, []);
  React.useEffect(() => {
    GetData();
  }, [GetData]);

  React.useEffect(() => {
    if (data.length >= 1) {
      const items: any = [];
      data.forEach((item: { status: boolean }) => {
        if (item.status === true) items.push(item);
      });
      setCarouselItems(items);
    }
  }, [data]);
  return (
    <>
      {carouselItems.length >= 1 && (
        <Carousel
          sx={{
            width: "calc(100% -20px)",
            padding: "10px",
            minHeight: "400px",
          }}
          swipe
          indicators
          interval={5000}
          duration={1000}
        >
          {carouselItems.map(
            (item: {
              image: string;
              status: boolean;
              title: string;
              id: number;
            }) => {
              // eslint-disable-next-line array-callback-return
              return (
                <Stack key={item.id}>
                  <img
                    src={`https://api.investKori.com${item.image}`}
                    alt={item.title}
                    crossOrigin="anonymous"
                  />
                </Stack>
              );
            }
          )}
        </Carousel>
      )}
    </>
  );
};

export default Annoucement;
