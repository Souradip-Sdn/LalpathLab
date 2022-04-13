var langCodeList = "en-in,hi-in,gu-in,bn-in,mr-in,ta-in,te-in,kn-in,ml-in,pa-in";
document.onreadystatechange = function () {
var Hostname = location.host;
var lngDDL = document.getElementById("P9LngDdl");
s = window.location.pathname.substr(1).split("/"),
    i = s[0];
    if (langCodeList.indexOf(i) > -1) {
        if (i) {
            lngDDL.value = i;
        }
	}
}

function SetLanguage() {
	var e = getMoxCookie("lang"),
	a = document.getElementById("P9LngDdl");
	e && window.location.pathname.indexOf(e) < 0 && RedurectUrl(e),
	e && a && (document.getElementById("P9LngDdl").value = e)
}
function ChangeLanguage(e) {
	var a = e.options[e.selectedIndex].value;
	removeMoxCookie("lang", ""),
	"en-in" != a && setMoxCookie("lang", a),
	RedurectUrl(a)
}
function RedurectUrl(e) {
	var a = "",
	s = window.location.pathname.substr(1).split("/"),
	i = s[0];
	if (langCodeList.indexOf(i) > -1)
		if ("en-in" == e)
			s = s.slice(1), a = window.location.protocol + "//" + window.location.host + "/" + s.join("/");
		else {
			s[0] = e;
			var n = s.join("/");
			a = n == e ? window.location.protocol + "//" + window.location.host + "/" + n + "/" : window.location.protocol + "//" + window.location.host + "/" + n
		}
	else
		a = window.location.protocol + "//" + window.location.host + "/" + e + window.location.pathname;
	window.location = a
}
function setMoxCookie(e, a) {
	getMoxCookie(e)
}
function getMoxCookie(e) {
	var a = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
	return a ? a[2] : null
}
function removeMoxCookie(e) {
	document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}