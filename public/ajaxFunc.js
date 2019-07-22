
function GetFilms() {
    $.ajax({
        url: "/films",
        type: "GET",
        contentType: "application/json",
        success: function (films) {
            var rows = "";
            $("table tbody").empty();
            $.each(films, function (index, film) {
                rows += row(film);
            })
            $("table tbody").append(rows);
        }
    });
}

function GetFilm(id) {
    $.ajax({
        url: "/films/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (film) {
            var form = document.forms["filmForm"];
            form.elements["id"].value = film[0]._id;
            form.elements["name"].value = film[0].name;
            form.elements["yearRelease"].value = film[0].yearRelease;
            form.elements["encodingFormat"].value = film[0].encodingFormat;
            form.elements["actorList"].value = film[0].actorList;
        }
    });
}

function GetFilmByName(title) {
    $.ajax({
        url: "/films/title/" + title,
        type: "GET",
        contentType: "application/json",
        success: function (films) {
            var rows = "";
            $("table tbody").empty();
            $.each(films, function (index, film) {
                rows += row(film);
            })
            $("table tbody").prepend(rows);
        }
    });
}

function GetFilmByActor(actor) {
    $.ajax({
        url: "/films/actors/" + actor,
        type: "GET",
        contentType: "application/json",
        success: function (films) {
            var rows = "";
            $("table tbody").empty();
            $.each(films, function (index, film) {
                rows += row(film);
            })
            $("table tbody").prepend(rows);
        }
    });
}

function CreateFilm(filmName, filmRelease, filmFormat, filmStars) {
    $.ajax({
        url: "/films",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: filmName,
            yearRelease: filmRelease,
            encodingFormat: filmFormat,
            actorList: filmStars
        }),
        success: function (film) {
            reset();
            $("table tbody").append(row(film));
        }
    })
}

function EditFilm(filmId, filmName, filmRelease, filmFormat, filmStars) {
    $.ajax({
        url: "/films",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: filmId,
            name: filmName,
            yearRelease: filmRelease,
            encodingFormat: filmFormat,
            actorList: filmStars
        }),
        success: function (film) {
            reset();
            console.log(film);
            console.log($("tr[data-rowid='" + film._id + "']"));
            $("tr[data-rowid='" + film._id + "']").replaceWith(row(film));
        }
    })
}

function reset() {
    var form = document.forms["filmForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function DeleteFilm(id) {
    $.ajax({
        url: "films/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (film) {
            console.log(film);
            $("tr[data-rowid='" + film._id + "']").remove();
        }
    })
}

var row = function (film) {
    return "<tr data-rowid='" + film._id + "'><td>" + film.name + "</td>" +
        "<td>" + film.yearRelease + "</td> <td>" + film.encodingFormat +
        "</td> <td>" + film.actorList + "</td>" +
        "<td><a class='editLink' data-id='" + film._id + "'>Update</a> | " +
        "<a class='removeLink' data-id='" + film._id + "'>Delete</a></td></tr>";
}