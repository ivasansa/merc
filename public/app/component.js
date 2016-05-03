(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'joc',
            templateUrl: "app/joc.html"
        })
        .Class({
            constructor: function () {
                this.nom = "Sergi"
                this.dragging = false;
            },
            handleDragEnter: function(ev) {
                ev.preventDefault();
                this.dragging = true;
                console.log(this.dragging);
            },
            handleDragLeave: function(ev) {
                ev.preventDefault();
                this.dragging = false;
                console.log(this.dragging);
            },
            handleAllowDrop: function(ev) {
                ev.preventDefault();
                console.log("allowDrop");
            },
            handleDrag: function(ev) {
                ev.dataTransfer.setData("text", ev.target.id);
                console.log("drag");
            },
            handleDrop: function(ev) {
                console.log("drop");
                this.dragging = false;
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                console.log(data);
                ev.target.appendChild(document.getElementById(data));
            }
        });
        
})(window.app || (window.app = {}));