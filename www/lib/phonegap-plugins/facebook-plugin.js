angular.module('facebook', [])

	.constant('facebookInit', function (facebookAppID) {

		var initialized = false;

		return function ($q) {

			if (initialized) {
				return;
			}

			var deferred = $q.defer();

			if (window.cordova) {
				ionic.Platform.ready(function () {
					console.log('ionic.Platform.ready');

					initialized = true;
					deferred.resolve();
				});
			} else {
				window.fbAsyncInit = function () {
					FB.init({
						appId: facebookAppID,
						cookie: true,
						xfbml: true,
						version: 'v2.0'
					});
					console.log('FB javascript SDK initialized');

					initialized = true;
					deferred.resolve();
				};

				(function () {
					if (!window.FB) {
						console.debug("launching FB SDK");
						var e = document.createElement('script');

						e.src = document.location.protocol + '//connect.facebook.net/en_US/sdk.js';

						e.async = true;
						document.getElementById('fb-root').appendChild(e);
					}
				}());
			}

			return deferred.promise;
		};
	})

	.factory('facebook', function () {
//    var console = logFactory('FB');

		if (window.cordova) {
			console.debug('Running as a Cordova app, returning FB Cordova plugin');
			return window.facebookConnectPlugin;
		} else {
			console.debug('Running as a non-Cordova app. Returning a wrapper around FB web API');

			// Adapted slightly from: https://github.com/Wizcorp/phonegap-facebook-plugin/blob/master/www/js/facebookConnectPlugin.js
			return {

				getLoginStatus: function (s, f) {
					// Try will catch errors when SDK has not been init
					try {
						FB.getLoginStatus(function (response) {
							s(response);
						});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},

				showDialog: function (options, s, f) {

					if (!options.name) {
						options.name = "";
					}
					if (!options.message) {
						options.message = "";
					}
					if (!options.caption) {
						options.caption = "";
					}
					if (!options.description) {
						options.description = "";
					}
					if (!options.link) {
						options.link = "";
					}
					if (!options.picture) {
						options.picture = "";
					}

					// Try will catch errors when SDK has not been init
					try {
						FB.ui({
								method: options.method,
								message: options.message,
								name: options.name,
								caption: options.caption,
								description: (
									options.description
								),
								link: options.link,
								picture: options.picture
							},
							function (response) {
								if (response && response.request) {
									s(response);
								} else {
									f(response);
								}
							});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},
				// Attach this to a UI element, this requires user interaction.
				login: function (permissions, s, f) {
					// JS SDK takes an object here but the native SDKs use array.
					var permissionObj = {};
					if (permissions && permissions.length > 0) {
						permissionObj.scope = permissions.toString();
					}

					FB.login(function (response) {
						if (response.authResponse) {
							s(response);
						} else {
							f(response.status);
						}
					}, permissionObj);
					alert("Permission: " + permissionObj)
				},

				getAccessToken: function (s, f) {
					var response = FB.getAccessToken();
					if (!response) {
						if (!f) {
							console.error("NO_TOKEN");
						} else {
							f("NO_TOKEN");
						}
					} else {
						s(response);
					}
				},

				logEvent: function (eventName, params, valueToSum, s, f) {
					// AppEvents are not avaliable in JS.
					s();
				},

				logPurchase: function (value, currency, s, f) {
					// AppEvents are not avaliable in JS.
					s();
				},

				logout: function (s, f) {
					// Try will catch errors when SDK has not been init
					try {
						FB.logout(function (response) {
							s(response);
						})
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},

				api: function (graphPath, permissions, s, f) {
					// JS API does not take additional permissions

					// Try will catch errors when SDK has not been init
					try {
						FB.api(graphPath, function (response) {
							if (response.error) {
								f(response);
							} else {
								s(response);
							}
						});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				}
			};
		}
	});