import React from "react";
import Plot from "react-plotly.js";

const ScatterPlot = ({ data }) => {
  return (
    <Plot
      data={[
        {
          x: data.x,
          y: data.y,
          type: "scatter",
          mode: "markers",
          marker: { color: "blue" },
        },
      ]}
      layout={{ width: 720, height: 440, title: "Scatter Plot" }}
    />
  );
};

export default ScatterPlot;
