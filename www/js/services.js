angular.module('jobPortl.services', [])

	.constant('baseUrl', 'http://192.168.1.7/jobportl/web/api/')

	.factory('$localstorage', ['$window', function ($window) {
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
			}
		}
	}])

	.factory('UserService', function ($localstorage) {
		return {
			setUserType: function (response) {
				$localstorage.set('user_type', response)
			},
			setUser: function (response) {
				$localstorage.setObject('user',
					{
						user_id: response.user.user_id,
						is_logged_in: 1,
						user_acc_type: response.user_acc_type,
						email: response.email,
						first_name: response.user.first_name,
						last_name: response.user.last_name,
						address: response.user.address,
						city_mun: response.user.city_mun,
						gender: response.user.gender,
						birthdate: response.user.birthdate,
						cpno: response.user.cpno,
						has_verified_num: response.user.has_verified_number,
						photo: response.user.photo,
						gender: response.user.gender,
						zipcode: response.user.zipcode
					})
			},
			getUserType: function () {
				return $localstorage.get('user_type')
			},
			getUser: function () {
				return $localstorage.getObject('user')
			},
			clearStorage: function () {
				localStorage.clear()
			}
		}
	})

	.factory('Camera', ['$q', function ($q) {

		return {
			getPicture: function (options) {
				var q = $q.defer();

				navigator.camera.getPicture(function (result) {
					// Do any magic you need
					q.resolve(result);
				}, function (err) {
					q.reject(err);
				}, options);

				return q.promise;
			}
		}
	}])

	.factory('UserAccount', function ($http, baseUrl) {
		var user_account = new Object();
		return {
			checkUser: function (user_input) {
				console.log("Email & password : " + user_input.email_add + user_input.password + " type: " + user_input.user_acc_type)
				return $http({method: "POST", url: baseUrl + 'users', data: user_input})
			},
			setUserAccount: function (user_acc) {
				user_account = user_acc
			},
			getUserAccount: function () {
				return user_account
			}
		}

	})

	.factory('User', function ($http, baseUrl) {
		var fb_info = new Object()

		return {
			addUser: function (user) {
				console.log(user)
				return $http({method: "POST", url: baseUrl + 'addusers', data: user})
			},
			setFbInfo : function (info){
				fb_info= info
			},
			getFbInfo: function () {
				return fb_info
			}

		}
	})

	.factory('JobPost', function ($http, baseUrl) {
		return {
			all: function () {
				return $http.get('job_post.json');
			},
			getAllCategories: function () {
				return $http({method: "GET", url: baseUrl + 'allcategories'})
			},
			getMyPost: function(user_id){
				console.log(baseUrl + 'jobpostbyusers')
//				return 1
				return $http({method: "GET", url: baseUrl + 'jobpostbyusers/'+ user_id})
			},
			saveJobPost: function (job_post){
				return $http({method: "POST", url: baseUrl + 'addjobposts', data: job_post})
			}
		}
	})

	.factory('SkilledLaborer', function ($http) {
		return {
			getSkilledLaborers: function () {
				return $http.get('skilled_laborer.json');
			}
		}
	})