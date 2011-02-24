//just reimplementing some of the tests in the original

//calling with 10 should return [100,101,101,110,110]
var test1 = disj(
    disj(fail,succeed),
    conj(
	disj(function(x){return succeed(x + 1)},
	     function(x){return succeed(x + 10)}),
	disj(succeed,succeed)));

