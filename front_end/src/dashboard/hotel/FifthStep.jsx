import Card from "./CardSelection/Crad";
const FifthStep = ({ props }) => {
 const { current, setCurrent ,formValues , setformValues } = props;

 const cardsDetails = ["wifi", "camera", "parking", "doorLock"];
 const carddetails = cardsDetails.map((e) => ({
  text: e,
  icon: "https://cdn-icons-png.flaticon.com/512/2859/2859724.png",
 }));
 const mappingCards = carddetails.map((e, i) => (
  <Card key={i} text={e.text} icon={e.icon} />
 ));

 const handleSubmit = (e) => {
    setCurrent((prev) => prev + 1);
    setformValues({ ...formValues, ...e });
  };
 return (
  <>
   <div className="flex gap-5 flex-col justify-center items-center">
    <h1>Select Services</h1>
    <div className="flex flex-wrap justify-center items-center gap-3">{mappingCards}</div>
    <div className="flex gap-2 justify-center items-center ">
     <button
      onClick={() => setCurrent(current - 1)}
      className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
     >
      Back
     </button>
     <button
      onClick={handleSubmit}
      className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
      type="submit"
     >
      Next
     </button>
    </div>
   </div>
  </>
 );
};

export default FifthStep;
