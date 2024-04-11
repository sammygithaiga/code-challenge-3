
document.addEventListener('DOMContentLoaded', () => {
    
    const movieList = document.getElementById('films');
    
    let movieData = [];
    
    function fetchMoviesFromDB() {
        //  fetches movie data from a file named 'db.json'.
        fetch('db.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error fetching movies from db.json');
                }
                
                return res.json();
            })
            .then(data => {
                movieData = data.films;
                // call the 'displayMovies' function which shows the movies on the webpage.
                displayMovies();
            })
            .catch(error => {
                console.error('Error fetching movies from db.json:', error);
                showErrorMessage('Error loading movie data');
            });
    }

    function displayMovies() {
        // displays the list of movies on the webpage.
        movieData.forEach(movie => {
          
            const li = createMovieListItem(movie);
            // Append the  items to the movieList element on the webpage.
            movieList.appendChild(li);
        });
    }

    function createMovieListItem(movie) {
        //  creates a list item element for a movie.
        const li = document.createElement('li');
        
        li.textContent = movie.title;
        li.dataset.movieId = movie.id;
        li.classList.add('film', 'item');
        // Add  click event listener to the list item to show details about the movies
        li.addEventListener('click', () => updateMovieDetails(movie.id));
        return li;
    }

    function updateMovieDetails(movieId) {
        //  updates the movie details section when a movie is clicked.
        const movie = movieData.find(m => m.id === movieId)
        if (!movie) return;

        //  number of available tickets for the movie.
        const availableTickets = movie.capacity - movie.tickets_sold;
        const buyTicketButton = document.getElementById('buy-ticket');
        buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';
        buyTicketButton.classList.toggle('disabled', availableTickets === 0);
        // Add an event listener to the 'buy-ticket' button for the ticket purchases.
        buyTicketButton.onclick = () => {
            if (availableTickets > 0) {
                buyTicket(movie);
            }
        };

        
        displayMovieDetails(movie);
    }

    function buyTicket(movie) {
       
        movie.tickets_sold++;
        // Update and impliments ticket count display on the webpage.
        updateTicketCount(movie.id);
        updateMovieDetails(movie.id);
    }

    function updateTicketCount(movieId) {
        //  updates the displayed number of available tickets for a movie.
        const movie = movieData.find(m => m.id === movieId);
        // Calculate  number of the available tickets for the movie.
        const availableTickets = movie.capacity - movie.tickets_sold;
        // Update  ticket count display on the webpage.
        document.getElementById('ticket-num').textContent = availableTickets;
    }

    function displayMovieDetails(movie) {
        //  display details about a movie in the movie details section on the webpage.
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('showtime').textContent = movie.showtime;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('poster').alt = `Poster for ${movie.title}`;
        // Update  ticket count display for the movies.
        updateTicketCount(movie.id);
    }

    function showErrorMessage(message) {
        // display an error message on the webpage.
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.classList.add('ui', 'negative', 'message');
        document.body.appendChild(errorMessage);
        // Set a timeout to remove the error message after 5 seconds.
        setTimeout(() => errorMessage.remove(), 5000);
    }

    // Call the fetchMoviesFromDB function to fetch movie data 
    fetchMoviesFromDB();
});
	
