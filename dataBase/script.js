let db, inputValue,dbNew, tableSection

dbNew = 'person';
const addBtn = document.createElement('button');
addBtn.id = 'btnCreateDB';
addBtn.textContent='Generate DB';
const container = document.querySelector('.container');
addBtn.addEventListener('click',createDB);
const dbPath1 = document.createElement('section');
const dbPath2 = document.createElement('section');
container.appendChild(dbPath1);
container.appendChild(dbPath2);
container.appendChild(addBtn);

function createDB () {
    inputValue = document.getElementsByTagName('input');
    dbNew = 'people';
    const request = window.indexedDB.open(dbNew,1);
    request.onerror= function (e) {
        console.log("Error" + e.target.error); //obsługa błędu
    };
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        let objectStore;
        if (!db.objectStoreNames.contains(dbNew)) {
            objectStore = db.createObjectStore(dbNew, {keyPath: 'id', autoIncrement:true});
            objectStore.createIndex('name', 'name', {unique: true});
            objectStore.createIndex('mail', 'mail', {unique: false});
        }
    }
    request.onsuccess= function () {
        db = request.result;
        console.log("Dodano nową bazę") //obsługa błędu
    }
}
//----------------------------------------------------------------- DB Add------
const dbInputSection = document.createElement('section');
container.appendChild(dbInputSection);
const dbInput1ValueLabel = document.createElement('label');
dbInput1ValueLabel.textContent ="Name: ";
const dbInput1Value = document.createElement('input');
dbInput1Value.type='text';
dbInput1Value.id ='value1';
dbInput1Value.placeholder = 'index value';
dbInputSection.appendChild(dbInput1ValueLabel);
dbInputSection.appendChild(dbInput1Value);

const dbInput2ValueLabel = document.createElement('label');
dbInput2ValueLabel.textContent =" e-mail: ";
const dbInput2Value = document.createElement('input');
dbInput2Value.type='text';
dbInput2Value.id ='value2';
dbInput2Value.placeholder = 'index value';
dbInputSection.appendChild(dbInput2ValueLabel);
dbInputSection.appendChild(dbInput2Value);
tableSection = document.createElement('section');
tableSection.id ='table';
container.appendChild(tableSection);
const dbInputBtn = document.createElement('button');
const dbTableBtn = document.createElement('button');
dbTableBtn.textContent="Show records";
dbTableBtn.id='dbTableBtn';
dbInputBtn.textContent="Submit";
dbInputSection.appendChild(dbInputBtn);
tableSection.appendChild(dbTableBtn);
dbTableBtn.addEventListener('click', read);
dbInputBtn.addEventListener('click', add);

