/// <reference path="../test1.js" />

function Test2(aaaa) {
	console.log(Test1.call(this, "test2 333"));
}

Test2.prototype = {

    dddd: "dddd",

    kkk : function(aas) {
        this.dddd.sam
    },
	oooo: "ssssss",
};

const aaa = new Test2();

console.log(aaa.aaaa);
