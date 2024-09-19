/**
 * Understanding file system in NodeJS
 * working with files and directories.
 */

// import { rejects } from "assert";
// import { error } from "console";
// import fs from "fs";
// import { resolve } from "path";

// //Read a file
// //Async
// fs.readFile("demo.json", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Data read(RAW): ", data);
//     console.log("Data read(JSON): ", JSON.parse(data));
//   }
// });
// //Sync
// try {
//   let data = fs.readFileSync("demo.json");
//   console.log("Data read(JSON): ", JSON.parse(data));
// } catch (error) {
//   console.log(error);
// }

//write to a file
//Async
// fs.writeFile("demo.json", '{"name":"JAVA","price":400}', (err) => {
//   err && console.log("Error writing data", err);
// });

// //Sync
// try {
//   fs.writeFileSync("demo.json", '{"name":"python","price":500}');
// } catch (error) {
//   console.log("Error writing data", err);
// }

// //Append a file
// //Async
// fs.appendFile("demo.json", '{"name":"C++","price":300}', (err) => {
//   if (err) {
//     console.log("Error appending data", err);
//   } else {
//     console.log("ASYNC : Data appended successfully");
//   }
// });
// //Sync
// try {
//   fs.appendFileSync("demo.json", '{"name":"Ruby","price":600}');
//   console.log("SYNC : Data appended successfully");
// } catch (error) {
//   console.log("Error appending data", err);
// }

// //Delete a file

// //create a file named data.json in yhe same directory of this file.
// fs.unlink("data.json", (err) => {
//   if (err) {
//     console.log("Error deleting file",err);
//   } else console.log("File deleted (ASYNC)");
// });

// //Sync
// try {
//   fs.unlinkSync("data2.json");
//   console.log("File deleted (SYNC)");
// } catch (error) {
//   console.log(`Error deleting file: ${error}`);
// }

//Working with directories

// //create a directory
// //ASYNC
// fs.mkdir("newDir", (err) => {
//   if (err) console.log("Error creating dir (ASYNC)", err);
//   else console.log("Directory created (ASYNC)");
// });

// //SYNC
// try {
//   fs.mkdirSync("newDir2");
//   console.log("Directory created (SYNC)");
// } catch (error) {
//   console.log("Error creating directory (SYNC)", error);
// }

// //Reading a directory: lists all the files and directories within a specified path.
// //ASYNC
// fs.readdir("Practice1", (err, files) => {
//   if (err) console.log("Error reading directory (ASYNC)");
//   else console.log("Directory read (ASYNC) : files : ", files);
// });

// //SYNC
// try {
//   const files = fs.readdirSync("Practice3");
//   console.log("Directory read (SYNC) : files : ", files);
// } catch (error) {
//   console.log("Error reading directory (SYNC)", error);
// }

// //Deleting a directory
// //ASYNC
// //create newDir and newDir2 if they don't exist.s
// fs.rmdir("newDir", (err) => {
//   if (err) console.log("Error deleting directory (ASYNC)");
//   else console.log("Directory deleted (ASYNC)");
// });

// //SYNC
// try {
//   fs.rmdirSync("newDir2");
//   console.log("Directory deleted (SYNC)");
// } catch (error) {
//   console.log("Error deleting dirctory (SYNC)");
// }

// //Renaming a file or directory
// //create 2 file: oldName.txt and oldName2.txt
// //ASYNC
// fs.rename("oldName.txt", "newName.txt", (err) => {
//   if (err) console.log("Error renaming (ASYNC)");
//   else console.log("Renamded successfully (ASYNC)");
// });

// //SYNC
// try {
//   fs.renameSync("oldName2.txt", "newName2.txt");
//   console.log("Renamded successfully (ASYNC)");
// } catch (error) {
//   console.log("Error renaming (SYNC)");
// }

//Watching for file/dir changes , async only
// fs.watch("demo.json", (eventType, fileName) => {
//   if (fileName) console.log(`${fileName} as been modified due to ${eventType}`);
//   else console.log("filename not provided");
// });

/**
 * Asynchronous JS
 * 3 patterns : Callbacks, Promises, asunc-await
 * THese patterns do not create a natural asunchronous code, but thay manage async code in JS
 */

//Callbacks

// const function fetchData(cb) {
//   setTimeout(() => cb("Data Fetched"), 1000);
// }

// console.log("Line before cb");
// fetchData((data) => {
//   console.log(data);
// });

// console.log("Line after cb, but prints before, bcz sync code");

// //Promises
// console.log("Line before promise");

// //v1
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise1 resolved");
//   }, 1000);
// });
// promise1.then((data) => {
//   console.log(data);
// });

// //v2
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Promise2 resolved");
//     }, 1000);
//   });
// }
// const promise2 = fetchData();
// promise2.then((data) => {
//   console.log(data);
// });

