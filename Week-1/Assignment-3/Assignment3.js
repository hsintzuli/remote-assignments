function countAandB(input) {
    var a = 0;
    var b = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i].toLowerCase() == "a") {
            a++;
        } else if (input[i].toLowerCase() == "b") {
            b++;
        }
    }
    if ((a == 0) & (b==0)) {
        return 0;
    }
    return  a + b;
}

function toNumber(input) {
    var basic_num = 'a'.charCodeAt(0) - 1;
    for (let i = 0; i < input.length; i++) {
        var char = input[i].toLowerCase();
        input[i] = char.charCodeAt(0) - basic_num;
    }
    return input;
}

let input1 = ['a', 'b', 'c', 'a', 'c', 'a', 'c'] ;
console.log(countAandB(input1)); //should print 4 (3 ‘a’ letters and 1 ‘b’ letter)
console.log(toNumber(input1)); // should print [ 1, 2 , 3 , 1 , 3 , 1 , 3 ]
let input2 = ['e', 'd', 'c', 'd', 'e'];
console.log(countAandB(input2)); // should print 0
console.log(toNumber(input2)); // should print [ 5, 4 , 3 , 4 , 5 ]