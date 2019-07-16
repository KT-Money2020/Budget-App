

//Handles the data
var budgetController = (function(){

    //Creates a constructor to store all data inputted by user for expenses
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    //Note:    
        this.percentage= -1;
    };
    
    //Calculates the percentage
    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value/ totalIncome) * 100);
        } else{
            this.percentage = -1;
        }
       
        
    };
    //Return the calculated percentage from the function on top
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };
    
    //Creates a constructor to store all data inputted by user for Income
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };    
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
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
        },
        budget: 0,
        percentage: -1
    };
    
    /*Returning function to make the data accessible and public to other modules */
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
        },
        deleteItem: function(type,id){
            var ids, index;
             ids = data.allItems[type].map(function(current){
                return current.id;
        });
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        //calculating budget
        calculateBudget: function(){
            
            //calculate total income and expense
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentage of income that we spend
            if(data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);                
            } else {
                data.percentage = -1;
            }
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },
                                   
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },
        
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        getBudget: function(){
            /*Above you can see that return happens only once because you only want to return the function but here you are returning twice because you also want to return an object containing all the data */
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel:'.item__percentage'
    };
    
    
    /*Returns the function 'getInput', 'getDOMstrings',ect, to the controller, therefore making it public and accessible*/
    return {
        getInput: function(){
    //Returns the current stored values the user has inputted by returning them in an object
            return {
            //Value will be either inc or exp
            type: document.querySelector(DOMstrings.inputType).value,
        
            description: document.querySelector(DOMstrings.inputDescription).value,
            
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };          
    },
        
      //DOM manipulation using the html strings   
      addListItem: function(obj, type){
          var html, newHtml, element;
          
          //Create HTML strings with placeholder text 
          
        if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if(type === 'exp') {
        element = DOMstrings.expensesContainer;    
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'  
        }
            
          //Replace the placeholder text with some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);
          //Insert the HTML into the DOM
         
         /*In the html file you would notice some code commented out its because this is what will fill in the gap*/
         /*The 'element' triggers whether or not the program should target the + or - symbol and then the 'beforeend' tells the program implement the code before the end of the line of code with the newly created html code that has changed the ID, Description, and Value. */ document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },
        
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);  
    },
         
    //Designed to clear the input box after user has entered data    
    clearFields: function(){
        var fields, fieldsArr;
        
        fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
        
        fieldsArr = Array.prototype.slice.call(fields);
        
        fields.forEach(function(current, index, array){
            current.value = "";
        });
        
        fieldsArr[0].focus();
        
    },    
        
    displayBudget: function(obj){
        document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;       document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;       
        
        if(obj.percentage > 0) {
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';     
        } else{
            document.querySelector(DOMstrings.percentageLabel).textContent = '---';    
        }
        
    },
        
    displayPercentages: function(percentages){
        var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
        
        var nodeListForEach = function(list,callback){
            for(var i =0; i < list.length; i++){
                callback(list[i],i);
            }
        };
        
         nodeListForEach(fields,function(current, index){
             if(percentages[index] > 0){
                  current.textContent = percentages[index] + '%'; 
             } else {
                  current.textContent = '---';
             }
            
        });
        
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
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
  
    };
    
    var updateBudget = function(){
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = function(){
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Read percentages from the budget contorller 
        var percentages = budgetCtrl.getPercentages();
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    //Function that adds the item to the screen
    var ctrlAddItem = function(){
        var input, newItem;
        // 1. Get the filed input data
            input = UICtrl.getInput();
        
        //If the field input boxes arent completely filled, do nothing(dont' update)
          if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        /* 2. Add the item to the budget controller, basically passing in the arguments from the UIController inputted objects */
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add the item to the UI, Passes in 'newItem' object
            UICtrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
            UICtrl.clearFields();
        // 5. Calculate and update budget
            updateBudget();              
              
        // 6. Calculate and update percentages
            updatePercentages();  
          }
    
    };
    
    var ctrlDeleteItem = function(event){
        var itemID,split,type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type,ID);
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            // 3. Update and show the new budget
            updateBudget();
        }
    };
    
    //Makes it so that the 'setupEventListener' is public and returned
    return {
        init: function(){
            console.log('Application has started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1      
            });
            //Calls up this function and invokes it
            setupEventListeners();
        }
    };
    
//The arguments     
})(budgetController, UIController);

/*Initializes the the setupEventListener function that is in the IIFE 'controller'. The point is to immediately invoke it */
controller.init();
































