

function doGet(){
  
return  HtmlService.createHtmlOutputFromFile('formUI')
}

function getTimeNow(){
  var date = new Date(); 


 var hour = String(date.getHours()).padStart(2,'0'); 
  var minute = String(date.getMinutes()).padStart(2,'0');  
 
  var point = hour >= 12 ? "PM" : "AM"; 
 
  var newFormat = hour + ":" + minute + " " + point; 

  
  return newFormat; 



}
