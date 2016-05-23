(function (app) {
    app.PipePersonalitzada=ng.core
    .Pipe({
        name: "filter"
        
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
            var paraules = value.split(" ");
            paraules = paraules.slice(0, args[0]);
            var novaCadena = paraules.join(" ") + "...";
            return novaCadena;
        }
    });
    })(window.app || (window.app = {}));