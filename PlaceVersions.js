// Update the placeId here
// Go to http://api.roblox.com/docs
// Paste this script into the console

var placeId = 1818; // put your placeId here

function getPage(placeId, pageNumber, callback) {
	var url = "https://api.roblox.com/assets/" + placeId + "/versions?page=" + pageNumber;
	$.ajax({
		url: url,
		method: "GET",
		dataType: "json",
		success: function(results) {
			callback(results);
		}
	});
}

function getAllPages(placeId, pageNumber) {
	getPage(placeId, pageNumber, function(results) {
		for (var i = 0; i<results.length; i++) {
			var version = results[i];
			var downloadUrl = "https://roblox.com/asset/?assetVersionId="+version.Id;
			var date = new Date(version.Created).toISOString().substring(0, 10);
			console.log("V" + version.VersionNumber + " (" + date + ")" + ": " + downloadUrl);
		}
			
		if (results.length > 0) {
			getAllPages(placeId, pageNumber + 1);
		}
	});
}

getAllPages(placeId, 1);
