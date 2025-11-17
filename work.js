let nav_bar = document.getElementById("right_bar")
let input_name = document.getElementById("input_name")
let input_img_url = document.getElementById("input_img_url")
let input_email = document.getElementById("input_mail")
let input_num_tele = document.getElementById("number_tel")
let allinputs = document.querySelectorAll("input")
let button_submit = document.getElementById("buton_submit")

let button_add_ex_ = document.getElementById("button_add_ex")

let input_company = document.getElementById("input_company")
let role_experience = document.getElementById("role_experience")
let date_from = document.getElementById("date_from")
let date_to = document.getElementById("date_to")

let form_add_ex_=document.getElementById("container_form_experience")
let form_add_ex_inputs=form_add_ex_.querySelectorAll("input")

let email_regex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let number_regex =/^\+?[1-9]\d{1,14}$/
let nome_regex =/^[A-Za-z]+(?: [A-Za-z]+)*$/  

let all_data=[]
let  experience = []

input_lisner(input_email , email_regex)
input_lisner(input_num_tele , number_regex)



function input_lisner(input , regex){
input.addEventListener("keyup",()=>{

  if(!regex.test(input)){
     input.style.border="solid 3px red"
  }
})
}
function is_valid() {
  let is_valid=(
  input_name.value!=""
  &&input_email.value!=""&&
  input_img_url.value!=""&&
  input_num_tele.value!=""
  &&input_company.value!=""
  &&role_experience.value!=""
  && date_from.value!=""&&
  date_to.value!="")
  return is_valid
}

  
  
function clear_inputs(inputs){
for(allinputs_ of inputs){
    allinputs_.value=""
} 
}

function get_data(){
    let employee = {
      "name" : input_name.value,
      "email" : input_email.value,
      "input_img_url" : input_img_url.value,
      "input_num_tele" : input_num_tele.value,
      "experience":experience
}

    let experience_o = {
      "company" : input_company.value,
      "role experience" : role_experience.value,
      "date from" : date_from.value,
      "date to" : date_to.value,
}
experience.push(experience_o)
all_data.push(employee)
return all_data
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
     inputs.style.border="solid 2px red"
    }
  }
  if(is_valid()){
    
    console.log(get_data())
     clear_inputs(allinputs)
  }

})




