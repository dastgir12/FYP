import React from "react";
const ProblemSolving = () => {
  return (
    <div className="relative w-[1466px] h-[850px] bg-white shadow-lg ">
      <div className="absolute translate-x-[830px] mt-10">
          <img
            src="https://naranga.com/wp-content/themes/naranga/static/img/svg/ring-dark.svg"
            alt=""
            className="w-[466px] h-[431px] "
          />
        </div>

      <div className="absolute ml-[-86px] mt-36">
          <img
            src="https://naranga.com/wp-content/themes/naranga/static/img/svg/ring-dark.svg"
            alt=""
            className="w-[466px] h-[431px] "
          />
      </div>


      <div className=" w-[1466px] h-[850px]  flex flex-col items-center">
        <div className=" w-[1100px] mb-2">
          <h2 className="text-3xl font-bold font-sans text-center p-4">
            How Naranga Solves Your Problems
          </h2>
        </div>
        <div className="mb-12">
          <p>Grow your business and ensure brand consistency</p>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="relative w-[580px] flex gap-4 ">
              <div className=" bg-green-500 flex flex-col  w-[286px] h-[264px] p-7">
                <div className="absolute w-[80px] h-[80px] bg-green-500 z-10 translate-x-48 transform rotate-45"></div>
                <div className=" mb-6">
                  <h2 className="text-2xl text-white font-sans font-bold">
                    Lead <br /> Management
                  </h2>
                </div>
                <div>
                  <p className="text-normal text-white font-sans font-bold">
                    Attract Potential frunchise and enhance the efficiency of
                    sales team
                  </p>
                </div>
              </div>

              <div className="w-[286px] h-[286px]">
                <div className="w-[286px] h-[286px]">
                  <img
                    src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/lead-management.jpg.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="relative w-[580px] flex gap-4">
              <div className=" bg-orange-400 flex flex-col  w-[286px] h-[264px] p-7">
                <div className="absolute w-[80px] h-[80px] bg-orange-400 z-10 translate-x-48 transform rotate-45"></div>
                <div className=" mb-6">
                  <h2 className="text-2xl text-white font-sans font-bold">
                    Operation <br /> Management
                  </h2>
                </div>
                <div>
                  <p className="text-normal text-white font-sans font-bold">
                    Onboard new franchisees, centralize visibility, maintain
                    brand standards and more in one place
                  </p>
                </div>
              </div>

              <div className="w-[286px] h-[286px]">
                <div className="w-[286px] h-[286px]">
                  <img
                    src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/operation-management.jpg.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="relative w-[580px] flex  gap-4">
              <div className=" bg-orange-300 flex flex-col  w-[286px] h-[264px] p-7">
                <div className="absolute w-[80px] h-[80px] bg-orange-300 z-10 translate-x-48 transform rotate-45"></div>
                <div className=" mb-6">
                  <h2 className="text-2xl text-white font-sans font-bold">
                    Online <br /> Earning
                  </h2>
                </div>
                <div>
                  <p className="text-normal text-white font-sans font-bold">
                    Brand standards above all. Connect and share training
                    resources with your franchisees
                  </p>
                </div>
              </div>

              <div className="w-[286px] h-[286px]">
                <div className="w-[286px] h-[286px]">
                  <img
                    src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/online-training.jpg.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="relative w-[580px] flex gap-4">
              <div className=" bg-orange-500 flex flex-col  w-[286px] h-[264px] p-7">
                <div className="absolute w-[80px] h-[80px] bg-orange-500 z-10 translate-x-48 transform rotate-45"></div>
                <div className=" mb-6">
                  <h2 className="text-2xl text-white font-sans font-bold">
                    Field Audits
                  </h2>
                </div>
                <div>
                  <p className="text-normal text-white font-sans font-bold">
                    Efficient solution to track, measure and correct
                    inconsistencies. Fast and effortless
                  </p>
                </div>
              </div>

              <div className="w-[286px] h-[286px]">
                <div className="w-[286px] h-[286px]">
                  <img
                    src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/field-audits.jpg.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolving;
