angular.module('jobPortl.controllers', [])

	.config(function ($compileProvider) {
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})

	.controller('AccountCtrl', function ($scope, $state, $ionicPopup, UserService, CachedData) {
		console.log('In AccountCtrl..');
		var userType = UserService.getUserType();

		if (userType == 2){
			$state.go('login');
			$scope.toggleStalker = 'ng-hide';
		}
		else {
			if (userType == 0) //employer
				$scope.toggleEmployer = 'ng-hide';
			else //skilled-laborer
				$scope.toggleSl = 'ng-hide';

			var user = UserService.getUser();
			console.log(user);
			$scope.user=user;
		}
		$scope.logOut = function () {
			// A confirm log out dialog
			var confirmPopup = $ionicPopup.confirm({
				title: 'Log Out',
				template: 'Confirm log out?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					UserService.clearStorage();
					CachedData.clearStorage();
					$state.go('login');
					if(window.cordova)
					window.plugins.toast.showLongCenter('You are logged out.')
				}
			});
		};
        $scope.slAccount = function (account) {
            UserService.setView(account);
			$state.go('tab.accepted-app');
        }
	})

	.controller('ToggleUserCtrl', function ($scope, UserService) {
		if (UserService.getUserType() == 0) //employer
			$scope.toggleEmployer = 'ng-hide';
		else if (UserService.getUserType() == 1)//skilled-laborer
			$scope.toggleSl = 'ng-hide';
		else
			$scope.toggleStalker = 'ng-hide'
	})

	.controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicLoading, UserAccount, UserService, User, SkilledLaborer) {
		console.log('In LoginCtrl..');
		$scope.wrongInput = false;
		$scope.skipLogin = function () {
			UserService.setUserType(2);
			$state.go('tab.job-post');
//			console.log("User: " + JSON.stringify(UserService.getUser))
//			console.log("User_Type: " + UserService.getUserType())
		};
		$scope.register = function () {
			$state.go('registerLogin');
		};

		var login = function (userInput, fbInfo) {
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 20
			});
			UserAccount.checkUser(userInput).success(function (response) {
				$ionicLoading.hide();
				//console.log((response))
				if (!response) {
					if(userInput.userAccType==1){
						if(window.cordova)
							window.plugins.toast.showShortCenter('Incorrect email and password!')
						console.log("Incorrect email and password!");
						userInput.password = '';
					}
					else{
//						console.log("LOGIN: " +fb_info)
						User.setFbInfo(fbInfo);
						$state.go('registerDetails');
					}
				}
				else {
					if(window.cordova)
						window.plugins.toast.showShortBottom('Logged in successfully!')

//					console.log(response)
					UserService.setUserType(response.user_type);
					//get acquired skills
					if(UserService.getUserType()==1){
						SkilledLaborer.getAcquiredSkillsByUser(response.user.user_id).success(function(ac){
//							console.log("AC: ");
//							console.log(ac);
							response.user['acquired_skills']=ac;
							UserService.setUser(response);
//							console.log(response)
						});
					}

					console.log("HERE!: ");
					console.log(response);
					UserService.setUser(response);
//					console.log(UserService.getUser())
					navigate(UserService.getUserType());

				}
			});
		};

		var navigate = function (userType) {
			if (userType == 0)
				$state.go('tab.skilled-laborer');
			else{
                $state.go('tab.job-post');
                UserService.setView(0);
            }
			console.log('navigate: ' +userType);
		};


		$scope.login = function (userInput) {
			userInput['userAccType'] = 1;
			//console.log("Typical: " + JSON.stringify(userInput));
			userInput['userAccType']= 1;
//			console.log(userInput);
			login(userInput, 0);
		};

		//for facebook login

		var refresh = function() {
			facebookConnectPlugin.api('/me', null,
				function (info) {
					//console.log(response);
					facebookConnectPlugin.api('/me?fields=picture.width(100).height(100)', null,
						function (photo) {
							var userInput = {email:info.email,password:'', userAccType:0};
							info['photo'] = photo.picture.data.url;
//							console.log(userInput);
							login(userInput,info);
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
		};

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
			};
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
					refresh();
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
								var userInput = {email_add:info.email,password:'', user_acc_type:0}
								info['photo'] = photo.picture.data.url
								console.log(userInput)
								login(userInput,info)
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
		console.log('In RegisterCtrl..');
		var accType=1;

		$scope.newUser = {};
		$scope.newUserAccount = {};

		//initialize inputs
		var initialize = function (){
			$scope.newUser.firstName = User.getFbInfo().firstName;
			$scope.newUser.lastName = User.getFbInfo().lastName;
			$scope.newUser.photo = User.getFbInfo().photo;
			$scope.newUser.gender = User.getFbInfo().gender || "male";
			$scope.newUser.userType = 0;


			$scope.cities = ['Baao', 'Balatan', 'Bato', 'Bombon', 'Buhi', 'Bula', 'Cabusao', 'Calabanga', 'Camaligan', 'Canaman', 'Caramoan', 'Del Gallego', 'Gainza',
				'Garchitorena', 'Goa', 'Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
				'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];
			$scope.newUser.city = $scope.cities[0];

			if(angular.equals({},User.getFbInfo()))
				$scope.newUser.userAccType = 1; //typical
			else{
				$scope.newUser.userAccType = 0; //FB
				accType = 0;
			}
		};
		$scope.addUserAccount = function (userAcc) {
//			console.log(userAcc);
			userAcc.userAccType = 1;
			UserAccount.setUserAccount(userAcc);
			$state.go('registerDetails');
		};

		$scope.addUser = function () {
			var userAccount = UserAccount.getUserAccount();
			var fbInfo = User.getFbInfo();

			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});

			if(accType==1){
				$scope.newUser.email =  userAccount.email;
				$scope.newUser.password = userAccount.confirm;
//				console.log($scope.newUser)
				//$scope.new_user.user_acc_type = user_account.user_acc_type
			}
			else{
				$scope.newUser.email =  fbInfo.email;
				//$scope.new_user.password = user_account.confirm
				//$scope.new_user.user_acc_type = user_account.user_acc_type
			}
			console.log($scope.newUser);

			User.addUser($scope.newUser).success(function (response) {
				console.log(response);
				//disable back button
				$ionicViewService.nextViewOptions({
					disableBack: true
				});
				$ionicLoading.hide();
				if(window.cordova)
				window.plugins.toast.showShortCenter('Registration successful! Please log in.')
				$state.go('login');
			})
		};

		$scope.cancel = function () {
			$state.go('login');
		};

		$scope.fbRegister = function () {
			$scope.newUser.userAccType = 0
		};

		//execute function
		initialize();

	})

	.controller('EditProfileCtrl', function ($scope,JobPost,$window, $state,$ionicModal, $ionicLoading, UserService, User, $cordovaCamera, SkilledLaborer) {
		console.log('In EditProfileCtrl..');

		$scope.capture = function(){
			console.log("Clicked!!");

			if(window.cordova){
				window.plugins.toast.showShortCenter('Getting Camera..')
				var options = {
					quality: 75,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 1024,
					targetHeight: 1024,
					saveToPhotoAlbum: false
				};

				/*var onSuccess = function(imageURI) {
					// if working, save to database
					$scope.$apply(function(){
						$scope.myPhoto = imageURI;
						console.log(imageURI);
					})
				};
				var onFail = function(message) {
					window.plugins.toast.showShortCenter(message)
				};*/

				navigator.camera.getPicture(onSuccess, onFail, options);
			}

		};

		var clearCache = function(){
			navigator.camera.cleanup();
		};

		var onSuccess = function(imageURI) {
			/*var win = function (r) {
				// if working, save to database
				console.log(r);*/
			$scope.$apply(function(){
				$scope.myPhoto = imageURI;
				console.log(imageURI);
			});

			//for upload
			/*var options = new FileUploadOptions();
			options.fileKey="ffile";
			options.fileName=$scope.myPhoto.substr($scope.myPhoto.lastIndexOf('/')+1);
			options.mimeType="image/jpeg";
			var params = {};
			params.other = obj.text; // some other POST fields
			options.params = params;

			//console.log("new imp: prepare upload now");
			var ft = new FileTransfer();
			ft.upload($scope.myPhoto, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
			function uploadSuccess(r) {
				// handle success like a message to the user
			}
			function uploadError(error) {
				//console.log("upload error source " + error.source);
				//console.log("upload error target " + error.target);
			}*/
				//clearCache();

				/*retries = 0;
				alert('Done!');*/
			//};

			/*var fail = function (error) {
				if (retries == 0) {
					retries ++;
					$timeout( function() {
						//simulate async response
						display();

						//Stop the ion-refresher from spinning
						$scope.$broadcast('scroll.refreshComplete');
					}, 1000);
					*//*setTimeout(function() {
						onSuccess(imageURI)
					}, 1000)*//*
				} else {
					retries = 0;
					clearCache();
					alert('Something went wrong!');
				}*/
			//};

/*			var option = new FileUploadOptions();
			option.fileKey = "file";
			option.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
			option.mimeType = "image/jpeg";
			option.params = {}; // if we need to send parameters to the server request
			var ft = new FileTransfer();

			ft.upload(imageURI, encodeURI("./img"), win, fail, option);*/
		};
		var onFail = function(message) {
			window.plugins.toast.showShortCenter(message)
		};


		$scope.selectPhoto = function(){
			console.log("Clicked!");

			if(window.cordova){
				//window.plugins.toast.showShortCenter('Loading Camera..')
				var options = {
					quality: 75,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 1024,
					targetHeight: 1024,
					saveToPhotoAlbum: false
				};
				navigator.camera.getPicture(onSuccess, onFail, options);
			}
		};

		//declare & initialize
		var user;
		var allSkills = [];
		var userSkills = [];

		var getCategories = function(){
			JobPost.getAllCategories().success(function(response){
//				$ionicLoading.hide()'
				if(!response)
					alert("Couldn't get categories.");
				else
//				console.log("AllSkills: ");
//				console.log(response);
					allSkills = response;
			});
		};

		var onLoad = function(){
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});
			user = UserService.getUser();
			console.log(user);
			//console.log('test')
			//console.log(user.acquired_skills)
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
			$scope.divHide = UserService.getUserType() == 0 ?true : false;
			$scope.editable = false;
			$scope.myPhoto = user.photo;
			$scope.info = user;
			$scope.userSkill = user.acquiredSkills;
			if(angular.isUndefined(user.title))
				$scope.info.title= "no title";
//			console.log($scope.userSkill);
			$scope.order = ['skill.category.categoryName', 'skill.skillName'];

			angular.forEach($scope.userSkill, function(skill){
				userSkills.push(skill.skill.skillId);
			});
			getCategories();
			$ionicLoading.hide();
		};

		//toggle editable for title
		$scope.toggleTitle= function(){
			$scope.editable = !$scope.editable;
			console.log($scope.editable);
			console.log($scope.info.title);
			if(!$scope.editable){
				User.updateTitle({'userId' : user.userId, 'title' : $scope.info.title}).success(function(response){
					UserService.updateObjectItem('user','title',response.title);
				});
			}
		};

		//Skills
		$scope.addSkill = function (){
			$scope.acquiredSkills = {};
			$ionicModal.fromTemplateUrl('templates/skill-set-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.skillsModal = modal;
				$scope.categories = allSkills;
				$scope.acquiredSkills.category = $scope.categories[0];

				$scope.skillSet = compare($scope.acquiredSkills.category.skills);
				$scope.predicate = 'categoryName';
				$scope.skillsModal.show();
			});
		};//end of addSkill

		var compare = function(allSkills){
			var userSkills = [];
			var skillSet=[];
			if(angular.equals($scope.userSkill.length,0)){
				angular.forEach(allSkills,function(skills){
					skills['checked']=false;
//					console.log(skills);
					skillSet.push(skills);
				});
			}
			else{
				angular.forEach($scope.userSkill, function(skill){
					userSkills.push(skill.skill.skillId);
				});

				angular.forEach(allSkills,function(skills,i){
					var end = false;
					angular.forEach(userSkills, function(userSkill,j){
						if(!angular.equals(userSkill, allSkills[i].skill_id)){
							if(j == userSkills.length-1 && end ==false){
	//							if(!skills.hasOwnProperty("checked"));
									skills['checked']=false;
								skillSet.push(skills);
							}
						}
						else
							end = true;
					});
				});
			}
			return skillSet;
		};

		$scope.deleteSkill = function(ac){
			console.log(ac);
			var idx = $scope.userSkill.indexOf(ac);
			// remove from DB
			User.removeASkill(ac.asId).success(function(response){
			 	console.log(response);
				SkilledLaborer.getAcquiredSkillsByUser(user.userId).success(function(ac){
					UserService.updateObjectItem('user','acquiredSkills',ac);
				});
				// remove from local array
				$scope.userSkill.splice(idx,1);
			 })
		};

		$scope.change = function(){
			$scope.skillSet = compare($scope.acquiredSkills.category.skills);
//			$scope.skillSet.checked=false;
			console.log($scope.skillSet);
		};

		$scope.addSkillSet = function(){
			$scope.closeSkillModal();
			var acquired = [];
			var data;
//			console.log("skill set");
//			console.log($scope.skillSet);
			angular.forEach($scope.skillSet, function(skill){
				if(skill.checked){
					acquired.push(skill.skill_id);
					skill.checked=false;
				}
			});
//			console.log(acquired);
			data= {'skillId': acquired, 'userId': user.userId};
//			console.log(data);
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 20
			});
			User.addSkill(data).success(function(){
				SkilledLaborer.getAcquiredSkillsByUser(user.userId).success(function(ac){
					var oldLength = user.acquiredSkills.length;
					UserService.updateObjectItem('user','acquiredSkills',ac);
//					console.log(ac);
					for(var i= oldLength; i<ac.length; i++){
						$scope.userSkill.push(ac[i]);
					}
					$ionicLoading.hide();
				});
			});
		};

		$scope.closeSkillModal = function(){
			$scope.skillsModal.hide();
		};

		//Certifications
		$scope.addCertification = function(){
			$scope.certification = {};
			$ionicModal.fromTemplateUrl('templates/certification-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.certificationsModal = modal;
				$scope.certification.type="Certificate of Competency";
				$scope.certificationsModal.show();
			});
		};

		$scope.closeModal = function(){
			$scope.certificationsModal.hide();
		};

		$scope.saveCertification = function(certification){
			certification.userId = user.userId;
			console.log(certification);
			User.addCertification(certification).success(function(response){
				console.log(response);
				$scope.certification.push(response);
			})
			$scope.closeModal();

		}

		//on load
		onLoad();
