const preView = document.getElementById("preView");
const clear = document.getElementById("clear");
clear.addEventListener("click", onClear);

const optionsItem = document.getElementsByClassName("option__item");
for (let item of optionsItem){
    item.addEventListener("click", optionSelected);
}

const textArea = document.getElementById("editor__body");

function optionSelected(event) {
    addOptionSelected();
    textArea.focus();
}

function addOptionSelected(){
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let textSelected = textArea.value.substring(start, end);
    let originalTextInitial = textArea.value.substring(0, start);
    let originalTextEnd = textArea.value.substring(end);
    let formatedText = `${originalTextInitial}<b>${textSelected}</b>${originalTextEnd}`;
    textArea.value = formatedText;
    textArea.setSelectionRange(start + 3, end + 3);
}

function onClear(){
    let userConfirm = confirm("Se eliminará todo el contenido, ¿desea continuar?");
    if (userConfirm){
        textArea.value = "";
    }
}