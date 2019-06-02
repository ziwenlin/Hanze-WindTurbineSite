(function () {
    var newRequest = function (url, func) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    func(httpRequest.responseText);
                }
            }
        };
        httpRequest.open('GET', url, true);
        httpRequest.send();
    };
    var addContent = function (text) {
        var mains = document.getElementsByTagName('main');
        if (mains.length > 0) {
            mains[0].innerHTML = document.navigation + text;
        }
        window.dispatchEvent(new Event('load'));
    };
    var addContentMain = function (text) {
        document.navigation = text;
    };
    var addGrid = function () {
        document.masonry = new Masonry('main', {
            columnWidth: '.grid_item',
            itemSelector: '.grid_item',
            percentPosition: true,
            gutter: 10
        });
    };
    var wrapElement = function (element_name, element_wrapper, class_wrapper = '') {
        var elements = document.querySelectorAll(element_name);
        if (elements.length > 0) {
            for (var x in elements) {
                var element = elements[x];
                if (elements.length > x) {
                    var wrapper = document.createElement(element_wrapper);
                    element.parentNode.insertBefore(wrapper, element);
                    wrapper.appendChild(element);
                    wrapper.className = class_wrapper;
                }
            }
        }

    };
    var inputEventMaker = function () {
        var elements_input = document.getElementsByTagName('input');
        for (var x in elements_input) {
            var element_input = elements_input[x];
            if (element_input.name === 'background') {
                element_input.value = window.localStorage.getItem(element_input.name);
                element_input.oninput = function () {
                    this.select();
                    window.localStorage.setItem('background', this.value);
                    window.localStorage.setItem('restore_settings', getUrlVars());
                    setBackgroundImage(this.value);
                    if (this.value === '') document.body.style.backgroundImage = '';
                };
            }
            if (element_input.name === 'copy_url') {
                element_input.value = window.location.host + window.location.pathname + '?' +  getUrlVars();
                element_input.onclick = function () {
                    this.select();
                    document.execCommand("copy");
                };
            }
            if (element_input.name === 'restore_settings') {
                element_input.onclick = function () {
                    localStorage.getItem('restore_settings').replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                        localStorage.setItem(key, value);
                    });
                    window.location.href = window.location.origin + window.location.pathname;
                };
            }
            if (element_input.name === 'row_color') {
                element_input.value = window.localStorage.getItem(element_input.name);
                $(element_input).spectrum({
                    color: window.localStorage.getItem(element_input.name),
                    preferredFormat: "hex",
                    showInput: true,
                    allowEmpty: true,
                    showAlpha: true,
                    move: function (color) {
                        window.localStorage.setItem('row_color', color);
                        window.localStorage.setItem('restore_settings', getUrlVars());
                        setRowColor(color)
                    },
                })
            }
            if (element_input.name === 'text_color') {
                element_input.value = window.localStorage.getItem(element_input.name);
                $(element_input).spectrum({
                    color: window.localStorage.getItem(element_input.name),
                    preferredFormat: "hex",
                    showInput: true,
                    allowEmpty: true,
                    showAlpha: true,
                    move: function (color) {
                        window.localStorage.setItem('text_color', color);
                        window.localStorage.setItem('restore_settings', getUrlVars());
                        setTextColor(color)
                    },
                })
            }
        }
    };
    var setUrlVars = function () {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            localStorage.setItem(key, value);
            vars[key] = value;
        });
        return vars;
    };
    var getUrlVars = function () {
        var url = '';
        var keys = ['background', 'row_color', 'text_color'];
        for (var x in keys) {
            var key = keys[x];
            if (localStorage.length > x++) {
                url += key + '=' + localStorage.getItem(key) + '&';
            }
        }
        url = url.replace(/\s+/g, '');
        console.log(url);
        return url.slice(0, -1);
    };
    var inputEventClear = function () {
        var elements = document.querySelectorAll('body > div');
        for (var x in elements) {
            var element = elements[x];
            element.outerHTML = '';
        }
    };
    var setNavigation = function () {
        var navigations = document.getElementsByClassName('nav');
        if (navigations.length > 0) {
            for (var x in navigations) {
                var navigation = navigations[x];
                if (navigations.length > x) {
                    navigation.onclick = function () {
                        var url = this.getAttribute('href');
                        newRequest(url, addContent);
                    };
                }
            }
        }
    };
    var setRowColor = function (color) {
        var rows = document.getElementsByClassName('row');
        if (rows.length > 0) {
            for (var y in rows) {
                if (y < rows.length)
                    rows[y].style.backgroundColor = color;
            }
        }
    };
    var setBackgroundImage = function (url) {
        document.body.style.backgroundImage = 'url(%s)'.replace('%s', url);
    };
    var setTextColor = function (color) {
        document.body.style.color = color;
    };
    var setChange = function (str, func) {
        var prop = localStorage.getItem(str);
        if (prop !== "" && prop != null) func(prop);
    };
    document.navigation = document.querySelector('main').innerHTML;
    newRequest('navigation.html', addContentMain);
    setTimeout(newRequest, 100, 'home.html', addContent);
    window.addEventListener("load", function () {
        setUrlVars();
        setNavigation();
        inputEventClear();
        inputEventMaker();
        setChange('background', setBackgroundImage);
        setChange('row_color', setRowColor);
        setChange('text_color', setTextColor);
        wrapElement('.graph', 'div', 'graph_wrapper');
        wrapElement('label', 'p');
        addGrid();
    });
})();


