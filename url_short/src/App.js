import React, { useState } from 'react';
import { AppBar, Button, Container, TextField, Toolbar, Typography } from '@mui/material';
import './App.css';

function App() {
  const BASE_URL = "http://localhost:3010/api/"
  const [url, setUrl] = useState('');
  const [surl, setSUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLong, setIsLong] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [longUrl, setLongUrl] = useState('');
  const [length, setLength] = useState(0);

  function isValidUrl(url) {
    if(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
      console.log("Validated"); 
    return true;
    }
    else{
      return false;
    }
  }

  const handleShortenUrl = async () => {
    if (url.length === 0) {
      alert('Please enter a URL before submitting.');
    } else if (!isValidUrl(url)) {
      alert('Please enter a valid URL.');
    }else if(length === 0){
      alert("please enter the value of length of URL");
    } 
    else {
      try {
        const data = { url: url, length:length };
        const response = await fetch(BASE_URL + 'shortUrl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const jsonData = await response.json();
          setShortUrl(jsonData.name);
          setIsShort(true);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleGetOriginalUrl = async () => {
    if (surl.length === 0) {
      alert('Please enter a URL before submitting.');
    } else {
      try {
        const response = await fetch(`${BASE_URL}longUrl?surl=${surl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.name === 'no data found') {
            alert('This URL has not been shortened before.');
          } else {
            setLongUrl(jsonData.name);
            setIsLong(true);
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return  (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">URL Shortener Project</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ paddingTop: 50 }}>
          Welcome to our URL Shortener
        </Typography>
        <Container maxWidth="md">
          <div>
            <TextField
              id="standard-basic"
              size="medium"
              fullWidth
              label="Enter the length of URl"
              variant="outlined"
              style={{ margin: '20px 0' }}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <TextField
              id="standard-basic"
              size="medium"
              fullWidth
              label="Enter a Long URL"
              variant="outlined"
              style={{ margin: '20px 0' }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ margin: '0 0 20px 0' }}
              onClick={handleShortenUrl}
            >
              Shorten URL
            </Button>
            {isShort && <Typography variant="h6" align="center" style={{ paddingTop: 20 }}>
              Shortened URL: {shortUrl}
            </Typography>}
          </div>
        </Container>
        <Container maxWidth="md">
          <div>
            <TextField
              id="standard-basic"
              size="medium"
              fullWidth
              label="Enter a Short URL"
              variant="outlined"
              style={{ margin: '20px 0' }}
              value={surl}
              onChange={(e) => setSUrl(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ margin: '0 0 20px 0' }}
              onClick={handleGetOriginalUrl}
            >
              Original URL
            </Button>
            {isLong && <Typography variant="h6" align="center" style={{ paddingTop: 20 }}>
              Original URL: {longUrl}
            </Typography>}
          </div>
        </Container>
      </div>
      <footer style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#f0f0f0', width: '100%' }}>
        <Typography variant="body2" color="textSecondary">
          Follow us on{' '}
          <a href="https://www.linkedin.com/in/rohan-jadhav-0511s/">LinkedIn</a>, {' '}
          <a href="https://github.com/rohanjadhav05">GitHub</a>, and{' '}
          <a href="https://twitter.com/mrrj0511">Twitter</a>. For inquiries, contact us at{' '}
          <a href="mailto:rohan.jadhav511@gmail.com">Mail</a>.
        </Typography>
      </footer>
    </div>
  );
}

export default App;
