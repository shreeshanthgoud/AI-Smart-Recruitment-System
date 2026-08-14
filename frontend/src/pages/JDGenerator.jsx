import React, { useState } from "react";
import API from "../services/api";

const JDGenerator = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [generatedJD, setGeneratedJD] = useState("");

  const handleGenerateJD = async () => {
    try {
      const response = await API.post("/generate-jd", {
        role,
        skills,
        experience,
        location,
      });

      setGeneratedJD(response.data.job_description);
    } catch (error) {
      console.error(error);
      alert("Failed to generate JD");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          Job Description Generator
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border rounded-lg p-3"
            placeholder="Job Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Experience (e.g. 2 Years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerateJD}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Generate JD
        </button>

        {generatedJD && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">
              Generated Job Description
            </h2>

            <textarea
              value={generatedJD}
              readOnly
              rows={15}
              className="w-full border rounded-lg p-4 bg-gray-50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JDGenerator;