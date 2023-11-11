/**
 * 对于字符串 s 和 t，只有在 s = t + ... + t（t 自身连接 1 次或多次）时，我们才认定 “t 能除尽 s”。

给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 x 能除尽 str2 。

 

示例 1：

输入：str1 = "ABCABC", str2 = "ABC"
输出："ABC"
示例 2：

输入：str1 = "ABABAB", str2 = "ABAB"
输出："AB"
示例 3：

输入：str1 = "LEET", str2 = "CODE"
输出：""
 

提示：

1 <= str1.length, str2.length <= 1000
str1 和 str2 由大写英文字母组成
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */

const str1 = 'ABABAB';
const str2 = 'ABAB';

/**
 * 下面的方式是我一开始想出来的，但是其实找的是最长公共子串，并不是找的最大公因子，留作对比，例如ABABAB与ABAB，返回的是ABAB！
 * var gcdOfStrings = function(str1, str2) {
    // 声明变量：存储最长公因子，当前公因子，存储最长长度，当前长度
    let maxCommonStr = '';
    let curCommonStr = '';
    let maxLength = 0;
    let curLength = 0;

    // 遍历str1 - str1[index]存入当前公因子
    // 若str2 not includes当前公因子，当前公因子字符串与长度清0
    // 若str2 includes当前公因子，且当前长度大于最长长度，将最长公因子与长度更新
    // 继续下一轮
    for(let i = 0; i < str1.length; i++){
        curCommonStr = curCommonStr.concat(str1[i]);
        curLength++;
        if(str2.includes(curCommonStr) && curCommonStr.length > maxLength){
            maxCommonStr = curCommonStr;
            maxLength = curLength;
        } else {
            curCommonStr = '';
            curLength = 0;
        }
    }
    console.log(maxCommonStr, maxLength);

};

gcdOfStrings(str1, str2);
 */

// 方法一：枚举
var gcdOfStrings = function (str1, str2) {
    // 前缀长度必然是两个字符串的约数才能满足条件，例如6与4，约数是2，所以唯一可能的就是length为2的前缀，取出来判断一下即可
    // 约数的判断：len1 mod lenx === 0 ， len2 mod lenx === 0
    // 枚举符合长度要求的前缀串，再去判断前缀拼接若干次之后是否等于str1与str2（注意：必须是拼接后可以全等，而非includes的关系，例如ABAB在str1和2都是includes，但是拼接不出来ABABAB）
    // 题目要求最长的公因子，所以从大到小去尝试即可

    function checkCanJoin(X, str){
        const joinCount = str.length / X.length;
        const ans = [];
        for(let i = 0; i < joinCount; i ++){
            ans.push(X);
        }
        return (ans.join('')) === str;
    }

    const len1 = str1.length;
    const len2 = str2.length;
    for (let i = Math.min(len1, len2); i > 0; --i) {
        const X = str1.substring(0, i);
        if (checkCanJoin(X, str1) && checkCanJoin(X, str2)) {
            return X;
        }
    }
    return '';
}
console.log(gcdOfStrings(str1, str2));

// 方法二：优化 + 数学
var gcdOfStrings2 = function (str1, str2) {
    // 上述枚举方法我们知道最终答案出现在gcd(len1,len2)的所有约数中，这里通过推导我们只需要判断长度为gcd(len1,len2)的前缀串是否满足上述checkCanJoin即可
    // 求最大公约数可以使用辗转相除法
    // 如果 str1 和 str2 拼接后等于 str2和 str1 拼接起来的字符串（注意拼接顺序不同），那么一定存在符合条件的字符串 X。
    // 有了该性质以及前面两条描述的性质，我们就可以先判断 str1 和 str2 拼接后是否等于 str2 和 str1 拼接起来的字符串，如果等于直接输出长度为gcd(len1,len2)的前缀串即可
    if( str1 + str2 !== str2 + str1){
        return ''
    }

    function gcd(num1,num2){
        return num2 === 0 ? num1 : gcd(num2 , num1%num2)
    }

    return str1.substring(0,gcd(str1.length,str2.length))
}
console.log(gcdOfStrings2(str1, str2));
