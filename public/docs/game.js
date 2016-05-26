    /**
     * Represents a Game
     * @constructor
     * @param {string} FPlayer - The name of the First Player
     * @param {string} SPlayer - The name of the Second Player
     * @param {object[]} FDeck - The Deck of the first player
     * @param {object[]} SDeck - The Deck of the second player
    */
    function Game(FPlayer, SPlayer, FDeck, SDeck) {
        this.FPlayer = FPlayer;
        this.SPlayer = SPlayer;
        this.FDeck = FDeck;
        /**  Discards Zone of the First Player - Not used at the moment */
        this.FDiscards = [];
        /**  The Hand of the first player */
        this.FHand = [];
        /** Ranged Zone of the First Player / Computer */
        this.FRanged = [];
        /** Cav Zone of the First Player / Computer */
        this.FCav = [];
        /** Melee Zone of the First Player / Computer */
        this.FMelee = [];
        /** Melee Zone of the Second Player */
        this.SMelee = [];
        /** Cav Zone of the Second Player */
        this.SCav = [];
        /** Ranged Zone of the Second Player */
        this.SRanged = [];
        /** Hand Zone of the Second Player */
        this.SHand = [];
        /** Discards Zone of the Second Player -  Not used at the moment*/
        this.SDiscards = [];
        /** Deck of the Second Player */
        this.SDeck = [];
        /** Map Zone */
        this.map = [];
        /** Points handler */
        this.points = [0,0,0,0,0,0,0,0]; //FR, FC, FM, SM, SC, SR, FTotal, STotal
        /** Turn handler */
        this.turn = true; //false Computer
        /** Computer card control - Not used at the moment */
        this.tendency = 1;
        /** Passing of the first player handler */
        this.FPassed = false;
        /** Passing of the second player handler */
        this.SPassed = false;
        /** Lives handler for the First player */
        this.FLost = [false, false];
        /** Lives handler for the Second player */
        this.SLost = [false, false];
        
    }