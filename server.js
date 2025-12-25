const express = require('express');
const ytdl = require('yt-dlp-exec');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Facebook Video Downloader API (yt-dlp)',
        endpoints: {
            downloadVideo: 'POST /download-video',
            getVideoInfo: 'POST /get-video-info'
        }
    });
});

// Get video info without downloading
app.post('/get-video-info', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required'
            });
        }

        console.log('Getting info for:', url);

        const info = await ytdl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            format: 'best'
        });

        res.json({
            success: true,
            data: {
                title: info.title || 'Facebook Video',
                thumbnail: info.thumbnail,
                duration: info.duration,
                downloadUrl: info.url,
                width: info.width,
                height: info.height,
                ext: info.ext
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get direct download URL
app.post('/download-video', async (req, res) => {
    try {
        const { url, quality = 'best' } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required'
            });
        }

        console.log('Processing:', url);

        const info = await ytdl(url, {
            dumpSingleJson: true,
            format: quality,
            noCheckCertificates: true,
            noWarnings: true,
        });

        res.json({
            success: true,
            data: {
                title: info.title || 'Facebook Video',
                downloadUrl: info.url,
                thumbnail: info.thumbnail,
                filesize: info.filesize,
                ext: info.ext,
                resolution: `${info.width}x${info.height}`
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 Test it at: http://localhost:${PORT}`);
    console.log(`📦 Using yt-dlp for video downloads`);
});