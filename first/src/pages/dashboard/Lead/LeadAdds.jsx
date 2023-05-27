import React, { useState } from "react";
import axios from "axios";

const LeadAdds = () => {
  const [leadData, setLeadData] = useState({
    leadName: "",
    sender: "",
    subject: "",
    wealth: "",
    experience: "",
    currentBusinesses: "",
    mostPreferedBusinesses: "",
    source: "",
    assignedTo: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve the access token from storage
      const response = await axios.post(
        "http://localhost:3001/v1/leads",
        leadData,
        {
          headers: {
            Authorization: `${token}`, // Include the access token in the request headers
          },
        }
      );
      console.log(response.data);
      // Handle success response, display a success message, or perform other actions
    } catch (error) {
      console.error(error);
      // Handle error response, display an error message, or perform other actions
    }
  };

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="leadName" className="block font-medium">
            Lead Name
          </label>
          <input
            type="text"
            id="leadName"
            name="leadName"
            value={leadData.leadName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="sender" className="block font-medium">
            Sender Email
          </label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={leadData.sender}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={leadData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="wealth" className="block font-medium">
            Wealth
          </label>
          <input
            type="text"
            id="wealth"
            name="wealth"
            value={leadData.wealth}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="experience" className="block font-medium">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={leadData.experience}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="currentBusinesses" className="block font-medium">
            Current Businesses
          </label>
          <input
            type="text"
            id="currentBusinesses"
            name="currentBusinesses"
            value={leadData.currentBusinesses}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="mostPreferedBusinesses" className="block font-medium">
            Most Prefered Businesses
          </label>
          <input
            type="text"
            id="mostPreferedBusinesses"
            name="mostPreferedBusinesses"
            value={leadData.mostPreferedBusinesses}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="source" className="block font-medium">
            Source
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={leadData.source}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="assignedTo" className="block font-medium">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={leadData.assignedTo}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={leadData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadAdds;
