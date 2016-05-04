(function(app) {
  app.Card = Card;

    function Card(id, nom, preu, codi) {
        this.id = id;
        this.nom = nom;
        this.preu = preu;
        this.codi = codi;
    }
})(window.app || (window.app = {}));