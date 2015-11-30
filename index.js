var path = require('upath');
var _ = require('underscore');

/**
 * Creates a new `RouteRegistry` instance.
 * @param {Object} blueprintRegistry An instance of the module `sails-hook-drafter`.
 * @param {Object} config A configuration hash.
 * @param {String} [options.prefix] The blueprint prefix.
 * @param {String} [options.restPrefix] The blueprint restPrefix.
 */
function RouteRegistry(blueprintRegistry, config){
	this.config = _.defaults(config, {
		prefix: '',
		restPrefix: ''
	});
	this.blueprintRegistry = blueprintRegistry;

	var routes = this._routes = {};

	/**
	 * @var {Object} A mapping from route method and url to route information.
	 * @name routes
	 */
	Object.defineProperty(this, 'routes', {
		get: function(){
			return routes;
		}
	});
}

RouteRegistry.prototype = {
	/**
	 * Registers a set of blueprint routes.
	 * @param  {String} url        The base URL for the blueprint routes.
	 * @param  {String} controller The controller ID.
	 * @param  {String} modelId    The model ID.
	 */
	blueprint: function(url, controller, modelId){
		this.blueprintRegistry.register(path.join('/', this.config.prefix, this.config.restPrefix, url), controller.toLowerCase(), modelId.toLowerCase());
	},

	/**
	 * Uses `config.prefix` and `config.restPrefix` to register the given route.
	 * @param  {String} url         The URL pattern to match. 
	 * @param  {String|Object} destination The destination route. Either a string specifying controller name/action or a config object.
	 * @param  {String} [method]      The method, e.g. 'get'. By default, all methods are routed.
	 */
	api: function(url, destination, method){
		this.routes[(method ? (method + ' ') : '') + path.join('/', this.config.prefix, this.config.restPrefix, url)] = destination;
	},

	/**
	 * Uses `config.prefix` to register the given route.
	 * @param  {String} url         The URL pattern to match. 
	 * @param  {String|Object} destination The destination route. Either a string specifying controller name/action or a config object.
	 * @param  {String} [method]      The method, e.g. 'get'. By default, all methods are routed.
	 */
	action: function(url, destination, method){
		this.routes[(method ? (method + ' ') : '') + path.join('/', this.config.prefix, url)] = destination;
	}
};

module.exports = RouteRegistry;