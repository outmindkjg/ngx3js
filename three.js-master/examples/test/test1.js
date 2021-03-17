function Test1(value) {
    this.aaaa = value;
    // this.pppp();

    return this;
}

Test1.prototype = {
    aaaa : "ccc",
    pppp : function() {
        console.log('pppp called');
    }
}

function Sample() {

}

Sample.prototype = {
    sample : function() {

    }
}