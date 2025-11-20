let nav_bar = document.getElementById("right_bar")
let input_name = document.getElementById("input_name")
let input_img_url = document.getElementById("input_img_url")
let input_email = document.getElementById("input_mail")
let input_num_tele = document.getElementById("number_tel")
let Image_Persone = document.getElementById("image_persone")
let Select_Role = document.getElementById("Slect_role")
let allinputs = document.querySelectorAll("input")
let button_submit = document.getElementById("buton_submit")

let container_ =document.querySelector(".container")
let _container_add_worker =document.getElementById("container_add_worker")
//localStorage.removeItem("users")
let disply_workers_container = document.getElementById("disply_workers")
let display_add_worker = document.getElementById("container_add_worker")
let button_add_ex_ = document.getElementById("button_add_ex")

let input_company = document.getElementById("input_company")
let role_experience = document.getElementById("role_experience")
let date_from = document.getElementById("date_from")
let date_to = document.getElementById("date_to")

let form_add_ex_ = document.getElementById("container_form_experience")
let form_add_ex_inputs = form_add_ex_.querySelectorAll("input")

let Parsed_data = JSON.parse(localStorage.getItem("users") || "[]");

let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let number_regex = /^\+212[1-9]\d{8}$/
let nome_regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/  

let experience = []
let Role_Selected = ""


let _Salle_de_conférence = document.getElementById("Salle_de_conférence")
let _Réception = document.getElementById("Réception")
let _Salle_des_serveurs = document.getElementById("Salle_des_serveurs")
let _Salle_de_sécurité = document.getElementById("Salle_de_sécurité")
let _Salle_du_personnel = document.getElementById("Salle_du_personnel")
let _Salle_darchives = document.getElementById("Salle_darchives")

let div_Salle_de_conférence = document.getElementById("_Salle_de_conférence")
let div_Réception = document.getElementById("_Réception")
let div_Salle_des_serveurs = document.getElementById("_Salle_des_serveurs")
let div_Salle_de_sécurité = document.getElementById("_Salle_de_sécurité")
let div_Salle_du_personnel = document.getElementById("_Salle_du_personnel")
let div_Salle_darchives = document.getElementById("_Salle_darchives")

let container_Salle_de_conférence = document.getElementById("display_persons_conférence")
let container_Réception = document.getElementById("display_persons_Réception")
let container_Salle_des_serveurs = document.getElementById("display_persons_serveurs")
let container_Salle_de_sécurité = document.getElementById("display_persons_sécurité")
let container_Salle_du_personnel = document.getElementById("display_persons_personnel")
let container_Salle_darchives = document.getElementById("display_persons_d’archives")

let currentRoomDiv = null;

//=======================================================================//
///////////////////////////////[Lissners]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//======================================================================//

//===============Added pressure on updates within Zone================//

function add_click_to_elements_of_div(container_){
    container_.addEventListener("click",(e)=>{
        const card=e.target.closest("button")
        const id_cliked  = card.dataset.id 
        
        
        for(emploiyer of Parsed_data){
            if(emploiyer.id==id_cliked&&emploiyer.is_pointed==false){
                console.log("false")
                    emploiyer.is_pointed=true
                    emploiyer.zone_worked=container_.id
                    update_data_in_localstorage()
                    break;
                }
                
                if(emploiyer.id==id_cliked&&emploiyer.is_pointed==true){
                    console.log("true")
                    emploiyer.is_pointed=false
                    emploiyer.zone_worked=null
                    update_data_in_localstorage()
                    break
                }
            }
            window.location.reload()
        })
    }
    
    add_click_to_elements_of_div(container_Salle_de_conférence)
    add_click_to_elements_of_div(container_Réception)
    add_click_to_elements_of_div(container_Salle_des_serveurs)
    add_click_to_elements_of_div(container_Salle_de_sécurité)
    add_click_to_elements_of_div(container_Salle_du_personnel)
    add_click_to_elements_of_div(container_Salle_darchives)
    
    
//======================== Clicking the + button inside each zone ========================//

_Salle_de_conférence.addEventListener("click", () => {
                Disply_worker_by_sale("Salle de conférence",container_Salle_de_conférence)
                
            })

_Réception.addEventListener("click", () => {
                Disply_worker_by_sale("Reception",container_Réception)
            
                
            })

_Salle_des_serveurs.addEventListener("click", () => {
                Disply_worker_by_sale("Salle des serveurs",container_Salle_des_serveurs)
                
            })



 _Salle_de_sécurité.addEventListener("click", () => {
                Disply_worker_by_sale("Salle de sécurité",container_Salle_de_sécurité)
                
            })

 _Salle_du_personnel.addEventListener("click", () => {
                Disply_worker_by_sale("Salle du personnel",container_Salle_du_personnel)
                
            })

 _Salle_darchives.addEventListener("click", () => {
                Disply_worker_by_sale("Salle d'archives",container_Salle_darchives)
                
            })

