    /**
     * Represents a deckBuilder Component
     * @class
    */
    function deckBuilderComponent() {
         function constructor() {
                /** Dragging Handler */
                this.dragging = false;
                
                this.sort = [true,false,false,false];
                this.allCards = [];
                this.buffer = [];
                
                /** Card instantiation and setup of allCards section */
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
                this.deckBuilder = new app.DeckBuilder(this.allCards, []);
                this.playDeck = [];
                this.allowedToPlay = false;
                
         }
        /** Chosing of a card's handler */
        function playCard(card, box) {
                /**Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                node.image = card;
                
                var img = "";
                
            
                /**Loop over the player's hand to check what card he had just played*/
                for(var i = 0; i < this.deckBuilder.allCards.length; ++i){
                    img = this.deckBuilder.allCards[i].image.length;
                    res = card.slice(-img);

                     if(res == this.deckBuilder.allCards[i].image){
                        for(var j = 0; j < this.buffer.length; ++j){
                            img = this.buffer[j].image.length;
                            res = node.image.slice(-img); 
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
            }
        /** Returning a card's handler */
        function giveCard(card) {
                /**Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                node.image = card;
                
                var img = "";
                /**Loop over the player's hand to check what card he had just played*/
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
                        /**Add the points*/
                        /**Remove the card from the hand*/
                        this.deckBuilder.deck.splice(i, 1);
                        
                        this.deckBuilder.allCards.push(node);  
                        if(this.deckBuilder.deck.length >= this.deckBuilder.MINCARDS){
                            this.allowedToPlay = true;
                            console.log(this.allowedToPlay);
                        }else{
                            this.allowedToPlay = false;
                        }
                    }
                }
                
            }
        /** Drag and Drop Handler */
        function handleDragEnter(ev) {
                ev.preventDefault();
                this.dragging = true;
                // console.log(this.dragging);
            }
        /** Drag and Drop Handler */
        function handleDragLeave(ev) {
                ev.preventDefault();
                this.dragging = false;
                // console.log(this.dragging);
            }
        /** Drag and Drop Handler */
        function handleDrag(ev) {
                ev.dataTransfer.setData("text", ev.target.id);
                // console.log("GETDATA" +ev.target.id);
                // ev.dataTransfer.clearData();
            }
        /** Drag and Drop Handler */
        function handleDrop(ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data);
                ev.dataTransfer.clearData();
            }
        /** Drag and Drop Handler */    
        function handleDropG(ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                console.log(data);
                this.giveCard(data);
                ev.dataTransfer.clearData();
            }
        /** Pipe choosing */
        function sorterino(kind) {
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
            }
        /** Handles the transition between the builder and the game */
        function hide() {
                this.visible = !this.visible;
            }
    }