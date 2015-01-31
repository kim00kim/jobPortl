/**
 * Created by Kim on 1/13/15.
 */
angular.module('jobPortl.directives', [])

	.directive('match', function ($parse) {
		return {
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				scope.$watch(function () {
					return $parse(attrs.match)(scope) === ctrl.$modelValue;
				}, function (currentValue) {
					ctrl.$setValidity('mismatch', currentValue);
				});
			}
		};
	});