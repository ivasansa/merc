    /**
     * Represents the deckBuilder object
     * @constructor
     * @param {object[]} allCards - All the cards in the game
     * @param {img[]} deck - The custom deck of the player
    */
        function DeckBuilder(allCards, deck) {

        this.allCardsSAVE = allCards;
        this.allCards = allCards;
        this.deck = deck;
        /**Manages the points of the player's deck*/
        this.points = 0;
        /**Sets the max power of the player's deck*/
        this.MAXPOWER = 40;
        /**Sets the minimum cards of the player's deck*/
        this.MINCARDS = 2;
        /**Sets the maximum cards of the player's deck*/
        this.MAXCARDS = 4;
    }
    