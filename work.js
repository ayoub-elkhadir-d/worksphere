let nav_bar = document.getElementById("right_bar")
let input_name = document.getElementById("input_name")
let input_img_url = document.getElementById("input_img_url")
let input_email = document.getElementById("input_mail")
let input_num_tele = document.getElementById("number_tel")
let Image_Persone = document.getElementById("image_persone")
let Select_Role = document.getElementById("Slect_role")
let allinputs = document.querySelectorAll("input")
let button_submit = document.getElementById("buton_submit")

let button_add_ex_ = document.getElementById("button_add_ex")

let input_company = document.getElementById("input_company")
let role_experience = document.getElementById("role_experience")
let date_from = document.getElementById("date_from")
let date_to = document.getElementById("date_to")

let form_add_ex_=document.getElementById("container_form_experience")
let form_add_ex_inputs=form_add_ex_.querySelectorAll("input")

let Users_Data =localStorage.getItem("users")||[]
let Parsed_data =JSON.parse(Users_Data)

let email_regex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let number_regex =/^\+?[1-9]\d{1,14}$/
let nome_regex =/^[A-Za-z]+(?: [A-Za-z]+)*$/  

let  experience = []
let Role_Selected=""

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
    //localStorage.removeItem("users")
     clear_inputs(allinputs)
  }else return

})


function Disply_Workers(){
  nav_bar.innerHTML=""
  for(User of Parsed_data){
    nav_bar.innerHTML +=
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
}
Disply_Workers()
