(function() {

  var github = function($http, $log) {

    var getUser = function(username) {
      return $http.get("https://api.github.com/users/" + username)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepos = function(user) {
      $log.info("Requesting Repos from: " + user.repos_url);

      return $http.get(user.repos_url)
        .then(function(response) {
          return response.data;
        });
    };

    var getSingleRepo = function(username, reponame) {
      var url = "https://api.github.com/repos/" + username + "/" + reponame;
      $log.info(url);

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepoContributers = function(username, reponame) {
      var url = "https://api.github.com/repos/" + username + "/" + reponame + "/contributors";
      $log.info(url);

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    };


    return {
      getUser: getUser,
      getRepos: getRepos,
      getSingleRepo: getSingleRepo,
      getRepoContributers: getRepoContributers
    };
  };

  var module = angular.module("githubViewer");
  module.factory("github", github);
}());