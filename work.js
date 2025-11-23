//================= containers declared ======================//
let container_ =document.querySelector(".container")
let _container_add_worker =document.getElementById("container_add_worker")
let disply_workers_container = document.getElementById("disply_workers")
let person_info_ = document.getElementById("person_info")

let container_display_workers_in_zone_ = document.getElementById("container_display_workers_in_zone")
let container_disply_workeres_ = document.getElementById("container_disply_workeres")
let display_add_worker = document.getElementById("container_add_worker")
let nav_bar = document.getElementById("right_bar")

let button_hide_nav = document.getElementById("button_hide_nav")

//=================form declared ======================//
let input_name = document.getElementById("input_name")
let input_img_url = document.getElementById("input_img_url")
let input_email = document.getElementById("input_mail")
let input_num_tele = document.getElementById("number_tel")
let Image_Persone = document.getElementById("image_persone")
let Select_Role = document.getElementById("Slect_role")
let allinputs = document.querySelectorAll("input")
let button_submit = document.getElementById("buton_submit")
let Role_Selected = ""
//=================form declaration (experience)  ======================//
let input_company = document.getElementById("input_company")
let role_experience = document.getElementById("role_experience")
let date_from = document.getElementById("date_from")
let date_to = document.getElementById("date_to")
let form_add_ex_ = document.getElementById("container_form_experience")
let form_add_ex_inputs = form_add_ex_.querySelectorAll("input")
let button_add_ex_ = document.getElementById("button_add_ex")
//==========================Json==================================//

let Parsed_data = JSON.parse(localStorage.getItem("users") || "[]");
let experience = []
//======================== regex ================================//
let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let number_regex = /^\+212[1-9]\d{8}$/
let nome_regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/  
//======================== variables ================================//
let zone_ckliked_id=null
let emploiyer_selected=0
let arr_button_ids_clicked=[]
//=======================================================================//
let limits = {
"display_persons_Réception":5,
"display_persons_serveurs" :3,
"display_persons_sécurité":4,
"display_persons_personnel":3,
"display_persons_conférence":5,
"display_persons_d’archives":2
}
//=======================================================================//
///////////////////////////////[Lissners]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//======================================================================//
// localStorage.removeItem("users")

calcule_emploiyeers_notassigned()

//===============Added pressure on updates within Zone================//

function add_click_to_elements_of_div(container_){
    arr_button_ids_clicked=[]
    // let emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
    container_.addEventListener("click",(e)=>{
        const card=e.target.closest("div")
       
        const id_cliked  = card.dataset.id 

        if(card.classList.value==""){
            if(is_posible_to_add_emploiyer()){
            emploiyer_selected++   
            arr_button_ids_clicked.push(id_cliked)
            card.classList.add("card_checked")
        }
        if(!is_posible_to_add_emploiyer()){
           container_.style.cursor= "not-allowed";
        }
    }else {
        emploiyer_selected --
        arr_button_ids_clicked.splice(id_cliked,1)
         container_.style.cursor= "default";
        card.classList.remove("card_checked")   
         }
        })
    }

    document.getElementById("add_all").addEventListener("click",()=>{
             
            for(emploiyer of Parsed_data){
                if(arr_button_ids_clicked.includes(emploiyer.id)&&emploiyer.is_pointed==false){
                    emploiyer.is_pointed=true
                    emploiyer.zone_worked=zone_ckliked_id
                    update_data_in_localstorage()                 
                }
            }
              
               window.location.reload()  
        })
            

