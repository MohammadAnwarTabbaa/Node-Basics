
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
  else if (text==='list\n'){
    list(arr);
  }
  else if (text.substr(0,6)=="hello "){
    extended(text);
  }
  else if (text.substr(0,4)=="add "){
    add(text);
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

}

function extended(text){
        console.log(text.replace("\n","")+"!");
}

const arr = ["task A " , "task B " , "task C"];


function list(arr){
  var i ; 
  for(i = 0 ; i<arr.length ; i++){
    console.log( i+1 +" "+arr[i]);
  }
}

function add(text){

 var item =  text.replace("add","");
  if(item.trim()==""){
    console.log("error")
  }else {
  arr.push(item.trim())
  }
  }
