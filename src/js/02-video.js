import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const videoLocalStorageKey = 'videoplayer-current-time';


function saveCurrentTime(time) {
  localStorage.setItem(videoLocalStorageKey, time);
}


function getStoredTime() {
  const storedTime = localStorage.getItem(videoLocalStorageKey);
  return storedTime ? parseFloat(storedTime) : 0;
}


const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);


player.ready().then(() => {

  const initialTime = getStoredTime();

  player.setCurrentTime(initialTime);


  player.on('timeupdate', (data) => {
    const currentTime = data.seconds;
    throttledSaveCurrentTime(currentTime);
  });
});
