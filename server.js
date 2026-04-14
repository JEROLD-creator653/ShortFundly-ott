const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const PUBLIC_DIR = path.join(__dirname, 'web.shortfundly.com');

const MOCK_DATABASE = {
  latestReleases: [
    { id: '1', title: "Thedal Tamil Thriller", isPremium: true, type: "NEW", img: "https://cdn.jwplayer.com/v2/images/iJKHNZKc.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { id: '2', title: "Wishes of the BlindBirds", isPremium: true, img: "https://cdn.jwplayer.com/v2/images/Rv21Qa0t.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { id: '3', title: "Creep", isPremium: true, img: "https://img.jwplayer.com/v1/images/L2CoCY7S.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { id: '4', title: "Shaheed (Martyrs)", isPremium: true, img: "https://cdn.jwplayer.com/v2/images/jUqYh9qk.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: '5', title: "The False Flag", type: "FREE", img: "https://cdn.jwplayer.com/v2/images/tk3YqWEx.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
  ],
  trendingNow: [
    { id: '6', title: "Papa My Hero", isPremium: true, img: "https://img.jwplayer.com/v1/images/3Ru5Dl7o.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { id: '7', title: "Maunam", isPremium: true, type: "NEW", img: "https://img.jwplayer.com/v1/images/c85GdmFf.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { id: '8', title: "Silent Voices", type: "FREE", img: "https://img.jwplayer.com/v1/images/mhCh4Qen.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { id: '9', title: "Beyond the Veil", isPremium: true, img: "https://img.jwplayer.com/v1/images/iFEG7ypb.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { id: '10',title: "Fading Light", type: "FREE", img: "https://img.jwplayer.com/v1/images/kJdzYDCm.jpg", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" }
  ]
};

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'application/font-woff',
  '.woff2': 'font/woff2',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain',
  '.m3u8': 'application/vnd.apple.mpegurl',
  '.ts': 'video/mp2t'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  if (pathname === '/api/movies') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    return res.end(JSON.stringify(MOCK_DATABASE));
  }
  
  // Intercept Next.js Image Optimization requests
  if (pathname === '/_next/image') {
    const targetUrl = parsedUrl.query.url;
    if (targetUrl) {
      // Decode the encoded URL and 302 redirect the browser to fetch the raw image directly
      // This completely bypasses the missing Next.js image optimization engine
      res.writeHead(302, { Location: targetUrl });
      return res.end();
    }
  }

  // Handle standard static files
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  
  let absolutePath = path.join(PUBLIC_DIR, safePath);

  // Next.js static routing fallback
  const isRscRequest = req.headers['rsc'] === '1' || (parsedUrl.query && parsedUrl.query._rsc);
  const acceptHeader = req.headers['accept'] || '';
  const isNavigation = acceptHeader.includes('text/html');

  if (!fs.existsSync(absolutePath)) {
     if (fs.existsSync(absolutePath + '.html')) {
         if (isNavigation && !isRscRequest) {
             absolutePath = path.join(PUBLIC_DIR, 'index.html');
         } else {
             absolutePath += '.html';
         }
     } else {
         if (isNavigation && !isRscRequest) {
             absolutePath = path.join(PUBLIC_DIR, 'index.html');
         } else {
             res.writeHead(404);
             return res.end("Not Found");
         }
     }
  }

  if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isDirectory()) {
    absolutePath = path.join(absolutePath, 'index.html');
  }

  if (fs.existsSync(absolutePath)) {
    const ext = path.parse(absolutePath).ext;
    let contentType = mimeTypes[ext] || 'text/plain';
    
    if (isRscRequest && ext === '.html') {
        contentType = 'text/x-component';
    }
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    
    if (isRscRequest && ext === '.html') {
        const baseName = absolutePath.replace(/\.html$/, '');
        let chunks = [];
        if (fs.existsSync(baseName + '.html')) chunks.push(baseName + '.html');
        
        let i = 1;
        while (fs.existsSync(`${baseName} (${i}).html`)) {
            chunks.push(`${baseName} (${i}).html`);
            i++;
        }
        
        if (chunks.length > 0) {
            chunks.forEach(chunkPath => {
                res.write(fs.readFileSync(chunkPath));
            });
            return res.end();
        }
    }
    
    const stream = fs.createReadStream(absolutePath);
    stream.pipe(res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Smart static proxy server started on http://localhost:${PORT}`);
});
