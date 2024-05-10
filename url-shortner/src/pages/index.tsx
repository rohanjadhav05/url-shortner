import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isData, setIsData] = useState(false);

  return (
    <div id = 'home' style={{display:"flex", justifyContent:"center"}}>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom style={{margin:50}}>
        URL - Shortner Project in Next JS
      </Typography>
      <TextField id="standard-basic" size="medium" fullWidth label="Enter a Long Url" variant="standard" style={{margin:20}}
        onChange={(e) => {
          setUrl(e.target.value)
        }}/>
      <Button variant="contained" color="primary" fullWidth style={{margin:20}} onClick={async() => {
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
              setIsData(true);
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
        isData &&
        <Typography variant="h5" align="center" style={{paddingTop : 20}}>
        Shortened Url : `{shortUrl}`
      </Typography>

      }
    </Container>
    </div>
  );
}
