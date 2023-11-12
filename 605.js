/**
 * 
 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。

 

示例 1：

输入：flowerbed = [1,0,0,0,1], n = 1
输出：true
示例 2：

输入：flowerbed = [1,0,0,0,1], n = 2
输出：false
 

提示：

1 <= flowerbed.length <= 2 * 104
flowerbed[i] 为 0 或 1
flowerbed 中不存在相邻的两朵花
0 <= n <= flowerbed.length
 */

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */

const flowerbed = [1, 0, 0, 0, 1];
const n = 2;

var canPlaceFlowers = function (flowerbed, n) {

    // 判断花坛是否打破了规则
    function canAlive(flowerbed) {
        return flowerbed.every((flowerNum, index, arr) => {
            if (flowerNum === 0) {
                return true;
            }
            if (flowerNum === 1) {
                const behind = arr[index - 1];
                const after = arr[index + 1];
                if (behind && behind === 1) {
                    return false;
                }
                if (after && after === 1) {
                    return false
                }
                return true;
            }

        })
    }

    if(n === 0){
        return canAlive(flowerbed);
    }

    // 遍历bed-n轮，每一轮暴力判断是否Alive
    let aliveRes = false;
    let curBed = [...flowerbed];
    while(n > 0){
        aliveRes = false;
        for (let i = 0; i < curBed.length; i++) {
            if(curBed[i] === 1){
                continue;
            }
            const newBed = [...curBed];
            newBed[i] = 1;
            if (canAlive(newBed)) {
                aliveRes = true;
                curBed = newBed;
                break;
            }
        }
        n--;
    }
    

    return aliveRes;
};

canPlaceFlowers(flowerbed, n);


// 贪心思路
var canPlaceFlowers2 = function (flowerbed, n) {
    flowerbed.unshift(0);
    flowerbed.push(0);
    for (let i = 1; i < flowerbed.length - 1; i++) {
        if (flowerbed[i - 1] === 0 && flowerbed[i] === 0 && flowerbed[i + 1] === 0) {
            flowerbed[i] = 1; // 种花！
            n--;
            if(n === 0){
                return true;
            }
        }
    }
    return n <= 0;
};