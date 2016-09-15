(function() {

  var RepoController = function($scope, $routeParams, github, $log) {
    var username = $routeParams.username;
    var reponame = $routeParams.reponame;
    $scope.repoMessage = "loading...";

    var onLoadRepoData = function(data) {
      $scope.repo = data;
      
      github.getRepoContributers(username, reponame)
        .then(onContributersLoaded, onRepoError);
    };

    var onContributersLoaded = function(data) {
      $scope.repo.contributors = data;
      $scope.repoMessage = "Repo loaded successfully!";      
    };
      
    var onRepoError = function(reason) {
      $scope.repo = null;
      $scope.repoMessage = "Could not get Repo data!";
    };

    github.getSingleRepo(username, reponame)
      .then(onLoadRepoData, onRepoError);

  };

  var app = angular.module("githubViewer");
  app.controller("RepoController", RepoController);
}())