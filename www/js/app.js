// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'jobPortl' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'jobPortl.services' is found in services.js
// 'jobPortl.controllers' is found in controllers.js
angular.module('jobPortl', ['ionic', 'jobPortl.controllers', 'jobPortl.services'])

	.run(function ($ionicPlatform) {
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
				controller: 'LoginCtrl'
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
						controller: 'DashCtrl'
					}
				}
			})

			.state('tab.skilled-laborer', {
				url: '/skilled-laborer',
				views: {
					'tab-skilled-laborer': {
						templateUrl: 'templates/tab-skilled-laborer.html',
						controller: 'DashCtrl'
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

