import { MODAL_DIRECTIVES } from 'ng2-bs3-modal';

(function (app) {
    app.Modal =
        ng.core.Component({
            selector: 'modal',
            templateUrl: "app/modal.html",
            directives: [MODAL_DIRECTIVES]
        })
            .Class({
            constructor: function () {
                this.nom = "Ivan";
                console.log(this.nom);
            }
        });
})(window.app || (window.app = {}));
