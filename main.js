(function () {
    var setRowBackgroundColor = function (color) {
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
    var elements = document.getElementsByTagName('input');
    for (var x in elements) {
        var element = elements[x];
        element.value = window.localStorage.getItem(element.name);
        if (element.name === 'background') {
            element.oninput = function () {
                window.localStorage.setItem(this.name, this.value);
                setBackgroundImage(this.value);
            };
        }
        if (element.name === 'row_color') {
            $(element).spectrum({
                color: window.localStorage.getItem(element.name),
                preferredFormat: "hex",
                showInput: true,
                allowEmpty: true,
                showAlpha: true,
                move: function (color) {
                    window.localStorage.setItem('row_color', color);
                    setRowBackgroundColor(color)
                },
            })
        }
        if (element.name === 'text_color') {
            $(element).spectrum({
                color: window.localStorage.getItem(element.name),
                preferredFormat: "hex",
                showInput: true,
                allowEmpty: true,
                showAlpha: true,
                move: function (color) {
                    window.localStorage.setItem('text_color', color);
                    setTextColor(color)
                },
            })
        }
    }
    setChange('background', setBackgroundImage);
    setChange('row_color', setRowBackgroundColor);
    setChange('text_color', setTextColor);
})();
(function () {
    var elements = document.getElementsByClassName('graph');
    if (elements.length > 0) {
        for (var x in elements) {
            var element = elements[x];
            var wrapper = document.createElement('div');
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
            wrapper.className = 'graph_wrapper';
        }
    }
    var elements = document.getElementsByTagName('label');
    if (elements.length > 0) {
        for (var x in elements) {
            var element = elements[x];
            var wrapper = document.createElement('p');
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        }
    }
})();

