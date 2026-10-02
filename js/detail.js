console.log("script started");

let movieId = new URLSearchParams(location.search).get("id");
console.log(movieId);


async function idFetch(id) {
    try {
        // fetching id from url ---------------------------------------------------------------------------
        const IdPromise = await fetch("https://api.themoviedb.org/3/movie/" + id + "?append_to_response=videos,credits", {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });

        // turn it into json --------------------------------------------------------------
        let movieJson = await IdPromise.json()
        console.log(movieJson);

        // call inset html function with the fetched data as an augment
        htmlInserter(movieJson)

    } catch (error) {

    }
}

idFetch(movieId)


const root = document.querySelector("#root");

// html inserter -----------------------------------------------------------------------------------------
function htmlInserter(movieJson) {

    root.innerHTML = `
        <!-- header ------------------------------------------------------------------------------------------>
        <header>
            
            <!-- back arrow -->
            <a href="index.html">
                <i class="fa-solid fa-arrow-left"></i>
            </a>

            <!-- darkmode switch -->
            <input type="checkbox">

            <!-- trailer -->
            <div>
                <iframe src="https://www.youtube.com/embed/${trailerFinder(movieJson.videos.results)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
           
        </header>

        <!-- main -------------------------------------------------------------------------------------->
        <main>
            <section class="generelInfo">
                <div class="headline">
                    <h1>${movieJson.title}</h1>

                    <div class="generelInfo__bookmark">
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>

                <p class="generelInfo__rating"> <i class="fa-solid fa-star"></i> ${ratingRemake(movieJson.vote_average.toString().slice(0, 3))}/10 IMDb</p>

                <ul class="generalInfo__genres">
                   ${movieJson.genres.map(function (genre) {
        return (`
                            <li>${genre.name}</li>
                        `)
    }).join(" ")}
                </ul>

                <table>
                    <tr>
                        <th>length</th>

                        <th>Language</th>

                        <th>rating</th>
                    </tr>
                    
                    <tr>
                        <td>${runeTimeConverter(movieJson.runtime)}</td>

                        <td>${movieJson.spoken_languages.map(function (test) {
        return (test.english_name)
    }).join(" ")}</td>
                    
                        <td>
                            ${"PG-13"}
                        </td>
                    </tr> 
                </table>
            </section>

            <section class="description">
                <h2 id="merryweather">
                    Description
                </h2>

                <p>${movieJson.overview}</p>
            </section>

            <section class="cast">
                <div>
                    <h2>
                        Cast
                    </h2>

                    <!-- button see more -->
                </div>

                <section>
                    <ul>
                        ${movieJson.credits.cast.map(function (castPerson) {
                            return (`
                            <li>
                                <article>
                                    <div>
                                        <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${castPerson.profile_path}">
                                    </div>

                                    <h3>${castPerson.name}</h3>
                                </article>
                            </li>
                            `)}).join(" ")}
                    </ul>
                </section>
            </section>
        </main>
        
        <!-- footer ------------------------------------------------------------------------------------->
        <footer>

        </footer>
    `

}

// rating remake -------------------------------------------------------------
function ratingRemake(rating) {
    if (rating.includes(0)) {
        return rating.slice(0, 1)
    } else {
        return rating;
    }
}

// film length converter
function runeTimeConverter(runtime) {

    let minutesConverted = runtime / 60
    console.log(minutesConverted);

    // hours -------------------------------------------
    let hours = minutesConverted.toString().slice(0, 1)
    console.log(hours);

    let minutesNotSliced = minutesConverted.toString().slice(2, 4) * 60;
    console.log(minutesNotSliced)

    let minutes = minutesNotSliced.toString().slice(0, 2)

    return (hours + "h " + minutes + "m");

};


// trailer finder 
function trailerFinder(videos) {

    let firstTrailer = videos.find(video => video.type == "Trailer");

    console.log(firstTrailer.key);


    return (firstTrailer.key)


}