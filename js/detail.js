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
        let genrePromise = await fetch(gUrl, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });



        // turn it into json --------------------------------------------------------------
        let movieJson = await IdPromise.json()
        console.log(movieJson);

        // get the genre json
        let genreJsonData = await genrePromise.json();
        console.log(genreJsonData);



        // call inset html function with the fetched data as an augment
        htmlInserter(movieJson, genreJsonData)

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

                <div class="generelInfo--bookmark">
                    <i class="fa-regular fa-bookmark"></i>
                </div>

                <p class="generelInfo--rating">${ratingRemake(movieJson.vote_average.toString().slice(0, 3))}/10 IMDb</p>

                <ul>
                   ${movieJson.genres.map(function (id) {
                                // return `<li>${id}</li>`
                                
                                return (`
                                <li>${genreJsonData.genres.find((genre) => genre.id == id).name}</li>
                                `)
                            }).join(" ")}
                </ul>
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