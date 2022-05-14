(function(window){
"use strict";

window.addEventListener('load',()=>{
try {
  const endpoint = "https://onwaitlist.co/in/60da29a75431?"
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
  const response = await fetch(endpoint+payload, {
    method:"GET", 
  });
  
  callback(await response)
  
  
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

const businessName = targets[2]
const location = targets[3]
if(mode){
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
    console.log(encodeURIComponent(name.value))
consumeApi(`name=${encodeURIComponent(name.value)}&email=${encodeURIComponent(email.value)}&business=${encodeURIComponent(businessName.value)}&location=${encodeURIComponent(location.value)}`, (e)=>{
  if(e.ok) window.open(e.url)
})
 console.log("Vendor Access") 
}

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