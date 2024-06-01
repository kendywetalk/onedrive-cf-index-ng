import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  const domain = 'k.car';
  const apiConfig = 'd27d952f88';
  const apiUrl = `https://${domain}/yourls-api.php?signature=${apiConfig}&action=shorturl`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        url,
        format: 'simple',
      },
    });

    if (response.status === 200 && !response.data.includes('Error: database query failed')) {
      return res.status(200).json({ shortUrl: response.data });
    } else {
      return res.status(500).json({ message: 'Error shortening URL' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error shortening URL', error: error.message });
  }
}
