
var url;

$(function() {
    	url = window.location.origin + window.location.pathname;
	$('body').show();
	$.ajax({
	    method: "GET",
	    url: url + "/data/application.json",
	    async: false,
	    success: function (data) {
		$('#title').html(data.title);
		$('#name').html(data.name);
		$('#description').html(data.description);
	    }
	});
});

function helpFunction() {
    var result = "";
    $.ajax({
        method: "GET",
        url: url + "/data/help.json",
        async: false,
        success: function (data) {
            result += data.message;
            var array = data.content;
            array.forEach(function (json) {
                result += " | - " + json.value;
            });
        }
    });
    return result.split(" | ").join("<br>");
    //202.52.146.117
}

function whoamiFunction() {
    var result = "";
    $.ajax({
        method: "GET",
        url: url + "/data/whoami.json",
        async: false,
        success: function (data) {
            result += data.content;
        }
    });
    return result + "</br> <a href='assets/pdf/CV.pdf'>Curriculum Vitae</a>";
}

function contactFunction() {
    var result = "";
    $.ajax({
        method: "GET",
        url: url + "/data/contact.json",
        async: false,
        success: function (data) {
            result += data.message;
            var array = data.content;
            array.forEach(function (json) {
                result += " | - " + json.name + ": " + json.value;
            });
        }
    });
    return result.split(" | ").join("<br>");
}

function projectFunction() {
    var result = "";
    $.ajax({
        method: "GET",
        url: url + "/data/project.json",
        async: false,
        success: function (data) {
            result += data.message;
            var array = data.content;
            array.forEach(function (json) {
                result += ' | - ' + '<a href="'+json.link+'">'+json.name+'</a>: '+json.description;
            });
        }
    });
    return result.split(" | ").join("<br>");
}

function terminal() {

    var doNothing = "";

    var cmdNotFound = "Command not found! Use help for a list of commands.";

    $("#terminal").keypress(function (r) {

        function e(r) {
            $("#term-user-bar").remove(), $("#terminal>#term-inner").append("<p id='term-output'><span class='term-font-green'>shell</span> " + " " + " <span class='term-font-blue'>=></span> " + j + "</p>"), $("#terminal>#term-inner").append("<p id='term-output'>" + r + "</p>"), $("#terminal>#term-inner").append("<div id='term-user-bar'><p><span class='term-font-green'>shell</span> " + " " + " <span class='term-font-blue'>=></span></p><input id='term-command' type='text'></div>"), $("#term-command").focus()
        }

        function clear() {
            $("#terminal>#term-inner").remove(), $("#terminal").append("<div id='term-inner'></div>"), $("#terminal>#term-inner").append("<div id='term-user-bar'><p><span class='term-font-green'>shell</span> " + " " + " <span class='term-font-blue'>=></span></p><input id='term-command' type='text'></div>"), $("#term-command").focus()
        }

        if (13 === r.which) {
            var j = $("#term-command").val().trim();
            switch (j) {
                case "help":
                    e(helpFunction());
                    break;
                case "whoami":
                    e(whoamiFunction());
                    break;
                case "contact":
                    e(contactFunction());
                    break;
                case "project":
                    e(projectFunction());
                    break;
                case "clear":
                    clear();
                    break;
                case "":
                    e(doNothing);
                    break;
                default:
                    e(cmdNotFound);
                    break;
            }
        }
    })
}
