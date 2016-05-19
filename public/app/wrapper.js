(function (app) {
    app.Wrapper =
        ng.core.Component({
            selector: 'wrapper',
            templateUrl: "app/wrapper.html"
        })
            .Class({
            constructor: function () {
                this.nom = "Ivan";
                console.log(this.nom);
            },
            hide: function () {
                this.visible = !this.visible;
            }
        });
})(window.app || (window.app = {}));
