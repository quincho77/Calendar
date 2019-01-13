window.onload = function () {
    
    var date = new Date();
    var month = date.getMonth() + 1;   //0 - 11
    var year = date.getFullYear();  // 20--
    var day = date.getDate();
    main(year, month, day);
    centerATitle();
};

// This function execute all other function on this script
function main(year, month, day)
{
    constructCalendar(year, month, day);
    givesStyleCurrentDay(day);

    prepareArrows();
    
    // The next code add propeties (year - month - day) to some elments (.a-left & .a-right) for later make some operations
    // var aLeft = document.getElementsByClassName('a-left');
    // var aRight = document.getElementsByClassName('a-right');
    var monthHeader = document.getElementById('calendar-month-year');

    monthHeader.year = year;
    monthHeader.month = month;
    monthHeader.day = day;

    // aLeft[0].year = year;
    // aLeft[0].month = month;
    // aLeft[0].day = day;
    
    // aRight[0].year = year;
    // aRight[0].month = month;
    // aRight[0].day = day;
}// end of the function main

// This function creates the dates of a month with a table format to look like a calendar, callind the functions 
// below
function constructCalendar(year, month)
{
    var table = document.createElement('table');
    table.id = 'date-days';

    var tr = document.createElement('tr');      // later inserted
    document.getElementById('calendar-dates').appendChild(table);
    
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                      'October', 'November', 'December'];
    var daysMonth = daysPerMonth(year, month);    // number of days in a month
    var zellerDay = zeller(year, month);          // first day of the month in the week
    var countDays;
    
    countDays = (zellerDay == 0) ? 7 : zellerDay;
    
    var arrayDaysLastMonth = daysLastMonth(month - 1, zellerDay, year);
    var arrayDaysMonth = [];
    
    for (var i = 1; i <= daysMonth; i++)
        arrayDaysMonth.push(i);
    
    var arrayDaysNextMonth = daysNextMonth(arrayDaysLastMonth.length, arrayDaysMonth.length);
    var arrayCalendar = arrayDaysLastMonth.concat(arrayDaysMonth, arrayDaysNextMonth);

    // Build the cells in the table
    for (var i = 0; i < arrayCalendar.length; i++)
    {
        var td = document.createElement('td');
        td.innerHTML = arrayCalendar[i];

        if (arrayDaysLastMonth[i] != null)   // set style some "td's"
            td.style.cssText = "background:-webkit-linear-gradient(top, #85868b 0%,#9daab3 100%);-webkit-background-clip: text;color: transparent;";

        if (arrayDaysNextMonth[i] == null && arrayDaysMonth.length <= (i - arrayDaysLastMonth.length))   // set style some "td's"
            td.style.cssText = "background:-webkit-linear-gradient(top, #85868b 0%,#9daab3 100%);-webkit-background-clip: text;color: transparent;";

        tr.appendChild(td);
        
        if ((i + 1) % 7 == 0 )
        {
            table.appendChild(tr);
            tr = null;
            tr = document.createElement('tr');
        }// end of the if
    }// end of the for

    document.querySelector("#calendar-month-year").innerHTML = monthNames[month - 1];
    
    prepareCells(table, daysMonth);    
}// end of the function constructCalendar

function weekHeader(table)
{
    var dayNames = ['Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', "Sat"];
    var tr = document.createElement('tr');
    
    for (var i = 0; i <= 6; i++)
    {
        var td = document.createElement('td');
        td.innerHTML = dayNames[i];
        tr.appendChild(td);
    }// end of the for
    
    table.appendChild(tr);
}// end of the function weekHeader

// Return the number of days that a specific month has
function daysPerMonth(year, month)
{
    var daysMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (month == 2 && isLeapYear(year))
        return 29;
    
    return daysMonth[month];
}// end of the function daysPerMonth

// Return an integer which depicts a week day; 0 = , 1 = sunday; 0-6
function zeller (year, month)
{
    var a = parseInt((14 - month) / 12);
    var y = year - a;
    var m = parseInt(month + 12 * a - 2);
    var day = 1;
    
    var d = (day + y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400) + parseInt((31 * m) / 12)) % 7;  // zeller's formula
    
    return parseInt(d);
}// end of the function zeller

