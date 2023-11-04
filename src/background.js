'use strict';
import * as dfd from "danfojs"

// With background scripts you can communicate with sidepanel
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.gradesTable) {
    const gradesTable = request.gradesTable;
    console.log(gradesTable);

    const s = new dfd.Series([1, 3, 5, undefined, 6, 8])
    console.log(s.index);
  }
});
