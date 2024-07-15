import React from "react";
import Plot from "react-plotly.js";

const Histogram = ({ data }) => {
  return (
    <Plot
      data={[
        {
          x: data.x,
          type: "histogram",
          marker: { color: "green" },
        },
      ]}
      layout={{ width: 720, height: 440, title: "Histogram" }}
    />
  );
};

export default Histogram;
