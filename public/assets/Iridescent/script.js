var Iridescent = {
    body: null,
    text: null
};

Iridescent.Color = function(r = 0, g = 0, b = 0) {
    this.red   = Math.trunc(r) % 256;
    this.green = Math.trunc(g) % 256;
    this.blue  = Math.trunc(b) % 256;
};

Iridescent.Color.fromFloat = function(r, g, b) {
    return new Iridescent.Color(
        Math.trunc(r * 255),
        Math.trunc(g * 255),
        Math.trunc(b * 255)
    );
}

Iridescent.Color.fromRelativeCoordinates = function(x, y) {
    return Iridescent.Color.fromFloat(
        x, Math.sqrt(x * x + y * y) / Math.SQRT2, y
    );
}

Iridescent.Color.random = function() {
    return Iridescent.Color.fromRelativeCoordinates(
        Math.random(),
        Math.random()
    );
}

Iridescent.init = function(body, text) {
    Iridescent.body = body;
    Iridescent.text = text;
};

Iridescent.getColor = function() {
    var colorRedExp = /rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})(,|\))/i,
        spaceRegExp = /\s/g;

    var matches = colorRegExp.exec(
        Iridescent.body.style.backgroundColor.replace(spaceRegExp, '')
    );

    return new Iridescent.Color(
        parseInt(matches[1]),
        parseInt(matches[2]),
        parseInt(matches[3])
    );
};

Iridescent.setColor = function(color) {
    var r = color.red,
        g = color.green,
        b = color.blue;

    Iridescent.body.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    Iridescent.text.style.color = "rgb(" + (255 - r) + ", " + (255 - g) + ", " + (255 - b) + ")";
    Iridescent.text.style.textShadow = "0px 0px 1px rgb(" +
                                           Math.abs(127 - Math.trunc(r / 2)) + ", " +
                                           Math.abs(127 - Math.trunc(g / 2)) + ", " +
                                           Math.abs(127 - Math.trunc(b / 2)) +
                                       "), 0px 0px 20px";
};
