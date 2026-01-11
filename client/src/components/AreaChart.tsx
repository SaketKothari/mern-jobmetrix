import React from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "../types";

interface AreaChartComponentProps {
  data: ChartData[];
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#befafd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
