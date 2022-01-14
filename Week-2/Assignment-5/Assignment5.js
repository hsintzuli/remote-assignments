function binarySearchPosition(numbers, target) {
  let first = 0;
  let last = numbers.length - 1;
  let locn = -1;                  // if target not in numbers, return -1
  while (first <= last) {
    let mid = Math.floor((first + last) / 2);
    if (numbers[mid] < target) {
      first = mid + 1;
    } else if (numbers[mid] > target) {
      last = mid - 1;
    } else {
      locn = mid;
      break;
    }
  }
  return locn
}
console.log(binarySearchPosition([1, 2, 5, 6, 7], 1)); // should print 0
console.log(binarySearchPosition([1, 2, 5, 6, 7], 6)); // should print 3