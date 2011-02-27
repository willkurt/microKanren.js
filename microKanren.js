//Attempt to replicate Oleg Kiselyov's microKanren in JavaScript
//original: http://okmij.org/ftp/Scheme/sokuza-kanren.scm

var fail = function(x) {
    return([]);
};

var succeed = function(x) {
    return([x]);
};

var disj = function(f1,f2){
    return(
	function(x) {
	    return(
		append(f1(x),f2(x))
	    );}
    );};


var conj = function(f1,f2){
    return(
	function(x){
	    return(
		append.apply(this,map(f2,(f1(x))))
	    );}
    );};

//logic variables
//when attempting to implement scheme-like features
//in js, not hviang real symbols is a fairly large
//issue...

//prototypical logic variable
var __logivar__ = {};
__logivar__.id = "__logivar__";

//creates a logic variable

var logicVar = function(var_name){
    var o = Object.create(__logivar__);
    o.id = var_name;//this will be used to compare 2 logi vars
    return o;
};

var isLogicVar = function (x) { return __logivar__.isPrototypeOf(x);}


var emptySubset = {}; 

//of course were not going to use assoc lists
//since javascript objects work just fine
var ext_s = function (vari, value, s){
    s[vari.id] = value;
    return s;
};

//this differs a bit from the scheme
//as far as replaces in assoc list with a js object {};
//note: the answer may actually need to come back in a list/array 
var lookup = function (vari, s){
    return(
	!isLogicVar(vari) ? vari :
	    s[vari.id] ? lookup(s[vari.id],s) :
	    vari	
    );
};


//okay here's the meet and potatoes of all this
//unify
var unify = function(t1,t2,s){
    var t1 = lookup(t1,s);
    var t2 = lookup(t2,s);
    return(
	(t1 == t2) ? s :
	    isLogicVar(t1) ? ext_s(t1,t2,s) :
	    isLogicVar(t2) ? ext_s(t2,t1,s) :
	    (isPair(t1) && isPair(t2)) ?
	    "this part is the hard part" :
	    t1 === t1 ? s :
	    {}//changed from false
    );
}


//scheme primatives we'll probably need
//car
var first = function (xs) {
    return xs[0];
};


//cdr
var rest = function (xs) {
    return xs.slice(1);
};

//cons
var build = function (x,xs) {
    return [x].concat(xs);
};

//the main difference between
//scheme's append and javascripts' concat
//is that schemes can take an arbitrary
//number of arguments
var append = function(){
    var len = arguments.length;
    var i;
    var ls = [];
    for(i=0;i<len;++i){
	ls = ls.concat(arguments[i]);
    }
    return ls;
};

//nil?
var empty = function (xs) {
    return xs.length === 0;
};

//this will work for 'pair' only because 
//I don't think that I'm going to every 
//worry about dotted lists
var isList = function (xs) {
    return (xs instanceof Array);
};

var isPair = function (xs) {
    return (isList(xs) && !empty(xs));
};

//yea I know this is not a purely functional map
var map = function(func,ls) {
    var rls = [];
    var len = ls.length;
    for(var i = 0; i < len; ++i){
	rls[i] = func(ls[i]);
    }
    return rls;
};

//usual crockford magic to assure that Object.create exists
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}