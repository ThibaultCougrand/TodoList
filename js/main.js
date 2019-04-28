$(function () {
    let colorsPostIt = [
        "#ebe47a",
        "#54b4c3",
        "#e6804e",
        "#eb637b",
        "#abef66"
    ];

    let i = 100;

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
        let randomColor = Math.floor(Math.random() * colorsPostIt.length);
        let title = $(".title-list").val();
        let content = $(".content-list").val();
        if (title !== "" && content !== "") {
            let article = $("<article></article>").addClass("item-list");
            article.css("order", i);
            article.css("background-color", colorsPostIt[randomColor]);
            console.log(randomColor);
            let titleArticle = $("<h3></h3>").text(title);
            let containArticle = $("<p></p>").text(content);
            article.append(titleArticle);
            article.append(containArticle);
            todo.append(article);
            i--;
        }
        title.val("");
        content.val("");
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
        if (title !== "" && content !== "" && item.length === 1) {
            $(".clicked h3").text(title);
            $(".clicked p").text(content);
        }
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
    });

    // chargement de la liste depuis le localStorage
    var saved = localStorage.getItem('todo');
    if (saved && saved !== undefined) {
        todo.html(saved);
    }
});