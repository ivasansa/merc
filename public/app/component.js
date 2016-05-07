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
                this.card = new app.Card('ElRiperino', 'CI', 10, 'melee', 'images/ElRiperino.png');
                this.cards.push(this.card);
                this.card = new app.Card('ElMartinene', 'CI', 10, 'knight', 'images/prova.png');
                this.cards.push(this.card);
                this.card = new app.Card('Blackburn', 'CI', 10, 'archer', 'images/Blackburn.png');
                this.cards.push(this.card);
                
                this.SRanged = [];
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
                console.log("GETDATA" +ev.target.id);
                // ev.dataTransfer.clearData();
            },
            handleDrop: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var node = document.createElement("img");
                node.src = data;
                console.log(data);
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                
                this.SRanged.push(node);
            
                console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            }
        });
})(window.app || (window.app = {}));


(function(app) {
  app.Card = Card;

    function Card(name, clan, power, type, image) {
        this.name = name;
        this.clan = clan;
        this.power = power;
        this.type = type;
        this.image = image;
    }
})(window.app || (window.app = {}));