function daysLastMonth(lasthMonth, zeller, year)
{
    var count;
    var remainingDays = [];  // Host the days of the last month to complete the row in the Calendar
    lasthMonth = (lasthMonth == 0) ? 12 : lasthMonth;
    var daysLastMonth = daysPerMonth(year, lasthMonth);
    
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

function daysNextMonth(lastMonthDays, daysMonth)
{
    var leftoverDays = [];
    
    for (var i = 1; i <= ((lastMonthDays > 4) ? 42 : 35) - (lastMonthDays + daysMonth); i++)
        leftoverDays.push(i);
    
    return leftoverDays;
}// end of the function daysNextMonth

// Return true if it's a leap-year
function isLeapYear(year)
{
    // check if it is a leap-year
    if ( year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
        return true;                
        
    return false;
}// end of the function isLeapYear


// This function return the value of a property of CSS
function queryCascade(element, property)
{
    if (typeof getComputedStyle === "function")
        return getComputedStyle(element, null)[property];
}

function centerATitle()
{
    // Obtener la anchura del title asignado automaticamente
    // obtener la anchura total del contenedor
    // (anchuraTitulo - anchuraContenedor) / 2
    // asignar el resultado de la operacion anterior al margin-left del titulo
    
    var widthTitle = document.getElementById('calendar-year').offsetWidth;
    var widthContainer = document.getElementById('calendar-container').offsetWidth;
    var widthCalendarsButton = document.getElementsByTagName('button')[0].offsetWidth;
    
    var sheet = document.getElementsByTagName("link")[0].sheet;
    var rules = sheet.cssRules;
    var rule = rules[6];
    var statements = rule.style;
    var value = ((widthContainer - widthTitle) / 2) - (widthCalendarsButton + 7.5);
    statements.marginLeft = value.toString() + "px";
}// end of the function centerATitle

// This function assign a event to the cells
function prepareCells(table, daysMonth)
{
    var tdElements = table.querySelectorAll("#calendar-dates td");

    for (var i = tdElements.length; i--;)
    {
        if ( (i < 6 && tdElements[i].textContent >= 25) || (i > daysMonth && tdElements[i].textContent <= 6) )
            continue;  // this 'if' avoid assigning the event click to days that are outside of the current month

        tdElements[i].selected = false;
        tdElements[i].addEventListener("click", givesStylesCellClick);
    }// end of the for
}// end of the function prepareCells

// This function gives style when a cell(day) of the Calendar is clicked
// This function also might be optimized hereafter (for not to pass over the second "for" the first time and so on)
function givesStylesCellClick(e)
{
    var tdElements = document.querySelectorAll("#calendar-dates td");
    var currentDay = new Date().getDate();
    console.log(currentDay);

    if (e.target)
    {
        e.target.style.cssText = "color: #fbffff; " +
        "background: #1a80e5; " +
        "box-shadow: 2px 4px 15px 0 #0635a1 inset, " +
        "-2px -2px 15px 0 #0635a1 inset;";
        e.target.selected = true;
        
        if (e.target.textContent != currentDay)
        {
            for (var i = tdElements.length; i--;)
            {
                if (tdElements[i].textContent == currentDay)
                {
                    tdElements[i].style.cssText = "color: #fbffff;" + 
                                                   "background: radial-gradient(ellipse at center, #566e90 0%,#6e85a5 100%);" +
                                                   "box-shadow: 2px 8px 15px 0 #31486a inset," +
                                                   "-2px -2px 15px 0 #31486a inset;";
                    tdElements[i].selected = false;
                    break;
                }// end of if
            }// end of if
        }// end of if
    }// end of if
    
    for (var i = tdElements.length; i--;)
    {
        if (tdElements[i].selected && (tdElements[i] != e.target))
        {
            tdElements[i].style = document.styleSheets[0].cssRules.style; // return to the styles by default
            tdElements[i].selected = false; 
            break;
        }// end of if
    }// end of the for
}// end of the function givesStylesCellClick

// This function gives the style to the current day in the calendar
function givesStyleCurrentDay(currentDay)
{
    var tdElements = document.querySelectorAll("#calendar-dates td");

    for (i = tdElements.length; i--;)
    {
        if (tdElements[i].textContent == currentDay)
        {
            tdElements[i].style.cssText = "color: #fbffff; " +
                                          "background: #1a80e5; " +
                                          "box-shadow: 2px 4px 15px 0 #0635a1 inset, " +
                                          "-2px -2px 15px 0 #0635a1 inset;";
            break;
        }// end of if
    }// end of the for
}// end of the function givesStyleCurrentDay

// This function prepare the click event in the arrows buttons of the calendar
function prepareArrows()
{
    document.querySelector(".a-left").addEventListener('click', nextMonth);
    document.querySelector(".a-right").addEventListener('click', nextMonth);
}// end of the function prepareArrows

function nextMonth()
{
    document.getElementById('date-days').remove();
    var elementMonthHeader = document.getElementById('calendar-month-year');

    constructCalendar(2018, elementMonthHeader.month + 1);
    elementMonthHeader.month = elementMonthHeader.month + 1;
    //currenMonth = currenMonth + 1;
    //console.log(currenMonth);
}// end of the function nextMonth