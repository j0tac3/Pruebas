const preView = document.getElementById("preView");
const clear = document.getElementById("clear");
clear.addEventListener("click", onClear);

const optionsItem = document.getElementsByClassName("option__item");
for (let item of optionsItem){
    item.addEventListener("click", optionSelected);
}

const textArea = document.getElementById("editor__body");
let tagInicial = "";
let tagFinal = "";

async function optionSelected(event) {
    console.log(event.target);
    let tagSelected = await onGetOptionTag(event.target.id);
    addOptionSelected(tagSelected);
    textArea.focus();
}

async function onGetOptionTag(elementID){
    switch (elementID){
        case "h2":
        case "h3":
        case "h4":
            tagInicial = elementID;
            tagFinal = elementID;
            break;
        case "bold":
            tagInicial = "b"
            tagFinal = "b";
            break;
        case "italic":
            tagInicial = "i"
            tagFinal = "i";
            break;
        case "underline":
            tagInicial = "u"
            tagFinal = "u";
            break;
        case "link":
            let linkValue = prompt("Inserte el link:");
            tagInicial = `a href="${linkValue}"`
            tagFinal = "a";
            break;
        case "image":
            return "img"
            break;
        case "video":
            return "video"
            break;
    }
}

function addOptionSelected( tagSelected ){
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let textSelected = textArea.value.substring(start, end);
    let originalTextInitial = textArea.value.substring(0, start);
    let originalTextEnd = textArea.value.substring(end);
    let formatedText = `${originalTextInitial}<${tagInicial}>${textSelected}</${tagFinal}>${originalTextEnd}`;
    textArea.value = formatedText;
    textArea.setSelectionRange(start + 2 + tagInicial.length, end + 2 + tagFinal.length);
}

function onClear(){
    let userConfirm = confirm("Se eliminará todo el contenido, ¿desea continuar?");
    if (userConfirm){
        textArea.value = "";
    }
}