$('#saveArticle').click(function () {
    const id = $(this).attr('data-id');

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: id
    })
        .then(function (data) {
            console.log(data);
        })
});

$('#saveComment').click(function () {
    const id = $(this).attr('data-id');

    $.ajax({
        method: "POST",
        url: "/savedArticles/" + id,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
          }
    })
        .then(function (data) {
            console.log(data);
        })
});
