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
                
                this.card = new app.Merc('ElRiperino', 'CI', 1, 'melee', 'images/ElRiperino.png');
                this.game.SHand.push(this.card);
                // this.card = new app.Card('ElMartinene', 'CI', 2, 'cav', 'images/prova.png');
                // this.game.SHand.push(this.card);
                this.card = new app.Merc('Blackburn', 'CI', 3, 'ranged', 'images/Blackburn.png');
                this.game.SHand.push(this.card);
                this.card = new app.Map('Ruins', 1, 2, 1, 'images/prova.png');
                this.game.SHand.push(this.card);
                
                console.log(this.game.SHand);
                
                
            },
            playMap: function (card) {
                var node = document.createElement("img");
                node.src = card;
            
                
                var img = "";
                var res = "";
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    
                    res = card.slice(-img);
                    if((res == this.game.SHand[i].image)&&(this.game.SHand[i].constructor.name == "Map")){
                        this.game.map.push(node);
                        this.game.points[0] *= this.game.SHand[i].rangedBuff;
                        this.game.points[1] *= this.game.SHand[i].cavBuff;
                        this.game.points[2] *= this.game.SHand[i].meleeBuff;
                        this.game.points[3] *= this.game.SHand[i].meleeBuff;
                        this.game.points[4] *= this.game.SHand[i].cavBuff;
                        this.game.points[5] *= this.game.SHand[i].rangedBuff;
                        this.game.SHand.splice(i, 1);
                    }
                }
            },
            playCard: function (card, box) {
                var node = document.createElement("img");
                node.src = card;
                switch(box) {
                    case 0:
                        this.game.FRanged.push(node);
                        break;
                    case 1:
                        this.game.FCav.push(node);
                        break;
                    case 2:
                        this.game.FMelee.push(node);
                        break;
                    case 3:
                        this.game.SMelee.push(node);
                        break;
                    case 4:
                        this.game.SCav.push(node);
                        break;
                    case 5:
                        this.game.SRanged.push(node);
                        break;
                }
                
                var img = "";
                var res = "";
                var buff = 1;
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    
                    res = card.slice(-img);
                    if(res == this.game.SHand[i].image){
                        if(undefined != this.game.map[0]){
                            switch(box) {
                                case 3:
                                    buff = this.game.map.meleeBuff;
                                    break;
                                case 4:
                                    buff = this.game.map.cavBuff;
                                    break;
                                case 5:
                                    buff = this.game.map.rangedBuff;
                                    break;
                            }
                        }
                        this.game.points[box] += (this.game.SHand[i].power*buff);
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
                // var node = document.createElement("img");
                // node.src = data;
                // console.log(data);
                // // ev.target.appendChild(node);
                
                // // ev.target.appendChild(ng.core.ViewChild(data));
                // this.game.SRanged.push(node);
                this.playCard(data,5);
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            },
            handleDropSCav: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                // var node = document.createElement("img");
                // node.src = data;
                // console.log("SCav");
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                
                // this.game.SCav.push(node);
                // this.addPoints(data, 4);
                this.playCard(data,4);
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            },
            
            handleDropSMelee: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                // var node = document.createElement("img");
                // node.src = data;
                // console.log("SCav");
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                
                // this.game.SMelee.push(node);
                // this.addPoints(data, 3);
                this.playCard(data,3);
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            },
            
            handleDropMap: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                // var node = document.createElement("img");
                // node.src = data;
                // console.log("SCav");
                // ev.target.appendChild(node);
                
                // ev.target.appendChild(ng.core.ViewChild(data));
                if(this.game.map.length == 0){
                    // this.game.map.push(node);
                    this.playMap(data);
                }
                // console.log("node"+this.cards.indexOf(data));
                ev.dataTransfer.clearData();
            }
            
        });
})(window.app || (window.app = {}));


(function(app) {
  app.Merc = Merc;

    function Merc(name, clan, power, type, image) {
        this.name = name;
        this.clan = clan;
        this.power = power;
        this.type = type;
        this.image = image;
    }
})(window.app || (window.app = {}));

(function(app) {
  app.Map = Map;

    function Map(name, rangedBuff, cavBuff, meleeBuff, image) {
        this.name = name;
        this.meleeBuff = meleeBuff;
        this.cavBuff = cavBuff;
        this.rangedBuff = rangedBuff;
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
        // this.zones = [this.FDeck,this.FDiscards,this.FHand,this.FRanged,this.FCav,this.FMelee,
        //               this.SMelee, this.SCav,this.SRanged,this.SHand,this.SDiscards,this.SDeck];
    }
})(window.app || (window.app = {}));
