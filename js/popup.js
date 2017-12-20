document.addEventListener('DOMContentLoaded', function () {

  $('select').material_select();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 45, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  var downloadBtn = document.getElementById('download-btn');
  downloadBtn.addEventListener('click', function() {
    var includeAttrs = getPageAttributes();
    var query = getQuery();
    var selectedFormat = $("#selected-format :selected").text();
    download("search-history", includeAttrs, query, selectedFormat);
  });
});

function getPageAttributes() {
  var includeAttrs = [];
  if (document.getElementById('page-attr-id').checked) {
    includeAttrs.push("id");
  }

  if (document.getElementById('page-attr-last-visit-time').checked) {
    includeAttrs.push("lastVisitTime");
  }

  if (document.getElementById('page-attr-title').checked) {
    includeAttrs.push("title");
  }

  if (document.getElementById('page-attr-typed-count').checked) {
    includeAttrs.push("typedCount");
  }

  if (document.getElementById('page-attr-url').checked) {
    includeAttrs.push("url");
  }

  if (document.getElementById('page-attr-visit-count').checked) {
    includeAttrs.push("visitCount");
  }

  return includeAttrs;
}

function getQuery() {
  var query = {};
  var text = $('#query-text').val();
  var startTime = $('#query-start-time').val();
  var endTime = $('#query-end-time').val();
  var maxResults = $('#query-max-results').val();

  if (text == undefined) {
    text = '';
  }
  query["text"] = text;

  let startTimestamp = new Date(startTime).getTime();
  if (isNaN(startTimestamp) !== true) {
    query["startTime"] = parseFloat(startTimestamp);
  } else {
    query["startTime"] = 0; // fix for chrome.history bug: https://github.com/umarsheikh13/recent-history/issues/2
  }

  let endTimestamp = new Date(endTime).getTime();
  if (isNaN(endTimestamp) !== true) {
    query["endTime"] = parseFloat(endTimestamp);
  }

  if (maxResults.length > 0) {
    query["maxResults"] = parseInt(maxResults);
  }

  return query;
}

// doc: section: search -> https://developer.chrome.com/extensions/history
function download(filename, includeAttrs, query, format) {
  chrome.history.search(query, function(pages) {
    var textContent = "";
    var data = [];
    pages.forEach(function(page) {
      if (format == "json" || format == "csv") {
        let obj = {};
        for (i = 0; i < includeAttrs.length; i++) {
          let attr = includeAttrs[i];
          if (page[attr] != undefined) {
            obj[attr] = page[attr];
          }
        }
        data.push(obj);

      } else { // txt
        for (i = 0; i < includeAttrs.length; i++) {
          let attr = includeAttrs[i];
          if (page[attr] != undefined) {
            textContent = textContent.concat(page[attr] + ", ");
          }
        }
        textContent = textContent.concat("\n");
      }
    });

    // using filesaver. look for it on github.
    if (format == "txt") {
      var blob = new Blob([textContent], {type: "text/plain"});
      var saveAs = window.saveAs;
      saveAs(blob, filename + ".txt");
    }

    else if (format == "csv") {
      var csv = Papa.unparse(data);
      var blob = new Blob([csv], {type: "application/csv"});
      var saveAs = window.saveAs;
      saveAs(blob, filename + ".csv");
    }

    else if (format == "json") {
      var json = JSON.stringify(data, null, 2);
      var blob = new Blob([json], {type: "application/json"});
      var saveAs = window.saveAs;
      saveAs(blob, filename + ".json");
    }
  });
}
