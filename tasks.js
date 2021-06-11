
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text==='exit\n') {
    quit();
  }
  else if(text === 'hello\n'){
    hello();
  }
  else if (text==='help\n'){
    help();
  }
  else if (text.substr(0,6)=="remove"){
    remove(text.trim());
  }
  else if (text==='list\n'){
    list(arr);
  }
  else if (text.substr(0,6)=="hello "){
    extended(text);
  }
  else if (text.substr(0,3)=="add"){
    add(text);
  }
  else if (text.substr(0,4)=="edit"){
    edit(text.trim());
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Mohammad Anwar Tabbaa")

/**
 * lists all the possible commands
 *
 * @returns {void}
 */
function help(){
  console.log("hello : Says hello") ;
  console.log("hello with anything   : hello anything!  ") ;
  console.log("exit : Exits the application");
  console.log("quit : Exits the application") ;
  console.log("help : lists all the possible commands") ;
  console.log("list : lists all tasks") ;
  console.log("add : add new task") ;
  console.log("remove : remove last task") ;
  console.log("remove 1 : remove first task") ;
  console.log("remove 2: remove second task") ;

}

function extended(text){
        console.log(text.replace("\n","")+"!");
}

const arr = [
  {"task":"task A" , "checked" : true} ,
   {"task":"task B " , "checked" : false} ,
    {"task":"task C" , "checked" : true}
  ];


function list(arr){
  var i ; 
  for(i = 0 ; i<arr.length ; i++){
    if(arr[i].checked==true){
      console.log("[\u2713] "+ (i+1) +" "+arr[i].task);
    }
    else{
      console.log("[ ] "+ (i+1) +" "+arr[i].task);
    }
  
  }
}

function add(text){

 var item =  text.replace("add","");
  if(item.trim()==""){
    console.log("error")
  }else {
    var obj ={};
   obj["task"]=item.trim() ; 
   obj["checked"]=false; 
   arr.push(obj);
  }
  }

function remove(text){
  var anwar = (text.replace("remove","")).trim();
  var index = parseInt(anwar);
  if(text==="remove"){
  arr.pop();
  }
  else if(Number.isInteger(index)){
    if(index>arr.length || index<=0){
      console.log("there is no task "+index )
    }
    else{
    arr.splice(index-1,index-1);
    }
  }
  else {unknownCommand(".");}
}
  
  
  
  
  
 

function edit(text){
  var anwar = (text.replace("edit","")).trim();
  var index = parseInt(anwar[0]);
  anwar = (anwar.substr(1)).trim();
  if(text.trim()=='edit'){
    console.log("error")
  }

   else if(Number.isInteger(index)){
    if(index>arr.length || index<=0){
      console.log("there is no task "+index )
    }
    else{
    arr[index-1]["task"]=anwar;
    }
   }
    else arr[arr.length -1]["task"]=anwar ;
    
  }
 

  


  

