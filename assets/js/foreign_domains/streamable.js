export default async function streamablePosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair){
    let imageList = document.querySelector('.media');
        if (domain == 'streamable.com') {
            async function getStreamableData() {
                let streamableID = postUrl.replace("https://streamable.com/", "");

                const streamableData = await fetch(`https://api.streamable.com/videos/${streamableID}`);
                const data = await streamableData.json();

                let i = 0;
                let video = data.files.mp4.url;
                let postFlair = flair ? flair : "";

                console.log(data);

                let streamableObject = {
                    streamableTitle: title,
                    streamableSub: parsedSub,
                    streamableAuthor: author,
                    streamableUps: upvotes,
                    streamableVideo: video,
                    streamableDomain: domain,
                    streamableDate: convertedDate,
                    streamableFlair: postFlair
                }

                imageList.innerHTML += addNewImageStreamable(streamableObject);
                console.log(streamableObject);
            }
            getStreamableData();
        } 

    function addNewImageStreamable(streamableObject) {
        return `
                <div class="post-header">
                    <p class="title">${streamableObject.streamableTitle} <span class="flair">${streamableObject.streamableFlair}</span></p>
                    <p class="video-items">posted to <span class="subreddit">${streamableObject.streamableSub}</span> on <span>${streamableObject.streamableDate}</span> by u/${streamableObject.streamableAuthor} - ${streamableObject.streamableDomain}</p>
                    <p class="video-items" class="upvotes"><span class="like">❤︎</span> ${streamableObject.streamableUps} upvotes</p>
                </div>
                <div class="video-box">
                    <video controls preload="metadata" muted>
                        <source src="${streamableObject.streamableVideo}#t=0.1" type="video/mp4">
                    </video>
                </div>
            `;
    }
}