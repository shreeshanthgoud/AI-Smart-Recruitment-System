import React from 'react';
import { Mail, Phone, MapPin, Star } from 'lucide-react';

const CandidateCard = ({ candidate, onViewDetails }) => {
  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-800';
    if (score >= 60) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 cursor-pointer"
      onClick={() => onViewDetails?.(candidate)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {candidate.name}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {candidate.position}
          </p>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 flex-wrap">
            {candidate.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{candidate.email}</span>
              </div>
            )}

            {candidate.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{candidate.phone}</span>
              </div>
            )}
          </div>

          {candidate.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
              <MapPin size={14} />
              <span>{candidate.location}</span>
            </div>
          )}

          {/* Skills */}
          {candidate.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {candidate.skills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBadgeColor(
              candidate.score || 0
            )}`}
          >
            {candidate.score || 0}%
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.round((candidate.score || 0) / 20)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;