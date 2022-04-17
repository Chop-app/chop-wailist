(function(window){
"use strict";

window.addEventListener('load',()=>{
try {
  const endpoint = ""
    const toggler = document.querySelector('.toggle');
const togglerInput = document.querySelector('.toggle input');
  //  console.log(toggler)
    const vendorInput = document.querySelector('.___vendor')

    const accessPanel = document.querySelector('#get-early-access')

     const accessOpen = document.querySelectorAll('.access-open'),
     accessClose = document.querySelector('.access-close'),
     accessOpenVendor=document.querySelector(".access-open_vendor")
    
    const form =document.forms['get-early-access']

    // TOGGLER 
    const toggle = (e)=>{
        const value = e || togglerInput.checked
        if(value) {
            toggler.classList.add('on') ;
            vendorInput.classList.remove('vendor')
            return
        }
        vendorInput.classList.add('vendor')
        toggler.classList.remove('on');
        return
        }

        accessOpenVendor.addEventListener('click',()=>{
            togglerInput.checked = true
            toggle()
            accessPanel.classList.remove('close')
        })

        accessOpen.forEach(btn=>{
            btn.addEventListener('click',()=>{
                togglerInput.checked = false
                toggle()
                accessPanel.classList.remove('close')
            })
        })

            
    accessClose.addEventListener('click',()=>{
        accessPanel.classList.add('close')
    })



    toggler.addEventListener('input',(e)=>{
        toggle(e.target.checked)
    })


// FORM submission===>
form.addEventListener('submit',(e)=>{
e.preventDefault();
// @type ARRAY
const targets = e.target
const mode = document.querySelector(".toggle").className.includes("on")
const name = targets[0]
const email = targets[1]
// ERRORS 
const errorTag = document.querySelector(".tag")
const notify=(type, callback)=>{
errorTag.style.opacity=1
errorTag.innerText = "All fields are required"
errorTag.className.includes("success") && errorTag.classList.remove("success")
window.setTimeout(()=>{
errorTag.style.opacity=0
callback && callback()
}, 1500 )
if(type == true ) {
errorTag.innerText = "You are added to our Waitlist"
errorTag.classList.add("success")
} 
}
let errors=[]
const consumeApi = async (payload, callback)=>{
  try{
  const response = await fetch(endpoint, {
    method:"POST", 
    headers:{
      "Content-Type":"application/json", 
    }, 
    body:JSON.stringify(payload)
  });
  console.log(response)
  console.log(payload)
  } catch(e){
    console.log(e)
  }
}
if(name.value.length <3 || email.value.length <3) {
  errors.push("Name is invalid")
}

    /*
    ** @if vendor mode is turned on
    */

if(mode){
const businessName = targets[2]
const location = targets[3]
if(businessName.value.length <3 || location.value.length <3){
  errors.push("Business Name is invalid ")
}
}
/*
**
*/
if(errors.length == 0){
notify(true, ()=> accessPanel.classList.add('close')) 
if(mode){
 console.log("Vendor Access") 
}
consumeApi({name:name.value, email:email.value})
console.log("User Access")
form.reset()
return
}//API LOGIC endsn
notify()
})
    // end
} catch (error) {
    console.error(error)
}

})//PAGE LOADED
    



})(window)