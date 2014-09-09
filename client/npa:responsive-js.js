var ResponsiveJS = function () {
    var that = this,
        R = Response;

    this._isTablet = true;
    this._isMobile = false;
    this._isDesktop = false;
    this._width = 0;
    this._height = 0;

    R.action(function () {
        that.setViewPort(R.viewportW(), R.viewportH());
    });

    this._tabletMinWidth = 400;
    this._deps = new Tracker.Dependency();
    this._orientationDeps = new Tracker.Dependency();

};

ResponsiveJS.prototype.setViewPort = function (width, height) {
    if (this._width != width || this._height !== height) {
        this._width = width;
        this._height = height;
        this._orientationDeps.changed();
    }

    if (this.isTouchDevice()) {
        if (this._width >= this._tabletMinWidth) {
            if (!this._isTablet) {
                this._isTablet = true;
                this._isMobile = false;
                this._deps.changed();
            }
        } else {
            if (!this._isMobile) {
                this._isTablet = false;
                this._isMobile = true;
                this._deps.changed();
            }
        }
    } else {
        if (!this._isDesktop) {
            this._isDesktop = true;
            this._isMobile = false;
            this._isTablet = false;
            this._deps.changed();
        }
    }
};

ResponsiveJS.prototype.isTouchDevice = function () {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

ResponsiveJS.prototype.isMobile = function () {
    this._deps.depend();
    return this._isMobile;
};

ResponsiveJS.prototype.isPortrait = function () {
    this._orientationDeps.depend();
    return this._width < this._height;
};

ResponsiveJS.prototype.isLandscape = function () {
    this._orientationDeps.depend();
    return this._width > this._height;
};


ResponsiveJS.prototype.isTablet = function () {
    this._deps.depend();
    return this._isTablet;
};

ResponsiveJS.prototype.isDesktop = function () {
    this._deps.depend();
    return this._isDesktop;
};

var resposive = new ResponsiveJS();

UI.registerHelper("isMobile", function () {
    return resposive.isMobile();
});

UI.registerHelper("isTablet", function () {
    return resposive.isTablet();
});


UI.registerHelper("isPortrait", function () {
    return resposive.isPortrait();
});


UI.registerHelper("isLandscape", function () {
    return resposive.isLandscape();
});


UI.registerHelper("isDesktop", function () {
    return resposive.isDesktop();
});


