import React, { useState } from "react";
import { Steps } from "antd";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";

const HotelAdd = () => {
  const [current, setCurrent] = useState(0);
  const [formValues, setformValues] = useState({});

  const steps = [
    {
      title: "first",
      content: (
        <FirstStep props={{ setCurrent, current, formValues, setformValues }} />
      ),
    },
    {
      title: "second",
      content: (
        <SecondStep
          props={{ setCurrent, current, formValues, setformValues }}
        />
      ),
    },
    {
      title: "Third",
      content: (
        <ThirdStep props={{ setCurrent, current, formValues, setformValues }} />
      ),
    },
    {
      title: "Fourth",
      content: (
        <FourthStep
          props={{ setCurrent, current, formValues, setformValues }}
        />
      ),
    },
    {
      title: "Fifth",
      content: (
        <FifthStep props={{ setCurrent, current, formValues, setformValues }} />
      ),
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

export default HotelAdd;
