import React, { useState } from "react";

const HyperparameterForm = ({ onParamsChange }) => {
  const [params, setParams] = useState({
    ridge_alpha: 1.0,
    lasso_alpha: 1.0,
    tree_max_depth: null,
    forest_n_estimators: 100,
    svm_C: 1.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onParamsChange(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Ridge Alpha:
          <input
            type="number"
            name="ridge_alpha"
            value={params.ridge_alpha}
            onChange={handleChange}
            step="0.1"
          />
        </label>
      </div>
      <div>
        <label>
          Lasso Alpha:
          <input
            type="number"
            name="lasso_alpha"
            value={params.lasso_alpha}
            onChange={handleChange}
            step="0.1"
          />
        </label>
      </div>
      <div>
        <label>
          Tree Max Depth:
          <input
            type="number"
            name="tree_max_depth"
            value={params.tree_max_depth || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Forest N Estimators:
          <input
            type="number"
            name="forest_n_estimators"
            value={params.forest_n_estimators}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          SVM C:
          <input
            type="number"
            name="svm_C"
            value={params.svm_C}
            onChange={handleChange}
            step="0.1"
          />
        </label>
      </div>
      <button type="submit">Update Hyperparameters</button>
    </form>
  );
};

export default HyperparameterForm;
