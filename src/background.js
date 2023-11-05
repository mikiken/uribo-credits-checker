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
    let gradesTableCSV = new Blob([gradesTable], { type: "text/csv" });
    const df = dfd.readCSV(gradesTableCSV);
    console.log(df);
  }
});
