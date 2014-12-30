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
	})

