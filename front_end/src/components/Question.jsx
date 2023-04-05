import React from "react";
import Button from "./Button";
import { Collapse } from "antd";
const { Panel } = Collapse;
const Question = () => {
  return (
    <div className=" w-[1466px] h-[620px] bg-slate-100 shadow-lg flex justify-center p-6">
      <div className=" w-[1100px] h-[900px] flex flex-col items-center gap-3">
        <div className=" w-[1100px] ">
          <h2 className="text-slate-900 text-6xl font-bold font-sans text-center p-4">
            Frequently Asked Question
          </h2>
        </div>
        <div className="mb-12 text-center text-2xl">
          <p>Grow your business and ensure brand consistency</p>
        </div>
        <div className="w-[810px] bg-white shadow-xl relative">
          <Collapse accordion defaultActiveKey={["1"]}>
            <Panel header="Does Gab have single sign on?" key="1">
              <p>
                Yes, we do have single sign on Capabilities throughout the
                system. Please contact our support team for more details.
              </p>
            </Panel>
            <Panel
              header="Can we migrate data from our old to new system"
              key="2"
            >
              <p>
                Yes, you can! We have an amazing professional team who will help
                you out in migrating all of your data over as well as setting up
                the system according to your business needs.
              </p>
            </Panel>
            <Panel header="How Secure is the system?" key="3">
              <p>
                Gab uses Microsoft Azure Cloud services along with a strong data
                encryption process that makes sure your data is fully intact all
                the time
              </p>
            </Panel>
            <Panel header="How long it take to onboard the signal" key="4">
              <p>
                Usually, it depends on the number of your franchisees and the
                complexity of the integrations needed to be done. It might take
                around 3-4 weeks.
              </p>
            </Panel>
          </Collapse>
        </div>
        <div className="mt-8">
          <Button text = 'Quick Demo'/>
        </div>
      </div>
    </div>
  );
};

export default Question;
