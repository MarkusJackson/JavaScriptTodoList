let holidaysMap;

class TodoColumn {


    constructor(title, date) {
        this.title = title;
        this.id = Math.random();
        this.todos = new Array();
        if (date) {
            this.date = date;
        } else {
            this.date = new Date();
        }
        this.estimatedMinutes = 0;

        const holidayCheckResult = holidayCheck(this.date, this);
        this.isHoliday = holidayCheckResult[0];
        this.holidayName = holidayCheckResult[1];
    }
}


function getTodoColumnHeader(todoColumn) {

    let header = "";

    // First row
    header += "<div class='todo-column-header-first-row'>";
    header += "<span class='date'>" + todoColumn.date.toDateString() + "</span>";
    header += "<span class='estimatedTime'>" + getEstimationOfTodoColumn(todoColumn) + "</span>";
    header += "</div>";

    // Second row
    header += "<div class='todo-column-header-second-row'>";
    header += "<p class='holidayblock'>";
    if (todoColumn.isHoliday) {
        header += todoColumn.holidayName;
    } else {
        header += todoColumn.holidayName;
        //header += "Nix Feiertag";
    }
    header += "</p>";
    header += "</div>";

    return header;
}

function getEstimationOfTodoColumn(todoColumn) {
    let minutes = 0;
    todoColumn.todos.forEach(todo => {
        minutes += todo.estimatedMinutes;
    });

    if (minutes < 60) {
        return minutes + " Minuten";
    } else {
        return Math.floor(minutes / 60) + " Stunden, " + minutes % 60 + " Minuten"
    }
    return minutes;

}




function holidayCheck(date, todoColumn) {
    /*
 Check if holiday for this year are in local Store
     if not, load and save and put in Array[Year][data]
 Check if holiday for next year are in local Store
     if not, load and save and put in Array[Year][data]
 Note

 */
    //debugger;
    if (!holidaysMap) {
        holidaysMap = new Map();
        let unparsed_holidays_loaded_years = localStorage.getItem("holidays_loaded_years");
        let loaded_years_array;
        if (!unparsed_holidays_loaded_years) {
            loaded_years_array = new Array();
        } else {
            loaded_years_array = unparsed_holidays_loaded_years.split(",");
        }
        if (loaded_years_array) {
            loaded_years_array.forEach(year => holidaysMap.set(year, JSON.parse(localStorage.getItem(year))));
        }
    }

    let requestedYear = "" + (date.getYear() + 1900);

    if (!holidaysMap || !holidaysMap.has(requestedYear)) {
        $.get("https://ipty.de/feiertag/api.php", {
            'do': "getFeiertage",
            'jahr': requestedYear,
            'outformat': "Y-m-d",
            'loc': "BW,BY,BE,BB,HB,HH,HE,MV,NI,NW,RP,SL,SN,ST,SH,TH"
        })
            .done(function (data) {
                console.log("Loaded holidays for year " + requestedYear);
                //debugger;
                /* holidaysJsonThisYear = data;
                 let holidaysOfRequestYearArray = JSON.parse(data); // Array: 0: {title: "Neujahr", date: "2019-01-01", locs: Array(16)}
                 holidaysArray.push(new Array(date.getYear() + 1900, holidaysOfRequestYearArray));
                 localStorage.setItem("holidays", JSON.stringify(holidaysArray));
                 redrawMatrix();*/
                let unparsed_holidays_loaded_years = localStorage.getItem("holidays_loaded_years");
                let loaded_years_array;
                if (!unparsed_holidays_loaded_years) {
                    loaded_years_array = new Array();
                } else {
                    loaded_years_array = unparsed_holidays_loaded_years.split(",");
                }
                if (!loaded_years_array.includes(requestedYear)) {
                    loaded_years_array.push(requestedYear);
                    localStorage.setItem("holidays_loaded_years", loaded_years_array);
                    localStorage.setItem(requestedYear, data);
                    holidaysMap.set(requestedYear, JSON.parse(data));

                    const holidayCheckResult = holidayCheck2(date, todoColumn);
                    todoColumn.isHoliday = holidayCheckResult[0];
                    todoColumn.holidayName = holidayCheckResult[1];

                    redrawMatrix();
                }
            });
    } else {
        let holidayForCurrentYear = holidaysMap.get(requestedYear);
        console.log("This Year gefunden:", holidayForCurrentYear);
        //debugger;
        let formattedAte = date.toISOString().substring(0, 10);
        let result;
        holidayForCurrentYear.forEach(function (holiday) {
            let dateString = holiday.date;
            if (dateString == formattedAte) {
                result = new Array(true, holiday.title);
            }
        });

        if (result) {
            return result;
        }


    }

    if (date.getDay() == 0) {
        return new Array(true, "Sonntag");
    } else {
        return new Array(false, "");
    }
}