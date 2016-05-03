(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'joc',
            templateUrl: "app/joc.html"
        })
        .Class({
            constructor: function () {
                this.nom = "Sergi"
            }
        });
})(window.app || (window.app = {}));