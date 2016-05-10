(function (app) {
    app.AI =
        ng.core.Component({
            selector: 'joc',
            templateUrl: "app/joc.html",
            directives: [app.AppComponent]
        })
            .Class({
            constructor: function () {
                this.nom = "Ivan";
                console.log(this.nom);
            }
        });
})(window.app || (window.app = {}));