Select_Role.addEventListener("change",()=>{
            Role_Selected=Select_Role.value
            })
 //============================================================================================//


            // function check_date(date_from,date_to){
            // if(date_from<date_to){
            //     console.log("no")
            // }
            // }
            //console.log(check_date("21/10/2006","21/1/2006"))


//======================== add image to the input if you coole link ========================//
            function Disply_Img(){
                input_img_url.addEventListener("keyup",()=>{
                    Image_Persone.src=`${input_img_url.value}`
                })
            }
            Disply_Img()
//======================== a ========================//
            
            function addValidationListener(input, regex) {
                input.addEventListener("input", () => {
                    if (input.value.trim() === "") {
                        input.classList.remove("valid-input", "invalid-input");
                    } else if (regex.test(input.value.trim())) {

                        input.classList.add("valid-input");
                        input.classList.remove("invalid-input");
                        
                    } else {

                        input.classList.add("invalid-input");
                        input.classList.remove("valid-input");
                        
                    }
                });
            }
            
            addValidationListener(input_email, email_regex);
            addValidationListener(input_num_tele, number_regex);
            addValidationListener(input_name, nome_regex);
            

            
//================================ is date valiude ================================//  
            function valide_date_lisner(){
            date_from.addEventListener("change",()=>{
                
                if(date_from.value < date_to.value &&date_from.value!=""&& date_to.value!=""){
                    
                    date_to.classList.add("valid-input");
                    date_from.classList.add("valid-input");
                    date_to.classList.remove("invalid-input")
                    date_from.classList.remove("invalid-input")

                    }else{
                    date_to.classList.remove("valid-input");
                    date_from.classList.remove("valid-input");
                    date_to.classList.add("invalid-input")
                    date_from.classList.add("invalid-input")
                }
            })

            date_to.addEventListener("change",(e)=>{
                if(date_to.value > date_from.value&&date_from.value!=""&& date_to.value!=""){      
                    date_to.classList.add("valid-input");
                    date_from.classList.add("valid-input");
                    date_to.classList.remove("invalid-input")
                    date_from.classList.remove("invalid-input")
                    }else{
                    date_to.classList.remove("valid-input");
                    date_from.classList.remove("valid-input");
                    date_to.classList.add("invalid-input")
                    date_from.classList.add("invalid-input")
                }
            })
            }
            valide_date_lisner()
//===================================================================//
//===================================================================//
function update_data_in_localstorage(){
    
    localStorage.setItem("users",JSON.stringify(Parsed_data))
}

function get_data_from_localstorage_and_disply(){

    for(emp of Parsed_data){
       if(emp.is_pointed==true){
        
   document.getElementById(emp.zone_worked).innerHTML+=
        `
                    <div id="profile" style="height: fit-content; width: fit-content;display: flex;flex-direction: column; justify-content: center; align-items: center;">
                        <span style="font-weight: 800;">${emp.name}</span>
                    <img style="width: 50px;height: 50px;border: none; border-radius: 100%;" src="${emp.input_img_url}" onerror="this.src='imges/logo-person-removebg-preview.png'" alt="">
                    <button data-id="${emp.id}" style="height: 25px; width: 25px; display: flex;  border-radius: 100%; align-items: center; justify-content: center; background-image: url(imges/remove_circle_29dp_EA3323.png); background-size: cover; position: relative;top: -10;" id="add_or_remove"></button>
                    </div>         
        `
       }
    }
}
get_data_from_localstorage_and_disply()
// Function to show add worker modal
function showAddWorkerModal() {
    nav_bar.style.height = "fit-content";
    nav_bar.style.display = "none";
    display_add_worker.style.display = "block";
    set_opacity(true);
}

// Function to hide add worker modal
function hideAddWorkerModal() {
    display_add_worker.style.display = "none";
    nav_bar.style.display = "block";
    set_opacity(false);
}



function set_opacity(is_set){
  if(is_set){
    document.querySelector(".parent").style.opacity="0.05"
    document.querySelector(".worker").style.opacity="0.05"
  }else{
    document.querySelector(".parent").style.opacity="1"
    document.querySelector(".worker").style.opacity="1"
  }
}

function is_valid() {
    return (
        input_name.value != "" &&
        input_email.value != "" &&
        Role_Selected != "" &&
        input_img_url.value != "" &&
        input_num_tele.value != "" &&
        input_company.value != "" &&
        role_experience.value != "" &&
        date_from.value != "" &&
        date_to.value != ""&&
        date_from.value < date_to.value
      
    );
}

function clear_inputs(inputs){
    for(let allinputs_ of inputs){
        allinputs_.value=""
        allinputs_.classList.remove("invalid-input");
        allinputs_.classList.remove("valid-input");
    } 
}


