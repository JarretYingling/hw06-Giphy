// javascript

$(document).ready(function () {

    let Giphy = {
        queryURL: "",
        arrTopics: ["alcohol", "beer", "wine", "champagne", "whiskey", "bourbon", "rye", "scotch", "gin", "brandy", "cognac", "vodka", "moonshine"],
        arrCounter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        keep: false,
        arrQuery: ["https://api.giphy.com/v1/gifs/", "search?", "api_key=jspItT1f9xNw9QHrsUg5lrn5w5JVkIms", "&q=", "", "&limit=", 10, "&offset=", 0],
        /* query string legend
        4 = q search term
        6 = limit(10)
        8 = offset
        */
        displayButtons: function () {
            $("#buttons").empty();
            $.each(Giphy.arrTopics, function (index, value) {
                console.log(index, value);
                $("#buttons").append(`
                    <button id="${value}" class="btn bg-success mt-2 mx-2">${value}</button>
                `);
            });
        },
        makeURL: function (q, counter) {
            this.arrQuery[4] = q;
            this.arrQuery[8] = counter * this.arrQuery[6];
            this.queryURL = this.arrQuery.join("");
            return this.queryURL;
        },
        queryGiphy: function (id, counter) {
            this.makeURL(id, counter);
            $.ajax({
                url: this.queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                this.keep = $("#keep").prop("checked");
                console.log(this.keep);
                if (!this.keep) {
                    $("#gifs").empty();
                }
                $.each(response.data, function () {
                    $("#gifs").prepend(`
                        <p class="float-left">
                            <img id="0" class="gif" src="${this.images.fixed_height_small_still.url}" data-alt="${this.images.fixed_height_small.url}">
                            <br>rating(${this.rating})
                        </p>
                    `);
                });
            });
        }
    };

    Giphy.displayButtons();

    $(document).on("click", ".btn", function (event) {
        let id = $(this).attr("id");
        let index = Giphy.arrTopics.indexOf(id);
        let counter = Giphy.arrCounter[index];
        console.log(id, index, counter);
        Giphy.queryGiphy(id, counter);
        Giphy.arrCounter[index]++;
        console.log(Giphy.arrCounter);
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        let newTopic = $("#topic").val();
        console.log(newTopic);
        Giphy.arrTopics.push(newTopic);
        Giphy.arrCounter.push(0);
        console.log(Giphy.arrTopics);
        Giphy.displayButtons();
        $("#topic").val("");
    });

    $(document).on("click", ".gif", function (event) {

        if ($(this).attr("id") == "0") {
            let still = $(this).attr("src");
            let gif = $(this).attr("data-alt");
            console.log(still, gif);
            $(this).attr("data-alt", still);
            $(this).attr("src", gif);
            $(this).attr("id", "1");
        } else if ($(this).attr("id") == "1") {
            let still = $(this).attr("data-alt");
            let gif = $(this).attr("src");
            console.log(still, gif);
            $(this).attr("data-alt", gif);
            $(this).attr("src", still);
            $(this).attr("id", "0");
        };

    });

});