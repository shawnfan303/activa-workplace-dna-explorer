const INITIAL_COUNT = 3899;
const SHEET_NAME = "UsageCounter";

function doGet(event) {
  const action = String(event.parameter.action || "get");

  if (action === "increment") {
    return jsonResponse({ count: incrementCounter() });
  }

  return jsonResponse({ count: getCounter() });
}

function getCounter() {
  const sheet = getCounterSheet();
  const value = Number(sheet.getRange("B2").getValue());
  return Number.isFinite(value) ? Math.max(INITIAL_COUNT, value) : INITIAL_COUNT;
}

function incrementCounter() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getCounterSheet();
    const current = getCounter();
    const next = current + 1;
    sheet.getRange("B2").setValue(next);
    sheet.getRange("B3").setValue(new Date());
    return next;
  } finally {
    lock.releaseLock();
  }
}

function getCounterSheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) {
    throw new Error("Missing Script Property: SPREADSHEET_ID");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (!sheet.getRange("A1").getValue()) {
    sheet.getRange("A1:B3").setValues([
      ["Metric", "Value"],
      ["count", INITIAL_COUNT],
      ["updatedAt", new Date()]
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
