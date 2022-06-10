import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useHistoricalData from "./useHistoricalData";
import StyledCircularProgress from "./../components/StyledCircularProgress";
import { makeStyles } from "@material-ui/core";
import SelectButton from "./SelectButton";
import chartDays from "./../helpers/chartDays";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/* const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: "true",
      text: "Coin Chart",
    },
  },
}; */

const useStyles = makeStyles((theme) => ({
  chart: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinChart = ({ id, coin }) => {
  const [historicalData, loading, days, setDays, currency] = useHistoricalData({
    id,
    coin,
  });

  const data = historicalData && {
    labels: historicalData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();
    }),

    datasets: [
      {
        data: historicalData.map((coin) => coin[1]),
        label: `Price ( Past ${days}) Days in ${currency}`,
        borderColor: "#EEBD1D",
      },
    ],
  };

  const classes = useStyles();
  return (
    <div className={classes.chart}>
      {loading ? (
        <StyledCircularProgress size="75%" />
      ) : (
        data && (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days}) Days in ${currency}`,
                    borderColor: "#EEBD1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  selected={day.value === days}
                  onClick={() => setDays(day.value)}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};
export default CoinChart;
