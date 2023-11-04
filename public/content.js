window.onload = function getGradesTable() {
    const gradesTable = document.getElementById('auto-table-4')
    if (gradesTable != null) {
        chrome.runtime.sendMessage({ gradesTable: gradesTable.innerHTML });
    }
}