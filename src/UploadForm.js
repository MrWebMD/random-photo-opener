import React, { useRef, useState } from "react";
import CloudUpload from "@material-ui/icons/CloudUpload";

const UploadForm = (props) => {
  const [error, setError] = useState(null);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const uploadButtonHandler = (event) => {
    if (uploadDisabled) return;

    setUploadDisabled(true);

    window.electron.selectFolderDialog().then((res) => {
      if (res.canceled || res.filePaths.length <= 0) {
        setUploadDisabled(false);
        setError("No folders selected");
        return;
      }

      props.onSubmit(res.filePaths[0]);

      setUploadDisabled(false);
      setError(null);
    });
  };

  return (
    <div>
      <div
        className={"uploadButton " + (uploadDisabled ? "disabledUpload" : "")}
        onClick={uploadButtonHandler}
      >
        <CloudUpload style={{ fontSize: 140 }} />
        <p className={error ? "error" : ""}>
          {error ? error : "Select a folder"}
        </p>
      </div>
    </div>
  );
};

export default UploadForm;
