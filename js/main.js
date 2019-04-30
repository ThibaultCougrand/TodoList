$(function () {

    // Couleurs de post-it
    let colorsPostIt = [
        "#ebe47a",
        "#54b4c3",
        "#e6804e",
        "#eb637b",
        "#abef66"
    ];

    // variable de positionnement des élément (corespond à order flex)
    let i = 100;

    // date local
    let d = new Date();
    //let localHour = d.getHours();
    let localDay = d.getDate();
    let localMonth = (d.getMonth() + 1);
    let localYear = (d.getFullYear());

    // conteneur de liste
    let todo = $(".container-list");

    // selectionne la div cliquée
    todo.on("click", ".item-list", function () {
        $(this).addClass("clicked");
    });

    // deselectionne la div cliquée
    todo.on("click", ".clicked", function () {
        $(this).removeClass("clicked");
    });

    // bouton ajouter
    $(".add-item").on("click", function () {

        // choix de la couleur random des taches
        let randomColor = Math.floor(Math.random() * colorsPostIt.length);

        //gestion de la date
        let date = $(".date-list").val().toString();
        let day = date.substring(8);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);

        //contenu des taches
        let title = $(".title-list").val();
        let content = $(".content-list").val();
        let hourTask = $(".time-list").val().toString().replace(":", "h");
        let dateTask = day + "-" + month + "-" + year;

        //créer la liste
        if (title !== "" && content !== "") {
            let article = $("<article></article>").addClass("item-list");
            article.css("order", i);
            article.css("background-color", colorsPostIt[randomColor]);
            let titleArticle = $("<h3></h3>").text(title);
            let containArticle = $("<p></p>").text(content);
            if (hourTask !== "" && dateTask !== "") {
                let timedatetask = $('<p class="timedate"></p>').html(hourTask+" le "+dateTask);
            }
            article.append(titleArticle);
            article.append(containArticle);
            article.append(timedatetask);
            todo.append(article);
            i--;
        }
        $(".title-list").val("");
        $(".content-list").val("");
    });


    // bouton terminer
    $(".finish-item").on("click", function () {
        let selected = $(".clicked");
        selected.css("order", 101);
        selected.addClass("end-list");
        selected.removeClass("clicked");
    });

    // bouton modifier
    $(".update-item").on("click", function () {
        let item = $(".clicked");
        let title = $(".title-list").val();
        let content = $(".content-list").val();
        if (title !== "" && item.length === 1) {
            $(".clicked h3").text(title);
        } else if (content !== "" && item.length === 1) {
            $(".clicked p").text(content);
        }
        $(".title-list").val("");
        $(".content-list").val("");
    });

    // bouton monter
    $(".up-item").on("click", function () {
        if ($(".clicked").length === 1) {
            $(".clicked").css("order", i);
        }
    });

    // bouton supprimer
    $(".remove-item").on("click", function () {
        $(".clicked").remove();
    });

    // bouton tout selectionner
    $(".selectall-item").on("click", function () {
        $(".container-list article").addClass("clicked");
    });

    // bouton de sauvegarde de list
    $(".save-item").on("click", function () {
        localStorage.setItem('todo', todo.html());
        localStorage.setItem('i', i);
    });

    // chargement de la liste depuis le localStorage
    var saved = localStorage.getItem('todo');
    var savedI = localStorage.getItem('i');
    if (saved && saved !== undefined) {
        todo.html(saved);
        i = savedI;
    }

    // vérifie les dates de fin
    function verifDate () {
        $(".timedate").each(function (i) {
            //let hourTask = $(this).text().toString().substring(0, 2);
            let dayTask = $(this).text().toString().substring(9, 11);
            let monthTask = $(this).text().toString().substring(12, 14);
            let yearTask = $(this).text().toString().substring(15, 19);
            if (dayTask == localDay+1 && monthTask == localMonth && yearTask == localYear) {
                $(this).parent().css("background-color", "#DF3434");
            } else if (dayTask == localDay && monthTask == localMonth && yearTask == localYear) {
                $(this).parent().addClass("end-list");
            }
        });
    }
    
    verifDate();
    setInterval(verifDate, 12*60*60*1000);
});