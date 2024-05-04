const konf = require(".././konfiguracija.js");

exports.provjeriRecaptchu = async function (token, secretCaptcha){
	console.log("ReCaptcha token: ", token);
	let parametri = {method: 'POST'}
	let o = await fetch("https://www.google.com/recaptcha/api/siteverify?secret="+secretCaptcha+"&response="+token,parametri);
	let recaptchaStatus = JSON.parse(await o.text());

	//ispis statusa reCaptche
	console.log(recaptchaStatus);
	if(recaptchaStatus.success && recaptchaStatus.score > 0.5)
		return true;
	return false;
}