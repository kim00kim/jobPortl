angular.module('jobPortl.services', [])

	.constant('baseUrl', 'http://jobportl.esy.es/Backend/web/api/')

	.factory('$localStorage', ['$window', function ($window) {
		return {
			set: function (key, value) {
				$window.localStorage[key] = value;
			},
			get: function (key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function (key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function (key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			updateObjectItem: function(obj, key, value) {
				var object = JSON.parse($window.localStorage[obj]);
				object[key] = value;
				$window.localStorage[obj] = JSON.stringify(object);
			},
			removeItem: function (key){
				$window.localStorage.removeItem(key);
			}
		};
	}])

	.factory('CachedData', function($localStorage){
		return {
			setJobPost: function(jobPost){
				$localStorage.setObject('jobPost', jobPost);
			},
			getJobPost: function(){
				return $localStorage.getObject('jobPost');
			},
			removeKey: function(key){
				$localStorage.removeItem(key);
			},
			clearStorage: function () {
				localStorage.clear()
			},
			setSL: function(skilledLaborer){
				$localStorage.setObject('sl', skilledLaborer);
			},
			getSL: function(){
				return $localStorage.getObject('sl');
			}
		}
	})

	.factory('UserService', function ($localStorage) {
        var view; // if 0 = job post, if 1 = accepted app, if 2= sent job offer
		return {
			setUserType: function (response) {
				$localStorage.set('userType', response)
			},
			setUser: function (response) {
				$localStorage.setObject('user',
					{
						userId: response.user.user_id,
						userAccId: response.user_acc_id,
						isLoggedIn: 1,
						userAccType: response.user_acc_type,
						email: response.email,
						firstName: response.user.first_name,
						lastName: response.user.last_name,
						address: response.user.address,
						cityMun: response.user.city_mun,
						birthdate: response.user.birthdate,
						cpno: response.user.cpno,
						hasVerifiedNum: response.user.has_verified_number,
						photo: response.user.photo,
						gender: response.user.gender,
						applications: response.user.applications,
						acquiredSkills: response.user.acquired_skills,
						certifications: response.user.certifications,
						evaluations: response.user.evaluations,
						title: response.user.title
					})
			},
			updateObjectItem: function(obj, key, value){
				$localStorage.updateObjectItem(obj,key, value)
			},
			getUserType: function () {
				return $localStorage.get('userType')
			},
			getUser: function () {
				return $localStorage.getObject('user')
			},
			clearStorage: function () {
				localStorage.clear()
			},
			removeKey: function(key){
				$localStorage.removeItem(key)
			},
            setView: function(userView){
                view = userView
            },
            getView: function(){
                return view
            }
		}
	})

	.factory('UserAccount', function (baseUrl, $http) {
		var userAccount = {};
		return {
			checkUser: function (userInput) {
				console.log("Email & password : " + userInput.email + userInput.password + " type: " + userInput.userAccType);
				return $http({method: "POST", url: baseUrl + 'users', data: userInput});
			},
			setUserAccount: function (userAcc) {
				userAccount = userAcc;
			},
			getUserAccount: function () {
				return userAccount;
			}
		}

	})

	.factory('User', function ($http, baseUrl) {
		var fbInfo ={};

		return {
			addUser: function (user) {
				console.log(user);
				return $http({method: "POST", url: baseUrl + 'addusers', data: user})
			},
			setFbInfo : function (info){
				fbInfo= info
			},
			getFbInfo: function () {
				return fbInfo
			},
			addSkill: function(acquiredSkill){
				return $http({method: "POST", url: baseUrl + 'acquiredskills', data: acquiredSkill})
			},
			updateTitle: function(userInfo){
				return $http({method: "POST", url: baseUrl + 'updatetitles', data: userInfo})
			},
			/*getUpdatedUser: function(userId){
				return $http({method: "GET", url: baseUrl + 'updateduserinfos/'+ userId})
			},*/
			removeASkill: function(acquiredSkill){
				return $http({method: "DELETE", url: baseUrl + 'removeskills/'+ acquiredSkill})
			},
			addCertification: function(certification){
				return $http({method: "POST", url: baseUrl + 'certifications', data: certification})
			},
			savePhoto: function(photo){
				console.log(photo);
			}
		}
	})

	.factory('JobPost', function ($http, baseUrl) {
		var jobPost = {}
		return {
			getAllJobPosts: function () {
				return $http({method: "GET", url: baseUrl + 'alljobpost'})
			},
			getAllCategories: function () {
				return $http({method: "GET", url: baseUrl + 'allcategories'})
			},
			getMyPost: function(userId){
				console.log("Services")
				return $http({method: "GET", url: baseUrl + 'jobpostbyusers/'+ userId})
			},
			saveJobPost: function (jobPost){
				return $http({method: "POST", url: baseUrl + 'addjobposts', data: jobPost})
			},
			applyPosting: function(appInfo){
				return $http({method: "POST", url: baseUrl + 'applypostings', data: appInfo})
			}
		}
	})

	.factory('SkilledLaborer', function ($http, baseUrl) {
		return {
			getSkilledLaborers: function () {
				return $http({method: "GET", url: baseUrl + 'skilledlaborer'})
			},
			getAcquiredSkillsByUser: function(userId){
				return $http({method: "GET", url: baseUrl + 'acquiredskillbyusers/' + userId})
			},
			sendJobOffer: function(jobOffer){
				return $http({method: "POST", url: baseUrl + 'sendjoboffers', data: jobOffer})
			},
			getCertifications: function (userId) {
				return $http({method: "GET", url: baseUrl + 'certifications/' + userId})
			}
		}
	})

	.factory('Application', function($http, baseUrl){
		var application = [];

		return{
			setApplication: function(jobPost){
				application = jobPost;
			},
			getApplication: function(){
				return application;
			},
			getApplicant: function(userId){
				return $http({method: "GET", url: baseUrl + 'skilledlaborerbyids/' + userId});
			},
			deleteApplication: function(appId){
				return $http({method: "DELETE", url: baseUrl + 'declineapplications/' + appId});
			},
			acceptApplication: function(appId){
				return $http({method: "POST", url: baseUrl + 'acceptapplications/' + appId});
			},
			getSLApplication: function(data){
				return $http({method: "POST", url: baseUrl + 'slapplications', data: data});
			},
			sendEvaluation: function(data){
				return $http({method: "POST", url: baseUrl + 'saveevaluations', data: data});
			},
			getEvaluation: function(appId){
				return $http({method: "GET", url: baseUrl + 'evaluations/' + appId });
			}
		}
	});