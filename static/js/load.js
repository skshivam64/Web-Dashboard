var num = 10; // 10 records per page

function get_data(dir){ // dir = 1 ( forward ), -1 (backward)
    $.post(
        "/fetch",
        {
            "dir": dir,
            "num": num
        },
        (data, success) => {
            console.log(data);
            len_ = data["data"].length;
            console.log(len_);
            var response = "<tr><th>Index</th><th>FirstName</th><th>StartTime</th><th>Phoneno</th><th>ReservationId</th></tr>";
            for(var i = 0; i < len_; i++){
                response += "<tr>";
                response = response + "<td>" + (data["start"] + i) + "</td>";
                response = response + "<td>" + data["data"][i]["FirstName"] + "</td>";
                response = response + "<td>" + data["data"][i]["StartTime"] + "</td>";
                response = response + "<td>" + data["data"][i]["Phoneno"] + "</td>";
                response = response + "<td>" + data["data"][i]["ReservationId"] + "</td>";
                response += "</tr>";
            }
            //console.log(response);
            $("table").html(response);
        }
    )
}

$(document).ready(() => {
    get_data(0);
    $("button.left").click(() => {
        get_data(-1);
    });
    $("button.right").click(() => {
        get_data(1);
    });
});


