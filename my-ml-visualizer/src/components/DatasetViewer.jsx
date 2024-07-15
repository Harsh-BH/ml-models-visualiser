import React, { useState } from "react";

const DatasetViewer = ({ data }) => {
  const [format, setFormat] = useState("array");

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const renderDataset = () => {
    switch (format) {
      case "array":
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
      case "csv":
        const csv = `x,y\n${data.x
          .map((x, i) => `${x},${data.y[i]}`)
          .join("\n")}`;
        return <pre>{csv}</pre>;
      default:
        return null;
    }
  };

  return (
    <div className="dataset-viewer">
      <h2>Dataset Viewer</h2>
      <div>
        <label>
          Select format:
          <select value={format} onChange={handleFormatChange}>
            <option value="array">Array</option>
            <option value="csv">CSV</option>
          </select>
        </label>
      </div>
      <div className="dataset-content">{renderDataset()}</div>
    </div>
  );
};

export default DatasetViewer;
