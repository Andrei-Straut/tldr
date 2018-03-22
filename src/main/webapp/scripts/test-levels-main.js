var groups = testLevels.getVisGroups();
var items = testLevels.getDataItems();
var visOptions = testLevels.visOptions;

var container = document.getElementById('tests');
var dataSet = new vis.DataSet(items);
var graph2d = new vis.Graph2d(container, dataSet, groups, visOptions);

function toggleVisGroups() {
    var totalVisible = document.getElementById("toggleTotal").checked;
    var runVisible = document.getElementById("toggleRun").checked;
    var passedVisible = document.getElementById("togglePassed").checked;
    var failedVisible = document.getElementById("toggleFailed").checked;
    var errorsVisible = document.getElementById("toggleErrors").checked;
    
    graph2d.setOptions({
        groups: {
            visibility: {
                0: totalVisible,
                2: runVisible,
                3: passedVisible,
                4: failedVisible,
                5: errorsVisible
            }
        }
    });
}