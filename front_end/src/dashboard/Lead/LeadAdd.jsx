import React, { useState } from 'react';
import axios from 'axios';

const LeadAdd = () => {
  const [leadData, setLeadData] = useState({
    leadName: '',
    sender: '',
    subject: '',
    wealth: '',
    experience: '',
    currentBusinesses: '',
    mostPreferedBusinesses: '',
    source: '',
    assignedTo: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/leads', leadData); // Replace with your backend API endpoint URL
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
          <label htmlFor="leadName" className="block font-medium">Lead Name</label>
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
          <label htmlFor="sender" className="block font-medium">Sender Email</label>
          <input
            type="email"
            id="sender"
            name="sender"
            value={leadData.sender}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block font-medium">Subject</label>
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
        {/* Add more input fields for other data properties */}
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

export default LeadAdd;
