$(document).ready(function () {
    let attempts = 0;

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
                createResultRow(data);
            })
        }
    )

    function checkCoordsValid(x, y, r) {
        return !!(checkX(x) && checkY(y) && checkX(r));
    }

    function checkY(y) {
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

    function createResultRow(data) {

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
        attempts++;
    }

});