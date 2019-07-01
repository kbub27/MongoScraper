$(document).on('click', '.saveArticle', function () {
    const id = $(this).attr('data-id');

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: id
    })
        .then(function (data) {
            console.log(data);
        })
    $(this).hide();
});

$('.saveComment').click(function () {
    const id = $(this).attr('data-id');
    console.log($('#commentTitle').val());
    console.log($('#commentBody').val());

    $.ajax({
        method: "POST",
        url: "/savedArticles/" + id,
        comment: {
            // Value taken from title input
            title: $("#commentTitle").val(),
            // Value taken from note textarea
            body: $("#commentBody").val()
        }
    })
        .then(function (comment) {
            console.log(comment);
        })
});
