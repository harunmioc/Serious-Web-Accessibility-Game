import React from "react";

export const WebpageSection = ({
  id,
  children,
  selectedTag,
  onTagSelect,
  isAnswered,
  correctTag,
}) => {
  const possibleTags = ["header", "nav", "main", "aside", "footer", "section", "article", "div"];

  return (
    <div className="relative group">
      {/* Sadržaj sekcije (što se vidi kao dio stranice) */}
      <div className="relative">
        {children}

        {/* Dropdown meni */}
        <div className="absolute top-2 right-2 z-50">
          <select
            className={`border rounded px-2 py-1 text-sm ${
              isAnswered
                ? "border-green-500 bg-green-50"
                : selectedTag && selectedTag !== correctTag
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white"
            }`}
            value={selectedTag || ""}
            onChange={(e) => onTagSelect(id, e.target.value)}
          >
            <option value="" disabled>
              Odaberi tag
            </option>
            {possibleTags.map((tag) => (
              <option key={tag} value={tag}>
                &lt;{tag}&gt;
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ako je odgovor tačan */}
      {isAnswered && (
        <span className="absolute top-2 left-2 text-green-600 text-lg">
          ✅
        </span>
      )}
      {/* Ako je odgovor pogrešan */}
      {selectedTag && selectedTag !== correctTag && !isAnswered && (
        <span className="absolute top-2 left-2 text-red-600 text-lg">
          ❌
        </span>
      )}
    </div>
  );
};
