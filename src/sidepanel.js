'use strict';

import './sidepanel.css';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == 'gradesCount') {
    const gradesCountArea = document.getElementById('display-area');

    gradesCountArea.innerHTML = `
      <p>単位数</p>
      <ul>
        <li>必修科目: ${request.compulsory}</li>
        <li>選択必修科目: ${request.electiveCompulsory}</li>
        <li>基礎教養科目: ${request.basicEducation}</li>
        <li>総合教養科目: ${request.generalEducation}</li>
        <li>高度教養科目: ${request.advancedLiberal}</li>
      </ul>
    `;
  }
});
