

//Handles the data
var budgetController = (function(){

    //Creates a constructor to store all data inputted by user for expenses
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    //Creates a constructor to store all data inputted by user for Income
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }    
    
    //Variable Object that stores all data inputted by user
    var data = {
        //An object inside an object that contains array properties of expenses and income for all items 
        allItems: {
            exp: [],
            inc: []
        },
        //An object inside an object that contains array properties of expenses and income for total     
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    /*Returning function to make the data accessible and public to other modules*/
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            
            //If the arrays length is greater than zero
            if(data.allItems[type].length > 0){
            /* Looks at the entire length of the selected array then minus 1, then looks at the previous data's ID, and add 1 to that making our newest object having the up to date ID, basically creating new ID */    
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            
            //Checks to see the 'type' parameter passed in
            if(type === 'exp'){
            //If the 'type' is an expense then do create a new empty object and references the Expense object 
            newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
            //If the 'type' is an expense then do create a new empty object and references the Income object                 
            newItem = new Income(ID, des, val);    
            }
            
            //Pushing data into our data structure
            data.allItems[type].push(newItem);
            //Returns the current 'newItem' Object
            return newItem;
        }
    };
    
})();


//Handles the UI
var UIController = (function(){
    /*This object helps make it so that you have to repeat yourself and if you ever decide to change the name of the data type you wont have to manually change it for each line of code */
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    
    
    /*Returns the function 'getInput', 'getDOMstrings',ect, to the controller, therefore making it public and accessible*/
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
        
      //DOM manipulation using the html strings   
      addListItem: function(obj, type){
          var html, newHtml, element;
          
          //Create HTML strings with placeholder text 
          
        if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if(type === 'exp') {
        element = DOMstrings.expensesContainer;    
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'  
        }
            
          //Replace the placeholder text with some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);
          //Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },
        
    clearFields: function(){
        var fields;
        
        fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
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
        var input, newItem;
        // 1. Get the filed input data
            input = UICtrl.getInput();
        /* 2. Add the item to the budget controller, basically passing in the arguments from the UIController inputted objects */
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add the item to the UI, Passes in 'newItem' object
            UICtrl.addListItem(newItem, input.type);
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
































