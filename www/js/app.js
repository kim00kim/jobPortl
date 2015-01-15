// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'jobPortl' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'jobPortl.services' is found in services.js
// 'jobPortl.controllers' is found in controllers.js
angular.module('jobPortl', ['ionic', 'ionic.rating','jobPortl.controllers', 'jobPortl.services', 'jobPortl.directives', 'ngFacebook'])

	.config( function( $facebookProvider ) {
		$facebookProvider.setAppId('569148046553676');
	})

	.run(function ($ionicPlatform,$rootScope, $state) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));



		/*// UI Router Authentication Check
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
			if (toState.data.authenticate) {
				// User isn’t authenticated
				$state.transitionTo("login");
				event.preventDefault();
			}
		});*/
	})


	.config(function ($stateProvider, $urlRouterProvider) {

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

			// setup an abstract state for the tabs directive
			.state('login', {
				url: "/login",
				templateUrl: "templates/login.html",
				controller: 'LoginCtrl',
				data: {
					authenticate: false
				}
			})

			.state('signUp', {
				url: "/signUp",
				templateUrl: "templates/sign-up.html",
				controller: 'SignupCtrl'
			})

			.state('tab', {
				url: "/tab",
				abstract: true,
				templateUrl: "templates/tabs.html"
			})

			// Each tab has its own nav history stack:

			.state('tab.job-post', {
				url: '/job-post',
				views: {
					'tab-job-post': {
						templateUrl: 'templates/tab-job-post.html',
						controller: 'JobCtrl',
						data: {
							authenticate: true
						}
					}
				}

			})

			.state('tab.skilled-laborer', {
				url: '/skilled-laborer',
				views: {
					'tab-skilled-laborer': {
						templateUrl: 'templates/tab-skilled-laborer.html',
						controller: 'SkilledLaborerCtrl'
					}
				}
			})

			.state('tab.friends', {
				url: '/friends',
				views: {
					'tab-friends': {
						templateUrl: 'templates/tab-friends.html',
						controller: 'FriendsCtrl'
					}
				}
			})
			.state('tab.friend-detail', {
				url: '/friend/:friendId',
				views: {
					'tab-friends': {
						templateUrl: 'templates/friend-detail.html',
						controller: 'FriendDetailCtrl'
					}
				}
			})

			.state('tab.account', {
				url: '/account',
				views: {
					'tab-account': {
						templateUrl: 'templates/tab-account.html',
						controller: 'AccountCtrl'
					}
				}
			})

			.state('sample', {
				url: "/sample",
				templateUrl: "templates/sample.html"
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');

	});

