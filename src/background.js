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
    dfd.readCSV(gradesTable.csv).then(df => {
      let df_basic_liberal_arts = df.query(df['科目大区分'].eq('基礎教養科目').and(df['合否'].eq('合')));
      let df_integrated_liberal_arts = df.query(df['科目大区分'].eq('総合教養科目').and(df['合否'].eq('合')));
      let df_advanced_liberal_arts = df.query(df['科目大区分'].eq('高度教養科目').and(df['合否'].eq('合')));
      let df_foreign_language = df.query(df['科目大区分'].eq('外国語科目').and(df['合否'].eq('合')));
      let df_information_science = df.query(df['科目大区分'].eq('情報科目').and(df['合否'].eq('合')));
      let df_health_and_PE = df.query(df['科目大区分'].eq('健康・スポーツ科学').and(df['合否'].eq('合')));
      let df_others = df.query(df['科目大区分'].eq('その他の科目').and(df['合否'].eq('合')));

      let df_required = df.query(df['区分'].eq('専門科目').and(df['科目大区分'].eq('必修科目').and(df['合否'].eq('合'))));
      let df_semi_required = df.query(df['区分'].eq('専門科目').and(df['科目大区分'].eq('選択必修科目').and(df['合否'].eq('合'))));
      let df_elective = df.query(df['区分'].eq('専門科目').and(df['科目大区分'].eq('選択科目').and(df['合否'].eq('合'))));

      console.log(df_integrated_liberal_arts);
    }).catch(err => {
      console.log(err);
    });
  }
});
