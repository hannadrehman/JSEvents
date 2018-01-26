/// <reference path="./libs/JSEvents.js" />
var count=0;

var currentScope={
  author:'hannadrehman'
}

function getInputValue(){
  return document.getElementById('input').value;
}
function callbackForEvent(ev,data){
  count+=1;
  document.getElementById('results').innerHTML=data
  document.getElementById('callbacks').innerHTML=count
}

function addEv(){
  JSEvents.addEventListener('CLICK',callbackForEvent,currentScope)
  count=0;
}
function dispatchEv(){
  count=0;
  JSEvents.dispatchEvent('CLICK',getInputValue())
  console.log('dispatched')
}
