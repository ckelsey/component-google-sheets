# component-google-sheets

Read/write to google sheets

### Populate sheets.config.json in the root of your project

  - sheetId: The id of the sheet to work with.
  - scriptId: The id of the script added to the sheet. A sample of the script is in the root of this repo.
  - domain: The domain of the google account, i.e. ckcreates.com.

### Create a sheet on Google Sheets
  - The first row must be headers.
  - Go to file->publish to the web, select entire document and click publish.

### Add the app script
  - Copy the contents of Google-sheets-app-script.js in the root of the repo.
  - On Google sheets, go to Tools->Script editor, paste and save.
  - Go to Publish->Deploy as web app.
  - Under "Who has access to the app", select "Anyone, even anonymous".
  - Click Deploy.

### googleSheetsService
   - worksheets - an object of worksheets in the sheet, with id and title properties.
   - read(worksheet, query)
        - Optional worksheet id argument, defaults to the first worksheet.
        - Optional query object. {"Key to search": { "operator, i.e. > or like": "value"}}
   - create(data, worksheet)
      - data - an array of row objects - [{header: value, header: value}, ...]. Headers will be appended to sheet if they don't already exist.
      - Optional worksheet id argument, defaults to the first worksheet.


