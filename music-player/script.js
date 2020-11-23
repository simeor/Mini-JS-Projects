const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele'];

// keep track of song
let songIndex = 2;


const loadSong =(song) => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// init song details
loadSong(songs[songIndex])


// play song
function playSong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}


// pause song
function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

// play song
function playSong(){
  musicContainer.classList.add('play');
}

//prvious song
function prevSong(){
  songIndex --;
  if (songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}


//next song
function nextSong(){
  songIndex ++;
  if (songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}


//event listners

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying){
    pauseSong();
  }else {
    playSong();
  }
});

// progress bar update
function updateProgress(e){
  const {duration, currentTime} = e.srcElement;
  const proggressPercent = (currentTime / duration) * 100;
  progress.style.width = `${proggressPercent}%`;
}

// change song

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener("timeupdate", updateProgress);

