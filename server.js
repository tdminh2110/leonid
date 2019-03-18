function makeAllCaps(array) {
    return new Promise((resolve, reject) => {
        let capsArray = array.map(word => {
            if (typeof word === 'string') {
                return word.toUpperCase();
            } else {
                reject("Co loi");
            }
        })
        //resolve(capsArray);
        reject;
    })
}

function sortWords(array) {
    return new Promise((resolve, reject) => {
        if (array) {
            array.forEach(element => {
                if (typeof element !== 'string') {
                    reject("Co lo sap xep");
                }
            })
            resolve(array.sort());
        } else {
            reject("Co loi sap xep");
        }
    })
}

const arrayOfWords = ['cucumber', 'tomatos', 9];

makeAllCaps(arrayOfWords)
.then(sortWords)
.then((result) => console.log(result))
.catch((err) => console.log(err));