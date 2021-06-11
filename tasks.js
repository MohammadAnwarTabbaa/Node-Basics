
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
  else if(text.substr(0,5)=="check"){
 check(text.trim());
  }
  else if(text.substr(0,7)=="uncheck"){
    unCheck(text.trim());
  }
  else{
    unknownCommand(text);
  }
}

const fs = require('fs');
let arr
try {

    const data = fs.readFileSync('./database.json', 'utf8');

    // parse JSON string to JSON object
     arr = JSON.parse(data);


    
    

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
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
  saveData();
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
  console.log("remove (index) : remove task from his index") ;
  console.log("check : to mark task as done") ;
  console.log("uncheck: to mark task as ongoing {uncheck task}") ;

}

function extended(text){
        console.log(text.replace("\n","")+"!");
}




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


  function check(text){
    var anwar = (text.replace("check","")).trim();
    var index = parseInt(anwar);
    if(text.trim()=='check'){
      console.log("error")
    } 
    else if(Number.isInteger(index)){
      if(index>arr.length || index<=0){
        console.log("there is no task "+index )
      }
      else{
      arr[index-1]["checked"]=true;
      }
    }
    else {unknownCommand(".");}
  }


  function unCheck(text){
    var anwar = (text.replace("uncheck","")).trim();
    var index = parseInt(anwar);
    if(text.trim()=='uncheck'){
      console.log("error")
    } 
    else if(Number.isInteger(index)){
      if(index>arr.length || index<=0){
        console.log("there is no task "+index )
      }
      else{
      arr[index-1]["checked"]=false;
      }
    }
    else {unknownCommand(".");}
  }

  
function saveData(){
  const fs = require('fs');


try {

    // convert JSON object to a string
    const data = JSON.stringify(arr, null, 4);

    // write file to disk
    fs.writeFileSync('./database.json', data, 'utf8');
     arr=[];
    console.log(`File is written successfully!`);

} catch (err) {
    console.log(`Error writing file: ${err}`);
}
}
  


  

