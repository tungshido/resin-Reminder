function doGet(request) {
    var htmlTemplate = HtmlService.createTemplateFromFile('formSubmitPage');
    return htmlTemplate.evaluate();
}

function getNewHtml(e) {
    var html = HtmlService
        .createTemplateFromFile('formSubmitPage') // uses templated html
        .evaluate()
        .getContent();
    return html;
}

function machineNameByCell(cellName) {
    var resinFormSubmitSheet = SpreadsheetApp.openById('1EmJMwV7AloL-Npb5Kz-d7WstEF0z-eqDzc5Bpk39x1o');
    var machineNameDataSheet = resinFormSubmitSheet.getSheetByName('machineName');
    var machineNameArray = [];
    for (var i = 1; i < 20; i++) {
        if (cellName == machineNameDataSheet.getRange(1, i).getValue()) {
            var j = 2;
            while (machineNameDataSheet.getRange(j, i).getValue() != "") {
                machineNameArray.push(machineNameDataSheet.getRange(j, i).getValue());
                j++;
            }
            break;
        }
    }
    this.machineNameArray = machineNameArray;
    return this;
}

function getData(helperName, cell, machine, batch, outOfResinTime) {
    var resinFormSubmitSheet = SpreadsheetApp.openById('1EmJMwV7AloL-Npb5Kz-d7WstEF0z-eqDzc5Bpk39x1o');
    var submitDataSheet = resinFormSubmitSheet.getSheetByName('resinReminderData');
    var lastUpdatedRow = submitDataSheet.getRange('A1:A').getLastRow();
    console.log(helperName);
    console.log(cell);
    console.log(machine);
    console.log(batch);
    console.log(outOfResinTime);
    submitDataSheet.getRange(lastUpdatedRow + 1, 1).setValue(helperName);
    submitDataSheet.getRange(lastUpdatedRow + 1, 2).setValue(cell);
    submitDataSheet.getRange(lastUpdatedRow + 1, 3).setValue(machine);
    submitDataSheet.getRange(lastUpdatedRow + 1, 4).setValue(batch);
    submitDataSheet.getRange(lastUpdatedRow + 1, 5).setValue(outOfResinTime);
}