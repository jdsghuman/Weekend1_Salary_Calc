$(document).ready(readyNow);

function readyNow(){
    console.log('in readyNow');

    $('#addEmployee').on('click', addEmployee);
    deleteEmployee();
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
let monthlyCosts = 0;

function appendTable() {
    let tBody = $('#table__body');
    tBody.empty();
    employees.forEach(emp => {
        console.log(`Employee Information', ${emp.firstName} ${emp.lastName} ${emp.userId} ${emp.title} ${emp.annualSalary}`)
        tBody.append(`<tr class="table__employee"><td>${emp.firstName}</td><td>${emp.lastName}</td><td class="table__employee--userId">${emp.userId}</td><td>${emp.title}</td><td>${emp.annualSalary.toFixed(2)}</td><td><button id="deleteEmployee" class="btn btn-danger btn-sm">Delete</button></td></tr>`);
    })
}

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

function clearInputValues(){
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#userIdIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
}

function calculateMonthlyCosts(){
    monthlyCosts = 0;
    employees.map(emp => {
        monthlyCosts += emp.annualSalary;
    })
    console.log('Montly costs: ', monthlyCosts);
}

function deleteEmployee(){
    // Lister on Delete button
    $('.table').on('click', '#deleteEmployee', function() { 
        // Get UserID of employee
        let empUserId = $(this).parent().parent() 
                       .find(".table__employee--userId")     
                       .text();
        console.log('Found userId: ', empUserId);
        deleteEmployeeFromArray(empUserId);
        console.log('Employee to delete: ', empUserId);
        // Remove Employee from table
        $(this).closest("tr").remove();
    });
}

function deleteEmployeeFromArray(userIdClicked){
    console.log('inDeleteEmployeeFromArray');
    console.log('Employees array before delete: ', employees);
    let updatedEmployeesArr = employees.filter(emp => emp.userId != userIdClicked);
    employees = updatedEmployeesArr;
    appendTable();
    console.log('Employees array after delete: ', employees);
}

function displayMonthlyCosts(){
    $('#monthlyTotal').text(monthlyCosts.toFixed(2));
    if(monthlyCosts >= 20000) {
        $('#month__display').addClass('monthly-cost__red');
    } else if(monthlyCosts < 20000) {
        $('#month__display').removeClass('monthly-cost__red');
    } 
}

