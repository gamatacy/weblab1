$(document).ready(function () {
    let attempts = 0;
    loadData();

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

            if (!checkCoordsValid(x, y, r)) {
                invalidValue()
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
        if(String(y) == "clear"){
            clearData()
            return false
        }
        if (String(y).length > 4){
            return false
        }
        return (y <= 5 && y >= -5)
    }

    function checkX(x) {
        return !(x === undefined)
    }

    function invalidValue() {
        $(".check-button").html("Invalid value")
        $(".check-button").toggleClass("check-button-active")
        setTimeout(() => {
                $(".check-button").html("check")
                $(".check-button").removeClass("check-button-active")
            },
            1000)

    }
    
    function loadData(){
       let storage = localStorage.getItem("storage");
       if (storage == null){
            localStorage.setItem("storage", '{"object": []}');
       }else{
            JSON.parse(storage).object.forEach(element => {
              appendData(element);
          });
       }
    }

    function saveData(data){
        const storage = localStorage.getItem("storage");
        const arr = JSON.parse(storage);
        arr.object.push(data);
        localStorage.setItem("storage", JSON.stringify(arr));
    }

    function clearData(){
        localStorage.clear()
    }

    function appendData(data) {
        let time = new Date(data.time);
        let exectime = (data.execution).toString().slice(0,19);
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

});