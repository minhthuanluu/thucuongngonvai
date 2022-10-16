import React from "react";
import SimpleSlider from "../../component/Header/SliderBar";

function FirstLayout({ children }) {
  return (
    <>
      <SimpleSlider></SimpleSlider>
      {children}
    </>
  );
}

export default FirstLayout;
