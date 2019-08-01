function scanResinData() {
    const resinFile = SpreadsheetApp.openById('1EmJMwV7AloL-Npb5Kz-d7WstEF0z-eqDzc5Bpk39x1o');
    var resinFileSheet = resinFile.getSheetByName("resinReminderData");
    var dataValues = resinFileSheet.getDataRange().getValues();

    var lastRowIndex = resinFileSheet.getLastRow();
    var blankRowIndex = [];
    var searchString = "";
    var incompleteMachine = [];
    var outOfResinTimeArray = [];
    blankRowIndex = findIndex(dataValues, searchString);
    //var numberOfBlankRow = blankRowIndex.length;

    for (var arrCounter = 0; arrCounter < blankRowIndex.length; arrCounter++) {
        var currentTime = Utilities.formatDate(new Date(), "GMT+6:52", "kk:mm");
        var currentTimeInHour = Utilities.formatDate(new Date(), "GMT+6:52", "kk");

        //----------------------for loop here to activate which incompleted rows--------------------------//
        //----------------------get current time and resin run out time to compare------------------------//
        var currentTimeInMinute = Utilities.formatDate(new Date(), "GMT+6:52", "m");
        var outOfResinTime = Utilities.formatDate(resinFileSheet.getRange(blankRowIndex[arrCounter], 5).getValue(), "GMT+6:52", "kk:mm");
        Logger.log(outOfResinTime + " outOfResinTime");
        var outOfResinTimeInHour = outOfResinTime.slice(0, 2);
        var outOfResinTimeInMinute = outOfResinTime.slice(3, 5);
        var differentialHour = outOfResinTimeInHour - currentTimeInHour;
        var differentialMinute = outOfResinTimeInMinute - currentTimeInMinute;

        if (differentialHour == 0) {
            if (differentialMinute <= 30) {
                var machineName = resinFileSheet.getRange(blankRowIndex[arrCounter], 3).getValue();
                Logger.log(machineName + " machineName");
                incompleteMachine.push(machineName);
                outOfResinTimeArray.push(outOfResinTime);
            }
        }
    }
    this.incompleteMachineName = incompleteMachine;
    this.blankRowIndex = blankRowIndex;
    this.outOfResinTimeArray = outOfResinTimeArray;

    return this;
}
//----------------------find index of incompleted row---------------------//
function findIndex(dataValues, searchString) {
    var blankRowIndex = [];
    for (var i = 0, iLen = dataValues.length; i < iLen; i++) {
        if (dataValues[i][6] == searchString) {
            blankRowIndex.push(i + 1);
        }
    }
    return blankRowIndex;
}
//-----------------------update complete machine status from clide-side into database-------------------//
function userSubmit(isCompletedArray) {
    console.log(isCompletedArray);
    const resinFile1 = SpreadsheetApp.openById('1EmJMwV7AloL-Npb5Kz-d7WstEF0z-eqDzc5Bpk39x1o');
    var resinFileSheet1 = resinFile1.getSheetByName("resinReminderData");
    Logger.log("OK");
    var temp = 1;
    for (var i = 0; i < isCompletedArray.length; i++) {
        resinFileSheet1.getRange(isCompletedArray[i], 7).setValue("hoàn thành");
    }
}
//----------------------call Page html---------------------------//
function doGet(request) {
    var htmlTemplate = HtmlService.createTemplateFromFile('Page');
    return htmlTemplate.evaluate();
}
//----------------------include script, css file-----------------------//
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}