//======================== aficher info of persone ===================================//
    function add__lisner_to_raficher_info(container_){
        person_info_.innerHTML=""
        
    container_.addEventListener("click",(e)=>{
        
        const card=e.target.closest("div")
        let a = card.querySelector("img")
        const id_cliked  = a.dataset.id 
         console.log(id_cliked)
        
    for(emploiyer of Parsed_data){  
              person_info_.style.display="flex"
              if(emploiyer.id == id_cliked){
                person_info_.innerHTML=
                `
            <div style="display: flex;width: 100%; justify-content: flex-end;">
            <button id="button_cancell_" style="display: flex; padding: 10px; border-radius: 50px; background-color: #f95959;">-</button>
            </div>
                <img src="imges/${emploiyer.input_img_url}" style="height: 50px;width: 50px;" alt="">
                    <span style="font-weight: 800;text-align: center; cursor: pointer;">${emploiyer.name}</span>
                    <span style="cursor: default;">Role :${emploiyer.role}</span>
                    <span style="cursor: default;">email :${emploiyer.email}</span>
                    <span style="cursor: default;">num :${emploiyer.input_num_tele} </span>
                    <div>
                <div id="container_experiences" style="display: flex;flex-direction: column; gap: 10px; height: 150px; overflow-y: scroll;">
                    <span style=" cursor: default; font-weight: 800;text-align: center; position: sticky;top: 0px;background-color: #A1A1A1;">Experiences</span>


             </div>
                `
                cancel()
                for(ex of emploiyer.experience){
                    container_experiences.innerHTML+=
                    `
                    <div id="experiencee_" style="display: flex;flex-direction: column;background-color:#cecece; box-shadow: 0px 0px 10px rgb(21, 21, 21); padding: 10px; gap: 10px;">

                        <span>company :${ex.company}</span>
                        <span>role:${ex.role_experience}</span>
                        <span>date to :${ex.date_from}</span>
                        <span>date from:${ex.date_to}</span>
                        
                    </div>
                    `
                }
                break
       
            }
            
        
             
          } 
   
        })
        
    }
    //==============================function helps===============================//
    function is_posible_to_add_emploiyer(){
         if(emploiyer_selected<limet_zones(zone_ckliked_id)){
            return true
         }else{
            return false
         }
    }

   function limet_zones(zone){
    let limit =0
   for(zone_ of Object.entries(limits) ){
       if(zone_[0]==zone){
        limit= zone_[1]
        break;
       
       }
   }
   return limit
   }

    function get_legnth_of_emploiyes_in_zone(zone){
        let count=0
        for(emp of Parsed_data){
            if(emp.zone_worked==zone){
      count++
            }
        }
        return count
    }

    function calcule_emploiyeers_notassigned(){
    let count =0
    for(emp of Parsed_data){
        if(!emp.is_pointed){
           count++
        }
    }
    document.getElementById("total_not_assgned").textContent=count.toString()
}
//============================ remove element in zone ====================================//


    function add__lisner_to_remove_element_in_zone(container_){
    container_.addEventListener("click",(e)=>{
        if(e.target.closest("button")){
            
            const card=e.target.closest("button")
            const id_cliked  = card.dataset.id 
            console.log(card)
            
            for(emploiyer of Parsed_data){
               if(emploiyer.id==id_cliked&&emploiyer.is_pointed==true){
                    console.log("i")
                    emploiyer.is_pointed=false
                    emploiyer.zone_worked=null
                    update_data_in_localstorage()
                    break
                }
            }
            window.location.reload()
        }
        else{
            add__lisner_to_raficher_info(container_) 
            cancel()
        } 
             
        })

        
    }

 function cancel() {
        document.getElementById("button_cancell_").addEventListener("click",()=>{
            console.log("b")
        person_info_.style.display="none"
    })
 }

    let container_Salle_de_conférence = document.getElementById("display_persons_conférence")
    let container_Réception = document.getElementById("display_persons_Réception")
    let container_Salle_des_serveurs = document.getElementById("display_persons_serveurs")
    let container_Salle_de_sécurité = document.getElementById("display_persons_sécurité")
    let container_Salle_du_personnel = document.getElementById("display_persons_personnel")
    let container_Salle_darchives = document.getElementById("display_persons_d’archives")
    
    add_click_to_elements_of_div(container_display_workers_in_zone_)
    
    add__lisner_to_remove_element_in_zone(container_Salle_de_conférence)
    add__lisner_to_remove_element_in_zone(container_Réception)
    add__lisner_to_remove_element_in_zone(container_Salle_des_serveurs)
    add__lisner_to_remove_element_in_zone(container_Salle_de_sécurité)
    add__lisner_to_remove_element_in_zone(container_Salle_du_personnel)
    add__lisner_to_remove_element_in_zone(container_Salle_darchives)
    
    
