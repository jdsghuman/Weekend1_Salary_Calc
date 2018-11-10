$(document).ready(readyNow);

function readyNow(){
    console.log('in readyNow');

    $('#addEmployee').on('click', addEmployee);
}

// Create Employee class
class Employee {
    constructor(firstName, lastName, userId, title, annualSalary){
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}

// Employee array
let employees = [];

function addEmployee(){
    console.log('In add employee');
    // Check for input validation
    if($('#firstNameIn').val() === '' || $('#lastNameIn').val() === '' || $('#userIdIn').val() === '' || $('#titleIn').val() === '' || $('#annualSalaryIn').val() === '') {
        alert('Please fill out required fields!');
    } else {
        let newEmployee = new Employee(
            $('#firstNameIn').val(),
            $('#lastNameIn').val(),
            $('#userIdIn').val(),
            $('#titleIn').val(),
            $('#annualSalaryIn').val()
        )

        // Clear Inputs
        clearInputValues();

        console.log('Add employee: ', newEmployee);
        employees.push(newEmployee);
    }
}

function clearInputValues(){
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#userIdIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
}

