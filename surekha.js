"use strict";

var api_key = "130c3a4014d7163138ae0479f37b2453";
var uri = "https://api.themoviedb.org/3/";

window.addEventListener("load", function(){
    document.getElementById("searchMovieLink").addEventListener("click", function(e){
        document.getElementById("searchMovieForm").style.display = 'block';
        e.preventDefault();
    });
    document.getElementById("searchMovieButton").addEventListener("click", function(){
        var moviename = document.getElementById("moviename").value;
        var xhr = new XMLHttpRequest();
        xhr.open("get", uri + "search/movie?api_key=" + api_key + "&query="+moviename, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                var movies = JSON.parse(xhr.responseText).results;
                var html = "<div class='movies'>";
                for(var i=0; i<movies.length; i++){
                    var movie = movies[i];
                    html += "<div class='movie'>";
                    html += "<div>" + movie.original_title + "</div>";
                    html += "<img src='" + "https://image.tmdb.org/t/p/w200/" + movie.poster_path +"'><img>";
                    html += "<div>" + movie.release_date + "</div>"
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