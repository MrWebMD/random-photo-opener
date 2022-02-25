import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import MaximizeIcon from "@material-ui/icons/Maximize";
import MinimizeIcon from "@material-ui/icons/Minimize";
import CropSquareIcon from "@material-ui/icons/CropSquare";
const WindowControls = () => {

  const handleClose = () => {
    window.electron.close();
  }
  const handleMaximize = () => {
    window.electron.maximize();
  }
  const handleMinimize = () => {
    window.electron.minimize();
  }

  return (
    <div class="windowControls">
      <div className="draggableRegion"></div>
      <MinimizeIcon onClick={handleMinimize}/>
      {/* <CropSquareIcon onClick={handleMaximize}/> */}
      <CropSquareIcon style={{opacity: 0.1}}/>
      <CloseIcon onClick={handleClose}/>
    </div>
  );
};

export default WindowControls;
