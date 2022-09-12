$(document).ready(function () {

    function checkY(y) {
        return !(y > 5 || y < -5);
    }

    $("#check-button").click(
        $.ajax({
            type: "GET",
            url: "./php/main.php",
            data: {
                x: 1,
                y: 13,
                r: 14,
                time: new Date()
            },
            success: function (data) {
                alert(data);
            }
        })
    )
});