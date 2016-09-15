// Code goes here
(function() {

  var MainController = function($scope, $interval, $log, $http, $location) {
    $scope.username = "angular";
    $scope.countdown = 5;

    $scope.search = function() {
      $log.info("searching for " + $scope.username);
      $scope.countdown = 5;
      
      $location.path("/user/" + $scope.username);
    };

    var startCountdown = function() {
      $interval(decrementCountdown, 1000);
    };

    var decrementCountdown = function() {
      $log.info("decrementing...");
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search();
      }
    };

    // startCountdown();

    // X-men specific searches -----------------------------------------------------
    $scope.searchXmen = function() {
      var ts = "1";
      var hash = "ebca1061fbd9fcb48dc4c4075f1681a3";
      var apikey = "0d11ea79278b8d1815334843c2893f6f";
      var marvelBaseUrl = "https://gateway.marvel.com/v1/public/characters"
      var requestUrl = marvelBaseUrl + "?name=" + $scope.usernameXmen + "&ts=" + ts + "&apikey=" + apikey + "&hash=" + hash;

      $log.info(requestUrl);

      $http.get(requestUrl).then(onHeroLoaded, onHeroError);
    };

    var onHeroLoaded = function(response) {
      var result = response.data.data.results[0];
      if (result) {
        $scope.hero = result;
        $scope.heroImageUrl = $scope.hero.thumbnail.path + "/standard_xlarge." + 
          $scope.hero.thumbnail.extension;
        $scope.xMenError = "Hero loaded successfully!";
      } else {
        $scope.hero = null;
        $scope.xMenError = "Hero '" + $scope.usernameXmen + "' not found";
      }
    };

    var onHeroError = function(response) {
      $scope.xMenError = "Could not load hero!";
    };

  };

  var app = angular.module("githubViewer");
  app.controller("MainController", MainController);
  
}());