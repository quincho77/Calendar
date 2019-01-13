// Class Calendar
function Calendar(day, month, year)
{
    this.day = day;
    this.month = month;
    this.year = year;
    this.monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];
    this.days;

    this.constru = function() 
    {
        var daysMonth = this.daysPerMonth(this.month, this.year);   // number of days in a month
        var zellerDay = this.zeller(this.month, this.year);         // first day of the month in the week
        var countDays = (zellerDay == 0) ? 7 : zellerDay;

        // Arrays vars with the all the days that will be printed in the table calendar
        var arrayDaysLastMonth = this.daysLastMonth(this.month - 1, zellerDay, this.year);
        var arrayDaysMonth = this.extractDaysMonth(daysMonth);
        var arrayDaysNextMonth = this.daysNextMonth(arrayDaysLastMonth.length, arrayDaysMonth.length);
        this.days = arrayDaysLastMonth.concat(arrayDaysMonth, arrayDaysNextMonth);  // final array
        
        return this.days;
    }// end of the constructor of Calendar
    
    // Return the number of days that a specific month has
    this.daysPerMonth = function(month, year)
    {
        var daysMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
        if (month == 2 && this.isLeapYear(year))
            return 29;
    
        return daysMonth[month];
    }// end of the function daysPerMonth

    // Return true if it's a leap-year
    this.isLeapYear = function(year)
    {
        // check if it is a leap-year
        if ( year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
            return true;                
        
        return false;
    }// end of the function isLeapYear

    // Return an integer which depicts a week day; 0 = , 1 = sunday; 0-6
    this.zeller = function(month, year)
    {
        var a = parseInt((14 - month) / 12);
        var y = year - a;
        var m = parseInt(month + 12 * a - 2);
        var day = 1;
        
        var d = (day + y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400) + parseInt((31 * m) / 12)) % 7;  // zeller's formula
        
        return parseInt(d);
    }// end of the function zeller

    this.daysLastMonth = function(lasthMonth, zeller, year)
    {
        var count;
        var remainingDays = [];  // Host the days of the last month to complete the row in the Calendar
        lasthMonth = (lasthMonth == 0) ? 12 : lasthMonth;
        var daysLastMonth = this.daysPerMonth(lasthMonth, year);
        
        if (zeller == 0)
        {
            count = 7;
            zeller = 7;
        }// end of if
        
        else
            count = zeller;
        
        daysLastMonth = daysLastMonth - (zeller - 1);
        
        for (count; count > 0; count--)
        {
            remainingDays.push(daysLastMonth);
            daysLastMonth++;
        }// end of the for
        
        return remainingDays;
    }// end of the function printDaysLastMonth

    this.daysNextMonth = function(lastMonthDays, daysMonth)
    {
        var leftoverDays = [];
        var countDays = lastMonthDays + daysMonth;
        for (var i = 1; countDays % 7 != 0; i++, countDays++)
        //for (var i = 1; i <= ((lastMonthDays > 4) ? 42 : 35) - (lastMonthDays + daysMonth); i++)
            leftoverDays.push(i);
        
        return leftoverDays;
    }// end of the function daysNextMonth

    this.extractDaysMonth = function(days)
    {
        var arrayDaysMonth = [];

        for (var i = 1; i <= days; i++)
            arrayDaysMonth.push(i);

        return arrayDaysMonth;
    }// end of the function daysMonth

    this.getDay = function() 
    {
        return this.day;
    }// end of the function getDay

    this.getMonth = function() 
    {
        return this.month;
    }// end of the function getDay

    this.getYear = function() 
    {
        return this.year;
    }// end of the function getDay
}// end of the class Calendar


