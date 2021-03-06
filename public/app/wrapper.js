(function (app) {
    app.Wrapper =
        ng.core.Component({
            selector: 'wrapper',
            pipes: [app.PipePersonalitzada, app.MeleePipe, app.CavPipe, app.RangedPipe, app.MapPipe],
            templateUrl: "app/wrapper.html",
            directives : [app.AppComponent]
        })
            .Class({
            constructor: function () {
                // this.cards = [];
                this.dragging = false;
                this.sort = [true,false,false,false];
                this.allCards = [];
                this.buffer = [];
                
                this.card = new app.Merc('ElRiperino', 'CI', 4, 'melee', 'images/ElRiperino.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('Blackburn', 'CI', 4, 'ranged', 'images/Blackburn.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('ElMartinenc', 'CI', 6, 'cav', 'images/ElMartinenc.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('Asediado', 'CI', 10, 'melee', 'images/Asediado.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('Blas de Lezo', 'CI', 7, 'melee', 'images/BlasdeLezo.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('Dume', 'CI', 9, 'cav', 'images/Dume.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('Sento', 'CI', 6, 'cav', 'images/Sento.png');
                this.allCards.push(this.card);
                
                this.card = new app.Merc('Toni Pepperoni', 'CI', 5, 'melee', 'images/ToniPepperoni.png');
                this.allCards.push(this.card);
                
                this.card = new app.Map('Ruins', 1, 2, 1, 'images/Ruins.png');
                this.allCards.push(this.card);
                this.buffer = this.allCards.slice();
                // this.allCardsMelee = this.allCards.slice();
                this.deckBuilder = new app.DeckBuilder(this.allCards, []);
                this.playDeck = [];
                this.allowedToPlay = false;
            },
            playCard: function (card) {
                /*Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                node.image = card;
                
                var img = "";
                
            
                /*Loop over the player's hand to check what card he had just played*/
                for(var i = 0; i < this.deckBuilder.allCards.length; ++i){
                    img = this.deckBuilder.allCards[i].image.length;
                    res = card.slice(-img);

                     if(res == this.deckBuilder.allCards[i].image){
                        for(var j = 0; j < this.buffer.length; ++j){
                            img = this.buffer[j].image.length;
                            res = node.image.slice(-img); 
                            // console.log(this.buffer[j].image+"|"+res); 
                            if(this.buffer[j].image == res && (this.buffer[j].power + this.deckBuilder.points) <=  this.deckBuilder.MAXPOWER){
                                this.deckBuilder.points += (this.buffer[j].power);
                                this.deckBuilder.allCards.splice(i, 1);
                                node.power =this.buffer[j].power;
                                this.deckBuilder.deck.push(node); 
                                this.playDeck.push(this.buffer[j]);
                            }
                        } 
                    }
                }
                if(this.deckBuilder.deck.length <= this.deckBuilder.MAXCARDS && this.deckBuilder.deck.length >= this.deckBuilder.MINCARDS){
                    this.allowedToPlay = true;
                    console.log(this.allowedToPlay);
                }else{
                    this.allowedToPlay = false;
                }
            },
            
            giveCard: function (card) {
                /*Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                node.image = card;
                
                var img = "";
                
                // console.log(this.deckBuilder.deck);
                /*Loop over the player's hand to check what card he had just played*/
                for(var i = 0; i < this.deckBuilder.deck.length; ++i){
                    img = this.deckBuilder.deck[i].image.length;
                    res = node.image.slice(-img);      

                     if(res == this.deckBuilder.deck[i].image){
                        
                        for(var j = 0; j < this.buffer.length; ++j){
                            img = this.buffer[j].image.length;
                            res = node.image.slice(-img); 
                            if(this.buffer[j].image == res){
                                this.deckBuilder.points -= (this.buffer[j].power);
                                node.type = this.buffer[j].type;
                                this.playDeck.splice(this.playDeck.indexOf(this.buffer[j]),1);
                            }
                        }
                        /*Add the points*/
                        /*Remove the card from the hand*/
                        this.deckBuilder.deck.splice(i, 1);
                        
                        this.deckBuilder.allCards.push(node);  
                        // this.playDeck.splice(i,1);
                        if(this.deckBuilder.deck.length >= this.deckBuilder.MINCARDS){
                            this.allowedToPlay = true;
                            console.log(this.allowedToPlay);
                        }else{
                            this.allowedToPlay = false;
                        }
                    }
                }
                
            },
            
            handleDragLeave: function (ev) {
                ev.preventDefault();
                this.dragging = false;
                // console.log(this.dragging);
            },
            
            handleDragEnter: function (ev) {
                ev.preventDefault();
                this.dragging = true;
                // console.log(this.dragging);
            },
            
            handleDrop: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data);
                ev.dataTransfer.clearData();
            },
            
            handleDropG: function (ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                console.log(data);
                this.giveCard(data);
                ev.dataTransfer.clearData();
            },
            
            sorterino: function (kind) {
                switch(kind) {
                        case 0:
                            this.sort[0] = true;
                            this.sort[1] = false;
                            this.sort[2] = false;
                            this.sort[3] = false;
                            this.sort[4] = false;
                            break;
                        case 1:
                            this.sort[0] = false;
                            this.sort[1] = true;
                            this.sort[2] = false;
                            this.sort[3] = false;
                            this.sort[4] = false;
                            break;
                        case 2:
                            this.sort[0] = false;
                            this.sort[1] = false;
                            this.sort[2] = true;
                            this.sort[3] = false;
                            this.sort[4] = false;
                            break;
                        case 3:
                            this.sort[0] = false;
                            this.sort[1] = false;
                            this.sort[2] = false;
                            this.sort[3] = true;
                            this.sort[4] = false;
                            break;
                        case 4:
                            this.sort[0] = false;
                            this.sort[1] = false;
                            this.sort[2] = false;
                            this.sort[3] = false;
                            this.sort[4] = true;
                            break;
                    }
            },
            
            hide: function () {
                this.visible = !this.visible;
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
        this.power = 0;
    }
})(window.app || (window.app = {}));

(function(app) {
  app.DeckBuilder = DeckBuilder;

    function DeckBuilder(allCards, deck) {
        this.allCardsSAVE = allCards;
        this.allCards = allCards;
        this.deck = deck;
        this.points = 0;
        this.MAXPOWER = 40;
        this.MINCARDS = 2;
        this.MAXCARDS = 4;
    }
})(window.app || (window.app = {}));
