import React, { useState } from "react";
import API from "../services/api";

const InterviewGenerator = () => {

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [questions, setQuestions] = useState("");

  const handleGenerate = async () => {

    try {

      const response = await API.post(
        "/generate-interview",
        {
          role,
          experience
        }
      );

      setQuestions(response.data.questions);

    } catch (error) {

      console.error(error);
      alert("Failed to generate questions");

    }
  };

  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          Interview Question Generator
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            className="border p-3 rounded-lg"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

        </div>

        <button
          onClick={handleGenerate}
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Generate Questions
        </button>

        {questions && (

          <textarea
            className="w-full mt-6 border rounded-lg p-4"
            rows={20}
            value={questions}
            readOnly
          />

        )}

      </div>
    </div>
  );
};

export default InterviewGenerator;