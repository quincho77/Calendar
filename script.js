window.onload = function () {
    
    var date = new Date();
    
    var month = date.getMonth() + 1;   //0 - 11
    var year = date.getFullYear();  // 2017
    
    constructCalendar(year, month);
};


function constructCalendar(year, month)
{
    console.log(weekHeaders());
    
    var daysMonth = daysPerMonth(year, month);
    var zellerDay = zeller(year, month);
    var countDays;
    
    countDays = (zellerDay == 0) ? 7 : zellerDay;
//    console.log(zellerDay);
//    console.log(countDays);
    
    var output = printDaysLastMonth(month - 1, zellerDay, year);
    
//    console.log(printDaysLastMonth(month - 1, zellerDay, year));
    
    if (countDays == 7)
        output += "\n";
    
    for (var j = 1; j <= daysMonth; j++)
    {
        output += j + "\t";
        countDays++;
        
        if (countDays % 7 == 0)
            output += "\n";
    }// end of for
    
    output = printDaysNextMonth(countDays, output)
    console.log(output);
}// end of the function constructCalendar

function weekHeaders()
{
    return "Sun\tMon\tTue\tWen\tThu\tFri\tSat";
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

function printDaysLastMonth(lasthMonth, zeller, year)
{
    var count;
    var output = "";
    var lastMonthLastYear = (lasthMonth == 0) ? 12 : lasthMonth;
    var daysLastMonth = daysPerMonth(year, lastMonthLastYear);
    
    if (zeller == 0)
    {
        count = 7;
        zeller = 7;
    }// end of if
    
    else
        count = zeller;
    
    daysLastMonth = daysLastMonth - (zeller - 1);
    
    for (var i = count; count > 0; count--)
    {
        output += daysLastMonth + "\t";
        daysLastMonth++;
    }// end of for
    
    return output;
}// end of the function printDaysLastMonth

function printDaysNextMonth(countDays, output)
{
    var counter = countDays;
    var outputDays = output;
    
    for (var i = 1; countDays < 42; i++, countDays++)
    {
        if (countDays % 7 == 0 && i != 1)
            outputDays += "\n";
        
        outputDays += i + "\t";
    }// fin del for
    
    return outputDays;
}

// Return true if it's a leap-year
function isLeapYear(year)
{
    // check if is a leap-year
    if ( year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
        return true;                
        
    return false;
}// end of the function isLeapYear
