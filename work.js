let nav_bar = document.getElementById("right_bar")
let input_name = document.getElementById("input_name")
let input_img_url = document.getElementById("input_img_url")
let input_email = document.getElementById("input_mail")
let input_num_tele = document.getElementById("number_tel")
let Image_Persone = document.getElementById("image_persone")
let Select_Role = document.getElementById("Slect_role")
let allinputs = document.querySelectorAll("input")
let button_submit = document.getElementById("buton_submit")

let disply_workers_container = document.getElementById("disply_workers")
let display_add_worker = document.getElementById("container_add_worker")
let button_add_ex_ = document.getElementById("button_add_ex")

let input_company = document.getElementById("input_company")
let role_experience = document.getElementById("role_experience")
let date_from = document.getElementById("date_from")
let date_to = document.getElementById("date_to")

let form_add_ex_=document.getElementById("container_form_experience")
let form_add_ex_inputs=form_add_ex_.querySelectorAll("input")

let Parsed_data = JSON.parse(localStorage.getItem("users") || "[]");

let email_regex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let number_regex =/^\+?[1-9]\d{1,14}$/
let nome_regex =/^[A-Za-z]+(?: [A-Za-z]+)*$/  

let  experience = []
let Role_Selected=""

let _Salle_de_conférence = document.getElementById("Salle_de_conférence")
let _Réception = document.getElementById("Réception")
let _Salle_des_serveurs = document.getElementById("Salle_des_serveurs")
let _Salle_de_sécurité = document.getElementById("Salle_de_sécurité")
let _Salle_du_personnel = document.getElementById("Salle_du_personnel")
let _Salle_darchives = document.getElementById("Salle_darchives")




_Salle_de_conférence.addEventListener("click",()=>{
Disply_worker_by_sale("Salle de conférence")
})
_Réception.addEventListener("click",()=>{

  Disply_worker_by_sale("Reception")
 
})
_Salle_des_serveurs.addEventListener("click",()=>{

   Disply_worker_by_sale("Salle des serveurs")
})
_Salle_de_sécurité.addEventListener("click",()=>{

  
   Disply_worker_by_sale("Salle de sécurité")
})
_Salle_du_personnel.addEventListener("click",()=>{

  
   Disply_worker_by_sale("Salle du personnel")
})
_Salle_darchives.addEventListener("click",()=>{

  
   Disply_worker_by_sale("Salle d'archives")
})

Select_Role.addEventListener("change",()=>{
Role_Selected=Select_Role.value

})





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

function is_valid() {
  let is_valid=(
  input_name.value!=""&&
  input_email.value!=""&&
  Role_Selected !=""&&
  input_img_url.value!=""&&
  input_num_tele.value!=""
  &&input_company.value!=""
  &&role_experience.value!=""
  && date_from.value!=""&&
  date_to.value!="")
  return is_valid
}
function Disply_Img(){
    input_img_url.addEventListener("keyup",()=>{
    Image_Persone.src=`${input_img_url.value}`

  })
}

Disply_Img()
  
function clear_inputs(inputs){
for(allinputs_ of inputs){
    allinputs_.value=""
    allinputs_.classList.remove("invalid-input");
    allinputs_.classList.remove("valid-input");
} 
}

function get_data(){
    let employee = {
      "name" : input_name.value,
      "email" : input_email.value,
      "input_img_url" : input_img_url.value,
      "input_num_tele" : input_num_tele.value,
      "experience":experience,
      "role":Role_Selected,
      "is_pointed":false
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

button_add_ex_.addEventListener("click",()=>{

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

button_submit.addEventListener("click",()=>{
  for(inputs of allinputs){
    if(inputs.value==""){
      inputs.classList.add("invalid-input");
      inputs.classList.remove("valid-input");
    }
  }

  console.log(is_valid())
  if(is_valid()){
    localStorage.setItem("users",JSON.stringify(get_data()))

     clear_inputs(allinputs)
     window.location.reload()
     
  }else return

})

if(disply_workers_container.style.display=="block"){
  disply_workers_container.style.height="70vh"
}



function Disply_worker_by_sale(sale){

disply_workers_container.innerHTML =""

let roles={
  "Reception": ["Manager", "Réceptionniste", "Nettoyage"],
  "Salle des serveurs" : ["Manager", "Technicien IT", "Nettoyage"],
  "Salle de sécurité":["Manager", "Agent de sécurité", "Nettoyage"],
  "Salle du personnel": ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité", "Nettoyage", "Autres"],
  "Salle de conférence": ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité", "Nettoyage", "Autres"],
  "Salle d'archives": ["Manager"]
}

for(roles_ of Object.entries(roles) ){
 if(roles_[0]==sale){
  for(a of roles_[1]){
      for(User of Parsed_data){
        if(User.role==a){
         disply_workers_container.innerHTML +=
        `<div style="display: flex; justify-content: space-evenly; border-radius: 5px; box-shadow: 0px 0px 10px rgb(52, 52, 52) ;padding: 15px 0px; border-radius: 10px; align-items: center;">
            <div>
            <img src="${User.input_img_url}" alt="" style="width: 50px;">
            </div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <h1 style="padding: 0px; margin: 0px; font-size: 20px;">${User.name}</h1>
                <div style="display: flex;">
                    <h1 style="padding: 0px; margin: 0px; font-size: 12px;">${User.role} | <span style="background-color: lawngreen; padding: 4px; border-radius: 5px; margin: 0px 10px;">pointed</span> </h1>
                </div>
              </div>
              <button style="background-image: url(imges/edit.png); height: 30px; width:30px ;border: none; "></button>
        </div>
        `
        }else continue
  }
  }

 }
}
}
function Disply_Workers(){

  for(User of Parsed_data){
    disply_workers_container.innerHTML +=
    `<div style="display: flex; justify-content: space-evenly; border-radius: 5px; box-shadow: 0px 0px 10px rgb(52, 52, 52) ;padding: 15px 0px; border-radius: 10px; align-items: center;">
        <div>
        <img src="${User.input_img_url}" alt="" style="width: 50px;">
        </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <h1 style="padding: 0px; margin: 0px; font-size: 20px;">${User.name}</h1>
            <div style="display: flex;">
                <h1 style="padding: 0px; margin: 0px; font-size: 12px;">${User.role} | <span style="background-color: lawngreen; padding: 4px; border-radius: 5px; margin: 0px 10px;">pointed</span> </h1>
            </div>
          </div>
          <button style="background-image: url(imges/edit.png); height: 30px; width:30px ;border: none; "></button>
    </div>
    `
  }
disply_workers_container.innerHTML += `
  <button
  id="add_worker";
  style="
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
    display: block;
  ">
    add worker
  </button>
`; 

add_worker.addEventListener("click",()=>{
nav_bar.style.height="fit-content"
 disply_workers_container.style.display="none"
  display_add_worker.style.display="block"
})
document.getElementById("button_cancel").addEventListener("click",()=>{
  display_add_worker.style.display="none"
  disply_workers_container.style.display="block"
})
}

Disply_Workers()
    //localStorage.removeItem("users")