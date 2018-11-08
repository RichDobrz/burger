$(function(){
    $(".eat_the_burger").on("click", function(event) {
        var id = $(this).data("id")

        var newEatState = {
            devoured: true
        }


        $.ajax("/api/burger/" + id, {
            type:"PUT",
            data: newEatState
        })

        location.reload()
    })

    $(".create-form").on("submit", function(event) {
        event.preventDefault()

        var newBurg = {
            burger_name: $("#burgerName").val().trim(),
            devoured: false
        }

        $.ajax("/api/burger", {
            type: "POST",
            data: newBurg
        }).then(
            function() {
                console.log("New burger added")
                location.reload()
            }
        )
    })







})