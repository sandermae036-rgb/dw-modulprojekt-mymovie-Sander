console.log("script started");

async function idFetch () {
    const moviepromise = await fetch("https://api.themoviedb.org/3/account/" + 1423191, {
    headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTdkM2UyMDZjMTViZDNkZTQwOWQ5OGIwOGQ3ZWM4OCIsIm5iZiI6MTc5MDYwNDcxMC41MjEsInN1YiI6IjZhYmE3NWE2OTI0Y2Q0OTRkYTg2MmRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._YYeSxMiIYrASs_Hk2Cu_nIU8AFii-Eabd-T9XzLn1g'
            }});
    
    let movieJson = moviepromise.json();
            console.log(movieJson);
            
}
