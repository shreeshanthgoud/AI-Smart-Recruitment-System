import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, Plus, X } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import API from '../services/api';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

 const fetchCandidates = async () => {
  setLoading(true);

  try {
    console.log("Fetching candidates...");

    const response = await API.get("/candidates");

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    const formattedCandidates = response.data.map((candidate) => ({
      id: candidate._id,
      name: candidate.name || "Unknown",
      email: candidate.email || "",
      phone: candidate.phone || "",
      position: candidate.role || "Candidate",
      location: candidate.location || "India",
      score: candidate.score || 0,
      skills: candidate.skills || [],
      experience: candidate.experience
        ? Array.isArray(candidate.experience)
          ? candidate.experience.join(", ")
          : candidate.experience
        : "Not Available",
      education: candidate.education
        ? Array.isArray(candidate.education)
          ? candidate.education.join(", ")
          : candidate.education
        : "Not Available",
      status: candidate.status || "Applied",
    }));

    setCandidates(formattedCandidates);
    setFilteredCandidates(formattedCandidates);

  } catch (error) {
    console.error("ERROR:", error);
    console.error("ERROR RESPONSE:", error.response);
  } finally {
    setLoading(false);
  }
};
const handleResumeUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);

    const response = await API.post(
      "/upload-resume",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Resume Uploaded:", response.data);

    if (response.data.success) {
      alert(
        response.data.message ||
        "Resume uploaded successfully!"
      );
    } else {
      alert(
        response.data.message ||
        "Candidate already exists"
      );
    }

    fetchCandidates();

  } catch (error) {
    console.error("Upload Error:", error);

    if (error.response) {
      console.error("Server Error:", error.response.data);
      alert(error.response.data.detail || "Upload failed");
    } else {
      alert("Network error. Check backend.");
    }
  } finally {
    setUploading(false);
  }
};
const handleGenerateJD = async () => {
  try {
    const response = await API.post("/generate-jd", {
      role,
      skills,
      experience,
      location
    });

    setGeneratedJD(response.data.job_description);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (scoreFilter > 0) {
      filtered = filtered.filter((c) => c.score >= scoreFilter);
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, scoreFilter, candidates]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Candidates
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review all candidates
          </p>
        </div>

        <label className="btn-primary flex items-center gap-2 cursor-pointer">
          <Plus size={20} />
          {uploading ? 'Uploading...' : 'Upload Resume'}

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleResumeUpload}
          />
        </label>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search candidates by name, position, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Score Filter */}
          <div className="flex items-center gap-2">
            <Filter
              size={20}
              className="text-gray-600"
            />

            <select
              value={scoreFilter}
              onChange={(e) =>
                setScoreFilter(Number(e.target.value))
              }
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value={0}>All Scores</option>
              <option value={80}>80+ (Excellent)</option>
              <option value={70}>70+ (Good)</option>
              <option value={60}>60+ (Fair)</option>
            </select>
          </div>

          {/* Export */}
          <button className="btn-secondary flex items-center gap-2">
            <Download size={20} />
            Export
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredCandidates.length} of{' '}
          {candidates.length} candidates
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Loading candidates...
            </p>
          </div>
        ) : filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onViewDetails={setSelectedCandidate}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">
              No candidates found
            </p>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="modal-content animate-slideUp max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCandidate.name}
              </h2>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Position
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedCandidate.position}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    Location
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedCandidate.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    Email
                  </p>
                  <p className="font-semibold text-gray-900 break-all">
                    {selectedCandidate.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    Phone
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedCandidate.phone}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills?.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Experience
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedCandidate.experience}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    Education
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedCandidate.education}
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    Overall Score
                  </span>

                  <span className="text-2xl font-bold text-indigo-600">
                    {selectedCandidate.score}%
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 btn-primary">
                  Schedule Interview
                </button>

                <button className="flex-1 btn-secondary">
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;