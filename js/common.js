window.onload = function(){
	fontSelf();
}
window.onresize = function () {
	fontSelf();
};
function fontSelf() {
	var wHtml = document.getElementsByTagName('html')[0];
	var w = document.documentElement.clientWidth;
	w =  w > 768 ? 768 : document.documentElement.clientWidth;
	wHtml.style.fontSize = w * 0.045 + 'px';
};
