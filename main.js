
var elements = document.getElementsByTagName('input');
for (var x in elements) {
    var element = elements[x];
    element.oninput = function () {
        window.localStorage.setItem(this.name, this.value);
        document.body.style.backgroundImage = 'url(%s)'.replace('%s', this.value);
    };
    element.value = window.localStorage.getItem(element.name);
}
var background = window.localStorage.getItem('background');
if (background !== "" && background != null) {
    document.body.style.backgroundImage = 'url(%s)'.replace('%s', background);
}