const url = ""
 const getSpread = SpreadsheetApp.openByUrl(url).getSheetByName("39th Denver"); 
 const center = "39th"; 


//Adds the download to the sheet. 
function downloadAdd(
  serial,
  station, 
  slot
){
  
 
  var time = getSpread.getRange("O1").getValue(); 
  var serialx = serial.toString().toUpperCase(); 
  var receiveType = getReceiverType(serial).toUpperCase(); 
 
  var sheetObject = [time,serialx,"",""," ","" ,station, slot,receiveType,center]; 

getSpread.appendRow(sheetObject); 

}


//add the completed data information to the sheet. 
function downloadComplete(serial, result, failCode) {
  const serialx = serial.toString().toUpperCase();
  const resultx = result.toString().toUpperCase();
  const failCodex = failCode.toString().toUpperCase();

  const sheet = getSpread;
  const time = sheet.getRange("O1").getValue(); // Current finish time
  const lastRow = sheet.getLastRow();

  // Get all relevant data in one call (start time in column A, serial in column B)
  const data = sheet.getRange(1, 1, lastRow, 2).getValues();

  for (let i = 0; i < lastRow; i++) {
    const start = data[i][0];
    const sheetSerial = data[i][1];

    if (serialx === sheetSerial.toString().toUpperCase()) {
      // Calculate duration
      const durationMs = time - start;
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

      const formattedDuration = 
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0');

      const row = i + 1; // Adjust for 0-based index

      // Write back values
      sheet.getRange(row, 3).setValue(failCodex);           // Column C: Fail Code
      sheet.getRange(row, 4).setValue(resultx);             // Column D: Result
      sheet.getRange(row, 5).setValue(time);                // Column E: Finish Time
      sheet.getRange(row, 6).setValue(formattedDuration);   // Column F: Duration

      sendToArchives(row, formattedDuration);
      break; // Stop once match is found
    }
  }
}



function sendToArchives(i, formattedDuration){
   var loadTime = getSpread.getRange(i, 1).getValue(); 
    var serialNumber = getSpread.getRange(i, 2).getValue(); 
    var failCode = getSpread.getRange(i, 3).getValue(); 
    var results = getSpread.getRange(i, 4).getValue(); 
    var endTime = getSpread.getRange(i, 5).getValue(); 
    var downloadTime =getSpread.getRange(i, 6).getValue(); 
    var station = getSpread.getRange(i, 7).getValue(); 
    var slotNum = getSpread.getRange(i, 8).getValue(); 
    var receiverType = getSpread.getRange(i, 9).getValue(); 
    var location = getSpread.getRange(i, 10).getValue();

    var transferObject = [loadTime, serialNumber, failCode, results, endTime, formattedDuration, station, slotNum, receiverType,location]; 

    archivesSheet.appendRow(transferObject); 
    deleteRow(i); 
}

function deleteRow(i){
  getSpread.deleteRow(i); 

}

function getNow(){
  var date = new Date(); 

  

 // var hour = date.toLocaleTimeString(); 
var time = date.getHours();
var minute = date.getMinutes();  
var day = date.getUTCDay(); 

console.log(day); 

}



//Looks up the type of receiver by serial number; 
function getReceiverType(serial){
 
  var teller = serial.charAt(3) + serial.charAt(4); 
  var returnType = ""; 

  console.log(serial.length); 
  
  switch(teller){
    
    case "XP": returnType = "H3-MUBP"; 
    break; 

    case "XJ": returnType = "H2-MUBP"; 
    break;
    case "XD": returnType = "H2-MUBP";
    break; 
    case "XN": returnType = "WALLEY";
    break; 
    case "XT": returnType = "HOPPER DUO"; 
    break;
    default: returnType = "NO LOG";  
  }
  return returnType; 
}



