import React from "react";
import Plot from "react-plotly.js";

const ViolinPlot = ({ data }) => {
  return (
    <Plot
      data={[
        {
          y: data.y,
          type: "violin",
          box: {
            visible: true,
          },
          meanline: {
            visible: true,
          },
          marker: { color: "violet" },
        },
      ]}
      layout={{ width: 720, height: 440, title: "Violin Plot" }}
    />
  );
};

export default ViolinPlot;
