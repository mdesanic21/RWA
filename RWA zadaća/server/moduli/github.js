const konf = require(".././konfiguracija.js");

exports.dajGithubAuthURL = function(povratniURL, clientID){
	let url = "https://github.com/login/oauth/authorize?client_id="+
	clientID+"&redirect_uri="+povratniURL;
	return url;
}

exports.dajAccessToken = async function(dobiveniKod, clientID, secret){
	let parametri = {method: "POST", headers: {Accept: "application/json"}}
	let urlParametri = "?client_id="+clientID+"&client_secret="+secret+"&code="+dobiveniKod;
	let o = await fetch("https://github.com/login/oauth/access_token"+urlParametri,parametri);
	let podaci = await o.text();
	console.log(podaci);
	return  JSON.parse(podaci).access_token;
}

exports.provjeriToken = async function(token){
	let parametri = {method: "GET", headers: {Authorization: "Bearer "+token}}
	let o = await fetch("https://api.github.com/user",parametri);
	let podaci = await o.text();
	return podaci;
}