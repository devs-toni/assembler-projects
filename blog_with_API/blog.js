let urlPosts = "http://localhost:3000/posts", users, actualUser, actualComments = [], posts;
let comments;

let requestResults;
(async function () {
    requestResults = await Promise.all([
        fetch("http://localhost:3000/users"),
        fetch("http://localhost:3000/comments"),
        fetch(urlPosts)
    ])
    users = await requestResults[0].json();
    comments = await requestResults[1].json();
    posts = await requestResults[2].json();
    displayQuestions(posts);

})();

const blogSection = document.querySelector(".blogSection");

const displayQuestions = (data) => {

    for (let i = 0; i < data.length; i++) {
        checkuserId(data[i].userId);
        getActualComments(data[i].id);
        blogSection.innerHTML += `
        <section class="row shadow p-3 mb-5 bg-white rounded blogPopUp"> 
          <div class="col-md-auto p-0"> 
            <div class="bg-light">
              <img src="assets/img.jpg" height="130px">
            </div> 
          </div> 
          <article class="col p-3 blogContent"> 
            <p class="blogTitle"><strong>${data[i].title}</strong></p>
            <p>${data[i].body}</p> 
          </article> 
          <div class="col-md-auto align-self-center"> 
            <div class="float-end"> 
              <button type="button" class="btn p-1" data-bs-toggle="modal" data-bs-target="#blog${data[i].id}"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> 
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> 
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> 
                </svg> 
              </button>
            </div>
            <div class="modal fade" id="blog${data[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Blog post</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div id="userWindow" class="userId">
                      <article> 
                        <p class="blogTitle"><strong>${data[i].title}</strong></p>
                        <p>${data[i].body}</p> 
                      </article>
                      <article class="blogUserId"> 
                        <span id="blogUserUsername">username: ${actualUser.username}</span><br>
                        <span id="blogUserEmail">user email: ${actualUser.email}</span>
                      </article>
                      <p class="blogTitle"><strong>Comments</strong></p>
                      <p> <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapse${data[i].id}" aria-expanded="false" aria-controls="collapse">
                                            Show comments
                        </button></p>
                      <article class="collapse" id="collapse${data[i].id}">
                      <div class="card card-body">
                      <span><strong>name:</strong> ${actualComments[0].name}</span><br>
                      <span><strong>email:</strong> ${actualComments[0].email}</span><br>
                      <span><strong>comment:</strong> ${actualComments[0].body}</span><br><br>
                      <span><strong>name:</strong> ${actualComments[1].name}</span><br>
                      <span><strong>email:</strong> ${actualComments[1].email}</span><br>
                      <span><strong>comment:</strong> ${actualComments[1].body}</span><br><br>
                      <span><strong>name:</strong> ${actualComments[2].name}</span><br>
                      <span><strong>email:</strong> ${actualComments[2].email}</span><br>
                      <span><strong>comment:</strong> ${actualComments[2].body}</span><br><br>
                      <span><strong>name:</strong> ${actualComments[3].name}</span><br>
                      <span><strong>email:</strong> ${actualComments[3].email}</span><br>
                      <span><strong>comment:</strong> ${actualComments[3].body}</span><br><br>
                      <span><strong>name:</strong> ${actualComments[4].name}</span><br>
                      <span><strong>email:</strong> ${actualComments[4].email}</span><br>
                      <span><strong>comment:</strong> ${actualComments[4].body}</span><br>
                      <div>
                      </article>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>`;
    }

};

function checkuserId(postUserId) {
    let j;
    for (j = 0; j < 10; j++) {
        if (postUserId === users[j].id) {
            actualUser = users[j];

            return;
        }
    }

}

function getActualComments(commentPostId) {
    let commentNumberInPost = commentPostId * 5;
    let k = 0;
    let l = 0;
    for (k = commentNumberInPost - 5; k < commentNumberInPost; k++) {
        if (comments[k].postId === commentPostId) {
            actualComments[l] = comments[k];
            l++;
        }
    }
    return;
}