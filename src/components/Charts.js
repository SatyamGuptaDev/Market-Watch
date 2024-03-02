import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "transparent", color: "#14ffec" }}>
        <p>{`${payload[0].payload.date} : ${
          payload[0].value.toFixed(8) // Format the value without rounding off
        } ${currency}`}</p>
      </div>
    );
  }
  return null;
};


const ChartBlock = ({ data, currency , type}) => {
  let minValue = Math.min(...data.map((item) => item.value));
  let maxValue = Math.max(...data.map((item) => item.value));
  maxValue += maxValue * 0.0001;
  minValue -= minValue * 0.0002;

  // Calculate equal area for each grid line
  const range = maxValue - minValue;
  const interval = range / 5; // 5 grid lines

  // Round the values to the nearest multiple of interval
  minValue = Math.floor(minValue / interval) * interval;
  maxValue = Math.ceil(maxValue / interval) * interval;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: -50,
          bottom: 0,
        }}
      >
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={1}
          stroke="#14ffec"
          activeDot={{ r: 5 }}
        />
        <CartesianGrid stroke="#5f5f5fd2" strokeWidth={0.5} />
        <Tooltip
          content={<CustomTooltip currency={currency} />}
          cursor={{ stroke: "#484848", strokeWidth: 0 }}
        />
        <YAxis domain={[minValue, maxValue]}  dataKey={type} stroke="#ffffff00" />
        <XAxis dataKey="date" stroke="#ffffff00" />

        <Legend align="center" margin={
          {
            top: 0,
            right: 0,
            left: 0,
            bottom: 10,
          }
        } verticalAlign="top"  iconSize={10} wrapperStyle={{ color: "#14ffec" }}  payload={[{ value: type, type: "line", color: "#14ffec" }]}  />
        
      </LineChart>
    </ResponsiveContainer>
  );
};



const Charts = ({ coinId, currencyUnit }) => {
  const [chartData, setChartData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("7");
  const [coinMarketData, setCoinMarketData] = useState({});
  const [typeOfData, setTypeOfData] = useState("prices");

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencyUnit}&days=${timeFrame}`
        );
        const data = await response.json();
        setCoinMarketData(data);

        const totalPoints = parseInt(timeFrame);
        const stepSize = Math.ceil(data.prices.length / totalPoints);

        const formattedData = coinMarketData[typeOfData]
        .filter((item, index) => index % stepSize === 0)
        .map((item) => ({
          date: new Date(item[0]).toLocaleDateString(),
          value: item[1],
        }));


        setChartData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData();
  }, [coinId, currencyUnit, timeFrame]);

  useEffect(() => {
    if (coinMarketData && coinMarketData[typeOfData]) {
      // Check if coinMarketData and coinMarketData[typeOfData] are defined
      const totalPoints = parseInt(timeFrame);
      const stepSize = Math.ceil(
        coinMarketData[typeOfData].length / totalPoints
      );

      const formattedData = coinMarketData[typeOfData]
        .filter((item, index) => index % stepSize === 0)
        .map((item) => ({
          date: new Date(item[0]).toLocaleDateString(),
          value: item[1],
        }));

      setChartData(formattedData);
    }
  }, [coinMarketData, typeOfData]);

  return (
    <>
      <div className="flex flex-col w-full h-full self-start justify-start items-start">

      <div className=" w-full h-full self-start justify-start items-start ">

          <ChartBlock data={chartData} currency={currencyUnit} type={typeOfData} />
        </div>
        <div className="flex flex-row justify-center gap-2  flex-wrap">
          <button
            onClick={() => setTypeOfData("prices")}
            className={`px-1.5 py-0.5 text-sm rounded-md ${
              typeOfData === "prices"
                ? "text-cyan bg-cyan  bg-opacity-[15%]"
                : "text-gray-100 bg-[#51515138]"
            }`}
          >
            Prices
          </button>
          <button
            onClick={() => setTypeOfData("market_caps")}
            className={`px-1.5 py-0.5 text-sm rounded-md ${
              typeOfData === "market_caps"
                ? "text-cyan bg-cyan  bg-opacity-[15%]"
                : "text-gray-100 bg-[#51515138]"
            }`}
          >
            Market Caps
          </button>
          <button
            onClick={() => setTypeOfData("total_volumes")}
            className={`px-1.5 py-0.5 text-sm rounded-md mr-3  ${
              typeOfData === "total_volumes"
                ? "text-cyan bg-cyan  bg-opacity-[15%]"
                : "text-gray-100 bg-[#51515138]"
            }`}
          >
            Total Volumes
          </button>

          <button
            onClick={() => setTimeFrame("7")}
            className={`px-1.5 py-0.5 text-sm rounded-md ${
              timeFrame === "7"
                ? "text-cyan bg-cyan  bg-opacity-[15%]"
                : "text-gray-100 bg-[#51515138]"
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setTimeFrame("14")}
            className={`px-1.5 py-0.5 text-sm rounded-md ${
              timeFrame === "14"
                ? "text-cyan bg-cyan  bg-opacity-[15%]"
                : "text-gray-100 bg-[#51515138]"
            }`}
          >
            14D
          </button>
          <button
            onClick={() => setTimeFrame("30")}
            className={`px-1.5 py-0.5 text-sm rounded-md ${
              timeFrame === "30"
                ? "text-cyan bg-cyan  bg-opacity-[15%]"
                : "text-gray-100 bg-[#51515138]"
            }`}
          >
            30D
          </button>


        </div>
      </div>
    </>
  );
};

export default Charts;
