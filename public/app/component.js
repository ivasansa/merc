(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'joc',
            templateUrl: "app/joc.html"

        })
            .Class({
            constructor: function () {
                // this.cards = [];
                this.dragging = false;
                
                // this.Map = [];
                // this.SMelee = [];
                // this.SCav = [];
                // this.SRanged = [];
                // this.FDeck = [];
                // this.FDiscards = [];
                // this.FHand = [];
                // this.FRanged = [];
                // this.FCav = [];
                // this.FMelee = [];
                // this.SHand = [];
                // this.SDiscards = [];
                // this.SDeck = [];
                
                // this.points = [0,0,0,0,0,0];
                
                this.game = new app.Game("Player1", "Player2", this.cards, this.cards);
                
                this.card = new app.Card('ElRiperino', 'CI', 1, 'melee', 'images/ElRiperino.png');
                this.game.SHand.push(this.card);
                this.card = new app.Card('ElMartinene', 'CI', 2, 'cav', 'images/prova.png');
                this.game.SHand.push(this.card);
                this.card = new app.Card('Blackburn', 'CI', 3, 'ranged', 'images/Blackburn.png');
                this.game.SHand.push(this.card);
                
                
                console.log(this.game.SHand);
                
                
            },
            addPoints: function (card, box) {
                // console.log("add "+card);
                // console.log(this.SHand[0]);
                var img = "";
                var res = "";
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    
                    res = card.slice(-img);
                    // console.log("1: "+res);
                    // console.log("1: "+this.SHand[i].image);
                    if(res == this.game.SHand[i].image){
                        this.game.points[box] += this.game.SHand[i].power;
                        // console.log("Points: "+this.points[box]);
                    }
                }
            },
            removeCardFromHand: function (card) {
                // console.log("remove "+card);
                // console.log(this.SHand[0]);
                var img = "";
                var res = "";
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    
                    res = card.slice(-img);
                    // console.log("1: "+res);
                    // console.log("1: "+this.SHand[i].image);
                    if(res == this.game.SHand[i].image){
                        // console.log("found");
                        this.game.SHand.splice(i, 1);
                    }
                }
            },
            handleDragEnter: function (ev) {
                ev.preventDefault();
                this.dragging = true;
                // console.log(this.dragging);
            },
            handleDragLeave: function (ev) {
                ev.preventDefault();
                this.dragging = false;
                // console.log(this.dragging);
            },
            handleDrag: function (ev) {
                ev.dataTransfer.setData("text", ev.target.id);
                // console.log("GETDATA" +ev.target.id);
                // ev.dataTransfer.clearData();
            },
            handleDropSRanged: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var node = document.createElement("img");
                node.src = data;
                // console.log(data);
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                
                this.game.SRanged.push(node);
                this.addPoints(data, 5);
                this.removeCardFromHand(data);
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            },
            handleDropSCav: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var node = document.createElement("img");
                node.src = data;
                // console.log("SCav");
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                
                this.game.SCav.push(node);
                this.addPoints(data, 4);
                this.removeCardFromHand(data);
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            },
            
            handleDropSMelee: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var node = document.createElement("img");
                node.src = data;
                // console.log("SCav");
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                
                this.game.SMelee.push(node);
                this.addPoints(data, 3);
                this.removeCardFromHand(data);
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            },
            
            handleDropMap: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var node = document.createElement("img");
                node.src = data;
                // console.log("SCav");
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                if(this.game.map.length == 0){
                    this.game.map.push(node);
                    this.removeCardFromHand(data);
                }
                // console.log("node"+this.cards.indexOf(data));
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

(function(app) {
  app.Game = Game;

    function Game(FPlayer, SPlayer, FDeck, SDeck) {
        this.FPlayer = FPlayer;
        this.SPlayer = SPlayer;
        this.FDeck = FDeck;
        this.FDiscards = [];
        this.FHand = [];
        this.FRanged = [];
        this.FCav = [];
        this.FMelee = [];
        this.SMelee = [];
        this.SCav = [];
        this.SRanged = [];
        this.SHand = [];
        this.SDiscards = [];
        this.SDeck = [];
        this.map = [];
        this.points = [0,0,0,0,0,0];
    }
})(window.app || (window.app = {}));