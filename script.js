var tasks = [];
var tasksDone = [];

// Récupération des données du localStorage grâche à l'auto-invocation.
(function() {
    tasks = JSON.parse(localStorage.getItem('tasts')) || [];
    tasksDone = JSON.parse(localStorage.getItem('tastsDone')) || [];

    tasks.forEach((elem)=>{
        var container = document.createElement("div");
        container.className = "container";
        container.innerHTML = "<div onmousedown='mouseOver(this)' class='leftContent'><input type='text' class='input' id='modifImput'><div class='icons'><h3 onclick='save(this)'>save</h3></div><div class='mark' onclick='terminer(this)'></div><div class='doneMark' onclick='terminer(this)'><img src='checkmark-sharp.svg' alt=''></div><p id='text' onclick='terminer(this)'>"+elem.value+"</p></div><div class='rContent' onmouseleave='mouseOut(this)''><div class='icons'><img onclick='modifier(this)' id='modif-btn' src='pencil-sharp.svg' alt=''><img onclick='supprimer(this)' id='supp-btn' src='trash-sharp.svg' alt=''></div><input type='datetime-local' name='date' id='date'><span>Priorité</span><input type='number' value="+elem.priorite+" placeholder='0' name='priorité' id='priorité' class='priorite'></div>";
        document.body.querySelector(".liste").style.display = "block";
        document.body.querySelector(".liste").appendChild(container);
    });

    tasksDone.forEach((elem)=>{
        var container = document.createElement("div");
        container.className = "container";
        container.innerHTML = "<div onmousedown='mouseOver(this)' class='leftContent'><input type='text' class='input' id='modifImput'><div class='icons'><h3 onclick='save(this)'>save</h3></div><div class='mark' onclick='terminer(this)'></div><div class='doneMark' onclick='terminer(this)'><img src='checkmark-sharp.svg' alt=''></div><p id='text' onclick='terminer(this)'>"+elem.value+"</p></div><div class='rContent' onmouseleave='mouseOut(this)''><div class='icons'><img onclick='modifier(this)' id='modif-btn' src='pencil-sharp.svg' alt=''><img onclick='supprimer(this)' id='supp-btn' src='trash-sharp.svg' alt=''></div><input type='datetime-local' name='date' id='date'><span>Priorité</span><input type='number' value="+elem.priorite+" placeholder='0' name='priorité' id='priorité' class='priorite'></div>";
        container.querySelector('.leftContent').style.textDecoration= "line-through";
        container.querySelector(".leftContent .mark").style.display = "none";
        container.querySelector(".leftContent .doneMark").style.display = "block";
        document.body.querySelector(".listeTermine").style.display = "block";
        document.body.querySelector(".listeTermine").appendChild(container);
    });
})();

// Création de variables pour stocker les elements html ciblés.
var inputValue = document.getElementById("zoneText");
var btnAction = document.getElementById("action-btn");

// Ecouteur de l'évenement clic sur btnAction.
btnAction.addEventListener("click", click);

// Fonction liée à l'evenement.
function click() {
    if (inputValue.value ==="") {
        alert("Ajoutez une tâche !");
        inputValue.focus();
        return;
    }
    var container = document.createElement("div");
    let dataTask = '';
    dataTask = {
        priorite: 0,
        date: '',
        value: inputValue.value
    }

    tasks.push(dataTask);
    localStorage.setItem('tasts', JSON.stringify(tasks));

    container.className = "container";
    container.innerHTML = "<div onmousedown='mouseOver(this)' class='leftContent'><input type='text' class='input' id='modifImput'><div class='icons'><h3 onclick='save(this)'>save</h3></div><div class='mark' onclick='terminer(this)'></div><div class='doneMark' onclick='terminer(this)'><img src='checkmark-sharp.svg' alt=''></div><p id='text' onclick='terminer(this)'>"+inputValue.value+"</p></div><div class='rContent' onmouseleave='mouseOut(this)''><div class='icons'><img onclick='modifier(this)' id='modif-btn' src='pencil-sharp.svg' alt=''><img onclick='supprimer(this)' id='supp-btn' src='trash-sharp.svg' alt=''></div><input type='datetime-local' name='date' id='date'><span>Priorité</span><input type='number' value="+dataTask.priorite+" placeholder='0' name='priorité' id='priorité' class='priorite'></div>";
    
    container.addEventListener('mouseover', function (event) {
        if (event.target.className == "container") {
            console.log(event.target.children[0]);
        }
        
    })

    document.body.querySelector(".liste").style.display = "block";
    document.body.querySelector(".liste").appendChild(container);
    inputValue.value = "";
}

