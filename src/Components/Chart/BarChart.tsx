import React from "react";
import "./BarChart.css";
import { Box, Paper, Typography } from "@mui/material";
import { SimulatorItem } from "../../Containers/Simulator";
import FormatMoney from "../../Helpers/FormatMoney";

interface BARCHART {
  amount: number;
  rule: SimulatorItem;
  month: number;
}

const BarChart: React.FC<BARCHART> = ({ amount, rule, month }) => {
  const interetPerMonth = rule.interet / 12;
  const SelectInteret = interetPerMonth * month;
  const amountWithPercentage = amount + amount * (SelectInteret / 100);
  return (
    <Paper elevation={3} className="chart_wrapper__K6wh8">
      <Typography className="chart_title__ZlbWg" fontWeight={800}>
        Your return
      </Typography>
      <Box>
        <Box className="graph_lines_wrapper____Yuk">
          <Box className="graph_right_labels__6OJ02">
            <Box className="graph_graph_amount_label__ME8m4">
              <Typography>
                ${FormatMoney(Math.floor(amountWithPercentage + 2000))}
              </Typography>
            </Box>
            <Box className="graph_graph_amount_label__ME8m4">
              <Typography>
                ${FormatMoney(Math.floor(amountWithPercentage + 1000))}
              </Typography>
            </Box>
            <Box className="graph_graph_amount_label__ME8m4">
              <Typography>
                ${FormatMoney(Math.floor(amountWithPercentage))}
              </Typography>
            </Box>
            <Box className="graph_graph_amount_label__ME8m4">
              <Typography>$0</Typography>
            </Box>
          </Box>
          <Box className="graph_graph_lines__AC5Nb">
            <Box className="graph_line__hMapg"></Box>
            <Box className="graph_line__hMapg"></Box>
            <Box className="graph_line__hMapg"></Box>
            <Box className="graph_line__hMapg"></Box>
          </Box>
        </Box>
        <Box className="graph_charts__h5TYh">
          <Box>
            <Box className="graph_aboveChart_label__Vc6Hh">
              <Typography fontWeight={500}>${FormatMoney(amount)}</Typography>
            </Box>
            <Box className="graph_chartItem__es2xi"></Box>
            <Box className="graph_underChart_label__o1OrX">
              <Typography fontWeight={600}>Today</Typography>
            </Box>
          </Box>
          <Box>
            <Box
              className="graph_calculatedEarnings__Vfh4r"
              style={{ marginLeft: "100px", marginTop: "-180px" }}
            >
              <Typography color={"secondary"}>
                {" "}
                +${FormatMoney(amountWithPercentage - amount)}
              </Typography>
            </Box>
            <Box
              className="graph_aboveChart_label_second__RAiHm"
              style={{ marginTop: "-130px" }}
            >
              <Typography fontWeight={500}>
                {" "}
                ${FormatMoney(amountWithPercentage)}
              </Typography>
            </Box>
            <Box
              className="graph_chartItem_total__AoFas"
              style={{ height: "30px", marginTop: "-110px" }}
            ></Box>
            <Box className="graph_chartItemSecond__rHPgB"></Box>
            <Box className="graph_underChart_label_months__0yCzN">
              <Typography fontWeight={600}> {month} Months</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BarChart;
