
        // Function to get a random movie ID between 1 and 500 (you can adjust the range as needed)
        function getRandomMovieID() {
            return Math.floor(Math.random() * 500) + 1;
        }

        // Function to truncate the movie title if it exceeds the specified length
        function truncateTitle(title, maxLength) {
            return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
        }

        // Function to fetch movie data and update the HTML with the movie details
        function fetchAndDisplayMovie(movieID) {
            fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=e375552106d68665bd174f45bc2d03af`)
                .then(response => response.json())
                .then(data => {
                    const movieName = truncateTitle(data.title, 10); // Truncate the title if necessary
                    const moviePoster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
                    const movieRating = data.vote_average;
                    const movieDuration = data.runtime;
                    const movieYear = data.release_date.split('-')[0];
                    const trailerLink = getYouTubeTrailerLink(data);

                    // Create a new movie card element
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');
                    cardDiv.innerHTML = `
                        <div class="title">
                            <h3 id="movie_name">${movieName}</h3>
                            <div id="rating">
                                <i class="fa-solid fa-star" style="color: #FEEA35;"></i>
                                <b style="color: #FEEA35">${movieRating}</b>
                            </div>
                        </div>
                        <div class="poster">
                            <img src="${moviePoster}">
                        </div>
                        <div class="low">
                            <div class="dateMovie">
                                <div class="time">
                                    <img src="/src/images/Vector.png">
                                    <a id="timer">${movieDuration} minutos</a>
                                </div>
                                <div class="date">
                                    <img src="/src/images/CalendarBlank.png" >
                                    <a id="dates">${movieYear}</a>
                                </div>
                            </div>
                            <div class="button">
                                <a href="${trailerLink}" target="_blank"><img src="/src/images/Botão 2.png"></a>
                            </div>
                        </div>
                    `;

                    // Add the movie card to the "cards" container
                    const cardsContainer = document.getElementById('cards');
                    cardsContainer.appendChild(cardDiv);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao obter os dados da API:', error);
                });
        }

        // Function to get the YouTube trailer link based on movie data
        function getYouTubeTrailerLink(data) {
            // The movie data may contain multiple videos (including trailers)
            // Here, we will find the video with type "Trailer" (if available) and return its YouTube link
            const videos = data.videos?.results || [];
            for (const video of videos) {
                if (video.type === 'Trailer' && video.site === 'YouTube') {
                    return `https://www.youtube.com/watch?v=${video.key}`;
                }
            }

            // If no "Trailer" video is found, return a link to the movie's homepage on TMDB
            return `https://www.themoviedb.org/movie/${data.id}`;
        }

        // Fetch and display three random movies
        for (let i = 0; i < 3; i++) {
            const randomMovieID = getRandomMovieID();
            fetchAndDisplayMovie(randomMovieID);
        }