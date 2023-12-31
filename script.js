const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');

const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');




// songs title
const songs = ['hurt','letitgo','river'];

// keep track of song
let songIndex = 0;

//Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src= `music/${song}.mp3`;
    cover.src= `images/${song}.jpg`;
}

// play song
function playSong (){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
// pause song
function pauseSong (){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previuous Song
  function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    
    playSong();
  }
  
// Next Song
function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    
    playSong();
  }

  // Update Progress bar
   function updateProgress (e){
    const {duration , currentTime}  = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%;`
   }

   //set progress bar 
    function setProgress (e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

       audio.currentTime = (clickX / width) * duration;


    }

// event listerns 
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song Update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click',setProgress)

// song end
audio. addEventListener('ended',nextSong);
