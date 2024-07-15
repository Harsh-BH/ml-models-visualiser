import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const GradientDescentVisualizer = ({ learningRate, iterations, initialX }) => {
  const [data, setData] = useState({ function: { x: [], y: [] }, history: [] });

  useEffect(() => {
    axios
      .post("http://localhost:5000/gradient-descent", {
        learning_rate: learningRate,
        iterations: iterations,
        initial_x: initialX,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gradient descent data", error);
      });
  }, [learningRate, iterations, initialX]);

  return (
    <Plot
      data={[
        {
          x: data.function.x,
          y: data.function.y,
          type: "scatter",
          mode: "lines",
          name: "Function",
        },
        {
          x: data.history.map((point) => point.x),
          y: data.history.map((point) => point.y),
          type: "scatter",
          mode: "markers+lines",
          name: "Gradient Descent",
        },
      ]}
      layout={{ width: 720, height: 440, title: "Gradient Descent" }}
    />
  );
};

export default GradientDescentVisualizer;
