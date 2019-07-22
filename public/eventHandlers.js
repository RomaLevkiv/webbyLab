

// сброс значений формы
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

// отправка формы
$("#sendForm").submit(function (e) {
    e.preventDefault();
    var id = this.elements["id"].value;
    var name = this.elements["name"].value;
    var yearRelease = this.elements["yearRelease"].value;
    var encodingFormat = this.elements["encodingFormat"].value;
    var actorList = this.elements["actorList"].value;
    if (id == 0 && name && yearRelease && encodingFormat && actorList)
        CreateFilm(name, yearRelease, encodingFormat, actorList);
    else
        EditFilm(id, name, yearRelease, encodingFormat, actorList);
});

// нажимаем на ссылку Изменить
$("body").on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetFilm(id);
})

$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteFilm(id);
})





$("#uploadFile").on("click", function(){
    alert('ok');
    event.stopPropagation(); // остановка всех текущих JS событий
	event.preventDefault();  // остановка дефолтного события для текущего элемента - клик для <a> тега

	// ничего не делаем если files пустой
	if( typeof files == 'undefined' ) return;

	// создадим объект данных формы
	var data = new FormData();

	// заполняем объект данных файлами в подходящем для отправки формате
	
        data.append( "key" ,files[0] );
    
    

	// добавим переменную для идентификации запроса
	data.append( 'my_file_upload', 1 );

    SendFile(data);



});
    



	


