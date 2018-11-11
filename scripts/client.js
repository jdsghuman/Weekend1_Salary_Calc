$(document).ready(readyNow);

function readyNow(){
    $('#addEmployee').on('click', addEmployee);
    deleteEmployee();
}

// Employee array
let employees = [];
let monthlyCosts = 0;

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

function appendTable() {
    let tBody = $('#table__body');
    tBody.empty();
    employees.forEach(emp => {
        tBody.append(`<tr class="table__employee"><td>${emp.firstName}</td><td>${emp.lastName}</td><td class="table__employee--userId">${emp.userId}</td><td>${emp.title}</td><td>${emp.annualSalary.toFixed(2)}</td><td><button id="deleteEmployee" class="btn btn-danger btn-sm">Delete</button></td></tr>`);
    });
}

function addEmployee(){
    // Get unique ID variable
    let userIdSaved = checkIfUserIdExists();

    // Check for input validation
    if($('#firstNameIn').val() === '' || $('#lastNameIn').val() === '' || $('#userIdIn').val() === '' || $('#titleIn').val() === '' || $('#annualSalaryIn').val() === '') {
        alert('Please fill out required fields!');
    } else if(userIdSaved) {
        alert('User ID already taken. Please enter a unique User ID!');
    } else {
        let newEmployee = new Employee(
            $('#firstNameIn').val(),
            $('#lastNameIn').val(),
            $('#userIdIn').val(),
            $('#titleIn').val(),
            Number($('#annualSalaryIn').val())
        )

        // Clear Inputs
        clearInputValues();

        console.log('Add employee: ', newEmployee);

        // Add Employee to Employees array
        employees.push(newEmployee);

        // Calculate monthly costs
        calculateMonthlyCosts();

        // Display monthly costs
        displayMonthlyCosts();

        // Add employee to Display
        appendTable();
    }
}

function calculateMonthlyCosts(){
    monthlyCosts = 0;
    // Get Annual Salary total from Employees array
    employees.map(emp => {
        monthlyCosts += emp.annualSalary;
    });
}

function clearInputValues(){
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#userIdIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
}

function checkIfUserIdExists(){
    let userIdEntered = $('#userIdIn').val();
    // Check if userId exists
    let foundId = employees.find(emp => emp.userId === userIdEntered);
    return foundId;
}

function deleteEmployee(){
    // Lister on Delete button
    $('.table').on('click', '#deleteEmployee', function() { 
        // Get UserID of employee
        let empUserId = $(this).parent().parent() 
            .find(".table__employee--userId").text();

        // Delete employee from Employee array
        deleteEmployeeFromArray(empUserId);

        // Remove Employee from table
        $(this).closest("tr").remove();
    });
}

function deleteEmployeeFromArray(userIdClicked){
    // Filter Employees array
    let updatedEmployeesArr = employees.filter(emp => emp.userId != userIdClicked);
    // Update Employees array
    employees = updatedEmployeesArr;
    // Update table
    appendTable();
}

function displayMonthlyCosts(){
    $('#monthlyTotal').text(monthlyCosts.toFixed(2));
    if(monthlyCosts >= 20000) {
        $('#month__display').addClass('monthly-cost__red');
    } else if(monthlyCosts < 20000) {
        $('#month__display').removeClass('monthly-cost__red');
    } 
}

