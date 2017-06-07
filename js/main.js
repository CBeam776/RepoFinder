$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'c998d6efdc70fb623da9',
        client_secret:'52bb93ec006f97dfb6478a5d51f91700026d26cf',
        sort: 'created: asc',
        per_page: 5
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'c998d6efdc70fb623da9',
          client_secret:'52bb93ec006f97dfb6478a5d51f91700026d26cf'
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well container">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a class="btn btn-primary btn-block" target="_blank" href="${repo.html_url}">See Repo</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body container">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a class="btn btn-defualt btn-block" target="_blank" href="${user.html_url}">See Profile</a>
              </div>
              <div class="col-md-8">
                <span class="label label-default">Repos: ${user.public_repos}</span>
                <span class="label label-primary">Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website: ${user.blog}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Recent Repos</h3>
        <div id="repos">
        </div>
        `);
    });
  });
});
