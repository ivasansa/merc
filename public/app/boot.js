(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        // ng.platform.browser.bootstrap(app.AI);
        ng.platform.browser.bootstrap(app.AppComponent);
    });
})(window.app || (window.app = {}));