function terminer(e){
    if (e.parentElement.style.textDecoration== "") {
        e.parentElement.style.textDecoration= "line-through";
        e.parentElement.querySelector(".mark").style.display = "none";
        e.parentElement.querySelector(".doneMark").style.display = "block";
        
        tasks.forEach((element, index) => {
            if (e.parentElement.querySelector(".leftContent p").textContent.trim() == element.value.trim()) {
                console.log(element);
                tasksDone.push(element);
                tasks.splice(index, 1);
                console.log(tasks);
            }
        });

        localStorage.setItem('tasts', JSON.stringify(tasks));
        localStorage.setItem('tastsDone', JSON.stringify(tasksDone));

        document.body.querySelector(".listeTermine").style.display = "block";
        document.body.querySelector(".listeTermine").appendChild(e.parentElement.parentElement);
        // console.log(e.parentElement.parentElement);
    } else {
        e.parentElement.style.textDecoration= "";
        e.parentElement.querySelector(".mark").style.display = "block";
        e.parentElement.querySelector(".doneMark").style.display = "none";

        tasksDone.forEach((element, index) => {
            if (e.parentElement.querySelector(".leftContent p").textContent.trim() == element.value.trim()) {
                console.log(element);
                tasks.push(element);
                tasksDone.splice(index, 1);
                console.log(tasksDone+ " done");
            }
        });

        localStorage.setItem('tasts', JSON.stringify(tasks));
        localStorage.setItem('tastsDone', JSON.stringify(tasksDone));

        document.body.querySelector(".liste").appendChild(e.parentElement.parentElement);                
    }
}

function supprimer(element) {
    
    if (confirm("Supprimer ?")) {
        tasks.forEach((elem, index) => {
            if (element.parentElement.parentElement.parentElement.querySelector(".leftContent p").textContent.trim()===elem.value.trim()) {
                tasks.splice(index, 1);
            }
        });
    
        tasksDone.forEach((elem, index) => {
            if (element.parentElement.parentElement.parentElement.querySelector(".leftContent p").textContent.trim()===elem.value.trim()) {
                tasksDone.splice(index, 1);
            }
        });
    
        localStorage.setItem('tasts', JSON.stringify(tasks));
        localStorage.setItem('tastsDone', JSON.stringify(tasksDone));
    
        element.parentElement.parentElement.parentElement.remove();
    }
}

function modifier(element) {
    console.log(element.parentElement.parentElement.parentElement);
    element.parentElement.parentElement.parentElement.querySelector(".leftContent p").style.display='none';
    element.parentElement.parentElement.parentElement.querySelector(".mark").style.display='none';
    element.parentElement.parentElement.parentElement.querySelector(".input").style.display='block';
    element.parentElement.parentElement.parentElement.querySelector(".leftContent .icons").style.display='block';
    var modifImput =element.parentElement.parentElement.parentElement.querySelector(".leftContent .input");
    modifImput.value = element.parentElement.parentElement.parentElement.querySelector(".leftContent p").textContent;
    console.log(modifImput.value);
}

function save(element) {
    console.log(element.parentElement.parentElement.parentElement);
    element.parentElement.parentElement.parentElement.parentElement.querySelector(".mark").style.display='block';
    element.parentElement.parentElement.parentElement.parentElement.querySelector(".input").style.display='none';
    element.parentElement.parentElement.parentElement.parentElement.querySelector(".leftContent .icons").style.display='none';
    
    var modifImput =element.parentElement.parentElement.parentElement.parentElement.querySelector(".leftContent .input");
    element.parentElement.parentElement.parentElement.parentElement.querySelector(".leftContent p").textContent = modifImput.value;
    element.parentElement.parentElement.parentElement.parentElement.querySelector(".leftContent p").style.display='block';
}

function mouseOver(event) {
    event.parentElement.querySelector('.rContent').style.display = "block";
    console.log("okok"+event);
    console.log(event.parentElement);
}

function mouseOut(event) {
    event.parentElement.querySelector('.rContent').style.display = "none";
    console.log("okok"+event);
    console.log(event.parentElement);
}