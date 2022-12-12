import '../scss/styles.scss'
import * as bootstrap from 'bootstrap';

const myModal = document.querySelector("#postId");

myModal.addEventListener('click', (e) => {
    console.log(e.target.id);
})
