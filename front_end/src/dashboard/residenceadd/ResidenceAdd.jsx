import React, { useState } from "react";
import { Steps } from "antd";
import FirstStepForm from "./FirstStepForm";
import SecondStepForm from "./SecondStepForm";
import ThirdStepForm from "./ThirdStepForm";
import FourthStepForm from "./FourthStepForm";
import FifthStepForm from "./FifthStepForm";
import SixthStepForm from "./SixthStepForm";
import SeventhStepForm from "./SeventhStepForm";
const ResidenceAdd = () => {
 const [current, setCurrent] = useState(0);
 const [formValues, setformValues] = useState({});

 const steps = [
  {
   title: "first",
   content: <FirstStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
  {
   title: "second",
   content: <SecondStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
  {
   title: "third",
   content: <ThirdStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
  {
   title: "Fourth",
   content: <FourthStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
  {
   title: "Fifth",
   content: <FifthStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
  {
   title: "Sixth",
   content: <SixthStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
  {
   title: "Seventh",
   content: <SeventhStepForm props={{ setCurrent, current, formValues, setformValues }} />,
  },
 ];

 //map the function
 const items = steps.map((item) => ({
  key: item.title,
  title: item.title,
 }));
 return (
  <>
   <div>
    <div className="sm:py-4 px-2 py-2 sm:px-14 ">
     <Steps responsive={false} current={current} items={items} />
     <div className="mt-10">{steps[current].content}</div>
    </div>
   </div>
  </>
 );
};

export default ResidenceAdd;
