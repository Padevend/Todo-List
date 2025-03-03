'use strict'

var ACTIVE_VIEW = "all";
var viewer = document.querySelector("body article .view ul")

//generation d'une nouvelle tache
function template(rows, stat, isChecked){
    return `
        <input type="checkbox" ${stat} hidden id="box-${rows.id}">
        <label for="box-${rows.id}"></label>
        <div class="about">
            <span class="text">${rows.task}</span>
            <span class="date">${rows.date}</span>
        </div>
        <div class="setting">
            <button id="confirm">
                <ion-icon name="checkmark-done-outline"></ion-icon>
            </buttom>
            ${isChecked?'':'<button id="edit"><ion-icon name="pencil-outline"></ion-icon></button>'}
            <button id="remove">
                <ion-icon name="trash-outline"></ion-icon>
            </button>
        </div>
    `
}

// function pour les operation CRUD
async function call_server(action, data){
    data["action"] = action
    await fetch("./class/task.php",{
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.status==200){
                goto(ACTIVE_VIEW)
            }
        })
        .catch(err=>show_error(err))
}

//function pour la navigation entre les vues all no-checked, checked
function goto(view){
    switch (view) {
        case 'all':
            ACTIVE_VIEW = 'all'
            refresh_all()
            break;
        case 'no-checked':
            ACTIVE_VIEW = 'no-checked'
            refresh_nochecked()
            break;
        case 'checked':
            ACTIVE_VIEW = 'checked'
            refresh_checked()
            break;
        default:
            break;
    }

}

//prise en charger des mofification
function refresh(){
    let Tasks = viewer.querySelectorAll("li")
    Tasks.forEach(task=>{
        let id = task.getAttribute("task-id")
        let checkbox = task.querySelector("input[type='checkbox']")
        let edit_btn = task.querySelector(".setting #edit")
        let sup_btn = task.querySelector(".setting #remove")

        //edition d'une tache
        if(edit_btn!=null){
            edit_btn.addEventListener("click", ()=>{
                task.classList.add("isEditing")
                let input = task.querySelector(".about .text")
                let btn = task.querySelector("#confirm")

                input.setAttribute("contenteditable","true")
                input.focus()
                btn.onclick = ()=>{
                    task.classList.remove("isEditing")
                    input.removeAttribute("contenteditable")
                    let new_task = input.innerText.replaceAll("'","\\'")

                    call_server("update", {
                        id: id,
                        task: new_task
                    })
                }
            })
        }

        //suprssion d'une tache
        sup_btn.addEventListener("click", ()=>{
            call_server("remove", {
                id: id
            })
        })

        //check and uncheck task
        checkbox.addEventListener("change", ()=>{
            call_server(checkbox.checked?"check":"uncheck", {id:id})
        })

    })
}

//gestion des erreurs et succes
function show_error(error) {
    console.log(error)
}

function show_succes(msg) {
    console.log(msg)
}


//mise a jour de la vue checked
function refresh_checked(){
    viewer.innerHTML = " "
    fetch("./class/task.php",{
        method: "POST",
        body: JSON.stringify({
            action: "get_checked",
        })
    })
        .then(resp=>resp.json())
        .then(data=>{

            if(data.data!=""){
                data.data.map(rows=>{
                    let li = document.createElement("li")
                    li.setAttribute("task-id", rows.id)
                    li.classList.add("isCompleted")
                    li.innerHTML = template(rows, "checked", true)
                    viewer.appendChild(li)
                })
            }else{
                viewer.innerHTML = "<span class='void'>No Tasks</span>"
            }
            
            //rafraichissement de la page sans la recharger pour prendre en compte les modifications
            refresh()
        })
        .catch(err=>show_error("error"))
}

//mise a jour de la vue no checked
function refresh_nochecked(){
    viewer.innerHTML = " "
    fetch("./class/task.php",{
        method: "POST",
        body: JSON.stringify({
            action: "get_no_checked",
        })
    })
        .then(resp=>resp.json())
        .then(data=>{

            if(data.data!=""){
                data.data.map(rows=>{
                    let li = document.createElement("li")
                    li.setAttribute("task-id", rows.id)
                    li.innerHTML = template(rows, "", false)
                    viewer.appendChild(li)
                })
            }else{
                viewer.innerHTML = "<span class='void'>No Tasks</span>"
            }
            //rafraichissement de la page sans la recharger pour prendre en compte les modifications
            refresh()
        })
        .catch(err=>show_error("error"))
}

//mise a jour de la vue ALL
function refresh_all(){
    viewer.innerHTML = " "
    fetch("./class/task.php",{
        method: "POST",
        body: JSON.stringify({
            action: "get_all",
        })
    })
        .then(resp=>resp.json())
        .then(data=>{
            
            if(data.data!=""){
                data.data.map(rows=>{
                    let li = document.createElement("li")
                    let stat = ""
                    li.setAttribute("task-id", rows.id)
                    let ischeck = false
                    //verifie si la tache est completer
                    if (rows.isCompleted=='1') {
                        li.classList.add("isCompleted")
                        stat = "checked" //pour passer la checkbox en checked
                        ischeck = true
                    }
                    li.innerHTML = template(rows, stat, ischeck)
                    viewer.appendChild(li)
                })
            }else{
                viewer.innerHTML = "<span class='void'>No Tasks</span>"
            }

            //rafraichissement de la page sans la recharger pour prendre en compte les modifications
            refresh()
        })
        .catch(err=>show_error(err))
}

//ajout d'une nouvelle tache
var form = document.querySelector("body #add-form button");
form.addEventListener("click", ()=>{
    let text = document.querySelector("body #add-form input").value
    
    if(text != ""){
        call_server("create", {task: text.replaceAll("'","\\'")})
    }else{
        show_error("the fields is void")
    }

    //vider et champ input apres l'envoie
    document.querySelector("body #add-form input").value = "";
})

//navigation entre les vues
goto(ACTIVE_VIEW) //initialisation du la vue 'all'
var all_view = document.querySelectorAll("body article section .stack")
const activeView = (view)=>{
    for(let item of all_view){
        item.classList.remove("active")
    }
    view.classList.add("active")
    ACTIVE_VIEW = view.getAttribute("name")
    goto(ACTIVE_VIEW)
}
all_view.forEach(view=>{
    view.addEventListener("click", ()=>{
        activeView(view)
    })
})