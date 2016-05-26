    /**
     * Represents a Game Component
     * @class
    */
    function GameComponent() {
         function constructor() {
                /** Dragging Handler */
                this.dragging = false;
                /** Game instantiation */
                this.game = new app.Game("Player1", "Player2", this.cards, this.cards);
                
                /** Card instantiation and setup of computer's hand */
                this.card = new app.Merc('ElRiperino', 'CI', 4, 'melee', 'images/ElRiperino.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('Blackburn', 'CI', 4, 'ranged', 'images/Blackburn.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('ElMartinenc', 'CI', 6, 'cav', 'images/ElMartinenc.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('Asediado', 'CI', 10, 'melee', 'images/Asediado.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('Blas de Lezo', 'CI', 7, 'melee', 'images/BlasdeLezo.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('Dume', 'CI', 9, 'cav', 'images/Dume.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('Sento', 'CI', 6, 'cav', 'images/Sento.png');
                this.game.FHand.push(this.card);
                this.card = new app.Merc('Toni Pepperoni', 'CI', 5, 'melee', 'images/ToniPepperoni.png');
                this.game.FHand.push(this.card);
                this.card = new app.Map('Ruins', 1, 2, 1, 'images/Ruins.png');
                this.game.FHand.push(this.card);
                
         }
         /** Function that executes when the component is loaded */
        function ngOnInit() {
                /** Input of the deck builder and is assigned to the player's hand */
                this.game.SHand = this.playDeck;
            }
        /** Computer handler */
         function computerPlay() {
                /** if the computer has not passed */
                if(!this.game.FPassed){
                    var node = document.createElement("img");
                    /** Computer chooses a random card to play */
                    var rand = this.game.FHand[Math.floor(Math.random() * this.game.FHand.length)];
                    var buff = 1;
                    var i = this.game.FHand.indexOf(rand);
                    /** Plays the card */
                    if(rand.constructor.name == "Merc"){
                        node.src = rand.image;
                        if(rand.type == "melee"){
                            this.game.FMelee.push(node);
                            if(undefined != this.game.map[0]){
                                buff *= this.game.map[0].meleeBuff;
                            }
                            /**Add the points*/
                            this.game.points[2] += (rand.power*buff);
                            /*Remove the card from the hand*/
                            this.game.FHand.splice(i, 1);
                        }else if(rand.type == "cav"){
                            this.game.FCav.push(node);
                            if(undefined != this.game.map[0]){
                                buff *= this.game.map[0].cavBuff;
                            }
                            /*Add the points*/
                            this.game.points[1] += (rand.power*buff);
                            /*Remove the card from the hand*/
                            this.game.FHand.splice(i, 1);
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
                        
                        this.game.FHand.splice(i, 1);
                        
                    }
                    /** If the computer runs out of cards, passes the turn */
                    if(this.game.FHand.length <= 0){
                        this.game.FPassed = true;
                        this.FPass();
                    }
                    
                    /** Points sumatory */
                    this.game.points[6] = this.game.points[0] + this.game.points[1] + this.game.points[2];
                    
                    /** If the computer is losing by a lot of points, it may choose to withdraw */
                    if((this.game.points[6]>this.game.points[7])&&(this.game.SPassed)){
                        this.game.FPassed = true;
                        this.FPass();
                    }else if((this.game.points[7]-this.game.points[6] <= 5)&&(this.game.SPassed)){
                        this.computerPlay();
                    }else if((this.game.points[7]-this.game.points[6] > 5)&&(this.game.SPassed)){
                        this.game.FPassed = true;
                        this.FPass();
                    }
                    this.game.turn = true;
                }
                else {
                    this.game.turn = true;
                }
            }
         /** Map player handler */
        function playMap(card) {
                var node = document.createElement("img");
                node.src = card;
                var img = "";
                var res = "";
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    
                    res = card.slice(-img);
                    /** Check if the zone is correct, apply the buffs and place the card*/
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
                        
                        this.game.points[6] = this.game.points[0] + this.game.points[1] + this.game.points[2]; 
                        this.game.points[7] = this.game.points[3] + this.game.points[4] + this.game.points[5]; 
                        this.game.SHand.splice(i, 1);
                        
                        /** If the player runs out of cards, surrenders */
                        if(this.game.SHand.length <= 0){
                            this.game.SPassed = true;
                            this.SPass();
                        }
                        /** passes turn */
                        this.game.turn = false;
                        this.computerPlay();
                    }
                }
            }
        /** Card player handler */
        function playCard(card, box) {
                /**Recover the image path of the card and make it a proper image*/
                var node = document.createElement("img");
                node.src = card;
                
                
                var img = "";
                var res = "";
                var buff = 1;
                var cardTypeF = -1;
                var cardTypeS = -1;
                
            
                /**Loop over the player's hand to check what card he had just played*/
                for(var i = 0; i < this.game.SHand.length; ++i){
                    img = this.game.SHand[i].image.length;
                    res = card.slice(-img);
                    /**In order to avoid misplacing a card, we check its type*/
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
                    /**If it is the card he just played and it's the right place...*/
                    if((res == this.game.SHand[i].image)&&((box == cardTypeF)||(box == cardTypeS))&&((this.game.SHand[i].constructor.name == "Merc"))&&(this.game.turn)){
                        /**...Place it on the zone*/
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
                        /**Check if a map is on the board*/
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
                        /**Add the points*/
                        this.game.points[box] += (this.game.SHand[i].power*buff);
                        this.game.points[7] += (this.game.SHand[i].power*buff);
                        /**Remove the card from the hand*/
                        this.game.SHand.splice(i, 1);
                        
                        if(this.game.SHand.length <= 0){
                            this.game.SPassed = true;
                            this.SPass();
                        }                
                                
                        /**Finishes the turn*/
                        this.game.turn = false;
                        this.computerPlay();
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
        function handleDropSRanged(ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data,5);
                ev.dataTransfer.clearData();
            }
        /** Drag and Drop Handler */
        function handleDropSCav(ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data,4);
                ev.dataTransfer.clearData();
            }
        /** Drag and Drop Handler */
        function handleDropSMelee(ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                this.playCard(data,3);
                ev.dataTransfer.clearData();
            }
        /** Drag and Drop Handler */
        function handleDropMap(ev) {
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                if(this.game.map.length == 0){
                    this.playMap(data);
                }
                ev.dataTransfer.clearData();
            }
    
        /** Handles the finish of a round and the start of the next */
        function clearTable(winner) {
                this.game.FDiscards = this.game.FDiscards.concat(this.game.FRanged,this.game.FCav,this.game.FMelee);
                this.game.FRanged = [];
                this.game.FCav = [];
                this.game.FMelee = [];
                
                this.game.SDiscards = this.game.SDiscards.concat(this.game.SRanged,this.game.SCav,this.game.SMelee);
                this.game.SRanged = [];
                this.game.SCav = [];
                this.game.SMelee = [];
                
                this.game.map = [];
                this.game.points = [0,0,0,0,0,0,0,0]; //FR, FC, FM, SM, SC, SR, FTotal, STotal
                this.game.turn = winner; //false Computer
                this.game.FPassed = false;
                this.game.SPassed = false;
                
                if(this.game.SHand.length == 0 || this.game.FHand.length == 0){
                    if(this.game.SHand.length == 0){ 
                        this.game.SPassed = true;
                        this.SPass();
                    }
                    if(this.game.FHand.length == 0){
                        this.game.FPassed = true;
                        this.FPass();   
                    }
                }
            }
            
        /** Handles the Passing of the player */
        function SPass() {
                this.game.SPassed = true;
                if(this.game.FPassed){ //Both have Passed
                    if(this.game.points[6]>this.game.points[7]){//FPlayer won
                        if(!this.game.SLost[0]){
                            this.game.SLost[0] = true;
                            this.clearTable(false);
                        }else if(!this.game.SLost[1]){
                            this.game.SLost[1] = true;
                            //game finished, FPlayer won
                            alert("game finished, the computer won");
                            window.location.reload();
                            // window.location.href = 'https://merc-lvasansa-3.c9users.io/';
                        }
                    }else if(this.game.points[6]<this.game.points[7]){ //SPlayer won
                        if(!this.game.FLost[0]){
                            this.game.FLost[0] = true;
                            this.clearTable(true);
                        }else if(!this.game.FLost[1]){
                            this.game.FLost[1] = true;
                            //game finished, SPlayer won
                            alert("game finished, you won");
                             window.location.reload();
                        }
                    }else{ //Draw
                        if(!this.game.SLost[0]){
                            this.game.SLost[0] = true;
                        }else if(!this.game.SLost[1]){
                            this.game.SLost[1] = true;
                        }
                        
                        if(!this.game.FLost[0]){
                            this.game.FLost[0] = true;
                        }else if(!this.game.FLost[1]){
                            this.game.FLost[1] = true;
                        }
                        
                        var options = [true, false],
                        winner = Math.floor(Math.random() * options.length + 1);
                        this.clearTable(winner);
                        if(this.game.SLost[1] && this.game.FLost[1]){
                            //Game draw   
                            alert("game finished, Draw");
                             window.location.reload();
                        }else if(this.game.SLost[1]){
                            //FPlayer wins
                            alert("game finished, you won");
                             window.location.reload();
                        }else if(this.game.FLost[1]){
                            //SPlayer wins
                            alert("game finished, the computer won");
                            window.location.reload();
                        }
                    }
                }else {
                    this.game.turn = false;
                    this.computerPlay();
                }
                console.log(this.game.turn);
            }
        /** Handles the Passing of the computer */
        function FPass() {
                this.game.FPassed = true;
                if(this.game.SPassed){ //Both have Passed
                    if(this.game.points[6]>this.game.points[7]){//FPlayer won
                        if(!this.game.SLost[0]){
                            this.game.SLost[0] = true;
                            this.clearTable(false);
                        }else if(!this.game.SLost[1]){
                            this.game.SLost[1] = true;
                            //game finished, FPlayer won
                            alert("game finished, the computer won");
                            window.location.reload();
                        }
                    }else if(this.game.points[6]<this.game.points[7]){ //SPlayer won
                        if(!this.game.FLost[0]){
                            this.game.FLost[0] = true;
                            this.clearTable(true);
                        }else if(!this.game.FLost[1]){
                            this.game.FLost[1] = true;
                            //game finished, SPlayer won
                            alert("game finished, you won");
                             window.location.reload();
                        }
                    }else{ //Draw
                        if(!this.game.SLost[0]){
                            this.game.SLost[0] = true;
                        }else if(!this.game.SLost[1]){
                            this.game.SLost[1] = true;
                        }
                        
                        if(!this.game.FLost[0]){
                            this.game.FLost[0] = true;
                        }else if(!this.game.FLost[1]){
                            this.game.FLost[1] = true;
                        }
                        
                        var options = [true, false],
                        winner = Math.floor(Math.random() * options.length + 1);
                        this.clearTable(winner);
                        if(this.game.SLost[1] && this.game.FLost[1]){
                            //Game draw   
                            alert("game finished, Draw");
                             window.location.reload();
                        }else if(this.game.SLost[1]){
                            //FPlayer wins
                            alert("game finished, the computer won");
                             window.location.reload();
                        }else if(this.game.FLost[1]){
                            //SPlayer wins
                            alert("game finished, the computer won");
                             window.location.reload(); 
                        }
                    }
                }else {
                    this.game.turn = true;
                }
                console.log(this.game.turn);
            }
    }