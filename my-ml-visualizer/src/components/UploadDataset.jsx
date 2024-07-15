import React, { useState } from "react";
import axios from "axios";

const UploadDataset = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [cleanedFilePath, setCleanedFilePath] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        return response.data.filepath;
      })
      .then((filepath) => {
        axios
          .post("http://localhost:5000/clean", { filepath })
          .then((response) => {
            setMessage(response.data.message);
            setCleanedFilePath(response.data.cleaned_filepath);
          })
          .catch((error) => {
            setMessage("Error cleaning data: " + error.message);
          });
      })
      .catch((error) => {
        setMessage("Error uploading file: " + error.message);
      });
  };

  return (
    <div className="upload-container">
      <h2>Upload and Clean Dataset</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Clean</button>
      {message && <p>{message}</p>}
      {cleanedFilePath && (
        <p>
          Cleaned dataset available at:{" "}
          <a href={cleanedFilePath} download>
            Download
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadDataset;
