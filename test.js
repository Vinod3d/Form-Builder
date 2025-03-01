let str = "Vinod";
let reversedStr = "";

const reverseString = (str)=>{
    const strLen = str.length;
    console.log(strLen)

    for(let i = strLen; i>0; i-- ){
       reversedStr += str[i-1];
    }

    return reversedStr;
    
}
console.log(reverseString(str))

reverseString(str)