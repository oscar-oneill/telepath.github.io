export default async function vreddit(a,i,e,n,s,t,d,r,o){let c=document.querySelector(".objects");if("v.redd.it"==a){!async function(){const l=await fetch(`https://api.reddit.com/r/${o}/about`),p=await l.json();let u=p.data.icon_img?p.data.icon_img:p.data.community_icon?p.data.community_icon:p.data.header_img?p.data.header_img:"https://www.interactive.org/images/games_developers/no_image_available_sm.jpg",v=d||"",m={video:r.secure_media?r.secure_media.reddit_video.fallback_url:"",title:e,sub:i,ups:n,author:s,domain:a,date:t,flair:v,poster:r.preview?r.preview.images[0].source.url:"https://i.imgur.com/OCLOQYa.jpg",icon:u,link:"https://www.reddit.com"+r.permalink};c.innerHTML+=function(a){return`\n            <div class="container">\n                <div class="identifier">\n                    <div class="subreddit_img">\n                        <a href="/subreddit/${o}">\n                            <img class="subreddit_icon" src="${a.icon}" alt="subreddit icon">\n                        </a>\n                    </div>\n                    <div class="nameplate">\n                        <div class="primary_data"><a href="/subreddit/${o}">${a.sub}</a> &nbsp; &#183; &nbsp; <a href="/user/${a.author}"><span class="user">u/${a.author}</span></a> &#183; <span class="domain">${a.domain}</span></div>\n                        <div class="secondary_data">\n                            <span class="post_title">${a.title}</span>\n                        </div>\n                    </div>\n                </div>\n                <div class="media_box">\n                    <video class="visual_media" preload="none" playsinline controls muted poster="${a.poster}">\n                        <source src="${a.video}" type="video/mp4">\n                    </video>\n                </div>\n                <div class="activity">\n                    <i class="fas fa-heart like_btn"></i> <span class="likes">${a.ups} Likes</span><br>\n                    <div class="date_box">\n                        <span class="date">${a.date}</span> \n                        &#183; \n                        <a class="link" href="${a.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>\n                    </div>\n                </div>    \n            </div>      \n                `}(m)}()}}vreddit();
