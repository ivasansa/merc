    /**
     * Represents a Map Card
     * @constructor
     * @param {string} name - The name of the card
     * @param {string} rangedBuff - The buff that is applyied to the ranged zone
     * @param {string} cavBuff - The buff that is applyied to the cav zone
     * @param {string} meleeBuff - The buff that is applyied to the melee zone
     * @param {string} image - The image of the card
    */
    function Map(name, rangedBuff, cavBuff, meleeBuff, image) {
        this.name = name;
        this.meleeBuff = meleeBuff;
        this.cavBuff = cavBuff;
        this.rangedBuff = rangedBuff;
        this.image = image;
    }