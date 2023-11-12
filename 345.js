/**
 * 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。

元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。

 

示例 1：

输入：s = "hello"
输出："holle"
示例 2：

输入：s = "leetcode"
输出："leotcede"
 

提示：

1 <= s.length <= 3 * 105
s 由 可打印的 ASCII 字符组成
 */

/**
 * @param {string} s
 * @return {string}
 */

let s ="hello";

 var reverseVowels = function(s) {
    const targetArr = ['a','e','i','o','u','A','E','I','O','U'];
    // 双指针遍历
    let beginIndex = 0;
    let hasBeginYuan = false;
    let afterIndex = s.length;
    let hasAfterYuan = false;
    s = s.split('');
    while(beginIndex <= afterIndex){
        if(hasBeginYuan && hasAfterYuan){
            // 字符串指定位置互换
            temp = s[beginIndex];
            s[beginIndex] = s[afterIndex];
            s[afterIndex] = temp;
            beginIndex++;
            hasBeginYuan = false;
            afterIndex--;
            hasAfterYuan = false;
        }
        if(!targetArr.includes(s[beginIndex])){
            beginIndex++;
        } else {
            hasBeginYuan = true;
        }
        if(!targetArr.includes(s[afterIndex])){
            afterIndex--;
        } else {
            hasAfterYuan = true;
        }
    }
    s = s.join('');
    return s;
};

console.log(reverseVowels(s));

// 简洁点
var reverseVowels2 = function(s) {
    const n = s.length;
    const arr = Array.from(s);
    let i = 0, j = n - 1;
    while (i < j) {
        while (i < n && !isVowel(arr[i])) {
            ++i;
        }
        while (j > 0 && !isVowel(s[j])) {
            --j;
        }
        if (i < j) {
            swap(arr, i, j);
            ++i;
            --j;
        }
    }
    return arr.join('');
}

const isVowel = (ch) => {
    return "aeiouAEIOU".indexOf(ch) >= 0;
}

const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}