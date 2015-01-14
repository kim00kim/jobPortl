angular.module('jobPortl.services', [])

	.factory('UserService', function(){
		var user_info= {
			isLogged : false,
			user_email : '',
			user_id : '',
			user_name : '',
			user_type : ''
		}
		return {
			getUserInfo: function (user_id){
				user_info.isLogged = true;
				user_info.user_type = 0
				return user_info.user_type;
			}
		}
	})


	.factory('User_Account', function () {
		var user_account=[
			{ user_acct_id: 2, email: 'me@domain.com', password: '1234', user_acct_type: 'typical', user_id: 0, user_type: 0},
			{ user_acct_id: 3, email: 'you@domain.com', password: '1234', user_acct_type: 'typical', user_id: 1, user_type: 1}
		];

		return {
			checkUser: function (userInput) {
				console.log(user_account)
				console.log("Email & password: " +userInput.emailAdd + userInput.passwrd)

				// 0 = doesnt have an account; 1 = wrong password
				var result = 0;
				for (var i = 0; i < user_account.length; i++) {
					var exists= angular.equals(userInput.emailAdd, user_account[i].email)
					if(exists){
						var checkPassword = angular.equals(userInput.passwrd, user_account[i].password)
						if(!checkPassword){
							result= 1;
						}
						else{
							result = user_account[i].user_acct_id;
							break;
						}

					}
				}
				return result;
			}
		}

	})

	.factory('JobPost', function () {
		// Some fake testing data
		var jobPosts = [
			{ job_id: 0, title: 'Job Title1', description: 'Description Blah Blah Description Blah Blah Description Blah Blah Description Blah Blah', location: 'Naga City', category: 'Furniture Maker', employer: 'John Doe', datetimePosted: '5 Jan 2015 at 8:00pm' },
			{ job_id: 1, title: 'Job Title2', description: 'Blah Blah', location: 'Nabua', category: 'Plumbing Services', employer: 'Anna Smith', datetimePosted: '5 Jan 2015 8:00pm' },
			{ job_id: 2, title: 'Job Title3', description: 'Another Blah Blah', location: 'Iriga City', category: 'Plumbing Services', employer: 'Juan dela Cruz', datetimePosted: '5 Jan 2015 8:00pm' }

		];

		var category= [
			{ category_id: 0, category_name: 'Furniture Maker'},
			{ category_id: 1, category_name: 'Plumbing Services'}
		];

		return {
			all: function () {
				return jobPosts;
			},
			allCategories: function () {
				return category;
			}
		}
	})

	.factory('SkilledLaborer', function ($http) {

		return{
			getSkilledLaborers:function(){
				return $http.get('skilled_laborer.json')
			}
		}
	})