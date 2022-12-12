import { httpConnection as http } from '../js/httpConnection';

const showComments = () => {
    http().get(commentsEndpoint).then((res) => console.log(res));
}

document.getElementById("comments").addEventListener("click", showComments);


