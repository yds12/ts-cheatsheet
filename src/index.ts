// ------------------------------------------------------------------------
// Basic types
// ------------------------------------------------------------------------

// A variable declared without type initially behaves as it normally
// would in Javascript. After a value is assigned to the variable, 
// the typescript compiler (tsc) infers the type of the variable.
let x;
x = 10;

// If a value of a different type is assigned to x, we get a type error:
//x = 'a'; //throws error

// We can also declare the type explicitly:
let z: number;
z = 10.5;
z = 7;
// z = 'a'; // error

let w: string;
w = 'ab';
// w = 7; // error

let t: boolean;
t = true;
// t = 0; // error

// Type checking also occurs in functions:
function justReturn(par: number){
  return par;
}

justReturn(z); // okay
// justReturn(t); // error

// ------------------------------------------------------------------------
// Special types
// ------------------------------------------------------------------------

// To avoid type-checking and get the stardard javascript behaviour, we 
// can assign the type any:
let y: any;
y = 10;
y = 'a'; // okay

// Any can be assigned to anything, and a variable of type any is treated 
// by the tsc basically like it would be treated by javascript:
let num: number;
let whatever: any;
num = whatever; // okay

// A similar type but with almost opposite treatment by tsc is the type
// unknown. It can also receive any value:
let mystery: unknown;
mystery = 10; // okay
mystery = ''; // okay

// but it cannot be assigned to any typed variable:
let var1: string;
let var2: any;
// var1 = mystery; // fails, even though mystery has now a string value
var2 = mystery; // okay



// Function types
type Unary = (a: number) => number;
let f: Unary;
f = ()=>{ return 0; };
