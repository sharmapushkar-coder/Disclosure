var server=firebase.database();
var authid=localStorage.getItem("authid")
var username,name,email,dob,doj
var time
location.href="https://sharmapushkar-coder.github.io/close.html"
var date,month,year,hour,min,sec,newdate,dateObj
var crl=window.location.href
setInterval(function(){
  fetch()
  if(typeof username==="undefined"||username===null||username===""){
    fetch()
  }
  else{
    dateObj=new Date()
    date=dateObj.getDate()
    month = dateObj.getMonth() + 1;
    year = dateObj.getFullYear();
    hour=dateObj.getHours();
    min=dateObj.getMinutes();
    sec=dateObj.getSeconds();
    newdate = year + "/" + month + "/" + date+" at "+hour+":"+min+":"+sec;
    server.ref("users/"+username+"/online/").set({
      'last':newdate,
      'page':crl
    })
  }
},4000)







function fetch(){
   server.ref("login/"+authid).on("value",function(snapshot){
    username=snapshot.val().user
   })
  server.ref("users/"+username).on("value",function(snap){
    name=snap.val().name,
    doj=snap.val().Created,
    email=snap.val().Email
  })
}
setInterval(function(){
  localStorage.name=name;
  localStorage.mail=email;
  localStorage.DOJ=doj
  localStorage.username=username;
  localStorage.dob="Not Found"
},6000)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else { 
  console.log("ERROR:403 User prompt declined");
}

function showPosition(position) {
  setInterval(function(){
    server.ref("users/"+username+"/geolocation").set({
    'latitude':position.coords.latitude ,
    'longitude':position.coords.longitude
   })
  })
  
}
