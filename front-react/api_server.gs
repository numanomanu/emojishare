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
  if (e.parameter.likedUrl) {
    addLike(e.parameter.likedUrl, sheet);
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
  var sortedList = objectArraySort(responseList, 'likeCount', 'desc');
  return sortedList;
}

function addLike(url, sheet) {
  var data = sheet.getRange('A2:B' + sheet.getLastRow()).getValues();
  data.map(function(d, i) {
    if (url === d[0]) {
      sheet.getRange('B' + (i + 2)).setValue(Number(d[1]) + 1);
    }
  });
}

function objectArraySort(data, key, order) {
  var num_a = -1;
  var num_b = 1;

  if (order === 'asc') {
    num_a = 1;
    num_b = -1;
  }

  data = data.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    if (x > y) return num_a;
    if (x < y) return num_b;
    return 0;
  });
  return data;
}
