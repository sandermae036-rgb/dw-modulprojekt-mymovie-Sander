const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing";

const poupulareUrl = "https://api.themoviedb.org/3/movie/popular";

const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";

async function MovieListFetch(nsUrl, pUrl, gUrl) {
    try {
        // now showing fetch ---------------------------------------------------------
        let NowPlayingPromise = await fetch(nsUrl, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });


        // popular fecth ------------------------------------------------------------
        let popularPromise = await fetch(pUrl, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });


        // genres fetch -----------------------------------------------------------------
        let genrePromise = await fetch(gUrl, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });

        console.log(genrePromise);
        


        // get the json of now playing -------------------------------------------------
        let nowPlayingJsonData = await NowPlayingPromise.json();
        console.log(nowPlayingJsonData);

        // get the json of popular ------------------------------------------------------
        let popularJsonData = await popularPromise.json();
        console.log(popularJsonData);

        // get the genre json
        let genreJsonData = await genrePromise.json();
        console.log(genreJsonData);


        // inset both data in html ------------------------------------------------------
        htmlInserter(nowPlayingJsonData.results, popularJsonData.results, genreJsonData)

    } catch (error) {

    }

}

MovieListFetch(nowPlayingUrl, poupulareUrl, genreUrl)



const root = document.querySelector("#root");
console.log(root)

function htmlInserter(nowplayingData, popularData, genreData) {

    console.log(genreData.genres);
    

    root.innerHTML = `
        <!-- header ------------------------------------------------------------------------------------------>
        <header>
            <!-- headline -->
            <h1>
                MyMovies
            </h1>

            <!-- Darkmode button -->
            <!-- <div class="header__DarkMode">
                    <i class="fa-solid fa-toggle-off"></i>
                </div> -->
        </header>

        <!-- main -------------------------------------------------------------------------------------->
        <main>

            <!-- now Showing ------------------------------------------>
            <section class="nowShowing">
                <h2>
                    Now Showing
                </h2>

                <section class="nowShowing__movies">
                    
                    
                </section>

            </section>
            
            <!-- populare ------------------------------------------------>
            <section class="populare">

                <h2>
                    Populare
                </h2>

                <!-- see more btn -->
                <!--  -->

                <section class="populare__movies">
                    
                </section>
            </section>

        </main>
        
        <!-- footer ------------------------------------------------------------------------------------->
        <footer>

            <!-- utility btns ---------------------------------------------->
            <section>

                <!-- films -->
                <a href="">

                </a>

                <!-- tickets -->
                <a href="">

                </a>

                <!-- bookmarked -->
                <a href="">
                    
                </a>

            </section>
        </footer>
    `

    // // now showing -------------------------------------------------------------------------------------------------------------------------------------------
    let nowShowing = document.querySelector(".nowShowing")
    console.log(nowShowing);


    nowplayingData.forEach(function (movie) {

        nowShowing.innerHTML = nowShowing.innerHTML + `
        <a href="detail.html?id=${movie.id}">
            <article class="nowShowing__movies__movie">
                <div class="movieImg">
                    <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}" alt="${movie.original_title}">

                    <h3>${movie.title}</h3>

                    <p class="movie--rating">${ratingRemake(movie.vote_average.toString().slice(0, 3))}/10 IMDb</p>
                </div>
            </article>
        </a>
        `
    });

    // populare ----------------------------------------------------------------------------------------------------------------------------------------------
    let populare = document.querySelector(".populare")

    popularData.forEach(function (movie) {

        populare.innerHTML = populare.innerHTML + `
        <a href="detail.html?id=${movie.id}">
            <article class="populare__movies--movie">

                <div class="movieImg">
                    <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}" alt="${movie.original_title}">
                </div>

                    <h3>${movie.title}</h3>

                    <p class="movie--rating">${ratingRemake(movie.vote_average.toString().slice(0, 3))}/10 IMDb</p>

                    <div class="movie__genre">
                        <ul>
                            ${movie.genre_ids.map(function (id) {
                                // return `<li>${id}</li>`
                                
                                return (`
                                <li>${genreData.genres.find((genre) => genre.id == id).name}</li>
                                <!-- <li>${genreData.genres.find(function (genre) {return genre.id == id}).name}</li> -->
                                `)
                            }).join(" ")}
                        </ul>
                    </div>
            </article>
        </a>
        `

    });
    console.log("test", genreInset(27, genreData));

};

// rating remake -------------------------------------------------------------
function ratingRemake(rating) {
    if (rating.includes(0)) {
        return rating.slice(0, 1)
    } else {
        return rating;
    }
}