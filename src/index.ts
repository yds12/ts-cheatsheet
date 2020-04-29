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

// Type checking also occurs in functions. Here the argument par
// must be of type number.
function justReturn(par: number){
  return par;
}

justReturn(z); // okay
// justReturn(t); // error (t is boolean)



// ------------------------------------------------------------------------
// Array, Union and Object types
// ------------------------------------------------------------------------

// Union types are types made out of combination of other types.
let stringOrInt: string | number;
stringOrInt = 10; // okay
stringOrInt = 'a'; // also okay


// Array types can be defined with the following syntax:
let arr: [];
let arrayOfAnything: any[];
let arrayOfStrings: string[];

// The type will be inferred based on the content, for example,
// arrStr will be of type string[]:
let arrStr = ['a', 'b'];

function receivedStringArray(arr: string[]){};
receivedStringArray(arrStr); // okay

// Now if we wanted the array to be of string or number, we could declare
// it explicitly
let arrStrInt: (string | number)[] = ['a', 'b'];

// but now this would fail, even though the actual array has only strings:
// receivedStringArray(arrStrInt);

// We can also count on tsc to infer the types of the elements of a typed
// array:
let newStrArr = ['a', 'b'];

for(const str in newStrArr){
  console.log(str.toUpperCase());
}


// You can declare object types.
let obj: object;
// obj = 3; // error
// obj = 'a'; // error
// obj = [1, 2]; // error
obj = {}; // okay
obj = { name: 'Lucas', age: 10 }; // okay

class SomeClass{};
obj = new SomeClass(); // okay

// Now, the following code generates an error, because even though obj has
// a property called name, we declared it generically just as object, which
// does not necessarily has a property called name.
obj = { name: 'Jose' };
// let v = obj.name; // fails

// This problem would not have happened if we just declare obj and let
// tsc infer its type:
// let obj = { name: 'Jose' }; // inferred type: { name: string }

// We can make more specific object types.
// The code below declares a variable person
// which has a name property of type string, and an age property of type
// number.
let person: { name: string, age: number };
person = { name: 'Jonas', age: 45 };
console.log(person.name); // okay
person.name = 'Maria'; // okay
// person.name = 10; // error

// In vanilla js, the following code would just print undefined, but tsc
// throws a type error, because person's type has no id field:
// console.log(person.id);

// You can also declare and assign at the same time:
let will: { name: string, age: number } =
  { name: 'William', age: 77 };

// This might seem useless, but it can actually be useful. For example,
// when it comes to array types:
let mark = { name: 'Marcus', favoriteValues: ['a', 'b'] };

// mark.favoriteValues is inferred to be of type string[]. Maybe we
// wanted it to be of type (string | number)[]. In that case, we have 
// to do this:
let mark2: { name: string, favoriteValues: (string | number)[] }
  = { name: 'Marcus', favoriteValues: ['a', 'b'] };

// Now:
receivedStringArray(mark.favoriteValues); // okay: parameter is indeed string[]

// error: parameter is (string | number)[]
// receivedStringArray(mark2.favoriteValues);

// But note that
let someArray: any = [];
receivedStringArray(someArray); // works: type any disables type-checking



// ------------------------------------------------------------------------
// Tuple type
// ------------------------------------------------------------------------

// Similar to type tuple in python. An array of fixed size:
let tuple: [string, number];
tuple = ['Mario', 22]; // okay
// tuple = [22, 'Mario']; // error: not in order
tuple[1] = 21; // okay
// tuple[1] = 'Mario'; // fails: second element is number
// tuple[2] = 0; // fails: no third element

// error: trying to assing [string, number, number] 
// tuple = ['Mario', 22, 0]; 

// However, tsc has a weird behaviour:
tuple.push('bros'); // works!(?)

function acceptsTuple(tup: [string, number]){};
acceptsTuple(tuple); // works, even though tuple = ['Mario', 21, 'bros']
// acceptsTuple(['Mario', 21, 'bros']); // fails!!
acceptsTuple(['Mario', 21]); // works, as expected 

// Another relevant observation is that assigning an array with various types
// in it will have type inferred to a union type array, not tuple:
let fakeTuple = ['Mario', 21];
// acceptsTuple(fakeTuple); // fails: fakeTuple is (string|number)[]



// ------------------------------------------------------------------------
// Enum types
// ------------------------------------------------------------------------

// Enums are a nice way to organize sets of constants that are used
// almost as a type. E.g., instead of:
const STATUS_ALIVE = 0;
const STATUS_DEAD = 1;
let process1 = { id: 1, status: STATUS_ALIVE };

// We can define an enum for status:
enum Status { ALIVE, DEAD };
let process2 = { id: 2, status: Status.ALIVE };

// Actually, they even have the same values:
if(process1.status === process2.status && Status.DEAD === STATUS_DEAD)
  console.log('Statuses coincide!'); // will print

// The values of the enum will, behind the scenes, be assigned 0, 1, 2,...
// This can be changed though:
enum DifferentValues { FIRST = 1, SECOND = 3, THIRD = 2, FOURTH = 'a' };
console.log(DifferentValues.FOURTH); // prints 'a'

// Behind the scenes, enums are not replaced by number literals, but by
// functions. This is the code generated for the snippet above 
// (with compiler target set to ES5):
/*
  var Status;
  (function (Status) {
      Status[Status["ALIVE"] = 0] = "ALIVE";
      Status[Status["DEAD"] = 1] = "DEAD";
  })(Status || (Status = {}));
  ;
  var process2 = { id: 2, status: Status.ALIVE };
*/

// The behaviour seems a bit inconsistent when assigning values directly to 
// an enum variable. Look:
let myEnum: DifferentValues;
myEnum = 1; // okay
console.log(myEnum); // prints 1
myEnum = 10; // okay!(?)
console.log(myEnum); // prints 10
myEnum = DifferentValues.FOURTH;
console.log(myEnum); // prints 'a'
// myEnum = 'a'; // error!
// myEnum = 'b'; // error



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



// ------------------------------------------------------------------------
// Function types
// ------------------------------------------------------------------------

type Unary = (a: number) => number;
let f: Unary;
f = ()=>{ return 0; };
