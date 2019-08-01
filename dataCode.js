function scanResinData() {
    const resinFile = SpreadsheetApp.openById('1XlG90TgiIGEsALXkcbD_9DZ4Z61qq_pMRNNVKuprsR0');
    var resinFileSheet = resinFile.getSheetByName("Resin response");
    var dataValues = resinFileSheet.getDataRange().getValues();

    var lastRowIndex = resinFileSheet.getLastRow();
    var blankRowIndex = [];
    var searchString = "";
    var incompleteMachine = [];

    blankRowIndex = findIndex(dataValues, searchString);
    var numberOfBlankRow = blankRowIndex.length;
    var columnValues = resinFileSheet.getRange("I2:I").getValue();

    blankRowIndex = findIndex(dataValues, searchString);
    for (var arrCounter = 0; arrCounter < blankRowIndex.length; arrCounter++) {
        var currentTime = Utilities.formatDate(new Date(), "GMT+7", "kk:mm");
        var currentTimeInHour = Utilities.formatDate(new Date(), "GMT+7", "kk");

        //----------------------for loop here to activate which incompleted rows--------------------------//
        //----------------------get current time and resin run out time to compare------------------------//
        var currentTimeInMinute = Utilities.formatDate(new Date(), "GMT+7", "m");
        var outOfResinTime = resinFileSheet.getRange(blankRowIndex[arrCounter], 7).getValue();
        var outOfResinTimeInHour = outOfResinTime.slice(0, 2);
        var outOfResinTimeInMinute = outOfResinTime.slice(3, 5);
        var differentialHour = outOfResinTimeInHour - currentTimeInHour;
        console.log(outOfResinTimeInHour + " outOfResinTimeInHour");
      console.log(currentTimeInHour + " currentTimeInHour");
        var differentialMinute = outOfResinTimeInMinute - currentTimeInMinute;
        console.log(differentialHour + " differentialHour");
        console.log(differentialMinute + " differentialMinute");
        if (differentialHour == 0) {
            if (differentialMinute <= 15) {
                var cell = resinFileSheet.getRange(blankRowIndex[arrCounter], 5).getValue();
                incompleteMachine.push(cell);
            }
        }
    }
    this.incompleteMachineName = incompleteMachine;
    this.blankRowIndex = blankRowIndex;
    Logger.log(this.incompleteMachineName + " incompleteMachine");
    Logger.log(this.blankRowIndex + " blankRowIndex");
    return this;
}

function findIndex(dataValues, searchString) {
    var blankRowIndex = [];
    for (var i = 0, iLen = dataValues.length; i < iLen; i++) {
        if (dataValues[i][8] == searchString) {
            blankRowIndex.push(i + 1);
        }
    }
    return blankRowIndex;
}

function userSubmit(isCompletedArray) {
    Logger.log(isCompletedArray);
    const resinFile1 = SpreadsheetApp.openById('1XlG90TgiIGEsALXkcbD_9DZ4Z61qq_pMRNNVKuprsR0');
    var resinFileSheet1 = resinFile1.getSheetByName("Resin response");
    Logger.log("OK");
    var temp = 1;
    for (var i = 0; i < isCompletedArray.length; i++) {
        resinFileSheet1.getRange(isCompletedArray[i], 9).setValue("hoàn thành");
    }
}

function doGet(request) {
    var htmlTemplate = HtmlService.createTemplateFromFile('Page');
    return htmlTemplate.evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
