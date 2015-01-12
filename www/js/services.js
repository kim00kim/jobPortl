angular.module('jobPortl.services', [])

//	.factory()


	.factory('User_Account', function () {
		var user_account=[
			{ user_acct_id: 0, email: 'me@domain.com', password: '1234', user_acct_type: 'typical', user_id: 0, user_type: 0},
			{ user_acct_id: 1, email: 'you@domain.com', password: '1234', user_acct_type: 'typical', user_id: 1, user_type: 1}
		];

		return {
			authenticate: function (email,password) {
				// Simple index lookup
				console.log("Email & password: " +email + password)
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