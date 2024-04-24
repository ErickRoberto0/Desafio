import React from "react";
import styles from "./IconButton.module.css";

const IconButton = ({ icon,className,onClick }) =>  {
  return (
    <button className={`${styles[className]} ${styles[icon]}`} onClick={onClick} >
      {icon}
    </button>
  );
}

export default IconButton;
