function twoSum(nums, target) {
    const map = new Map();
    let pair;
    for (let i = 0; i < nums.length; i++) {
        pair = target - nums[i];
        if (map.has(pair)) {
            return [map.get(pair), i];
        }
        map.set(nums[i], i);
    }
    return [-1, -1];
}
const nums = [2, 7, 11, 15];
target = 9;
console.log(twoSum(nums, target));
