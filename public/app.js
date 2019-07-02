$(window).on('load', () => {
    $('.saveComment').hide();
    $('.commentInput').hide();
});

$(document).on('click', '.comment', () => {
    $('.commentInput').show().focus();
    $('.saveComment').show();
})


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

$(document).on('click', '.saveComment', function () {
    const id = $(this).attr('data-id');
    console.log(id);
    console.log($('#commentTitle').val());
    console.log($('#commentBody').val());

    $.ajax({
        method: "POST",
        url: "/savedArticles/" + id,
        data: {
            title: $('#commentTitle').val(),
            body: $('#commentBody').val(),
        }
    })
        .then(data => {
            $.ajax({
                method: "GET",
                url: "/savedArticles",
            })
                .then(dbArticle => {
                    console.log('Success');
                })
        })
    location.reload();
});
