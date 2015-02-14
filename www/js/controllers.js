angular.module('jobPortl.controllers', [])

	.config(function ($compileProvider) {
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})

	.controller('AccountCtrl', function ($scope, $state, $ionicPopup, UserService) {
		var user_type = UserService.getUserType()
		console.log(UserService.getUser().user_id)

		if (user_type == 2)
			$state.go('login')
		else {
			if (user_type == 0) //employer
				$scope.toggle_employer = 'ng-hide'
			else //skilled-laborer
				$scope.toggle_sl = 'ng-hide'

			var user = UserService.getUser()
			$scope.id = user.user_id
			$scope.status = user.is_logged_in
			$scope.user_acc_type = user.user_acc_type
			$scope.user_type = user.user_type
			$scope.email = user.email
			$scope.first_name = user.first_name
			$scope.last_name = user.last_name
			$scope.photo =  user.photo
//			console.log("Response: " + JSON.stringify(user))

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
					window.plugins.toast.showLongBottom('You are logged out.')
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

	.controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicLoading, UserAccount, UserService, User) {
		$scope.user_input = {}

		$scope.skipLogin = function ($scope, $localstorage) {
			UserService.setUserType(2)
			$state.go('tab.job-post');
//			console.log("User: " + JSON.stringify(UserService.getUser))
//			console.log("User_Type: " + UserService.getUserType())
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
//						console.log("LOGIN: " +fb_info)
						User.setFbInfo(fb_info)
						$state.go('registerDetails')
					}
				}
				else {
					window.plugins.toast.showLongBottom('Logged in successfully!')
//					console.log(response)
					UserService.setUser(response)
					UserService.setUserType(response.user_type)
//					console.log(UserService.getUser())
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
//			console.log(user_input)
			login(user_input, 0)
		}

		//for facebook login

		var refresh = function() {
			facebookConnectPlugin.api('/me', null,
				function (info) {
					//console.log(response);
					facebookConnectPlugin.api('/me?fields=picture.width(100).height(100)', null,
						function (photo) {
							var user_input = {email_add:info.email,password:'', user_acc_type:0}
							info['photo'] = photo.picture.data.url
//							console.log(user_input)
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
//			console.log(response);
		};

		var fbLoginError = function (error) {
			fbLogged.reject(error);
		};

		$scope.fblogin = function () {
//			console.log('Login');
			if (!window.cordova) {
				facebookConnectPlugin.browserInit('578995458902268');
			}
			facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);

			fbLogged.then(function (authData) {
//				console.log('Promised');
				return Parse.FacebookUtils.logIn(authData);
			})
				.then(function (userObject) {
					var authData = userObject.get('authData');
					refresh()
				}, function (error) {
//					console.log(error);
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


//		console.log(JSON.stringify(User.getFbInfo()))

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
//			console.log(JSON.stringify($scope.new_user))

			User.addUser($scope.new_user).success(function (response) {
//				console.log(response)
				//disable back button
				$ionicViewService.nextViewOptions({
					disableBack: true
				});
				//$ionicLoading.hide();
				window.plugins.toast.showLongBottom('Registration successful! Please log in.')
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

	.controller('EditProfileCtrl', function ($scope,JobPost, $ionicModal, $ionicLoading, UserService, User,$cordovaCamera) {
		/*$scope.$watch('myPicture', function(value) {
			if(value) {
				$scope.myPicture = value
			}
		}, true);*/
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

		//declare & initialize
		var user;
		var all_skills = []
		var user_skills = []

		var onLoad = function(){
			user = UserService.getUser()

			console.log('test')
			console.log(user.acquired_skills)

			/*var acq = []
			var acq_id = []
			acq.push(user.acquired_skills[0].skill.category)
			acq_id.push(user.acquired_skills[0].skill.category.category_id)
			console.log(acq_id)
			angular.forEach(user.acquired_skills, function(acquired){
				console.log(acquired.skill.category.category_id)
				if(acq_id.indexOf(acquired.skill.category.category_id)<0){
					acq_id.push(acquired.skill.category.category_id)
					acq.push(acquired.skill.category)
				}
				console.log(acq)
			})*/

			$scope.editable = false;
			$scope.my_photo = user.photo
			$scope.info = user
			$scope.user_skill = user.acquired_skills
			if(angular.isUndefined(user.title))
				$scope.info.title= "no title"
			console.log($scope.info.title)
			$scope.order = 'skill.category.category_name'

			angular.forEach($scope.user_skill, function(skill){
				user_skills.push(skill.skill.skill_id)
			})
			getCategories()
		}

		//under observation
		var updateUserService = function(){
			var info = []
//			console.log(user)
//			console.log(UserService.getUser().user_acc_id)
			User.getUpdatedUser(UserService.getUser().user_acc_id).success(function(response){
				$ionicLoading.hide()
//				console.log(UserService.getUser())
//				UserService.clearStorage()
//				console.log("after clear")
//				console.log(UserService.getUser())
//				UserService.setUser(response)
//				UserService.setUserType(response.user_type)
//				console.log(UserService.getUser())
//				console.log('update:')
//				console.log(response)
				user = UserService.setUser(response)
				onLoad()

			})
		}

//		console.log(UserService.getUser())
		var getCategories = function(){
			JobPost.getAllCategories().success(function(response){
//				$ionicLoading.hide()
				if(!response)
					alert("Couldn't get categories.")
				else
//				console.log(response)
					all_skills = response
			})
		}

		$scope.capture = function(){
			document.addEventListener("deviceready", function () {

				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false
				};

				$cordovaCamera.getPicture(options).then(function(imageData) {
					var image = document.getElementById('myImage');
					image.src = "data:image/jpeg;base64," + imageData;
					$scope.my_photo= image.src

				}, function(err) {
					alert(err)
				});

			}, false);
		}

		//toggle editable for title
		$scope.toggle= function(){
			$scope.editable = !$scope.editable
			console.log($scope.editable)
			console.log($scope.info.title)
			if(!$scope.editable){
				User.updateTitle({'user_id' : user.user_id, 'title' : $scope.info.title}).success(function(){
					updateUserService()
				})
			}
		}

		$scope.addSkill = function (){
			$scope.acquired_skills = new Object()
			$ionicModal.fromTemplateUrl('templates/skill-set-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.skillsModal = modal;
//				console.log(all_skills)
				$scope.categories = all_skills
				$scope.acquired_skills.category = $scope.categories[0];

				$scope.skillSet = compare($scope.acquired_skills.category.skills)
//				console.log($scope.skillSet)
				$scope.predicate = 'category_name'
//				console.log($scope.skillSet)
				$scope.skillsModal.show()
			})
		}//end of addSkill

		var compare = function(all_skills){
			var user_skills = []
			var skill_set=[]
			if(angular.equals($scope.user_skill.length,0)){
				angular.forEach(all_skills,function(skills,i){
					skills['checked']=false
					console.log(skills)
					skill_set.push(skills)
				})
			}
			else{
				angular.forEach($scope.user_skill, function(skill){
					user_skills.push(skill.skill.skill_id)
				})
	//			console.log(all_skills)

				angular.forEach(all_skills,function(skills,i){
					var end = false
					angular.forEach(user_skills, function(user_skill,j){
						if(!angular.equals(user_skill, all_skills[i].skill_id)){
							if(j == user_skills.length-1 && end ==false){
	//							if(!skills.hasOwnProperty("checked"))
									skills['checked']=false
								skill_set.push(skills)
							}
						}
						else
							end = true
					})
				})
			}
			return skill_set
		}

		$scope.deleteSkill = function(as_id){
			User.removeASkill(as_id).success(function(response){
				console.log(response)
				updateUserService()
			})
		}

		$scope.change = function(){
			$scope.skillSet = compare($scope.acquired_skills.category.skills)
//			$scope.skillSet.checked=false
			console.log($scope.skillSet)
		}

		$scope.as_skillSet = function(){
			$scope.closeModal()
			var acquired = []
			var data = {}
			angular.forEach($scope.skillSet, function(skill){
				if(skill.checked){
					acquired.push(skill.skill_id)
					skill.checked=false
				}
			})
			data= {'skill_id': acquired, 'user_id': user.user_id}
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 5,
				showDelay: 0
			});
			User.addSkill(data).success(function(response){
				console.log(response)
//				updateUserService()
				angular.forEach(response, function(new_skill){
					$scope.user_skill.push(new_skill)
				})

				updateUserService()
				$ionicLoading.hide()

			})
		}

		$scope.closeModal = function(){
			$scope.skillsModal.hide();
		}

		//on load
		onLoad()
//		updateUserService();
	})

	.controller('SkilledLaborerCtrl', function ($scope, $ionicModal, $filter, $ionicLoading, SkilledLaborer) {
		$scope.skilled_laborer_info = {}
		//call function
		/*$scope.call = function (number) {
			var call = "tel:" + number;
			document.location.href = call;
		}*/

		var display = function(){
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 500,
				showDelay: 0
			});
			SkilledLaborer.getSkilledLaborers().
				success(function (data, status, headers) {
					$ionicLoading.hide()
					console.log(data)
					$scope.skilled_laborer_info = data;
				}).
				error(function (err) {
					alert("An error occurred. Cannot get skilled laborer info")
				});
		}

		//view profile function
		$scope.viewProfile = function (info) {
			$scope.userInfo = info;
//			console.log(info.user_id);

			$ionicModal.fromTemplateUrl('templates/profile-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.profileModal = modal;
				$scope.profileModal.show();
			});
		}
		display()
	})

	.controller('JobCtrl', function ($scope, $ionicModal, $filter, $ionicLoading, JobPost, UserService) {
		var user_type = UserService.getUserType()
		$scope.new_job_post = {};


		var navigateViewByUserType = function (){
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 500,
				showDelay: 0
			});
			if (user_type  == 0){ //employer
				$scope.toggle_employer = 'ng-hide'
				JobPost.getMyPost(UserService.getUser().user_id).success(function(response) {
					displayJobPost(response)
				})
			}
			else if (user_type  == 1){ //skilled-laborer
				$scope.toggle_sl = 'ng-hide'
				var job_post= JobPost.getAllJobPosts().success(function(response){
					console.log("getAllJobPosts..")
					console.log(response)
					displayJobPost(response)
				}).
				error(function(err){
					console.log(err)
				})
			}
			else{
				$scope.toggle_stalker = 'ng-hide'
				var job_post= JobPost.getAllJobPosts().success(function(response){
					console.log(response)
					displayJobPost(response)
				}).
				error(function(err){
					console.log(err)
				})
			}
		}

		var displayJobPost = function(jobPosts){
			$ionicLoading.hide()
			angular.forEach(jobPosts, function(post){
				post.datetime_posted= $filter('date')(post.datetime_posted, "EEE d MMM yyyy ") + "at" + $filter('date')(post.datetime_posted, " hh:mm a");
//					$scope.header = post.status === 1 ? 'bar-positive' : 'bar-assertive'
			})
			$scope.job_posts=jobPosts
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
					console.log(response)
					if(!response)
						alert("Couldn't get categories.")
					else{
						$scope.categories = response
//						console.log(response[0].skills)
						$scope.new_job_post.category = $scope.categories[0];
						$scope.skills = $scope.new_job_post.category.skills
						$scope.predicate = 'category_name'
						$scope.new_job_post.skill = $scope.skills[0];
					}
				})
				$scope.createJobPost.show()
			})

			$scope.change = function(){
				$scope.skills = $scope.new_job_post.category.skills
				$scope.new_job_post.skill = $scope.skills[0];
			}

		}
		//add job post in service

		$scope.createNewJobPost = function (new_job_post) {
			var user = UserService.getUser()
			var job_post = {
				type: 0,
				description: new_job_post.description,
				location: new_job_post.location,
				skill_id: new_job_post.skill.skill_id,
				user_id: user.user_id,
				required_applicant: new_job_post.required_applicant
			}
			console.log(job_post)

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
				$scope.job_posts.unshift(response)
				navigateViewByUserType()
			})
		};

		//execute on load
		navigateViewByUserType()
	})

