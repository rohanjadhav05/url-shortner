import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [url, setUrl] = useState('');
  const [surl, setSUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [islong, setIsLong] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [longUrl, setLongUrl] = useState('');

  return (
    <div id='home' style={{justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <Typography variant="h4" align="center" gutterBottom style={{ margin: 50 }}>
    URL - Shortner Project in Next JS
  </Typography>
  <div style={{ display: 'flex', width: '100%' }}>
    <div style={{ flex: 1, justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <TextField id="standard-basic" size="medium" fullWidth label="Enter a Long Url" variant="standard" style={{ margin: 20 }}
          onChange={(e) => {
            setUrl(e.target.value)
          }} />
        <Button variant="contained" color="primary" fullWidth style={{ margin: 20 }} onClick={async () => {
          try {
            const response = await fetch('/api/hello', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(url),
            });
            if (response.ok) {
              const jsonData = await response.json();
              console.log(jsonData);
              setShortUrl(jsonData.name);
              setIsShort(true);
            } else {
              throw new Error('Failed to fetch data');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          };
        }}>
          Shorten Url
        </Button>
        {
          isShort &&
          <Typography variant="h5" align="center" style={{ paddingTop: 20 }}>
            Shortened Url : `{shortUrl}`
          </Typography>
        }
      </Container>
    </div>
    <div style={{ flex: 1, justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <TextField id="standard-basic" size="medium" fullWidth label="Have a short Url" variant="standard" style={{ margin: 20 }}
          onChange={(e) => {
            setSUrl(e.target.value)
          }} />

      <Button variant="contained" color="primary" fullWidth style={{ margin: 20 }} onClick={async () => {
          try {
            console.log("buttonClick");
            const response = await fetch(`/api/hello?surl=${surl}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              const jsonData = await response.json();
              console.log(jsonData);
              setLongUrl(jsonData.name.long_url);
              setIsLong(true);
            } else {
              throw new Error('Failed to fetch data');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          };
        }}>
          Get Orginial Url
        </Button>
        {
          islong &&
          <Typography variant="h5" align="center" style={{ paddingTop: 20 }}>
            Orginal Url : `{longUrl}`
          </Typography>
        }
      </Container>
    </div>
  </div>
</div>
  );
}
