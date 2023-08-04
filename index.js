const videoContainer = document.querySelector('.videocontainer');

let base_url = "https://www.googleapis.com/youtube/v3/videos?";
let api_key = "AIzaSyDRzZCNPxbaQl_kMUMt2Dg9SexUjgHLIfM";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";



fetch(base_url + new URLSearchParams({
    key: api_key,
    part:'snippet',
    chart: 'mostPopular',
    maxRsults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())

.then(data =>{
    console.log(data);
    data.items.forEach((item) => {
        getChannelIcon(item);
    });
})
.catch(err => console.log(err));

//videoicon

const getChannelIcon = (videodata) =>{
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: videodata.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
      //  console.log(data)
        videodata.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(videodata);
    })
    /* 
const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyBM1_C40cespNthMdFZHgn6-6VwZ8X4mlo";  //add your api else wont work 

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })*/
}
const makeVideoCard = (data) => {
    videoContainer.innerHTML += `<div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
    
}
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})