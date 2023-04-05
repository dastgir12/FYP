import React, { useState } from "react";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/forget", { email: email });
      if (response.data.success) {
        setNotification("Email sent. Please check your inbox.");
        setTimeout(() => {
          setNotification("");
        }, 3000);
      } else {
        setNotification(response.data.msg);
        setTimeout(() => {
          setNotification("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setNotification("Error: Could not send email.");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Forgot your password?</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-2 border-gray-200 p-2 w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-medium w-full">
            Send reset link
          </button>
        </form>
        {notification && (
          <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">{notification}</div>
        )}
      </div>
    </div>
  );
};

export default Forgot;
