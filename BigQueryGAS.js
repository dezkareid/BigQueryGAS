function doGet(request) {
  return ContentService.createTextOutput(getWikis())
    .setMimeType(ContentService.MimeType.JSON);
}

function getWikis() {
  
  var projectId = 'Your-id-project';

  var request = {
    query: 'SELECT * FROM publicdata:samples.wikipedia LIMIT 10; ' 
  };
  var queryResults = BigQuery.Jobs.query(request, projectId);
  var jobId = queryResults.jobReference.jobId;
  var sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  var rows = queryResults.rows;
  var json=[];
  for (index in rows){
    articulo = {"titulo":rows[index].f[0]["v"]};
    json.push(articulo);
    
  }

  return JSON.stringify({resultados : json});
    
  
}