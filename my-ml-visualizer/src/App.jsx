import React, { useState } from "react";
import axios from "axios";
import ModelVisualizer from "./components/ModelVisualizer";
import HyperparameterForm from "./components/HyperparameterForm";
import GradientDescentVisualizer from "./components/GradientDescentVisualizer";

const App = () => {
  const [data, setData] = useState({ x: [1, 2, 3, 4, 5], y: [2, 4, 6, 8, 10] });
  const [predictions, setPredictions] = useState({});
  const [params, setParams] = useState({
    ridge_alpha: 1.0,
    lasso_alpha: 1.0,
    tree_max_depth: null,
    forest_n_estimators: 100,
    svm_C: 1.0,
  });
  const [gradientParams, setGradientParams] = useState({
    learning_rate: 0.1,
    iterations: 100,
    initial_x: 5,
  });

  const fetchPredictions = (params) => {
    axios
      .post("http://localhost:5000/predict", { input: data.x, params })
      .then((response) => {
        setPredictions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the predictions!", error);
      });
  };

  const handleParamsChange = (newParams) => {
    setParams(newParams);
    fetchPredictions(newParams);
  };

  const handleGradientParamsChange = (newGradientParams) => {
    setGradientParams(newGradientParams);
  };

  return (
    <div>
      <h1>Machine Learning Model Visualizer</h1>
      <HyperparameterForm onParamsChange={handleParamsChange} />
      <ModelVisualizer data={data} predictions={predictions} />
      <h2>Gradient Descent Visualizer</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGradientParamsChange({
            learning_rate: parseFloat(e.target.learning_rate.value),
            iterations: parseInt(e.target.iterations.value, 10),
            initial_x: parseFloat(e.target.initial_x.value),
          });
        }}
      >
        <div>
          <label>
            Learning Rate:
            <input
              type="number"
              name="learning_rate"
              defaultValue={gradientParams.learning_rate}
              step="0.01"
            />
          </label>
        </div>
        <div>
          <label>
            Iterations:
            <input
              type="number"
              name="iterations"
              defaultValue={gradientParams.iterations}
            />
          </label>
        </div>
        <div>
          <label>
            Initial X:
            <input
              type="number"
              name="initial_x"
              defaultValue={gradientParams.initial_x}
            />
          </label>
        </div>
        <button type="submit">Update Gradient Descent</button>
      </form>
      <GradientDescentVisualizer
        learningRate={gradientParams.learning_rate}
        iterations={gradientParams.iterations}
        initialX={gradientParams.initial_x}
      />
    </div>
  );
};

export default App;
