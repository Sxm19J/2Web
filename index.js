const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
