angular.module('jobPortl.controllers', [])

	.controller('DashCtrl', function ($scope) {
	})

	.controller('FriendsCtrl', function ($scope, Friends) {
		$scope.friends = Friends.all();
	})

	.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
		$scope.friend = Friends.get($stateParams.friendId);
	})

	.controller('AccountCtrl', function ($scope) {
	})

	.controller('LoginCtrl', function ($scope, $state) {
		$scope.user=[
			{email:"me@domain.com", password: "12345"},
			{email:"you@domain.com", password: "12345"}];

		$scope.skipLogin=function($scope){
			$state.go('tab.job-post');
		}
		$scope.signUp=function($scope){
			$state.go('signUp');
		}

		//for facebook login
		var fbLogged = new Parse.Promise();

		var fbLoginSuccess = function(response) {
			if (!response.authResponse){
				fbLoginError("Cannot find the authResponse");
				return;
			}
			var expDate = new Date(
				new Date().getTime() + response.authResponse.expiresIn * 1000
			).toISOString();

			var authData = {
				id: String(response.authResponse.userID),
				access_token: response.authResponse.accessToken,
				expiration_date: expDate
			}
			fbLogged.resolve(authData);
			fbLoginSuccess = null;
			console.log(response);
		};

		var fbLoginError = function(error){
			fbLogged.reject(error);
		};

		$scope.fblogin = function() {
			console.log('Login');
			if (!window.cordova) {
				facebookConnectPlugin.browserInit('569148046553676');
			}
			facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);

			fbLogged.then( function(authData) {
				console.log('Promised');
				return Parse.FacebookUtils.logIn(authData);
			})
				.then( function(userObject) {
					var authData = userObject.get('authData');
					facebookConnectPlugin.api('/me', null,
						function(response) {
							console.log(response);
							userObject.set('name', response.name);
							userObject.set('email', response.email);
							userObject.save();
						},
						function(error) {
							console.log(error);
						}
					);
					facebookConnectPlugin.api('/me/picture', null,
						function(response) {
							userObject.set('profilePicture', response.data.url);
							userObject.save();
						},
						function(error) {
							console.log(error);
						}
					);
					alert("logged in successfully")
					$state.go('tab.job-post');
				}, function(error) {
					console.log(error);
				});
		};

		/*$scope.getLoginStatus = function () {
			$cordovaFacebook.getLoginStatus().then(function (status) {
				$scope.status = status;
			}, function (error) {
				$scope.status = error;
			})
		};

		$scope.login = function () {
			alert("Clicked!")
			$cordovaFacebook.login(["public_profile"]).then(function (success) {
				$scope.loginInfo = success;
			}, function (error) {
				$scope.error = error;
				alert(error);
			})
		};*/
	})

	.controller('SignupCtrl', function ($scope) {
		$scope.cities=['Baao', 'Balatan', 'Bato', 'Bombon','Buhi','Bula','Cabusao', 'Calabanga', 'Camaligan','Canaman','Caramoan','Del Gallego','Gainza',
						'Garchitorena', 'Goa','Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
						'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];

		$scope.city=$scope.cities[0];

	})

	.controller('SkilledLaborerCtrl', function ($scope) {

	})

	.controller('JobCtrl', function ($scope) {
		$scope.categories=[
			{ category_id: 0, category_name: 'Furniture Maker'},
			{ category_id: 1, category_name: 'Plumbing Services'}
		]

		$scope.jobPost=[
			{ job_id: 0, title: 'Job Title1', description: 'Blah Blah', location: 'Naga City', category: 'Furniture Maker', employer: 'John Doe' },
			{ job_id: 1, title: 'Job Title2', description: 'Blah Blah', location: 'Nabua', category: 'Plumbing Services', employer: 'Anna Smith' }]
	})

