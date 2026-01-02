const archivesSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1DgoxdQxtB9ebGrip2u-XPRXptkQMGiSdSGos0qkTUuo/edit?gid=0#gid=0").getSheetByName("Archives"); 

function getDataFromDay(){
  if(!archivesSheet){
    throw new Error("No source found"); 
  }

  var lastRow =  getSpread.getLastRow(); 

  for(var i = 2; i <= lastRow; i++){
    var loadTime = getSpread.getRange(i, 1).getValue(); 
    var serialNumber = getSpread.getRange(i, 2).getValue(); 
    var failCode = getSpread.getRange(i, 3).getValue(); 
    var results = getSpread.getRange(i, 4).getValue(); 
    var endTime = getSpread.getRange(i, 5).getValue(); 
    var downloadTime =getSpread.getRange(i, 6).getValue(); 
    var station = getSpread.getRange(i, 7).getValue(); 
    var slotNum = getSpread.getRange(i, 8).getValue(); 
    var receiverType = getSpread.getRange(i, 9).getValue(); 

    var transferObject = [loadTime, serialNumber, failCode, results, endTime, downloadTime, station, slotNum, receiverType]; 

    archivesSheet.appendRow(transferObject); 
  }

  clearRows(lastRow)
}

function clearRows(lastRow){
 
    getSpread.getRange("A2:J"+lastRow).clearContent(); 
  
}
