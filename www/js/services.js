angular.module('jobPortl.services', [])

/**
 * A simple example service that returns some data.
 */
	.factory('Friends', function () {
		// Might use a resource here that returns a JSON array

		// Some fake testing data
		var friends = [
			{ id: 0, name: 'Scruff McGruff' },
			{ id: 1, name: 'G.I. Joe' },
			{ id: 2, name: 'Miss Frizzle' },
			{ id: 3, name: 'Ash Ketchum' }
		];

		return {
			all: function () {
				return friends;
			},
			get: function (friendId) {
				// Simple index lookup
				return friends[friendId];
			}
		}
	})

	.factory('User_Account', function () {
		var user_account=[
			{ user_acct_id: 0, email: 'me@domain.com', password: '1234', user_acct_type: 'typical', user_id: 0, user_type: 0},
			{ user_acct_id: 1, email: 'you@domain.com', password: '1234', user_acct_type: 'typical', user_id: 1, user_type: 1}
		];

		return {
			authenticate: function (email,password) {
				// Simple index lookup
//				return friends[friendId];
				console.log(email + password)
			}
		}

	})

	.factory('JobPost', function () {
		// Might use a resource here that returns a JSON array

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
		// Might use a resource here that returns a JSON array
		// Some fake testing data
		return{
				getSkilledLaborers:function(){
					return $http.get('/dummies/skilled_laborer.json')
				}
		}
	})