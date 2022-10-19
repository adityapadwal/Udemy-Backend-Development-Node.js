// // functions in Js 
// // type 1
// function aditya(name, age, salary) {

// }

// // type 2
// const aditya = function(name, age, salary) {

// }

// // type 3
// // Arrow functions
// const aditya = (name, age, salary) => {

// }

// // Arrays 
// const hobbies = ["Cricket", "Tennis", "Football"];
// console.log(hobbies);

// //  copying the array 
// const copyArr = hobbies.slice();
// console.log("copyArr[] ", copyArr);

// const copyArr1 = [hobbies];
// console.log("copyArr1[] ", copyArr1);

// // using the spread operator
// const copyArr2 = [...hobbies];
// console.log("copyArr2[] ", copyArr2);

// Rest operator 
const resting = (...args) => {
    return [...args];
}

console.log(resting(1, 2, 3));
