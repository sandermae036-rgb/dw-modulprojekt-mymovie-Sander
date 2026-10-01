console.log("script started");

let movieId = new URLSearchParams(location.search).get("id");
console.log(movieId);


async function idFetch(id) {
    try {
        // fetching id from url ---------------------------------------------------------------------------
        const IdPromise = await fetch("https://api.themoviedb.org/3/movie/" + id + "?language=en-US", {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });

         // genres fetch -----------------------------------------------------------------
        let genrePromise = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });



        // turn it into json --------------------------------------------------------------
        let movieJson = await IdPromise.json()
        console.log(movieJson);

        // get the genre json--------------------------------------------------------------
        let genreJsonData = await genrePromise.json();
        console.log(genreJsonData);



        // call inset html function with the fetched data as an augment
        htmlInserter(movieJson, genreJsonData.genres)

    } catch (error) {

    }
}

idFetch(movieId)


const root = document.querySelector("#root");

// html inserter -----------------------------------------------------------------------------------------
function htmlInserter(movieJson, genreJsonData) {

    root.innerHTML = `
        <!-- header ------------------------------------------------------------------------------------------>
        <header>
            
            <!-- back arrow -->
            <a href="index.html">
                <i class="fa-solid fa-arrow-left"></i>
            </a>

            <!-- darkmode switch -->

            <!-- trailer -->
            <!-- <div></div> -->
        </header>

        <!-- main -------------------------------------------------------------------------------------->
        <main>
            <section class="generelInfo">
                <h1>${movieJson.title}</h1>

                <div class="generelInfo__bookmark">
                    <i class="fa-regular fa-bookmark"></i>
                </div>

                <p class="generelInfo__rating">${ratingRemake(movieJson.vote_average.toString().slice(0, 3))}/10 IMDb</p>

                <ul class="generalInfo__genres">
                   ${movieJson.genres.map(function (genre) {
                    return (`
                        <li>${genre.name}</li>
                    `)}).join(" ")}
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

function runeTimeConverter(runtime) {

    let minutesConverted = runtime / 60
    console.log(minutesConverted);
    
    // hours -------------------------------------------
    let hours = minutesConverted.toString().slice(0,1)
    console.log(hours);
    
    let minutesNotSliced = minutesConverted.toString().slice(2,4) * 60;
    console.log(minutesNotSliced)

    let minutes = minutesNotSliced.toString().slice(0,2)

    return (hours + "h " + minutes + "m");
    
};