let surnames = ["10", "juan", "@12", "null", "antonioPerezDelCarmen", "abcdefghtioiasoisdjads", "Manolo", "Perez", "Soledad"];
let excuses = ["OMG?", "What’s going on?", "How much is it?", "18", null, 'undefined', function(){}];
// For testing 'not string found'.
//let num = [1,2,3,4,5];
// For testing deep limits:
// let excuses = ["OMG?", ["What’s going on?", "How much is it?"], "18", "a", null, 'undefined', function(){}];
let names = ["Jeferson", "Matilda", "R@fael", "1van", "Pep3", "Loquesea", "Fel1berto", "Pepit@", "D@M"];
// For testing duplicates:
// let duplicados = [1,2,3,3,"4","4",5];

/**
 * Excuses generator
 */

function randomIndex(iterable) {
    idx = Math.round(Math.random() * (iterable.length));
    return idx;
}

function randomElement(iterable, maxRetries = 100) {
    let element = null;
    let counter = 0;
    while (typeof(element) !== "string" && counter < maxRetries) {
        // Search n times for a string.
        element = iterable[randomIndex(iterable)];
        counter++;
    }
    if  (typeof(element) !== "string") {
        // I found't a string, so I will print a error and return "".
        console.error(`Can't found a string in ${maxRetries} retries.`);
        element = ""
    }
    return element;
}

function buildExcuse(names, surnames, excuses) {
    const name = randomElement(names);
    const surname = randomElement(surnames);
    const excuse = randomElement(excuses);
    return `Entonces ${name} ${surname} fue como ${excuse}!!!`;
}

console.log(buildExcuse(names, surnames, excuses))
//console.log(buildExcuse(num, surnames, excuses))

/**
 * Characters ratio
 */

function countLetters(iterable, maxDeep = 1, deep = 1, counters = {}, childs = [1]) {
    //
    //  Iterares over arrays and strings searching for characters and counting each of them.
    //  Keep tracking deep level and running childs for deep limith and control end reach.
    //

    if ( deep > maxDeep+1 ) {
        console.log("Max deep reached.");
        childs[0]--
        return;
    }
    
    for (let i=0; i < iterable.length; i++) {
        // Iterating over items 
        let item = iterable[i];
        if ( Array.isArray(item) || (typeof(item) === "string" && item.length > 1) ) {
            // Iterate if it's array or string and not a single character 
            childs[0]++
            countLetters(item, maxDeep, deep+1 , counters, childs); // Recursing
        } else if (typeof(item) === "string" ) {
            // Count if it's a single character 
            if (counters.hasOwnProperty(item)) {
                counters[item] += 1;
            } else {
                counters[item] = 1;
            }
        }
    }

    childs[0]--

    if ( childs[0] === 0 ) {
        return {...counters}
    }
}

/*console.log(
    JSON.stringify(countLetters(excuses, 3))
)*/

/*console.log(
    JSON.stringify(countLetters(excuses, 2))
)*/

console.log(
    JSON.stringify(countLetters(excuses))
)

/**
 * Drop duplicates
 */

function inArray(item,array) {
    // Is item into array?
    let found = false;
    for (let i=0 ; i < array.length && !found ; i++) {
        if (array[i] === item) found = true;
    }
    return found;
}

function dropDuplicated(array){
    let newArray = []
    let nextArrayIdx = newArray.length
    for (let i=0 ; i < array.length ; i++) {
        let item = array[i];
        if ( !inArray(item,newArray) ) newArray[nextArrayIdx++] = item;
    }
    return newArray;
}

//console.log(inArray("10",surnames))
//console.log(inArray(10,surnames))
//console.log(dropDuplicated(duplicados))

/**
 * Reverse
 */

 function reverse(array) {
    let lastElementIdx = array.length - 1
    const newArray = [];
    //Cross over array in inverse order
    for (let i = lastElementIdx; i >= 0; i--) {
        //Add elements to newArray, starting by idx 0.
        newArray[lastElementIdx - i] = array[i]
    }
    return newArray
}

console.log(reverse(excuses))