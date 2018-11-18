function doGet(e) {
  var response = {
    data: [],
    meta: { status: 'success' }
  };
  var sheet = SpreadsheetApp.getActiveSheet();

  if (e.parameter.url) {
    var url = e.parameter.url;
    if (!url.match(/^https:\/\/emoji.slack-edge.com\//)) {
      response.meta = {
        status: 'error',
        message: 'Please send correct slack emoji url'
      };
      return ContentService.createTextOutput(
        JSON.stringify(response)
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
  if (e.parameter.url) {
    sheet.appendRow([e.parameter.url, 0]);
  }

  var responseList = getData(sheet);
  response.data = responseList;

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getData(sheet) {
  var sheetData = sheet.getRange('A2:B' + sheet.getLastRow()).getValues();

  var responseList = [];

  sheetData.map(function(d) {
    responseList.push({ url: d[0], likeCount: d[1] });
  });
  return responseList;
}
