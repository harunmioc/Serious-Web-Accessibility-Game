export const AccessibleWebpage = ({ visionType, fixedIssues }) => {
  const getVisionFilter = () => {
    switch (visionType) {
      case 'protanopia': return 'sepia(100%) hue-rotate(90deg) saturate(200%)';
      case 'deuteranopia': return 'sepia(100%) hue-rotate(180deg) saturate(150%)';
      case 'tritanopia': return 'sepia(100%) hue-rotate(270deg) saturate(120%)';
      case 'low-contrast': return 'contrast(0.6) brightness(1.2)';
      case 'monochrome': return 'grayscale(100%)';
      default: return 'none';
    }
  };
  const getFixedStyles = (issueId, original, fixed) =>
    fixedIssues.has(issueId) ? fixed : original;

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 max-w-5xl mx-auto"
      style={{ filter: getVisionFilter() }}
    >
      {/* Browser Chrome */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 mx-4 text-sm text-gray-600">
          https://shop-example.com
        </div>
      </div>

      {/* Content Example */}
      <div className={getFixedStyles(
        'header-contrast',
        'bg-yellow-200 text-yellow-400 px-8 py-6',
        'bg-blue-800 text-white px-8 py-6'
      )}>
        <h1 className="text-2xl font-bold">TechStore</h1>
      </div>
    </div>
  );
};