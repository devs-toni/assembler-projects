import '../scss/styles.scss'
import * as bootstrap from 'bootstrap';

const commentsButton = document.getElementById('commentsButton');
const commentsDiv = document.getElementById('commentsDiv');

commentsButton.addEventListener('click', () => toogleComments())

function toogleComments() {
  if (commentsDiv.classList.contains('d-none')) {
    commentsDiv.classList.remove('d-none');
  } else {
    commentsDiv.classList.add('d-none');
  }
}