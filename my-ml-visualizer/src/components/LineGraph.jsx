import React from "react";
import Plot from "react-plotly.js";

const LineGraph = ({ data }) => {
  return (
    <Plot
      data={[
        {
          x: data.x,
          y: data.y,
          type: "scatter",
          mode: "lines",
          line: { color: "red" },
        },
      ]}
      layout={{ width: 720, height: 440, title: "Line Graph" }}
    />
  );
};

export default LineGraph;
