
$("#reset").click(function (e) {
    e.preventDefault();
    reset();
})

$("#resetTable").click(function () {
    $("table tbody").empty();
});

$("#getFilms").click(function () {
    GetFilms();
});

$("#findByActor").click(function () {
    var searchActor = $("#searchByStars").val();
    GetFilmByActor(searchActor);
})

$("#findByName").click(function () {
    var searchName = $("#searchByName").val();
    GetFilmByName(searchName);
})


$("#sendForm").submit(function (e) {
    e.preventDefault();
    var id = this.elements["id"].value;
    var name = this.elements["name"].value;
    var yearRelease = +this.elements["yearRelease"].value;
    var encodingFormat = this.elements["encodingFormat"].value; console.log(encodingFormat);
    var actorList = this.elements["actorList"].value;
    if (id == 0 && name && yearRelease && encodingFormat && actorList)
        CreateFilm(name, yearRelease, encodingFormat, actorList);
    else
        EditFilm(id, name, yearRelease, encodingFormat, actorList);

    $(".error").remove();

    if (name.length< 1) {
      $('#sendForm input[name=name]').after('<span class="error">This field is required!</span>');
    }

    if (actorList.length< 1) {
        $('#sendForm input[name=actorList]').after('<span class="error">This field is required!</span>');
    }
    if(encodingFormat === "default"){
        $('#sendForm select[name=encodingFormat]').after('<span class="error">This field is required!</span>');
    }

    if (yearRelease < 1885 || yearRelease > new Date().getFullYear() || isNaN(yearRelease)) {
        $('#sendForm input[name=yearRelease]').after('<span class="error">This field must be 1885.. to now!</span>');
    }
    var regEx =  /^((\w){1,}\s(\w){1,})(,\s?(\w){1,}\s(\w){1,}){0,}$/g;
    var valid = regEx.test(actorList);
    if (!valid) {
        $('#sendForm input[name=actorList]').after('<span class="error">Actors must have name and surname! </span>');
    }

});

$("body").on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetFilm(id);
})

$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    var delСonfirmation = confirm(`Do you want delete film?`);
    if(delСonfirmation)DeleteFilm(id);
})


    $("#addFile").submit(function (e) {
        e.preventDefault()
        var file = $('#avatar').prop('files')[0];
        var formdata = new FormData();
        formdata.append("avatar", file);
        SendFile(formdata);

})


