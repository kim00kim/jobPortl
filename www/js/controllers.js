angular.module('jobPortl.controllers', [])

	.controller('DashCtrl', function ($scope) {
	})

	.controller('FriendsCtrl', function ($scope, Friends) {
		$scope.friends = Friends.all();
	})

	.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
		$scope.friend = Friends.get($stateParams.friendId);
	})

	.controller('AccountCtrl', function ($scope) {
	})

	.controller('LoginCtrl', function ($scope, $state) {
		$scope.skipLogin=function($scope){
			$state.go('tab.job-post');
		}
		$scope.signUp=function($scope){
			$state.go('signUp');
		}
	})

	.controller('SignupCtrl', function ($scope, $state) {

	});