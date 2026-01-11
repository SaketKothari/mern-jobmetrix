import React, { useState } from "react";

import BarChart from "../BarChart";
import AreaChart from "../AreaChart";
import Wrapper from "../../assets/wrappers/ChartsContainer";
import { ChartData } from "../../types";

interface ChartsContainerProps {
  data: ChartData[];
}

const ChartsContainer: React.FC<ChartsContainerProps> = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
