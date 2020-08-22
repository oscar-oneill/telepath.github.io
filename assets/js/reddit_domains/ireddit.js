export default async function iredditPosts (redditPosts, domain, parsedSub, title, upvotes, author, convertedDate, flair, media, reddit, postUrl) {
    let imageList = document.querySelector(".objects");

    if (domain == "i.redd.it" && postUrl.includes("gif")) {
        async function getPicture() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.header_img ? _data.data.header_img : _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';

            let postFlair = flair ? flair : "";
            let ireddit = {
                image: media.url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                icon: icon,
                link: "https://www.reddit.com" + media.permalink
        }

            imageList.innerHTML += iredditImage(ireddit);
        }

        getPicture();
    }

    function iredditImage(ireddit) {
      return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <img class="icon" src="${ireddit.icon}">
                        </div>
                        <div class="nameplate">
                            <span>${ireddit.sub}</span>
                        </div>
                    </div>
                    <div class="media_box">
                        <img src="${ireddit.image}"/>
                    </div>
                    <div class="activity">
                            <i class="fas fa-heart like_btn"></i><span class="likes">${ireddit.ups} Likes</span> <br>
                            <div class="data_box">
                                <span class="user">u/${ireddit.author}</span> 
                                <span class="post_title">${ireddit.title}</span>
                            </div>
                            <div class="date_box">
                                <span class="date">${ireddit.date}</span> 
                                &#183; 
                                <span class="domain">${ireddit.domain}</span>
                                &#183; 
                                <a class="link" href="${ireddit.link}" target="_blank">Permalink</a>
                            </div>
                    </div>
                </div> 
		        `;
    }
}

iredditPosts()