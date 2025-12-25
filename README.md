# Facebook Video Downloader API

API for downloading Facebook videos using yt-dlp.

## Endpoints

- `GET /` - Health check
- `POST /get-video-info` - Get video information
- `POST /download-video` - Get video download URL

## Usage

```bash
# Get video info
curl -X POST https://your-api-url/get-video-info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://facebook.com/video-url"}'

# Get download URL
curl -X POST https://your-api-url/download-video \
  -H "Content-Type: application/json" \
  -d '{"url":"https://facebook.com/video-url"}'
```

## Deployment

Deployed on Coolify with Docker.