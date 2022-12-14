$(document).ready(function () {
    let attempts = 0;
    loadData();


    //Takes coordinates, validates them and sends get request
    $(".check-button").click(function () {
            let x = $("#x-value").val();
            let y = $(".y-text-area").val();
            let r;
            $(".r-checkbox").each(function () {
                if ($(this).is(":checked")) {
                    r = $(this).val();
                    return false
                }
            })

            if (String(y) == "clear") {
                clearData()
                return false
            }
            
            if (!checkCoordsValid(x, y, r)) {
                changeCheckButtonText("Invalid value")
                return false
            }

            $.get({
                url: "./php/main.php",
                data: {
                    x: x,
                    y: y,
                    r: r,
                    time: new Date()
                },
                dataType: 'JSON'
            }).done(function (data) {
                appendData(data)
                saveData(data)
            })
        }
    )

    function checkCoordsValid(x, y, r) {
        return !!(checkX(x) && checkY(y) && checkX(r));
    }

    function checkY(y) {
        if (String(y).length > 4) {
            return false
        }
        return (y <= 5 && y >= -5)
    }

    function checkX(x) {
        return !(x === undefined)
    }

    //Swap text in "check" button for a bit if coordinates aren't valid
    function changeCheckButtonText(message) {
        $(".check-button").html(message)
        $(".check-button").toggleClass("check-button-active")
        setTimeout(() => {
                $(".check-button").html("check")
                $(".check-button").removeClass("check-button-active")
            },
            1000)
    }

    //Loads data from localStorage
    function loadData() {
        let storage = localStorage.getItem("storage");
        if (storage == null) {
            localStorage.setItem("storage", '{"data": []}');
        } else {
            JSON.parse(storage).data.forEach(element =>
                appendData(element)
            )
        }
    }

    //Saves data to localStorage
    function saveData(data) {
        const storage = localStorage.getItem("storage");
        const arr = JSON.parse(storage);
        arr.data.push(data);
        localStorage.setItem("storage", JSON.stringify(arr));
    }

    //Clears localStorage
    function clearData() {
        localStorage.clear()
        clearResultsTable()
        changeCheckButtonText("cleared")
    }

    //Appends one row to the html table
    function appendData(data) {
        let time = new Date(data.time);
        let exectime = (data.execution).toString().slice(0, 19);
        $(".results-table").append(
            `<tr class='result-row'>
             <th class='result-cell'>${data.result}</th>
             <th class='result-cell'>${data.x}</th>
             <th class='result-cell'>${data.y}</th>
             <th class='result-cell'>${data.r}</th>
             <th class='result-cell'>${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</td>
             <th class='result-cell'>${exectime}</th>
             <th class="result-cell">${attempts}</th>
             </tr>
            `
        )
        attempts++
    }

    //Delete all results and reset attempts counter
    function clearResultsTable(){
        $(".results-table").empty()
        $(".results-table").append(
            `<tr class="result-row">
            <th class="result-cell">result</th>
            <th class="result-cell">X</th>
            <th class="result-cell">Y</th>
            <th class="result-cell">R</th>
            <th class="result-cell">time</th>
            <th class="result-cell">execution time</th>
            <th class="result-cell">attempt</th>
        </tr>`
         )
         attempts = 0
    }

});