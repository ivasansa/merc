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
        
    app.AppComponentDos =
        ng.core.Component({
            selector: 'appProva2',
            template: '<h1>Primera aplicació amb Angular2, {{nom}}</h1>'
        })
        .Class({
            constructor: function () {
                this.nom = "Ivan"
            }
        });
})(window.app || (window.app = {}));