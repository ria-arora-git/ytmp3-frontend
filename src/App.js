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
   <div className="min-h-screen w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">
      {/* Navbar */}
      <nav className=" bg-purple-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">MP3 Converter</h1>
          <ul className="flex space-x-10">
            <li>
              <button className="text-white hover:text-gray-200 focus:outline-none">Home</button>
            </li>
            <li>
              <a 
                href="mailto:rubycodes.dev@gmail.com" 
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                Suggest
              </a>
            </li>

          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 ">
        <h1 className="text-6xl font-semibold mb-8 text-center">YouTube to MP3 Converter 🎵</h1>
        
        <div className="bg-white backdrop-blur-md p-8 rounded-xl shadow-lg max-w-lg w-full">
          <h2 className="text-3xl font-semibold text-center mb-5 text-indigo-600">Enter YouTube URL</h2>

          {/* Input and Button */}
          <form onSubmit={handleDownload} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter YouTube URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-black outline-none border-2 border-gray-300 rounded-md p-3 w-full mb-5 focus:ring-2 focus:ring-purple-500 text-center"
            />
            <button
              type="submit"
              onClick={handleDownload} 
              disabled={downloading}
              className="bg-indigo-500 text-white rounded-md p-3 w-2/3 sm:w-1/2 hover:bg-blue-600 transition duration-300"
            >
              {downloading ? 'Downloading...' : 'Download MP3'}
            </button>
          </form>

          
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 bg-purple-600 p-4 text-center text-white w-full flex justify-center items-center gap-2">
        <p>&copy; 2025 MP3 Converter | </p>
        <p><a href="https://www.linkedin.com/in/ria-arora-9a91a6317/" className='underline'>Made by Ria </a></p>

        
      </footer>
    </div> 
  );
}

export default App;


