'use strict'

var intrvalId;
var gNums = [];
var gNextNum = 1;
var tableSize;
var miliseconde;
var gIsClicked = false;

function init() {
    //var num = +prompt('Please enter a number');
    renderBored(4);
}

function renderBored(num) {
    tableSize = num * num;
    gNums = createNums(tableSize);
    var strHTLM = '';
    for (var i = 0; i < num; i++) {
        strHTLM += '<tr>';
        for (var j = 0; j < num; j++) {
            shuffle(gNums);
            var currNum = gNums.pop();
            strHTLM += `<td data-num="${currNum}" onclick="cellClicked(this)">${currNum}</td>`;
        }
        strHTLM += '</tr>';
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTLM;
}

function cellClicked(elTd) {

    if(!gIsClicked) {
        var startTimer = Date.now();
        intrvalId = setInterval(function() {
            //console.log('timer started');
            miliseconde = (Date.now() - startTimer)/1000;
            var elH4 = document.querySelector('.clock')
            elH4.innerText = miliseconde.toFixed(2);
        }, 300);
        gIsClicked = true;
    }

    var elContainer = document.querySelector('.container');
    elContainer.setAttribute('style', 'visibility: visible');
    var clickedNum = +elTd.getAttribute('data-num');

    if (clickedNum === gNextNum) {
        elTd.classList.toggle('color');
        gNextNum++;
    }
    
    var elNextNum = document.querySelector('.nextNum');
    elNextNum.innerText = gNextNum;

    if (clickedNum === tableSize) {
        clearInterval(intrvalId);
        console.log('You Won!')
    }
}

function createNums(num) {
    for (var i = 0; i < num; i++) {
        gNums.push(i + 1);
    }
    return gNums
} 

