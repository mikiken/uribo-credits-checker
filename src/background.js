'use strict';

// With background scripts you can communicate with sidepanel
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

function parseCSV(csv) {
  const rows = csv.split('\n'); // 行ごとに分割
  const data = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].trim(); // 空白をトリム
    if (row) {
      const values = row.split(','); // カンマでデータを分割
      data.push(values);
    }
  }

  return data;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.gradesTable) {
    const gradesTable = request.gradesTable;
    const gradesMatrix = parseCSV(gradesTable);
    countGrades(gradesMatrix);
  }
});

function countGrades(gradesMatrix) {
  let compulsory = 0; // 必修科目
  let electiveCompulsory = 0; // 選択必修科目
  let basicEducation = 0; // 基礎教養科目
  let generalEducation = 0; // 総合教養科目
  let advancedLiberal = 0; // 高度教養科目

  for (let i = 1; i < gradesMatrix.length; i++) {
    const result = gradesMatrix[i][12]; // 成績
    const credits = parseFloat(gradesMatrix[i][7]); // 単位数
    const category = gradesMatrix[i][2]; // 科目区分

    if (result == '合') {
      switch (category) {
        case '必修科目':
          compulsory += credits;
          break;
        case '選択必修科目':
          electiveCompulsory += credits;
          break;
        case '基礎教養科目':
          basicEducation += credits;
          break;
        case '総合教養科目':
          generalEducation += credits;
          break;
        case '高度教養科目':
          advancedLiberal += credits;
          break;
        default:
          break;
      }
    }
  }

  console.log('必修科目: ' + compulsory);
  console.log('選択必修科目: ' + electiveCompulsory);
  console.log('基礎教養科目: ' + basicEducation);
  console.log('総合教養科目: ' + generalEducation);
  console.log('高度教養科目: ' + advancedLiberal);

  chrome.runtime.sendMessage({
    type: 'gradesCount',
    compulsory: compulsory,
    electiveCompulsory: electiveCompulsory,
    basicEducation: basicEducation,
    generalEducation: generalEducation,
    advancedLiberal: advancedLiberal
  });
}