function createTable (){
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let tr = document.createElement('tr');
    tableSection.appendChild(table);
    thead.appendChild(tr);
    let th = document.createElement('th');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    tr.appendChild(th);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    th.textContent="id";
    th1.textContent ="lp";
    th2.textContent="Full name";
    th3.textContent ="E-mail ";
    th4.textContent ="Edit records ";
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
}
createTable();
//-------------------- adding new objects to database----------------------------------------------------
function add (){
    const value1 = document.querySelector('#value1');
    const value2 = document.querySelector('#value2');
    let request = db.transaction([dbNew],'readwrite')
        .objectStore(dbNew)
        .add({ name: `${value1.value}`, mail: `${value2.value}`});
    request.onsuccess = function () {
        console.log('The data has been written successfully');
    };
    request.onerror = function (e) {
        console.log(e.target.error);
    }
}
// -------------------------------------------- printingout Database--------------------------------------
function read() {

    let objectStore = db.transaction(dbNew).objectStore(dbNew);
    let tBody = document.querySelector('tbody');
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    objectStore.openCursor().onsuccess = function( event) {
        let cursor = event.target.result;
        if (cursor) {
            let tr2 = document.createElement('tr');
            tBody.appendChild(tr2);
            let tdLP =document.createElement('td');
            let tdId = document.createElement('td');
            let tdName = document.createElement('td');
            let tdAddress = document.createElement('td');
            let btnDelete = document.createElement('button');
            let btnEdit = document.createElement('button');
            btnDelete.dataset.delete = 'delete';
            btnDelete.classList.add('delete');
            btnDelete.textContent = "Delete";
            btnEdit.textContent = 'Edit';
            btnEdit.dataset.edit='edit'
            tr2.appendChild(tdId);
            tr2.appendChild(tdLP)
            tr2.appendChild(tdName);
            tr2.appendChild(tdAddress);
            tr2.appendChild(btnDelete);
            tr2.appendChild(btnEdit)
            btnDelete.addEventListener('click', cancelRecord);
            btnEdit.addEventListener('click', edit);
            for(let i =1; i<= tBody.rows.length; i++){
                tdLP.textContent = i.toString(10);
            }
            tdId.textContent = cursor.key;
            tdId.dataset.id ='id';
            tdId.classList.add('id');
            tdLP.dataset.lp ='lp';
            tdLP.classList.add('lp')
            tdName.textContent = cursor.value.name;
            tdName.dataset.name ='name';
            tdName.classList.add('name')
            tdAddress.textContent = cursor.value.mail;
            tdAddress.dataset.address ='address';
            tdAddress.classList.add('address');
            cursor.continue();
        }
    }
}
function cancelRecord() {
    let LP = document.getElementsByClassName('lp');
    let personID = document.querySelector('.id');
    let id = parseInt(personID.textContent,10);
    console.log(id)
    let tBody = document.querySelector('tbody');
    tBody.removeChild(tBody.firstChild);
    let request = db.transaction([dbNew], 'readwrite')
        .objectStore(dbNew)
        .delete(id);
    request.onsuccess = function (event) {
        // console.log('The data has been deleted successfully');
    };
    for(let i =1; i< tBody.rows.length; i++){
        LP.textContent=0;
        LP.textContent = i.toString(10);
    }
    read();
}
function edit () {
    let nameValue = document.querySelector('[data-name~="name"').textContent;
    let emailValue = document.querySelector('[data-address~="address"').textContent;
    console.log(nameValue);
    console.log(emailValue);
    container.style.pointerEvents='none';
    let placeholder = document.createElement('div')
    document.body.appendChild(placeholder)
    placeholder.classList.add('holder');
    let header = document.createElement('h2');
    header.textContent ="Edit form";
    placeholder.appendChild(header);
    let labelName = document.createElement('label');
    labelName.textContent="Full name: "
    placeholder.appendChild(labelName);
    let inputName= document.createElement('input');
    inputName.style.width="300px"
    inputName.id='inputName';
    inputName.value= nameValue;
    labelName.appendChild(inputName)
    let separator = document.createElement('br');
    placeholder.appendChild(separator);
    let labelEmail = document.createElement('label');
    labelEmail.textContent="Email";
    placeholder.appendChild(labelEmail);
    let inputEmail= document.createElement('input');
    inputEmail.id ='inputEmail';
    inputEmail.value = emailValue;
    labelEmail.style.width="300px"
    labelEmail.appendChild(inputEmail);
    let acceptBtn = document.createElement('button');
    acceptBtn.textContent ='Accept';
    placeholder.appendChild(acceptBtn);
    acceptBtn.addEventListener('click', update)
    let cancelBtn = document.createElement('button');
    cancelBtn.textContent='Close';
    placeholder.appendChild(cancelBtn);
    cancelBtn.addEventListener('click', closePopUp)
}
function update(){
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let personID = document.querySelector('[data-id~="id"').textContent;
    let id = parseInt(personID,10);
    console.log(id);
    let request = db.transaction([dbNew], 'readwrite')
        .objectStore(dbNew)
        .put({ id: id, name: `${name.value}`, mail: `${email.value}` });
    request.onsuccess = function (event) {
        console.log('The data has been updated successfully');
    };
    request.onerror = function (event) {
        console.log('The data has been updated failed');
    }
}
function closePopUp () {
    container.style.pointerEvents='unset';
    document.body.lastChild.remove()
    read();
}





