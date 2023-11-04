function tableToCSV(tableObject) {
    const rows = tableObject.querySelectorAll('tr');
    const csvData = [];

    for (let i = 0; i < rows.length; i++) {
        const row = [];
        const cells = rows[i].querySelectorAll('td, th');

        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j].textContent.replace(/(\n|\t)/g, '').replace(/^\s+|\s+$/g, ''); // 改行文字・タブ文字・前後の空白を削除
            row.push(cell);
        }

        csvData.push(row.join(','));
    }

    return csvData.join('\n');
}

window.onload = function getGradesTable() {
    const gradesTable = document.getElementById('auto-table-4');

    if (gradesTable != null) {
        chrome.runtime.sendMessage({ gradesTable: tableToCSV(gradesTable) });
    }
    else {
        // TODO: 成績表示画面以外の場合、`sidepanel.js`にメッセージを送る
    }
}