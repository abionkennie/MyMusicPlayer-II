const musicContainer = document.querySelector('.music-container')
const playPauseBtn = document.querySelector('.play-pause')
const prevBtn = document.querySelector('#prev')
const repeatBtn = document.querySelector('#repeat-plist')
const moreMusicBtn = document.querySelector('#more-music')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const musicList = document.querySelector('.music-list')
const musicPause = document.querySelector('.music-pause')
const musicInfo = document.querySelector('.music-info')
const searchSongs = document.querySelector('.search-songs')
const imgContainer = document.querySelector('.img-container img')
const musicName = document.querySelector('.name')
const musicArtist = document.querySelector('.song-details .artist');
const mainAudio = document.querySelector("#main-audio");
const navigationIcon = document.querySelector(".navigation");
const timer = document.querySelector('.timer');
const showMoreBtn = document.querySelector('#more-music');
const hideMusicBtn = document.querySelector('#close');
const musicPauseList = document.querySelector('.music-pause ul')


let musicIndex = 8;

window.addEventListener("load", () => {
    // Calling load music function once window is loaded
    loadMusic(musicIndex);
})

function loadMusic(indexNumb) {
    // Load music function
    // 0...(n-1)
    let musicNameText = allMusic[indexNumb - 1].name;
    let musicArtistText = allMusic[indexNumb - 1].artist;
    let musicImg = allMusic[indexNumb - 1].img;
    let musicSrc = allMusic[indexNumb - 1].src;

    musicName.innerText = musicNameText;
    musicArtist.innerText = musicArtistText;
    imgContainer.src = `images/` + musicImg;
    mainAudio.src = `music/` + musicSrc;
}
// Play Music function
function playSong() {
    musicContainer.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// Pause music function
function pauseSong() {
    musicContainer.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// NextSong Function
function nextSong() {
    // we'll increment index by 1
    musicIndex++;

    if (musicIndex > allMusic.length) {
        musicIndex = 1;
    }
    loadMusic(musicIndex);
    playSong();
}

// PrevSong Function
function prevSong() {
    // we'll decrement index by 1
    musicIndex--;

    if (musicIndex <= 0) {
        musicIndex = allMusic.length;
    }
    loadMusic(musicIndex);
    playSong();
}

// play or music button eventListener
playPauseBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('paused')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong();
    }
})

// Next song button EventListener
nextBtn.addEventListener("click", () => {
    // calling next song function
    nextSong();
});

// Prev song button EventListener
prevBtn.addEventListener("click", () => {
    // calling prev song function
    prevSong();
})

// Update progress bar width with corresponding music current time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTimeX = e.target.currentTime; // To get current time of song
    const durationX = e.target.duration; // Get total duration of song
    let progressWidth = (currentTimeX / durationX) * 100;
    progress.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector(".current");
    mainAudio.addEventListener("loadeddata", () => {
        musicDuration = document.querySelector(".duration");

        // Update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { // adding 0 if sec is less than 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;


    });

    // Update playing song current time
    let currentMin = Math.floor(currentTimeX / 60);
    let currentSec = Math.floor(currentTimeX % 60);
    if (currentSec < 10) { // adding 0 if sec is less than 10
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

// Update playing song current time according to the progress bar width
progressContainer.addEventListener("click", (e) => {
    let progressWidthValue = this.clientWidth; // getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTimeX = (clickedOffSetX / progressWidthValue) * songDuration;
    playSong();
});

// Repeat icon, shuffle song according to the icon
repeatBtn.addEventListener("click", () => {
    // lets get the innerText of the icon then we'll change accordingly
    let getText = repeatBtn.innerText; // getting innerText of icon
    // lets do different changes on different icon click using switch
    switch (getText) {
        case "repeat": // if this icon is repeat then change it to repeat_one
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one": // if icon is repeat_one then change it to shuffle
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");

            break;
        case "shuffle": // if icon is shuffle then change it to repeat
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
    }

});

// We just worked on the icon, now let's work on the function of the icon
// After the song ended
mainAudio.addEventListener("ended", () => {
    // We'll do according to the icon means if user has set icon to loop song then we'll repeat
    // the current song and will do accordingly

    let getText = repeatBtn.innerText; // getting innerText of icon
    // let's do different changes on different icon click using switch
    switch (getText) {
        case "repeat": // if this icon is repeat then simply we call the nextMusic function so the next song will play
            nextSong();
            console.log("MUSIC INDEX:::", musicIndex)
            break;
        case "repeat_one": // if icon is repeat_one then we'll change the current playing song current time to 0 so the song will play from beginning
            mainAudio.currentTime = 0;
            console.log("MUSIC INDEX:::", musicIndex)
            loadMusic(musicIndex);
            playSong(); // calling playSong function
            break;
        case "shuffle": // if icon is shuffle then change it to repeat
            // generating random index between the max range of array length
            let randIndex = Math.floor((Math.random() * allMusic.length) * 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) * 1);
            } while (musicIndex == randIndex); // this loop run until the next random number, won't be the same as the current song index
            musicIndex = randIndex; // Passing randomIndex to musicIndex so the random song will play
            console.log("MUSIC INDEX:::", musicIndex)
            loadMusic(musicIndex); // calling loadMusic function
            playSong(); // calling playSong function
            break;
    }
});

showMoreBtn.addEventListener('click', () => {
    musicPause.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = document.querySelector("ul");

// let's create li according to the array length
for (let i = 0; i < allMusic.length; i++) {
    // let's pass the song name, artist from the array to li
    let liTag = `<li>
                  <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                  </div>
                  <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
                  <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                  </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { // adding 0 if sec is less than 10
            totalSec = `0${totalSec}`;
        }
        liAudioTag.innerText = `${totalMin}:${totalSec}`;

    });
}

// Let's work on adding filter to the search-button
searchSongs = document.forms['search-audio'].querySelector('button');
searchSongs.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    musicPauseList.forEach((audio) => {
        audio.querySelector('li').textContent.toLowerCase().startsWith(q) ?
            (audio.style.display = "block") :
            (audio.style.display = "none");

    })
})