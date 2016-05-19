(function (app) {
    app.Wrapper =
        ng.core.Component({
            selector: 'wrapper',
            templateUrl: "app/wrapper.html"
        })
            .Class({
            constructor: function () {
                // this.cards = [];
                this.dragging = false;
                
                this.allCards = [];
                
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
                
                this.card = new app.Map('Ruins', 1, 2, 1, 'images/prova.png');
                this.allCards.push(this.card);
                
                this.deckBuilder = new app.DeckBuilder(this.allCards, []);
                
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
                        /*Add the points*/
                        this.deckBuilder.points += (this.deckBuilder.allCards[i].power);
                        /*Remove the card from the hand*/
                        this.deckBuilder.allCards.splice(i, 1);
                        
                        this.deckBuilder.deck.push(node);  
                    }
                }
                
            },
            
            giveCard: function (card) {
                /*Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                node.image = card;
                
                var img = "";
                
                console.log(this.deckBuilder.deck);
                /*Loop over the player's hand to check what card he had just played*/
                for(var i = 0; i < this.deckBuilder.deck.length; ++i){
                    img = this.deckBuilder.deck[i].image.length;
                    res = card.slice(-img);

                     if(res == this.deckBuilder.deck[i].image){
                        /*Add the points*/
                        this.deckBuilder.points -= (this.deckBuilder.deck[i].power);
                        /*Remove the card from the hand*/
                        this.deckBuilder.deck.splice(i, 1);
                        
                        this.deckBuilder.allCards.push(node);  
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
                this.giveCard(data);
                ev.dataTransfer.clearData();
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
        this.allCards = allCards;
        this.deck = deck;
        this.points = 0;
    }
})(window.app || (window.app = {}));
