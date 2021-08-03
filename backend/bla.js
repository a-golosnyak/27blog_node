console.log('Here nodemon build');

let a = 1;
console.log("--- 1 -------------------a-")
console.log(a);

setTimeout( () =>
	{
		a = 0;
		console.log("--- 2 --------------------")
		console.log(a);
	}, 1000);

// while(a)
// {
//
// }
console.log("--- 3 --------------------")
console.log(a);

