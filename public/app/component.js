(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'joc',
            templateUrl: "app/joc.html"

        })
            .Class({
            constructor: function () {
                this.cards = [];
                this.dragging = false;
                this.card = new app.Card(1, 'ElRiperino', 10, 'melee', 'images/ElRiperino.png');
                this.cards.push(this.card);
                this.card = new app.Card(2, 'ElMartinenc', 10, 'knight', 'images/ElMartinenc.png');
                this.cards.push(this.card);
            },
            handleDragEnter: function (ev) {
                ev.preventDefault();
                this.dragging = true;
                console.log(this.dragging);
            },
            handleDragLeave: function (ev) {
                ev.preventDefault();
                this.dragging = false;
                console.log(this.dragging);
            },
            handleDrag: function (ev) {
                ev.dataTransfer.setData("text", ev.target.id);
                console.log("drag");
            },
            handleDrop: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var node = document.createElement("img");
                node.src = data;
                ev.target.appendChild(node);
                this.cards.push(data);
                console.log(this.card.name);
            }
        });
})(window.app || (window.app = {}));


(function(app) {
  app.Card = Card;

    function Card(id, name, power, type, image) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.type = type;
        this.image = image;
    }
})(window.app || (window.app = {}));