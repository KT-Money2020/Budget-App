
//Handles the data
var budgetController = (function(){
    
    var x = 23;
    
    var add = function(a){
        return x + a;
    }
    //Make this function public outside of the module
    return {
        publicTest: function(b){
            return add(b);
        }
    }
    
})();


//Handles the UI
var UIController = (function(){
    /*This object helps make it so that you have to repeat yourself and if you ever decide to change the name of the data type you wont have to manually change it for each line of code */
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    
    /*Returns the function 'getInput' and 'getDOMstrings' to the controller, therefore making it public*/
    return {
        getInput: function(){
    //Returns the current stored values the user has inputted by returning them in an object
            return {
            //Value will be either inc or exp
            type: document.querySelector(DOMstrings.inputType).value,
        
            description: document.querySelector(DOMstrings.inputDescription).value,
            
            value: document.querySelector(DOMstrings.inputValue).value
            };          
    },
    /* Return the HTML class values, AKA DOM strings, so that the code targetted could also be reused by the controll module */
      getDOMstrings: function(){
          return DOMstrings;
      }  
    };
})();





//Global App Controller (Controls data and UI, telling them what to do)
//Parameters that are 'predicted to be passed' and receive and arguments
var controller = (function(budgetCtrl, UICtrl){
    
    //Helps organize the module 
    var setupEventListeners = function(){
        
    /*Stores the DOM strings inside the variable so the controllter could also reuse the targetted strings*/
    var DOM = UICtrl.getDOMstrings();    
        
    /*If the user presses the button then the function ctrlAddItem activates. If you were to put () after the ctrlAddItem it would immediately invoke the function rather than wait to be called on*/
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
    /*if any key is 'pressed' then activate the function and pass that key into the event parameter*/
    document.addEventListener('keypress', function(event){
        
    /* Each key has a special 'Key Code' and if that event key code number is 13  then */
     if (event.keyCode === 13 || event.which === 13){
       ctrlAddItem();  
     }
        
    });        
    };
    
    
    //Function that adds the item to the screen
    var ctrlAddItem = function(){
        // 1. Get the filed input data
            var input = UICtrl.getInput();
        // 2. Add the item to the budget controller
        
        // 3. Add the item to the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI
        
        console.log('It works');
    };
    
    //Makes it so that the 'setupEventListener' is public and returned
    return {
        init: function(){
            console.log('Application has started');
            //Calls up this function and invokes it
            setupEventListeners();
        }
    };
    
//The arguments     
})(budgetController, UIController);

/*Initializes the the setupEventListener function that is in the IIFE 'controller'. The point is to immediately invoke it */
controller.init();
































