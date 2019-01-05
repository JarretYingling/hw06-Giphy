// javascript

$(document).ready(function () {

    let Giphy = {
        // &rating=G&lang=en
        arrQuery: ["https://api.giphy.com/v1/gifs/", "search?", "api_key=jspItT1f9xNw9QHrsUg5lrn5w5JVkIms", "&q=", "", "&limit=", 10, "&offset=", 0],
        /* index map
        4 = q search term
        6 = limit(10)
        8 = offset
        */
        queryURL: "",
        arrTerms: ["alcohol", "beer", "wine", "champagne", "whiskey", "bourbon", "rye", "scotch", "gin", "brandy", "cognac", "vodka", "schnapps"],
        makeURL: function (q) {
            this.arrQuery[4] = q;
            this.queryURL = this.arrQuery.join("");
            return this.queryURL;
        },
        queryGiphy: function (id) {
            this.makeURL(id);
            $.ajax({
                url: this.queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#gifs").empty();
                $.each(response.data, function () {
                    console.log("url = " + this.embed_url);
                    $("#gifs").append('<img src="' + this.embed_url + '">');
                });
            });
        }
    };

    $.each(Giphy.arrTerms, function (index, value) {
        console.log(index, value);
        $("#buttons").append("<button id='" + value + "' class='btn bg-success mt-2 mx-2'>" + value + "</button>");
    });

    $(".btn").on("click", function () {
        let id = $(this).attr("id");
        console.log(id);
        Giphy.queryGiphy(id);
    });

});