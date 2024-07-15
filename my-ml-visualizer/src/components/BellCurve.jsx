import React from "react";
import Plot from "react-plotly.js";

const BellCurve = ({ data }) => {
  // Generate bell curve data
  const mean = data.y.reduce((acc, val) => acc + val, 0) / data.y.length;
  const variance =
    data.y.reduce((acc, val) => acc + (val - mean) ** 2, 0) / data.y.length;
  const stdDev = Math.sqrt(variance);

  const x = [];
  const y = [];
  for (let i = mean - 4 * stdDev; i < mean + 4 * stdDev; i += 0.1) {
    x.push(i);
    y.push(
      (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((i - mean) ** 2) / (2 * variance))
    );
  }

  return (
    <Plot
      data={[
        {
          x,
          y,
          type: "scatter",
          mode: "lines",
          line: { color: "orange" },
        },
      ]}
      layout={{ width: 720, height: 440, title: "Bell Curve" }}
    />
  );
};

export default BellCurve;
