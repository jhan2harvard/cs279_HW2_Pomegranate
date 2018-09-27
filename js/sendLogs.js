// Logs submission function
// submits to the google form at this URL:
// docs.google.com/forms/d/e/1FAIpQLSeUHh-TERHWukZuiGvjxAigHKAt9E7wACr5X0S4H66QD_YQGw/viewform
function sendLogs(
    participant,
    accuracy,
    ephemeral,
    block,
    trial,
    elapsed,
    mistakes,
    word,
    menu,
    item) {
  var formid = "e/1FAIpQLSeUHh-TERHWukZuiGvjxAigHKAt9E7wACr5X0S4H66QD_YQGw";
  var data = {
    "entry.78011866": participant,
    "entry.1003383790": accuracy,
    "entry.1168172662": ephemeral,
    "entry.1412021999": block,
    "entry.1591794659": trial,
    "entry.693516704": elapsed,
    "entry.144313547": mistakes,
    "entry.1604857113": word,
    "entry.1854523194": menu,
    "entry.2111630840": item
  };
  var params = [];
  for (key in data) {
    params.push(key + "=" + encodeURIComponent(data[key]));
  }
  // Submit the form using an image to avoid CORS warnings.
  (new Image).src = "https://docs.google.com/forms/d/" + formid +
     "/formResponse?" + params.join("&");
}