function get_data(){
    let employee = {
        "id":self.crypto.randomUUID(),
        "name" : input_name.value,
        "email" : input_email.value,
        "input_img_url" : input_img_url.value,
        "input_num_tele" : input_num_tele.value,
        "experience": experience,
        "role": Role_Selected,
        "is_pointed": false,
        "zone_worked":null

    }

    let experience_o = {
        "company" : input_company.value,
        "role experience" : role_experience.value,
        "date from" : date_from.value,
        "date to" : date_to.value,
    }

    experience.push(experience_o)
    Parsed_data.push(employee)

    return Parsed_data
}



button_add_ex_.addEventListener("click", () => {
    if(is_valid()){
        let experience_o = {
            "company" : input_company.value,
            "role experience" : role_experience.value,
            "date from" : date_from.value,
            "date to" : date_to.value,
        }
        experience.push(experience_o)
        clear_inputs(form_add_ex_inputs)
    }
})

button_submit.addEventListener("click", () => {
   


    for(let inputs of allinputs){
        if(inputs.value==""){
            inputs.classList.add("invalid-input");
            inputs.classList.remove("valid-input");
        }

    }
 
     if(is_valid()){
      
        localStorage.setItem("users",JSON.stringify(get_data()))
        clear_inputs(allinputs)
        window.location.reload()
    }
})

if(disply_workers_container.style.display=="block"){
    disply_workers_container.style.height="70vh"
}

function Disply_worker_by_sale(sale,container_desplay_it){
    let counter=0
    container_desplay_it.innerHTML =""
    
    let roles = {
        "Reception": ["Manager", "Réceptionniste", "Nettoyage"],
        "Salle des serveurs" : ["Manager", "Technicien IT", "Nettoyage"],
        "Salle de sécurité":["Manager", "Agent de sécurité", "Nettoyage"],
        "Salle du personnel": ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité", "Nettoyage", "Autres"],
        "Salle de conférence": ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité", "Nettoyage", "Autres"],
        "Salle d'archives": ["Manager"]
    }

    for(let [room, roomRoles] of Object.entries(roles)){
        if(room == sale){
            for(let a of roomRoles){              
                for(let User of Parsed_data){
                    if(User.role==a && User.is_pointed==false){
                      counter++
                       container_desplay_it.innerHTML +=`

                        <div id="profile"  style="height: fit-content; width: fit-content;display: flex;flex-direction: column; justify-content: center; align-items: center;">
                        <span style="font-weight: 800;">${User.name}</span>
                        
                        <img style="width: 50px;height: 50px; border: none; border-radius: 100%;" src="${User.input_img_url}" onerror="this.src='imges/logo-person-removebg-preview.png'" alt="">
                        <button data-id="${User.id}" style="height: 25px; width: 25px; display: flex;  border-radius: 100%; align-items: center; justify-content: center; background-image: url(imges/add_circle_29dp_75FB4C.png); background-size: cover; position: relative;top: -10;" id="add_or_remove"></button>
                        </div> 
                        `
                    }
                }
                
            }
            if(counter==0){
                window.location.reload()
            }
        }
    }
}

function Disply_Workers(){
    for(let User of Parsed_data){
    if(User.is_pointed==false){

        disply_workers_container.innerHTML +=
            `<div class="worker" style="display: flex; justify-content: space-evenly; border-radius: 5px; box-shadow: 0px 0px 10px rgb(52, 52, 52); padding: 15px 0px; align-items: center;">
            <div>
            <img src="${User.input_img_url}" onerror="this.src='imges/logo-person-removebg-preview.png'" alt="" style="width: 50px;">
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
            <h1 class="name" style="padding: 0px; margin: 0px; font-size: 20px;">${User.name}</h1>
            <div style="display: flex;">
            <h1 style="padding: 0px; margin: 0px; font-size: 12px; background-color: yellow;">${User.role} | <span style="background-color: red; font-size="10px"; padding: 4px; border-radius: 5px; margin: 0px 10px;">Not Worked</span></h1>
            </div>
            </div>
            
            </div>`
                }
                }

    disply_workers_container.innerHTML += `
        <button id="add_worker" style="
        position: sticky;
            bottom: 0;
            height: 40px;
            padding: 0 !important;
            line-height: 40px;
            width: 50%;
            background-color: #41cc4d;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 0.9rem;
            text-align: center;
            margin-top: 10px;
            display: block;">
            add worker
            </button>`;
            
    document.getElementById("add_worker").addEventListener("click", showAddWorkerModal);
    
    document.getElementById("button_cancel").addEventListener("click", hideAddWorkerModal);
         
    
}


window.addEventListener('click', function(e) {  
    const isClickInsideModal = display_add_worker.contains(e.target);
        const isClickOnAddButton = e.target.id === "add_worker";
 
    if (display_add_worker.style.display == "block") {
        if (!isClickInsideModal && !isClickOnAddButton) {
            hideAddWorkerModal();
        }
    }
});

Disply_Workers()

