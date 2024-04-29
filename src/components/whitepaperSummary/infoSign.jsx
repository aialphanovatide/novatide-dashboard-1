import React from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const InfoSign = ({ text }) => {
    return (
      <Tooltip title={text} placement="top">
        <InfoIcon />
      </Tooltip>
    );
  };
  
  export default InfoSign; // Exporta como InfoSign en lugar de infoSign
  