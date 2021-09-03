const prevTitle = document.getElementById("prev__title");
const preView = document.getElementById("preView");
preView.addEventListener("click", onPrevAdventure);
const clear = document.getElementById("clear");
clear.addEventListener("click", onClear);

const optionsItem = document.querySelectorAll(".option__item");
for (let item of optionsItem){
    item.addEventListener("click", optionSelected);
}

const textArea = document.getElementById("editor__body");
let tagInicial;
let tagFinal;
let files = [];

let filelabel = document.getElementById("filelabel");
let inputvideo = document.getElementById("fileImage");
inputvideo.addEventListener("change", onChangeInput);

function onChangeInput(){
    if (inputvideo.value){
        tagInicial = `img src="${inputvideo.files[0].name}"`;
        tagFinal = "img";
        addOptionSelected();
        textArea.focus();

        let file = inputvideo.files[0];
        //onChargeImageFormFile(file);
        files.push(file);
    }
}

function onChargeImageFormFile(file){
    let reader = new FileReader();
        reader.onload = function(e){
            let img = document.createElement("IMG");
            img.src = e.target.result;
            prevTitle.appendChild(img);
        }
    reader.readAsDataURL(file);
}

async function optionSelected(event) {
    await onGetOptionTag(event.target.id);
    addOptionSelected();
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
                if (linkValue){
                    tagInicial = `a href="https://${linkValue}" target="_blank`
                    tagFinal = "a";
                }
                break;
            case "image":
                filelabel.click();
                break;
            case "video":
                filelabel.click();
                break;
            default:
                break;
        };
        return "OK";
}

async function onGetMediaFile(){
    inputvideo.click();
}

function addOptionSelected(){
    if (tagInicial && tagFinal){
        let start = textArea.selectionStart;
        let end = textArea.selectionEnd;
        let textSelected = textArea.value.substring(start, end);
        let originalTextInitial = textArea.value.substring(0, start);
        let originalTextEnd = textArea.value.substring(end);
        let formatedText = `${originalTextInitial}<${tagInicial}>${textSelected}</${tagFinal}>${originalTextEnd}`;
        textArea.value = formatedText;
        textArea.setSelectionRange( start + 2 + tagInicial.length, end + 2 + tagFinal.length, "forwawd");

        tagFinal = "";
        tagInicial = "";
    }
}

function onClear(){
    let userConfirm = confirm("Se eliminará todo el contenido, ¿desea continuar?");
    if (userConfirm){
        textArea.value = "";
    }
}

function onPrevAdventure(){
    prevTitle.textContent = "";
    let textToPrev = textArea.value;
    textElements = textToPrev.split("\n");
    for (let element of textElements){
        let elementToAdd;
        let elementTag;
        let elementValue;
        if (element[0] === "<" && element.indexOf("href") > 0){
            elementTag = "a";
            elementTag.href = element.substring(element.indexOf("f=") + 3, element.indexOf('">'));
            elementValue = element[0] === "<" ? element.substring(element.indexOf(">") + 1, element.lastIndexOf("</") - 1) : element;
    } else {
            elementTag = element[0] === "<" ? element.substring(element.indexOf("<") + 1, element.indexOf(">")) : "p";
            elementValue = element[0] === "<" ? element.substring(element.indexOf(">") + 1, element.lastIndexOf("</") - 1) : element;
        }
        elementToAdd = document.createElement(elementTag);
        elementToAdd.innerHTML = elementValue;
        prevTitle.appendChild(elementToAdd);
    }
}