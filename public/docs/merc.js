    /**
     * Represents a Merc Card
     * @constructor
     * @param {string} name - The name of the card
     * @param {string} clan - The clan of the card
     * @param {string} type - The kind of the card
     * @param {string} image - The image of the card
    */
    function Merc(name, clan, power, type, image) {
        this.name = name;
        this.clan = clan;
        this.power = power;
        this.type = type;
        this.image = image;
    }