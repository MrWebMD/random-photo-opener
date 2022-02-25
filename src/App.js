import { useState } from "react";
import "./App.css";
import UploadForm from './UploadForm';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WindowControls from "./WindowControls";

function App() {

  const [error, setError] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [coolDownEnabled, setCoolDownEnabled] = useState(false);

  let ready = !error && imageList.length > 0;

  const randomPictureHandler = () => {
    console.log(imageList);

    const randomIndex = Math.floor(Math.random() * imageList.length);

    const randomImagePath = imageList[randomIndex];

    window.electron.openImage(randomImagePath);

    setCoolDownEnabled(true);

    setTimeout(function(){
      setCoolDownEnabled(false);
    }, 500);

  }

  const folderSubmitHandler = (folderPath) => {
    console.log("App has received a new folder: ", folderPath);

    window.electron.getImagesFromFolder(folderPath).then((imageList) => {

      setCurrentFolder(folderPath.split("\\").pop());
      setImageList(imageList);
     
      console.log(imageList);

      if(imageList.length <= 0) {
        setError("No images loaded from folder (jpg, jpeg, png, gif supported)")
        return
      }

      setError(null);

    });

  }

  return (
    <div className="App">
      <WindowControls/>
      <h3 className="appHeader">Random Photo Opener</h3>
      <UploadForm onSubmit={folderSubmitHandler}></UploadForm>
      <div className="centered">
        <p>Current Folder: {currentFolder ? currentFolder : "none"}</p>
        {error && <p className="error">{error}</p>}
        <div>
        {ready && <CheckCircleIcon  style={{ fontSize: 50, color: "#0FAC5D" }} /> }

        </div>
        <button className="buttonLarge" disabled={!ready || coolDownEnabled} onClick={randomPictureHandler}>Open a random picture</button>
      </div>
    </div>
  );
}

export default App;
