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
            <div class="header__DarkMode">
                <label class="switch">
                    <input type="checkbox" checked>
                     <span class="slider"></span>
                    </label><br><br>     
            </div>
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
                <a href="#">
                    hello
                </a>

                <!-- tickets -->
                <a href="#">
                    hello
                </a>

                <!-- bookmarked -->
                <a href="#">
                    hello
                </a>

            </section>
        </footer>
    `

    // // now showing -------------------------------------------------------------------------------------------------------------------------------------------
    let nowShowing = document.querySelector(".nowShowing__movies")

    nowplayingData.forEach(function (movie) {

        nowShowing.innerHTML = nowShowing.innerHTML + `
        <a href="detail.html?id=${movie.id}">
            <article class="nowShowing__movies__movie">
                <div class="movieImg">
                    <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}" alt="${movie.original_title}">
                </div>
            
                <h3>${movie.title}</h3>

                <p class="movie--rating"> <i class="fa-solid fa-star"></i> ${ratingRemake(movie.vote_average.toString().slice(0, 3))}/10 IMDb</p>
            </article>
        </a>
        `
    });

    // populare ----------------------------------------------------------------------------------------------------------------------------------------------
    let populare = document.querySelector(".populare__movies")

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

    let darkModeSwitch = document.querySelector(".header__DarkMode")
    console.log(darkModeSwitch);

    darkModeSwitch.addEventListener("click", switchDark);

};

// rating remake -------------------------------------------------------------
function ratingRemake(rating) {
    if (rating.includes(0)) {
        return rating.slice(0, 1)
    } else {
        return rating;
    }
}

function switchDark() {
    const faSwitch = this.querySelector(".fa-solid")
    
    if (faSwitch.classList.contains("fa-toggle-off")) {
        faSwitch.classList.remove("fa-toggle-off")
        faSwitch.classList.add("fa-toggle-on")
        
    } else if (faSwitch.classList.contains("fa-toggle-on")) {
        faSwitch.classList.remove("fa-toggle-on")
        faSwitch.classList.add("fa-toggle-off")
    }

}