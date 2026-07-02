// Vercel Speed Insights - Standalone initialization
// This script initializes the Speed Insights queue and loads the tracking script

(function() {
  // Initialize the queue
  window.si = window.si || function () {
    (window.siq = window.siq || []).push(arguments);
  };

  // Create and inject the script tag
  var script = document.createElement('script');
  script.defer = true;
  
  // Use the Vercel-hosted script for production or the debug version for development
  script.src = '/_vercel/speed-insights/script.js';
  
  // Add SDK information
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '2.0.0');
  
  // Error handling
  script.onerror = function() {
    console.log('[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled and try again.');
  };
  
  // Inject the script
  document.head.appendChild(script);
})();
