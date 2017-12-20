document.addEventListener('DOMContentLoaded', function () {

  // initialize some components here.
  $('select').material_select();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 45, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  /*
  $("#select-all-teammembers").click(function() {
    $('input[type=checkbox]').trigger('click');
  });
  */

  var downloadBtn = document.getElementById('download-btn');
  downloadBtn.addEventListener('click', function() {
    var includeAttrs = getPageAttributes();
    var query = getQuery();
    var selectedFormat = $("#selected-format :selected").text();

    download("search-history", includeAttrs, query, selectedFormat);
  });
});

// helpers
function getPageAttributes() {
  var includeAttrs = [];
  if (document.getElementById('page-attr-id').checked) {
    includeAttrs.push("id");
  }

  // ____

  if (document.getElementById('page-attr-last-visit-time').checked) {
    includeAttrs.push("lastVisitTime");
  }

  // ____

  if (document.getElementById('page-attr-title').checked) {
    includeAttrs.push("title");
  }

  // ____

  if (document.getElementById('page-attr-typed-count').checked) {
    includeAttrs.push("typedCount");
  }

  // ____

  if (document.getElementById('page-attr-url').checked) {
    includeAttrs.push("url");
  }

  // ____

  if (document.getElementById('page-attr-visit-count').checked) {
    includeAttrs.push("visitCount");
  }

  return includeAttrs;

}

function getQuery() {
  var query = {};
  var text = $('#query-text').val();

  if (text == undefined) {
    text = '';
  }
  query["text"] = text;

  //________

  var startTime = $('#query-start-time').val();
  let startTimestamp = new Date(startTime).getTime();
  if (isNaN(startTimestamp) !== true) {
    query["startTime"] = parseFloat(startTimestamp);
  } else {
    query["startTime"] = 0; // fix for chrome.history bug: https://github.com/umarsheikh13/recent-history/issues/2
  }

  //______

  var endTime = $('#query-end-time').val();
  let endTimestamp = new Date(endTime).getTime();
  if (isNaN(endTimestamp) !== true) {
    query["endTime"] = parseFloat(endTimestamp);
  }

  //______

  var maxResults = $('#query-max-results').val();
  if (maxResults.length > 0) {
    query["maxResults"] = parseInt(maxResults);
  }

  return query;
}

// doc: section: search -> https://developer.chrome.com/extensions/history
function download(filename, includeAttrs, query, format) {
  chrome.history.search(query, function(data) {

    var txtData = "";
    var csvData = [];
    csvData.push(includeAttrs);
    var jsonData = [];
    data.forEach(function(page) {
      //if (format === "json") {
      let obj = {};
      let obj_csv = [];
      for (i = 0; i < includeAttrs.length; i++) {
        let attr = includeAttrs[i];
        if (page[attr] != undefined) {
          obj[attr] = page[attr];
          txtData = txtData.concat(page[attr] + "\n");
          obj_csv.push(page[attr]);
        } else {
          obj_csv.push("");
        }
      }
      jsonData.push(obj);
      csvData.push(obj_csv);
      //}
    });

    // using filesaver. look for it on github.
    if (format == "txt") {
      var blob = new Blob([txtData], {type: "text/plain"});
      var saveAs = window.saveAs;
      saveAs(blob, filename + ".txt");
    }

    else if (format == "csv") {
      const rows = csvData; //[["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
      let csvContent = ""; //"data:text/csv;charset=utf-8,";
      rows.forEach(function(rowArray){
         let row = rowArray.join(",");
         csvContent += row + "\r\n"; // add carriage return
      });

      var blob = new Blob([csvContent], {type: "application/csv"});
      var saveAs = window.saveAs;
      saveAs(blob, filename + ".csv");
    }

    else if (format == "json") {
      var json = JSON.stringify(jsonData, null, 2);
      var blob = new Blob([json], {type: "application/json"});
      var saveAs = window.saveAs;
      saveAs(blob, filename + ".json");
    }

    // https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
    /*
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    */
  });

}

/*
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);
*/
