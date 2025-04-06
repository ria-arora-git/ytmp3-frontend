import React, { useState } from 'react';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!url) return;

    setDownloading(true);
    setError('');

    try {
        const res = await fetch(`https://ytmp3-production-e94c.up.railway.app/download?url=${encodeURIComponent(url)}`);


          


      if (!res.ok) throw new Error('Download failed. Please check the URL.');

      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'audio.mp3';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="downloader" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>YouTube to MP3 Downloader</h2>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button type="submit" disabled={downloading} style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>
          {downloading ? 'Downloading...' : 'Download MP3'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default Downloader;
