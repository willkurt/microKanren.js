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