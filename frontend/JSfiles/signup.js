const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


const signinForm=document.getElementById("F1")
const signupForm=document.getElementById("F2")

signinForm.addEventListener("submit",async (e)=>{
  e.preventDefault()
  let obj={}
let imp=document.getElementById("in1")
let imp2=document.getElementById("in2")
obj[imp.placeholder]=imp.value
obj[imp2.placeholder]=imp2.value
let res=await fetch(`http://localhost:4500/user/login`,{
             method:"POST",
             headers:{
              "Content-type":"application/json"
             },
             body:JSON.stringify(obj)
               })

               let data=await res.json()
               if(res.ok){
                sessionStorage.setItem("token",data.token)
                Swal.fire({
                  icon: 'success',
                  title: "Login sucess",
                  showConfirmButton: false,
                  timer: 2000,
                  willClose: () => {
                      window.open("chat.html")
                    }
              })
               }else{
                 Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.msg
              })
              }
 
})


signupForm.addEventListener("submit",async (e)=>{
  e.preventDefault()
  let obj={}
let imp=document.getElementById("up1")
let imp2=document.getElementById("up2")
let imp3=document.getElementById("up3")

obj[imp.placeholder]=imp.value
obj[imp2.placeholder]=imp2.value
obj[imp3.placeholder]=imp3.value

let res=await fetch(`http://localhost:4500/user/signup`,{
             method:"POST",
             headers:{
              "Content-type":"application/json"
             },
             body:JSON.stringify(obj)
               })

    let data=await res.json()
     if(res.ok){
      if(data.msg=="registration successful"){

        Swal.fire({
          icon: 'success',
          title: data.msg,
          willClose: () => {
             container.classList.remove("sign-up-mode");
          }
        })
       } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.msg,
           
      })
      }
    }
 })







sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});