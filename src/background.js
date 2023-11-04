'use strict';

// With background scripts you can communicate with sidepanel
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.gradesTable) {
    const gradesTable = request.gradesTable;
    console.log(gradesTable);
  }
});
