var database=firebase.database();
var authtoken=localStorage.getItem("authid")
var user_data_name
var txt , sender
var ban , t
var verified
var html=""
setInterval(function(){
  Notification.requestPermission();
})

setTimeout(function(){
        if (Notification.permission === 'granted') {
          var notification = new Notification('Message sent or received', {
          body: 'Get more out of a chat with premium. BUY NOW',
          icon: 'https://sharmapushkar-coder.github.io/LOGO.JPG'
        });

        notification.onclick = function() {
         alert('Feature currently not available')
       };
      }          
    },3000)
if ( screen.width>800 ) {
  l()
} 
else {      
  if(navigator.userAgent==="quantumapp.android"){
  
  }
  else{
    //location.href='download.html'
  }
}
if(typeof authtoken==="undefined"||authtoken===null||authtoken===""){
  location.href="https://sharmapushkar-coder.github.io/Disclosure/login"
}
database.ref("login/"+authtoken).on("value",function(data){
  user_data_name=data.val().user
})

setTimeout(function(){
  if(typeof user_data_name==="undefined"||user_data_name===null||user_data_name===""){
    alert("Login failed please login again !")
    location.href="https://sharmapushkar-coder.github.io/Disclosure/"
  }
  else{
    database.ref("users/"+user_data_name).on("value",function(deta){
      verified=deta.val().verified
    })
  }
},7000)

setTimeout(function(){
  if(verified==="yes"){
      typer()
      document.getElementById("Msg_insert").innerHTML=""
      document.getElementById("msg_reading_div").style.display="block"
      document.getElementById("sender").style.display="block"
      document.getElementById("loading").style.display="none"
      console.log("Account is verified!")
      database.ref("chat").on("child_added",function(chat){
      txt=chat.val().msg,
      sender=chat.val().sender
      if(sender===user_data_name){
        html="<div align='right'><b id='message-"+chat.key+"'>You"+" : "+txt+"</b>"
        html+="<br><button data-id='"+ chat.key+"'onclick='del(this)'class='del'>Delete</button></br><br></br>"
        document.getElementById("Msg_insert").innerHTML+=html
         window.scrollTo(0,document.body.scrollHeight);
      }
      else if(typeof sender==="undefined"||sender===null||sender===""){
          //document.getElementById("noti-bot").play();
           html="<br></br><center><li style='background-color:white;color:black;padding:6px 6px 6px 6px;'>"+txt+"</li></center><br></br>"
        document.getElementById("Msg_insert").innerHTML+=html
      }
      else{
        html="<div align='left'><b>"+sender+" :"  +txt+"</b></div><br></br>"
        document.getElementById("Msg_insert").innerHTML+=html
        document.getElementById("noti").play();
         window.scrollTo(0,document.body.scrollHeight);
      }
     })
  }
  else if(verified==="no"){
       location.href="https://connectopia.repl.co/about/Activation.html"
    }
  else{
    document.write("<h1>:(</h1>There was an error while launching this application . Please refresh to try again.")
  }
},11000)
setTimeout(function(){
  window.scrollTo(0,document.body.scrollHeight);

},7000)





function send(){
  var msg_to_send=document.getElementById("msg-bar").value;
  if(msg_to_send===""){
    
  }
  else{
      database.ref("chat").push().set({
         'sender':user_data_name,
         'msg':msg_to_send
      })
     document.getElementById("msg-bar").value=""
     }

}


setInterval(function(){
  var user_verification
  database.ref("login/"+authtoken).on("value",function(data){
   user_verification=data.val().user;
  })
  if(typeof user_verification==="undefined"||user_verification===null||user_verification===""){
    
  }
  else if(user_verification!==user_data_name){
    document.getElementById("error").play();
    document.getElementById("msg_reading_div").innerHTML="<center><h2>Your actions were invalid !</h2>"
    document.getElementById("msg_reading_div").innerHTML+="<br></br><button onclick='window.history.back()'>Retry</button>"
    document.getElementById("sender").style.display="none"
  }
})




      







function del(self){
  var messId=self.getAttribute("data-id");
  database.ref("chat").child(messId).remove();

  
}
database.ref("chat").on("child_removed",function(chat){
    document.getElementById('message-'+chat.key).innerHTML="This Message has been deleted";
  })



function l(){
  location.href='https://sharmapushkar-coder.github.io/chat/login/?authid='+authtoken
}
setInterval(function(){
  database.ref("user/"+user_data_name).on("value",function(d){
    ban=d.val().ban
  })
  if(ban==="yes"){
    location.href='https://sharmapushkar-coder.github.io/terminated.html'
  }
  else{
    
  }
})
function typer(){
  database.ref('typer').on('child_added',function(d){
    t=d.val().user
  })
  setInterval(function(){
    if(typeof t==="undefined"||t===null||t===""){
      
    }
    else if(t===user_data_name){
      document.getElementById("type").style.display="block"
      document.getElementById("type").innerHTML="You're Typing.."
      setTimeout(function(){
        document.getElementById("type").style.display="none";
        t=""
      },2000)
    }
    else{
      document.getElementById("type").style.display="block"
      document.getElementById("type").innerHTML=t+" is typing..."
      setTimeout(function(){
        document.getElementById("type").style.display="none";
        t=""
      },2000)
    }
  })
}

function change(){
  database.ref('typer').push().set({
    'user':user_data_name
  })
}

setInterval(function(){
  console.clear()
},5000)

function cache(){
  database.ref("typer").set({
    'del':null
  })
}
setInterval(function(){
  cache()
},10000)
