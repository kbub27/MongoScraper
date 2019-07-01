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
        .then(function (data) {
            console.log(data);
            const comm ='<h6 class="text-center">Comments</h6>';
            const title = '<p class="text-center">' + data.title + '</p>';
            const body = '<p class="text-center">' + data.body + '</p>';

            if (data._id) {
                $('.commentBody').append(comm, title, body);
            }

        })
});
