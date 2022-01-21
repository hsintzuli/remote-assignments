function twoSum(nums, target) {
    const dict = {};
    for (let i = 0; i < nums.length; i++) {
        const pair = target - nums[i];
        if (pair in dict) {
            return [dict[pair], i];
        }
        dict[nums[i]] = i;
    }
    return [-1, -1];
}
const nums = [2, 7, 11, 15];
target = 9;
console.log(twoSum(nums, target));