//		updateUserService();
	})

	.controller('SkilledLaborerCtrl', function ($scope, $ionicModal, $filter, $ionicLoading, $timeout, SkilledLaborer, JobPost, UserService, CachedData) {
		console.log('In SkilledLaborerCtrl..');
		$scope.skilledLaborerInfo = {};

		if(angular.equals({}, CachedData.getSL()) || CachedData.getSL().length==0){
			console.log("LOAD")
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});
		}
		//load page when pulled down
		$scope.doRefresh = function() {
			console.log('Refreshing!');
			$timeout( function() {
				//simulate async response
				display(1);

				//Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);

		};

		var display = function(param){
//			console.log((angular.equals({},CachedData.getSL)))

			if(angular.equals({},CachedData.getSL()) || param==1){
				SkilledLaborer.getSkilledLaborers().success(function (data) {
					$ionicLoading.hide();
					console.log(data);
					$scope.skilledLaborerInfo = data;
					CachedData.setSL(data);
				}).
					error(function () {
						alert("An error occurred. Cannot get skilled laborer info");
					});
			}
			else{
				console.log("ELSE");
				console.log(CachedData.getSL());
				$scope.skilledLaborerInfo = CachedData.getSL();
			}

			$ionicLoading.hide();
		};

		//view profile function
		$scope.viewProfile = function (info) {
			console.log(info);
			$scope.info = info;
			console.log(info.userId);

			$ionicModal.fromTemplateUrl('templates/profile-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.profileModal = modal;
				SkilledLaborer.getAcquiredSkillsByUser(info.userId).success(function(response){
					$scope.profileModal.show();
					info.acquiredSkills=response;
					$scope.info=info;
					console.log($scope.info);
				});
			});
		};

		$scope.sendJobOffer = function(slId){
			$scope.newJobPost = {};

            $ionicLoading.show({
                content: 'Loading...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });

			$ionicModal.fromTemplateUrl('templates/send-job-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.createJobPost = modal;
				JobPost.getAllCategories().success(function(response){
					$ionicLoading.hide();
					console.log(response);
					if(!response)
						alert("Couldn't get categories.");
					else{
						$scope.categories = response;
//						console.log(response[0].skills);
						$scope.newJobPost.category = $scope.categories[0];
						$scope.skills = $scope.newJobPost.category.skills;
						$scope.predicate = 'category_name';
						$scope.newJobPost.skill = $scope.skills[0];
					}
				});
				$scope.createJobPost.show();
			});
			$scope.newJobPost['slId'] = slId;
		};

		$scope.sendToSl = function(jobOffer){
			jobOffer['employerId']= UserService.getUser().userId;
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});
			jobOffer['skillId']= jobOffer.skill.skill_id;
			console.log(jobOffer);

			SkilledLaborer.sendJobOffer(jobOffer).success(function(response){
				$ionicLoading.hide();
				console.log(response);
				if(window.cordova)
				window.plugins.toast.showShortCenter('Job Offer Sent!');
			});
			$scope.createJobPost.hide();
		};
		$scope.change = function(){
			$scope.skills = $scope.newJobPost.category.skills;
			$scope.newJobPost.skill = $scope.skills[0];
		};
		display(0);
	})

	.controller('JobCtrl', function ($scope, $state, $ionicModal, $filter, $ionicLoading,$timeout, $ionicPopup, JobPost, UserService, Application, CachedData) {
		console.log('In JobCtrl..');
		var userType = UserService.getUserType();
		var userId = UserService.getUser().userId;
		var pending, cached = 0, refreshed =0;

		$scope.newJobPost = {};

		var navigateViewByUserType = function (param) {
			console.log("Param: " + param)
			console.log("navigate: refreshed= " + refreshed)

			if(angular.equals({}, CachedData.getJobPost()) || CachedData.getJobPost().length==0){
				console.log("LOAD")
				$ionicLoading.show({
					content: 'Loading...',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 50,
					showDelay: 0
				});
			}

			if (userType  == 0){ //employer
				console.log("employer");
				$scope.toggleEmployer = 'ng-hide';

				if((angular.equals({}, CachedData.getJobPost()) || param==1)){
					console.log("IN")
					JobPost.getMyPost(userId).success(function(response) {
//						$ionicLoading.hide();
						console.log("getMyJobPosts..");
						console.log(response);
						CachedData.setJobPost(response);
						displayJobPost(response);
					});
				}
				else
					displayJobPost(CachedData.getJobPost());
			}
			else if (userType  == 1){ //skilled-laborer
				$scope.toggleSl = 'ng-hide';

				console.log(angular.equals({}, CachedData.getJobPost()));

				if(angular.equals({}, CachedData.getJobPost()) || param==1){
					if(angular.equals({}, CachedData.getJobPost())){
						console.log("LOAD")
						$ionicLoading.show({
							content: 'Loading...',
							animation: 'fade-in',
							showBackdrop: false,
							maxWidth: 50,
							showDelay: 0
						});
					}
					JobPost.getAllJobPosts().success(function(response){

						console.log("getAllJobPosts..");
						console.log(response);
						CachedData.setJobPost(response);
						displayJobPost(response);
					}).
						error(function(err){
							console.log(err);

						});
//					$ionicLoading.hide();
				}
				else{
					displayJobPost(CachedData.getJobPost())
//					$scope.$apply(function(){
//						$scope.doRefresh();
//					});
				}
			}
			else{
				$scope.toggleStalker = 'ng-hide';
				if(angular.equals({}, CachedData.getJobPost())) {
					$ionicLoading.show({
						content: 'Loading...',
						animation: 'fade-in',
						showBackdrop: false,
						maxWidth: 50,
						showDelay: 0
					});
					JobPost.getAllJobPosts().success(function (response) {
						console.log(response);
						CachedData.setJobPost(response);
						displayJobPost(response);
					}).
						error(function (err) {
							console.log(err);
						});
				}
				else
					displayJobPost(CachedData.getJobPost());
			}
			console.log("CachedData.getJobPost()");
			console.log(CachedData.getJobPost())
//			$ionicLoading.hide();
		};

		var displayJobPost = function(jobPost){
			$scope.userType = userType;
			$ionicLoading.hide();
			var jobPosts;
			if(userType == 0)
				jobPosts=jobPost;
			else
				jobPosts =  pushJobPost(jobPost);

				angular.forEach(jobPosts, function(post){
					pending=0;
					var notif;
					post['header'] = post.status == 0 ? "bar-assertive" : "bar-positive";
					if(post.status == 0)/*{*/
						post['closed'] = 'ng-hide';
					post.datetimePosted= $filter('date')(post.datetimePosted, "d MMM yyyy ") + $filter('date')(post.datetimePosted, " hh:mm a");
					post['hasApplied']='Apply Job';

					//for skilled laborer
					angular.forEach(post.applications, function(application){
						//toggle for button's label
						if(application.user.userId==userId)
							post.hasApplied = 'Applied';
						else
							$scope.status= "Apply Job";

						//check for pending applications
						if(application.status==2)
							pending++;
					});

					//for employer
					post.applications['pending']=pending;
					post['notif'] = post.status ? "("+ pending + ")" : "";
				});
				console.log(jobPosts);
			$scope.jobPosts=jobPosts;
		};

		//load page when pulled down
		$scope.doRefresh = function() {
			console.log('Refreshing!');
			$timeout( function() {
				//simulate async response
//				CachedData.setJobPost({})
//				refreshed=1;

				navigateViewByUserType(1);

				//Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
			console.log("doRefresh: refreshed= " + refreshed)
		};

		var pushJobPost = function(jobPost){
			var jobPosts = [];
			var push;

			for(var i=0; i<jobPost.length; i++){
				push= false;

				if(jobPost[i].applications.length == 0){
					jobPosts.push(jobPost[i]);
					continue;
				}
				else{
					for(var j=0; j<jobPost[i].applications.length;j++){
						if((jobPost[i].applications[j].user.userId==userId && jobPost[i].applications[j].status == 2)){
							push= true;
							break;
						}
						else if(jobPost[i].applications[j].user.userId != userId && j== jobPost[i].applications.length-1)
							push= true;
						else
							push= false;
					}
				}
				if(push){
					jobPosts.push(jobPost[i]);
				}
			}
			return jobPosts;
		};

		$scope.openModal = function(){
            $ionicLoading.show({
                content: 'Loading...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });
			$ionicModal.fromTemplateUrl('templates/create-job-post-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.createJobPost = modal;
				JobPost.getAllCategories().success(function(response){
					$ionicLoading.hide();
					console.log(response);
					if(!response)
						alert("Couldn't get categories.");
					else{
						$scope.categories = response;
//						console.log(response[0].skills);
						$scope.newJobPost.category = $scope.categories[0];
						$scope.skills = $scope.newJobPost.category.skills;
						$scope.predicate = 'category_name';
						$scope.newJobPost.skill = $scope.skills[0];
					}
				});
				$scope.createJobPost.show();
			});

			$scope.change = function(){
				$scope.skills = $scope.newJobPost.category.skills;
				$scope.newJobPost.skill = $scope.skills[0];
			};

		};
		//add job post in service
		$scope.createNewJobPost = function (newJobPost) {
			var jobPost = {
				type: 0,
				description: newJobPost.description,
				location: newJobPost.location,
				skillId: newJobPost.skill.skill_id,
				userId: userId,
				requiredApplicant: newJobPost.required_applicant
			};
			console.log(jobPost);

			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});
			JobPost.saveJobPost(jobPost).success(function(response){
				$ionicLoading.hide();
				console.log(response);
				$scope.createJobPost.hide();
				//clean form input
				$scope.newJobPost = {};
				$scope.newJobPost.category = $scope.categories[0];
				$scope.jobPosts.unshift(response);
				navigateViewByUserType(1);
			});
		};

		//skilled laborer application to a job post
		$scope.applyUser = function(jobPost){
			console.log(jobPost);
			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirm Application?'
//				template: 'Apply?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					jobPost.hasApplied= 'Applied';
					var appInfo= {postingId: jobPost.postingId, userId: userId};
					JobPost.applyPosting(appInfo).success(function(response){
						console.log(response);
					})
						.error(function(err){
							console.log(err);
						});
				}
			});
		};

		$scope.viewApplicants= function(jobPost){
//			console.log(jobPost);
			Application.setApplication(jobPost);
			$state.go('tab.applicants');
		};

		$scope.evaluate = function(jobPost){
//			console.log(jobPost);
			Application.setApplication(jobPost);
			$state.go('tab.applicants');

		};

		//execute on load
		navigateViewByUserType(0);
		//onLoad();
	})
	.controller('ApplicantCtrl', function ($scope, $ionicModal, $filter, $window, $ionicLoading, JobPost, UserService, Application, SkilledLaborer) {
		console.log('In ApplicantCtrl..');
		var application = [];
		$scope.eval = false;
		$scope.evaluate = {};

		var onLoad = function(){
			// retrieve the application details in the database.. just get the appId

			application= Application.getApplication();

			console.log(application);

			angular.forEach(application.applications, function(app){
				app['clicked'] = false;
			})
			$scope.applications = application;

//			$scope.applications.applications.clicked = false;
			console.log('HERE')
			console.log(application);
//			if posting is closed and application status = 1
			if(application.status == 0){
				$scope.eval = true;
				$scope.max = 5;
				toggle();
			}
		};

		//
		var toggle = function(){
			var evaluation = {};
			//check if isEvaluated
			console.log("length: " + application.applications.length);
			angular.forEach(application.applications, function(app){
				console.log("AppID: " + app.appId);
				app.rating = 0;
				app.readOnly = 0;
				app.display = "ng-show";
//				app.buttonName
				if(app.isEvaluated){
					Application.getEvaluation(app.appId).success(function(response){

						console.log(response);
						angular.forEach(response, function(evaluation){
							app.rating = evaluation.rating;
							app.comment = evaluation.comment;
							app.readOnly = 1;
							app.buttonName = "Evaluated";
							console.log(evaluation.comment)
							if(evaluation.comment== null)
								app.display = "ng-hide";
						})

					});
				}
			})
			console.log(application)
		};

		//has error
		$scope.sendEvaluation = function(app,index){
			console.log(app);
			var comment;
			app.isEvaluated = true;

			if(angular.isUndefined(app.comment) || app.comment.length==0){
				app.display = "ng-hide";
				comment = null;
			}
			else{
				app.display = "ng-show";
				comment = app.comment.trim();
			}
			Application.sendEvaluation({appId: app.appId, rating: app.rating, comment: comment}).success(function(response){
			 	console.log(response)
				app.buttonName="Evaluated";
				app.readOnly=1;
			 })
		};

		//call function
		$scope.call = function (number) {
			document.location.href = "tel:" + number;
		 };

		$scope.viewProfile= function(user){
			Application.getApplicant(user.userId).success(function(response){
				$ionicModal.fromTemplateUrl('templates/profile-modal.html', {
					scope: $scope,
					animation: 'slide-in-right', //or slide-left-right-ios7
					focusFirstInput: true
				}).then(function (modal) {
					$scope.profileModal = modal;
						SkilledLaborer.getAcquiredSkillsByUser(user.userId).success(function(ac){
//							console.log(ac);
							$scope.profileModal.show();
							response[0].acquiredSkills=ac;
							$scope.info=response[0];
							console.log($scope.info);
					});
				});
			});
		};

		$scope.acceptApp = function(app, index){
			/*$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});*/
			console.log('Accepted!');
			console.log(app);
			var declinedApp = [];
			var declinedAppId=[];

			Application.acceptApplication(app.appId).success(function(response){
				console.log(response);
				$scope.applications.applications.pending -=1;
				app.clicked = true;
				if(application.hired + 1 == application.requiredApplicant){
					console.log(application);
					angular.forEach(application.applications, function(apps){
						if(apps.appId != app.appId && apps.status==2){
							Application.deleteApplication(apps.appId).success(function(response){
								console.log(response);
								$scope.applications.applications.splice($scope.applications.applications.indexOf(apps), 1);
							}).
								error(function(err){
									console.log(err)
							});
						}
					});
//					$ionicLoading.hide();
//					$window.history.back();
				}
			}).
				error(function(err){
					console.log(err)
				})
		};

		$scope.declineApp = function(app,index){
			console.log('Declined!');
			//delete application
			Application.deleteApplication(app.appId).success(function(response){
				console.log(response);
				$scope.applications.applications.splice(index+1, 1);
				$scope.applications.applications.pending -=1;
			}).
			error(function(err){
					console.log(err)
			});
		};
		//display on load
		onLoad();

	})
	.controller('SLApplicationCtrl', function ($scope, $ionicModal, $filter, $window, $ionicLoading, $ionicPopup, UserService, Application) {
		console.log('In SLApplicationCtrl..');
		var view = UserService.getView();
		var data;
		var userId = UserService.getUser().userId;

		var displayJob = function(jobs){
			$ionicLoading.hide();
			console.log("display job");
			console.log(jobs);
			$scope.jobs = jobs;
		};

		var toggleView = function(userView){
			if(userView == 0)
				$scope.acceptedApp = 'ng-hide';
			else
				$scope.jobOffer = 'ng-hide';
		};

		var navigateView = function(){
			$ionicLoading.show({
				content: 'Loading...',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 50,
				showDelay: 0
			});
			if(view ==0){
				data = {userId: userId, type: 0, status:1};
				$scope.title = "Accepted Application";
				//console.log(data);
				toggleView(view);
				Application.getSLApplication(data).success(function(response){
					displayJob(response);
				});
			}
			else /*if(view ==1) */{
				data = {userId: userId, type: 1, status:0};
				$scope.title = "Job Offer";
				//console.log(data)
				toggleView(view);
				Application.getSLApplication(data).success(function(response){
					console.log(response);
					displayJob(response);
				});
			}
			/*else{
				var vh = $ionicHistory.viewHistory();
				console.log("ELSE");
			}*/
		};
		$scope.call = function(cpNo){
			document.location.href = "tel:" + cpNo;
			console.log(cpNo)
		};
		$scope.acceptOffer = function(job){
			console.log(job)
			var confirmPopup = $ionicPopup.confirm({
				title: 'Accept Job Offer?'
//				template: 'Ac?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					console.log("Accepted");
					job.clicked = true;

					Application.acceptApplication(job.appId).success(function(response){
						console.log(response);
					});
				}
			});
		};
		$scope.declineOffer = function(job,index){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Decline Job Offer?'
//				template: 'Ac?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					console.log("Decline");
					console.log(job);
					job.clicked = true;
					//delete application
					Application.deleteApplication(job).success(function(response){
						console.log(response);
					}).
						error(function(err){
							console.log(err)
						});
					$scope.jobs.splice(index, 1);
					$scope.applications.applications.pending -=1;
				}
			});


		};

		navigateView();
	});/*
	.controller('JobOfferCtrl', function ($scope, $ionicModal, $filter, $window, $ionicLoading, JobPost, UserService, Application, SkilledLaborer) {

	});*/

