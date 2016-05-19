(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platform.browser.bootstrap(app.Wrapper);
        ng.platform.browser.bootstrap(app.AppComponent);
    });
})(window.app || (window.app = {}));
