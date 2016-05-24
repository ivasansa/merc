(function (app) {
    app.PipePersonalitzada=ng.core
    .Pipe({
        name: "filter",
        pure: false
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
            
        // for(var i = 0; i < value.length; ++i){
            value.sort((a, b) => {
                if (a.image < b.image) {
                    return -1;
                //.completed because we want to sort the list by completed property
                } else if (a.image > b.image) {
                    return 1;
                } else {
                    return 0;
                }
            });
            // }
            console.log(value);
            return value;
        }
    });
    })(window.app || (window.app = {}));
    
    
    (function (app) {
    app.MeleePipe=ng.core
    .Pipe({
        name: "melee",
        pure: true
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
        var tmp = value.slice();
        function checkMelee(card) {
            return card.type == "melee";
        }  
        console.log("Pipero");
        console.log(value);
         return tmp.filter(checkMelee);
        }
    });
    })(window.app || (window.app = {}));
    
    (function (app) {
    app.CavPipe=ng.core
    .Pipe({
        name: "cav",
        pure: true
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
        var tmp = value.slice();
        function checkCave(card) {
            return card.type == "cav";
        }  
        console.log("Pipero");
        console.log(value);
         return tmp.filter(checkCave);
        }
    });
    })(window.app || (window.app = {}));
    
        (function (app) {
    app.RangedPipe=ng.core
    .Pipe({
        name: "ranged",
        pure: true
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
        var tmp = value.slice();
        function checkRanged(card) {
            return card.type == "ranged";
        }  
         return tmp.filter(checkRanged);
        }
    });
    })(window.app || (window.app = {}));
(function (app) {
    app.MapPipe=ng.core
    .Pipe({
        name: "map",
        pure: true
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
        var tmp = value.slice();
        function checkMap(card) {
            return card.constructor.name == "Map";
        }  
         return tmp.filter(checkMap);
        }
    });
    })(window.app || (window.app = {}));