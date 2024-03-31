function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

const originalString = "hello";
const reversedString = reverseString(originalString);
console.log(reversedString);

