window.onload = function getGradesTable() {
    const gradesTable = document.getElementById('auto-table-4')
    if (gradesTable != null) {
        alert(gradesTable.rows.length);
    }
    else {
        alert("Grades table not found!");
    }
}