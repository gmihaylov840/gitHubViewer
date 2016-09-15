(function() {

  var UserController = function($scope, github, $routeParams, $location) {

    var onUserCompleted = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onUserError);
    };

    var onUserError = function(reason) {
      $scope.user = null;
      $scope.userError = "Could not get user data!";
    };

    var onRepos = function(data) {
      $scope.repos = data;
      $scope.userError = "User data retrieved successfully!";
    };

    $scope.loadSingleRepo = function(reponame) {
      $location.path("/repo/" + $scope.username + "/" + reponame);
    };

    $scope.repoSortOrder = "+name";
    $scope.username = $routeParams.username;
    github.getUser($scope.username).then(onUserCompleted, onUserError);
    
    // startCountdown();
  };

  var app = angular.module("githubViewer");
  app.controller("UserController", UserController);

}());