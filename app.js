
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
    
    
})();





//Global App Controller (Controls data and UI)
//Parameters that are 'predicted to be passed' and receive and arguments
var controller = (function(budgetCtrl, UICtrl){
    
    var ctrlAddItem = function(){
        // 1. Get the filed input data
        
        // 2. Add the item to the budget controller
        
        // 3. Add the item to the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI
        
        console.log('It works');
    }
    
    /*If the user presses the button then the function ctrlAddItem activates. If you were to put () after the ctrlAddItem it would immediately invoke the function rather than wait to be called on*/
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    
    /*if any key is 'pressed' then activate the function and pass that key into the event parameter*/
    document.addEventListener('keypress', function(event){
        
    /* Each key has a special 'Key Code' and if that event key code number is 13  then */
     if (event.keyCode === 13 || event.which === 13){
       ctrlAddItem();  
     }
        
    });
//The arguments     
})(budgetController, UIController);



































