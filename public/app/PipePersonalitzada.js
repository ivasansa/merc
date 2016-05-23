(function (app) {
    app.PipePersonalitzada=ng.core
    .Pipe({
        name: "filter",
        pure: false
    })
    .Class({
        constructor: function () {},
        transform: function (value, args) {
            
        console.log("Pipero");
        console.log(args);
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
    
    
    
    // (function (app) {
    // app.PipePersonalitzada=ng.core
    // .Pipe({
    //     name: "filter"
    // })
    // .Class({
    //     constructor: function () {},
    //     transform: function (value, args) {
    //         var paraules = value.split(" ");
    //         paraules = paraules.slice(0, args[0]);
    //         var novaCadena = paraules.join(" ") + "...";
    //         return novaCadena;
    //     }
    // });
    // })(window.app || (window.app = {}));