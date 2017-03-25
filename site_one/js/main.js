function load() {
    window.FakeLoader.showOverlay();
}
function unload() {
    window.FakeLoader.hideOverlay();
}
function togquiz() {
    $("#quiz-container").hide();
}
function toghead() {
    $("#page-header").show();
}
function start() {
    // Hides webshit and starts quiz
    $("#page-header").hide();
    $(".start").hide();
    $("#app-name").css("fontSize", 64);
    $("#quiz-container").show();
}
function get_photos(setid, lim, check) {
    // uses flickr photosets.getphotos API to get images.
    var apikey = '52e55bf0e7329f969a6fc48b5c4a5276';
    $.ajax({
        url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey + '&photoset_id=' + setid + '&user_id=146306653@N02&format=json&nojsoncallback=1',
        dataType: 'json',
        async: false,
        success: function (data) {
            // Go through all the photos
            $.each(data.photoset.photo, function (i, info) {
                if (i <= lim) {
                    // create an image variable and assign the current photo to it
                    var img = document.createElement("img");
                    img.src = 'http://farm' + info.farm + '.static.flickr.com/' + info.server + '/' + info.id + '_' + info.secret + '_m.jpg';
                    // This line is to be changed. For now, it puts the image in the results div.            
                    $(img).appendTo("#results");
                    check = 0;
                }
            });
        }
    });
    return check;
}
function findval(radform) {
    // This function finds the value of the checked radio button in a given form. returns false if no checked button.
    var i;
    for (i = 0; i < radform.length; i++) {
        if (radform[i].checked) {
            return parseInt(radform[i].value);
        }
    }
    return 0;
}
function end() {
    var check = 1;
    var sport = document.forms[0];
    var tech = document.forms[1];
    var art = document.forms[2];
    var music = document.forms[3];
    var travel = document.forms[4];
    sport = findval(sport);
    tech = findval(tech);
    art = findval(art);
    music = findval(music);
    travel = findval(travel);
    if (sport != 0 && tech != 0 && art != 0 && music != 0 && travel != 0) {
        document.getElementById("results").innerHTML = "";
        sport = sport - 3;
        tech = tech - 3;
        art = art - 3;
        music = music - 3;
        travel = travel - 3;
        //SPORTS
        var setid = '72157673335326035';
        check = get_photos(setid, sport, check);
        //TECH
        var setid = '72157672309403881';
        check = get_photos(setid, tech, check);
        //ART
        var setid = '72157673335312265';
        check = get_photos(setid, art, check);
        //MUSIC
        var setid = '72157673335318425';
        check = get_photos(setid, music, check);
        //TRAVEL
        var setid = '72157673335302585';
        check = get_photos(setid, travel, check);
        $("#page-header").css("fontSize", 24);
        if (check == 1) {
            document.getElementById("page-header").innerHTML = "What do you even like dude?";
        }
        else {
            document.getElementById("page-header").innerHTML = "Using our super advanced algorithms, we found you some very cool pictures you might like!";
        }
        togquiz();
        toghead();
    }
    else {
        document.getElementById("results").innerHTML = "Please finish the quiz...";
    }
    unload();
}
$(document).ready(function () {
    window.FakeLoader.init();
    togquiz();
    unload();
});
