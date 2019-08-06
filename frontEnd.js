function getByName(){
    var ipValue=document.getElementById('showName').value;
    console.log("input value is"+ipValue);

    var div = document.createElement('div');
    div.innerHTML =ipValue;
    document.getElementById('mainDiv').appendChild(div);
}