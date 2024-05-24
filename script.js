function loadVideo() {
    const url = document.getElementById('youtube-url').value;
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
        const iframe = document.getElementById('youtube-frame');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
    } else {
        alert('Invalid YouTube URL');
    }
}

function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?\?v=|\/)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] || matches[2] : null;
}
