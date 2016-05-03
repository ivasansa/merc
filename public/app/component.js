(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'joc',
            // template: "<table></table>"
            templateURL: "/joc.html"
        })
        .Class({
            constructor: function () {
                this.nom = "Sergi"
            }
        });
})(window.app || (window.app = {}));