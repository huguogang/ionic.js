angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.fbLogin = function() {
    ngFB.login(
      {scope: 'email'}
    ).then(function(response) {
      if(response.status === 'connected') {
        $scope.closeLogin();
        console.log('Facebook login success');
        console.log(response);
      } else {
        alert('Facebook login failed');
        console.log(response);
      }
    });
  };
})

.controller('SessionsCtrl', function($scope, Session) {
  $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
  $scope.session = Session.get({sessionId: $stateParams.sessionId});
})

.controller('ProfileCtrl', function($scope, ngFB) {
  ngFB.api({
    path: '/me',
    params: {fields: 'id,name'}
  }).then(function(user){
    $scope.user = user;
    console.log(user);
  },
  function(error) {
    alert("Facebook error: " + error.error_description);
  });
});