 
let members=document.getElementById("members")

async function renderMembers(data){
let arr
if(data){
    if(data.length>0){
       
        arr=data.map((el,i)=>{
            if(!el.avatar){
               
                return `
                <div><img src="./images/userimages/default-image-icon-png-20.jpg" alt=userimage /><h4>${el.Username}</h4></div>
                `
            }else{
                return `
            <div><img src=${el.avatar} /><h4>${el.Username}</h4></div>
            `}
        })
        members.innerHTML=arr.join(" ")
    }else{
        members.innerText="can't find user"
    }
}else{
    let res=await fetch(`http://localhost:4500/user`,{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
    })
    let data=await res.json()
    if(res.ok){
        arr=data.users.map((el,i)=>{
            if(!el.avatar){
 
                return `
                <div><img src="./images/userimages/default-image-icon-png-20.jpg" alt=userimage /><h4>${el.Username}</h4></div>
                `
            }else{
                return `
            <div><img src=${el.avatar} /><h4>${el.Username}</h4></div>
            `}
        })
    }

    members.innerHTML=arr.join(" ")
}
 
 }
renderMembers()

 
let debounceTimeoutId;

let srch=document.getElementById("ser")
srch.addEventListener("input",async (e)=>{
    clearTimeout(debounceTimeoutId);
 debounceTimeoutId = setTimeout(() => {
    const searchTerm = srch.value;
    if(searchTerm==""){
        
        
        return 
    }
     sendSearchRequest(searchTerm)
      .then(response => {
        
        renderMembers(response.users)
       })
      .catch(error => {
        console.error(error);
      });
  }, 1000); 

 
})






function sendSearchRequest(searchTerm) {
 
  return fetch(`http://localhost:4500/user/find/${searchTerm}`,{
    method:"GET",
    headers:{
        "Content-type":"applcation/json",
        Authorization:`Bearer ${sessionStorage.getItem("token")}`
    }
  })
    .then(response => response.json());
}
 