// Class UI
function UI()
{
    this.dayCells = null;  // NodeList with TD elements
    var selectedDay = -1;      // host the index of the selected day in the calendar

    // This function prepare the objects TD's adding a new property
    this.prepareDayCells = function()
    {
        this.dayCells = document.querySelectorAll('#calendar-dates td');
        this.dayCells.forEach(function(element) {
            element.selected = false;
        });
    }// end of the function prepareCellsDAy

    // Print the Calendar
    this.printCalendar = function(calendar) 
    {
        var monthHeader = document.getElementById('calendar-month-year');  
        monthHeader.innerHTML = calendar.monthsNames[calendar.month - 1];  // Set the month header

        var table = document.createElement('table');
        table.id = 'date-days';

        var tr = document.createElement('tr');      // later inserted
        document.getElementById('calendar-dates').appendChild(table);

         // Build the cells in the table
        for (var i = 0; i < calendar.days.length; i++)
        {
            var td = document.createElement('td');
            td.innerHTML = calendar.days[i];

            if (i < 7 && calendar.days[i] >= 22)   // set style some "td's"
                td.style.cssText = "background:-webkit-linear-gradient(top, #85868b 0%,#9daab3 100%);" + 
                                   "-webkit-background-clip: text;" + 
                                   "color: transparent;";

            if (i > 28 && calendar.days[i] <= 7)
            //if (arrayDaysNextMonth[i] == null && arrayDaysMonth.length <= (i - arrayDaysLastMonth.length))   // set style some "td's"
                td.style.cssText = "background:-webkit-linear-gradient(top, #85868b 0%,#9daab3 100%);-webkit-background-clip: text;color: transparent;";

            tr.appendChild(td);
            
            if ((i + 1) % 7 == 0 )
            {
                table.appendChild(tr);
                tr = null;
                tr = document.createElement('tr');
            }// end of the if
        }// end of the for

        // Gives styles to the cell of the current day
        this.prepareDayCells();
        
        for (i = this.dayCells.length; i--;)
        {
            if ( (i < 7 && this.dayCells[i].textContent >= 22) || (i > 28 && this.dayCells[i].textContent < 7) )
                continue;

            if (this.dayCells[i].textContent == calendar.day)
            {
                this.dayCells[i].style.cssText = "color: #fbffff; " +
                                                  "background: #1a80e5; " +
                                                  "box-shadow: 2px 4px 15px 0 #0635a1 inset, " +
                                                  "-2px -2px 15px 0 #0635a1 inset;";
                this.dayCells.selected = true;
                break;
            }// end of if
        }// end of the for
    }// end of the function printCalendar

    // This function gives style when a cell(day) of the Calendar is clicked or selected
    this.selectDay = function(element, currentDay)
    {
        element.style.cssText = "color: #fbffff; " +
                                    "background: #1a80e5; " +                     // styles cell clicked
                                    "box-shadow: 2px 4px 15px 0 #0635a1 inset, " +
                                    "-2px -2px 15px 0 #0635a1 inset;";
        element.selected = true;

        if (element.textContent != currentDay)
        {
            for (var i = this.dayCells.length; i--;)
            {
                if (this.dayCells[i].textContent == currentDay)
                {
                    this.dayCells[i].style.cssText = "color: #fbffff;" + 
                                                   "background: radial-gradient(ellipse at center, #566e90 0%,#6e85a5 100%);" +
                                                   "box-shadow: 2px 8px 15px 0 #31486a inset," +
                                                   "-2px -2px 15px 0 #31486a inset;";
                    this.dayCells[i].selected = false;
                    break;
                }// end of if
            }// end of for
        }// end of if

        for (var i = this.dayCells.length; i--;)
        {
            if (this.dayCells[i].selected && (this.dayCells[i] != element))
            {
                this.dayCells[i].style = document.styleSheets[0].cssRules.style; // return sytles of the cells by defalut (no clicked)
                this.dayCells[i].selected = false; 
                break;
            }// end of if
        }// end of the for
    }// end of the function selectDay

    // This function moves to next month into the calendar
    this.nextMonth = function(calendar)
    {
        //alert('Febrero');
        //document.getElementById('date-days').remove();
        var elementMonthHeader = document.getElementById('calendar-month-year');
        elementMonthHeader.innerHTML = calendar.monthsNames[(calendar.month + 1) - 1];  // Set the month header
        
        // constructCalendar(2018, elementMonthHeader.month + 1);
        // elementMonthHeader.month = elementMonthHeader.month + 1;
        //currenMonth = currenMonth + 1;
        //console.log(currenMonth);
    }// end of the function nextMonth

    // This function moves to next month into the calendar
    this.previousMonth = function(calendar)
    {
        //alert('Febrero');
        //document.getElementById('date-days').remove();
        var elementMonthHeader = document.getElementById('calendar-month-year');
        elementMonthHeader.innerHTML = calendar.monthsNames[(calendar.month - 1) - 1];  // Set the month header
        
        // constructCalendar(2018, elementMonthHeader.month + 1);
        // elementMonthHeader.month = elementMonthHeader.month + 1;
        //currenMonth = currenMonth + 1;
        //console.log(currenMonth);
    }// end of the function nextMonth
}// end of the class UI


var date = new Date();
var month = date.getMonth() + 1;   //0 - 11
var year = date.getFullYear();  // 20--
var day = date.getDate();
var calendar = new Calendar(day, 1, 2019);
calendar.constru();
console.log(calendar);
var ui = new UI();
ui.printCalendar(calendar);


// DOM Events
window.addEventListener('load', function() {

});

document.querySelectorAll('#calendar-dates td').forEach(function(element, index) {
    if ( (index < 7 && element.textContent >= 22) || (index > 28 && element.textContent < 7) )
    {
        // This 'if' statement prevent assigning a click evento to the days out of the current month
    }// end of if
    
    else
    {
        element.addEventListener('click', function(e) {
            ui.selectDay(e.target, calendar.day);
        });
    }// end of else
});

document.querySelector(".a-left").addEventListener('click', function(event) {
    ui.previousMonth(calendar);

    if (calendar.month !== 2)
        calendar.month--;
});

document.querySelector(".a-right").addEventListener('click', function(event) {
    ui.nextMonth(calendar);

    if (calendar.month !== 11)
        calendar.month++;
});