// console.log("Line after promise, but prints before, bcz sync code");

// //async-await

// async function fetchDataandLog() {
//   try {
//     const data = await fetchData();
//     console.log("async-await : ", data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// fetchDataandLog();

/**
 * Modern ES features, beyond ES6
 */

//1: Exponential operrator(**):
console.log(5 ** 3);

//2: Array.prototype.includes(): checks if an array includes a certain value
const a = [10, 20, 30];
console.log(a.includes(10));
const o = [
  { name: "abc", id: 10 },
  { name: "def", id: 20 },
];
console.log(o.includes({ name: "abc", id: 10 })); //false bcz: object refrences are compared not the content/value, which are different in this case.

const o1 = { id: 100 };
const o2 = { id: 200 };
const o3 = [o1, o2];
console.log(o3.includes(o1)); //true: reference are same this time
console.log(o3.includes({ id: 100 })); //false: again, even though values are same the references are different
//To search for objects in arrays use: find(), some() or filter()

///3: async-await

//4: Object.entries(), Object.values(), and Object.keys()
// These methods provide convenient ways to iterate over objects.
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); //  [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
console.log(Object.values(obj));
console.log(Object.keys(obj));

//4.b) Object.fromEntries()
//This method transforms a list of key-value pairs (entries) into an object.
const entries = [
  ["a", 100],
  ["b", 200],
];
const objecT = Object.fromEntries(entries);
console.log(objecT);

//5: Rest/Spread Properties for Objects
//The spread operator (...) was introduced for arrays in ES6, and in ES9, it was extended to objects. You can now clone or merge objects more easily.
const obj1 = { a: 10, b: 20 };
const obj2 = { ...obj1, c: 30 };
console.log(obj2);

//6: Asynchronous Iteration
//You can now use for-await-of to loop over asynchronous data sources like streams.
async function processStream(stream) {
  for await (const chunk of stream) {
    console.log(chunk);
  }
}

processStream("weqrewq");

//Understanding streams in JS?

//7: Promise.prototype.finally()
// The finally() method allows you to run cleanup code after a promise is settled (either resolved or rejected).
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
};

fetchData()
  .then(() => console.log("Success"))
  .catch(() => console.log("Error"))
  .finally(() => console.log("Cleanup"));

//8: Array.prototype.flat() and Array.prototype.flatMap()
//flat() flattens nested arrays into a single array. flatMap() combines mapping and flattening.
const arr = [10, [20, 30], [40, [50], [60, 70, [80]]]];
console.log(arr.flat(2)); // flatens upto depth 2

//9:Optional Catch Binding
//You can now omit the error parameter in catch if you don't need it.
try {
  throw error;
} catch {
  console.log("Error occurred");
}

//10: Nullish Coalescing Operator (??)
//The ?? operator returns the right-hand operand when the left-hand operand is null or undefined, but not when it’s falsy (0, false, etc.).

console.log(null ?? "default");
console.log(undefined ?? "default");
console.log(false ?? "default");
console.log(0 ?? "default");
console.log("" ?? "default"); // empty string retrurned
console.log("Hello" ?? "default");
console.log(1 + 5 ?? "default");
console.log(10 / 0 ?? "default");

//11: Optional Chaining (?.)
//Optional chaining simplifies accessing deep object properties that may not exist without having to explicitly check for each property’s existence. Helps escape errors when property not exist
const objecTT = { user: { name: "Jack" } };
console.log(objecTT?.user?.name);
console.log(objecTT?.address?.city); // undefined (no error)

//12: Dynamic Import
// You can import modules dynamically, which is useful for code-splitting and optimizing load times.
async function loadModule() {
  const module = await import("fs");
  module.readFile("demo.json", (err, data) => {
    if (err) console.log(err);
    else console.log("Read successfully: ", JSON.parse(data));
  });
}

loadModule();

//13: Logical Assignment Operators (&&=, ||=, ??=)
//These operators combine logical checks with assignment.
let l = true;
l &&= false;
console.log(l); // false

let b = null;
b ||= "default";
console.log(b); // 'default'

let c = null;
c ??= "new value";
console.log(c); // 'new value'

//14: String.prototype.replaceAll()
//This method replaces all occurrences of a substring in a string.
const str = "foo foo";
console.log(str.replaceAll("foo", "bar")); // 'bar bar'

//15: Array.prototype.at()
//The at() method allows accessing array elements via negative indices.
const array = [10, 20, 30];
console.log(array.at(-1)); // 30

// //16: Array Grouping (Array.prototype.groupBy())
// //groupBy() groups elements of an array based on a criterion.
// const data = [10, 20, 30, 35, 50];
// const grouped = data.groupBy((n) => (n % 2 === 0 ? "even" : "odd"));
// console.log(grouped); // { even: [10, 20, 30, 50], odd: [35] }