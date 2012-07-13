
var input = ["a1","c1","e1"];

var Clock = function(tempo, tick) {
    var interval;

    this.run = function() {
        interval = setInterval(function() {tick()}, 60 * 1000 / tempo);
    }
}
var Arp = function(nextForMode) {
    var self = this; 
    var i = 0;

    this.note = function() {
        console.log(nextForMode()) ;
    }
}

var Up = function() {
    var i = 0;

    var next = function() {
        var j = i++;
        if (i > input.length - 1) i = 0;
        return input[j];
    }
    return next;
}

var UpDown = function() {
    var i = 0;
    var mode = 0;

    var next = function() {
        var j = i;
        if (mode == 0) i++;
        if (mode == 1) i--;
        if (i == input.length - 1) mode = 1;
        if (i == 0) mode = 0;
        return input[j];
    }
    return next;
}

var arp1 = new Arp(UpDown());
var clock1 = new Clock(180,arp1.note);
clock1.run();
setTimeout(function() { input = ["b2","d2","f2","a2"] }, 5000);
