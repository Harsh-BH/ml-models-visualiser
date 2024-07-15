import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ModelVisualizer from "./components/ModelVisualizer";
import HyperparameterForm from "./components/HyperparameterForm";
import GradientDescentVisualizer from "./components/GradientDescentVisualizer";
import DatasetViewer from "./components/DatasetViewer";
import ScatterPlot from "./components/ScatterPlot";
import Histogram from "./components/Histogram";
import LineGraph from "./components/LineGraph";
import ViolinPlot from "./components/ViolinPlot";
import BellCurve from "./components/BellCurve";
import "./App.css";

const App = () => {
  const [data, setData] = useState({ x: [1, 2, 3, 4, 5], y: [2, 4, 6, 8, 10] });
  const [predictions, setPredictions] = useState({});
  const [params, setParams] = useState({
    ridge_alpha: 1.0,
    lasso_alpha: 1.0,
    tree_max_depth: null,
    forest_n_estimators: 100,
    svm_C: 1.0,
    bagging_n_estimators: 10,
    boosting_n_estimators: 100,
    boosting_learning_rate: 0.1,
  });
  const [gradientParams, setGradientParams] = useState({
    learning_rate: 0.1,
    iterations: 100,
    initial_x: 5,
  });

  useEffect(() => {
    fetchPredictions(params);
  }, [params]);

  const fetchPredictions = (params) => {
    console.log("Fetching predictions with params:", params); // Debugging
    axios
      .post("http://localhost:5000/predict", { input: data.x, params })
      .then((response) => {
        console.log("Received predictions:", response.data); // Debugging
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
    <Router>
      <div className="container">
        <div className="left-panel">
          <h1>Machine Learning Model Visualizer</h1>
          <Link to="/dataset" className="nav-button">
            View Dataset
          </Link>
          <HyperparameterForm onParamsChange={handleParamsChange} />
          <h2>Gradient Descent Visualizer</h2>
          <form
            className="form"
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
          <div className="visualization-links">
            <Link to="/scatter" className="nav-button">
              Scatter Plot
            </Link>
            <Link to="/histogram" className="nav-button">
              Histogram
            </Link>
            <Link to="/linegraph" className="nav-button">
              Line Graph
            </Link>
            <Link to="/violin" className="nav-button">
              Violin Plot
            </Link>
            <Link to="/bellcurve" className="nav-button">
              Bell Curve
            </Link>
          </div>
        </div>
        <div className="plots">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ModelVisualizer data={data} predictions={predictions} />
                  <GradientDescentVisualizer
                    learningRate={gradientParams.learning_rate}
                    iterations={gradientParams.iterations}
                    initialX={gradientParams.initial_x}
                  />
                </>
              }
            />
            <Route path="/dataset" element={<DatasetViewer data={data} />} />
            <Route path="/scatter" element={<ScatterPlot data={data} />} />
            <Route path="/histogram" element={<Histogram data={data} />} />
            <Route path="/linegraph" element={<LineGraph data={data} />} />
            <Route path="/violin" element={<ViolinPlot data={data} />} />
            <Route path="/bellcurve" element={<BellCurve data={data} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
