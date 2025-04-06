import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert('Please enter a YouTube URL');
    setDownloading(true);

    try {
      const response = await fetch(`http://localhost:3000/download?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'audio.mp3';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert('Error downloading the MP3');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube to MP3 Converter 🎵</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload} disabled={downloading}>
        {downloading ? 'Downloading...' : 'Download MP3'}
      </button>
    </div>
  );
}

export default App;
