function doGet(e) {
  var username = e.parameter.username;
  var password = e.parameter.password;
  var responseData = {};

  // Fetch data from the Google Sheet
  var spreadsheet = SpreadsheetApp.openById("1QGEiuA8zNCeMfi4jHx34eX-a07XEeTX_hQf-utBnjEI");
  var sheet = spreadsheet.getSheetByName("Computer"); // Specify sheet name here
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var jsonData = [];

  // Search for the provided username and password in the data
  var found = false;
  for (var i = 1; i < data.length; i++) {
    var rowData = data[i];
    if (rowData[0] === username && rowData[1] === password) {
      found = true;
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = rowData[j];
      }
      jsonData.push(obj);
    }
  }

  if (found) {
    // Authentication successful, return data
    responseData.success = true;
    responseData.data = jsonData;
  } else {
    // Authentication failed
    responseData.success = false;
    responseData.error = "Authentication failed";
  }

  // Set the response content type to JSON
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}
