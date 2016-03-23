(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'appProva',
            template: '<h1>Primera aplicació amb Angular2, {{nom}}</h1>'
        })
        .Class({
            constructor: function () {
                this.nom = "Sergi"
            }
        });
})(window.app || (window.app = {}));