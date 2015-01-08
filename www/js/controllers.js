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
		/*$scope.user=[
			{email:"me@domain.com", password: "12345"},
			{email:"you@domain.com", password: "12345"}];*/

		$scope.skipLogin=function($scope){
			$state.go('tab.job-post');
		}
		$scope.signUp=function($scope){
			$state.go('signUp');
		}

		$scope.login=function(email,password){
			var value= authenticate(email,password)
			console.log(value)
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
	})

	.controller('SignupCtrl', function ($scope) {
		$scope.cities=['Baao', 'Balatan', 'Bato', 'Bombon','Buhi','Bula','Cabusao', 'Calabanga', 'Camaligan','Canaman','Caramoan','Del Gallego','Gainza',
						'Garchitorena', 'Goa','Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
						'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];

		$scope.city=$scope.cities[0];

	})

	.controller('SkilledLaborerCtrl', function ($scope) {

	})

	.controller('JobCtrl', function ($scope, $ionicModal, $filter, JobPost) {
		$scope.newJobPost={}
		$scope.createJobPost={}

		var datenow= new Date();
		datenow = $filter('date')(datenow, "EEE d MMM yyyy hh:mm a ") + "at" + $filter('date')(datenow, " hh:mm a");
		console.log(datenow)
		$scope.jobPosts=JobPost.all();

		$ionicModal.fromTemplateUrl('../templates/create-job-post-modal.html', {
			scope: $scope,
			animation: 'slide-in-right' //or slide-left-right-ios7
		}).then(function(modal) {
			$scope.createJobPost = modal;
			$scope.categories= JobPost.allCategories();
			$scope.newJobPost.category=$scope.categories[0];
			console.log($scope.newJobPost.category)
		});

		//add job post in service
		$scope.createNewJobPost = function(newJobPost) {
			$scope.jobPosts.push({ job_id: 3, title: newJobPost.title, description: newJobPost.description, location: newJobPost.location, category: newJobPost.category.category_name, employer: 'New Employer', datetimePosted: datenow });
			$scope.createJobPost.hide();
			alert("New job post successfully created!")
		};
	})

