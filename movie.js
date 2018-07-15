"use strict";

var api_key = "130c3a4014d7163138ae0479f37b2453";
var uri = "https://api.themoviedb.org/3/";
var authentication_url = "https://www.themoviedb.org/authenticate/";
var session_url = "https://api.themoviedb.org/3/authentication/session/new";
var image_url = "https://image.tmdb.org/t/p/w200/";
var request_token = null;
var session_id = null;

window.addMovie = function(id){
    document.getElementById("movieList").appendChild(document.getElementById(id));
}

window.addEventListener("load", function () {
    var currentURL = window.location.href;
    var approved = new URL(currentURL).searchParams.get("approved");
    request_token = new URL(currentURL).searchParams.get("request_token");
    if(approved == 'true'){
        document.getElementById("loginForm").style.display = 'none';
        document.getElementById("main").style.display = 'block';    
        var xhr = new XMLHttpRequest();
        xhr.open("get", session_url + "?api_key=" + api_key+"&request_token="+request_token, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var session_id = JSON.parse(xhr.responseText).session_id;
            }
        }
        xhr.send();
    }else{
        document.getElementById("loginForm").style.display = 'block';
        document.getElementById("main").style.display = 'none';
    }

    document.getElementById("logoutLink").addEventListener("click", function(){
        document.getElementById("loginForm").style.display = 'block';
        document.getElementById("main").style.display = 'none';
    });

    document.getElementById("loginButton").addEventListener("click", function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", uri + "authentication/token/new?api_key=" + api_key, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                request_token = JSON.parse(xhr.responseText).request_token;
                document.getElementById("loginLink").href = authentication_url + request_token + "?redirect_to=http://127.0.0.1:8080";
                document.getElementById("loginLink").style.display = 'inline';
            }
        }
        xhr.send();
        e.preventDefault();
    });

    document.getElementById("searchMovieLink").addEventListener("click", function (e) {
        document.getElementById("searchMovieForm").style.display = 'block';
        document.getElementById("movieList").style.display = 'none';
        e.preventDefault();
    });

    document.getElementById("movieListLink").addEventListener("click", function (e) {
        document.getElementById("searchMovieForm").style.display = 'none';
        document.getElementById("searchMovieResults").style.display = 'none';
        document.getElementById("movieList").style.display = 'block';
        e.preventDefault();
    });

    document.getElementById("searchMovieButton").addEventListener("click", function () {
        var moviename = document.getElementById("moviename").value;
        var xhr = new XMLHttpRequest();
        xhr.open("get", uri + "search/movie?api_key=" + api_key + "&query=" + moviename, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var movies = JSON.parse(xhr.responseText).results;
                var html = "<div class='movies'>";
                for (var i = 0; i < movies.length; i++) {
                    var movie = movies[i];
                    html += "<div class='movie' id='"+ movie.id +"'>";
                    html += "<div>" + movie.original_title + "</div>";
                    html += "<img src='" + image_url + movie.poster_path + "'><img>";
                    html += "<div>" + movie.release_date + "</div>"
                    html += "<div><button onClick='addMovie("+movie.id+")'>Add to Favourites</button></div>"
                    html += "</div>"
                }
                html += "</div>";
                document.getElementById('searchMovieResults').innerHTML = html;
                document.getElementById("searchMovieResults").style.display = "block";
            }
        }
        xhr.send();
    });
});