//just reimplementing some of the tests in the original

//calling with 10 should return [100,101,101,110,110]
var test1 = disj(
    disj(fail,succeed),
    conj(
	disj(function(x){return succeed(x + 1)},
	     function(x){return succeed(x + 10)}),
	disj(succeed,succeed)));


var lx = logicVar('x');
var ly = logicVar('y');



//some examples from the original
//it make make sense to pull these out of this file
//and into a test file later
var choice = function(vari, lst){
	if(empty(lst)){
	    return fail;
	} else {
	    return(disj($U(vari,first(lst)),
			 choice(vari,rest(lst))));
	}

};


var common_el = function (l1,l2){
    return(conj(choice(lx,l1),
		choice(lx,l2))
	  );
};




var testChoiceS = function(){
    return(
	run(choice(1,[1,2,3]))
    );
};

var testChoiceF = function(){
    return(
	run(choice(4,[1,2,3]))
    );
};

var testChoiceV = function(){
    return(
	run(choice(lx,[1,2,3]))
    );
};

//not producing the right results
var testCommonEl = function (){
    return run(common_el([1,2,3],[3,4,5]));
};

var testCommonElF = function(){
    return run(common_el([1,2,3],[4,5,6]))
};




var conso = function (a,b,l){
    return $U(build(a,b),l);
};

var testConso1 = run(conso(1,[2,3],lx));