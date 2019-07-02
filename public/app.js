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
    let id = $('.comment').attr('data-id');
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
                    // const comm ='<h6 class="text-center">Comments</h6>';
                    // const title = '<p class="text-center">' + dbArticle.comment.title + '</p>';
                    // const body = '<p class="text-center">' + dbArticle.comment.body + '</p>';

                    // $('.commentBody').append(comm, title, body);
                })
        })
    location.reload();
});
