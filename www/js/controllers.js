angular.module('jobPortl.controllers', [])

	.config(function($compileProvider){
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	})

	.controller('AccountCtrl', function ($scope, $localForage) {
		$localForage.getItem('user').then(function(data) {
			$scope.id = data.user_id;
			$scope.status = data.is_logged_in;
			$scope.user_acc_type = data.user_acc_type,
			$scope.user_type= data.user_type,
			$scope.email= data.email,
			$scope.first_name= data.first_name,
			$scope.last_name= data.last_name
			console.log(data)
		});
	})

    .controller('ToggleUserCtrl', function($scope, $localForage){
        $localForage.getItem('user').then(function(data){
            //$scope.toggle_user= data
            if (data == 0) { //employer
                $scope.toggle_employer = 'ng-hide'
                // return "ng-show";
            } else if($scope.user_type == 1) { //skilled-laborer
                // return "ng-hide";
                $scope.toggle_sl= 'ng-hide'
            }
            else{
                $scope.toggle_sl = 'ng-show'
                $scope.toggle_employer = 'ng-show'
            }
        })
    })

    .controller('AbstractTabCtrl', function($scope) {
        $scope.$on('$ionicView.loaded', function () {
            console.log('TesterCtrl');
        })
    })

	.controller('LoginCtrl', function ($scope, $state, $rootScope, UserAccount, UserService) {
		$scope.user_input= {}
//		$scope.isLimited = false;

		$scope.skipLogin=function($scope){
			$state.go('tab.job-post');
		}
		$scope.register=function(){
			$state.go('registerLogin');
		}

		$scope.login=function(user_input){
			console.log(user_input)
			UserAccount.checkUser(user_input).success(function(response){
				console.log(response)
				if(!response){
					alert("Incorrect email and password!")
				}
				else{
					alert("Logged in successfully!")
					UserService.setUser(response)
					$state.go('tab.account')
				}
			})
			.error(function(err){
				alert(err)
			})
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
						},
						function(error) {
							console.log(error);
						}
					);
					facebookConnectPlugin.api('/me/picture', null,
						function(response) {
//                            UserService.user_profile = response.data.url;
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


	.controller('RegisterCtrl', function ($scope, $state, $window, UserAccount, User, $ionicViewService) {
		$scope.new_user={}
		$scope.new_user_account={}

		$scope.cities=['Baao', 'Balatan', 'Bato', 'Bombon','Buhi','Bula','Cabusao', 'Calabanga', 'Camaligan','Canaman','Caramoan','Del Gallego','Gainza',
						'Garchitorena', 'Goa','Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
						'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];

		$scope.new_user.city=$scope.cities[0];
		$scope.new_user.user_type = 0
		$scope.new_user.gender= "m"

		$scope.addUser = function(){
			var user_account= UserAccount.getUserAccount()
			$scope.new_user.email= user_account.email
			$scope.new_user.password= user_account.confirm
			$scope.new_user.user_acc_type= user_account.user_acc_type
			User.addUser($scope.new_user).success(function () {
				alert("Success!")
				//disable back button
				$ionicViewService.nextViewOptions({
					disableBack: true
				});
				$state.go('login')
			});
		}
		$scope.addUserAccount = function(user_acc){
			user_acc.user_acc_type= 1
			UserAccount.setUserAccount(user_acc)
			$state.go('registerDetails');

		}
		$scope.cancel= function(){
			$window.history.back();
		}

		$scope.fbRegister = function(){
			user_acc.user_acc_type= 0
			facebookConnectPlugin.api('/me', null,
				function(response) {
					console.log(response);
				},
				function(error) {
					console.log(error);
				}
			);
			facebookConnectPlugin.api('/me/picture', null,
				function(response) {
//					UserService.user_profile = response.data.url;
				},
				function(error) {
					console.log(error);
				}
			);
		}
	})

	.controller('EditProfileCtrl', function ($scope, Camera) {
		$scope.lastPhoto = "img/blank.png"
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

	.controller('SkilledLaborerCtrl', function ($scope, $ionicModal, $filter, SkilledLaborer/*, $localstorage*/) {
		$scope.skilled_laborer_info= {}


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
				$scope.skilled_laborer_info = data;
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

	.controller('JobCtrl', function ($scope, $ionicModal, $filter, JobPost) {
		$scope.new_job_post={};

		//get current date and time
		var datenow= new Date();
		datenow = $filter('date')(datenow, "EEE d MMM yyyy ") + "at" + $filter('date')(datenow, " hh:mm a");

		$scope.job_posts=JobPost.all();
		console.log($scope.job_posts)

		$ionicModal.fromTemplateUrl('templates/create-job-post-modal.html', {
			scope: $scope,
			animation: 'slide-in-right' //or slide-left-right-ios7
		}).then(function(modal) {
			$scope.createJobPost = modal;
			$scope.categories= JobPost.allCategories();
			$scope.new_job_post.category=$scope.categories[0];
		});

		//add job post in service
		$scope.createNewJobPost = function(new_job_post) {
			$scope.job_posts.push({ job_id: 3, title: new_job_post.title, description: new_job_post.description, location: new_job_post.location, category: new_job_post.category.category_name, employer: 'New Employer', datetime_posted: datenow });
			$scope.createJobPost.hide();
			//clean form input
			$scope.new_job_post= {};
			$scope.new_job_post.category= $scope.categories[0];
			alert("New job post successfully created!")
		};
	})

