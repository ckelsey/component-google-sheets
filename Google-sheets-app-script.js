/* GOOGLE SCRIPT */

/******************************************************************************
* Based on the work of Martin Hawksey twitter.com/mhawksey  *
******************************************************************************/

function doGet(e) {
	try {
		record_data(e);

		return ContentService
			.createTextOutput(
			JSON.stringify({
				"result": "success",
				"data": JSON.stringify(e.parameters)
			}))
			.setMimeType(ContentService.MimeType.JSON);
	} catch (error) {
		return ContentService
			.createTextOutput(JSON.stringify({ "result": "error", "error": e }))
			.setMimeType(ContentService.MimeType.JSON);
	}
}

/**
* record_data inserts the data received from the html form submission
* e is the data received from the POST
*/
function record_data(e) {
	try {
		var data = JSON.parse(decodeURIComponent(e.parameter.data));
		var sheetId = e.parameter.sheetId;
		var sheetName = e.parameter.sheet;
		var doc = SpreadsheetApp.openById(sheetId);
		var sheet = doc.getSheetByName(sheetName);
		var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
		var dontUpdateHeaders = e.parameter.dontUpdateHeaders;

		for (var d = 0; d < data.length; d++) { // loop through the array
			var nextRow = sheet.getLastRow() + 1; // get next row
			var row = [new Date()]; // first element in the row should always be a timestamp

			if (!dontUpdateHeaders) {
				var headersNeedUpdate = false;
				var theseHeaders = Object.keys(data[d]);
				Logger.log(JSON.stringify(theseHeaders));
				Logger.log(JSON.stringify(headers));

				for (var h = 0; h < theseHeaders.length; h++) {
					if (headers.indexOf(theseHeaders[h]) === -1) {
						headers.push(theseHeaders[h]);
						headersNeedUpdate = true;
					}
				}

				if (headersNeedUpdate) {
					sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
				}
			}

			// loop through the header columns
			for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
				if (headers[i].length > 0) {
					row.push(data[d][headers[i]]); // add data to row
				}
			}

			sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
		}
	}
	catch (error) {
		// Logger.log(e);
	}
	finally {
		return;
	}
}

function setup() { }