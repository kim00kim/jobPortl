angular.module('jobPortl.controllers', [])

	.config(function($compileProvider){
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})

	.controller('AccountCtrl', function ($scope, UserService, $state) {
		$scope.name = UserService.user_firstName + " " + UserService.user_lastName
		$scope.pic = "https://graph.facebook.com/" + UserService.fb_id + "/picture?width=80&height=80"
		console.log($scope.pic)
	})

	.controller('LoginCtrl', function ($scope, $state, $rootScope, User_Account, UserService, $facebook) {
		$scope.userInput= {}
//		$scope.isLimited = false;

		$scope.skipLogin=function($scope){
			UserService.isLimited= true;
//			$scope.isLimited = UserService.isLimited;

			$state.go('tab.job-post');
		}
		$scope.signUp=function($scope){
			$state.go('signUp');
		}

		$scope.login=function(user){
			console.log(user)
			/*var response = User_Account.checkUser(user)
			if(response > 1){
				UserService.getUserInfo(response)
			}
			console.log('user_type: ' + UserService.user_info.user_type)*/
		}

		//for facebook login
		var userid;
		$scope.fblogin = function() {
			/*$facebook.login().then(function() {

				refresh();
			});*/
			$facebook.login("email,user_birthday").then(function(){
				refresh();
//				getBirthDate();
			})
		}
		function refresh() {
			$facebook.api("/me", ["user_birthday"]).then(
				function(profile) {
					$facebook.api("/me/picture").then(
						function(pic) {
							$facebook.getAuthResponse();

							//store user info
							UserService.isLogged = true;
							UserService.user_email= profile.email;
//							UserService.user_id = ''
							UserService.user_firstName = profile.first_name;
							UserService.user_lastName = profile.last_name;
							UserService.gender = profile.gender;
							UserService.birthdate = profile.birthday;
							UserService.user_profile = pic.data.url;
							UserService.fb_id = profile.id;
							UserService.user_acct_type = 0;
							UserService.isLimited = false;
							console.log(UserService)
							//check if user has account

							//proceed to app
							//$state.go('tab.job-post');
						},
						function(err) {
							console.log(err)
						});
//					console.log(response)
				},
				function(err) {
					console.log(err)
				});
		}
		refresh();
		/*var fbLogged = new Parse.Promise();

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
							userObjectuserObject.save();
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
		};*/
	})


	.controller('SignupCtrl', function ($scope, $state, $window) {
		$scope.newUser={}

		$scope.cities=['Baao', 'Balatan', 'Bato', 'Bombon','Buhi','Bula','Cabusao', 'Calabanga', 'Camaligan','Canaman','Caramoan','Del Gallego','Gainza',
						'Garchitorena', 'Goa','Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
						'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];

		$scope.newUser.city=$scope.cities[0];
		$scope.newUser.user_type = 0
		$scope.newUser.gender= "m"

		$scope.addUser = function(){
			console.log($scope.newUser)
		}
		$scope.cancel= function(){
			$window.history.back();
		}
	})

	.controller('EditProfileCtrl', function ($scope, Camera) {
		$scope.lastPhoto = "img/	blank.png"
		$scope.getPhoto = function() {
			console.log('Getting camera');
			Camera.getPicture().then(function(imageURI) {
				console.log(imageURI);
				$scope.lastPhoto = imageURI;
			}, function(err) {
				console.err(err);
			}, {
				quality: 75,
				targetWidth: 100,
				targetHeight: 100,
				saveToPhotoAlbum: false
			});
			/*
			 navigator.camera.getPicture(function(imageURI) {
			 console.log(imageURI);
			 }, function(err) {
			 }, {
			 quality: 50,
			 destinationType: Camera.DestinationType.DATA_URL
			 });
			 */
		}
	})

	.controller('SkilledLaborerCtrl', function ($scope, $ionicModal, $filter, SkilledLaborer) {
		$scope.skilledLaborerInfo= {}

        //call function
        $scope.call=function(number){
            var call = "tel:" + number;
            document.location.href = call;
        }

		SkilledLaborer.getSkilledLaborers().
			success(function(data, status, headers){
				console.log("Get Skilled Laborer Info: Success")
				console.log("Status: " + status);
				console.log("Length: " + headers("content-length"));
				console.log(data)
				$scope.skilledLaborerInfo = data;
			}).
			error(function() {
				alert("An error occurred. Cannot get skilled laborer info")
			});


		//view profile function
		$scope.viewProfile=function(info){
			$scope.userInfo= info;
			console.log(info.user_id);

			$ionicModal.fromTemplateUrl('templates/profile-modal.html', {
				scope: $scope,
				animation: 'slide-in-right' //or slide-left-right-ios7
			}).then(function(modal) {
				$scope.profileModal = modal;
				$scope.profileModal.show();
				$scope.rate = 4;
				$scope.max = 5;
			});
		}


	})

	.controller('JobCtrl', function ($scope, $ionicModal, $filter, JobPost, UserService) {
		$scope.newJobPost={};

		//get current date and time
		var datenow= new Date();
		datenow = $filter('date')(datenow, "EEE d MMM yyyy ") + "at" + $filter('date')(datenow, " hh:mm a");

		$scope.jobPosts=JobPost.all();

		$ionicModal.fromTemplateUrl('templates/create-job-post-modal.html', {
			scope: $scope,
			animation: 'slide-in-right' //or slide-left-right-ios7
		}).then(function(modal) {
			$scope.createJobPost = modal;
			$scope.categories= JobPost.allCategories();
			$scope.newJobPost.category=$scope.categories[0];
		});

		//add job post in service
		$scope.createNewJobPost = function(newJobPost) {
			$scope.jobPosts.push({ job_id: 3, title: newJobPost.title, description: newJobPost.description, location: newJobPost.location, category: newJobPost.category.category_name, employer: 'New Employer', datetimePosted: datenow });
			$scope.createJobPost.hide();
			//clean form input
			$scope.newJobPost= {};
			$scope.newJobPost.category= $scope.categories[0];
			alert("New job post successfully created!")
		};
	})

