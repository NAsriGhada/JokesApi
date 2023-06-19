const express = require("express");
const jokes = require("./jokes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// get all jokes
app.get("/jokes", (req, res) => {
  res.send(jokes);
});

// get one random joke
app.get("/random/jokes", (req, res) => {
  try {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.send(randomJoke);
  } catch (error) {
    res.status(400).json(error);
  }
});

// get a random set of jokes
app.get("/jokes/random", (req, res) => {
  const randomJokes = [];
  const numberOfJokes = 5; // Change this value to adjust the number of random jokes to generate
  // Generate random jokes
  for (let i = 0; i < numberOfJokes; i++) {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    randomJokes.push(jokes[randomIndex]);
  }

  res.json(randomJokes);
});


// get jokes by id
app.get("/joke/:jokeId", (req, res) => {
  const { jokeId } = req.params;
  try {
    const joke = jokes.find((joke) => joke.id === Number(jokeId));
    res.send(joke);
  } catch (error) {
    res.status(400).json(error);
  }
});

// get jokes by category
app.get("/jokes/:category", (req, res) => {
  const { category } = req.params;
  try {
    const jokesByCategory = jokes.filter((joke) => joke.category === category);

    if (jokesByCategory.length > 0) {
      res.json(jokesByCategory);
    } else {
      res
        .status(404)
        .json({ error: "No jokes found in the specified category" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
