/**
 * Router - v1.0
 * Copyright 2018 Abel Brencsan
 * Released under the MIT License
 */

var Router = (function() {

	'use strict';

	var root = '/';
	var routes = [];
	var endsWithSlash = true;
	var isInitialized = false;

	/**
	 * Initialize router. It adds events related to handle routing. (public)
	 * @param options object
	 */
	var init = function(options) {
		if (isInitialized) return;
		if (typeof options == 'object') {
			if (typeof options.root == 'string') root = options.root;
			if (typeof options.endsWithSlash == 'boolean') endsWithSlash = options.endsWithSlash;
		}
		window.addEventListener('popstate', check);
		isInitialized = true;
		return this;
	};

	/**
	 * Add new route to router. (public)
	 * @param pattern object
	 * @param callback function
	 */
	var add = function(pattern, callback) {
		routes.push({ pattern: pattern, callback: callback });
		return this;
	};

	/**
	 * Remove route from router by given pattern. (public)
	 * @param pattern object
	 */
	var remove = function(pattern) {
		for (var i = 0; i < routes.length; i++) {
			if(routes[i].pattern.toString() === pattern.toString()) {
				routes.splice(i, 1);
				return this;
			}
		}
		return this;
	};

	/**
	 * Remove all routes from router. (public)
	 */
	var clear = function() {
		routes = [];
		return this;
	};

	/**
	 * Find route matched against path, call found one's callback function. (public)
	 * @param pathname string
	 */
	var check = function(pathname) {
		if (typeof pathname != 'string') {
			pathname = getPathname();
		}
		for (var i = 0; i < routes.length; i++) {
			var match = pathname.match(routes[i].pattern);
			if(match) {
				match.shift();
				routes[i].callback.call({}, pathname, match, routes[i].pattern);
				return this;
			}
		}
		return this;
	};

	/**
	 * Add path to the browser's session history stack, find route matched against path, call found one's callback function. (public)
	 * @param pathname string
	 */
	var navigate = function(pathname) {
		if (endsWithSlash && clearSlashes(pathname)) {
			pathname = root + clearSlashes(pathname) + '/';
		}
		else {
			pathname = root + clearSlashes(pathname);
		}
		history.pushState(null, null, pathname);
		check.call(this);
		return this;
	};

	/**
	 * Get all parameters from URL query. (public)
	 * @param query string
	 */
	var getParameters = function(query) {
		if (typeof query != 'string') {
			query = window.location.search.substring(1);
		}
		var qd = {};
		query.split('&').forEach(function(item) {
			var s = item.split('=');
			var k = s[0];
			var v = s[1] && decodeURIComponent(s[1]);
			(qd[k] = qd[k] || []).push(v);
		});
		return qd;
	};

	/**
	 * Get parameter from URL query by key. (public)
	 * @param key string
	 * @param query string
	 */
	var getParameterByKey = function(key, query) {
		if (typeof query != 'string') {
			query = window.location.search.substring(1);
		}
		var parameters = getParameters(query);
		return parameters[key];
	};

	/**
	 * Build URL query from given parameters. (public)
	 * @param parameters object
	 */
	var buildQuery = function(parameters) {
		var keys = Object.keys(parameters);
		var query = '';
		keys.forEach(function (key) {
			parameters[key].forEach(function(value) {
				if (value) {
					query += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
				}
			});
		});
		return query.slice(0, -1);
	};

	/**
	 * Destroy router. It removes all routes and related events. (public)
	 */
	var destroy = function() {
		if (!isInitialized) return;
		window.removeEventListener('popstate', check);
		clear();
		root = '/';
		endsWithSlash = true;
		isInitialized = false;
		return this;
	};

	/**
	 * Get current path. (private)
	 */
	var getPathname = function() {
		var pathname = '';
		pathname = clearSlashes(decodeURI(location.pathname));
		pathname = root != '/' ? pathname.replace(root, '') : pathname;
		return clearSlashes(pathname);
	};

	/**
	 * Remove slashes from the beginning and the end of path. (private)
	 * @param pathname string
	 */
	var clearSlashes = function(pathname) {
		return pathname.toString().replace(/\/$/, '').replace(/^\//, '');
	};

	return {
		init: init,
		add: add,
		remove: remove,
		clear: clear,
		check: check,
		navigate: navigate,
		getParameters: getParameters,
		getParameterByKey: getParameterByKey,
		buildQuery: buildQuery,
		destroy: destroy
	};

})();
