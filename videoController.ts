protected GetReadVideoStream = async () => {
                const range = request.headers.range;
                if (!range || typeof range == "undefined") {
                    return h.response("Requires Range header");
                }
                
                const videoPath = "public/test.mp4";
                const videoSize = fs.statSync(videoPath).size;
                
                // Parse Range
                // Example: "bytes=32324-"
                const CHUNK_SIZE = 10 ** 6; // 1MB
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

                // Create headers
                const videoStream = fs.createReadStream(videoPath);
                return h.response(videoStream)
                .type('text/event-stream')
                .header('Content-Range', `bytes ${start}-${end}/${videoSize}`)
                .header("Accept-Ranges", "bytes")
                .header("Content-Length", videoSize)
                .header("Content-Type", "video/mp4")
 }
