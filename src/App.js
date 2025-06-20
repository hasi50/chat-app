import React from 'react'
import './App.css'
import { useState,useEffect } from 'react'

import { getDatabase,ref,push,set,onChildAdded } from "firebase/database";
import { getAuth, GoogleAuthProvider,signInWithPopup} from "firebase/auth";





const App = () => {

  const provider = new GoogleAuthProvider();
const auth = getAuth()

const googlelogin = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    setname(result.user.displayName)
    console.log(token,user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


  const [name,setname] = useState('')
  const [chat,setchat] = useState([{name:'Hassan',message:"Hello"},
    {name:'Haseeb',message:"Hy"}
  ])
  const [value,setvalue] = useState('')

  
const db = getDatabase();
const chatListRef = ref(db, 'ch');

function scroll(){
  let ele = document.getElementById('chatj');
  if(ele){
  ele.scrollTop= ele.scrollHeight
  }
}

  useEffect(()=>{
    onChildAdded(chatListRef, (data) => {
      setchat(chat=>[...chat,data.val()])
      setTimeout(() => {
        scroll()
      }, 100);
    });
  },[])
  // handle

  
function handle() {
  if (!value.trim()) return;

  console.log("Sending message:", value);

  const chatPostRef = push(chatListRef);
  set(chatPostRef, {
    name: name,
    message: value
  }).then(() => {
    console.log("Message sent");
    setvalue('');
  }).catch((error) => {
    console.error("Error sending message:", error);
  });
}




  
  
  return (
  
    <div>
      {name?null: <div>
          <input type="text" placeholder='start with your name' onBlur={(e) =>setname(e.target.value)} />
          <button id='btnw' onClick={e=>{googlelogin()}}>Google SignIn</button>
        </div>}
       
        
        {name?<div>
          <h2> user : {name}</h2>
        <div  id="chatj" className="chatcontainer">
         {chat.map((c)=>
         <div className={`container ${c.name==name ?'me' :''}`}>
          <p className="chatbox">
      
            <strong>{c.name} :</strong>
            <span>{c.message}</span>
          
          </p>
          </div>
        )}
          <div className="btn">
            <input type="text" placeholder='Enter your message' value={value} onChange={(e)=>setvalue(e.target.value)} />
          <button onClick={handle}>send</button>
          </div>
        
          
        </div>
        </div> :null}
    
        </div>
   
  )
}

export default App
