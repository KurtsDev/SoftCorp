function getFile(fileName) {
    let request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return JSON.parse(request.responseText);
}

let data = getFile('task/data.json');
let names = getFile('task/names.json');
let goods = data['Value']['Goods'];

let structureObj = createStructureObj(goods, names);

function createStructureObj(objectA, objectB) {
    let productPropertiesArr = [];
    for (let [key, value] of Object.entries(objectA)) {
        let productPropertiesId = value['T'];
        productPropertiesArr[productPropertiesId] = value
    }

    let productNamesArr = [];
    for (let [key, value] of Object.entries(objectB)) {
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

    let structureObj = [];
    for (let [key, value] of Object.entries(productPropertiesArr)) {
        let group = value.group;
        if (!structureObj[group]) {
            structureObj[group] = [];
        }
        structureObj[group].push(value);
    }

    return structureObj;

}


console.log(structureObj);

drawing(structureObj);

function drawing(obj) {
    for (let [key, value] of Object.entries(obj)) {

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
            divItem.setAttribute('category', key);
            divItem.setAttribute('productName', value[i].N);
            divItem.setAttribute('productPrice', value[i].C);
            divItem.setAttribute('left', value[i].P);
            divItem.addEventListener('click', buy);
            nameCategory.append(divItem);

            let divName = document.createElement('div',);
            divName.className = 'name';
            divItem.append(divName);
            divName.appendChild(document.createTextNode(value[i].N + ' '));
            divName.appendChild(document.createTextNode('(' + value[i].P + ')'));

            let divPrice = document.createElement('div',);
            divPrice.className = 'price';
            divItem.append(divPrice);

            divPrice.appendChild(document.createTextNode(convertUSD(value[i].C)));
        }
    }
}

function convertUSD(value) {
    let usd = 2.1;
    value = value * 1000 * usd / 1000;
    return value;
}


let buyList = [];

function buy(e) {
    let category = e.currentTarget.getAttribute('category');
    let productName = e.currentTarget.getAttribute('productName');
    let productPrice = e.currentTarget.getAttribute('productPrice');
    let left = e.currentTarget.getAttribute('left');
    let quantity = 1;

    if (!buyList[category]) {
        buyList[category] = [];
    }

    let productObj =  {
        N: productName,
        C: productPrice,
        P: left,
        Q: quantity,
    };

    for (let [key, value] of Object.entries(buyList[category])) {
        if (value.N === productObj.N) {
            value.Q++;
            productObj.Z = true;
        }
    }

    buyList[category].push(productObj);

    console.log(buyList);




    drawingCart(buyList);


}

function del(e) {

    let category = e.currentTarget.getAttribute('category');
    let productName = e.currentTarget.getAttribute('productName');
    let productPrice = e.currentTarget.getAttribute('productPrice');
    let left = e.currentTarget.getAttribute('left');
    let quantity = 1;

    if (!buyList[category]) {
        buyList[category] = [];
    }

    let productObj =  {
        N: productName,
        C: productPrice,
        P: left,
        Q: quantity,
    };

    for (let [key, value] of Object.entries(buyList[category])) {
        if (value.N === productObj.N) {
            value.Q--;
            productObj.Z = true;
        }
    }

    buyList[category].push(productObj);

    console.log(buyList);




    drawingCart(buyList);




}



function drawingCart(obj) {



    let divCategoryWrap = document.getElementById('cartwrap');
    divCategoryWrap.innerHTML = '';
     for (let [key, value] of Object.entries(obj)) {







        let divCategory = document.createElement('div',);
        divCategory.className = 'category';
        divCategoryWrap.append(divCategory);

        let nameCategory = document.createElement('div',);
        nameCategory.className = 'name-category';
        divCategory.append(nameCategory);
        nameCategory.appendChild(document.createTextNode(key));


         let total = 0;
         qqq: for (let i = 0; i < value.length; i++) {


            if (value[i].Z) continue qqq;

            if (value[i].Q < 1)  divItem.innerHTML = '';

             total = +total + (+ value[i].C * + value[i].Q);


            let divItem = document.createElement('div',);
            divItem.className = 'item';
            divItem.setAttribute('category', key);
            divItem.setAttribute('productName', value[i].N);
            divItem.setAttribute('productPrice', value[i].C);
            divItem.setAttribute('left', value[i].P);
            divItem.addEventListener('click', del);
            nameCategory.append(divItem);

            let divName = document.createElement('div',);
            divName.className = 'name';
            divItem.append(divName);
            divName.appendChild(document.createTextNode(value[i].N + ' '));
            divName.appendChild(document.createTextNode('(' + value[i].P + ')'));


            let divQuantity = document.createElement('div',);
            divQuantity.className = 'quantity';
            divItem.append(divQuantity);
            divQuantity.appendChild(document.createTextNode( value[i].Q ));



            let divPrice = document.createElement('div',);
            divPrice.className = 'price';
            divItem.append(divPrice);

            divPrice.appendChild(document.createTextNode(convertUSD(value[i].C)));
        }

         let divTotal = document.createElement('div',);
         divTotal.className = 'total';
         divCategory.append(divTotal);

         divTotal.appendChild(document.createTextNode('Общая стоймость - ' + total));


         console.log(total);
    }
}





