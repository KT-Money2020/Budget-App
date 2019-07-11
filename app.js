
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





//Global App Controller
//Parameters that are 'predicted to be passed' and receive and arguments
var controller = (function(budgetCtrl, UICtrl){
    
    
    
//The arguments     
})(budgetController, UIController);



































