console.warn(123456);

/*interface LabelledValue {
    label?: string;
    name?: string;
}

function printLabel(labelledObj: LabelledValue): { color: string; area: number} {
    console.log(labelledObj.label);
    return { color: "string", area: 123 };
}

let myObj = { size: 10, label: "Size 10 Object",nam:"789" };
console.log(printLabel(myObj));*/


/*interface LabelledValue {
    color?: string;
    width?: number;
}

function createSquare(labelledObj: LabelledValue): { color: string; area: number }  {
    return { color: "string",area: 123};
}

var obj = { color: "red", width: 100, dfd: "789" };
let mySquare = createSquare(obj);*/

/*interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (src, sub) {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}*/

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];



// document.getElementById("wrapper").innerHTML="";

console.warn(123456);