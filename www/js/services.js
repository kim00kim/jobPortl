angular.module('jobPortl.services', [])

	.constant('baseUrl', 'http://127.0.0.1/jobportl/web/api/')

	.factory('UserService', function(){
/*		var user_info= [{
			is_logged : false,
			user_email : '',
			user_id : '',
			user_first_name : '',
			user_last_name : '',
			user_type : '',
			gender : '',
			birthdate : '',
			user_profile: ''
		}]*/
		return {
			is_logged : false,
			user_email : '',
			user_id : '',
			user_first_name : '',
			user_last_name : '',
			user_type : '',
			gender : '',
			birthdate : '',
			user_profile: '',
			user_acct_type: '',
			fb_id: '',
			is_limited: true

			/*getUserInfo: function (user_id){
				user_info.is_logged = true;
				user_info.user_type = 0
				return user_info.user_type;*/
			}
	})

	/*.factory('Camera', ['$q', function($q) {

		return {
			getPicture: function(options) {
				var q = $q.defer();

				navigator.camera.getPicture(function(result) {
					// Do any magic you need
					q.resolve(result);
				}, function(err) {
					q.reject(err);
				}, options);

				return q.promise;
			}
		}
	}])*/

	.factory('UserAccount', function ($http, baseUrl) {
		var user_account= new Object();

		return {
			checkUser: function (user_input) {
//				console.log(user_account)
				console.log("Email & password: " +user_input.email_add + user_input.password)
				return $http({method: "POST", url: baseUrl+ 'users', data: user_input})
//				return $http.get('http://127.0.0.1/jobportl/web/api/usercredentials/'+ user_input)
				// 0 = doesnt have an account; 1 = wrong password
				/*var result = 0;
				for (var i = 0; i < user_account.length; i++) {
					var exists= angular.equals(user_input.email, user_account[i].email)
					if(exists){
						var check_password = angular.equals(user_input.passwrd, user_account[i].password)
						if(!check_password){
							result= 1;
						}
						else{
							result = user_account[i].user_acct_id;
							break;
						}

					}
				}
				return result;*/
			},
			setUserAccount: function(user_acc) {
				user_account=user_acc
			},
			getUserAccount: function() {
				return user_account
			}
		}

	})

	.factory('User', function ($http, baseUrl) {
		return {
			addUser: function(user) {
				console.log(user)
				return $http({method: "POST", url: baseUrl+'addusers', data: user})
			}
		}
	})

	.factory('JobPost', function ($http) {
		// Some fake testing data
		var job_posts = [
			{ job_id: 0, title: 'Job Title1', description: 'Description Blah Blah Description Blah Blah Description Blah Blah Description Blah Blah', location: 'Naga City', category: 'Furniture Maker', employer: 'John Doe', datetime_posted: '5 Jan 2015 at 8:00pm' },
			{ job_id: 1, title: 'Job Title2', description: 'Blah Blah', location: 'Nabua', category: 'Plumbing Services', employer: 'Anna Smith', datetime_posted: '5 Jan 2015 8:00pm' },
			{ job_id: 2, title: 'Job Title3', description: 'Another Blah Blah', location: 'Iriga City', category: 'Plumbing Services', employer: 'Juan dela Cruz', datetime_posted: '5 Jan 2015 8:00pm' }
		];

		var category= [
			{ category_id: 0, category_name: 'Furniture Maker'},
			{ category_id: 1, category_name: 'Plumbing Services'}
		];

		return {
			all: function () {
				// return $http.get('http://jobprtl.com/api/post/all');

				// // PHP Rest API Controller
				// function getPostsAllAction() {
				// 	myOrm.posts.getAll();
				// }
				return job_posts;
			},
			allCategories: function () {
				return category;
			}
		}
	})

	.factory('SkilledLaborer', function ($http) {
		return{
			getSkilledLaborers:function(){
				return $http.get('skilled_laborer.json');
			}
		}
	})