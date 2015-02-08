angular.module('jobPortl.controllers', [])

	.config(function ($compileProvider) {
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})

	.controller('AccountCtrl', function ($scope, $state, $ionicPopup, UserService) {
		var user_type = UserService.getUserType()
		if (user_type == 2)
			$state.go('login')
		else {
			if (user_type == 0) //employer
				$scope.toggle_employer = 'ng-hide'
			else //skilled-laborer
				$scope.toggle_sl = 'ng-hide'

			var user = UserService.getUser()
			$scope.id = user.user_id;
			$scope.status = user.is_logged_in;
			$scope.user_acc_type = user.user_acc_type,
			$scope.user_type = user.user_type,
			$scope.email = user.email,
			$scope.first_name = user.first_name,
			$scope.last_name = user.last_name,
			$scope.photo = "img/" + user.photo
			console.log("Response: " + JSON.stringify(user))
		}
		$scope.logOut = function () {
			// A confirm log out dialog
			var confirmPopup = $ionicPopup.confirm({
				title: 'Log Out',
				template: 'Confirm log out?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					UserService.clearStorage()
					$state.go('login')
				}
			});
		}
	})

	.controller('ToggleUserCtrl', function ($scope, UserService) {
		if (UserService.getUserType() == 0) //employer
			$scope.toggle_employer = 'ng-hide'
		else if (UserService.getUserType() == 1)//skilled-laborer
			$scope.toggle_sl = 'ng-hide'
		else
			$scope.toggle_stalker = 'ng-hide'
	})

	.controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicLoading, UserAccount, UserService) {
		$scope.user_input = {}

		console.log("User: " + JSON.stringify(UserService.getUser))
		console.log("User_Type: " + UserService.getUserType())
		$scope.skipLogin = function ($scope, $localstorage) {
			UserService.setUserType(2)
			$state.go('tab.job-post');
			console.log("User: " + JSON.stringify(UserService.getUser))
			console.log("User_Type: " + UserService.getUserType())
		}
		$scope.register = function () {

			$state.go('registerLogin');
		}

		var login = function (user_input, fb_info) {
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 10,
				showDelay: 20
			});
			UserAccount.checkUser(user_input).success(function (response) {
				$ionicLoading.hide();
				//console.log((response))
				if (!response) {
					if(user_input.user_acc_type==1)
						alert("Incorrect email and password!")
					else{
						console.log("LOGIN: " +fb_info)
						User.setFbInfo(fb_info)
						$state.go('registerDetails')
					}
				}
				else {
					//alert("Logged in successfully!")
					UserService.setUser(response)
					UserService.setUserType(response.user_type)
					console.log("LOGIN CTRL getUser: " + JSON.stringify(UserService.getUser()))
					console.log("LOGIN CTRL getUserType: " + UserService.getUserType())
					navigate(UserService.getUserType())
				}
			})
		}

		var navigate = function (user_type) {
			if (user_type == 0)
				$state.go('tab.skilled-laborer')
			else
				$state.go('tab.job-post')
		}


		$scope.login = function (user_input) {
			user_input['user_acc_type'] = 1
			//console.log("Typical: " + JSON.stringify(user_input))
			user_input['user_acc_type']= 1
			console.log(user_input)
			login(user_input, 0)
		}

		//for facebook login
		var fbLogged = new Parse.Promise();
		var fbLoginSuccess = function (response) {
			if (!response.authResponse) {
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

		var fbLoginError = function (error) {
			fbLogged.reject(error);
		};

		var refresh = function() {
			facebookConnectPlugin.api('/me', null,
				function (info) {
					//console.log(response);
					facebookConnectPlugin.api('/me?fields=picture.width(100).height(100)', null,
						function (photo) {
							var user_input = {email_add:info.email,password:'', user_acc_type:0}
							info['photo'] = photo.picture.data.url
							console.log(user_input)
							login(user_input,info)
						},
						function (error) {
							console.log(error);
						}
					);
				},
				function (error) {
					console.log(error);
				}
			);
		}
		$scope.fblogin = function () {
			console.log('Login');
			if (!window.cordova) {
				facebookConnectPlugin.browserInit('578995458902268');
			}
			facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);

			fbLogged.then(function (authData) {
				console.log('Promised');
				return Parse.FacebookUtils.logIn(authData);
			})
				.then(function (userObject) {
					var authData = userObject.get('authData');
					refresh()
				}, function (error) {
					console.log(error);
				});
		};
		/*$scope.fblogin = function () {
			var fb_info
			$scope.isLoggedIn = false;
			$facebook.login().then(function() {
				refresh();
			});
			var refresh = function() {
				$facebook.api("/me").then(
					function(info) {
						$facebook.api("/me?fields=picture.width(100).height(100)").then(
							function(photo) {
								var user_input = {email_add:info.email,password:'', user_acc_type:0}
								info['photo'] = photo.picture.data.url
								console.log(user_input)
								login(user_input,info)
							},
							function(err) {
								//$scope.welcomeMsg = "Please log in";
								console.log(err)
							}
						);
					},
					function(err) {
						//$scope.welcomeMsg = "Please log in";
						console.log(err)
					}
				)
			}
		}*/
	})


	.controller('RegisterCtrl', function ($scope, $state, $window, $ionicLoading,UserAccount, User, $ionicViewService) {
		var acc_type=1

		$scope.new_user = {}
		$scope.new_user_account = {}


		console.log(JSON.stringify(User.getFbInfo()))

		//initialize inputs
		var initialize = function (){
			$scope.new_user.first_name = User.getFbInfo().first_name
			$scope.new_user.last_name = User.getFbInfo().last_name
			$scope.new_user.photo = User.getFbInfo().photo
			$scope.new_user.gender = User.getFbInfo().gender || "male"
			$scope.new_user.user_type = 0


			$scope.cities = ['Baao', 'Balatan', 'Bato', 'Bombon', 'Buhi', 'Bula', 'Cabusao', 'Calabanga', 'Camaligan', 'Canaman', 'Caramoan', 'Del Gallego', 'Gainza',
				'Garchitorena', 'Goa', 'Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
				'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];
			$scope.new_user.city = $scope.cities[0];

			if(angular.equals({},User.getFbInfo()))
				$scope.new_user.user_acc_type = 1 //typical
			else{
				$scope.new_user.user_acc_type = 0 //FB
				acc_type = 0
			}

		}

		$scope.addUserAccount = function (user_acc) {
			user_acc.user_acc_type = 1
			UserAccount.setUserAccount(user_acc)
			console.log("ASDSDSA: " + JSON.stringify(user_acc))
			$state.go('registerDetails');
		}

		$scope.addUser = function () {
			var user_account = UserAccount.getUserAccount()
			var fb_info = User.getFbInfo()

			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			})

			if(acc_type==1){
				$scope.new_user.email =  user_account.email
				$scope.new_user.password = user_account.confirm
				//$scope.new_user.user_acc_type = user_account.user_acc_type
			}
			else{
				$scope.new_user.email =  fb_info.email
				//$scope.new_user.password = user_account.confirm
				//$scope.new_user.user_acc_type = user_account.user_acc_type
			}
			console.log(JSON.stringify($scope.new_user))

			User.addUser($scope.new_user).success(function (response) {
				console.log(response)
				//disable back button
				$ionicViewService.nextViewOptions({
					disableBack: true
				});
				$ionicLoading.hide();
				$state.go('login')
			})
		}

		$scope.cancel = function () {
			$window.history.back();
		}

		$scope.fbRegister = function () {
			$scope.new_user.user_acc_type = 0
		}

		//execute function
		initialize()

	})

	.controller('EditProfileCtrl', function ($scope) {
		//$scope.lastPhoto = "img/blank.png"
		//$scope.myPicture = "img/blank.png"
		$scope.$watch('myPicture', function(value) {
			if(value) {
				$scope.myPicture = value
			}
		}, true);

		/*$scope.getPhoto = function () {
			console.log('Getting camera');
			Camera.getPicture().then(function (imageURI) {
				console.log(imageURI);
				$scope.lastPhoto = imageURI;
			}, function (err) {
				console.log(err);
			}, {
				quality: 75,
				targetWidth: 100,
				targetHeight: 100,
				saveToPhotoAlbum: false
			});
		}*/
	})

	.controller('SkilledLaborerCtrl', function ($scope, $ionicModal, $filter, SkilledLaborer) {
		$scope.skilled_laborer_info = {}


		//call function
		/*$scope.call = function (number) {
			var call = "tel:" + number;
			document.location.href = call;
		}*/

		SkilledLaborer.getSkilledLaborers().
			success(function (data, status, headers) {
				console.log("Get Skilled Laborer Info: Success")
				console.log("Status: " + status);
				console.log("Length: " + headers("content-length"));
				console.log(data)
				$scope.skilled_laborer_info = data;
			}).
			error(function () {
				alert("An error occurred. Cannot get skilled laborer info")
			});


		//view profile function
		$scope.viewProfile = function (info) {
			$scope.userInfo = info;
			console.log(info.user_id);

			$ionicModal.fromTemplateUrl('templates/profile-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.profileModal = modal;
				$scope.profileModal.show();
				$scope.rate = 4;
				$scope.max = 5;
			});
		}
	})

	.controller('JobCtrl', function ($scope, $ionicModal, $filter, $ionicLoading, JobPost, UserService) {
		var user_type = UserService.getUserType()
		$scope.new_job_post = {};

		var displayJobPost = function() {
			$scope.job_posts = JobPost.getMyPost(UserService.getUser().user_id).success(function(response) {
				//console.log(response)
			})
		}

		//get current date and time
		var datenow = new Date();
		datenow = $filter('date')(datenow, "EEE d MMM yyyy ") + "at" + $filter('date')(datenow, " hh:mm a");
		if (user_type  == 0){ //employer
			$scope.toggle_employer = 'ng-hide'
//			console.log("User: " + UserService.getUser().user_id)
//			displayJobPost()
			JobPost.all().success(function(response){
				//console.log("JobPost: " + angular.toJson(response))
				$scope.job_posts = response
			})
		}
		else if (user_type  == 1){ //skilled-laborer
			$scope.toggle_sl = 'ng-hide'
			JobPost.all().success(function(response){
				//console.log("JobPost: " + angular.toJson(response))
				$scope.job_posts = response
			})
		}
		else{
			$scope.toggle_stalker = 'ng-hide'
			JobPost.all().success(function(response){
				//console.log("JobPost: " + angular.toJson(response))
				$scope.job_posts = response
			})
		}

		$scope.openModal = function(){
			$ionicModal.fromTemplateUrl('templates/create-job-post-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.createJobPost = modal;
				$ionicLoading.show({
					content: 'Loading...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 500,
					showDelay: 0
				});
				JobPost.getAllCategories().success(function(response){
					$ionicLoading.hide()
					$scope.new_job_post.categories = response
					console.log($scope.new_job_post.categories)
					if(!response)
						alert("Couldn't get categories.")
					else{
						$scope.predicate = 'category_name'
						$scope.categories = response
						$scope.new_job_post.category = $scope.categories[0];
					}
				})
				$scope.createJobPost.show()
			})

		}
		//add job post in service

		$scope.createNewJobPost = function (new_job_post) {
			var user = UserService.getUser()
			var job_post = {
				title: new_job_post.title,
				description: new_job_post.description,
				location: new_job_post.location,
				category_id: new_job_post.category.category_id,
				user_id: user.user_id,
				required_applicant: new_job_post.required_applicant
			}

			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 500,
				showDelay: 0
			});
			JobPost.saveJobPost(job_post).success(function(response){
				$ionicLoading.hide()
				console.log(response)
				$scope.createJobPost.hide();
				//clean form input
				$scope.new_job_post = {};
				$scope.new_job_post.category = $scope.categories[0];
//				alert("New job post successfully created!")
				/*$scope.new_job_post.push({

				})*/
			})
//			console.log(job_post)
				/*$scope.job_posts = ({
					title: new_job_post.title,
					description: new_job_post.description,
					location: new_job_post.location,
					category: new_job_post.category.category_id,
					employer: user.first_name + " " + user.last_name,
					photo: user.photo,
					datetime_posted: datenow
				});*/

		};
	})

