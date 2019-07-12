
let db, inputValue, index1, index2;
//event.target.result
//---------------------------------------------------------------------------------------
//-----------------------------------------------------------------------HTML body
const input = document.createElement('input');
const inputLabel = document.createElement('label');
inputLabel.id ="dataLabel";
inputLabel.textContent="Database name: ";
input.type = 'text';
input.placeholder ='database name ';
input.id ='textDB';
input.addEventListener('click', function(){
    input.placeholder = '';
});
const addBtn = document.createElement('button');
addBtn.id = 'btnCreateDB';
addBtn.textContent='Generate DB';
const container = document.querySelector('.container');
container.appendChild(inputLabel);
container.appendChild(input);

addBtn.addEventListener('click',createDB);
const dbPath1 = document.createElement('section');
const dbPath2 = document.createElement('section');
container.appendChild(dbPath1);
container.appendChild(dbPath2);

const dbInput1 = document.createElement('input');
const dbInput1Label = document.createElement('label');
dbInput1Label.textContent="field 1: ";
const dbInput2 = document.createElement('input');
const dbInput2Label = document.createElement('label');
dbInput2Label.textContent="field 2: ";
//----------------------------------------------------------------Datbase Key Path 1
dbInput1.type='text';
dbInput1.placeholder='database index';
dbInput1.id='path1';
dbInput1.addEventListener('click', function(){
    dbInput1.placeholder='';
});
//----------------------------------------------------------------Database Key Path 2
dbInput2.placeholder='database index';
dbInput2.type='text';
dbInput2.id='path2';
dbInput2.addEventListener('click', function(){
    dbInput2.placeholder ='';
});
//----------------------------------------------------------------HTML
dbPath1.appendChild(dbInput1Label);
dbPath1.appendChild(dbInput1);
dbPath2.appendChild(dbInput2Label);
dbPath2.appendChild(dbInput2);
container.appendChild(addBtn);
//-----------------------------------------------------------------Creating new database
function createDB () {
    inputValue = document.getElementsByTagName('input');
    let dbNew = inputValue.textDB.value;
    let dbIndex1 = document.getElementById('path1');
    let dbIndex2 = document.getElementById('path2');
    index1 = dbIndex1.value;
    index2 = dbIndex2.value;

    const request = window.indexedDB.open(dbNew,1);
    request.onerror= function () {
        console.log("Error"); //obsługa błędu
    };
    request.onupgradeneeded = function (event) {
        console.log("aktualizacja") //obsługa błędu
        db = event.target.result;
        let objectStore = db.createObjectStore(`${inputValue.textDB.value}`,{autoIncrement : true });
        objectStore.createIndex(`${index1}`,`${index1}`, {unique: true});
        objectStore.createIndex(`${index2}`,`${index2}`, {unique: true});
    };
    request.onsuccess= function () {
        console.log("Dodano nową bazę") //obsługa błędu
    }
}
//----------------------------------------------------------------- DB Add------
const dbInputSection = document.createElement('section');
container.appendChild(dbInputSection);
const dbInput1ValueLabel = document.createElement('label');
dbInput1ValueLabel.textContent =" field 1 value: ";
const dbInput1Value = document.createElement('input');
dbInput1Value.type='text';
dbInput1Value.id ='value1';
dbInput1Value.placeholder = 'index value';
dbInputSection.appendChild(dbInput1ValueLabel);
dbInputSection.appendChild(dbInput1Value);

const dbInput2ValueLabel = document.createElement('label');
dbInput2ValueLabel.textContent =" field 2 value: ";
const dbInput2Value = document.createElement('input');
dbInput2Value.type='text';
dbInput2Value.id ='value2';
dbInput2Value.placeholder = 'index value';
dbInputSection.appendChild(dbInput2ValueLabel);
dbInputSection.appendChild(dbInput2Value);

const dbInputBtn = document.createElement('button');
dbInputBtn.textContent="Submit";
dbInputSection.appendChild(dbInputBtn);
dbInputBtn.addEventListener('click', add);

function add (){
    console.log(index1, index2)
    const value1 = document.querySelector('#value1');
    const value2 = document.querySelector('#value2');
    let request = db.transaction([`${inputValue.textDB.value}`], 'readwrite')
        .objectStore(`${inputValue.textDB.value}`)
        .add({index1: `${value1.value}`, index2: `${value2.value}`});
    request.onsuccess = function (event) {
        console.log('The data has been written successfully');
    };
    request.onerror = function (event) {
        console.log('Adding data has failed');
    }
}



//-----------------------------------------------------------------------------------------------------------------
// const productData = [
//     { my_key: "444444", name: "apple", price: 2.5, discount: "5%"},
//     { my_key: "555555", name: "pineapple", price: 3.2, discount: "3%" }
// ];
//
// //tworzenie bazy danych nazwa: owoce
// const dbName ="fruits";
//
// //otwoarcie bazy danych
//
// const request = window.indexedDB.open(dbName, 1);
//
// request.onerror= function () {
//     console.log("Error") //obsługa błędu
// }
// request.onupgradeneeded = function (event) {
// // "my_key" key path, tworzenie obiektu store
//     let db = event.target.result;
//     let objectStore = db.createObjectStore("fruits",{autoIncrement : true });
//     objectStore.createIndex('name','name', {unique: true});// musza mieć różne nazywy
//     objectStore.createIndex('price','price', {unique: false});//2 produkty mogą miec taka samą cenę
//     objectStore.createIndex('discount','discount', {unique:false, multiEntry:true});
// //dodawanie elementów do obiektu store
//     objectStore.transaction.oncomplete = function () {
//         console.log( "działa")
//         let productsObjectStore = db.transaction(['fruits'], 'readwrite').objectStore('fruits');
//         console.log(productsObjectStore)
//         productData.forEach(function(fruits) {
//             productsObjectStore.add(fruits)
//         })
//     }
// }
//
// request.onsuccess = function () {
//     console.log("baza jest aktywna");
// }

