async function fetchUrl() {
    try {
        let promise = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }
        });
        console.log(promise);

        let jsonData = await promise.json();
        console.log(jsonData);
        

        htmlInserter(jsonData)

    } catch (error) {

    }
}

fetchUrl()

const root = document.querySelector("#root");
console.log(root)

function htmlInserter(data) {
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

    // now showing -------------------------------------------------------------------------------------------------------------------------------------------
    let nowShowing = document.querySelector(".nowShowing")
    console.log(nowShowing);
    
    data.results.forEach(function () {
        nowShowing.innerHTML = `
            <article>
                
            </article>
        `       
    });
    





    // populare ----------------------------------------------------------------------------------------------------------------------------------------------
    let populare = document.querySelector(".populare")
    console.log(populare);
};