//============================= hide nav bar ===================================//
button_hide_nav.addEventListener("click",()=>{
if(disply_workers_container.style.display=="flex"||disply_workers_container.style.display=="block"){

    disply_workers_container.style.display="none" 
    nav_bar.style.height="fit-content" 
    

}else{
    disply_workers_container.style.display="block" 
     nav_bar.style.height="75vh" 
     
}

})

//======================== Clicking the + button inside each zone ========================//
    
    let _Salle_de_conférence = document.getElementById("Salle_de_conférence")
    let _Réception = document.getElementById("Réception")
    let _Salle_des_serveurs = document.getElementById("Salle_des_serveurs")
    let _Salle_de_sécurité = document.getElementById("Salle_de_sécurité")
    let _Salle_du_personnel = document.getElementById("Salle_du_personnel")
    let _Salle_darchives = document.getElementById("Salle_darchives")



    _Salle_de_conférence.addEventListener("click", () => {
                zone_ckliked_id="display_persons_conférence"
                Disply_worker_by_sale("Salle de conférence")
                emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
                // container_display_workers_in_zone_.style.display="block"

                
            })

_Réception.addEventListener("click", () => {
                zone_ckliked_id="display_persons_Réception"
                Disply_worker_by_sale("Reception")
               emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
                
            })

_Salle_des_serveurs.addEventListener("click", () => {
             zone_ckliked_id="display_persons_serveurs"
                Disply_worker_by_sale("Salle des serveurs")
                emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
            })



 _Salle_de_sécurité.addEventListener("click", () => {
            zone_ckliked_id="display_persons_sécurité"
            Disply_worker_by_sale("Salle de sécurité")
                emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
            })

 _Salle_du_personnel.addEventListener("click", () => {
    zone_ckliked_id="display_persons_personnel"
                Disply_worker_by_sale("Salle du personnel")
                emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
            })

 _Salle_darchives.addEventListener("click", () => {
    zone_ckliked_id="display_persons_d’archives"
                Disply_worker_by_sale("Salle d'archives")
                emploiyer_selected=get_legnth_of_emploiyes_in_zone(zone_ckliked_id)
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
//======================== add lisner to inputs de forms ========================//
            
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

//=======================================================================//
//**************************[Functions]*******************************
//======================================================================//

//======================================================================//

//function update data in localstorage
function update_data_in_localstorage(){
    calcule_emploiyeers_notassigned()
    localStorage.setItem("users",JSON.stringify(Parsed_data))
}

//=======================Fonctions de display=========================//
function get_data_from_localstorage_and_disply(){

    for(emp of Parsed_data){
       if(emp.is_pointed==true){
        
   document.getElementById(emp.zone_worked).innerHTML+=
        `
                         <div  id="profile"  style="display: flex;flex-direction: column; justify-content: space-evenly; border-radius: 5px; box-shadow: 0px 0px 10px rgb(52, 52, 52); padding: 5px 5px; align-items: center;background-color:"#E7E7E7">
                        <img data-id="${emp.id}" style="width: 50px;height: 50px; border: none; border-radius: 100%;" src="${emp.input_img_url}" onerror="this.src='imges/logo-person-removebg-preview.png'" alt="">
                        <span style=" cursor: default; font-weight: 800;">${emp.name}</span>
                        <span style=" cursor: default; padding: 0px; margin: 0px; font-size: 12px; background-color: yellow;">${emp.role}</span>
                        
                        <button data-id="${emp.id}" style="height: 25px; width: 25px; display: flex;  border-radius: 100%; align-items: center; justify-content: center; background-image: url(imges/remove_circle_29dp_EA3323.png); background-size: cover; position: relative;top:0;" id="add_or_remove"></button>
                        </div> 
                             
        `
       }
    }
    calcule_emploiyeers_notassigned()
}

//Function to show add worker modal
get_data_from_localstorage_and_disply()
function showAddWorkerModal() {

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


//function if click to button add worker in chacke zone displey all workers qui interess of this zone
function Disply_worker_by_sale(sale){
    container_display_workers_in_zone_.innerHTML=""  
    let counter=0

   
    // container_display_workers_in_zone_.innerHTML =""
    
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
                         container_disply_workeres_.style.display="flex"
                      counter++
                       container_display_workers_in_zone_.innerHTML +=`

                         <div class=""  id="profile" style="display: flex;flex-direction: column; justify-content: space-evenly; border-radius: 5px; box-shadow: 0px 0px 10px rgb(52, 52, 52); padding: 5px 5px; align-items: center;background-color:"#E7E7E7">
                        <img  style="width: 50px;height: 50px; border: none; border-radius: 100%;" src="${User.input_img_url}" onerror="this.src='imges/logo-person-removebg-preview.png'" alt="">
                        <span style=" cursor: default; font-weight: 800;">${User.name}</span>
                        <span style=" cursor: default; padding: 0px; margin: 0px; font-size: 12px; background-color: yellow;">${User.role}</span>
                       
                        
                        </div> 
                        `

                   
                    }
                }
                
            }


            if(counter==0){
                // window.location.reload()
            }
        }
    }
}


