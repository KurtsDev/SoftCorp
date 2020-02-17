function getFile(fileName) {
    let request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return JSON.parse(request.responseText);
}

let data = getFile('task/data.json');
let names = getFile('task/names.json');

let goods = data['Value']['Goods'];

let productPropertiesArr = [];

for (let [key, value] of Object.entries(goods)) {
    let productPropertiesId = value['T'];
    productPropertiesArr[productPropertiesId] = value

}

let productNamesArr = [];

for (let [key, value] of Object.entries(names)) {
    let product = value.B;
    let group = value.G;
    for (let [key, value] of Object.entries(product)) {
        value.group = group;
        productNamesArr[key] = value;
    }
}

for (let [key, value] of Object.entries(productPropertiesArr)) {
    for (let [key1, value1] of Object.entries(productNamesArr)) {
        if (key === key1) {
            Object.assign(value, value1);
        }

    }

}


structureArr = [];

for (let [key, value] of Object.entries(productPropertiesArr)) {
    let group = value.group;
    if (!structureArr[group]) {
        structureArr[group] = [];
    }

    structureArr[group].push(value);
}
console.log(structureArr);

for (let [key, value] of Object.entries(structureArr)) {


    let divCategory = document.createElement('div',);
    divCategory.id = 'category';
    document.body.append(divCategory);


    let nameCategory = document.createElement('div',);
    nameCategory.className = 'name-category';
    divCategory.append(nameCategory);
    nameCategory.appendChild(document.createTextNode(key));

    for (let i = 0; i < value.length; i++) {

    let divItem = document.createElement('div',);
    divItem.className = 'item';
    nameCategory.append(divItem);



        let divName = document.createElement('div',);
        divName.className = 'name';
        divItem.append(divName);
        divName.appendChild(document.createTextNode(value[i].N));



        let divPrice = document.createElement('div',);
        divPrice.className = 'price';
        divItem.append(divPrice);

        divPrice.appendChild(document.createTextNode(value[i].C));
    }


}


// function addTable(structureArr) {
//     var myTableDiv = document.getElementById("myDynamicTable");
//     var table = document.createElement('TABLE');
//     //table.border = '1';
//     var tableBody = document.createElement('TBODY');
//     table.appendChild(tableBody);
//


// for (let [key, value] of Object.entries(productPropertiesArr)) {
//
//     let prod = value;
//
//     var th = document.createElement('TH');
//     th.appendChild(document.createTextNode(key));
//     var tr = document.createElement('TR');
//
//
//
//
//     tableBody.appendChild(tr);
//     for (let [key, value] of Object.entries(prod)) {
//         var td = document.createElement('TD');
//         //td.width = '75';
//         td.appendChild(document.createTextNode(  value));
//         tr.appendChild(td);
//     }
//
//
//
//
// }//


//
//
//     myTableDiv.appendChild(table);
// }
// addTable()
//
//




