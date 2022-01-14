function count(input) {
  let wordsCounter = {};
  for (const char of input) {
    if (wordsCounter[char] === undefined) {
      wordsCounter[char] = 1;
    } else {
      wordsCounter[char] += 1;
    }
  }
  return wordsCounter;
}

let input1 = ["a", "b", "c", "a", "c", "a", "x"];
console.log(count(input1)); // should print {a:3, b:1, c:2, x:1}


function groupByKey(input) {
  let wordsCounter = {};
  for (const inputPair of input) {
    let key = inputPair.key;
    let value = inputPair.value;
    if (wordsCounter[key] === undefined) {
      wordsCounter[key] = value;
    } else {
      wordsCounter[key] += value;
    }
  }
  return wordsCounter;
}

let input2 = [
  { key: "a", value: 3 },
  { key: "b", value: 1 },
  { key: "c", value: 2 },
  { key: "a", value: 3 },
  { key: "c", value: 5 },
];
console.log(groupByKey(input2)); // should print {a:6, b:1, c:7}