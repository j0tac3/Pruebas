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
        
        let start = textArea.selectionStart;
        let end = textArea.selectionEnd;
        let originalTextInitial = textArea.value.substring(0, start);
        let originalTextEnd = textArea.value.substring(end);
        let formatedText = `${originalTextInitial}<${tagInicial}>${originalTextEnd}`;
        textArea.value = formatedText;
        textArea.setSelectionRange( start + 2 + tagInicial.length, end + 2 + tagFinal.length, "forwawd");
        textArea.focus();

        let file = inputvideo.files[0];
        files.push(file);
    }
}

function onChargeImageFormFile(file){
    let img = document.createElement("IMG");

    let reader = new FileReader();
    reader.addEventListener("load", function() {
        img.src = reader.result;
        img.classList.add("adventureImage");
    }, false);
    if (file){
        reader.readAsDataURL(file);
        prevTitle.appendChild(img);
    }
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
                    tagInicial = `a href="https://${linkValue}" target="_blank"`
                    tagFinal = "a";
                }
                break;
            case "image":
                tagInicial = "img"
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
    if (tagInicial && tagFinal && tagInicial !== "img"){
        let start = textArea.selectionStart;
        let end = textArea.selectionEnd;
        let textSelected = textArea.value.substring(start, end);
        let originalTextInitial = textArea.value.substring(0, start);
        let originalTextEnd = textArea.value.substring(end);
        let formatedText = `${originalTextInitial}<${tagInicial}>${textSelected}</${tagFinal}>${originalTextEnd}`;
        textArea.value = formatedText;
        textArea.setSelectionRange( start + 2 + tagInicial.length, end + 2 + tagFinal.length, "forwawd");
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
        if(element[0] === "<" && element[1] == "i" && element[2] === "m" && element[3] === "g" && element.indexOf('src="') > 0){
            let imageName = element.substring(element.indexOf('src="') + 5, element.indexOf(">") - 1);
            let fileSelected = files.filter( image => image.name === imageName)[0];
            if (fileSelected)
                onChargeImageFormFile(fileSelected);
        } else {
            if (element[0] === "<" && element[1] === "h"){
                elementTag = element.substring(1, 3);
                elementToAdd = document.createElement(elementTag);
                elementToAdd.classList.add("title");
                elementValue = element.substring(element.indexOf(">") + 1, element.lastIndexOf("</"));
                elementToAdd.innerHTML = elementValue;
            } else {
                elementToAdd = document.createElement("P");
                if (element.includes('"_blank"><img src="')){
                    elementLink = document.createElement("A");
                    elementLink.href = element.substring(element.indexOf("href=") + 6, element.indexOf(" target") - 1);
                    elementLink.target = "_blank";
                    elementLink.classList.add("adventureImage");

                    let imageName = element.substring(element.indexOf('src="') + 5, element.lastIndexOf('">'));
                    let fileSelected = files.filter( image => image.name === imageName)[0];
                    let img = document.createElement("IMG");
                    let reader = new FileReader();
                    reader.addEventListener("load", function() {
                        img.src = reader.result;
                    }, false);
                    if (fileSelected){
                        reader.readAsDataURL(fileSelected);
                        elementLink.appendChild(img);
                    }
                    elementToAdd.appendChild(elementLink);
                }
                else {
                    elementValue = element;
                    elementToAdd.innerHTML = elementValue;
                }
                elementValue = element;
            }
            prevTitle.appendChild(elementToAdd);
        }
    }
}
