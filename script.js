window.onload = function () {
    
    var date = new Date();
    
    var month = date.getMonth() + 1;   //0 - 11
    var year = date.getFullYear();  // 20--
    
    constructCalendar(year, month);
};


function constructCalendar(year, month)
{
    var table = document.createElement('table');
    var tr = document.createElement('tr');      // later inserted
    weekHeader(table);
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
    
    var arrayDaysNextMonth = daysNextMonth(arrayDaysLastMonth.length + arrayDaysMonth.length);
    var arrayCalendar = arrayDaysLastMonth.concat(arrayDaysMonth, arrayDaysNextMonth);
    
    for (var i = 0; i < arrayCalendar.length; i++)
    {
        var td = document.createElement('td');
        td.innerHTML = arrayCalendar[i];
        tr.appendChild(td);
        
        if ((i + 1) % 7 == 0 )
        {
            table.appendChild(tr);
            tr = null;
            tr = document.createElement('tr');
        }// end of the if
    }// end of the for
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

// Return the number of days that has a specific month
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
    var dia = 1;
    
    var d = (dia + y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400) + parseInt((31 * m) / 12)) % 7;  // zeller's formula
    
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

function daysNextMonth(countDays)
{
    var leftoverDays = [];
    
    for (var i = 1; i <= (42 - countDays); i++)
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
