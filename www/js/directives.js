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
	})

	/*.directive('camera', function(Camera) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {


				elm.on('click', function() {
					navigator.camera.getPicture(function (imageURI) {
						scope.$apply(function() {
							ctrl.$setViewValue(imageURI);
						});
					}, function (err) {
						ctrl.$setValidity('error', false);
					}, {
						quality : 50,
						destinationType : Camera.DestinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
						allowEdit : true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 100,
						targetHeight: 100,
						//popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: false
					})
				});
			}
		};
	})*/

	.directive("contenteditable", function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(scope, element, attrs, ngModel) {

				function read() {
					ngModel.$setViewValue(element.html());
				}

				ngModel.$render = function() {
					element.html(ngModel.$viewValue || "");
				};

				element.bind("blur keyup change", function() {
					scope.$apply(read);
				});
			}
		};
	});