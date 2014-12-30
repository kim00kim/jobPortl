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
		$scope.user=[
			{email:"me@domain.com", password: "12345"},
			{email:"you@domain.com", password: "12345"}];

		$scope.skipLogin=function($scope){
			$state.go('tab.job-post');
		}
		$scope.signUp=function($scope){
			$state.go('signUp');
		}
	})

	.controller('SignupCtrl', function ($scope) {
		$scope.cities=['Baao', 'Balatan', 'Bato', 'Bombon','Buhi','Bula','Cabusao', 'Calabanga', 'Camaligan','Canaman','Caramoan','Del Gallego','Gainza',
						'Garchitorena', 'Goa','Iriga City', 'Lagonoy', 'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac', 'Nabua', 'Naga City', 'Ocampo',
						'Pamplona', 'Pasacao', 'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'];

		$scope.city=$scope.cities[0];

	})

	.controller('SkilledLaborerCtrl', function ($scope) {

	})

	.controller('JobCtrl', function ($scope) {
		$scope.categories=[
			{ category_id: 0, category_name: 'Furniture Maker'},
			{ category_id: 1, category_name: 'Plumbing Services'}
		]

		$scope.jobPost=[
			{ job_id: 0, title: 'Job Title1', description: 'Blah Blah', location: 'Naga City', category: 'Furniture Maker', employer: 'John Doe' },
			{ job_id: 1, title: 'Job Title2', description: 'Blah Blah', location: 'Nabua', category: 'Plumbing Services', employer: 'Anna Smith' }]
	})

