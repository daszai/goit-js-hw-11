import Player from '@vimeo/player/dist/player';
import throttle from 'lodash.throttle/index';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);
if (localStorage.getItem('videoplayer-current-time') != null) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
