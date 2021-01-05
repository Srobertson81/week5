// 1.	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
// a.	Use at least one array.
// b.	Use at least two classes.
// c.	Your menu should have the options to create, view, and delete elements.

//Item Class
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    describe() {
        return `${this.name} costs ${this.price}.`;
    }
}
//Grocery class
class Grocery{
    constructor(name) {
        this.name = name;
        this.items = [];
    }
//adds item to grocery list
    addItem(item) {
       if (item instanceof Item)  {
           this.items.push(item);
       }else {
           throw new Error(`You can only add an instance of Item.  Argument is not a item: ${item}`);
       }
    }
    describe() {
        return `${this.name} has ${this.items.length} items.`;
    }
}
//Menu Class
class Menu {
    constructor() {
        this.grocerys = [];
        this.selectedGrocery = null;
    }
//sets up the main menu selection options
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1' :
                    this.createGrocery();
                    break;
                case '2' :
                    this.viewGrocery();
                    break;
                case '3' :
                    this.deleteGrocery();
                    break;
                case '4' :
                    this.displayGrocerys();
                    break;
                default:
                    selection = 0;  
            }
            selection = this.showMainMenuOptions();
        }
        alert('Bye!');
    }
//displays grocery main menu options
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new grocery
        2) view grocery
        3) delete grocery
        4) display all grocerys
        `);
    }
//displays grocery submenu options
    showGroceryMenuOptions(groceryInfo) {
        return prompt(`
        0) back
        1) create item
        2) delete item
        ---------------------
        ${groceryInfo}
        `);
    }
//discplay grocery method
    displayGrocerys() {
        let groceryString = '';
        for (let i = 0; i < this.grocerys.length; i++) {
            groceryString += i + ') ' + this.grocerys[i].name + '\n';
        }
        alert(groceryString);
    }
//create grocery method
    createGrocery() {
        let name = prompt('Enter name for new grocery list:');
        this.grocerys.push(new Grocery(name));
    }
//view grocery method
    viewGrocery() {
        let index = prompt('Enter the index of the grocery list you wish to view:');
        if (index > -1 && index < this.grocerys.length) {
            this.selectedGrocery = this.grocerys[index];
            let desciption = 'Grocery Name: ' + this.selectedGrocery.name + '\n';
            for (let i = 0; i < this.selectedGrocery.items.length; i++) {
              desciption += i + ') ' + this.selectedGrocery.items[i].name
               + ' - ' +  this.selectedGrocery.items[i].price + '\n';
            }
            let selection = this.showGroceryMenuOptions(desciption);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        }
    }
//deletes a grocery list
    deleteGrocery() {
        let index = prompt('Enter the index of the grocery you wish to delete:');
        if (index > -1 && index < this.grocerys.length) {
            this.grocerys.splice(index, 1);
        }
    }
//creates a grocery item
    createItem() {
        let name = prompt('Enter name for new item:');
        let price = prompt('Enter price for new item:');
        this.selectedGrocery.items.push(new Item(name, price));
    }
//deletes a grocery item
    deleteItem() {
        let index = prompt('Enter the index of the item you wish to delete:');
        if (index > -1 && index < this.selectedGrocery.items.length) {
            this.selectedGrocery.items.splice(index, 1);
        }
    }
}
//activates the menu
let menu = new Menu();
menu.start();