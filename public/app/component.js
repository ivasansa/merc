(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'joc',
            templateUrl: "app/joc.html",
        })
            .Class({
            constructor: function () {
                // this.cards = [];
                this.dragging = false;

                
                this.game = new app.Game("Player1", "Player2", this.cards, this.cards);
                
                this.card = new app.Merc('ElRiperino', 'CI', 4, 'melee', 'images/ElRiperino.png');
                this.game.FHand.push(this.card);
                this.game.SHand.push(this.card);
                
                this.card = new app.Merc('Blackburn', 'CI', 4, 'ranged', 'images/Blackburn.png');
                this.game.FHand.push(this.card);
                this.game.SHand.push(this.card);
                
                this.card = new app.Merc('ElMartinenc', 'CI', 6, 'cav', 'images/ElMartinenc.png');
                this.game.FHand.push(this.card);
                this.game.SHand.push(this.card);
                
            
                this.card = new app.Map('Ruins', 1, 2, 1, 'images/prova.png');
                this.game.FHand.push(this.card);
                this.game.SHand.push(this.card);
                
                console.log(this.game.SHand);
                
                
            },
            computerPlay: function () {
                var node = document.createElement("img");
                var rand = this.game.FHand[Math.floor(Math.random() * this.game.FHand.length)];
                var buff = 1;
                var i = this.game.FHand.indexOf(rand);
                if(rand.constructor.name == "Merc"){
                    node.src = rand.image;
                    if(rand.type == "melee"){
                        this.game.FMelee.push(node);
                        if(undefined != this.game.map[0]){
                            buff *= this.game.map[0].meleeBuff;
                        }
                        /*Add the points*/
                        this.game.points[2] += (rand.power*buff);
                        /*Remove the card from the hand*/
                        this.game.FHand.splice(this.game.FHand.indexOf(rand), 1);
                    }else if(rand.type == "cav"){
                        this.game.FCav.push(node);
                        if(undefined != this.game.map[0]){
                            buff *= this.game.map[0].cavBuff;
                        }
                        /*Add the points*/
                        this.game.points[1] += (rand.power*buff);
                        /*Remove the card from the hand*/
                        this.game.FHand.splice(this.game.FHand.indexOf(rand), 1);
                    }else if(rand.type == "ranged"){
                        this.game.FRanged.push(node);
                        if(undefined != this.game.map[0]){
                            buff *= this.game.map[0].rangedBuff;
                        }
                        /*Add the points*/
                        this.game.points[0] += (rand.power*buff);
                        /*Remove the card from the hand*/
                        this.game.FHand.splice(i, 1);
                    }
                }else if ((rand.constructor.name == "Map")&&(this.game.map.length == 0)){
                    node.src = rand.image;
                    node.rangedBuff = rand.rangedBuff;
                    node.cavBuff = rand.cavBuff;
                    node.meleeBuff = rand.meleeBuff;
                    this.game.map.push(node);
                    this.game.points[0] *= rand.rangedBuff;
                    this.game.points[1] *= rand.cavBuff;
                    this.game.points[2] *= rand.meleeBuff;
                    this.game.points[3] *= rand.meleeBuff;
                    this.game.points[4] *= rand.cavBuff;
                    this.game.points[5] *= rand.rangedBuff;
                    this.game.SHand.splice(i, 1);
                }
                
                
                this.game.turn = true;
            },
            
            playMap: function (card) {
                var node = document.createElement("img");
                node.src = card;
            
                
                var img = "";
                var res = "";
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    
                    res = card.slice(-img);
                    if((res == this.game.SHand[i].image)&&
                        (this.game.SHand[i].constructor.name == "Map")&&(this.game.turn)){
                        node.rangedBuff = this.game.SHand[i].rangedBuff;
                        node.cavBuff = this.game.SHand[i].cavBuff;
                        node.meleeBuff = this.game.SHand[i].meleeBuff;
                        this.game.map.push(node);
                        this.game.points[0] *= this.game.SHand[i].rangedBuff;
                        this.game.points[1] *= this.game.SHand[i].cavBuff;
                        this.game.points[2] *= this.game.SHand[i].meleeBuff;
                        this.game.points[3] *= this.game.SHand[i].meleeBuff;
                        this.game.points[4] *= this.game.SHand[i].cavBuff;
                        this.game.points[5] *= this.game.SHand[i].rangedBuff;
                        this.game.SHand.splice(i, 1);
                        /**/
                        this.game.turn = false;
                        this.computerPlay();
                    }
                }
            },
            
            playCard: function (card, box) {
                /*Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                
                
                var img = "";
                var res = "";
                var buff = 1;
                var cardTypeF = -1;
                var cardTypeS = -1;
                
            
                /*Loop over the player's hand to check what card he had just played*/
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    res = card.slice(-img);
                    /*In order to avoid misplacing a card, we check its type*/
                    switch(this.game.SHand[i].type) {
                        case "melee":
                            cardTypeF = 2;
                            cardTypeS = 3;
                            break;
                        case "cav":
                            cardTypeF = 1;
                            cardTypeS = 4;
                            break;
                        case "ranged":
                            cardTypeF = 0;
                            cardTypeS = 5;
                            break;
                    }
                    /*If it is the card he just played and it's the right place...*/
                    if((res == this.game.SHand[i].image)&&((box == cardTypeF)||(box == cardTypeS))&&
                        ((this.game.SHand[i].constructor.name == "Merc"))&&(this.game.turn)){
                        /*...Place it on the zone*/
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
                        /*Check if a map is on the board*/
                        if(undefined != this.game.map[0]){
                            switch(box) {
                                case 0:
                                    buff *= this.game.map[0].rangedBuff;
                                    break;
                                case 1:
                                    buff *= this.game.map[0].cavBuff;
                                    break;
                                case 2:
                                    buff *= this.game.map[0].meleeBuff;
                                    break;
                                case 3:
                                    buff *= this.game.map[0].meleeBuff;
                                    break;
                                case 4:
                                    buff *= this.game.map[0].cavBuff;
                                    break;
                                case 5:
                                    buff *= this.game.map[0].rangedBuff;
                                    break;
                            }
                        }
                        /*Add the points*/
                        this.game.points[box] += (this.game.SHand[i].power*buff);
                        /*Remove the card from the hand*/
                        this.game.SHand.splice(i, 1);
                        /**/
                        this.game.turn = false;
                        this.computerPlay();
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
                this.playCard(data,5);
                ev.dataTransfer.clearData();
            },
            
            handleDropSCav: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data,4);
                ev.dataTransfer.clearData();
            },
            
            handleDropSMelee: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data,3);
                ev.dataTransfer.clearData();
            },
            
            handleDropMap: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                if(this.game.map.length == 0){
                    this.playMap(data);
                }
                ev.dataTransfer.clearData();
            },
            
            pass: function (ev) {
                if(this.game.turn == false){
                    this.game.turn = true;
                }else if(this.game.turn == true){
                    this.game.turn = false;
                }
                console.log(this.game.turn);
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
        this.turn = true; //false Computer
        this.tendency = 1;
        
    }
})(window.app || (window.app = {}));