//function to desplay workers in side bar (if not assined in zones)
function Disply_Workers(){
    for(let User of Parsed_data){
    if(User.is_pointed==false){

        disply_workers_container.innerHTML +=
            `<div class="worker" style="display: flex; justify-content: space-evenly; border-radius: 5px; box-shadow: 0px 0px 10px rgb(52, 52, 52); padding: 15px 0px; align-items: center;">
            <div>
            <img data-id="${User.id}" src="${User.input_img_url}" onerror="this.src='imges/logo-person-removebg-preview.png'" alt="" style="width: 50px;">
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
     add__lisner_to_raficher_info(disply_workers_container) 
            cancel()
}

Disply_Workers()

//=========================Form functions=========================//

//function to set opacity if form is opned
function set_opacity(is_set){
  if(is_set){
    document.querySelector(".parent").style.opacity="0.05"
    document.querySelector(".worker").style.opacity="0.05"
  }else{
    document.querySelector(".parent").style.opacity="1"
    document.querySelector(".worker").style.opacity="1"
  }
}
//function to clear inputs 
function clear_inputs(inputs){
    for(let allinputs_ of inputs){
        allinputs_.value=""
        allinputs_.classList.remove("invalid-input");
        allinputs_.classList.remove("valid-input");
    } 
}
//function to check inputs is valid
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
        email_regex.test(input_email.value.trim())&&
        number_regex.test(input_num_tele.value.trim())&&
        nome_regex.test(input_name.value.trim())&&
        date_from.value < date_to.value
      
    );
}

//function to get the data from form
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
        "role_experience" : role_experience.value,
        "date_from" : date_from.value,
        "date_to" : date_to.value,
    }

    experience.push(experience_o)
    Parsed_data.push(employee)

    return Parsed_data
}


//add experience function
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


//submit data form
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


//function if click inside the form close the form
window.addEventListener('click', function(e) {  
    const isClickInsideModal = display_add_worker.contains(e.target);
        const isClickOnAddButton = e.target.id === "add_worker";
    
    if (display_add_worker.style.display == "block") {
        if (!isClickInsideModal && !isClickOnAddButton) {
            hideAddWorkerModal();
        }
    }
});

window.addEventListener('click', function(e) {  
    let zones_buttons = ["Salle_de_conférence","Réception","Salle_des_serveurs","Salle_de_sécurité","Salle_du_personnel","Salle_darchives"]
    const isClickInsideModal = container_display_workers_in_zone_.contains(e.target);
    const isClickOnAddButton = zones_buttons.includes(e.target.id) ;
    if (container_disply_workeres_.style.display == "flex") {
        if (!isClickInsideModal && !isClickOnAddButton) {
      
           container_disply_workeres_.style.display = "none"

        }
    }
});
//===================================================================//
//===================================================================//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
