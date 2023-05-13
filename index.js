function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
  }
  
  const today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  var selectYear = document.getElementById("year");
  var selectMonth = document.getElementById("month");
  
  var createYear = generate_year_range(1950, 2100);
  
  document.getElementById("year").innerHTML = createYear;
  
  var calendar = document.getElementById("calendar");
  var lang = calendar.getAttribute('data-lang');
  
  var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  var days = ["日", "月", "火", "水", "木", "金", "土"];
  
  var dayHeader = "<tr>";
  for (day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
  }
  dayHeader += "</tr>";
  
  document.getElementById("thead-month").innerHTML = dayHeader;
  
  monthAndYear = document.getElementById("monthAndYear");
  showCalendar(currentMonth, currentYear);
  
  function next() {
    //条件式　？　exprIfTure : exprOfFalse
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    console.log(currentYear);
    console.log(currentMonth);
    showCalendar(currentMonth, currentYear);
  }
  
  function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  }
  
  function jump() {
    //parseInt(文字列(.value),基数);
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
  }
  
  function showCalendar(month, year) {
  
    var firstDay = ( new Date( year, month ) ).getDay();
    
    tbl = document.getElementById("calendar-body");
  
    tbl.innerHTML = "";
  
    monthAndYear.innerHTML = months[month] + " " + year;
    //左辺と右辺を交代させると日付指定の部分の数値が設定した始めの値になる
    //1950年が始めの値の場合、画面が2021でも指定箇所が1950になる
    selectYear.value=year ;
    selectMonth.value=month;
  
    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        var row = document.createElement("tr");
  
        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                //setAttribute(name,value);
                //（属性の名前を文字列で指定,属性に設定したい値を指定);
                //data-データ属性は要素をスタイリングするのに使える
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";
                //今日の日付のとき、その日付のセルにclassを追加
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }
        }
  
        tbl.appendChild(row);
    }
  
  }
  
  function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }
  window.onload = function() {
    Particles.init({
      selector: '.background',
      sizeVariations: 20,
      color: [
        '#0bd', 'rgba(0,90,221,.5)', 'rgba(0,187,221,.2)'
      ]
    });
  };