function twoSum(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        let pair = target - nums[i];
        for (let j = i + 1; j < nums.length; j ++) {
            if (nums[j] === pair) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}
const nums = [2, 7, 11, 15];
target = 9;
console.log(twoSum(nums, target));
