function doGet(e) {
  var response = {
    data: [],
    meta: { status: 'success' }
  };

  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetData = sheet.getRange('A2:B' + sheet.getLastRow()).getValues();

  var responseList = [];

  sheetData.map(function(d) {
    responseList.push({ url: d[0], likeCount: d[1] });
  });

  response.data = responseList;

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}
