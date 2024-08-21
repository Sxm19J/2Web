const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form method="POST" action="/bypass">
          <label for="url">Enter URL to Bypass:</label>
          <input type="text" id="url" name="url" required>
          <button type="submit">Bypass</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/bypass', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('No URL provided.');
  }

  try {
    // Bypass the link using the bypass.vip API
    const apiUrl = `https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === 'success') {
      const result = data.result;
      res.send(`
        <html>
          <body>
            <h1>Original Link:</h1>
            <a href="${result}" target="_blank">${result}</a>
            <br>
            <a href="/">Back</a>
          </body>
        </html>
      `);
    } else {
      res.status(400).send('Failed to bypass the link.');
    }
  } catch (error) {
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
