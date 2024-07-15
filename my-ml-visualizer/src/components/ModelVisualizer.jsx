import React from "react";
import Plot from "react-plotly.js";

const ModelVisualizer = ({ data, predictions }) => {
  const renderPlots = () => {
    return Object.keys(predictions).map((model, index) => (
      <Plot
        key={index}
        data={[
          {
            x: data.x,
            y: data.y,
            type: "scatter",
            mode: "markers",
            marker: { color: "red" },
            name: "Actual",
          },
          {
            x: data.x,
            y: predictions[model],
            type: "scatter",
            mode: "lines+markers",
            name: model,
          },
        ]}
        layout={{
          width: 720,
          height: 440,
          title: `Model Predictions: ${model}`,
        }}
      />
    ));
  };

  return <div>{renderPlots()}</div>;
};

export default ModelVisualizer;
