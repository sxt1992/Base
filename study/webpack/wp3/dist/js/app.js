/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "099d286cc90cf0a2e792"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(3);
	__webpack_require__(7);

	var pageDatas = {
	    params: {},
	    defaultRoute: 'home'
	};
	function initMenu() {
	    var modName = window.location.href.split('#')[1];
	    modName = modName || pageDatas.defaultRoute;
	    $("ul.sub-menu li a").each(function () {
	        if ("#" + modName == $(this).attr('href')) {
	            $(this).addClass("active").parent().parent().show(300);
	            return false;
	        }
	    });
	}

	function bindMenu() {
	    $(document).on('click', '.sidebar .nav .has-sub', function (e) {
	        e.stopPropagation();
	        $(this).children(".sub-menu").toggle(300);
	    });
	    $("ul.sub-menu li a").on('click', function (e) {
	        e.stopPropagation();

	        if ($(this).hasClass("active")) {
	            return false;
	        }

	        $("ul.sub-menu li a").removeClass("active");
	        $(this).addClass("active");

	        var modName = $(this).attr('href');
	        modName = modName.split('#')[1];

	        loadHtml(modName);
	    });
	}

	function loadHtml(modName) {
	    pageDatas.params = null;

	    var htmlPath = './html/' + modName + '.html';
	    var jsPath = './js/' + modName;

	    $.get(htmlPath, function (res) {
	        $("#container").html(res);
	        loadJs(jsPath, modName);
	    });

	    /* var curMod;
	     var curHtml;
	     require.ensure([], function (require) {
	         curMod = require(jsPath);
	         curHtml = require(htmlPath);
	         $("#container").html(curHtml);
	     },modName);  */
	    /*$.get(htmlPath, [], function (html) {
	        $("#container").html(html);
	        loadJs(jsPath);
	    });*/
	}

	function loadJs(jsPath, modName) {
	    /*require.ensure([], function (require) {
	        var curMod = require(jsPath);
	        curMod.init(pageDatas.params);
	    },modName);*/
	    var curMod;
	    var routerArr = ["home", "menu1", "menu2", "menu3", "menu5", "menu6", "hrm"];
	    switch (modName) {
	        case routerArr[1]:
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/menu1');
	                curMod.init(pageDatas.params);
	            }, modName);
	            break;
	        case routerArr[2]:
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/menu2');
	                curMod.init(pageDatas.params);
	            }, modName);
	            break;
	        case routerArr[3]:
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/menu3');
	                curMod.init(pageDatas.params);
	            }, modName);
	            break;
	        case routerArr[4]:
	            // menu5
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/menu5');
	                curMod.init(pageDatas.params);
	            }, modName);
	            break;
	        case routerArr[5]:
	            // menu6
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/menu6');
	                curMod.init(pageDatas.params);
	            }, modName);
	            break;
	        case routerArr[6]:
	            // hrm
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/hrm');
	                curMod.init(pageDatas.params);
	            }, modName);
	            break;
	        default:
	            // 默认 home
	            __webpack_require__(15).ensure([], function (require) {
	                curMod = require('./js/home');
	                curMod.init(pageDatas.params);
	            }, modName);
	    }
	}

	$(function () {
	    initMenu();
	    bindMenu();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * jQuery JavaScript Library v1.12.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-04-05T19:16Z
	 */

	(function (global, factory) {

	    if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
	        // For CommonJS and CommonJS-like environments where a proper `window`
	        // is present, execute the factory and get jQuery.
	        // For environments that do not have a `window` with a `document`
	        // (such as Node.js), expose a factory as module.exports.
	        // This accentuates the need for the creation of a real `window`.
	        // e.g. var jQuery = require("jquery")(window);
	        // See ticket #14549 for more info.
	        module.exports = global.document ? factory(global, true) : function (w) {
	            if (!w.document) {
	                throw new Error("jQuery requires a window with a document");
	            }
	            return factory(w);
	        };
	    } else {
	        factory(global);
	    }

	    // Pass this if window is not defined yet
	})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	    // Support: Firefox 18+
	    // Can't be in strict mode, several libs including ASP.NET trace
	    // the stack via arguments.caller.callee and Firefox dies if
	    // you try to trace through "use strict" call chains. (#13335)
	    //"use strict";
	    var deletedIds = [];

	    var document = window.document;

	    var _slice = deletedIds.slice;

	    var concat = deletedIds.concat;

	    var push = deletedIds.push;

	    var indexOf = deletedIds.indexOf;

	    var class2type = {};

	    var toString = class2type.toString;

	    var hasOwn = class2type.hasOwnProperty;

	    var support = {};

	    var version = "1.12.3",


	    // Define a local copy of jQuery
	    jQuery = function jQuery(selector, context) {

	        // The jQuery object is actually just the init constructor 'enhanced'
	        // Need init if jQuery is called (just allow error to be thrown if not included)
	        return new jQuery.fn.init(selector, context);
	    },


	    // Support: Android<4.1, IE<9
	    // Make sure we trim BOM and NBSP
	    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	    // Matches dashed string for camelizing
	    rmsPrefix = /^-ms-/,
	        rdashAlpha = /-([\da-z])/gi,


	    // Used by jQuery.camelCase as callback to replace()
	    fcamelCase = function fcamelCase(all, letter) {
	        return letter.toUpperCase();
	    };

	    jQuery.fn = jQuery.prototype = {

	        // The current version of jQuery being used
	        jquery: version,

	        constructor: jQuery,

	        // Start with an empty selector
	        selector: "",

	        // The default length of a jQuery object is 0
	        length: 0,

	        toArray: function toArray() {
	            return _slice.call(this);
	        },

	        // Get the Nth element in the matched element set OR
	        // Get the whole matched element set as a clean array
	        get: function get(num) {
	            return num != null ?

	            // Return just the one element from the set
	            num < 0 ? this[num + this.length] : this[num] :

	            // Return all the elements in a clean array
	            _slice.call(this);
	        },

	        // Take an array of elements and push it onto the stack
	        // (returning the new matched element set)
	        pushStack: function pushStack(elems) {

	            // Build a new jQuery matched element set
	            var ret = jQuery.merge(this.constructor(), elems);

	            // Add the old object onto the stack (as a reference)
	            ret.prevObject = this;
	            ret.context = this.context;

	            // Return the newly-formed element set
	            return ret;
	        },

	        // Execute a callback for every element in the matched set.
	        each: function each(callback) {
	            return jQuery.each(this, callback);
	        },

	        map: function map(callback) {
	            return this.pushStack(jQuery.map(this, function (elem, i) {
	                return callback.call(elem, i, elem);
	            }));
	        },

	        slice: function slice() {
	            return this.pushStack(_slice.apply(this, arguments));
	        },

	        first: function first() {
	            return this.eq(0);
	        },

	        last: function last() {
	            return this.eq(-1);
	        },

	        eq: function eq(i) {
	            var len = this.length,
	                j = +i + (i < 0 ? len : 0);
	            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	        },

	        end: function end() {
	            return this.prevObject || this.constructor();
	        },

	        // For internal use only.
	        // Behaves like an Array's method, not like a jQuery method.
	        push: push,
	        sort: deletedIds.sort,
	        splice: deletedIds.splice
	    };

	    jQuery.extend = jQuery.fn.extend = function () {
	        var src,
	            copyIsArray,
	            copy,
	            name,
	            options,
	            clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false;

	        // Handle a deep copy situation
	        if (typeof target === "boolean") {
	            deep = target;

	            // skip the boolean and the target
	            target = arguments[i] || {};
	            i++;
	        }

	        // Handle case when target is a string or something (possible in deep copy)
	        if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
	            target = {};
	        }

	        // extend jQuery itself if only one argument is passed
	        if (i === length) {
	            target = this;
	            i--;
	        }

	        for (; i < length; i++) {

	            // Only deal with non-null/undefined values
	            if ((options = arguments[i]) != null) {

	                // Extend the base object
	                for (name in options) {
	                    src = target[name];
	                    copy = options[name];

	                    // Prevent never-ending loop
	                    if (target === copy) {
	                        continue;
	                    }

	                    // Recurse if we're merging plain objects or arrays
	                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

	                        if (copyIsArray) {
	                            copyIsArray = false;
	                            clone = src && jQuery.isArray(src) ? src : [];
	                        } else {
	                            clone = src && jQuery.isPlainObject(src) ? src : {};
	                        }

	                        // Never move original objects, clone them
	                        target[name] = jQuery.extend(deep, clone, copy);

	                        // Don't bring in undefined values
	                    } else if (copy !== undefined) {
	                        target[name] = copy;
	                    }
	                }
	            }
	        }

	        // Return the modified object
	        return target;
	    };

	    jQuery.extend({

	        // Unique for each copy of jQuery on the page
	        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

	        // Assume jQuery is ready without the ready module
	        isReady: true,

	        error: function error(msg) {
	            throw new Error(msg);
	        },

	        noop: function noop() {},

	        // See test/unit/core.js for details concerning isFunction.
	        // Since version 1.3, DOM methods and functions like alert
	        // aren't supported. They return false on IE (#2968).
	        isFunction: function isFunction(obj) {
	            return jQuery.type(obj) === "function";
	        },

	        isArray: Array.isArray || function (obj) {
	            return jQuery.type(obj) === "array";
	        },

	        isWindow: function isWindow(obj) {
	            /* jshint eqeqeq: false */
	            return obj != null && obj == obj.window;
	        },

	        isNumeric: function isNumeric(obj) {

	            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	            // subtraction forces infinities to NaN
	            // adding 1 corrects loss of precision from parseFloat (#15100)
	            var realStringObj = obj && obj.toString();
	            return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
	        },

	        isEmptyObject: function isEmptyObject(obj) {
	            var name;
	            for (name in obj) {
	                return false;
	            }
	            return true;
	        },

	        isPlainObject: function isPlainObject(obj) {
	            var key;

	            // Must be an Object.
	            // Because of IE, we also have to check the presence of the constructor property.
	            // Make sure that DOM nodes and window objects don't pass through, as well
	            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
	                return false;
	            }

	            try {

	                // Not own constructor property must be Object
	                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	                    return false;
	                }
	            } catch (e) {

	                // IE8,9 Will throw exceptions on certain host objects #9897
	                return false;
	            }

	            // Support: IE<9
	            // Handle iteration over inherited properties before own properties.
	            if (!support.ownFirst) {
	                for (key in obj) {
	                    return hasOwn.call(obj, key);
	                }
	            }

	            // Own properties are enumerated firstly, so to speed up,
	            // if last one is own, then all properties are own.
	            for (key in obj) {}

	            return key === undefined || hasOwn.call(obj, key);
	        },

	        type: function type(obj) {
	            if (obj == null) {
	                return obj + "";
	            }
	            return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	        },

	        // Workarounds based on findings by Jim Driscoll
	        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	        globalEval: function globalEval(data) {
	            if (data && jQuery.trim(data)) {

	                // We use execScript on Internet Explorer
	                // We use an anonymous function so that context is window
	                // rather than jQuery in Firefox
	                (window.execScript || function (data) {
	                    window["eval"].call(window, data); // jscs:ignore requireDotNotation
	                })(data);
	            }
	        },

	        // Convert dashed to camelCase; used by the css and data modules
	        // Microsoft forgot to hump their vendor prefix (#9572)
	        camelCase: function camelCase(string) {
	            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	        },

	        nodeName: function nodeName(elem, name) {
	            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	        },

	        each: function each(obj, callback) {
	            var length,
	                i = 0;

	            if (isArrayLike(obj)) {
	                length = obj.length;
	                for (; i < length; i++) {
	                    if (callback.call(obj[i], i, obj[i]) === false) {
	                        break;
	                    }
	                }
	            } else {
	                for (i in obj) {
	                    if (callback.call(obj[i], i, obj[i]) === false) {
	                        break;
	                    }
	                }
	            }

	            return obj;
	        },

	        // Support: Android<4.1, IE<9
	        trim: function trim(text) {
	            return text == null ? "" : (text + "").replace(rtrim, "");
	        },

	        // results is for internal usage only
	        makeArray: function makeArray(arr, results) {
	            var ret = results || [];

	            if (arr != null) {
	                if (isArrayLike(Object(arr))) {
	                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
	                } else {
	                    push.call(ret, arr);
	                }
	            }

	            return ret;
	        },

	        inArray: function inArray(elem, arr, i) {
	            var len;

	            if (arr) {
	                if (indexOf) {
	                    return indexOf.call(arr, elem, i);
	                }

	                len = arr.length;
	                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

	                for (; i < len; i++) {

	                    // Skip accessing in sparse arrays
	                    if (i in arr && arr[i] === elem) {
	                        return i;
	                    }
	                }
	            }

	            return -1;
	        },

	        merge: function merge(first, second) {
	            var len = +second.length,
	                j = 0,
	                i = first.length;

	            while (j < len) {
	                first[i++] = second[j++];
	            }

	            // Support: IE<9
	            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
	            if (len !== len) {
	                while (second[j] !== undefined) {
	                    first[i++] = second[j++];
	                }
	            }

	            first.length = i;

	            return first;
	        },

	        grep: function grep(elems, callback, invert) {
	            var callbackInverse,
	                matches = [],
	                i = 0,
	                length = elems.length,
	                callbackExpect = !invert;

	            // Go through the array, only saving the items
	            // that pass the validator function
	            for (; i < length; i++) {
	                callbackInverse = !callback(elems[i], i);
	                if (callbackInverse !== callbackExpect) {
	                    matches.push(elems[i]);
	                }
	            }

	            return matches;
	        },

	        // arg is for internal usage only
	        map: function map(elems, callback, arg) {
	            var length,
	                value,
	                i = 0,
	                ret = [];

	            // Go through the array, translating each of the items to their new values
	            if (isArrayLike(elems)) {
	                length = elems.length;
	                for (; i < length; i++) {
	                    value = callback(elems[i], i, arg);

	                    if (value != null) {
	                        ret.push(value);
	                    }
	                }

	                // Go through every key on the object,
	            } else {
	                for (i in elems) {
	                    value = callback(elems[i], i, arg);

	                    if (value != null) {
	                        ret.push(value);
	                    }
	                }
	            }

	            // Flatten any nested arrays
	            return concat.apply([], ret);
	        },

	        // A global GUID counter for objects
	        guid: 1,

	        // Bind a function to a context, optionally partially applying any
	        // arguments.
	        proxy: function proxy(fn, context) {
	            var args, proxy, tmp;

	            if (typeof context === "string") {
	                tmp = fn[context];
	                context = fn;
	                fn = tmp;
	            }

	            // Quick check to determine if target is callable, in the spec
	            // this throws a TypeError, but we will just return undefined.
	            if (!jQuery.isFunction(fn)) {
	                return undefined;
	            }

	            // Simulated bind
	            args = _slice.call(arguments, 2);
	            proxy = function proxy() {
	                return fn.apply(context || this, args.concat(_slice.call(arguments)));
	            };

	            // Set the guid of unique handler to the same of original handler, so it can be removed
	            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	            return proxy;
	        },

	        now: function now() {
	            return +new Date();
	        },

	        // jQuery.support is not used in Core but other projects attach their
	        // properties to it so it needs to exist.
	        support: support
	    });

	    // JSHint would error on this code due to the Symbol not being defined in ES5.
	    // Defining this global in .jshintrc would create a danger of using the global
	    // unguarded in another place, it seems safer to just disable JSHint for these
	    // three lines.
	    /* jshint ignore: start */
	    if (typeof Symbol === "function") {
	        jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator];
	    }
	    /* jshint ignore: end */

	    // Populate the class2type map
	    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
	        class2type["[object " + name + "]"] = name.toLowerCase();
	    });

	    function isArrayLike(obj) {

	        // Support: iOS 8.2 (not reproducible in simulator)
	        // `in` check used to prevent JIT error (gh-2145)
	        // hasOwn isn't used here due to false negatives
	        // regarding Nodelist length in IE
	        var length = !!obj && "length" in obj && obj.length,
	            type = jQuery.type(obj);

	        if (type === "function" || jQuery.isWindow(obj)) {
	            return false;
	        }

	        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	    }

	    var Sizzle =
	    /*!
	     * Sizzle CSS Selector Engine v2.2.1
	     * http://sizzlejs.com/
	     *
	     * Copyright jQuery Foundation and other contributors
	     * Released under the MIT license
	     * http://jquery.org/license
	     *
	     * Date: 2015-10-17
	     */
	    function (window) {

	        var i,
	            support,
	            Expr,
	            getText,
	            isXML,
	            tokenize,
	            compile,
	            select,
	            outermostContext,
	            sortInput,
	            hasDuplicate,


	        // Local document vars
	        setDocument,
	            document,
	            docElem,
	            documentIsHTML,
	            rbuggyQSA,
	            rbuggyMatches,
	            matches,
	            contains,


	        // Instance-specific data
	        expando = "sizzle" + 1 * new Date(),
	            preferredDoc = window.document,
	            dirruns = 0,
	            done = 0,
	            classCache = createCache(),
	            tokenCache = createCache(),
	            compilerCache = createCache(),
	            sortOrder = function sortOrder(a, b) {
	            if (a === b) {
	                hasDuplicate = true;
	            }
	            return 0;
	        },


	        // General-purpose constants
	        MAX_NEGATIVE = 1 << 31,


	        // Instance methods
	        hasOwn = {}.hasOwnProperty,
	            arr = [],
	            pop = arr.pop,
	            push_native = arr.push,
	            push = arr.push,
	            slice = arr.slice,

	        // Use a stripped-down indexOf as it's faster than native
	        // http://jsperf.com/thor-indexof-vs-for/5
	        indexOf = function indexOf(list, elem) {
	            var i = 0,
	                len = list.length;
	            for (; i < len; i++) {
	                if (list[i] === elem) {
	                    return i;
	                }
	            }
	            return -1;
	        },
	            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


	        // Regular expressions

	        // http://www.w3.org/TR/css3-selectors/#whitespace
	        whitespace = "[\\x20\\t\\r\\n\\f]",


	        // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


	        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
	        // Operator (capture 2)
	        "*([*^$|!~]?=)" + whitespace +
	        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
	        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	            pseudos = ":(" + identifier + ")(?:\\((" +
	        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
	        // 1. quoted (capture 3; capture 4 or capture 5)
	        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
	        // 2. simple (capture 6)
	        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
	        // 3. anything else (capture 2)
	        ".*" + ")\\)|)",


	        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	        rwhitespace = new RegExp(whitespace + "+", "g"),
	            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
	            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	            rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
	            rpseudo = new RegExp(pseudos),
	            ridentifier = new RegExp("^" + identifier + "$"),
	            matchExpr = {
	            "ID": new RegExp("^#(" + identifier + ")"),
	            "CLASS": new RegExp("^\\.(" + identifier + ")"),
	            "TAG": new RegExp("^(" + identifier + "|[*])"),
	            "ATTR": new RegExp("^" + attributes),
	            "PSEUDO": new RegExp("^" + pseudos),
	            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
	            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
	            // For use in libraries implementing .is()
	            // We use this for POS matching in `select`
	            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	        },
	            rinputs = /^(?:input|select|textarea|button)$/i,
	            rheader = /^h\d$/i,
	            rnative = /^[^{]+\{\s*\[native \w/,


	        // Easily-parseable/retrievable ID or TAG or CLASS selectors
	        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	            rsibling = /[+~]/,
	            rescape = /'|\\/g,


	        // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
	            funescape = function funescape(_, escaped, escapedWhitespace) {
	            var high = "0x" + escaped - 0x10000;
	            // NaN means non-codepoint
	            // Support: Firefox<24
	            // Workaround erroneous numeric interpretation of +"0x"
	            return high !== high || escapedWhitespace ? escaped : high < 0 ?
	            // BMP codepoint
	            String.fromCharCode(high + 0x10000) :
	            // Supplemental Plane codepoint (surrogate pair)
	            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	        },


	        // Used for iframes
	        // See setDocument()
	        // Removing the function wrapper causes a "Permission Denied"
	        // error in IE
	        unloadHandler = function unloadHandler() {
	            setDocument();
	        };

	        // Optimize for push.apply( _, NodeList )
	        try {
	            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
	            // Support: Android<4.0
	            // Detect silently failing push.apply
	            arr[preferredDoc.childNodes.length].nodeType;
	        } catch (e) {
	            push = {
	                apply: arr.length ?

	                // Leverage slice if possible
	                function (target, els) {
	                    push_native.apply(target, slice.call(els));
	                } :

	                // Support: IE<9
	                // Otherwise append directly
	                function (target, els) {
	                    var j = target.length,
	                        i = 0;
	                    // Can't trust NodeList.length
	                    while (target[j++] = els[i++]) {}
	                    target.length = j - 1;
	                }
	            };
	        }

	        function Sizzle(selector, context, results, seed) {
	            var m,
	                i,
	                elem,
	                nid,
	                nidselect,
	                match,
	                groups,
	                newSelector,
	                newContext = context && context.ownerDocument,


	            // nodeType defaults to 9, since context defaults to document
	            nodeType = context ? context.nodeType : 9;

	            results = results || [];

	            // Return early from calls with invalid selector or context
	            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

	                return results;
	            }

	            // Try to shortcut find operations (as opposed to filters) in HTML documents
	            if (!seed) {

	                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
	                    setDocument(context);
	                }
	                context = context || document;

	                if (documentIsHTML) {

	                    // If the selector is sufficiently simple, try using a "get*By*" DOM method
	                    // (excepting DocumentFragment context, where the methods don't exist)
	                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

	                        // ID selector
	                        if (m = match[1]) {

	                            // Document context
	                            if (nodeType === 9) {
	                                if (elem = context.getElementById(m)) {

	                                    // Support: IE, Opera, Webkit
	                                    // TODO: identify versions
	                                    // getElementById can match elements by name instead of ID
	                                    if (elem.id === m) {
	                                        results.push(elem);
	                                        return results;
	                                    }
	                                } else {
	                                    return results;
	                                }

	                                // Element context
	                            } else {

	                                // Support: IE, Opera, Webkit
	                                // TODO: identify versions
	                                // getElementById can match elements by name instead of ID
	                                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

	                                    results.push(elem);
	                                    return results;
	                                }
	                            }

	                            // Type selector
	                        } else if (match[2]) {
	                            push.apply(results, context.getElementsByTagName(selector));
	                            return results;

	                            // Class selector
	                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

	                            push.apply(results, context.getElementsByClassName(m));
	                            return results;
	                        }
	                    }

	                    // Take advantage of querySelectorAll
	                    if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

	                        if (nodeType !== 1) {
	                            newContext = context;
	                            newSelector = selector;

	                            // qSA looks outside Element context, which is not what we want
	                            // Thanks to Andrew Dupont for this workaround technique
	                            // Support: IE <=8
	                            // Exclude object elements
	                        } else if (context.nodeName.toLowerCase() !== "object") {

	                            // Capture the context ID, setting it first if necessary
	                            if (nid = context.getAttribute("id")) {
	                                nid = nid.replace(rescape, "\\$&");
	                            } else {
	                                context.setAttribute("id", nid = expando);
	                            }

	                            // Prefix every selector in the list
	                            groups = tokenize(selector);
	                            i = groups.length;
	                            nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
	                            while (i--) {
	                                groups[i] = nidselect + " " + toSelector(groups[i]);
	                            }
	                            newSelector = groups.join(",");

	                            // Expand context for sibling selectors
	                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
	                        }

	                        if (newSelector) {
	                            try {
	                                push.apply(results, newContext.querySelectorAll(newSelector));
	                                return results;
	                            } catch (qsaError) {} finally {
	                                if (nid === expando) {
	                                    context.removeAttribute("id");
	                                }
	                            }
	                        }
	                    }
	                }
	            }

	            // All others
	            return select(selector.replace(rtrim, "$1"), context, results, seed);
	        }

	        /**
	         * Create key-value caches of limited size
	         * @returns {function(string, object)} Returns the Object data after storing it on itself with
	         *    property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	         *    deleting the oldest entry
	         */
	        function createCache() {
	            var keys = [];

	            function cache(key, value) {
	                // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
	                if (keys.push(key + " ") > Expr.cacheLength) {
	                    // Only keep the most recent entries
	                    delete cache[keys.shift()];
	                }
	                return cache[key + " "] = value;
	            }

	            return cache;
	        }

	        /**
	         * Mark a function for special use by Sizzle
	         * @param {Function} fn The function to mark
	         */
	        function markFunction(fn) {
	            fn[expando] = true;
	            return fn;
	        }

	        /**
	         * Support testing using an element
	         * @param {Function} fn Passed the created div and expects a boolean result
	         */
	        function assert(fn) {
	            var div = document.createElement("div");

	            try {
	                return !!fn(div);
	            } catch (e) {
	                return false;
	            } finally {
	                // Remove from its parent by default
	                if (div.parentNode) {
	                    div.parentNode.removeChild(div);
	                }
	                // release memory in IE
	                div = null;
	            }
	        }

	        /**
	         * Adds the same handler for all of the specified attrs
	         * @param {String} attrs Pipe-separated list of attributes
	         * @param {Function} handler The method that will be applied
	         */
	        function addHandle(attrs, handler) {
	            var arr = attrs.split("|"),
	                i = arr.length;

	            while (i--) {
	                Expr.attrHandle[arr[i]] = handler;
	            }
	        }

	        /**
	         * Checks document order of two siblings
	         * @param {Element} a
	         * @param {Element} b
	         * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	         */
	        function siblingCheck(a, b) {
	            var cur = b && a,
	                diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

	            // Use IE sourceIndex if available on both nodes
	            if (diff) {
	                return diff;
	            }

	            // Check if b follows a
	            if (cur) {
	                while (cur = cur.nextSibling) {
	                    if (cur === b) {
	                        return -1;
	                    }
	                }
	            }

	            return a ? 1 : -1;
	        }

	        /**
	         * Returns a function to use in pseudos for input types
	         * @param {String} type
	         */
	        function createInputPseudo(type) {
	            return function (elem) {
	                var name = elem.nodeName.toLowerCase();
	                return name === "input" && elem.type === type;
	            };
	        }

	        /**
	         * Returns a function to use in pseudos for buttons
	         * @param {String} type
	         */
	        function createButtonPseudo(type) {
	            return function (elem) {
	                var name = elem.nodeName.toLowerCase();
	                return (name === "input" || name === "button") && elem.type === type;
	            };
	        }

	        /**
	         * Returns a function to use in pseudos for positionals
	         * @param {Function} fn
	         */
	        function createPositionalPseudo(fn) {
	            return markFunction(function (argument) {
	                argument = +argument;
	                return markFunction(function (seed, matches) {
	                    var j,
	                        matchIndexes = fn([], seed.length, argument),
	                        i = matchIndexes.length;

	                    // Match elements found at the specified indexes
	                    while (i--) {
	                        if (seed[j = matchIndexes[i]]) {
	                            seed[j] = !(matches[j] = seed[j]);
	                        }
	                    }
	                });
	            });
	        }

	        /**
	         * Checks a node for validity as a Sizzle context
	         * @param {Element|Object=} context
	         * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	         */
	        function testContext(context) {
	            return context && typeof context.getElementsByTagName !== "undefined" && context;
	        }

	        // Expose support vars for convenience
	        support = Sizzle.support = {};

	        /**
	         * Detects XML nodes
	         * @param {Element|Object} elem An element or a document
	         * @returns {Boolean} True iff elem is a non-HTML XML node
	         */
	        isXML = Sizzle.isXML = function (elem) {
	            // documentElement is verified for cases where it doesn't yet exist
	            // (such as loading iframes in IE - #4833)
	            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	            return documentElement ? documentElement.nodeName !== "HTML" : false;
	        };

	        /**
	         * Sets document-related variables once based on the current document
	         * @param {Element|Object} [doc] An element or document object to use to set the document
	         * @returns {Object} Returns the current document
	         */
	        setDocument = Sizzle.setDocument = function (node) {
	            var hasCompare,
	                parent,
	                doc = node ? node.ownerDocument || node : preferredDoc;

	            // Return early if doc is invalid or already selected
	            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
	                return document;
	            }

	            // Update global variables
	            document = doc;
	            docElem = document.documentElement;
	            documentIsHTML = !isXML(document);

	            // Support: IE 9-11, Edge
	            // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	            if ((parent = document.defaultView) && parent.top !== parent) {
	                // Support: IE 11
	                if (parent.addEventListener) {
	                    parent.addEventListener("unload", unloadHandler, false);

	                    // Support: IE 9 - 10 only
	                } else if (parent.attachEvent) {
	                    parent.attachEvent("onunload", unloadHandler);
	                }
	            }

	            /* Attributes
	             ---------------------------------------------------------------------- */

	            // Support: IE<8
	            // Verify that getAttribute really returns attributes and not properties
	            // (excepting IE8 booleans)
	            support.attributes = assert(function (div) {
	                div.className = "i";
	                return !div.getAttribute("className");
	            });

	            /* getElement(s)By*
	             ---------------------------------------------------------------------- */

	            // Check if getElementsByTagName("*") returns only elements
	            support.getElementsByTagName = assert(function (div) {
	                div.appendChild(document.createComment(""));
	                return !div.getElementsByTagName("*").length;
	            });

	            // Support: IE<9
	            support.getElementsByClassName = rnative.test(document.getElementsByClassName);

	            // Support: IE<10
	            // Check if getElementById returns elements by name
	            // The broken getElementById methods don't pick up programatically-set names,
	            // so use a roundabout getElementsByName test
	            support.getById = assert(function (div) {
	                docElem.appendChild(div).id = expando;
	                return !document.getElementsByName || !document.getElementsByName(expando).length;
	            });

	            // ID find and filter
	            if (support.getById) {
	                Expr.find["ID"] = function (id, context) {
	                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
	                        var m = context.getElementById(id);
	                        return m ? [m] : [];
	                    }
	                };
	                Expr.filter["ID"] = function (id) {
	                    var attrId = id.replace(runescape, funescape);
	                    return function (elem) {
	                        return elem.getAttribute("id") === attrId;
	                    };
	                };
	            } else {
	                // Support: IE6/7
	                // getElementById is not reliable as a find shortcut
	                delete Expr.find["ID"];

	                Expr.filter["ID"] = function (id) {
	                    var attrId = id.replace(runescape, funescape);
	                    return function (elem) {
	                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
	                        return node && node.value === attrId;
	                    };
	                };
	            }

	            // Tag
	            Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
	                if (typeof context.getElementsByTagName !== "undefined") {
	                    return context.getElementsByTagName(tag);

	                    // DocumentFragment nodes don't have gEBTN
	                } else if (support.qsa) {
	                    return context.querySelectorAll(tag);
	                }
	            } : function (tag, context) {
	                var elem,
	                    tmp = [],
	                    i = 0,

	                // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
	                results = context.getElementsByTagName(tag);

	                // Filter out possible comments
	                if (tag === "*") {
	                    while (elem = results[i++]) {
	                        if (elem.nodeType === 1) {
	                            tmp.push(elem);
	                        }
	                    }

	                    return tmp;
	                }
	                return results;
	            };

	            // Class
	            Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
	                if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
	                    return context.getElementsByClassName(className);
	                }
	            };

	            /* QSA/matchesSelector
	             ---------------------------------------------------------------------- */

	            // QSA and matchesSelector support

	            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	            rbuggyMatches = [];

	            // qSa(:focus) reports false when true (Chrome 21)
	            // We allow this because of a bug in IE8/9 that throws an error
	            // whenever `document.activeElement` is accessed on an iframe
	            // So, we allow :focus to pass through QSA all the time to avoid the IE error
	            // See http://bugs.jquery.com/ticket/13378
	            rbuggyQSA = [];

	            if (support.qsa = rnative.test(document.querySelectorAll)) {
	                // Build QSA regex
	                // Regex strategy adopted from Diego Perini
	                assert(function (div) {
	                    // Select is set to empty string on purpose
	                    // This is to test IE's treatment of not explicitly
	                    // setting a boolean content attribute,
	                    // since its presence should be enough
	                    // http://bugs.jquery.com/ticket/12359
	                    docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

	                    // Support: IE8, Opera 11-12.16
	                    // Nothing should be selected when empty strings follow ^= or $= or *=
	                    // The test attribute must be unknown in Opera but "safe" for WinRT
	                    // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
	                    if (div.querySelectorAll("[msallowcapture^='']").length) {
	                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
	                    }

	                    // Support: IE8
	                    // Boolean attributes and "value" are not treated correctly
	                    if (!div.querySelectorAll("[selected]").length) {
	                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
	                    }

	                    // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
	                    if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
	                        rbuggyQSA.push("~=");
	                    }

	                    // Webkit/Opera - :checked should return selected option elements
	                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	                    // IE8 throws error here and will not see later tests
	                    if (!div.querySelectorAll(":checked").length) {
	                        rbuggyQSA.push(":checked");
	                    }

	                    // Support: Safari 8+, iOS 8+
	                    // https://bugs.webkit.org/show_bug.cgi?id=136851
	                    // In-page `selector#id sibing-combinator selector` fails
	                    if (!div.querySelectorAll("a#" + expando + "+*").length) {
	                        rbuggyQSA.push(".#.+[+~]");
	                    }
	                });

	                assert(function (div) {
	                    // Support: Windows 8 Native Apps
	                    // The type and name attributes are restricted during .innerHTML assignment
	                    var input = document.createElement("input");
	                    input.setAttribute("type", "hidden");
	                    div.appendChild(input).setAttribute("name", "D");

	                    // Support: IE8
	                    // Enforce case-sensitivity of name attribute
	                    if (div.querySelectorAll("[name=d]").length) {
	                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
	                    }

	                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
	                    // IE8 throws error here and will not see later tests
	                    if (!div.querySelectorAll(":enabled").length) {
	                        rbuggyQSA.push(":enabled", ":disabled");
	                    }

	                    // Opera 10-11 does not throw on post-comma invalid pseudos
	                    div.querySelectorAll("*,:x");
	                    rbuggyQSA.push(",.*:");
	                });
	            }

	            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

	                assert(function (div) {
	                    // Check to see if it's possible to do matchesSelector
	                    // on a disconnected node (IE 9)
	                    support.disconnectedMatch = matches.call(div, "div");

	                    // This should fail with an exception
	                    // Gecko does not error, returns false instead
	                    matches.call(div, "[s!='']:x");
	                    rbuggyMatches.push("!=", pseudos);
	                });
	            }

	            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
	            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

	            /* Contains
	             ---------------------------------------------------------------------- */
	            hasCompare = rnative.test(docElem.compareDocumentPosition);

	            // Element contains another
	            // Purposefully self-exclusive
	            // As in, an element does not contain itself
	            contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
	                var adown = a.nodeType === 9 ? a.documentElement : a,
	                    bup = b && b.parentNode;
	                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	            } : function (a, b) {
	                if (b) {
	                    while (b = b.parentNode) {
	                        if (b === a) {
	                            return true;
	                        }
	                    }
	                }
	                return false;
	            };

	            /* Sorting
	             ---------------------------------------------------------------------- */

	            // Document order sorting
	            sortOrder = hasCompare ? function (a, b) {

	                // Flag for duplicate removal
	                if (a === b) {
	                    hasDuplicate = true;
	                    return 0;
	                }

	                // Sort on method existence if only one input has compareDocumentPosition
	                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	                if (compare) {
	                    return compare;
	                }

	                // Calculate position if both inputs belong to the same document
	                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

	                // Otherwise we know they are disconnected
	                1;

	                // Disconnected nodes
	                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

	                    // Choose the first element that is related to our preferred document
	                    if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
	                        return -1;
	                    }
	                    if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
	                        return 1;
	                    }

	                    // Maintain original order
	                    return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
	                }

	                return compare & 4 ? -1 : 1;
	            } : function (a, b) {
	                // Exit early if the nodes are identical
	                if (a === b) {
	                    hasDuplicate = true;
	                    return 0;
	                }

	                var cur,
	                    i = 0,
	                    aup = a.parentNode,
	                    bup = b.parentNode,
	                    ap = [a],
	                    bp = [b];

	                // Parentless nodes are either documents or disconnected
	                if (!aup || !bup) {
	                    return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

	                    // If the nodes are siblings, we can do a quick check
	                } else if (aup === bup) {
	                    return siblingCheck(a, b);
	                }

	                // Otherwise we need full lists of their ancestors for comparison
	                cur = a;
	                while (cur = cur.parentNode) {
	                    ap.unshift(cur);
	                }
	                cur = b;
	                while (cur = cur.parentNode) {
	                    bp.unshift(cur);
	                }

	                // Walk down the tree looking for a discrepancy
	                while (ap[i] === bp[i]) {
	                    i++;
	                }

	                return i ?
	                // Do a sibling check if the nodes have a common ancestor
	                siblingCheck(ap[i], bp[i]) :

	                // Otherwise nodes in our document sort first
	                ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
	            };

	            return document;
	        };

	        Sizzle.matches = function (expr, elements) {
	            return Sizzle(expr, null, null, elements);
	        };

	        Sizzle.matchesSelector = function (elem, expr) {
	            // Set document vars if needed
	            if ((elem.ownerDocument || elem) !== document) {
	                setDocument(elem);
	            }

	            // Make sure that attribute selectors are quoted
	            expr = expr.replace(rattributeQuotes, "='$1']");

	            if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

	                try {
	                    var ret = matches.call(elem, expr);

	                    // IE 9's matchesSelector returns false on disconnected nodes
	                    if (ret || support.disconnectedMatch ||
	                    // As well, disconnected nodes are said to be in a document
	                    // fragment in IE 9
	                    elem.document && elem.document.nodeType !== 11) {
	                        return ret;
	                    }
	                } catch (e) {}
	            }

	            return Sizzle(expr, document, null, [elem]).length > 0;
	        };

	        Sizzle.contains = function (context, elem) {
	            // Set document vars if needed
	            if ((context.ownerDocument || context) !== document) {
	                setDocument(context);
	            }
	            return contains(context, elem);
	        };

	        Sizzle.attr = function (elem, name) {
	            // Set document vars if needed
	            if ((elem.ownerDocument || elem) !== document) {
	                setDocument(elem);
	            }

	            var fn = Expr.attrHandle[name.toLowerCase()],

	            // Don't get fooled by Object.prototype properties (jQuery #13807)
	            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

	            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	        };

	        Sizzle.error = function (msg) {
	            throw new Error("Syntax error, unrecognized expression: " + msg);
	        };

	        /**
	         * Document sorting and removing duplicates
	         * @param {ArrayLike} results
	         */
	        Sizzle.uniqueSort = function (results) {
	            var elem,
	                duplicates = [],
	                j = 0,
	                i = 0;

	            // Unless we *know* we can detect duplicates, assume their presence
	            hasDuplicate = !support.detectDuplicates;
	            sortInput = !support.sortStable && results.slice(0);
	            results.sort(sortOrder);

	            if (hasDuplicate) {
	                while (elem = results[i++]) {
	                    if (elem === results[i]) {
	                        j = duplicates.push(i);
	                    }
	                }
	                while (j--) {
	                    results.splice(duplicates[j], 1);
	                }
	            }

	            // Clear input after sorting to release objects
	            // See https://github.com/jquery/sizzle/pull/225
	            sortInput = null;

	            return results;
	        };

	        /**
	         * Utility function for retrieving the text value of an array of DOM nodes
	         * @param {Array|Element} elem
	         */
	        getText = Sizzle.getText = function (elem) {
	            var node,
	                ret = "",
	                i = 0,
	                nodeType = elem.nodeType;

	            if (!nodeType) {
	                // If no nodeType, this is expected to be an array
	                while (node = elem[i++]) {
	                    // Do not traverse comment nodes
	                    ret += getText(node);
	                }
	            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	                // Use textContent for elements
	                // innerText usage removed for consistency of new lines (jQuery #11153)
	                if (typeof elem.textContent === "string") {
	                    return elem.textContent;
	                } else {
	                    // Traverse its children
	                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	                        ret += getText(elem);
	                    }
	                }
	            } else if (nodeType === 3 || nodeType === 4) {
	                return elem.nodeValue;
	            }
	            // Do not include comment or processing instruction nodes

	            return ret;
	        };

	        Expr = Sizzle.selectors = {

	            // Can be adjusted by the user
	            cacheLength: 50,

	            createPseudo: markFunction,

	            match: matchExpr,

	            attrHandle: {},

	            find: {},

	            relative: {
	                ">": { dir: "parentNode", first: true },
	                " ": { dir: "parentNode" },
	                "+": { dir: "previousSibling", first: true },
	                "~": { dir: "previousSibling" }
	            },

	            preFilter: {
	                "ATTR": function ATTR(match) {
	                    match[1] = match[1].replace(runescape, funescape);

	                    // Move the given value to match[3] whether quoted or unquoted
	                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

	                    if (match[2] === "~=") {
	                        match[3] = " " + match[3] + " ";
	                    }

	                    return match.slice(0, 4);
	                },

	                "CHILD": function CHILD(match) {
	                    /* matches from matchExpr["CHILD"]
	                     1 type (only|nth|...)
	                     2 what (child|of-type)
	                     3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	                     4 xn-component of xn+y argument ([+-]?\d*n|)
	                     5 sign of xn-component
	                     6 x of xn-component
	                     7 sign of y-component
	                     8 y of y-component
	                     */
	                    match[1] = match[1].toLowerCase();

	                    if (match[1].slice(0, 3) === "nth") {
	                        // nth-* requires argument
	                        if (!match[3]) {
	                            Sizzle.error(match[0]);
	                        }

	                        // numeric x and y parameters for Expr.filter.CHILD
	                        // remember that false/true cast respectively to 0/1
	                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
	                        match[5] = +(match[7] + match[8] || match[3] === "odd");

	                        // other types prohibit arguments
	                    } else if (match[3]) {
	                        Sizzle.error(match[0]);
	                    }

	                    return match;
	                },

	                "PSEUDO": function PSEUDO(match) {
	                    var excess,
	                        unquoted = !match[6] && match[2];

	                    if (matchExpr["CHILD"].test(match[0])) {
	                        return null;
	                    }

	                    // Accept quoted arguments as-is
	                    if (match[3]) {
	                        match[2] = match[4] || match[5] || "";

	                        // Strip excess characters from unquoted arguments
	                    } else if (unquoted && rpseudo.test(unquoted) && (
	                    // Get excess from tokenize (recursively)
	                    excess = tokenize(unquoted, true)) && (
	                    // advance to the next closing parenthesis
	                    excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

	                        // excess is a negative index
	                        match[0] = match[0].slice(0, excess);
	                        match[2] = unquoted.slice(0, excess);
	                    }

	                    // Return only captures needed by the pseudo filter method (type and argument)
	                    return match.slice(0, 3);
	                }
	            },

	            filter: {

	                "TAG": function TAG(nodeNameSelector) {
	                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
	                    return nodeNameSelector === "*" ? function () {
	                        return true;
	                    } : function (elem) {
	                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	                    };
	                },

	                "CLASS": function CLASS(className) {
	                    var pattern = classCache[className + " "];

	                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
	                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
	                    });
	                },

	                "ATTR": function ATTR(name, operator, check) {
	                    return function (elem) {
	                        var result = Sizzle.attr(elem, name);

	                        if (result == null) {
	                            return operator === "!=";
	                        }
	                        if (!operator) {
	                            return true;
	                        }

	                        result += "";

	                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
	                    };
	                },

	                "CHILD": function CHILD(type, what, argument, first, last) {
	                    var simple = type.slice(0, 3) !== "nth",
	                        forward = type.slice(-4) !== "last",
	                        ofType = what === "of-type";

	                    return first === 1 && last === 0 ?

	                    // Shortcut for :nth-*(n)
	                    function (elem) {
	                        return !!elem.parentNode;
	                    } : function (elem, context, xml) {
	                        var cache,
	                            uniqueCache,
	                            outerCache,
	                            node,
	                            nodeIndex,
	                            start,
	                            dir = simple !== forward ? "nextSibling" : "previousSibling",
	                            parent = elem.parentNode,
	                            name = ofType && elem.nodeName.toLowerCase(),
	                            useCache = !xml && !ofType,
	                            diff = false;

	                        if (parent) {

	                            // :(first|last|only)-(child|of-type)
	                            if (simple) {
	                                while (dir) {
	                                    node = elem;
	                                    while (node = node[dir]) {
	                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

	                                            return false;
	                                        }
	                                    }
	                                    // Reverse direction for :only-* (if we haven't yet done so)
	                                    start = dir = type === "only" && !start && "nextSibling";
	                                }
	                                return true;
	                            }

	                            start = [forward ? parent.firstChild : parent.lastChild];

	                            // non-xml :nth-child(...) stores cache data on `parent`
	                            if (forward && useCache) {

	                                // Seek `elem` from a previously-cached index

	                                // ...in a gzip-friendly way
	                                node = parent;
	                                outerCache = node[expando] || (node[expando] = {});

	                                // Support: IE <9 only
	                                // Defend against cloned attroperties (jQuery gh-1709)
	                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

	                                cache = uniqueCache[type] || [];
	                                nodeIndex = cache[0] === dirruns && cache[1];
	                                diff = nodeIndex && cache[2];
	                                node = nodeIndex && parent.childNodes[nodeIndex];

	                                while (node = ++nodeIndex && node && node[dir] || (

	                                // Fallback to seeking `elem` from the start
	                                diff = nodeIndex = 0) || start.pop()) {

	                                    // When found, cache indexes on `parent` and break
	                                    if (node.nodeType === 1 && ++diff && node === elem) {
	                                        uniqueCache[type] = [dirruns, nodeIndex, diff];
	                                        break;
	                                    }
	                                }
	                            } else {
	                                // Use previously-cached element index if available
	                                if (useCache) {
	                                    // ...in a gzip-friendly way
	                                    node = elem;
	                                    outerCache = node[expando] || (node[expando] = {});

	                                    // Support: IE <9 only
	                                    // Defend against cloned attroperties (jQuery gh-1709)
	                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

	                                    cache = uniqueCache[type] || [];
	                                    nodeIndex = cache[0] === dirruns && cache[1];
	                                    diff = nodeIndex;
	                                }

	                                // xml :nth-child(...)
	                                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
	                                if (diff === false) {
	                                    // Use the same loop as above to seek `elem` from the start
	                                    while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

	                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

	                                            // Cache the index of each encountered element
	                                            if (useCache) {
	                                                outerCache = node[expando] || (node[expando] = {});

	                                                // Support: IE <9 only
	                                                // Defend against cloned attroperties (jQuery gh-1709)
	                                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

	                                                uniqueCache[type] = [dirruns, diff];
	                                            }

	                                            if (node === elem) {
	                                                break;
	                                            }
	                                        }
	                                    }
	                                }
	                            }

	                            // Incorporate the offset, then check against cycle size
	                            diff -= last;
	                            return diff === first || diff % first === 0 && diff / first >= 0;
	                        }
	                    };
	                },

	                "PSEUDO": function PSEUDO(pseudo, argument) {
	                    // pseudo-class names are case-insensitive
	                    // http://www.w3.org/TR/selectors/#pseudo-classes
	                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
	                    // Remember that setFilters inherits from pseudos
	                    var args,
	                        fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

	                    // The user may use createPseudo to indicate that
	                    // arguments are needed to create the filter function
	                    // just as Sizzle does
	                    if (fn[expando]) {
	                        return fn(argument);
	                    }

	                    // But maintain support for old signatures
	                    if (fn.length > 1) {
	                        args = [pseudo, pseudo, "", argument];
	                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
	                            var idx,
	                                matched = fn(seed, argument),
	                                i = matched.length;
	                            while (i--) {
	                                idx = indexOf(seed, matched[i]);
	                                seed[idx] = !(matches[idx] = matched[i]);
	                            }
	                        }) : function (elem) {
	                            return fn(elem, 0, args);
	                        };
	                    }

	                    return fn;
	                }
	            },

	            pseudos: {
	                // Potentially complex pseudos
	                "not": markFunction(function (selector) {
	                    // Trim the selector passed to compile
	                    // to avoid treating leading and trailing
	                    // spaces as combinators
	                    var input = [],
	                        results = [],
	                        matcher = compile(selector.replace(rtrim, "$1"));

	                    return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
	                        var elem,
	                            unmatched = matcher(seed, null, xml, []),
	                            i = seed.length;

	                        // Match elements unmatched by `matcher`
	                        while (i--) {
	                            if (elem = unmatched[i]) {
	                                seed[i] = !(matches[i] = elem);
	                            }
	                        }
	                    }) : function (elem, context, xml) {
	                        input[0] = elem;
	                        matcher(input, null, xml, results);
	                        // Don't keep the element (issue #299)
	                        input[0] = null;
	                        return !results.pop();
	                    };
	                }),

	                "has": markFunction(function (selector) {
	                    return function (elem) {
	                        return Sizzle(selector, elem).length > 0;
	                    };
	                }),

	                "contains": markFunction(function (text) {
	                    text = text.replace(runescape, funescape);
	                    return function (elem) {
	                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
	                    };
	                }),

	                // "Whether an element is represented by a :lang() selector
	                // is based solely on the element's language value
	                // being equal to the identifier C,
	                // or beginning with the identifier C immediately followed by "-".
	                // The matching of C against the element's language value is performed case-insensitively.
	                // The identifier C does not have to be a valid language name."
	                // http://www.w3.org/TR/selectors/#lang-pseudo
	                "lang": markFunction(function (lang) {
	                    // lang value must be a valid identifier
	                    if (!ridentifier.test(lang || "")) {
	                        Sizzle.error("unsupported lang: " + lang);
	                    }
	                    lang = lang.replace(runescape, funescape).toLowerCase();
	                    return function (elem) {
	                        var elemLang;
	                        do {
	                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

	                                elemLang = elemLang.toLowerCase();
	                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
	                            }
	                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
	                        return false;
	                    };
	                }),

	                // Miscellaneous
	                "target": function target(elem) {
	                    var hash = window.location && window.location.hash;
	                    return hash && hash.slice(1) === elem.id;
	                },

	                "root": function root(elem) {
	                    return elem === docElem;
	                },

	                "focus": function focus(elem) {
	                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	                },

	                // Boolean properties
	                "enabled": function enabled(elem) {
	                    return elem.disabled === false;
	                },

	                "disabled": function disabled(elem) {
	                    return elem.disabled === true;
	                },

	                "checked": function checked(elem) {
	                    // In CSS3, :checked should return both checked and selected elements
	                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	                    var nodeName = elem.nodeName.toLowerCase();
	                    return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
	                },

	                "selected": function selected(elem) {
	                    // Accessing this property makes selected-by-default
	                    // options in Safari work properly
	                    if (elem.parentNode) {
	                        elem.parentNode.selectedIndex;
	                    }

	                    return elem.selected === true;
	                },

	                // Contents
	                "empty": function empty(elem) {
	                    // http://www.w3.org/TR/selectors/#empty-pseudo
	                    // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
	                    //   but not by others (comment: 8; processing instruction: 7; etc.)
	                    // nodeType < 6 works because attributes (2) do not appear as children
	                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	                        if (elem.nodeType < 6) {
	                            return false;
	                        }
	                    }
	                    return true;
	                },

	                "parent": function parent(elem) {
	                    return !Expr.pseudos["empty"](elem);
	                },

	                // Element/input types
	                "header": function header(elem) {
	                    return rheader.test(elem.nodeName);
	                },

	                "input": function input(elem) {
	                    return rinputs.test(elem.nodeName);
	                },

	                "button": function button(elem) {
	                    var name = elem.nodeName.toLowerCase();
	                    return name === "input" && elem.type === "button" || name === "button";
	                },

	                "text": function text(elem) {
	                    var attr;
	                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

	                    // Support: IE<8
	                    // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
	                    (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
	                },

	                // Position-in-collection
	                "first": createPositionalPseudo(function () {
	                    return [0];
	                }),

	                "last": createPositionalPseudo(function (matchIndexes, length) {
	                    return [length - 1];
	                }),

	                "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
	                    return [argument < 0 ? argument + length : argument];
	                }),

	                "even": createPositionalPseudo(function (matchIndexes, length) {
	                    var i = 0;
	                    for (; i < length; i += 2) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                }),

	                "odd": createPositionalPseudo(function (matchIndexes, length) {
	                    var i = 1;
	                    for (; i < length; i += 2) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                }),

	                "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
	                    var i = argument < 0 ? argument + length : argument;
	                    for (; --i >= 0;) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                }),

	                "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
	                    var i = argument < 0 ? argument + length : argument;
	                    for (; ++i < length;) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                })
	            }
	        };

	        Expr.pseudos["nth"] = Expr.pseudos["eq"];

	        // Add button/input type pseudos
	        for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
	            Expr.pseudos[i] = createInputPseudo(i);
	        }
	        for (i in { submit: true, reset: true }) {
	            Expr.pseudos[i] = createButtonPseudo(i);
	        }

	        // Easy API for creating new setFilters
	        function setFilters() {}

	        setFilters.prototype = Expr.filters = Expr.pseudos;
	        Expr.setFilters = new setFilters();

	        tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	            var matched,
	                match,
	                tokens,
	                type,
	                soFar,
	                groups,
	                preFilters,
	                cached = tokenCache[selector + " "];

	            if (cached) {
	                return parseOnly ? 0 : cached.slice(0);
	            }

	            soFar = selector;
	            groups = [];
	            preFilters = Expr.preFilter;

	            while (soFar) {

	                // Comma and first run
	                if (!matched || (match = rcomma.exec(soFar))) {
	                    if (match) {
	                        // Don't consume trailing commas as valid
	                        soFar = soFar.slice(match[0].length) || soFar;
	                    }
	                    groups.push(tokens = []);
	                }

	                matched = false;

	                // Combinators
	                if (match = rcombinators.exec(soFar)) {
	                    matched = match.shift();
	                    tokens.push({
	                        value: matched,
	                        // Cast descendant combinators to space
	                        type: match[0].replace(rtrim, " ")
	                    });
	                    soFar = soFar.slice(matched.length);
	                }

	                // Filters
	                for (type in Expr.filter) {
	                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
	                        matched = match.shift();
	                        tokens.push({
	                            value: matched,
	                            type: type,
	                            matches: match
	                        });
	                        soFar = soFar.slice(matched.length);
	                    }
	                }

	                if (!matched) {
	                    break;
	                }
	            }

	            // Return the length of the invalid excess
	            // if we're just parsing
	            // Otherwise, throw an error or return tokens
	            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
	            // Cache the tokens
	            tokenCache(selector, groups).slice(0);
	        };

	        function toSelector(tokens) {
	            var i = 0,
	                len = tokens.length,
	                selector = "";
	            for (; i < len; i++) {
	                selector += tokens[i].value;
	            }
	            return selector;
	        }

	        function addCombinator(matcher, combinator, base) {
	            var dir = combinator.dir,
	                checkNonElements = base && dir === "parentNode",
	                doneName = done++;

	            return combinator.first ?
	            // Check against closest ancestor/preceding element
	            function (elem, context, xml) {
	                while (elem = elem[dir]) {
	                    if (elem.nodeType === 1 || checkNonElements) {
	                        return matcher(elem, context, xml);
	                    }
	                }
	            } :

	            // Check against all ancestor/preceding elements
	            function (elem, context, xml) {
	                var oldCache,
	                    uniqueCache,
	                    outerCache,
	                    newCache = [dirruns, doneName];

	                // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
	                if (xml) {
	                    while (elem = elem[dir]) {
	                        if (elem.nodeType === 1 || checkNonElements) {
	                            if (matcher(elem, context, xml)) {
	                                return true;
	                            }
	                        }
	                    }
	                } else {
	                    while (elem = elem[dir]) {
	                        if (elem.nodeType === 1 || checkNonElements) {
	                            outerCache = elem[expando] || (elem[expando] = {});

	                            // Support: IE <9 only
	                            // Defend against cloned attroperties (jQuery gh-1709)
	                            uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

	                            if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

	                                // Assign to newCache so results back-propagate to previous elements
	                                return newCache[2] = oldCache[2];
	                            } else {
	                                // Reuse newcache so results back-propagate to previous elements
	                                uniqueCache[dir] = newCache;

	                                // A match means we're done; a fail means we have to keep checking
	                                if (newCache[2] = matcher(elem, context, xml)) {
	                                    return true;
	                                }
	                            }
	                        }
	                    }
	                }
	            };
	        }

	        function elementMatcher(matchers) {
	            return matchers.length > 1 ? function (elem, context, xml) {
	                var i = matchers.length;
	                while (i--) {
	                    if (!matchers[i](elem, context, xml)) {
	                        return false;
	                    }
	                }
	                return true;
	            } : matchers[0];
	        }

	        function multipleContexts(selector, contexts, results) {
	            var i = 0,
	                len = contexts.length;
	            for (; i < len; i++) {
	                Sizzle(selector, contexts[i], results);
	            }
	            return results;
	        }

	        function condense(unmatched, map, filter, context, xml) {
	            var elem,
	                newUnmatched = [],
	                i = 0,
	                len = unmatched.length,
	                mapped = map != null;

	            for (; i < len; i++) {
	                if (elem = unmatched[i]) {
	                    if (!filter || filter(elem, context, xml)) {
	                        newUnmatched.push(elem);
	                        if (mapped) {
	                            map.push(i);
	                        }
	                    }
	                }
	            }

	            return newUnmatched;
	        }

	        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	            if (postFilter && !postFilter[expando]) {
	                postFilter = setMatcher(postFilter);
	            }
	            if (postFinder && !postFinder[expando]) {
	                postFinder = setMatcher(postFinder, postSelector);
	            }
	            return markFunction(function (seed, results, context, xml) {
	                var temp,
	                    i,
	                    elem,
	                    preMap = [],
	                    postMap = [],
	                    preexisting = results.length,


	                // Get initial elements from seed or context
	                elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


	                // Prefilter to get matcher input, preserving a map for seed-results synchronization
	                matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
	                    matcherOut = matcher ?
	                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
	                postFinder || (seed ? preFilter : preexisting || postFilter) ?

	                // ...intermediate processing is necessary
	                [] :

	                // ...otherwise use results directly
	                results : matcherIn;

	                // Find primary matches
	                if (matcher) {
	                    matcher(matcherIn, matcherOut, context, xml);
	                }

	                // Apply postFilter
	                if (postFilter) {
	                    temp = condense(matcherOut, postMap);
	                    postFilter(temp, [], context, xml);

	                    // Un-match failing elements by moving them back to matcherIn
	                    i = temp.length;
	                    while (i--) {
	                        if (elem = temp[i]) {
	                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
	                        }
	                    }
	                }

	                if (seed) {
	                    if (postFinder || preFilter) {
	                        if (postFinder) {
	                            // Get the final matcherOut by condensing this intermediate into postFinder contexts
	                            temp = [];
	                            i = matcherOut.length;
	                            while (i--) {
	                                if (elem = matcherOut[i]) {
	                                    // Restore matcherIn since elem is not yet a final match
	                                    temp.push(matcherIn[i] = elem);
	                                }
	                            }
	                            postFinder(null, matcherOut = [], temp, xml);
	                        }

	                        // Move matched elements from seed to results to keep them synchronized
	                        i = matcherOut.length;
	                        while (i--) {
	                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

	                                seed[temp] = !(results[temp] = elem);
	                            }
	                        }
	                    }

	                    // Add elements to results, through postFinder if defined
	                } else {
	                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
	                    if (postFinder) {
	                        postFinder(null, results, matcherOut, xml);
	                    } else {
	                        push.apply(results, matcherOut);
	                    }
	                }
	            });
	        }

	        function matcherFromTokens(tokens) {
	            var checkContext,
	                matcher,
	                j,
	                len = tokens.length,
	                leadingRelative = Expr.relative[tokens[0].type],
	                implicitRelative = leadingRelative || Expr.relative[" "],
	                i = leadingRelative ? 1 : 0,


	            // The foundational matcher ensures that elements are reachable from top-level context(s)
	            matchContext = addCombinator(function (elem) {
	                return elem === checkContext;
	            }, implicitRelative, true),
	                matchAnyContext = addCombinator(function (elem) {
	                return indexOf(checkContext, elem) > -1;
	            }, implicitRelative, true),
	                matchers = [function (elem, context, xml) {
	                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
	                // Avoid hanging onto element (issue #299)
	                checkContext = null;
	                return ret;
	            }];

	            for (; i < len; i++) {
	                if (matcher = Expr.relative[tokens[i].type]) {
	                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
	                } else {
	                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

	                    // Return special upon seeing a positional matcher
	                    if (matcher[expando]) {
	                        // Find the next relative operator (if any) for proper handling
	                        j = ++i;
	                        for (; j < len; j++) {
	                            if (Expr.relative[tokens[j].type]) {
	                                break;
	                            }
	                        }
	                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
	                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
	                        tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
	                    }
	                    matchers.push(matcher);
	                }
	            }

	            return elementMatcher(matchers);
	        }

	        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	            var bySet = setMatchers.length > 0,
	                byElement = elementMatchers.length > 0,
	                superMatcher = function superMatcher(seed, context, xml, results, outermost) {
	                var elem,
	                    j,
	                    matcher,
	                    matchedCount = 0,
	                    i = "0",
	                    unmatched = seed && [],
	                    setMatched = [],
	                    contextBackup = outermostContext,

	                // We must always have either seed elements or outermost context
	                elems = seed || byElement && Expr.find["TAG"]("*", outermost),

	                // Use integer dirruns iff this is the outermost matcher
	                dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
	                    len = elems.length;

	                if (outermost) {
	                    outermostContext = context === document || context || outermost;
	                }

	                // Add elements passing elementMatchers directly to results
	                // Support: IE<9, Safari
	                // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
	                for (; i !== len && (elem = elems[i]) != null; i++) {
	                    if (byElement && elem) {
	                        j = 0;
	                        if (!context && elem.ownerDocument !== document) {
	                            setDocument(elem);
	                            xml = !documentIsHTML;
	                        }
	                        while (matcher = elementMatchers[j++]) {
	                            if (matcher(elem, context || document, xml)) {
	                                results.push(elem);
	                                break;
	                            }
	                        }
	                        if (outermost) {
	                            dirruns = dirrunsUnique;
	                        }
	                    }

	                    // Track unmatched elements for set filters
	                    if (bySet) {
	                        // They will have gone through all possible matchers
	                        if (elem = !matcher && elem) {
	                            matchedCount--;
	                        }

	                        // Lengthen the array for every element, matched or not
	                        if (seed) {
	                            unmatched.push(elem);
	                        }
	                    }
	                }

	                // `i` is now the count of elements visited above, and adding it to `matchedCount`
	                // makes the latter nonnegative.
	                matchedCount += i;

	                // Apply set filters to unmatched elements
	                // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
	                // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
	                // no element matchers and no seed.
	                // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
	                // case, which will result in a "00" `matchedCount` that differs from `i` but is also
	                // numerically zero.
	                if (bySet && i !== matchedCount) {
	                    j = 0;
	                    while (matcher = setMatchers[j++]) {
	                        matcher(unmatched, setMatched, context, xml);
	                    }

	                    if (seed) {
	                        // Reintegrate element matches to eliminate the need for sorting
	                        if (matchedCount > 0) {
	                            while (i--) {
	                                if (!(unmatched[i] || setMatched[i])) {
	                                    setMatched[i] = pop.call(results);
	                                }
	                            }
	                        }

	                        // Discard index placeholder values to get only actual matches
	                        setMatched = condense(setMatched);
	                    }

	                    // Add matches to results
	                    push.apply(results, setMatched);

	                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
	                    if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

	                        Sizzle.uniqueSort(results);
	                    }
	                }

	                // Override manipulation of globals by nested matchers
	                if (outermost) {
	                    dirruns = dirrunsUnique;
	                    outermostContext = contextBackup;
	                }

	                return unmatched;
	            };

	            return bySet ? markFunction(superMatcher) : superMatcher;
	        }

	        compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
	            var i,
	                setMatchers = [],
	                elementMatchers = [],
	                cached = compilerCache[selector + " "];

	            if (!cached) {
	                // Generate a function of recursive functions that can be used to check each element
	                if (!match) {
	                    match = tokenize(selector);
	                }
	                i = match.length;
	                while (i--) {
	                    cached = matcherFromTokens(match[i]);
	                    if (cached[expando]) {
	                        setMatchers.push(cached);
	                    } else {
	                        elementMatchers.push(cached);
	                    }
	                }

	                // Cache the compiled function
	                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

	                // Save selector and tokenization
	                cached.selector = selector;
	            }
	            return cached;
	        };

	        /**
	         * A low-level selection function that works with Sizzle's compiled
	         *  selector functions
	         * @param {String|Function} selector A selector or a pre-compiled
	         *  selector function built with Sizzle.compile
	         * @param {Element} context
	         * @param {Array} [results]
	         * @param {Array} [seed] A set of elements to match against
	         */
	        select = Sizzle.select = function (selector, context, results, seed) {
	            var i,
	                tokens,
	                token,
	                type,
	                find,
	                compiled = typeof selector === "function" && selector,
	                match = !seed && tokenize(selector = compiled.selector || selector);

	            results = results || [];

	            // Try to minimize operations if there is only one selector in the list and no seed
	            // (the latter of which guarantees us context)
	            if (match.length === 1) {

	                // Reduce context if the leading compound selector is an ID
	                tokens = match[0] = match[0].slice(0);
	                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

	                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
	                    if (!context) {
	                        return results;

	                        // Precompiled matchers will still verify ancestry, so step up a level
	                    } else if (compiled) {
	                        context = context.parentNode;
	                    }

	                    selector = selector.slice(tokens.shift().value.length);
	                }

	                // Fetch a seed set for right-to-left matching
	                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
	                while (i--) {
	                    token = tokens[i];

	                    // Abort if we hit a combinator
	                    if (Expr.relative[type = token.type]) {
	                        break;
	                    }
	                    if (find = Expr.find[type]) {
	                        // Search, expanding context for leading sibling combinators
	                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

	                            // If seed is empty or no tokens remain, we can return early
	                            tokens.splice(i, 1);
	                            selector = seed.length && toSelector(tokens);
	                            if (!selector) {
	                                push.apply(results, seed);
	                                return results;
	                            }

	                            break;
	                        }
	                    }
	                }
	            }

	            // Compile and execute a filtering function if one is not provided
	            // Provide `match` to avoid retokenization if we modified the selector above
	            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
	            return results;
	        };

	        // One-time assignments

	        // Sort stability
	        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

	        // Support: Chrome 14-35+
	        // Always assume duplicates if they aren't passed to the comparison function
	        support.detectDuplicates = !!hasDuplicate;

	        // Initialize against the default document
	        setDocument();

	        // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	        // Detached nodes confoundingly follow *each other*
	        support.sortDetached = assert(function (div1) {
	            // Should return 1, but returns 4 (following)
	            return div1.compareDocumentPosition(document.createElement("div")) & 1;
	        });

	        // Support: IE<8
	        // Prevent attribute/property "interpolation"
	        // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	        if (!assert(function (div) {
	            div.innerHTML = "<a href='#'></a>";
	            return div.firstChild.getAttribute("href") === "#";
	        })) {
	            addHandle("type|href|height|width", function (elem, name, isXML) {
	                if (!isXML) {
	                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
	                }
	            });
	        }

	        // Support: IE<9
	        // Use defaultValue in place of getAttribute("value")
	        if (!support.attributes || !assert(function (div) {
	            div.innerHTML = "<input/>";
	            div.firstChild.setAttribute("value", "");
	            return div.firstChild.getAttribute("value") === "";
	        })) {
	            addHandle("value", function (elem, name, isXML) {
	                if (!isXML && elem.nodeName.toLowerCase() === "input") {
	                    return elem.defaultValue;
	                }
	            });
	        }

	        // Support: IE<9
	        // Use getAttributeNode to fetch booleans when getAttribute lies
	        if (!assert(function (div) {
	            return div.getAttribute("disabled") == null;
	        })) {
	            addHandle(booleans, function (elem, name, isXML) {
	                var val;
	                if (!isXML) {
	                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	                }
	            });
	        }

	        return Sizzle;
	    }(window);

	    jQuery.find = Sizzle;
	    jQuery.expr = Sizzle.selectors;
	    jQuery.expr[":"] = jQuery.expr.pseudos;
	    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	    jQuery.text = Sizzle.getText;
	    jQuery.isXMLDoc = Sizzle.isXML;
	    jQuery.contains = Sizzle.contains;

	    var dir = function dir(elem, _dir, until) {
	        var matched = [],
	            truncate = until !== undefined;

	        while ((elem = elem[_dir]) && elem.nodeType !== 9) {
	            if (elem.nodeType === 1) {
	                if (truncate && jQuery(elem).is(until)) {
	                    break;
	                }
	                matched.push(elem);
	            }
	        }
	        return matched;
	    };

	    var _siblings = function _siblings(n, elem) {
	        var matched = [];

	        for (; n; n = n.nextSibling) {
	            if (n.nodeType === 1 && n !== elem) {
	                matched.push(n);
	            }
	        }

	        return matched;
	    };

	    var rneedsContext = jQuery.expr.match.needsContext;

	    var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;

	    var risSimple = /^.[^:#\[\.,]*$/;

	    // Implement the identical functionality for filter and not
	    function winnow(elements, qualifier, not) {
	        if (jQuery.isFunction(qualifier)) {
	            return jQuery.grep(elements, function (elem, i) {
	                /* jshint -W018 */
	                return !!qualifier.call(elem, i, elem) !== not;
	            });
	        }

	        if (qualifier.nodeType) {
	            return jQuery.grep(elements, function (elem) {
	                return elem === qualifier !== not;
	            });
	        }

	        if (typeof qualifier === "string") {
	            if (risSimple.test(qualifier)) {
	                return jQuery.filter(qualifier, elements, not);
	            }

	            qualifier = jQuery.filter(qualifier, elements);
	        }

	        return jQuery.grep(elements, function (elem) {
	            return jQuery.inArray(elem, qualifier) > -1 !== not;
	        });
	    }

	    jQuery.filter = function (expr, elems, not) {
	        var elem = elems[0];

	        if (not) {
	            expr = ":not(" + expr + ")";
	        }

	        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
	            return elem.nodeType === 1;
	        }));
	    };

	    jQuery.fn.extend({
	        find: function find(selector) {
	            var i,
	                ret = [],
	                self = this,
	                len = self.length;

	            if (typeof selector !== "string") {
	                return this.pushStack(jQuery(selector).filter(function () {
	                    for (i = 0; i < len; i++) {
	                        if (jQuery.contains(self[i], this)) {
	                            return true;
	                        }
	                    }
	                }));
	            }

	            for (i = 0; i < len; i++) {
	                jQuery.find(selector, self[i], ret);
	            }

	            // Needed because $( selector, context ) becomes $( context ).find( selector )
	            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
	            ret.selector = this.selector ? this.selector + " " + selector : selector;
	            return ret;
	        },
	        filter: function filter(selector) {
	            return this.pushStack(winnow(this, selector || [], false));
	        },
	        not: function not(selector) {
	            return this.pushStack(winnow(this, selector || [], true));
	        },
	        is: function is(selector) {
	            return !!winnow(this,

	            // If this is a positional/relative selector, check membership in the returned set
	            // so $("p:first").is("p:last") won't return true for a doc with two "p".
	            typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
	        }
	    });

	    // Initialize a jQuery object


	    // A central reference to the root jQuery(document)
	    var rootjQuery,


	    // A simple way to check for HTML strings
	    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	    // Strict HTML recognition (#11290: must start with <)
	    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	        init = jQuery.fn.init = function (selector, context, root) {
	        var match, elem;

	        // HANDLE: $(""), $(null), $(undefined), $(false)
	        if (!selector) {
	            return this;
	        }

	        // init accepts an alternate rootjQuery
	        // so migrate can support jQuery.sub (gh-2101)
	        root = root || rootjQuery;

	        // Handle HTML strings
	        if (typeof selector === "string") {
	            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {

	                // Assume that strings that start and end with <> are HTML and skip the regex check
	                match = [null, selector, null];
	            } else {
	                match = rquickExpr.exec(selector);
	            }

	            // Match html or make sure no context is specified for #id
	            if (match && (match[1] || !context)) {

	                // HANDLE: $(html) -> $(array)
	                if (match[1]) {
	                    context = context instanceof jQuery ? context[0] : context;

	                    // scripts is true for back-compat
	                    // Intentionally let the error be thrown if parseHTML is not present
	                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

	                    // HANDLE: $(html, props)
	                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
	                        for (match in context) {

	                            // Properties of context are called as methods if possible
	                            if (jQuery.isFunction(this[match])) {
	                                this[match](context[match]);

	                                // ...and otherwise set as attributes
	                            } else {
	                                this.attr(match, context[match]);
	                            }
	                        }
	                    }

	                    return this;

	                    // HANDLE: $(#id)
	                } else {
	                    elem = document.getElementById(match[2]);

	                    // Check parentNode to catch when Blackberry 4.6 returns
	                    // nodes that are no longer in the document #6963
	                    if (elem && elem.parentNode) {

	                        // Handle the case where IE and Opera return items
	                        // by name instead of ID
	                        if (elem.id !== match[2]) {
	                            return rootjQuery.find(selector);
	                        }

	                        // Otherwise, we inject the element directly into the jQuery object
	                        this.length = 1;
	                        this[0] = elem;
	                    }

	                    this.context = document;
	                    this.selector = selector;
	                    return this;
	                }

	                // HANDLE: $(expr, $(...))
	            } else if (!context || context.jquery) {
	                return (context || root).find(selector);

	                // HANDLE: $(expr, context)
	                // (which is just equivalent to: $(context).find(expr)
	            } else {
	                return this.constructor(context).find(selector);
	            }

	            // HANDLE: $(DOMElement)
	        } else if (selector.nodeType) {
	            this.context = this[0] = selector;
	            this.length = 1;
	            return this;

	            // HANDLE: $(function)
	            // Shortcut for document ready
	        } else if (jQuery.isFunction(selector)) {
	            return typeof root.ready !== "undefined" ? root.ready(selector) :

	            // Execute immediately if ready is not present
	            selector(jQuery);
	        }

	        if (selector.selector !== undefined) {
	            this.selector = selector.selector;
	            this.context = selector.context;
	        }

	        return jQuery.makeArray(selector, this);
	    };

	    // Give the init function the jQuery prototype for later instantiation
	    init.prototype = jQuery.fn;

	    // Initialize central reference
	    rootjQuery = jQuery(document);

	    var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	    // methods guaranteed to produce a unique set when starting from a unique set
	    guaranteedUnique = {
	        children: true,
	        contents: true,
	        next: true,
	        prev: true
	    };

	    jQuery.fn.extend({
	        has: function has(target) {
	            var i,
	                targets = jQuery(target, this),
	                len = targets.length;

	            return this.filter(function () {
	                for (i = 0; i < len; i++) {
	                    if (jQuery.contains(this, targets[i])) {
	                        return true;
	                    }
	                }
	            });
	        },

	        closest: function closest(selectors, context) {
	            var cur,
	                i = 0,
	                l = this.length,
	                matched = [],
	                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;

	            for (; i < l; i++) {
	                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

	                    // Always skip document fragments
	                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :

	                    // Don't pass non-elements to Sizzle
	                    cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

	                        matched.push(cur);
	                        break;
	                    }
	                }
	            }

	            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
	        },

	        // Determine the position of an element within
	        // the matched set of elements
	        index: function index(elem) {

	            // No argument, return index in parent
	            if (!elem) {
	                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	            }

	            // index in selector
	            if (typeof elem === "string") {
	                return jQuery.inArray(this[0], jQuery(elem));
	            }

	            // Locate the position of the desired element
	            return jQuery.inArray(
	            // If it receives a jQuery object, the first element is used
	            elem.jquery ? elem[0] : elem, this);
	        },

	        add: function add(selector, context) {
	            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
	        },

	        addBack: function addBack(selector) {
	            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
	        }
	    });

	    function sibling(cur, dir) {
	        do {
	            cur = cur[dir];
	        } while (cur && cur.nodeType !== 1);

	        return cur;
	    }

	    jQuery.each({
	        parent: function parent(elem) {
	            var parent = elem.parentNode;
	            return parent && parent.nodeType !== 11 ? parent : null;
	        },
	        parents: function parents(elem) {
	            return dir(elem, "parentNode");
	        },
	        parentsUntil: function parentsUntil(elem, i, until) {
	            return dir(elem, "parentNode", until);
	        },
	        next: function next(elem) {
	            return sibling(elem, "nextSibling");
	        },
	        prev: function prev(elem) {
	            return sibling(elem, "previousSibling");
	        },
	        nextAll: function nextAll(elem) {
	            return dir(elem, "nextSibling");
	        },
	        prevAll: function prevAll(elem) {
	            return dir(elem, "previousSibling");
	        },
	        nextUntil: function nextUntil(elem, i, until) {
	            return dir(elem, "nextSibling", until);
	        },
	        prevUntil: function prevUntil(elem, i, until) {
	            return dir(elem, "previousSibling", until);
	        },
	        siblings: function siblings(elem) {
	            return _siblings((elem.parentNode || {}).firstChild, elem);
	        },
	        children: function children(elem) {
	            return _siblings(elem.firstChild);
	        },
	        contents: function contents(elem) {
	            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
	        }
	    }, function (name, fn) {
	        jQuery.fn[name] = function (until, selector) {
	            var ret = jQuery.map(this, fn, until);

	            if (name.slice(-5) !== "Until") {
	                selector = until;
	            }

	            if (selector && typeof selector === "string") {
	                ret = jQuery.filter(selector, ret);
	            }

	            if (this.length > 1) {

	                // Remove duplicates
	                if (!guaranteedUnique[name]) {
	                    ret = jQuery.uniqueSort(ret);
	                }

	                // Reverse order for parents* and prev-derivatives
	                if (rparentsprev.test(name)) {
	                    ret = ret.reverse();
	                }
	            }

	            return this.pushStack(ret);
	        };
	    });
	    var rnotwhite = /\S+/g;

	    // Convert String-formatted options into Object-formatted ones
	    function createOptions(options) {
	        var object = {};
	        jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
	            object[flag] = true;
	        });
	        return object;
	    }

	    /*
	     * Create a callback list using the following parameters:
	     *
	     *	options: an optional list of space-separated options that will change how
	     *			the callback list behaves or a more traditional option object
	     *
	     * By default a callback list will act like an event callback list and can be
	     * "fired" multiple times.
	     *
	     * Possible options:
	     *
	     *	once:			will ensure the callback list can only be fired once (like a Deferred)
	     *
	     *	memory:			will keep track of previous values and will call any callback added
	     *					after the list has been fired right away with the latest "memorized"
	     *					values (like a Deferred)
	     *
	     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	     *
	     *	stopOnFalse:	interrupt callings when a callback returns false
	     *
	     */
	    jQuery.Callbacks = function (options) {

	        // Convert options from String-formatted to Object-formatted if needed
	        // (we check in cache first)
	        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

	        var // Flag to know if list is currently firing
	        firing,


	        // Last fire value for non-forgettable lists
	        memory,


	        // Flag to know if list was already fired
	        _fired,


	        // Flag to prevent firing
	        _locked,


	        // Actual callback list
	        list = [],


	        // Queue of execution data for repeatable lists
	        queue = [],


	        // Index of currently firing callback (modified by add/remove as needed)
	        firingIndex = -1,


	        // Fire callbacks
	        fire = function fire() {

	            // Enforce single-firing
	            _locked = options.once;

	            // Execute callbacks for all pending executions,
	            // respecting firingIndex overrides and runtime changes
	            _fired = firing = true;
	            for (; queue.length; firingIndex = -1) {
	                memory = queue.shift();
	                while (++firingIndex < list.length) {

	                    // Run callback and check for early termination
	                    if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

	                        // Jump to end and forget the data so .add doesn't re-fire
	                        firingIndex = list.length;
	                        memory = false;
	                    }
	                }
	            }

	            // Forget the data if we're done with it
	            if (!options.memory) {
	                memory = false;
	            }

	            firing = false;

	            // Clean up if we're done firing for good
	            if (_locked) {

	                // Keep an empty list if we have data for future add calls
	                if (memory) {
	                    list = [];

	                    // Otherwise, this object is spent
	                } else {
	                    list = "";
	                }
	            }
	        },


	        // Actual Callbacks object
	        self = {

	            // Add a callback or a collection of callbacks to the list
	            add: function add() {
	                if (list) {

	                    // If we have memory from a past run, we should fire after adding
	                    if (memory && !firing) {
	                        firingIndex = list.length - 1;
	                        queue.push(memory);
	                    }

	                    (function add(args) {
	                        jQuery.each(args, function (_, arg) {
	                            if (jQuery.isFunction(arg)) {
	                                if (!options.unique || !self.has(arg)) {
	                                    list.push(arg);
	                                }
	                            } else if (arg && arg.length && jQuery.type(arg) !== "string") {

	                                // Inspect recursively
	                                add(arg);
	                            }
	                        });
	                    })(arguments);

	                    if (memory && !firing) {
	                        fire();
	                    }
	                }
	                return this;
	            },

	            // Remove a callback from the list
	            remove: function remove() {
	                jQuery.each(arguments, function (_, arg) {
	                    var index;
	                    while ((index = jQuery.inArray(arg, list, index)) > -1) {
	                        list.splice(index, 1);

	                        // Handle firing indexes
	                        if (index <= firingIndex) {
	                            firingIndex--;
	                        }
	                    }
	                });
	                return this;
	            },

	            // Check if a given callback is in the list.
	            // If no argument is given, return whether or not list has callbacks attached.
	            has: function has(fn) {
	                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
	            },

	            // Remove all callbacks from the list
	            empty: function empty() {
	                if (list) {
	                    list = [];
	                }
	                return this;
	            },

	            // Disable .fire and .add
	            // Abort any current/pending executions
	            // Clear all callbacks and values
	            disable: function disable() {
	                _locked = queue = [];
	                list = memory = "";
	                return this;
	            },
	            disabled: function disabled() {
	                return !list;
	            },

	            // Disable .fire
	            // Also disable .add unless we have memory (since it would have no effect)
	            // Abort any pending executions
	            lock: function lock() {
	                _locked = true;
	                if (!memory) {
	                    self.disable();
	                }
	                return this;
	            },
	            locked: function locked() {
	                return !!_locked;
	            },

	            // Call all callbacks with the given context and arguments
	            fireWith: function fireWith(context, args) {
	                if (!_locked) {
	                    args = args || [];
	                    args = [context, args.slice ? args.slice() : args];
	                    queue.push(args);
	                    if (!firing) {
	                        fire();
	                    }
	                }
	                return this;
	            },

	            // Call all the callbacks with the given arguments
	            fire: function fire() {
	                self.fireWith(this, arguments);
	                return this;
	            },

	            // To know if the callbacks have already been called at least once
	            fired: function fired() {
	                return !!_fired;
	            }
	        };

	        return self;
	    };

	    jQuery.extend({

	        Deferred: function Deferred(func) {
	            var tuples = [

	            // action, add listener, listener list, final state
	            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
	                _state = "pending",
	                _promise = {
	                state: function state() {
	                    return _state;
	                },
	                always: function always() {
	                    deferred.done(arguments).fail(arguments);
	                    return this;
	                },
	                then: function then() /* fnDone, fnFail, fnProgress */{
	                    var fns = arguments;
	                    return jQuery.Deferred(function (newDefer) {
	                        jQuery.each(tuples, function (i, tuple) {
	                            var fn = jQuery.isFunction(fns[i]) && fns[i];

	                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
	                            deferred[tuple[1]](function () {
	                                var returned = fn && fn.apply(this, arguments);
	                                if (returned && jQuery.isFunction(returned.promise)) {
	                                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
	                                } else {
	                                    newDefer[tuple[0] + "With"](this === _promise ? newDefer.promise() : this, fn ? [returned] : arguments);
	                                }
	                            });
	                        });
	                        fns = null;
	                    }).promise();
	                },

	                // Get a promise for this deferred
	                // If obj is provided, the promise aspect is added to the object
	                promise: function promise(obj) {
	                    return obj != null ? jQuery.extend(obj, _promise) : _promise;
	                }
	            },
	                deferred = {};

	            // Keep pipe for back-compat
	            _promise.pipe = _promise.then;

	            // Add list-specific methods
	            jQuery.each(tuples, function (i, tuple) {
	                var list = tuple[2],
	                    stateString = tuple[3];

	                // promise[ done | fail | progress ] = list.add
	                _promise[tuple[1]] = list.add;

	                // Handle state
	                if (stateString) {
	                    list.add(function () {

	                        // state = [ resolved | rejected ]
	                        _state = stateString;

	                        // [ reject_list | resolve_list ].disable; progress_list.lock
	                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
	                }

	                // deferred[ resolve | reject | notify ]
	                deferred[tuple[0]] = function () {
	                    deferred[tuple[0] + "With"](this === deferred ? _promise : this, arguments);
	                    return this;
	                };
	                deferred[tuple[0] + "With"] = list.fireWith;
	            });

	            // Make the deferred a promise
	            _promise.promise(deferred);

	            // Call given func if any
	            if (func) {
	                func.call(deferred, deferred);
	            }

	            // All done!
	            return deferred;
	        },

	        // Deferred helper
	        when: function when(subordinate /* , ..., subordinateN */) {
	            var i = 0,
	                resolveValues = _slice.call(arguments),
	                length = resolveValues.length,


	            // the count of uncompleted subordinates
	            remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


	            // the master Deferred.
	            // If resolveValues consist of only a single Deferred, just use that.
	            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


	            // Update function for both resolve and progress values
	            updateFunc = function updateFunc(i, contexts, values) {
	                return function (value) {
	                    contexts[i] = this;
	                    values[i] = arguments.length > 1 ? _slice.call(arguments) : value;
	                    if (values === progressValues) {
	                        deferred.notifyWith(contexts, values);
	                    } else if (! --remaining) {
	                        deferred.resolveWith(contexts, values);
	                    }
	                };
	            },
	                progressValues,
	                progressContexts,
	                resolveContexts;

	            // add listeners to Deferred subordinates; treat others as resolved
	            if (length > 1) {
	                progressValues = new Array(length);
	                progressContexts = new Array(length);
	                resolveContexts = new Array(length);
	                for (; i < length; i++) {
	                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
	                        resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
	                    } else {
	                        --remaining;
	                    }
	                }
	            }

	            // if we're not waiting on anything, resolve the master
	            if (!remaining) {
	                deferred.resolveWith(resolveContexts, resolveValues);
	            }

	            return deferred.promise();
	        }
	    });

	    // The deferred used on DOM ready
	    var readyList;

	    jQuery.fn.ready = function (fn) {

	        // Add the callback
	        jQuery.ready.promise().done(fn);

	        return this;
	    };

	    jQuery.extend({

	        // Is the DOM ready to be used? Set to true once it occurs.
	        isReady: false,

	        // A counter to track how many items to wait for before
	        // the ready event fires. See #6781
	        readyWait: 1,

	        // Hold (or release) the ready event
	        holdReady: function holdReady(hold) {
	            if (hold) {
	                jQuery.readyWait++;
	            } else {
	                jQuery.ready(true);
	            }
	        },

	        // Handle when the DOM is ready
	        ready: function ready(wait) {

	            // Abort if there are pending holds or we're already ready
	            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
	                return;
	            }

	            // Remember that the DOM is ready
	            jQuery.isReady = true;

	            // If a normal DOM Ready event fired, decrement, and wait if need be
	            if (wait !== true && --jQuery.readyWait > 0) {
	                return;
	            }

	            // If there are functions bound, to execute
	            readyList.resolveWith(document, [jQuery]);

	            // Trigger any bound ready events
	            if (jQuery.fn.triggerHandler) {
	                jQuery(document).triggerHandler("ready");
	                jQuery(document).off("ready");
	            }
	        }
	    });

	    /**
	     * Clean-up method for dom ready events
	     */
	    function detach() {
	        if (document.addEventListener) {
	            document.removeEventListener("DOMContentLoaded", completed);
	            window.removeEventListener("load", completed);
	        } else {
	            document.detachEvent("onreadystatechange", completed);
	            window.detachEvent("onload", completed);
	        }
	    }

	    /**
	     * The ready event handler and self cleanup method
	     */
	    function completed() {

	        // readyState === "complete" is good enough for us to call the dom ready in oldIE
	        if (document.addEventListener || window.event.type === "load" || document.readyState === "complete") {

	            detach();
	            jQuery.ready();
	        }
	    }

	    jQuery.ready.promise = function (obj) {
	        if (!readyList) {

	            readyList = jQuery.Deferred();

	            // Catch cases where $(document).ready() is called
	            // after the browser event has already occurred.
	            // Support: IE6-10
	            // Older IE sometimes signals "interactive" too soon
	            if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

	                // Handle it asynchronously to allow scripts the opportunity to delay ready
	                window.setTimeout(jQuery.ready);

	                // Standards-based browsers support DOMContentLoaded
	            } else if (document.addEventListener) {

	                // Use the handy event callback
	                document.addEventListener("DOMContentLoaded", completed);

	                // A fallback to window.onload, that will always work
	                window.addEventListener("load", completed);

	                // If IE event model is used
	            } else {

	                // Ensure firing before onload, maybe late but safe also for iframes
	                document.attachEvent("onreadystatechange", completed);

	                // A fallback to window.onload, that will always work
	                window.attachEvent("onload", completed);

	                // If IE and not a frame
	                // continually check to see if the document is ready
	                var top = false;

	                try {
	                    top = window.frameElement == null && document.documentElement;
	                } catch (e) {}

	                if (top && top.doScroll) {
	                    (function doScrollCheck() {
	                        if (!jQuery.isReady) {

	                            try {

	                                // Use the trick by Diego Perini
	                                // http://javascript.nwbox.com/IEContentLoaded/
	                                top.doScroll("left");
	                            } catch (e) {
	                                return window.setTimeout(doScrollCheck, 50);
	                            }

	                            // detach all dom ready events
	                            detach();

	                            // and execute any waiting functions
	                            jQuery.ready();
	                        }
	                    })();
	                }
	            }
	        }
	        return readyList.promise(obj);
	    };

	    // Kick off the DOM ready check even if the user does not
	    jQuery.ready.promise();

	    // Support: IE<9
	    // Iteration over object's inherited properties before its own
	    var i;
	    for (i in jQuery(support)) {
	        break;
	    }
	    support.ownFirst = i === "0";

	    // Note: most support tests are defined in their respective modules.
	    // false until the test is run
	    support.inlineBlockNeedsLayout = false;

	    // Execute ASAP in case we need to set body.style.zoom
	    jQuery(function () {

	        // Minified: var a,b,c,d
	        var val, div, body, container;

	        body = document.getElementsByTagName("body")[0];
	        if (!body || !body.style) {

	            // Return for frameset docs that don't have a body
	            return;
	        }

	        // Setup
	        div = document.createElement("div");
	        container = document.createElement("div");
	        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	        body.appendChild(container).appendChild(div);

	        if (typeof div.style.zoom !== "undefined") {

	            // Support: IE<8
	            // Check if natively block-level elements act like inline-block
	            // elements when setting their display to 'inline' and giving
	            // them layout
	            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

	            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
	            if (val) {

	                // Prevent IE 6 from affecting layout for positioned elements #11048
	                // Prevent IE from shrinking the body in IE 7 mode #12869
	                // Support: IE<8
	                body.style.zoom = 1;
	            }
	        }

	        body.removeChild(container);
	    });

	    (function () {
	        var div = document.createElement("div");

	        // Support: IE<9
	        support.deleteExpando = true;
	        try {
	            delete div.test;
	        } catch (e) {
	            support.deleteExpando = false;
	        }

	        // Null elements to avoid leaks in IE.
	        div = null;
	    })();
	    var acceptData = function acceptData(elem) {
	        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
	            nodeType = +elem.nodeType || 1;

	        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	        return nodeType !== 1 && nodeType !== 9 ? false :

	        // Nodes accept data unless otherwise specified; rejection can be conditional
	        !noData || noData !== true && elem.getAttribute("classid") === noData;
	    };

	    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	        rmultiDash = /([A-Z])/g;

	    function dataAttr(elem, key, data) {

	        // If nothing was found internally, try to fetch any
	        // data from the HTML5 data-* attribute
	        if (data === undefined && elem.nodeType === 1) {

	            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

	            data = elem.getAttribute(name);

	            if (typeof data === "string") {
	                try {
	                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null :

	                    // Only convert to a number if it doesn't change the string
	                    +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
	                } catch (e) {}

	                // Make sure we set the data so it isn't changed later
	                jQuery.data(elem, key, data);
	            } else {
	                data = undefined;
	            }
	        }

	        return data;
	    }

	    // checks a cache object for emptiness
	    function isEmptyDataObject(obj) {
	        var name;
	        for (name in obj) {

	            // if the public data object is empty, the private is still empty
	            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
	                continue;
	            }
	            if (name !== "toJSON") {
	                return false;
	            }
	        }

	        return true;
	    }

	    function internalData(elem, name, data, pvt /* Internal Use Only */) {
	        if (!acceptData(elem)) {
	            return;
	        }

	        var ret,
	            thisCache,
	            internalKey = jQuery.expando,


	        // We have to handle DOM nodes and JS objects differently because IE6-7
	        // can't GC object references properly across the DOM-JS boundary
	        isNode = elem.nodeType,


	        // Only DOM nodes need the global jQuery cache; JS object data is
	        // attached directly to the object so GC can occur automatically
	        cache = isNode ? jQuery.cache : elem,


	        // Only defining an ID for JS objects if its cache already exists allows
	        // the code to shortcut on the same path as a DOM node with no cache
	        id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

	        // Avoid doing any more work than we need to when trying to get data on an
	        // object that has no data at all
	        if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === "string") {
	            return;
	        }

	        if (!id) {

	            // Only DOM nodes need a new unique ID for each element since their data
	            // ends up in the global cache
	            if (isNode) {
	                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
	            } else {
	                id = internalKey;
	            }
	        }

	        if (!cache[id]) {

	            // Avoid exposing jQuery metadata on plain JS objects when the object
	            // is serialized using JSON.stringify
	            cache[id] = isNode ? {} : { toJSON: jQuery.noop };
	        }

	        // An object can be passed to jQuery.data instead of a key/value pair; this gets
	        // shallow copied over onto the existing cache
	        if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "object" || typeof name === "function") {
	            if (pvt) {
	                cache[id] = jQuery.extend(cache[id], name);
	            } else {
	                cache[id].data = jQuery.extend(cache[id].data, name);
	            }
	        }

	        thisCache = cache[id];

	        // jQuery data() is stored in a separate object inside the object's internal data
	        // cache in order to avoid key collisions between internal data and user-defined
	        // data.
	        if (!pvt) {
	            if (!thisCache.data) {
	                thisCache.data = {};
	            }

	            thisCache = thisCache.data;
	        }

	        if (data !== undefined) {
	            thisCache[jQuery.camelCase(name)] = data;
	        }

	        // Check for both converted-to-camel and non-converted data property names
	        // If a data property was specified
	        if (typeof name === "string") {

	            // First Try to find as-is property data
	            ret = thisCache[name];

	            // Test for null|undefined property data
	            if (ret == null) {

	                // Try to find the camelCased property
	                ret = thisCache[jQuery.camelCase(name)];
	            }
	        } else {
	            ret = thisCache;
	        }

	        return ret;
	    }

	    function internalRemoveData(elem, name, pvt) {
	        if (!acceptData(elem)) {
	            return;
	        }

	        var thisCache,
	            i,
	            isNode = elem.nodeType,


	        // See jQuery.data for more information
	        cache = isNode ? jQuery.cache : elem,
	            id = isNode ? elem[jQuery.expando] : jQuery.expando;

	        // If there is already no cache entry for this object, there is no
	        // purpose in continuing
	        if (!cache[id]) {
	            return;
	        }

	        if (name) {

	            thisCache = pvt ? cache[id] : cache[id].data;

	            if (thisCache) {

	                // Support array or space separated string names for data keys
	                if (!jQuery.isArray(name)) {

	                    // try the string as a key before any manipulation
	                    if (name in thisCache) {
	                        name = [name];
	                    } else {

	                        // split the camel cased version by spaces unless a key with the spaces exists
	                        name = jQuery.camelCase(name);
	                        if (name in thisCache) {
	                            name = [name];
	                        } else {
	                            name = name.split(" ");
	                        }
	                    }
	                } else {

	                    // If "name" is an array of keys...
	                    // When data is initially created, via ("key", "val") signature,
	                    // keys will be converted to camelCase.
	                    // Since there is no way to tell _how_ a key was added, remove
	                    // both plain key and camelCase key. #12786
	                    // This will only penalize the array argument path.
	                    name = name.concat(jQuery.map(name, jQuery.camelCase));
	                }

	                i = name.length;
	                while (i--) {
	                    delete thisCache[name[i]];
	                }

	                // If there is no data left in the cache, we want to continue
	                // and let the cache object itself get destroyed
	                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
	                    return;
	                }
	            }
	        }

	        // See jQuery.data for more information
	        if (!pvt) {
	            delete cache[id].data;

	            // Don't destroy the parent cache unless the internal data object
	            // had been the only thing left in it
	            if (!isEmptyDataObject(cache[id])) {
	                return;
	            }
	        }

	        // Destroy the cache
	        if (isNode) {
	            jQuery.cleanData([elem], true);

	            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	            /* jshint eqeqeq: false */
	        } else if (support.deleteExpando || cache != cache.window) {
	            /* jshint eqeqeq: true */
	            delete cache[id];

	            // When all else fails, undefined
	        } else {
	            cache[id] = undefined;
	        }
	    }

	    jQuery.extend({
	        cache: {},

	        // The following elements (space-suffixed to avoid Object.prototype collisions)
	        // throw uncatchable exceptions if you attempt to set expando properties
	        noData: {
	            "applet ": true,
	            "embed ": true,

	            // ...but Flash objects (which have this classid) *can* handle expandos
	            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	        },

	        hasData: function hasData(elem) {
	            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
	            return !!elem && !isEmptyDataObject(elem);
	        },

	        data: function data(elem, name, _data) {
	            return internalData(elem, name, _data);
	        },

	        removeData: function removeData(elem, name) {
	            return internalRemoveData(elem, name);
	        },

	        // For internal use only.
	        _data: function _data(elem, name, data) {
	            return internalData(elem, name, data, true);
	        },

	        _removeData: function _removeData(elem, name) {
	            return internalRemoveData(elem, name, true);
	        }
	    });

	    jQuery.fn.extend({
	        data: function data(key, value) {
	            var i,
	                name,
	                data,
	                elem = this[0],
	                attrs = elem && elem.attributes;

	            // Special expections of .data basically thwart jQuery.access,
	            // so implement the relevant behavior ourselves

	            // Gets all values
	            if (key === undefined) {
	                if (this.length) {
	                    data = jQuery.data(elem);

	                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
	                        i = attrs.length;
	                        while (i--) {

	                            // Support: IE11+
	                            // The attrs elements can be null (#14894)
	                            if (attrs[i]) {
	                                name = attrs[i].name;
	                                if (name.indexOf("data-") === 0) {
	                                    name = jQuery.camelCase(name.slice(5));
	                                    dataAttr(elem, name, data[name]);
	                                }
	                            }
	                        }
	                        jQuery._data(elem, "parsedAttrs", true);
	                    }
	                }

	                return data;
	            }

	            // Sets multiple values
	            if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
	                return this.each(function () {
	                    jQuery.data(this, key);
	                });
	            }

	            return arguments.length > 1 ?

	            // Sets one value
	            this.each(function () {
	                jQuery.data(this, key, value);
	            }) :

	            // Gets one value
	            // Try to fetch any internally stored data first
	            elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
	        },

	        removeData: function removeData(key) {
	            return this.each(function () {
	                jQuery.removeData(this, key);
	            });
	        }
	    });

	    jQuery.extend({
	        queue: function queue(elem, type, data) {
	            var queue;

	            if (elem) {
	                type = (type || "fx") + "queue";
	                queue = jQuery._data(elem, type);

	                // Speed up dequeue by getting out quickly if this is just a lookup
	                if (data) {
	                    if (!queue || jQuery.isArray(data)) {
	                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
	                    } else {
	                        queue.push(data);
	                    }
	                }
	                return queue || [];
	            }
	        },

	        dequeue: function dequeue(elem, type) {
	            type = type || "fx";

	            var queue = jQuery.queue(elem, type),
	                startLength = queue.length,
	                fn = queue.shift(),
	                hooks = jQuery._queueHooks(elem, type),
	                next = function next() {
	                jQuery.dequeue(elem, type);
	            };

	            // If the fx queue is dequeued, always remove the progress sentinel
	            if (fn === "inprogress") {
	                fn = queue.shift();
	                startLength--;
	            }

	            if (fn) {

	                // Add a progress sentinel to prevent the fx queue from being
	                // automatically dequeued
	                if (type === "fx") {
	                    queue.unshift("inprogress");
	                }

	                // clear up the last queue stop function
	                delete hooks.stop;
	                fn.call(elem, next, hooks);
	            }

	            if (!startLength && hooks) {
	                hooks.empty.fire();
	            }
	        },

	        // not intended for public consumption - generates a queueHooks object,
	        // or returns the current one
	        _queueHooks: function _queueHooks(elem, type) {
	            var key = type + "queueHooks";
	            return jQuery._data(elem, key) || jQuery._data(elem, key, {
	                empty: jQuery.Callbacks("once memory").add(function () {
	                    jQuery._removeData(elem, type + "queue");
	                    jQuery._removeData(elem, key);
	                })
	            });
	        }
	    });

	    jQuery.fn.extend({
	        queue: function queue(type, data) {
	            var setter = 2;

	            if (typeof type !== "string") {
	                data = type;
	                type = "fx";
	                setter--;
	            }

	            if (arguments.length < setter) {
	                return jQuery.queue(this[0], type);
	            }

	            return data === undefined ? this : this.each(function () {
	                var queue = jQuery.queue(this, type, data);

	                // ensure a hooks for this queue
	                jQuery._queueHooks(this, type);

	                if (type === "fx" && queue[0] !== "inprogress") {
	                    jQuery.dequeue(this, type);
	                }
	            });
	        },
	        dequeue: function dequeue(type) {
	            return this.each(function () {
	                jQuery.dequeue(this, type);
	            });
	        },
	        clearQueue: function clearQueue(type) {
	            return this.queue(type || "fx", []);
	        },

	        // Get a promise resolved when queues of a certain type
	        // are emptied (fx is the type by default)
	        promise: function promise(type, obj) {
	            var tmp,
	                count = 1,
	                defer = jQuery.Deferred(),
	                elements = this,
	                i = this.length,
	                resolve = function resolve() {
	                if (! --count) {
	                    defer.resolveWith(elements, [elements]);
	                }
	            };

	            if (typeof type !== "string") {
	                obj = type;
	                type = undefined;
	            }
	            type = type || "fx";

	            while (i--) {
	                tmp = jQuery._data(elements[i], type + "queueHooks");
	                if (tmp && tmp.empty) {
	                    count++;
	                    tmp.empty.add(resolve);
	                }
	            }
	            resolve();
	            return defer.promise(obj);
	        }
	    });

	    (function () {
	        var shrinkWrapBlocksVal;

	        support.shrinkWrapBlocks = function () {
	            if (shrinkWrapBlocksVal != null) {
	                return shrinkWrapBlocksVal;
	            }

	            // Will be changed later if needed.
	            shrinkWrapBlocksVal = false;

	            // Minified: var b,c,d
	            var div, body, container;

	            body = document.getElementsByTagName("body")[0];
	            if (!body || !body.style) {

	                // Test fired too early or in an unsupported environment, exit.
	                return;
	            }

	            // Setup
	            div = document.createElement("div");
	            container = document.createElement("div");
	            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	            body.appendChild(container).appendChild(div);

	            // Support: IE6
	            // Check if elements with layout shrink-wrap their children
	            if (typeof div.style.zoom !== "undefined") {

	                // Reset CSS: box-sizing; display; margin; border
	                div.style.cssText =

	                // Support: Firefox<29, Android 2.3
	                // Vendor-prefix box-sizing
	                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
	                div.appendChild(document.createElement("div")).style.width = "5px";
	                shrinkWrapBlocksVal = div.offsetWidth !== 3;
	            }

	            body.removeChild(container);

	            return shrinkWrapBlocksVal;
	        };
	    })();
	    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	    var cssExpand = ["Top", "Right", "Bottom", "Left"];

	    var isHidden = function isHidden(elem, el) {

	        // isHidden might be called from jQuery#filter function;
	        // in that case, element will be second argument
	        elem = el || elem;
	        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	    };

	    function adjustCSS(elem, prop, valueParts, tween) {
	        var adjusted,
	            scale = 1,
	            maxIterations = 20,
	            currentValue = tween ? function () {
	            return tween.cur();
	        } : function () {
	            return jQuery.css(elem, prop, "");
	        },
	            initial = currentValue(),
	            unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


	        // Starting value computation is required for potential unit mismatches
	        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

	        if (initialInUnit && initialInUnit[3] !== unit) {

	            // Trust units reported by jQuery.css
	            unit = unit || initialInUnit[3];

	            // Make sure we update the tween properties later on
	            valueParts = valueParts || [];

	            // Iteratively approximate from a nonzero starting point
	            initialInUnit = +initial || 1;

	            do {

	                // If previous iteration zeroed out, double until we get *something*.
	                // Use string for doubling so we don't accidentally see scale as unchanged below
	                scale = scale || ".5";

	                // Adjust and apply
	                initialInUnit = initialInUnit / scale;
	                jQuery.style(elem, prop, initialInUnit + unit);

	                // Update scale, tolerating zero or NaN from tween.cur()
	                // Break the loop if scale is unchanged or perfect, or if we've just had enough.
	            } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
	        }

	        if (valueParts) {
	            initialInUnit = +initialInUnit || +initial || 0;

	            // Apply relative offset (+=/-=) if specified
	            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
	            if (tween) {
	                tween.unit = unit;
	                tween.start = initialInUnit;
	                tween.end = adjusted;
	            }
	        }
	        return adjusted;
	    }

	    // Multifunctional method to get and set values of a collection
	    // The value/s can optionally be executed if it's a function
	    var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
	        var i = 0,
	            length = elems.length,
	            bulk = key == null;

	        // Sets many values
	        if (jQuery.type(key) === "object") {
	            chainable = true;
	            for (i in key) {
	                access(elems, fn, i, key[i], true, emptyGet, raw);
	            }

	            // Sets one value
	        } else if (value !== undefined) {
	            chainable = true;

	            if (!jQuery.isFunction(value)) {
	                raw = true;
	            }

	            if (bulk) {

	                // Bulk operations run against the entire set
	                if (raw) {
	                    fn.call(elems, value);
	                    fn = null;

	                    // ...except when executing function values
	                } else {
	                    bulk = fn;
	                    fn = function fn(elem, key, value) {
	                        return bulk.call(jQuery(elem), value);
	                    };
	                }
	            }

	            if (fn) {
	                for (; i < length; i++) {
	                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
	                }
	            }
	        }

	        return chainable ? elems :

	        // Gets
	        bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
	    };
	    var rcheckableType = /^(?:checkbox|radio)$/i;

	    var rtagName = /<([\w:-]+)/;

	    var rscriptType = /^$|\/(?:java|ecma)script/i;

	    var rleadingWhitespace = /^\s+/;

	    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" + "details|dialog|figcaption|figure|footer|header|hgroup|main|" + "mark|meter|nav|output|picture|progress|section|summary|template|time|video";

	    function createSafeFragment(document) {
	        var list = nodeNames.split("|"),
	            safeFrag = document.createDocumentFragment();

	        if (safeFrag.createElement) {
	            while (list.length) {
	                safeFrag.createElement(list.pop());
	            }
	        }
	        return safeFrag;
	    }

	    (function () {
	        var div = document.createElement("div"),
	            fragment = document.createDocumentFragment(),
	            input = document.createElement("input");

	        // Setup
	        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	        // IE strips leading whitespace when .innerHTML is used
	        support.leadingWhitespace = div.firstChild.nodeType === 3;

	        // Make sure that tbody elements aren't automatically inserted
	        // IE will insert them into empty tables
	        support.tbody = !div.getElementsByTagName("tbody").length;

	        // Make sure that link elements get serialized correctly by innerHTML
	        // This requires a wrapper element in IE
	        support.htmlSerialize = !!div.getElementsByTagName("link").length;

	        // Makes sure cloning an html5 element does not cause problems
	        // Where outerHTML is undefined, this still works
	        support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

	        // Check if a disconnected checkbox will retain its checked
	        // value of true after appended to the DOM (IE6/7)
	        input.type = "checkbox";
	        input.checked = true;
	        fragment.appendChild(input);
	        support.appendChecked = input.checked;

	        // Make sure textarea (and checkbox) defaultValue is properly cloned
	        // Support: IE6-IE11+
	        div.innerHTML = "<textarea>x</textarea>";
	        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

	        // #11217 - WebKit loses check when the name is after the checked attribute
	        fragment.appendChild(div);

	        // Support: Windows Web Apps (WWA)
	        // `name` and `type` must use .setAttribute for WWA (#14901)
	        input = document.createElement("input");
	        input.setAttribute("type", "radio");
	        input.setAttribute("checked", "checked");
	        input.setAttribute("name", "t");

	        div.appendChild(input);

	        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	        // old WebKit doesn't clone checked state correctly in fragments
	        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

	        // Support: IE<9
	        // Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	        support.noCloneEvent = !!div.addEventListener;

	        // Support: IE<9
	        // Since attributes and properties are the same in IE,
	        // cleanData must set properties to undefined rather than use removeAttribute
	        div[jQuery.expando] = 1;
	        support.attributes = !div.getAttribute(jQuery.expando);
	    })();

	    // We have to close these tags to support XHTML (#13200)
	    var wrapMap = {
	        option: [1, "<select multiple='multiple'>", "</select>"],
	        legend: [1, "<fieldset>", "</fieldset>"],
	        area: [1, "<map>", "</map>"],

	        // Support: IE8
	        param: [1, "<object>", "</object>"],
	        thead: [1, "<table>", "</table>"],
	        tr: [2, "<table><tbody>", "</tbody></table>"],
	        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
	        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

	        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	        // unless wrapped in a div with non-breaking characters in front of it.
	        _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	    };

	    // Support: IE8-IE9
	    wrapMap.optgroup = wrapMap.option;

	    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	    wrapMap.th = wrapMap.td;

	    function getAll(context, tag) {
	        var elems,
	            elem,
	            i = 0,
	            found = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : undefined;

	        if (!found) {
	            for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
	                if (!tag || jQuery.nodeName(elem, tag)) {
	                    found.push(elem);
	                } else {
	                    jQuery.merge(found, getAll(elem, tag));
	                }
	            }
	        }

	        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
	    }

	    // Mark scripts as having already been evaluated
	    function setGlobalEval(elems, refElements) {
	        var elem,
	            i = 0;
	        for (; (elem = elems[i]) != null; i++) {
	            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
	        }
	    }

	    var rhtml = /<|&#?\w+;/,
	        rtbody = /<tbody/i;

	    function fixDefaultChecked(elem) {
	        if (rcheckableType.test(elem.type)) {
	            elem.defaultChecked = elem.checked;
	        }
	    }

	    function buildFragment(elems, context, scripts, selection, ignored) {
	        var j,
	            elem,
	            contains,
	            tmp,
	            tag,
	            tbody,
	            wrap,
	            l = elems.length,


	        // Ensure a safe fragment
	        safe = createSafeFragment(context),
	            nodes = [],
	            i = 0;

	        for (; i < l; i++) {
	            elem = elems[i];

	            if (elem || elem === 0) {

	                // Add nodes directly
	                if (jQuery.type(elem) === "object") {
	                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

	                    // Convert non-html into a text node
	                } else if (!rhtml.test(elem)) {
	                    nodes.push(context.createTextNode(elem));

	                    // Convert html into DOM nodes
	                } else {
	                    tmp = tmp || safe.appendChild(context.createElement("div"));

	                    // Deserialize a standard representation
	                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
	                    wrap = wrapMap[tag] || wrapMap._default;

	                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

	                    // Descend through wrappers to the right content
	                    j = wrap[0];
	                    while (j--) {
	                        tmp = tmp.lastChild;
	                    }

	                    // Manually add leading whitespace removed by IE
	                    if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
	                        nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
	                    }

	                    // Remove IE's autoinserted <tbody> from table fragments
	                    if (!support.tbody) {

	                        // String was a <table>, *may* have spurious <tbody>
	                        elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild :

	                        // String was a bare <thead> or <tfoot>
	                        wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;

	                        j = elem && elem.childNodes.length;
	                        while (j--) {
	                            if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) {

	                                elem.removeChild(tbody);
	                            }
	                        }
	                    }

	                    jQuery.merge(nodes, tmp.childNodes);

	                    // Fix #12392 for WebKit and IE > 9
	                    tmp.textContent = "";

	                    // Fix #12392 for oldIE
	                    while (tmp.firstChild) {
	                        tmp.removeChild(tmp.firstChild);
	                    }

	                    // Remember the top-level container for proper cleanup
	                    tmp = safe.lastChild;
	                }
	            }
	        }

	        // Fix #11356: Clear elements from fragment
	        if (tmp) {
	            safe.removeChild(tmp);
	        }

	        // Reset defaultChecked for any radios and checkboxes
	        // about to be appended to the DOM in IE 6/7 (#8060)
	        if (!support.appendChecked) {
	            jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
	        }

	        i = 0;
	        while (elem = nodes[i++]) {

	            // Skip elements already in the context collection (trac-4087)
	            if (selection && jQuery.inArray(elem, selection) > -1) {
	                if (ignored) {
	                    ignored.push(elem);
	                }

	                continue;
	            }

	            contains = jQuery.contains(elem.ownerDocument, elem);

	            // Append to fragment
	            tmp = getAll(safe.appendChild(elem), "script");

	            // Preserve script evaluation history
	            if (contains) {
	                setGlobalEval(tmp);
	            }

	            // Capture executables
	            if (scripts) {
	                j = 0;
	                while (elem = tmp[j++]) {
	                    if (rscriptType.test(elem.type || "")) {
	                        scripts.push(elem);
	                    }
	                }
	            }
	        }

	        tmp = null;

	        return safe;
	    }

	    (function () {
	        var i,
	            eventName,
	            div = document.createElement("div");

	        // Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	        for (i in { submit: true, change: true, focusin: true }) {
	            eventName = "on" + i;

	            if (!(support[i] = eventName in window)) {

	                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	                div.setAttribute(eventName, "t");
	                support[i] = div.attributes[eventName].expando === false;
	            }
	        }

	        // Null elements to avoid leaks in IE.
	        div = null;
	    })();

	    var rformElems = /^(?:input|select|textarea)$/i,
	        rkeyEvent = /^key/,
	        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	    function returnTrue() {
	        return true;
	    }

	    function returnFalse() {
	        return false;
	    }

	    // Support: IE9
	    // See #13393 for more info
	    function safeActiveElement() {
	        try {
	            return document.activeElement;
	        } catch (err) {}
	    }

	    function _on(elem, types, selector, data, fn, one) {
	        var origFn, type;

	        // Types can be a map of types/handlers
	        if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

	            // ( types-Object, selector, data )
	            if (typeof selector !== "string") {

	                // ( types-Object, data )
	                data = data || selector;
	                selector = undefined;
	            }
	            for (type in types) {
	                _on(elem, type, selector, data, types[type], one);
	            }
	            return elem;
	        }

	        if (data == null && fn == null) {

	            // ( types, fn )
	            fn = selector;
	            data = selector = undefined;
	        } else if (fn == null) {
	            if (typeof selector === "string") {

	                // ( types, selector, fn )
	                fn = data;
	                data = undefined;
	            } else {

	                // ( types, data, fn )
	                fn = data;
	                data = selector;
	                selector = undefined;
	            }
	        }
	        if (fn === false) {
	            fn = returnFalse;
	        } else if (!fn) {
	            return elem;
	        }

	        if (one === 1) {
	            origFn = fn;
	            fn = function fn(event) {

	                // Can use an empty set, since event contains the info
	                jQuery().off(event);
	                return origFn.apply(this, arguments);
	            };

	            // Use same guid so caller can remove using origFn
	            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
	        }
	        return elem.each(function () {
	            jQuery.event.add(this, types, fn, data, selector);
	        });
	    }

	    /*
	     * Helper functions for managing events -- not part of the public interface.
	     * Props to Dean Edwards' addEvent library for many of the ideas.
	     */
	    jQuery.event = {

	        global: {},

	        add: function add(elem, types, handler, data, selector) {
	            var tmp,
	                events,
	                t,
	                handleObjIn,
	                special,
	                eventHandle,
	                handleObj,
	                handlers,
	                type,
	                namespaces,
	                origType,
	                elemData = jQuery._data(elem);

	            // Don't attach events to noData or text/comment nodes (but allow plain objects)
	            if (!elemData) {
	                return;
	            }

	            // Caller can pass in an object of custom data in lieu of the handler
	            if (handler.handler) {
	                handleObjIn = handler;
	                handler = handleObjIn.handler;
	                selector = handleObjIn.selector;
	            }

	            // Make sure that the handler has a unique ID, used to find/remove it later
	            if (!handler.guid) {
	                handler.guid = jQuery.guid++;
	            }

	            // Init the element's event structure and main handler, if this is the first
	            if (!(events = elemData.events)) {
	                events = elemData.events = {};
	            }
	            if (!(eventHandle = elemData.handle)) {
	                eventHandle = elemData.handle = function (e) {

	                    // Discard the second event of a jQuery.event.trigger() and
	                    // when an event is called after a page has unloaded
	                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
	                };

	                // Add elem as a property of the handle fn to prevent a memory leak
	                // with IE non-native events
	                eventHandle.elem = elem;
	            }

	            // Handle multiple events separated by a space
	            types = (types || "").match(rnotwhite) || [""];
	            t = types.length;
	            while (t--) {
	                tmp = rtypenamespace.exec(types[t]) || [];
	                type = origType = tmp[1];
	                namespaces = (tmp[2] || "").split(".").sort();

	                // There *must* be a type, no attaching namespace-only handlers
	                if (!type) {
	                    continue;
	                }

	                // If event changes its type, use the special event handlers for the changed type
	                special = jQuery.event.special[type] || {};

	                // If selector defined, determine special event api type, otherwise given type
	                type = (selector ? special.delegateType : special.bindType) || type;

	                // Update special based on newly reset type
	                special = jQuery.event.special[type] || {};

	                // handleObj is passed to all event handlers
	                handleObj = jQuery.extend({
	                    type: type,
	                    origType: origType,
	                    data: data,
	                    handler: handler,
	                    guid: handler.guid,
	                    selector: selector,
	                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
	                    namespace: namespaces.join(".")
	                }, handleObjIn);

	                // Init the event handler queue if we're the first
	                if (!(handlers = events[type])) {
	                    handlers = events[type] = [];
	                    handlers.delegateCount = 0;

	                    // Only use addEventListener/attachEvent if the special events handler returns false
	                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

	                        // Bind the global event handler to the element
	                        if (elem.addEventListener) {
	                            elem.addEventListener(type, eventHandle, false);
	                        } else if (elem.attachEvent) {
	                            elem.attachEvent("on" + type, eventHandle);
	                        }
	                    }
	                }

	                if (special.add) {
	                    special.add.call(elem, handleObj);

	                    if (!handleObj.handler.guid) {
	                        handleObj.handler.guid = handler.guid;
	                    }
	                }

	                // Add to the element's handler list, delegates in front
	                if (selector) {
	                    handlers.splice(handlers.delegateCount++, 0, handleObj);
	                } else {
	                    handlers.push(handleObj);
	                }

	                // Keep track of which events have ever been used, for event optimization
	                jQuery.event.global[type] = true;
	            }

	            // Nullify elem to prevent memory leaks in IE
	            elem = null;
	        },

	        // Detach an event or set of events from an element
	        remove: function remove(elem, types, handler, selector, mappedTypes) {
	            var j,
	                handleObj,
	                tmp,
	                origCount,
	                t,
	                events,
	                special,
	                handlers,
	                type,
	                namespaces,
	                origType,
	                elemData = jQuery.hasData(elem) && jQuery._data(elem);

	            if (!elemData || !(events = elemData.events)) {
	                return;
	            }

	            // Once for each type.namespace in types; type may be omitted
	            types = (types || "").match(rnotwhite) || [""];
	            t = types.length;
	            while (t--) {
	                tmp = rtypenamespace.exec(types[t]) || [];
	                type = origType = tmp[1];
	                namespaces = (tmp[2] || "").split(".").sort();

	                // Unbind all events (on this namespace, if provided) for the element
	                if (!type) {
	                    for (type in events) {
	                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
	                    }
	                    continue;
	                }

	                special = jQuery.event.special[type] || {};
	                type = (selector ? special.delegateType : special.bindType) || type;
	                handlers = events[type] || [];
	                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

	                // Remove matching events
	                origCount = j = handlers.length;
	                while (j--) {
	                    handleObj = handlers[j];

	                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
	                        handlers.splice(j, 1);

	                        if (handleObj.selector) {
	                            handlers.delegateCount--;
	                        }
	                        if (special.remove) {
	                            special.remove.call(elem, handleObj);
	                        }
	                    }
	                }

	                // Remove generic event handler if we removed something and no more handlers exist
	                // (avoids potential for endless recursion during removal of special event handlers)
	                if (origCount && !handlers.length) {
	                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

	                        jQuery.removeEvent(elem, type, elemData.handle);
	                    }

	                    delete events[type];
	                }
	            }

	            // Remove the expando if it's no longer used
	            if (jQuery.isEmptyObject(events)) {
	                delete elemData.handle;

	                // removeData also checks for emptiness and clears the expando if empty
	                // so use it instead of delete
	                jQuery._removeData(elem, "events");
	            }
	        },

	        trigger: function trigger(event, data, elem, onlyHandlers) {
	            var handle,
	                ontype,
	                cur,
	                bubbleType,
	                special,
	                tmp,
	                i,
	                eventPath = [elem || document],
	                type = hasOwn.call(event, "type") ? event.type : event,
	                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

	            cur = tmp = elem = elem || document;

	            // Don't do events on text and comment nodes
	            if (elem.nodeType === 3 || elem.nodeType === 8) {
	                return;
	            }

	            // focus/blur morphs to focusin/out; ensure we're not firing them right now
	            if (rfocusMorph.test(type + jQuery.event.triggered)) {
	                return;
	            }

	            if (type.indexOf(".") > -1) {

	                // Namespaced trigger; create a regexp to match event type in handle()
	                namespaces = type.split(".");
	                type = namespaces.shift();
	                namespaces.sort();
	            }
	            ontype = type.indexOf(":") < 0 && "on" + type;

	            // Caller can pass in a jQuery.Event object, Object, or just an event type string
	            event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

	            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
	            event.isTrigger = onlyHandlers ? 2 : 3;
	            event.namespace = namespaces.join(".");
	            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

	            // Clean up the event in case it is being reused
	            event.result = undefined;
	            if (!event.target) {
	                event.target = elem;
	            }

	            // Clone any incoming data and prepend the event, creating the handler arg list
	            data = data == null ? [event] : jQuery.makeArray(data, [event]);

	            // Allow special events to draw outside the lines
	            special = jQuery.event.special[type] || {};
	            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
	                return;
	            }

	            // Determine event propagation path in advance, per W3C events spec (#9951)
	            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
	            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

	                bubbleType = special.delegateType || type;
	                if (!rfocusMorph.test(bubbleType + type)) {
	                    cur = cur.parentNode;
	                }
	                for (; cur; cur = cur.parentNode) {
	                    eventPath.push(cur);
	                    tmp = cur;
	                }

	                // Only add window if we got to document (e.g., not plain obj or detached DOM)
	                if (tmp === (elem.ownerDocument || document)) {
	                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	                }
	            }

	            // Fire handlers on the event path
	            i = 0;
	            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

	                event.type = i > 1 ? bubbleType : special.bindType || type;

	                // jQuery handler
	                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");

	                if (handle) {
	                    handle.apply(cur, data);
	                }

	                // Native handler
	                handle = ontype && cur[ontype];
	                if (handle && handle.apply && acceptData(cur)) {
	                    event.result = handle.apply(cur, data);
	                    if (event.result === false) {
	                        event.preventDefault();
	                    }
	                }
	            }
	            event.type = type;

	            // If nobody prevented the default action, do it now
	            if (!onlyHandlers && !event.isDefaultPrevented()) {

	                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

	                    // Call a native DOM method on the target with the same name name as the event.
	                    // Can't use an .isFunction() check here because IE6/7 fails that test.
	                    // Don't do default actions on window, that's where global variables be (#6170)
	                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {

	                        // Don't re-trigger an onFOO event when we call its FOO() method
	                        tmp = elem[ontype];

	                        if (tmp) {
	                            elem[ontype] = null;
	                        }

	                        // Prevent re-triggering of the same event, since we already bubbled it above
	                        jQuery.event.triggered = type;
	                        try {
	                            elem[type]();
	                        } catch (e) {

	                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
	                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
	                        }
	                        jQuery.event.triggered = undefined;

	                        if (tmp) {
	                            elem[ontype] = tmp;
	                        }
	                    }
	                }
	            }

	            return event.result;
	        },

	        dispatch: function dispatch(event) {

	            // Make a writable jQuery.Event from the native event object
	            event = jQuery.event.fix(event);

	            var i,
	                j,
	                ret,
	                matched,
	                handleObj,
	                handlerQueue = [],
	                args = _slice.call(arguments),
	                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
	                special = jQuery.event.special[event.type] || {};

	            // Use the fix-ed jQuery.Event rather than the (read-only) native event
	            args[0] = event;
	            event.delegateTarget = this;

	            // Call the preDispatch hook for the mapped type, and let it bail if desired
	            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
	                return;
	            }

	            // Determine handlers
	            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

	            // Run delegates first; they may want to stop propagation beneath us
	            i = 0;
	            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
	                event.currentTarget = matched.elem;

	                j = 0;
	                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

	                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
	                    // a subset or equal to those in the bound event (both can have no namespace).
	                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

	                        event.handleObj = handleObj;
	                        event.data = handleObj.data;

	                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

	                        if (ret !== undefined) {
	                            if ((event.result = ret) === false) {
	                                event.preventDefault();
	                                event.stopPropagation();
	                            }
	                        }
	                    }
	                }
	            }

	            // Call the postDispatch hook for the mapped type
	            if (special.postDispatch) {
	                special.postDispatch.call(this, event);
	            }

	            return event.result;
	        },

	        handlers: function handlers(event, _handlers) {
	            var i,
	                matches,
	                sel,
	                handleObj,
	                handlerQueue = [],
	                delegateCount = _handlers.delegateCount,
	                cur = event.target;

	            // Support (at least): Chrome, IE9
	            // Find delegate handlers
	            // Black-hole SVG <use> instance trees (#13180)
	            //
	            // Support: Firefox<=42+
	            // Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
	            if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

	                /* jshint eqeqeq: false */
	                for (; cur != this; cur = cur.parentNode || this) {
	                    /* jshint eqeqeq: true */

	                    // Don't check non-elements (#13208)
	                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
	                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
	                        matches = [];
	                        for (i = 0; i < delegateCount; i++) {
	                            handleObj = _handlers[i];

	                            // Don't conflict with Object.prototype properties (#13203)
	                            sel = handleObj.selector + " ";

	                            if (matches[sel] === undefined) {
	                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
	                            }
	                            if (matches[sel]) {
	                                matches.push(handleObj);
	                            }
	                        }
	                        if (matches.length) {
	                            handlerQueue.push({ elem: cur, handlers: matches });
	                        }
	                    }
	                }
	            }

	            // Add the remaining (directly-bound) handlers
	            if (delegateCount < _handlers.length) {
	                handlerQueue.push({ elem: this, handlers: _handlers.slice(delegateCount) });
	            }

	            return handlerQueue;
	        },

	        fix: function fix(event) {
	            if (event[jQuery.expando]) {
	                return event;
	            }

	            // Create a writable copy of the event object and normalize some properties
	            var i,
	                prop,
	                copy,
	                type = event.type,
	                originalEvent = event,
	                fixHook = this.fixHooks[type];

	            if (!fixHook) {
	                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
	            }
	            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

	            event = new jQuery.Event(originalEvent);

	            i = copy.length;
	            while (i--) {
	                prop = copy[i];
	                event[prop] = originalEvent[prop];
	            }

	            // Support: IE<9
	            // Fix target property (#1925)
	            if (!event.target) {
	                event.target = originalEvent.srcElement || document;
	            }

	            // Support: Safari 6-8+
	            // Target should not be a text node (#504, #13143)
	            if (event.target.nodeType === 3) {
	                event.target = event.target.parentNode;
	            }

	            // Support: IE<9
	            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
	            event.metaKey = !!event.metaKey;

	            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
	        },

	        // Includes some event props shared by KeyEvent and MouseEvent
	        props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

	        fixHooks: {},

	        keyHooks: {
	            props: "char charCode key keyCode".split(" "),
	            filter: function filter(event, original) {

	                // Add which for key events
	                if (event.which == null) {
	                    event.which = original.charCode != null ? original.charCode : original.keyCode;
	                }

	                return event;
	            }
	        },

	        mouseHooks: {
	            props: ("button buttons clientX clientY fromElement offsetX offsetY " + "pageX pageY screenX screenY toElement").split(" "),
	            filter: function filter(event, original) {
	                var body,
	                    eventDoc,
	                    doc,
	                    button = original.button,
	                    fromElement = original.fromElement;

	                // Calculate pageX/Y if missing and clientX/Y available
	                if (event.pageX == null && original.clientX != null) {
	                    eventDoc = event.target.ownerDocument || document;
	                    doc = eventDoc.documentElement;
	                    body = eventDoc.body;

	                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	                }

	                // Add relatedTarget, if necessary
	                if (!event.relatedTarget && fromElement) {
	                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
	                }

	                // Add which for click: 1 === left; 2 === middle; 3 === right
	                // Note: button is not normalized, so don't use it
	                if (!event.which && button !== undefined) {
	                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
	                }

	                return event;
	            }
	        },

	        special: {
	            load: {

	                // Prevent triggered image.load events from bubbling to window.load
	                noBubble: true
	            },
	            focus: {

	                // Fire native event if possible so blur/focus sequence is correct
	                trigger: function trigger() {
	                    if (this !== safeActiveElement() && this.focus) {
	                        try {
	                            this.focus();
	                            return false;
	                        } catch (e) {

	                            // Support: IE<9
	                            // If we error on focus to hidden element (#1486, #12518),
	                            // let .trigger() run the handlers
	                        }
	                    }
	                },
	                delegateType: "focusin"
	            },
	            blur: {
	                trigger: function trigger() {
	                    if (this === safeActiveElement() && this.blur) {
	                        this.blur();
	                        return false;
	                    }
	                },
	                delegateType: "focusout"
	            },
	            click: {

	                // For checkbox, fire native event so checked state will be right
	                trigger: function trigger() {
	                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
	                        this.click();
	                        return false;
	                    }
	                },

	                // For cross-browser consistency, don't fire native .click() on links
	                _default: function _default(event) {
	                    return jQuery.nodeName(event.target, "a");
	                }
	            },

	            beforeunload: {
	                postDispatch: function postDispatch(event) {

	                    // Support: Firefox 20+
	                    // Firefox doesn't alert if the returnValue field is not set.
	                    if (event.result !== undefined && event.originalEvent) {
	                        event.originalEvent.returnValue = event.result;
	                    }
	                }
	            }
	        },

	        // Piggyback on a donor event to simulate a different one
	        simulate: function simulate(type, elem, event) {
	            var e = jQuery.extend(new jQuery.Event(), event, {
	                type: type,
	                isSimulated: true

	                // Previously, `originalEvent: {}` was set here, so stopPropagation call
	                // would not be triggered on donor event, since in our own
	                // jQuery.event.stopPropagation function we had a check for existence of
	                // originalEvent.stopPropagation method, so, consequently it would be a noop.
	                //
	                // Guard for simulated events was moved to jQuery.event.stopPropagation function
	                // since `originalEvent` should point to the original event for the
	                // constancy with other events and for more focused logic
	            });

	            jQuery.event.trigger(e, null, elem);

	            if (e.isDefaultPrevented()) {
	                event.preventDefault();
	            }
	        }
	    };

	    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {

	        // This "if" is needed for plain objects
	        if (elem.removeEventListener) {
	            elem.removeEventListener(type, handle);
	        }
	    } : function (elem, type, handle) {
	        var name = "on" + type;

	        if (elem.detachEvent) {

	            // #8545, #7054, preventing memory leaks for custom events in IE6-8
	            // detachEvent needed property on element, by name of that event,
	            // to properly expose it to GC
	            if (typeof elem[name] === "undefined") {
	                elem[name] = null;
	            }

	            elem.detachEvent(name, handle);
	        }
	    };

	    jQuery.Event = function (src, props) {

	        // Allow instantiation without the 'new' keyword
	        if (!(this instanceof jQuery.Event)) {
	            return new jQuery.Event(src, props);
	        }

	        // Event object
	        if (src && src.type) {
	            this.originalEvent = src;
	            this.type = src.type;

	            // Events bubbling up the document may have been marked as prevented
	            // by a handler lower down the tree; reflect the correct value.
	            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

	            // Support: IE < 9, Android < 4.0
	            src.returnValue === false ? returnTrue : returnFalse;

	            // Event type
	        } else {
	            this.type = src;
	        }

	        // Put explicitly provided properties onto the event object
	        if (props) {
	            jQuery.extend(this, props);
	        }

	        // Create a timestamp if incoming event doesn't have one
	        this.timeStamp = src && src.timeStamp || jQuery.now();

	        // Mark it as fixed
	        this[jQuery.expando] = true;
	    };

	    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	    jQuery.Event.prototype = {
	        constructor: jQuery.Event,
	        isDefaultPrevented: returnFalse,
	        isPropagationStopped: returnFalse,
	        isImmediatePropagationStopped: returnFalse,

	        preventDefault: function preventDefault() {
	            var e = this.originalEvent;

	            this.isDefaultPrevented = returnTrue;
	            if (!e) {
	                return;
	            }

	            // If preventDefault exists, run it on the original event
	            if (e.preventDefault) {
	                e.preventDefault();

	                // Support: IE
	                // Otherwise set the returnValue property of the original event to false
	            } else {
	                e.returnValue = false;
	            }
	        },
	        stopPropagation: function stopPropagation() {
	            var e = this.originalEvent;

	            this.isPropagationStopped = returnTrue;

	            if (!e || this.isSimulated) {
	                return;
	            }

	            // If stopPropagation exists, run it on the original event
	            if (e.stopPropagation) {
	                e.stopPropagation();
	            }

	            // Support: IE
	            // Set the cancelBubble property of the original event to true
	            e.cancelBubble = true;
	        },
	        stopImmediatePropagation: function stopImmediatePropagation() {
	            var e = this.originalEvent;

	            this.isImmediatePropagationStopped = returnTrue;

	            if (e && e.stopImmediatePropagation) {
	                e.stopImmediatePropagation();
	            }

	            this.stopPropagation();
	        }
	    };

	    // Create mouseenter/leave events using mouseover/out and event-time checks
	    // so that event delegation works in jQuery.
	    // Do the same for pointerenter/pointerleave and pointerover/pointerout
	    //
	    // Support: Safari 7 only
	    // Safari sends mouseenter too often; see:
	    // https://code.google.com/p/chromium/issues/detail?id=470258
	    // for the description of the bug (it existed in older Chrome versions as well).
	    jQuery.each({
	        mouseenter: "mouseover",
	        mouseleave: "mouseout",
	        pointerenter: "pointerover",
	        pointerleave: "pointerout"
	    }, function (orig, fix) {
	        jQuery.event.special[orig] = {
	            delegateType: fix,
	            bindType: fix,

	            handle: function handle(event) {
	                var ret,
	                    target = this,
	                    related = event.relatedTarget,
	                    handleObj = event.handleObj;

	                // For mouseenter/leave call the handler if related is outside the target.
	                // NB: No relatedTarget if the mouse left/entered the browser window
	                if (!related || related !== target && !jQuery.contains(target, related)) {
	                    event.type = handleObj.origType;
	                    ret = handleObj.handler.apply(this, arguments);
	                    event.type = fix;
	                }
	                return ret;
	            }
	        };
	    });

	    // IE submit delegation
	    if (!support.submit) {

	        jQuery.event.special.submit = {
	            setup: function setup() {

	                // Only need this for delegated form submit events
	                if (jQuery.nodeName(this, "form")) {
	                    return false;
	                }

	                // Lazy-add a submit handler when a descendant form may potentially be submitted
	                jQuery.event.add(this, "click._submit keypress._submit", function (e) {

	                    // Node name check avoids a VML-related crash in IE (#9807)
	                    var elem = e.target,
	                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ?

	                    // Support: IE <=8
	                    // We use jQuery.prop instead of elem.form
	                    // to allow fixing the IE8 delegated submit issue (gh-2332)
	                    // by 3rd party polyfills/workarounds.
	                    jQuery.prop(elem, "form") : undefined;

	                    if (form && !jQuery._data(form, "submit")) {
	                        jQuery.event.add(form, "submit._submit", function (event) {
	                            event._submitBubble = true;
	                        });
	                        jQuery._data(form, "submit", true);
	                    }
	                });

	                // return undefined since we don't need an event listener
	            },

	            postDispatch: function postDispatch(event) {

	                // If form was submitted by the user, bubble the event up the tree
	                if (event._submitBubble) {
	                    delete event._submitBubble;
	                    if (this.parentNode && !event.isTrigger) {
	                        jQuery.event.simulate("submit", this.parentNode, event);
	                    }
	                }
	            },

	            teardown: function teardown() {

	                // Only need this for delegated form submit events
	                if (jQuery.nodeName(this, "form")) {
	                    return false;
	                }

	                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
	                jQuery.event.remove(this, "._submit");
	            }
	        };
	    }

	    // IE change delegation and checkbox/radio fix
	    if (!support.change) {

	        jQuery.event.special.change = {

	            setup: function setup() {

	                if (rformElems.test(this.nodeName)) {

	                    // IE doesn't fire change on a check/radio until blur; trigger it on click
	                    // after a propertychange. Eat the blur-change in special.change.handle.
	                    // This still fires onchange a second time for check/radio after blur.
	                    if (this.type === "checkbox" || this.type === "radio") {
	                        jQuery.event.add(this, "propertychange._change", function (event) {
	                            if (event.originalEvent.propertyName === "checked") {
	                                this._justChanged = true;
	                            }
	                        });
	                        jQuery.event.add(this, "click._change", function (event) {
	                            if (this._justChanged && !event.isTrigger) {
	                                this._justChanged = false;
	                            }

	                            // Allow triggered, simulated change events (#11500)
	                            jQuery.event.simulate("change", this, event);
	                        });
	                    }
	                    return false;
	                }

	                // Delegated event; lazy-add a change handler on descendant inputs
	                jQuery.event.add(this, "beforeactivate._change", function (e) {
	                    var elem = e.target;

	                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "change")) {
	                        jQuery.event.add(elem, "change._change", function (event) {
	                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
	                                jQuery.event.simulate("change", this.parentNode, event);
	                            }
	                        });
	                        jQuery._data(elem, "change", true);
	                    }
	                });
	            },

	            handle: function handle(event) {
	                var elem = event.target;

	                // Swallow native change events from checkbox/radio, we already triggered them above
	                if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") {

	                    return event.handleObj.handler.apply(this, arguments);
	                }
	            },

	            teardown: function teardown() {
	                jQuery.event.remove(this, "._change");

	                return !rformElems.test(this.nodeName);
	            }
	        };
	    }

	    // Support: Firefox
	    // Firefox doesn't have focus(in | out) events
	    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	    //
	    // Support: Chrome, Safari
	    // focus(in | out) events fire after focus & blur events,
	    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	    // Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	    if (!support.focusin) {
	        jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

	            // Attach a single capturing handler on the document while someone wants focusin/focusout
	            var handler = function handler(event) {
	                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
	            };

	            jQuery.event.special[fix] = {
	                setup: function setup() {
	                    var doc = this.ownerDocument || this,
	                        attaches = jQuery._data(doc, fix);

	                    if (!attaches) {
	                        doc.addEventListener(orig, handler, true);
	                    }
	                    jQuery._data(doc, fix, (attaches || 0) + 1);
	                },
	                teardown: function teardown() {
	                    var doc = this.ownerDocument || this,
	                        attaches = jQuery._data(doc, fix) - 1;

	                    if (!attaches) {
	                        doc.removeEventListener(orig, handler, true);
	                        jQuery._removeData(doc, fix);
	                    } else {
	                        jQuery._data(doc, fix, attaches);
	                    }
	                }
	            };
	        });
	    }

	    jQuery.fn.extend({

	        on: function on(types, selector, data, fn) {
	            return _on(this, types, selector, data, fn);
	        },
	        one: function one(types, selector, data, fn) {
	            return _on(this, types, selector, data, fn, 1);
	        },
	        off: function off(types, selector, fn) {
	            var handleObj, type;
	            if (types && types.preventDefault && types.handleObj) {

	                // ( event )  dispatched jQuery.Event
	                handleObj = types.handleObj;
	                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
	                return this;
	            }
	            if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

	                // ( types-object [, selector] )
	                for (type in types) {
	                    this.off(type, selector, types[type]);
	                }
	                return this;
	            }
	            if (selector === false || typeof selector === "function") {

	                // ( types [, fn] )
	                fn = selector;
	                selector = undefined;
	            }
	            if (fn === false) {
	                fn = returnFalse;
	            }
	            return this.each(function () {
	                jQuery.event.remove(this, types, fn, selector);
	            });
	        },

	        trigger: function trigger(type, data) {
	            return this.each(function () {
	                jQuery.event.trigger(type, data, this);
	            });
	        },
	        triggerHandler: function triggerHandler(type, data) {
	            var elem = this[0];
	            if (elem) {
	                return jQuery.event.trigger(type, data, elem, true);
	            }
	        }
	    });

	    var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,


	    // Support: IE 10-11, Edge 10240+
	    // In IE/Edge using regex groups here causes severe slowdowns.
	    // See https://connect.microsoft.com/IE/feedback/details/1736512/
	    rnoInnerhtml = /<script|<style|<link/i,


	    // checked="checked" or checked
	    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	        rscriptTypeMasked = /^true\/(.*)/,
	        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	        safeFragment = createSafeFragment(document),
	        fragmentDiv = safeFragment.appendChild(document.createElement("div"));

	    // Support: IE<8
	    // Manipulating tables requires a tbody
	    function manipulationTarget(elem, content) {
	        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	    }

	    // Replace/restore the type attribute of script elements for safe DOM manipulation
	    function disableScript(elem) {
	        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
	        return elem;
	    }

	    function restoreScript(elem) {
	        var match = rscriptTypeMasked.exec(elem.type);
	        if (match) {
	            elem.type = match[1];
	        } else {
	            elem.removeAttribute("type");
	        }
	        return elem;
	    }

	    function cloneCopyEvent(src, dest) {
	        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
	            return;
	        }

	        var type,
	            i,
	            l,
	            oldData = jQuery._data(src),
	            curData = jQuery._data(dest, oldData),
	            events = oldData.events;

	        if (events) {
	            delete curData.handle;
	            curData.events = {};

	            for (type in events) {
	                for (i = 0, l = events[type].length; i < l; i++) {
	                    jQuery.event.add(dest, type, events[type][i]);
	                }
	            }
	        }

	        // make the cloned public data object a copy from the original
	        if (curData.data) {
	            curData.data = jQuery.extend({}, curData.data);
	        }
	    }

	    function fixCloneNodeIssues(src, dest) {
	        var nodeName, e, data;

	        // We do not need to do anything for non-Elements
	        if (dest.nodeType !== 1) {
	            return;
	        }

	        nodeName = dest.nodeName.toLowerCase();

	        // IE6-8 copies events bound via attachEvent when using cloneNode.
	        if (!support.noCloneEvent && dest[jQuery.expando]) {
	            data = jQuery._data(dest);

	            for (e in data.events) {
	                jQuery.removeEvent(dest, e, data.handle);
	            }

	            // Event data gets referenced instead of copied if the expando gets copied too
	            dest.removeAttribute(jQuery.expando);
	        }

	        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	        if (nodeName === "script" && dest.text !== src.text) {
	            disableScript(dest).text = src.text;
	            restoreScript(dest);

	            // IE6-10 improperly clones children of object elements using classid.
	            // IE10 throws NoModificationAllowedError if parent is null, #12132.
	        } else if (nodeName === "object") {
	            if (dest.parentNode) {
	                dest.outerHTML = src.outerHTML;
	            }

	            // This path appears unavoidable for IE9. When cloning an object
	            // element in IE9, the outerHTML strategy above is not sufficient.
	            // If the src has innerHTML and the destination does not,
	            // copy the src.innerHTML into the dest.innerHTML. #10324
	            if (support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML)) {
	                dest.innerHTML = src.innerHTML;
	            }
	        } else if (nodeName === "input" && rcheckableType.test(src.type)) {

	            // IE6-8 fails to persist the checked state of a cloned checkbox
	            // or radio button. Worse, IE6-7 fail to give the cloned element
	            // a checked appearance if the defaultChecked value isn't also set

	            dest.defaultChecked = dest.checked = src.checked;

	            // IE6-7 get confused and end up setting the value of a cloned
	            // checkbox/radio button to an empty string instead of "on"
	            if (dest.value !== src.value) {
	                dest.value = src.value;
	            }

	            // IE6-8 fails to return the selected option to the default selected
	            // state when cloning options
	        } else if (nodeName === "option") {
	            dest.defaultSelected = dest.selected = src.defaultSelected;

	            // IE6-8 fails to set the defaultValue to the correct value when
	            // cloning other types of input fields
	        } else if (nodeName === "input" || nodeName === "textarea") {
	            dest.defaultValue = src.defaultValue;
	        }
	    }

	    function domManip(collection, args, callback, ignored) {

	        // Flatten any nested arrays
	        args = concat.apply([], args);

	        var first,
	            node,
	            hasScripts,
	            scripts,
	            doc,
	            fragment,
	            i = 0,
	            l = collection.length,
	            iNoClone = l - 1,
	            value = args[0],
	            isFunction = jQuery.isFunction(value);

	        // We can't cloneNode fragments that contain checked, in WebKit
	        if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
	            return collection.each(function (index) {
	                var self = collection.eq(index);
	                if (isFunction) {
	                    args[0] = value.call(this, index, self.html());
	                }
	                domManip(self, args, callback, ignored);
	            });
	        }

	        if (l) {
	            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
	            first = fragment.firstChild;

	            if (fragment.childNodes.length === 1) {
	                fragment = first;
	            }

	            // Require either new content or an interest in ignored elements to invoke the callback
	            if (first || ignored) {
	                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
	                hasScripts = scripts.length;

	                // Use the original fragment for the last item
	                // instead of the first because it can end up
	                // being emptied incorrectly in certain situations (#8070).
	                for (; i < l; i++) {
	                    node = fragment;

	                    if (i !== iNoClone) {
	                        node = jQuery.clone(node, true, true);

	                        // Keep references to cloned scripts for later restoration
	                        if (hasScripts) {

	                            // Support: Android<4.1, PhantomJS<2
	                            // push.apply(_, arraylike) throws on ancient WebKit
	                            jQuery.merge(scripts, getAll(node, "script"));
	                        }
	                    }

	                    callback.call(collection[i], node, i);
	                }

	                if (hasScripts) {
	                    doc = scripts[scripts.length - 1].ownerDocument;

	                    // Reenable scripts
	                    jQuery.map(scripts, restoreScript);

	                    // Evaluate executable scripts on first document insertion
	                    for (i = 0; i < hasScripts; i++) {
	                        node = scripts[i];
	                        if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

	                            if (node.src) {

	                                // Optional AJAX dependency, but won't run scripts if not present
	                                if (jQuery._evalUrl) {
	                                    jQuery._evalUrl(node.src);
	                                }
	                            } else {
	                                jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
	                            }
	                        }
	                    }
	                }

	                // Fix #11809: Avoid leaking memory
	                fragment = first = null;
	            }
	        }

	        return collection;
	    }

	    function _remove(elem, selector, keepData) {
	        var node,
	            elems = selector ? jQuery.filter(selector, elem) : elem,
	            i = 0;

	        for (; (node = elems[i]) != null; i++) {

	            if (!keepData && node.nodeType === 1) {
	                jQuery.cleanData(getAll(node));
	            }

	            if (node.parentNode) {
	                if (keepData && jQuery.contains(node.ownerDocument, node)) {
	                    setGlobalEval(getAll(node, "script"));
	                }
	                node.parentNode.removeChild(node);
	            }
	        }

	        return elem;
	    }

	    jQuery.extend({
	        htmlPrefilter: function htmlPrefilter(html) {
	            return html.replace(rxhtmlTag, "<$1></$2>");
	        },

	        clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
	            var destElements,
	                node,
	                clone,
	                i,
	                srcElements,
	                inPage = jQuery.contains(elem.ownerDocument, elem);

	            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {

	                clone = elem.cloneNode(true);

	                // IE<=8 does not properly clone detached, unknown element nodes
	            } else {
	                fragmentDiv.innerHTML = elem.outerHTML;
	                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
	            }

	            if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

	                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
	                destElements = getAll(clone);
	                srcElements = getAll(elem);

	                // Fix all IE cloning issues
	                for (i = 0; (node = srcElements[i]) != null; ++i) {

	                    // Ensure that the destination node is not null; Fixes #9587
	                    if (destElements[i]) {
	                        fixCloneNodeIssues(node, destElements[i]);
	                    }
	                }
	            }

	            // Copy the events from the original to the clone
	            if (dataAndEvents) {
	                if (deepDataAndEvents) {
	                    srcElements = srcElements || getAll(elem);
	                    destElements = destElements || getAll(clone);

	                    for (i = 0; (node = srcElements[i]) != null; i++) {
	                        cloneCopyEvent(node, destElements[i]);
	                    }
	                } else {
	                    cloneCopyEvent(elem, clone);
	                }
	            }

	            // Preserve script evaluation history
	            destElements = getAll(clone, "script");
	            if (destElements.length > 0) {
	                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
	            }

	            destElements = srcElements = node = null;

	            // Return the cloned set
	            return clone;
	        },

	        cleanData: function cleanData(elems, /* internal */forceAcceptData) {
	            var elem,
	                type,
	                id,
	                data,
	                i = 0,
	                internalKey = jQuery.expando,
	                cache = jQuery.cache,
	                attributes = support.attributes,
	                special = jQuery.event.special;

	            for (; (elem = elems[i]) != null; i++) {
	                if (forceAcceptData || acceptData(elem)) {

	                    id = elem[internalKey];
	                    data = id && cache[id];

	                    if (data) {
	                        if (data.events) {
	                            for (type in data.events) {
	                                if (special[type]) {
	                                    jQuery.event.remove(elem, type);

	                                    // This is a shortcut to avoid jQuery.event.remove's overhead
	                                } else {
	                                    jQuery.removeEvent(elem, type, data.handle);
	                                }
	                            }
	                        }

	                        // Remove cache only if it was not already removed by jQuery.event.remove
	                        if (cache[id]) {

	                            delete cache[id];

	                            // Support: IE<9
	                            // IE does not allow us to delete expando properties from nodes
	                            // IE creates expando attributes along with the property
	                            // IE does not have a removeAttribute function on Document nodes
	                            if (!attributes && typeof elem.removeAttribute !== "undefined") {
	                                elem.removeAttribute(internalKey);

	                                // Webkit & Blink performance suffers when deleting properties
	                                // from DOM nodes, so set to undefined instead
	                                // https://code.google.com/p/chromium/issues/detail?id=378607
	                            } else {
	                                elem[internalKey] = undefined;
	                            }

	                            deletedIds.push(id);
	                        }
	                    }
	                }
	            }
	        }
	    });

	    jQuery.fn.extend({

	        // Keep domManip exposed until 3.0 (gh-2225)
	        domManip: domManip,

	        detach: function detach(selector) {
	            return _remove(this, selector, true);
	        },

	        remove: function remove(selector) {
	            return _remove(this, selector);
	        },

	        text: function text(value) {
	            return access(this, function (value) {
	                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
	            }, null, value, arguments.length);
	        },

	        append: function append() {
	            return domManip(this, arguments, function (elem) {
	                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	                    var target = manipulationTarget(this, elem);
	                    target.appendChild(elem);
	                }
	            });
	        },

	        prepend: function prepend() {
	            return domManip(this, arguments, function (elem) {
	                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	                    var target = manipulationTarget(this, elem);
	                    target.insertBefore(elem, target.firstChild);
	                }
	            });
	        },

	        before: function before() {
	            return domManip(this, arguments, function (elem) {
	                if (this.parentNode) {
	                    this.parentNode.insertBefore(elem, this);
	                }
	            });
	        },

	        after: function after() {
	            return domManip(this, arguments, function (elem) {
	                if (this.parentNode) {
	                    this.parentNode.insertBefore(elem, this.nextSibling);
	                }
	            });
	        },

	        empty: function empty() {
	            var elem,
	                i = 0;

	            for (; (elem = this[i]) != null; i++) {

	                // Remove element nodes and prevent memory leaks
	                if (elem.nodeType === 1) {
	                    jQuery.cleanData(getAll(elem, false));
	                }

	                // Remove any remaining nodes
	                while (elem.firstChild) {
	                    elem.removeChild(elem.firstChild);
	                }

	                // If this is a select, ensure that it displays empty (#12336)
	                // Support: IE<9
	                if (elem.options && jQuery.nodeName(elem, "select")) {
	                    elem.options.length = 0;
	                }
	            }

	            return this;
	        },

	        clone: function clone(dataAndEvents, deepDataAndEvents) {
	            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

	            return this.map(function () {
	                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	            });
	        },

	        html: function html(value) {
	            return access(this, function (value) {
	                var elem = this[0] || {},
	                    i = 0,
	                    l = this.length;

	                if (value === undefined) {
	                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
	                }

	                // See if we can take a shortcut and just use innerHTML
	                if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

	                    value = jQuery.htmlPrefilter(value);

	                    try {
	                        for (; i < l; i++) {

	                            // Remove element nodes and prevent memory leaks
	                            elem = this[i] || {};
	                            if (elem.nodeType === 1) {
	                                jQuery.cleanData(getAll(elem, false));
	                                elem.innerHTML = value;
	                            }
	                        }

	                        elem = 0;

	                        // If using innerHTML throws an exception, use the fallback method
	                    } catch (e) {}
	                }

	                if (elem) {
	                    this.empty().append(value);
	                }
	            }, null, value, arguments.length);
	        },

	        replaceWith: function replaceWith() {
	            var ignored = [];

	            // Make the changes, replacing each non-ignored context element with the new content
	            return domManip(this, arguments, function (elem) {
	                var parent = this.parentNode;

	                if (jQuery.inArray(this, ignored) < 0) {
	                    jQuery.cleanData(getAll(this));
	                    if (parent) {
	                        parent.replaceChild(elem, this);
	                    }
	                }

	                // Force callback invocation
	            }, ignored);
	        }
	    });

	    jQuery.each({
	        appendTo: "append",
	        prependTo: "prepend",
	        insertBefore: "before",
	        insertAfter: "after",
	        replaceAll: "replaceWith"
	    }, function (name, original) {
	        jQuery.fn[name] = function (selector) {
	            var elems,
	                i = 0,
	                ret = [],
	                insert = jQuery(selector),
	                last = insert.length - 1;

	            for (; i <= last; i++) {
	                elems = i === last ? this : this.clone(true);
	                jQuery(insert[i])[original](elems);

	                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
	                push.apply(ret, elems.get());
	            }

	            return this.pushStack(ret);
	        };
	    });

	    var iframe,
	        elemdisplay = {

	        // Support: Firefox
	        // We have to pre-define these values for FF (#10227)
	        HTML: "block",
	        BODY: "block"
	    };

	    /**
	     * Retrieve the actual display of a element
	     * @param {String} name nodeName of the element
	     * @param {Object} doc Document object
	     */

	    // Called only from within defaultDisplay
	    function actualDisplay(name, doc) {
	        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
	            display = jQuery.css(elem[0], "display");

	        // We don't have any data stored on the element,
	        // so use "detach" method as fast way to get rid of the element
	        elem.detach();

	        return display;
	    }

	    /**
	     * Try to determine the default display value of an element
	     * @param {String} nodeName
	     */
	    function defaultDisplay(nodeName) {
	        var doc = document,
	            display = elemdisplay[nodeName];

	        if (!display) {
	            display = actualDisplay(nodeName, doc);

	            // If the simple way fails, read from inside an iframe
	            if (display === "none" || !display) {

	                // Use the already-created iframe if possible
	                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

	                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
	                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;

	                // Support: IE
	                doc.write();
	                doc.close();

	                display = actualDisplay(nodeName, doc);
	                iframe.detach();
	            }

	            // Store the correct default display
	            elemdisplay[nodeName] = display;
	        }

	        return display;
	    }

	    var rmargin = /^margin/;

	    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	    var swap = function swap(elem, options, callback, args) {
	        var ret,
	            name,
	            old = {};

	        // Remember the old values, and insert the new ones
	        for (name in options) {
	            old[name] = elem.style[name];
	            elem.style[name] = options[name];
	        }

	        ret = callback.apply(elem, args || []);

	        // Revert the old values
	        for (name in options) {
	            elem.style[name] = old[name];
	        }

	        return ret;
	    };

	    var documentElement = document.documentElement;

	    (function () {
	        var pixelPositionVal,
	            pixelMarginRightVal,
	            boxSizingReliableVal,
	            reliableHiddenOffsetsVal,
	            reliableMarginRightVal,
	            reliableMarginLeftVal,
	            container = document.createElement("div"),
	            div = document.createElement("div");

	        // Finish early in limited (non-browser) environments
	        if (!div.style) {
	            return;
	        }

	        div.style.cssText = "float:left;opacity:.5";

	        // Support: IE<9
	        // Make sure that element opacity exists (as opposed to filter)
	        support.opacity = div.style.opacity === "0.5";

	        // Verify style float existence
	        // (IE uses styleFloat instead of cssFloat)
	        support.cssFloat = !!div.style.cssFloat;

	        div.style.backgroundClip = "content-box";
	        div.cloneNode(true).style.backgroundClip = "";
	        support.clearCloneStyle = div.style.backgroundClip === "content-box";

	        container = document.createElement("div");
	        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
	        div.innerHTML = "";
	        container.appendChild(div);

	        // Support: Firefox<29, Android 2.3
	        // Vendor-prefix box-sizing
	        support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" || div.style.WebkitBoxSizing === "";

	        jQuery.extend(support, {
	            reliableHiddenOffsets: function reliableHiddenOffsets() {
	                if (pixelPositionVal == null) {
	                    computeStyleTests();
	                }
	                return reliableHiddenOffsetsVal;
	            },

	            boxSizingReliable: function boxSizingReliable() {

	                // We're checking for pixelPositionVal here instead of boxSizingReliableVal
	                // since that compresses better and they're computed together anyway.
	                if (pixelPositionVal == null) {
	                    computeStyleTests();
	                }
	                return boxSizingReliableVal;
	            },

	            pixelMarginRight: function pixelMarginRight() {

	                // Support: Android 4.0-4.3
	                if (pixelPositionVal == null) {
	                    computeStyleTests();
	                }
	                return pixelMarginRightVal;
	            },

	            pixelPosition: function pixelPosition() {
	                if (pixelPositionVal == null) {
	                    computeStyleTests();
	                }
	                return pixelPositionVal;
	            },

	            reliableMarginRight: function reliableMarginRight() {

	                // Support: Android 2.3
	                if (pixelPositionVal == null) {
	                    computeStyleTests();
	                }
	                return reliableMarginRightVal;
	            },

	            reliableMarginLeft: function reliableMarginLeft() {

	                // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
	                if (pixelPositionVal == null) {
	                    computeStyleTests();
	                }
	                return reliableMarginLeftVal;
	            }
	        });

	        function computeStyleTests() {
	            var contents,
	                divStyle,
	                documentElement = document.documentElement;

	            // Setup
	            documentElement.appendChild(container);

	            div.style.cssText =

	            // Support: Android 2.3
	            // Vendor-prefix box-sizing
	            "-webkit-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";

	            // Support: IE<9
	            // Assume reasonable values in the absence of getComputedStyle
	            pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
	            pixelMarginRightVal = reliableMarginRightVal = true;

	            // Check for getComputedStyle so that this code is not run in IE<9.
	            if (window.getComputedStyle) {
	                divStyle = window.getComputedStyle(div);
	                pixelPositionVal = (divStyle || {}).top !== "1%";
	                reliableMarginLeftVal = (divStyle || {}).marginLeft === "2px";
	                boxSizingReliableVal = (divStyle || { width: "4px" }).width === "4px";

	                // Support: Android 4.0 - 4.3 only
	                // Some styles come back with percentage values, even though they shouldn't
	                div.style.marginRight = "50%";
	                pixelMarginRightVal = (divStyle || { marginRight: "4px" }).marginRight === "4px";

	                // Support: Android 2.3 only
	                // Div with explicit width and no margin-right incorrectly
	                // gets computed margin-right based on width of container (#3333)
	                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	                contents = div.appendChild(document.createElement("div"));

	                // Reset CSS: box-sizing; display; margin; border; padding
	                contents.style.cssText = div.style.cssText =

	                // Support: Android 2.3
	                // Vendor-prefix box-sizing
	                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
	                contents.style.marginRight = contents.style.width = "0";
	                div.style.width = "1px";

	                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight);

	                div.removeChild(contents);
	            }

	            // Support: IE6-8
	            // First check that getClientRects works as expected
	            // Check if table cells still have offsetWidth/Height when they are set
	            // to display:none and there are still other visible table cells in a
	            // table row; if so, offsetWidth/Height are not reliable for use when
	            // determining if an element has been hidden directly using
	            // display:none (it is still safe to use offsets if a parent element is
	            // hidden; don safety goggles and see bug #4512 for more information).
	            div.style.display = "none";
	            reliableHiddenOffsetsVal = div.getClientRects().length === 0;
	            if (reliableHiddenOffsetsVal) {
	                div.style.display = "";
	                div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
	                contents = div.getElementsByTagName("td");
	                contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
	                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
	                if (reliableHiddenOffsetsVal) {
	                    contents[0].style.display = "";
	                    contents[1].style.display = "none";
	                    reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
	                }
	            }

	            // Teardown
	            documentElement.removeChild(container);
	        }
	    })();

	    var getStyles,
	        curCSS,
	        rposition = /^(top|right|bottom|left)$/;

	    if (window.getComputedStyle) {
	        getStyles = function getStyles(elem) {

	            // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
	            // IE throws on elements created in popups
	            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
	            var view = elem.ownerDocument.defaultView;

	            if (!view || !view.opener) {
	                view = window;
	            }

	            return view.getComputedStyle(elem);
	        };

	        curCSS = function curCSS(elem, name, computed) {
	            var width,
	                minWidth,
	                maxWidth,
	                ret,
	                style = elem.style;

	            computed = computed || getStyles(elem);

	            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
	            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

	            // Support: Opera 12.1x only
	            // Fall back to style even without computed
	            // computed is undefined for elems on document fragments
	            if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
	                ret = jQuery.style(elem, name);
	            }

	            if (computed) {

	                // A tribute to the "awesome hack by Dean Edwards"
	                // Chrome < 17 and Safari 5.0 uses "computed value"
	                // instead of "used value" for margin-right
	                // Safari 5.1.7 (at least) returns percentage for a larger set of values,
	                // but width seems to be reliably pixels
	                // this is against the CSSOM draft spec:
	                // http://dev.w3.org/csswg/cssom/#resolved-values
	                if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

	                    // Remember the original values
	                    width = style.width;
	                    minWidth = style.minWidth;
	                    maxWidth = style.maxWidth;

	                    // Put in the new values to get a computed value out
	                    style.minWidth = style.maxWidth = style.width = ret;
	                    ret = computed.width;

	                    // Revert the changed values
	                    style.width = width;
	                    style.minWidth = minWidth;
	                    style.maxWidth = maxWidth;
	                }
	            }

	            // Support: IE
	            // IE returns zIndex value as an integer.
	            return ret === undefined ? ret : ret + "";
	        };
	    } else if (documentElement.currentStyle) {
	        getStyles = function getStyles(elem) {
	            return elem.currentStyle;
	        };

	        curCSS = function curCSS(elem, name, computed) {
	            var left,
	                rs,
	                rsLeft,
	                ret,
	                style = elem.style;

	            computed = computed || getStyles(elem);
	            ret = computed ? computed[name] : undefined;

	            // Avoid setting ret to empty string here
	            // so we don't default to auto
	            if (ret == null && style && style[name]) {
	                ret = style[name];
	            }

	            // From the awesome hack by Dean Edwards
	            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

	            // If we're not dealing with a regular pixel number
	            // but a number that has a weird ending, we need to convert it to pixels
	            // but not position css attributes, as those are
	            // proportional to the parent element instead
	            // and we can't measure the parent instead because it
	            // might trigger a "stacking dolls" problem
	            if (rnumnonpx.test(ret) && !rposition.test(name)) {

	                // Remember the original values
	                left = style.left;
	                rs = elem.runtimeStyle;
	                rsLeft = rs && rs.left;

	                // Put in the new values to get a computed value out
	                if (rsLeft) {
	                    rs.left = elem.currentStyle.left;
	                }
	                style.left = name === "fontSize" ? "1em" : ret;
	                ret = style.pixelLeft + "px";

	                // Revert the changed values
	                style.left = left;
	                if (rsLeft) {
	                    rs.left = rsLeft;
	                }
	            }

	            // Support: IE
	            // IE returns zIndex value as an integer.
	            return ret === undefined ? ret : ret + "" || "auto";
	        };
	    }

	    function addGetHookIf(conditionFn, hookFn) {

	        // Define the hook, we'll check on the first run if it's really needed.
	        return {
	            get: function get() {
	                if (conditionFn()) {

	                    // Hook not needed (or it's not possible to use it due
	                    // to missing dependency), remove it.
	                    delete this.get;
	                    return;
	                }

	                // Hook needed; redefine it so that the support test is not executed again.
	                return (this.get = hookFn).apply(this, arguments);
	            }
	        };
	    }

	    var ralpha = /alpha\([^)]*\)/i,
	        ropacity = /opacity\s*=\s*([^)]*)/i,


	    // swappable if display is none or starts with table except
	    // "table", "table-cell", or "table-caption"
	    // see here for display values:
	    // https://developer.mozilla.org/en-US/docs/CSS/display
	    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
	        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	        cssNormalTransform = {
	        letterSpacing: "0",
	        fontWeight: "400"
	    },
	        cssPrefixes = ["Webkit", "O", "Moz", "ms"],
	        emptyStyle = document.createElement("div").style;

	    // return a css property mapped to a potentially vendor prefixed property
	    function vendorPropName(name) {

	        // shortcut for names that are not vendor prefixed
	        if (name in emptyStyle) {
	            return name;
	        }

	        // check for vendor prefixed names
	        var capName = name.charAt(0).toUpperCase() + name.slice(1),
	            i = cssPrefixes.length;

	        while (i--) {
	            name = cssPrefixes[i] + capName;
	            if (name in emptyStyle) {
	                return name;
	            }
	        }
	    }

	    function showHide(elements, show) {
	        var display,
	            elem,
	            hidden,
	            values = [],
	            index = 0,
	            length = elements.length;

	        for (; index < length; index++) {
	            elem = elements[index];
	            if (!elem.style) {
	                continue;
	            }

	            values[index] = jQuery._data(elem, "olddisplay");
	            display = elem.style.display;
	            if (show) {

	                // Reset the inline display of this element to learn if it is
	                // being hidden by cascaded rules or not
	                if (!values[index] && display === "none") {
	                    elem.style.display = "";
	                }

	                // Set elements which have been overridden with display: none
	                // in a stylesheet to whatever the default browser style is
	                // for such an element
	                if (elem.style.display === "" && isHidden(elem)) {
	                    values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
	                }
	            } else {
	                hidden = isHidden(elem);

	                if (display && display !== "none" || !hidden) {
	                    jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
	                }
	            }
	        }

	        // Set the display of most of the elements in a second loop
	        // to avoid the constant reflow
	        for (index = 0; index < length; index++) {
	            elem = elements[index];
	            if (!elem.style) {
	                continue;
	            }
	            if (!show || elem.style.display === "none" || elem.style.display === "") {
	                elem.style.display = show ? values[index] || "" : "none";
	            }
	        }

	        return elements;
	    }

	    function setPositiveNumber(elem, value, subtract) {
	        var matches = rnumsplit.exec(value);
	        return matches ?

	        // Guard against undefined "subtract", e.g., when used as in cssHooks
	        Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
	    }

	    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
	        var i = extra === (isBorderBox ? "border" : "content") ?

	        // If we already have the right measurement, avoid augmentation
	        4 :

	        // Otherwise initialize for horizontal or vertical properties
	        name === "width" ? 1 : 0,
	            val = 0;

	        for (; i < 4; i += 2) {

	            // both box models exclude margin, so add it if we want it
	            if (extra === "margin") {
	                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
	            }

	            if (isBorderBox) {

	                // border-box includes padding, so remove it if we want content
	                if (extra === "content") {
	                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	                }

	                // at this point, extra isn't border nor margin, so remove border
	                if (extra !== "margin") {
	                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	                }
	            } else {

	                // at this point, extra isn't content, so add padding
	                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

	                // at this point, extra isn't content nor padding, so add border
	                if (extra !== "padding") {
	                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	                }
	            }
	        }

	        return val;
	    }

	    function getWidthOrHeight(elem, name, extra) {

	        // Start with offset property, which is equivalent to the border-box value
	        var valueIsBorderBox = true,
	            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
	            styles = getStyles(elem),
	            isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

	        // Support: IE11 only
	        // In IE 11 fullscreen elements inside of an iframe have
	        // 100x too small dimensions (gh-1764).
	        if (document.msFullscreenElement && window.top !== window) {

	            // Support: IE11 only
	            // Running getBoundingClientRect on a disconnected node
	            // in IE throws an error.
	            if (elem.getClientRects().length) {
	                val = Math.round(elem.getBoundingClientRect()[name] * 100);
	            }
	        }

	        // some non-html elements return undefined for offsetWidth, so check for null/undefined
	        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	        if (val <= 0 || val == null) {

	            // Fall back to computed then uncomputed css if necessary
	            val = curCSS(elem, name, styles);
	            if (val < 0 || val == null) {
	                val = elem.style[name];
	            }

	            // Computed unit is not pixels. Stop here and return.
	            if (rnumnonpx.test(val)) {
	                return val;
	            }

	            // we need the check for style in case a browser which returns unreliable values
	            // for getComputedStyle silently falls back to the reliable elem.style
	            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

	            // Normalize "", auto, and prepare for extra
	            val = parseFloat(val) || 0;
	        }

	        // use the active box-sizing model to add/subtract irrelevant styles
	        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	    }

	    jQuery.extend({

	        // Add in style property hooks for overriding the default
	        // behavior of getting and setting a style property
	        cssHooks: {
	            opacity: {
	                get: function get(elem, computed) {
	                    if (computed) {

	                        // We should always get a number back from opacity
	                        var ret = curCSS(elem, "opacity");
	                        return ret === "" ? "1" : ret;
	                    }
	                }
	            }
	        },

	        // Don't automatically add "px" to these possibly-unitless properties
	        cssNumber: {
	            "animationIterationCount": true,
	            "columnCount": true,
	            "fillOpacity": true,
	            "flexGrow": true,
	            "flexShrink": true,
	            "fontWeight": true,
	            "lineHeight": true,
	            "opacity": true,
	            "order": true,
	            "orphans": true,
	            "widows": true,
	            "zIndex": true,
	            "zoom": true
	        },

	        // Add in properties whose names you wish to fix before
	        // setting or getting the value
	        cssProps: {

	            // normalize float css property
	            "float": support.cssFloat ? "cssFloat" : "styleFloat"
	        },

	        // Get and set the style property on a DOM Node
	        style: function style(elem, name, value, extra) {

	            // Don't set styles on text and comment nodes
	            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	                return;
	            }

	            // Make sure that we're working with the right name
	            var ret,
	                type,
	                hooks,
	                origName = jQuery.camelCase(name),
	                style = elem.style;

	            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

	            // gets hook for the prefixed version
	            // followed by the unprefixed version
	            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

	            // Check if we're setting a value
	            if (value !== undefined) {
	                type = typeof value === "undefined" ? "undefined" : _typeof(value);

	                // Convert "+=" or "-=" to relative numbers (#7345)
	                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
	                    value = adjustCSS(elem, name, ret);

	                    // Fixes bug #9237
	                    type = "number";
	                }

	                // Make sure that null and NaN values aren't set. See: #7116
	                if (value == null || value !== value) {
	                    return;
	                }

	                // If a number was passed in, add the unit (except for certain CSS properties)
	                if (type === "number") {
	                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
	                }

	                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
	                // but it would mean to define eight
	                // (for every problematic property) identical functions
	                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
	                    style[name] = "inherit";
	                }

	                // If a hook was provided, use that value, otherwise just set the specified value
	                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

	                    // Support: IE
	                    // Swallow errors from 'invalid' CSS values (#5509)
	                    try {
	                        style[name] = value;
	                    } catch (e) {}
	                }
	            } else {

	                // If a hook was provided get the non-computed value from there
	                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

	                    return ret;
	                }

	                // Otherwise just get the value from the style object
	                return style[name];
	            }
	        },

	        css: function css(elem, name, extra, styles) {
	            var num,
	                val,
	                hooks,
	                origName = jQuery.camelCase(name);

	            // Make sure that we're working with the right name
	            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

	            // gets hook for the prefixed version
	            // followed by the unprefixed version
	            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

	            // If a hook was provided get the computed value from there
	            if (hooks && "get" in hooks) {
	                val = hooks.get(elem, true, extra);
	            }

	            // Otherwise, if a way to get the computed value exists, use that
	            if (val === undefined) {
	                val = curCSS(elem, name, styles);
	            }

	            //convert "normal" to computed value
	            if (val === "normal" && name in cssNormalTransform) {
	                val = cssNormalTransform[name];
	            }

	            // Return, converting to number if forced or a qualifier was provided and val looks numeric
	            if (extra === "" || extra) {
	                num = parseFloat(val);
	                return extra === true || isFinite(num) ? num || 0 : val;
	            }
	            return val;
	        }
	    });

	    jQuery.each(["height", "width"], function (i, name) {
	        jQuery.cssHooks[name] = {
	            get: function get(elem, computed, extra) {
	                if (computed) {

	                    // certain elements can have dimension info if we invisibly show them
	                    // however, it must have a current display style that would benefit from this
	                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
	                        return getWidthOrHeight(elem, name, extra);
	                    }) : getWidthOrHeight(elem, name, extra);
	                }
	            },

	            set: function set(elem, value, extra) {
	                var styles = extra && getStyles(elem);
	                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
	            }
	        };
	    });

	    if (!support.opacity) {
	        jQuery.cssHooks.opacity = {
	            get: function get(elem, computed) {

	                // IE uses filters for opacity
	                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
	            },

	            set: function set(elem, value) {
	                var style = elem.style,
	                    currentStyle = elem.currentStyle,
	                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
	                    filter = currentStyle && currentStyle.filter || style.filter || "";

	                // IE has trouble with opacity if it does not have layout
	                // Force it by setting the zoom level
	                style.zoom = 1;

	                // if setting opacity to 1, and no other filters exist -
	                // attempt to remove filter attribute #6652
	                // if value === "", then remove inline opacity #12685
	                if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {

	                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
	                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
	                    // style.removeAttribute is IE Only, but so apparently is this code path...
	                    style.removeAttribute("filter");

	                    // if there is no filter style applied in a css rule
	                    // or unset inline opacity, we are done
	                    if (value === "" || currentStyle && !currentStyle.filter) {
	                        return;
	                    }
	                }

	                // otherwise, set new filter values
	                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
	            }
	        };
	    }

	    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
	        if (computed) {
	            return swap(elem, { "display": "inline-block" }, curCSS, [elem, "marginRight"]);
	        }
	    });

	    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
	        if (computed) {
	            return (parseFloat(curCSS(elem, "marginLeft")) || (

	            // Support: IE<=11+
	            // Running getBoundingClientRect on a disconnected node in IE throws an error
	            // Support: IE8 only
	            // getClientRects() errors on disconnected elems
	            jQuery.contains(elem.ownerDocument, elem) ? elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
	                return elem.getBoundingClientRect().left;
	            }) : 0)) + "px";
	        }
	    });

	    // These hooks are used by animate to expand properties
	    jQuery.each({
	        margin: "",
	        padding: "",
	        border: "Width"
	    }, function (prefix, suffix) {
	        jQuery.cssHooks[prefix + suffix] = {
	            expand: function expand(value) {
	                var i = 0,
	                    expanded = {},


	                // assumes a single number if not a string
	                parts = typeof value === "string" ? value.split(" ") : [value];

	                for (; i < 4; i++) {
	                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
	                }

	                return expanded;
	            }
	        };

	        if (!rmargin.test(prefix)) {
	            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	        }
	    });

	    jQuery.fn.extend({
	        css: function css(name, value) {
	            return access(this, function (elem, name, value) {
	                var styles,
	                    len,
	                    map = {},
	                    i = 0;

	                if (jQuery.isArray(name)) {
	                    styles = getStyles(elem);
	                    len = name.length;

	                    for (; i < len; i++) {
	                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
	                    }

	                    return map;
	                }

	                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
	            }, name, value, arguments.length > 1);
	        },
	        show: function show() {
	            return showHide(this, true);
	        },
	        hide: function hide() {
	            return showHide(this);
	        },
	        toggle: function toggle(state) {
	            if (typeof state === "boolean") {
	                return state ? this.show() : this.hide();
	            }

	            return this.each(function () {
	                if (isHidden(this)) {
	                    jQuery(this).show();
	                } else {
	                    jQuery(this).hide();
	                }
	            });
	        }
	    });

	    function Tween(elem, options, prop, end, easing) {
	        return new Tween.prototype.init(elem, options, prop, end, easing);
	    }

	    jQuery.Tween = Tween;

	    Tween.prototype = {
	        constructor: Tween,
	        init: function init(elem, options, prop, end, easing, unit) {
	            this.elem = elem;
	            this.prop = prop;
	            this.easing = easing || jQuery.easing._default;
	            this.options = options;
	            this.start = this.now = this.cur();
	            this.end = end;
	            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
	        },
	        cur: function cur() {
	            var hooks = Tween.propHooks[this.prop];

	            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
	        },
	        run: function run(percent) {
	            var eased,
	                hooks = Tween.propHooks[this.prop];

	            if (this.options.duration) {
	                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
	            } else {
	                this.pos = eased = percent;
	            }
	            this.now = (this.end - this.start) * eased + this.start;

	            if (this.options.step) {
	                this.options.step.call(this.elem, this.now, this);
	            }

	            if (hooks && hooks.set) {
	                hooks.set(this);
	            } else {
	                Tween.propHooks._default.set(this);
	            }
	            return this;
	        }
	    };

	    Tween.prototype.init.prototype = Tween.prototype;

	    Tween.propHooks = {
	        _default: {
	            get: function get(tween) {
	                var result;

	                // Use a property on the element directly when it is not a DOM element,
	                // or when there is no matching style property that exists.
	                if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
	                    return tween.elem[tween.prop];
	                }

	                // passing an empty string as a 3rd parameter to .css will automatically
	                // attempt a parseFloat and fallback to a string if the parse fails
	                // so, simple values such as "10px" are parsed to Float.
	                // complex values such as "rotate(1rad)" are returned as is.
	                result = jQuery.css(tween.elem, tween.prop, "");

	                // Empty strings, null, undefined and "auto" are converted to 0.
	                return !result || result === "auto" ? 0 : result;
	            },
	            set: function set(tween) {

	                // use step hook for back compat - use cssHook if its there - use .style if its
	                // available and use plain properties where available
	                if (jQuery.fx.step[tween.prop]) {
	                    jQuery.fx.step[tween.prop](tween);
	                } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
	                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
	                } else {
	                    tween.elem[tween.prop] = tween.now;
	                }
	            }
	        }
	    };

	    // Support: IE <=9
	    // Panic based approach to setting things on disconnected nodes

	    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	        set: function set(tween) {
	            if (tween.elem.nodeType && tween.elem.parentNode) {
	                tween.elem[tween.prop] = tween.now;
	            }
	        }
	    };

	    jQuery.easing = {
	        linear: function linear(p) {
	            return p;
	        },
	        swing: function swing(p) {
	            return 0.5 - Math.cos(p * Math.PI) / 2;
	        },
	        _default: "swing"
	    };

	    jQuery.fx = Tween.prototype.init;

	    // Back Compat <1.8 extension point
	    jQuery.fx.step = {};

	    var fxNow,
	        timerId,
	        rfxtypes = /^(?:toggle|show|hide)$/,
	        rrun = /queueHooks$/;

	    // Animations created synchronously will run synchronously
	    function createFxNow() {
	        window.setTimeout(function () {
	            fxNow = undefined;
	        });
	        return fxNow = jQuery.now();
	    }

	    // Generate parameters to create a standard animation
	    function genFx(type, includeWidth) {
	        var which,
	            attrs = { height: type },
	            i = 0;

	        // if we include width, step value is 1 to do all cssExpand values,
	        // if we don't include width, step value is 2 to skip over Left and Right
	        includeWidth = includeWidth ? 1 : 0;
	        for (; i < 4; i += 2 - includeWidth) {
	            which = cssExpand[i];
	            attrs["margin" + which] = attrs["padding" + which] = type;
	        }

	        if (includeWidth) {
	            attrs.opacity = attrs.width = type;
	        }

	        return attrs;
	    }

	    function createTween(value, prop, animation) {
	        var tween,
	            collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
	            index = 0,
	            length = collection.length;
	        for (; index < length; index++) {
	            if (tween = collection[index].call(animation, prop, value)) {

	                // we're done with this property
	                return tween;
	            }
	        }
	    }

	    function defaultPrefilter(elem, props, opts) {
	        /* jshint validthis: true */
	        var prop,
	            value,
	            toggle,
	            tween,
	            hooks,
	            oldfire,
	            display,
	            checkDisplay,
	            anim = this,
	            orig = {},
	            style = elem.style,
	            hidden = elem.nodeType && isHidden(elem),
	            dataShow = jQuery._data(elem, "fxshow");

	        // handle queue: false promises
	        if (!opts.queue) {
	            hooks = jQuery._queueHooks(elem, "fx");
	            if (hooks.unqueued == null) {
	                hooks.unqueued = 0;
	                oldfire = hooks.empty.fire;
	                hooks.empty.fire = function () {
	                    if (!hooks.unqueued) {
	                        oldfire();
	                    }
	                };
	            }
	            hooks.unqueued++;

	            anim.always(function () {

	                // doing this makes sure that the complete handler will be called
	                // before this completes
	                anim.always(function () {
	                    hooks.unqueued--;
	                    if (!jQuery.queue(elem, "fx").length) {
	                        hooks.empty.fire();
	                    }
	                });
	            });
	        }

	        // height/width overflow pass
	        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

	            // Make sure that nothing sneaks out
	            // Record all 3 overflow attributes because IE does not
	            // change the overflow attribute when overflowX and
	            // overflowY are set to the same value
	            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

	            // Set display property to inline-block for height/width
	            // animations on inline elements that are having width/height animated
	            display = jQuery.css(elem, "display");

	            // Test default display if display is currently "none"
	            checkDisplay = display === "none" ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

	            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {

	                // inline-level elements accept inline-block;
	                // block-level elements need to be inline with layout
	                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
	                    style.display = "inline-block";
	                } else {
	                    style.zoom = 1;
	                }
	            }
	        }

	        if (opts.overflow) {
	            style.overflow = "hidden";
	            if (!support.shrinkWrapBlocks()) {
	                anim.always(function () {
	                    style.overflow = opts.overflow[0];
	                    style.overflowX = opts.overflow[1];
	                    style.overflowY = opts.overflow[2];
	                });
	            }
	        }

	        // show/hide pass
	        for (prop in props) {
	            value = props[prop];
	            if (rfxtypes.exec(value)) {
	                delete props[prop];
	                toggle = toggle || value === "toggle";
	                if (value === (hidden ? "hide" : "show")) {

	                    // If there is dataShow left over from a stopped hide or show
	                    // and we are going to proceed with show, we should pretend to be hidden
	                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
	                        hidden = true;
	                    } else {
	                        continue;
	                    }
	                }
	                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

	                // Any non-fx value stops us from restoring the original display value
	            } else {
	                display = undefined;
	            }
	        }

	        if (!jQuery.isEmptyObject(orig)) {
	            if (dataShow) {
	                if ("hidden" in dataShow) {
	                    hidden = dataShow.hidden;
	                }
	            } else {
	                dataShow = jQuery._data(elem, "fxshow", {});
	            }

	            // store state if its toggle - enables .stop().toggle() to "reverse"
	            if (toggle) {
	                dataShow.hidden = !hidden;
	            }
	            if (hidden) {
	                jQuery(elem).show();
	            } else {
	                anim.done(function () {
	                    jQuery(elem).hide();
	                });
	            }
	            anim.done(function () {
	                var prop;
	                jQuery._removeData(elem, "fxshow");
	                for (prop in orig) {
	                    jQuery.style(elem, prop, orig[prop]);
	                }
	            });
	            for (prop in orig) {
	                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

	                if (!(prop in dataShow)) {
	                    dataShow[prop] = tween.start;
	                    if (hidden) {
	                        tween.end = tween.start;
	                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
	                    }
	                }
	            }

	            // If this is a noop like .hide().hide(), restore an overwritten display value
	        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
	            style.display = display;
	        }
	    }

	    function propFilter(props, specialEasing) {
	        var index, name, easing, value, hooks;

	        // camelCase, specialEasing and expand cssHook pass
	        for (index in props) {
	            name = jQuery.camelCase(index);
	            easing = specialEasing[name];
	            value = props[index];
	            if (jQuery.isArray(value)) {
	                easing = value[1];
	                value = props[index] = value[0];
	            }

	            if (index !== name) {
	                props[name] = value;
	                delete props[index];
	            }

	            hooks = jQuery.cssHooks[name];
	            if (hooks && "expand" in hooks) {
	                value = hooks.expand(value);
	                delete props[name];

	                // not quite $.extend, this wont overwrite keys already present.
	                // also - reusing 'index' from above because we have the correct "name"
	                for (index in value) {
	                    if (!(index in props)) {
	                        props[index] = value[index];
	                        specialEasing[index] = easing;
	                    }
	                }
	            } else {
	                specialEasing[name] = easing;
	            }
	        }
	    }

	    function Animation(elem, properties, options) {
	        var result,
	            stopped,
	            index = 0,
	            length = Animation.prefilters.length,
	            deferred = jQuery.Deferred().always(function () {

	            // don't match elem in the :animated selector
	            delete tick.elem;
	        }),
	            tick = function tick() {
	            if (stopped) {
	                return false;
	            }
	            var currentTime = fxNow || createFxNow(),
	                remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


	            // Support: Android 2.3
	            // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
	            temp = remaining / animation.duration || 0,
	                percent = 1 - temp,
	                index = 0,
	                length = animation.tweens.length;

	            for (; index < length; index++) {
	                animation.tweens[index].run(percent);
	            }

	            deferred.notifyWith(elem, [animation, percent, remaining]);

	            if (percent < 1 && length) {
	                return remaining;
	            } else {
	                deferred.resolveWith(elem, [animation]);
	                return false;
	            }
	        },
	            animation = deferred.promise({
	            elem: elem,
	            props: jQuery.extend({}, properties),
	            opts: jQuery.extend(true, {
	                specialEasing: {},
	                easing: jQuery.easing._default
	            }, options),
	            originalProperties: properties,
	            originalOptions: options,
	            startTime: fxNow || createFxNow(),
	            duration: options.duration,
	            tweens: [],
	            createTween: function createTween(prop, end) {
	                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
	                animation.tweens.push(tween);
	                return tween;
	            },
	            stop: function stop(gotoEnd) {
	                var index = 0,


	                // if we are going to the end, we want to run all the tweens
	                // otherwise we skip this part
	                length = gotoEnd ? animation.tweens.length : 0;
	                if (stopped) {
	                    return this;
	                }
	                stopped = true;
	                for (; index < length; index++) {
	                    animation.tweens[index].run(1);
	                }

	                // resolve when we played the last frame
	                // otherwise, reject
	                if (gotoEnd) {
	                    deferred.notifyWith(elem, [animation, 1, 0]);
	                    deferred.resolveWith(elem, [animation, gotoEnd]);
	                } else {
	                    deferred.rejectWith(elem, [animation, gotoEnd]);
	                }
	                return this;
	            }
	        }),
	            props = animation.props;

	        propFilter(props, animation.opts.specialEasing);

	        for (; index < length; index++) {
	            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
	            if (result) {
	                if (jQuery.isFunction(result.stop)) {
	                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
	                }
	                return result;
	            }
	        }

	        jQuery.map(props, createTween, animation);

	        if (jQuery.isFunction(animation.opts.start)) {
	            animation.opts.start.call(elem, animation);
	        }

	        jQuery.fx.timer(jQuery.extend(tick, {
	            elem: elem,
	            anim: animation,
	            queue: animation.opts.queue
	        }));

	        // attach callbacks from options
	        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	    }

	    jQuery.Animation = jQuery.extend(Animation, {

	        tweeners: {
	            "*": [function (prop, value) {
	                var tween = this.createTween(prop, value);
	                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
	                return tween;
	            }]
	        },

	        tweener: function tweener(props, callback) {
	            if (jQuery.isFunction(props)) {
	                callback = props;
	                props = ["*"];
	            } else {
	                props = props.match(rnotwhite);
	            }

	            var prop,
	                index = 0,
	                length = props.length;

	            for (; index < length; index++) {
	                prop = props[index];
	                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
	                Animation.tweeners[prop].unshift(callback);
	            }
	        },

	        prefilters: [defaultPrefilter],

	        prefilter: function prefilter(callback, prepend) {
	            if (prepend) {
	                Animation.prefilters.unshift(callback);
	            } else {
	                Animation.prefilters.push(callback);
	            }
	        }
	    });

	    jQuery.speed = function (speed, easing, fn) {
	        var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
	            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
	            duration: speed,
	            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
	        };

	        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

	        // normalize opt.queue - true/undefined/null -> "fx"
	        if (opt.queue == null || opt.queue === true) {
	            opt.queue = "fx";
	        }

	        // Queueing
	        opt.old = opt.complete;

	        opt.complete = function () {
	            if (jQuery.isFunction(opt.old)) {
	                opt.old.call(this);
	            }

	            if (opt.queue) {
	                jQuery.dequeue(this, opt.queue);
	            }
	        };

	        return opt;
	    };

	    jQuery.fn.extend({
	        fadeTo: function fadeTo(speed, to, easing, callback) {

	            // show any hidden elements after setting opacity to 0
	            return this.filter(isHidden).css("opacity", 0).show()

	            // animate to the value specified
	            .end().animate({ opacity: to }, speed, easing, callback);
	        },
	        animate: function animate(prop, speed, easing, callback) {
	            var empty = jQuery.isEmptyObject(prop),
	                optall = jQuery.speed(speed, easing, callback),
	                doAnimation = function doAnimation() {

	                // Operate on a copy of prop so per-property easing won't be lost
	                var anim = Animation(this, jQuery.extend({}, prop), optall);

	                // Empty animations, or finishing resolves immediately
	                if (empty || jQuery._data(this, "finish")) {
	                    anim.stop(true);
	                }
	            };
	            doAnimation.finish = doAnimation;

	            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
	        },
	        stop: function stop(type, clearQueue, gotoEnd) {
	            var stopQueue = function stopQueue(hooks) {
	                var stop = hooks.stop;
	                delete hooks.stop;
	                stop(gotoEnd);
	            };

	            if (typeof type !== "string") {
	                gotoEnd = clearQueue;
	                clearQueue = type;
	                type = undefined;
	            }
	            if (clearQueue && type !== false) {
	                this.queue(type || "fx", []);
	            }

	            return this.each(function () {
	                var dequeue = true,
	                    index = type != null && type + "queueHooks",
	                    timers = jQuery.timers,
	                    data = jQuery._data(this);

	                if (index) {
	                    if (data[index] && data[index].stop) {
	                        stopQueue(data[index]);
	                    }
	                } else {
	                    for (index in data) {
	                        if (data[index] && data[index].stop && rrun.test(index)) {
	                            stopQueue(data[index]);
	                        }
	                    }
	                }

	                for (index = timers.length; index--;) {
	                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

	                        timers[index].anim.stop(gotoEnd);
	                        dequeue = false;
	                        timers.splice(index, 1);
	                    }
	                }

	                // start the next in the queue if the last step wasn't forced
	                // timers currently will call their complete callbacks, which will dequeue
	                // but only if they were gotoEnd
	                if (dequeue || !gotoEnd) {
	                    jQuery.dequeue(this, type);
	                }
	            });
	        },
	        finish: function finish(type) {
	            if (type !== false) {
	                type = type || "fx";
	            }
	            return this.each(function () {
	                var index,
	                    data = jQuery._data(this),
	                    queue = data[type + "queue"],
	                    hooks = data[type + "queueHooks"],
	                    timers = jQuery.timers,
	                    length = queue ? queue.length : 0;

	                // enable finishing flag on private data
	                data.finish = true;

	                // empty the queue first
	                jQuery.queue(this, type, []);

	                if (hooks && hooks.stop) {
	                    hooks.stop.call(this, true);
	                }

	                // look for any active animations, and finish them
	                for (index = timers.length; index--;) {
	                    if (timers[index].elem === this && timers[index].queue === type) {
	                        timers[index].anim.stop(true);
	                        timers.splice(index, 1);
	                    }
	                }

	                // look for any animations in the old queue and finish them
	                for (index = 0; index < length; index++) {
	                    if (queue[index] && queue[index].finish) {
	                        queue[index].finish.call(this);
	                    }
	                }

	                // turn off finishing flag
	                delete data.finish;
	            });
	        }
	    });

	    jQuery.each(["toggle", "show", "hide"], function (i, name) {
	        var cssFn = jQuery.fn[name];
	        jQuery.fn[name] = function (speed, easing, callback) {
	            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
	        };
	    });

	    // Generate shortcuts for custom animations
	    jQuery.each({
	        slideDown: genFx("show"),
	        slideUp: genFx("hide"),
	        slideToggle: genFx("toggle"),
	        fadeIn: { opacity: "show" },
	        fadeOut: { opacity: "hide" },
	        fadeToggle: { opacity: "toggle" }
	    }, function (name, props) {
	        jQuery.fn[name] = function (speed, easing, callback) {
	            return this.animate(props, speed, easing, callback);
	        };
	    });

	    jQuery.timers = [];
	    jQuery.fx.tick = function () {
	        var timer,
	            timers = jQuery.timers,
	            i = 0;

	        fxNow = jQuery.now();

	        for (; i < timers.length; i++) {
	            timer = timers[i];

	            // Checks the timer has not already been removed
	            if (!timer() && timers[i] === timer) {
	                timers.splice(i--, 1);
	            }
	        }

	        if (!timers.length) {
	            jQuery.fx.stop();
	        }
	        fxNow = undefined;
	    };

	    jQuery.fx.timer = function (timer) {
	        jQuery.timers.push(timer);
	        if (timer()) {
	            jQuery.fx.start();
	        } else {
	            jQuery.timers.pop();
	        }
	    };

	    jQuery.fx.interval = 13;

	    jQuery.fx.start = function () {
	        if (!timerId) {
	            timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
	        }
	    };

	    jQuery.fx.stop = function () {
	        window.clearInterval(timerId);
	        timerId = null;
	    };

	    jQuery.fx.speeds = {
	        slow: 600,
	        fast: 200,

	        // Default speed
	        _default: 400
	    };

	    // Based off of the plugin by Clint Helfers, with permission.
	    // http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	    jQuery.fn.delay = function (time, type) {
	        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	        type = type || "fx";

	        return this.queue(type, function (next, hooks) {
	            var timeout = window.setTimeout(next, time);
	            hooks.stop = function () {
	                window.clearTimeout(timeout);
	            };
	        });
	    };

	    (function () {
	        var a,
	            input = document.createElement("input"),
	            div = document.createElement("div"),
	            select = document.createElement("select"),
	            opt = select.appendChild(document.createElement("option"));

	        // Setup
	        div = document.createElement("div");
	        div.setAttribute("className", "t");
	        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	        a = div.getElementsByTagName("a")[0];

	        // Support: Windows Web Apps (WWA)
	        // `type` must use .setAttribute for WWA (#14901)
	        input.setAttribute("type", "checkbox");
	        div.appendChild(input);

	        a = div.getElementsByTagName("a")[0];

	        // First batch of tests.
	        a.style.cssText = "top:1px";

	        // Test setAttribute on camelCase class.
	        // If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	        support.getSetAttribute = div.className !== "t";

	        // Get the style information from getAttribute
	        // (IE uses .cssText instead)
	        support.style = /top/.test(a.getAttribute("style"));

	        // Make sure that URLs aren't manipulated
	        // (IE normalizes it by default)
	        support.hrefNormalized = a.getAttribute("href") === "/a";

	        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	        support.checkOn = !!input.value;

	        // Make sure that a selected-by-default option has a working selected property.
	        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	        support.optSelected = opt.selected;

	        // Tests for enctype support on a form (#6743)
	        support.enctype = !!document.createElement("form").enctype;

	        // Make sure that the options inside disabled selects aren't marked as disabled
	        // (WebKit marks them as disabled)
	        select.disabled = true;
	        support.optDisabled = !opt.disabled;

	        // Support: IE8 only
	        // Check if we can trust getAttribute("value")
	        input = document.createElement("input");
	        input.setAttribute("value", "");
	        support.input = input.getAttribute("value") === "";

	        // Check if an input maintains its value after becoming a radio
	        input.value = "t";
	        input.setAttribute("type", "radio");
	        support.radioValue = input.value === "t";
	    })();

	    var rreturn = /\r/g,
	        rspaces = /[\x20\t\r\n\f]+/g;

	    jQuery.fn.extend({
	        val: function val(value) {
	            var hooks,
	                ret,
	                isFunction,
	                elem = this[0];

	            if (!arguments.length) {
	                if (elem) {
	                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

	                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	                        return ret;
	                    }

	                    ret = elem.value;

	                    return typeof ret === "string" ?

	                    // handle most common string cases
	                    ret.replace(rreturn, "") :

	                    // handle cases where value is null/undef or number
	                    ret == null ? "" : ret;
	                }

	                return;
	            }

	            isFunction = jQuery.isFunction(value);

	            return this.each(function (i) {
	                var val;

	                if (this.nodeType !== 1) {
	                    return;
	                }

	                if (isFunction) {
	                    val = value.call(this, i, jQuery(this).val());
	                } else {
	                    val = value;
	                }

	                // Treat null/undefined as ""; convert numbers to string
	                if (val == null) {
	                    val = "";
	                } else if (typeof val === "number") {
	                    val += "";
	                } else if (jQuery.isArray(val)) {
	                    val = jQuery.map(val, function (value) {
	                        return value == null ? "" : value + "";
	                    });
	                }

	                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

	                // If set returns undefined, fall back to normal setting
	                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
	                    this.value = val;
	                }
	            });
	        }
	    });

	    jQuery.extend({
	        valHooks: {
	            option: {
	                get: function get(elem) {
	                    var val = jQuery.find.attr(elem, "value");
	                    return val != null ? val :

	                    // Support: IE10-11+
	                    // option.text throws exceptions (#14686, #14858)
	                    // Strip and collapse whitespace
	                    // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
	                    jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
	                }
	            },
	            select: {
	                get: function get(elem) {
	                    var value,
	                        option,
	                        options = elem.options,
	                        index = elem.selectedIndex,
	                        one = elem.type === "select-one" || index < 0,
	                        values = one ? null : [],
	                        max = one ? index + 1 : options.length,
	                        i = index < 0 ? max : one ? index : 0;

	                    // Loop through all the selected options
	                    for (; i < max; i++) {
	                        option = options[i];

	                        // oldIE doesn't update selected after form reset (#2551)
	                        if ((option.selected || i === index) && (

	                        // Don't return options that are disabled or in a disabled optgroup
	                        support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

	                            // Get the specific value for the option
	                            value = jQuery(option).val();

	                            // We don't need an array for one selects
	                            if (one) {
	                                return value;
	                            }

	                            // Multi-Selects return an array
	                            values.push(value);
	                        }
	                    }

	                    return values;
	                },

	                set: function set(elem, value) {
	                    var optionSet,
	                        option,
	                        options = elem.options,
	                        values = jQuery.makeArray(value),
	                        i = options.length;

	                    while (i--) {
	                        option = options[i];

	                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {

	                            // Support: IE6
	                            // When new option element is added to select box we need to
	                            // force reflow of newly added node in order to workaround delay
	                            // of initialization properties
	                            try {
	                                option.selected = optionSet = true;
	                            } catch (_) {

	                                // Will be executed only in IE6
	                                option.scrollHeight;
	                            }
	                        } else {
	                            option.selected = false;
	                        }
	                    }

	                    // Force browsers to behave consistently when non-matching value is set
	                    if (!optionSet) {
	                        elem.selectedIndex = -1;
	                    }

	                    return options;
	                }
	            }
	        }
	    });

	    // Radios and checkboxes getter/setter
	    jQuery.each(["radio", "checkbox"], function () {
	        jQuery.valHooks[this] = {
	            set: function set(elem, value) {
	                if (jQuery.isArray(value)) {
	                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
	                }
	            }
	        };
	        if (!support.checkOn) {
	            jQuery.valHooks[this].get = function (elem) {
	                return elem.getAttribute("value") === null ? "on" : elem.value;
	            };
	        }
	    });

	    var nodeHook,
	        boolHook,
	        attrHandle = jQuery.expr.attrHandle,
	        ruseDefault = /^(?:checked|selected)$/i,
	        getSetAttribute = support.getSetAttribute,
	        getSetInput = support.input;

	    jQuery.fn.extend({
	        attr: function attr(name, value) {
	            return access(this, jQuery.attr, name, value, arguments.length > 1);
	        },

	        removeAttr: function removeAttr(name) {
	            return this.each(function () {
	                jQuery.removeAttr(this, name);
	            });
	        }
	    });

	    jQuery.extend({
	        attr: function attr(elem, name, value) {
	            var ret,
	                hooks,
	                nType = elem.nodeType;

	            // Don't get/set attributes on text, comment and attribute nodes
	            if (nType === 3 || nType === 8 || nType === 2) {
	                return;
	            }

	            // Fallback to prop when attributes are not supported
	            if (typeof elem.getAttribute === "undefined") {
	                return jQuery.prop(elem, name, value);
	            }

	            // All attributes are lowercase
	            // Grab necessary hook if one is defined
	            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	                name = name.toLowerCase();
	                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
	            }

	            if (value !== undefined) {
	                if (value === null) {
	                    jQuery.removeAttr(elem, name);
	                    return;
	                }

	                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	                    return ret;
	                }

	                elem.setAttribute(name, value + "");
	                return value;
	            }

	            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	                return ret;
	            }

	            ret = jQuery.find.attr(elem, name);

	            // Non-existent attributes return null, we normalize to undefined
	            return ret == null ? undefined : ret;
	        },

	        attrHooks: {
	            type: {
	                set: function set(elem, value) {
	                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {

	                        // Setting the type on a radio button after the value resets the value in IE8-9
	                        // Reset value to default in case type is set after value during creation
	                        var val = elem.value;
	                        elem.setAttribute("type", value);
	                        if (val) {
	                            elem.value = val;
	                        }
	                        return value;
	                    }
	                }
	            }
	        },

	        removeAttr: function removeAttr(elem, value) {
	            var name,
	                propName,
	                i = 0,
	                attrNames = value && value.match(rnotwhite);

	            if (attrNames && elem.nodeType === 1) {
	                while (name = attrNames[i++]) {
	                    propName = jQuery.propFix[name] || name;

	                    // Boolean attributes get special treatment (#10870)
	                    if (jQuery.expr.match.bool.test(name)) {

	                        // Set corresponding property to false
	                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
	                            elem[propName] = false;

	                            // Support: IE<9
	                            // Also clear defaultChecked/defaultSelected (if appropriate)
	                        } else {
	                            elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
	                        }

	                        // See #9699 for explanation of this approach (setting first, then removal)
	                    } else {
	                        jQuery.attr(elem, name, "");
	                    }

	                    elem.removeAttribute(getSetAttribute ? name : propName);
	                }
	            }
	        }
	    });

	    // Hooks for boolean attributes
	    boolHook = {
	        set: function set(elem, value, name) {
	            if (value === false) {

	                // Remove boolean attributes when set to false
	                jQuery.removeAttr(elem, name);
	            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {

	                // IE<8 needs the *property* name
	                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
	            } else {

	                // Support: IE<9
	                // Use defaultChecked and defaultSelected for oldIE
	                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
	            }
	            return name;
	        }
	    };

	    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
	        var getter = attrHandle[name] || jQuery.find.attr;

	        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
	            attrHandle[name] = function (elem, name, isXML) {
	                var ret, handle;
	                if (!isXML) {

	                    // Avoid an infinite loop by temporarily removing this function from the getter
	                    handle = attrHandle[name];
	                    attrHandle[name] = ret;
	                    ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
	                    attrHandle[name] = handle;
	                }
	                return ret;
	            };
	        } else {
	            attrHandle[name] = function (elem, name, isXML) {
	                if (!isXML) {
	                    return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
	                }
	            };
	        }
	    });

	    // fix oldIE attroperties
	    if (!getSetInput || !getSetAttribute) {
	        jQuery.attrHooks.value = {
	            set: function set(elem, value, name) {
	                if (jQuery.nodeName(elem, "input")) {

	                    // Does not return so that setAttribute is also used
	                    elem.defaultValue = value;
	                } else {

	                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
	                    return nodeHook && nodeHook.set(elem, value, name);
	                }
	            }
	        };
	    }

	    // IE6/7 do not support getting/setting some attributes with get/setAttribute
	    if (!getSetAttribute) {

	        // Use this for any attribute in IE6/7
	        // This fixes almost every IE6/7 issue
	        nodeHook = {
	            set: function set(elem, value, name) {

	                // Set the existing or create a new attribute node
	                var ret = elem.getAttributeNode(name);
	                if (!ret) {
	                    elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
	                }

	                ret.value = value += "";

	                // Break association with cloned elements by also using setAttribute (#9646)
	                if (name === "value" || value === elem.getAttribute(name)) {
	                    return value;
	                }
	            }
	        };

	        // Some attributes are constructed with empty-string values when not defined
	        attrHandle.id = attrHandle.name = attrHandle.coords = function (elem, name, isXML) {
	            var ret;
	            if (!isXML) {
	                return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null;
	            }
	        };

	        // Fixing value retrieval on a button requires this module
	        jQuery.valHooks.button = {
	            get: function get(elem, name) {
	                var ret = elem.getAttributeNode(name);
	                if (ret && ret.specified) {
	                    return ret.value;
	                }
	            },
	            set: nodeHook.set
	        };

	        // Set contenteditable to false on removals(#10429)
	        // Setting to empty string throws an error as an invalid value
	        jQuery.attrHooks.contenteditable = {
	            set: function set(elem, value, name) {
	                nodeHook.set(elem, value === "" ? false : value, name);
	            }
	        };

	        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
	        // This is for removals
	        jQuery.each(["width", "height"], function (i, name) {
	            jQuery.attrHooks[name] = {
	                set: function set(elem, value) {
	                    if (value === "") {
	                        elem.setAttribute(name, "auto");
	                        return value;
	                    }
	                }
	            };
	        });
	    }

	    if (!support.style) {
	        jQuery.attrHooks.style = {
	            get: function get(elem) {

	                // Return undefined in the case of empty string
	                // Note: IE uppercases css property names, but if we were to .toLowerCase()
	                // .cssText, that would destroy case sensitivity in URL's, like in "background"
	                return elem.style.cssText || undefined;
	            },
	            set: function set(elem, value) {
	                return elem.style.cssText = value + "";
	            }
	        };
	    }

	    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	        rclickable = /^(?:a|area)$/i;

	    jQuery.fn.extend({
	        prop: function prop(name, value) {
	            return access(this, jQuery.prop, name, value, arguments.length > 1);
	        },

	        removeProp: function removeProp(name) {
	            name = jQuery.propFix[name] || name;
	            return this.each(function () {

	                // try/catch handles cases where IE balks (such as removing a property on window)
	                try {
	                    this[name] = undefined;
	                    delete this[name];
	                } catch (e) {}
	            });
	        }
	    });

	    jQuery.extend({
	        prop: function prop(elem, name, value) {
	            var ret,
	                hooks,
	                nType = elem.nodeType;

	            // Don't get/set properties on text, comment and attribute nodes
	            if (nType === 3 || nType === 8 || nType === 2) {
	                return;
	            }

	            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

	                // Fix name and attach hooks
	                name = jQuery.propFix[name] || name;
	                hooks = jQuery.propHooks[name];
	            }

	            if (value !== undefined) {
	                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	                    return ret;
	                }

	                return elem[name] = value;
	            }

	            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	                return ret;
	            }

	            return elem[name];
	        },

	        propHooks: {
	            tabIndex: {
	                get: function get(elem) {

	                    // elem.tabIndex doesn't always return the
	                    // correct value when it hasn't been explicitly set
	                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
	                    // Use proper attribute retrieval(#12072)
	                    var tabindex = jQuery.find.attr(elem, "tabindex");

	                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
	                }
	            }
	        },

	        propFix: {
	            "for": "htmlFor",
	            "class": "className"
	        }
	    });

	    // Some attributes require a special call on IE
	    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	    if (!support.hrefNormalized) {

	        // href/src property should get the full normalized URL (#10299/#12915)
	        jQuery.each(["href", "src"], function (i, name) {
	            jQuery.propHooks[name] = {
	                get: function get(elem) {
	                    return elem.getAttribute(name, 4);
	                }
	            };
	        });
	    }

	    // Support: Safari, IE9+
	    // Accessing the selectedIndex property
	    // forces the browser to respect setting selected
	    // on the option
	    // The getter ensures a default option is selected
	    // when in an optgroup
	    if (!support.optSelected) {
	        jQuery.propHooks.selected = {
	            get: function get(elem) {
	                var parent = elem.parentNode;

	                if (parent) {
	                    parent.selectedIndex;

	                    // Make sure that it also works with optgroups, see #5701
	                    if (parent.parentNode) {
	                        parent.parentNode.selectedIndex;
	                    }
	                }
	                return null;
	            },
	            set: function set(elem) {
	                var parent = elem.parentNode;
	                if (parent) {
	                    parent.selectedIndex;

	                    if (parent.parentNode) {
	                        parent.parentNode.selectedIndex;
	                    }
	                }
	            }
	        };
	    }

	    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	        jQuery.propFix[this.toLowerCase()] = this;
	    });

	    // IE6/7 call enctype encoding
	    if (!support.enctype) {
	        jQuery.propFix.enctype = "encoding";
	    }

	    var rclass = /[\t\r\n\f]/g;

	    function getClass(elem) {
	        return jQuery.attr(elem, "class") || "";
	    }

	    jQuery.fn.extend({
	        addClass: function addClass(value) {
	            var classes,
	                elem,
	                cur,
	                curValue,
	                clazz,
	                j,
	                finalValue,
	                i = 0;

	            if (jQuery.isFunction(value)) {
	                return this.each(function (j) {
	                    jQuery(this).addClass(value.call(this, j, getClass(this)));
	                });
	            }

	            if (typeof value === "string" && value) {
	                classes = value.match(rnotwhite) || [];

	                while (elem = this[i++]) {
	                    curValue = getClass(elem);
	                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

	                    if (cur) {
	                        j = 0;
	                        while (clazz = classes[j++]) {
	                            if (cur.indexOf(" " + clazz + " ") < 0) {
	                                cur += clazz + " ";
	                            }
	                        }

	                        // only assign if different to avoid unneeded rendering.
	                        finalValue = jQuery.trim(cur);
	                        if (curValue !== finalValue) {
	                            jQuery.attr(elem, "class", finalValue);
	                        }
	                    }
	                }
	            }

	            return this;
	        },

	        removeClass: function removeClass(value) {
	            var classes,
	                elem,
	                cur,
	                curValue,
	                clazz,
	                j,
	                finalValue,
	                i = 0;

	            if (jQuery.isFunction(value)) {
	                return this.each(function (j) {
	                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
	                });
	            }

	            if (!arguments.length) {
	                return this.attr("class", "");
	            }

	            if (typeof value === "string" && value) {
	                classes = value.match(rnotwhite) || [];

	                while (elem = this[i++]) {
	                    curValue = getClass(elem);

	                    // This expression is here for better compressibility (see addClass)
	                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

	                    if (cur) {
	                        j = 0;
	                        while (clazz = classes[j++]) {

	                            // Remove *all* instances
	                            while (cur.indexOf(" " + clazz + " ") > -1) {
	                                cur = cur.replace(" " + clazz + " ", " ");
	                            }
	                        }

	                        // Only assign if different to avoid unneeded rendering.
	                        finalValue = jQuery.trim(cur);
	                        if (curValue !== finalValue) {
	                            jQuery.attr(elem, "class", finalValue);
	                        }
	                    }
	                }
	            }

	            return this;
	        },

	        toggleClass: function toggleClass(value, stateVal) {
	            var type = typeof value === "undefined" ? "undefined" : _typeof(value);

	            if (typeof stateVal === "boolean" && type === "string") {
	                return stateVal ? this.addClass(value) : this.removeClass(value);
	            }

	            if (jQuery.isFunction(value)) {
	                return this.each(function (i) {
	                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
	                });
	            }

	            return this.each(function () {
	                var className, i, self, classNames;

	                if (type === "string") {

	                    // Toggle individual class names
	                    i = 0;
	                    self = jQuery(this);
	                    classNames = value.match(rnotwhite) || [];

	                    while (className = classNames[i++]) {

	                        // Check each className given, space separated list
	                        if (self.hasClass(className)) {
	                            self.removeClass(className);
	                        } else {
	                            self.addClass(className);
	                        }
	                    }

	                    // Toggle whole class name
	                } else if (value === undefined || type === "boolean") {
	                    className = getClass(this);
	                    if (className) {

	                        // store className if set
	                        jQuery._data(this, "__className__", className);
	                    }

	                    // If the element has a class name or if we're passed "false",
	                    // then remove the whole classname (if there was one, the above saved it).
	                    // Otherwise bring back whatever was previously saved (if anything),
	                    // falling back to the empty string if nothing was stored.
	                    jQuery.attr(this, "class", className || value === false ? "" : jQuery._data(this, "__className__") || "");
	                }
	            });
	        },

	        hasClass: function hasClass(selector) {
	            var className,
	                elem,
	                i = 0;

	            className = " " + selector + " ";
	            while (elem = this[i++]) {
	                if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
	                    return true;
	                }
	            }

	            return false;
	        }
	    });

	    // Return jQuery for attributes-only inclusion


	    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

	        // Handle event binding
	        jQuery.fn[name] = function (data, fn) {
	            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
	        };
	    });

	    jQuery.fn.extend({
	        hover: function hover(fnOver, fnOut) {
	            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	        }
	    });

	    var location = window.location;

	    var nonce = jQuery.now();

	    var rquery = /\?/;

	    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

	    jQuery.parseJSON = function (data) {

	        // Attempt to parse using the native JSON parser first
	        if (window.JSON && window.JSON.parse) {

	            // Support: Android 2.3
	            // Workaround failure to string-cast null input
	            return window.JSON.parse(data + "");
	        }

	        var requireNonComma,
	            depth = null,
	            str = jQuery.trim(data + "");

	        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	        // after removing valid tokens
	        return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {

	            // Force termination if we see a misplaced comma
	            if (requireNonComma && comma) {
	                depth = 0;
	            }

	            // Perform no more replacements after returning to outermost depth
	            if (depth === 0) {
	                return token;
	            }

	            // Commas must not follow "[", "{", or ","
	            requireNonComma = open || comma;

	            // Determine new depth
	            // array/object open ("[" or "{"): depth += true - false (increment)
	            // array/object close ("]" or "}"): depth += false - true (decrement)
	            // other cases ("," or primitive): depth += true - true (numeric cast)
	            depth += !close - !open;

	            // Remove this token
	            return "";
	        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
	    };

	    // Cross-browser xml parsing
	    jQuery.parseXML = function (data) {
	        var xml, tmp;
	        if (!data || typeof data !== "string") {
	            return null;
	        }
	        try {
	            if (window.DOMParser) {
	                // Standard
	                tmp = new window.DOMParser();
	                xml = tmp.parseFromString(data, "text/xml");
	            } else {
	                // IE
	                xml = new window.ActiveXObject("Microsoft.XMLDOM");
	                xml.async = "false";
	                xml.loadXML(data);
	            }
	        } catch (e) {
	            xml = undefined;
	        }
	        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
	            jQuery.error("Invalid XML: " + data);
	        }
	        return xml;
	    };

	    var rhash = /#.*$/,
	        rts = /([?&])_=[^&]*/,


	    // IE leaves an \r character at EOL
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,


	    // #7653, #8125, #8152: local protocol detection
	    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	        rnoContent = /^(?:GET|HEAD)$/,
	        rprotocol = /^\/\//,
	        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,


	    /* Prefilters
	     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	     * 2) These are called:
	     *    - BEFORE asking for a transport
	     *    - AFTER param serialization (s.data is a string if s.processData is true)
	     * 3) key is the dataType
	     * 4) the catchall symbol "*" can be used
	     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	     */
	    prefilters = {},


	    /* Transports bindings
	     * 1) key is the dataType
	     * 2) the catchall symbol "*" can be used
	     * 3) selection will start with transport dataType and THEN go to "*" if needed
	     */
	    transports = {},


	    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	    allTypes = "*/".concat("*"),


	    // Document location
	    ajaxLocation = location.href,


	    // Segment location into parts
	    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

	    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	    function addToPrefiltersOrTransports(structure) {

	        // dataTypeExpression is optional and defaults to "*"
	        return function (dataTypeExpression, func) {

	            if (typeof dataTypeExpression !== "string") {
	                func = dataTypeExpression;
	                dataTypeExpression = "*";
	            }

	            var dataType,
	                i = 0,
	                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

	            if (jQuery.isFunction(func)) {

	                // For each dataType in the dataTypeExpression
	                while (dataType = dataTypes[i++]) {

	                    // Prepend if requested
	                    if (dataType.charAt(0) === "+") {
	                        dataType = dataType.slice(1) || "*";
	                        (structure[dataType] = structure[dataType] || []).unshift(func);

	                        // Otherwise append
	                    } else {
	                        (structure[dataType] = structure[dataType] || []).push(func);
	                    }
	                }
	            }
	        };
	    }

	    // Base inspection function for prefilters and transports
	    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

	        var inspected = {},
	            seekingTransport = structure === transports;

	        function inspect(dataType) {
	            var selected;
	            inspected[dataType] = true;
	            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
	                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
	                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

	                    options.dataTypes.unshift(dataTypeOrTransport);
	                    inspect(dataTypeOrTransport);
	                    return false;
	                } else if (seekingTransport) {
	                    return !(selected = dataTypeOrTransport);
	                }
	            });
	            return selected;
	        }

	        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	    }

	    // A special extend for ajax options
	    // that takes "flat" options (not to be deep extended)
	    // Fixes #9887
	    function ajaxExtend(target, src) {
	        var deep,
	            key,
	            flatOptions = jQuery.ajaxSettings.flatOptions || {};

	        for (key in src) {
	            if (src[key] !== undefined) {
	                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
	            }
	        }
	        if (deep) {
	            jQuery.extend(true, target, deep);
	        }

	        return target;
	    }

	    /* Handles responses to an ajax request:
	     * - finds the right dataType (mediates between content-type and expected dataType)
	     * - returns the corresponding response
	     */
	    function ajaxHandleResponses(s, jqXHR, responses) {
	        var firstDataType,
	            ct,
	            finalDataType,
	            type,
	            contents = s.contents,
	            dataTypes = s.dataTypes;

	        // Remove auto dataType and get content-type in the process
	        while (dataTypes[0] === "*") {
	            dataTypes.shift();
	            if (ct === undefined) {
	                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
	            }
	        }

	        // Check if we're dealing with a known content-type
	        if (ct) {
	            for (type in contents) {
	                if (contents[type] && contents[type].test(ct)) {
	                    dataTypes.unshift(type);
	                    break;
	                }
	            }
	        }

	        // Check to see if we have a response for the expected dataType
	        if (dataTypes[0] in responses) {
	            finalDataType = dataTypes[0];
	        } else {

	            // Try convertible dataTypes
	            for (type in responses) {
	                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
	                    finalDataType = type;
	                    break;
	                }
	                if (!firstDataType) {
	                    firstDataType = type;
	                }
	            }

	            // Or just use first one
	            finalDataType = finalDataType || firstDataType;
	        }

	        // If we found a dataType
	        // We add the dataType to the list if needed
	        // and return the corresponding response
	        if (finalDataType) {
	            if (finalDataType !== dataTypes[0]) {
	                dataTypes.unshift(finalDataType);
	            }
	            return responses[finalDataType];
	        }
	    }

	    /* Chain conversions given the request and the original response
	     * Also sets the responseXXX fields on the jqXHR instance
	     */
	    function ajaxConvert(s, response, jqXHR, isSuccess) {
	        var conv2,
	            current,
	            conv,
	            tmp,
	            prev,
	            converters = {},


	        // Work with a copy of dataTypes in case we need to modify it for conversion
	        dataTypes = s.dataTypes.slice();

	        // Create converters map with lowercased keys
	        if (dataTypes[1]) {
	            for (conv in s.converters) {
	                converters[conv.toLowerCase()] = s.converters[conv];
	            }
	        }

	        current = dataTypes.shift();

	        // Convert to each sequential dataType
	        while (current) {

	            if (s.responseFields[current]) {
	                jqXHR[s.responseFields[current]] = response;
	            }

	            // Apply the dataFilter if provided
	            if (!prev && isSuccess && s.dataFilter) {
	                response = s.dataFilter(response, s.dataType);
	            }

	            prev = current;
	            current = dataTypes.shift();

	            if (current) {

	                // There's only work to do if current dataType is non-auto
	                if (current === "*") {

	                    current = prev;

	                    // Convert response if prev dataType is non-auto and differs from current
	                } else if (prev !== "*" && prev !== current) {

	                    // Seek a direct converter
	                    conv = converters[prev + " " + current] || converters["* " + current];

	                    // If none found, seek a pair
	                    if (!conv) {
	                        for (conv2 in converters) {

	                            // If conv2 outputs current
	                            tmp = conv2.split(" ");
	                            if (tmp[1] === current) {

	                                // If prev can be converted to accepted input
	                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
	                                if (conv) {

	                                    // Condense equivalence converters
	                                    if (conv === true) {
	                                        conv = converters[conv2];

	                                        // Otherwise, insert the intermediate dataType
	                                    } else if (converters[conv2] !== true) {
	                                        current = tmp[0];
	                                        dataTypes.unshift(tmp[1]);
	                                    }
	                                    break;
	                                }
	                            }
	                        }
	                    }

	                    // Apply converter (if not an equivalence)
	                    if (conv !== true) {

	                        // Unless errors are allowed to bubble, catch and return them
	                        if (conv && s["throws"]) {
	                            // jscs:ignore requireDotNotation
	                            response = conv(response);
	                        } else {
	                            try {
	                                response = conv(response);
	                            } catch (e) {
	                                return {
	                                    state: "parsererror",
	                                    error: conv ? e : "No conversion from " + prev + " to " + current
	                                };
	                            }
	                        }
	                    }
	                }
	            }
	        }

	        return { state: "success", data: response };
	    }

	    jQuery.extend({

	        // Counter for holding the number of active queries
	        active: 0,

	        // Last-Modified header cache for next request
	        lastModified: {},
	        etag: {},

	        ajaxSettings: {
	            url: ajaxLocation,
	            type: "GET",
	            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
	            global: true,
	            processData: true,
	            async: true,
	            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	            /*
	             timeout: 0,
	             data: null,
	             dataType: null,
	             username: null,
	             password: null,
	             cache: null,
	             throws: false,
	             traditional: false,
	             headers: {},
	             */

	            accepts: {
	                "*": allTypes,
	                text: "text/plain",
	                html: "text/html",
	                xml: "application/xml, text/xml",
	                json: "application/json, text/javascript"
	            },

	            contents: {
	                xml: /\bxml\b/,
	                html: /\bhtml/,
	                json: /\bjson\b/
	            },

	            responseFields: {
	                xml: "responseXML",
	                text: "responseText",
	                json: "responseJSON"
	            },

	            // Data converters
	            // Keys separate source (or catchall "*") and destination types with a single space
	            converters: {

	                // Convert anything to text
	                "* text": String,

	                // Text to html (true = no transformation)
	                "text html": true,

	                // Evaluate text as a json expression
	                "text json": jQuery.parseJSON,

	                // Parse text as xml
	                "text xml": jQuery.parseXML
	            },

	            // For options that shouldn't be deep extended:
	            // you can add your own custom options here if
	            // and when you create one that shouldn't be
	            // deep extended (see ajaxExtend)
	            flatOptions: {
	                url: true,
	                context: true
	            }
	        },

	        // Creates a full fledged settings object into target
	        // with both ajaxSettings and settings fields.
	        // If target is omitted, writes into ajaxSettings.
	        ajaxSetup: function ajaxSetup(target, settings) {
	            return settings ?

	            // Building a settings object
	            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

	            // Extending ajaxSettings
	            ajaxExtend(jQuery.ajaxSettings, target);
	        },

	        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	        ajaxTransport: addToPrefiltersOrTransports(transports),

	        // Main method
	        ajax: function ajax(url, options) {

	            // If url is an object, simulate pre-1.5 signature
	            if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
	                options = url;
	                url = undefined;
	            }

	            // Force options to be an object
	            options = options || {};

	            var

	            // Cross-domain detection vars
	            parts,


	            // Loop variable
	            i,


	            // URL without anti-cache param
	            cacheURL,


	            // Response headers as string
	            responseHeadersString,


	            // timeout handle
	            timeoutTimer,


	            // To know if global events are to be dispatched
	            fireGlobals,
	                transport,


	            // Response headers
	            responseHeaders,


	            // Create the final options object
	            s = jQuery.ajaxSetup({}, options),


	            // Callbacks context
	            callbackContext = s.context || s,


	            // Context for global events is callbackContext if it is a DOM node or jQuery collection
	            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


	            // Deferreds
	            deferred = jQuery.Deferred(),
	                completeDeferred = jQuery.Callbacks("once memory"),


	            // Status-dependent callbacks
	            _statusCode = s.statusCode || {},


	            // Headers (they are sent all at once)
	            requestHeaders = {},
	                requestHeadersNames = {},


	            // The jqXHR state
	            state = 0,


	            // Default abort message
	            strAbort = "canceled",


	            // Fake xhr
	            jqXHR = {
	                readyState: 0,

	                // Builds headers hashtable if needed
	                getResponseHeader: function getResponseHeader(key) {
	                    var match;
	                    if (state === 2) {
	                        if (!responseHeaders) {
	                            responseHeaders = {};
	                            while (match = rheaders.exec(responseHeadersString)) {
	                                responseHeaders[match[1].toLowerCase()] = match[2];
	                            }
	                        }
	                        match = responseHeaders[key.toLowerCase()];
	                    }
	                    return match == null ? null : match;
	                },

	                // Raw string
	                getAllResponseHeaders: function getAllResponseHeaders() {
	                    return state === 2 ? responseHeadersString : null;
	                },

	                // Caches the header
	                setRequestHeader: function setRequestHeader(name, value) {
	                    var lname = name.toLowerCase();
	                    if (!state) {
	                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
	                        requestHeaders[name] = value;
	                    }
	                    return this;
	                },

	                // Overrides response content-type header
	                overrideMimeType: function overrideMimeType(type) {
	                    if (!state) {
	                        s.mimeType = type;
	                    }
	                    return this;
	                },

	                // Status-dependent callbacks
	                statusCode: function statusCode(map) {
	                    var code;
	                    if (map) {
	                        if (state < 2) {
	                            for (code in map) {

	                                // Lazy-add the new callback in a way that preserves old ones
	                                _statusCode[code] = [_statusCode[code], map[code]];
	                            }
	                        } else {

	                            // Execute the appropriate callbacks
	                            jqXHR.always(map[jqXHR.status]);
	                        }
	                    }
	                    return this;
	                },

	                // Cancel the request
	                abort: function abort(statusText) {
	                    var finalText = statusText || strAbort;
	                    if (transport) {
	                        transport.abort(finalText);
	                    }
	                    done(0, finalText);
	                    return this;
	                }
	            };

	            // Attach deferreds
	            deferred.promise(jqXHR).complete = completeDeferred.add;
	            jqXHR.success = jqXHR.done;
	            jqXHR.error = jqXHR.fail;

	            // Remove hash character (#7531: and string promotion)
	            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
	            // Handle falsy url in the settings object (#10093: consistency with old signature)
	            // We also use the url parameter if available
	            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

	            // Alias method option to type as per ticket #12004
	            s.type = options.method || options.type || s.method || s.type;

	            // Extract dataTypes list
	            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

	            // A cross-domain request is in order when we have a protocol:host:port mismatch
	            if (s.crossDomain == null) {
	                parts = rurl.exec(s.url.toLowerCase());
	                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
	            }

	            // Convert data if not already a string
	            if (s.data && s.processData && typeof s.data !== "string") {
	                s.data = jQuery.param(s.data, s.traditional);
	            }

	            // Apply prefilters
	            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

	            // If request was aborted inside a prefilter, stop there
	            if (state === 2) {
	                return jqXHR;
	            }

	            // We can fire global events as of now if asked to
	            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
	            fireGlobals = jQuery.event && s.global;

	            // Watch for a new set of requests
	            if (fireGlobals && jQuery.active++ === 0) {
	                jQuery.event.trigger("ajaxStart");
	            }

	            // Uppercase the type
	            s.type = s.type.toUpperCase();

	            // Determine if request has content
	            s.hasContent = !rnoContent.test(s.type);

	            // Save the URL in case we're toying with the If-Modified-Since
	            // and/or If-None-Match header later on
	            cacheURL = s.url;

	            // More options handling for requests with no content
	            if (!s.hasContent) {

	                // If data is available, append data to url
	                if (s.data) {
	                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

	                    // #9682: remove data so that it's not used in an eventual retry
	                    delete s.data;
	                }

	                // Add anti-cache in url if needed
	                if (s.cache === false) {
	                    s.url = rts.test(cacheURL) ?

	                    // If there is already a '_' parameter, set its value
	                    cacheURL.replace(rts, "$1_=" + nonce++) :

	                    // Otherwise add one to the end
	                    cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
	                }
	            }

	            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	            if (s.ifModified) {
	                if (jQuery.lastModified[cacheURL]) {
	                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
	                }
	                if (jQuery.etag[cacheURL]) {
	                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
	                }
	            }

	            // Set the correct header, if data is being sent
	            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
	                jqXHR.setRequestHeader("Content-Type", s.contentType);
	            }

	            // Set the Accepts header for the server, depending on the dataType
	            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

	            // Check for headers option
	            for (i in s.headers) {
	                jqXHR.setRequestHeader(i, s.headers[i]);
	            }

	            // Allow custom headers/mimetypes and early abort
	            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

	                // Abort if not done already and return
	                return jqXHR.abort();
	            }

	            // aborting is no longer a cancellation
	            strAbort = "abort";

	            // Install callbacks on deferreds
	            for (i in { success: 1, error: 1, complete: 1 }) {
	                jqXHR[i](s[i]);
	            }

	            // Get transport
	            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

	            // If no transport, we auto-abort
	            if (!transport) {
	                done(-1, "No Transport");
	            } else {
	                jqXHR.readyState = 1;

	                // Send global event
	                if (fireGlobals) {
	                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
	                }

	                // If request was aborted inside ajaxSend, stop there
	                if (state === 2) {
	                    return jqXHR;
	                }

	                // Timeout
	                if (s.async && s.timeout > 0) {
	                    timeoutTimer = window.setTimeout(function () {
	                        jqXHR.abort("timeout");
	                    }, s.timeout);
	                }

	                try {
	                    state = 1;
	                    transport.send(requestHeaders, done);
	                } catch (e) {

	                    // Propagate exception as error if not done
	                    if (state < 2) {
	                        done(-1, e);

	                        // Simply rethrow otherwise
	                    } else {
	                        throw e;
	                    }
	                }
	            }

	            // Callback for when everything is done
	            function done(status, nativeStatusText, responses, headers) {
	                var isSuccess,
	                    success,
	                    error,
	                    response,
	                    modified,
	                    statusText = nativeStatusText;

	                // Called once
	                if (state === 2) {
	                    return;
	                }

	                // State is "done" now
	                state = 2;

	                // Clear timeout if it exists
	                if (timeoutTimer) {
	                    window.clearTimeout(timeoutTimer);
	                }

	                // Dereference transport for early garbage collection
	                // (no matter how long the jqXHR object will be used)
	                transport = undefined;

	                // Cache response headers
	                responseHeadersString = headers || "";

	                // Set readyState
	                jqXHR.readyState = status > 0 ? 4 : 0;

	                // Determine if successful
	                isSuccess = status >= 200 && status < 300 || status === 304;

	                // Get response data
	                if (responses) {
	                    response = ajaxHandleResponses(s, jqXHR, responses);
	                }

	                // Convert no matter what (that way responseXXX fields are always set)
	                response = ajaxConvert(s, response, jqXHR, isSuccess);

	                // If successful, handle type chaining
	                if (isSuccess) {

	                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	                    if (s.ifModified) {
	                        modified = jqXHR.getResponseHeader("Last-Modified");
	                        if (modified) {
	                            jQuery.lastModified[cacheURL] = modified;
	                        }
	                        modified = jqXHR.getResponseHeader("etag");
	                        if (modified) {
	                            jQuery.etag[cacheURL] = modified;
	                        }
	                    }

	                    // if no content
	                    if (status === 204 || s.type === "HEAD") {
	                        statusText = "nocontent";

	                        // if not modified
	                    } else if (status === 304) {
	                        statusText = "notmodified";

	                        // If we have data, let's convert it
	                    } else {
	                        statusText = response.state;
	                        success = response.data;
	                        error = response.error;
	                        isSuccess = !error;
	                    }
	                } else {

	                    // We extract error from statusText
	                    // then normalize statusText and status for non-aborts
	                    error = statusText;
	                    if (status || !statusText) {
	                        statusText = "error";
	                        if (status < 0) {
	                            status = 0;
	                        }
	                    }
	                }

	                // Set data for the fake xhr object
	                jqXHR.status = status;
	                jqXHR.statusText = (nativeStatusText || statusText) + "";

	                // Success/Error
	                if (isSuccess) {
	                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
	                } else {
	                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
	                }

	                // Status-dependent callbacks
	                jqXHR.statusCode(_statusCode);
	                _statusCode = undefined;

	                if (fireGlobals) {
	                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
	                }

	                // Complete
	                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

	                if (fireGlobals) {
	                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

	                    // Handle the global AJAX counter
	                    if (! --jQuery.active) {
	                        jQuery.event.trigger("ajaxStop");
	                    }
	                }
	            }

	            return jqXHR;
	        },

	        getJSON: function getJSON(url, data, callback) {
	            return jQuery.get(url, data, callback, "json");
	        },

	        getScript: function getScript(url, callback) {
	            return jQuery.get(url, undefined, callback, "script");
	        }
	    });

	    jQuery.each(["get", "post"], function (i, method) {
	        jQuery[method] = function (url, data, callback, type) {

	            // shift arguments if data argument was omitted
	            if (jQuery.isFunction(data)) {
	                type = type || callback;
	                callback = data;
	                data = undefined;
	            }

	            // The url can be an options object (which then must have .url)
	            return jQuery.ajax(jQuery.extend({
	                url: url,
	                type: method,
	                dataType: type,
	                data: data,
	                success: callback
	            }, jQuery.isPlainObject(url) && url));
	        };
	    });

	    jQuery._evalUrl = function (url) {
	        return jQuery.ajax({
	            url: url,

	            // Make this explicit, since user can override this through ajaxSetup (#11264)
	            type: "GET",
	            dataType: "script",
	            cache: true,
	            async: false,
	            global: false,
	            "throws": true
	        });
	    };

	    jQuery.fn.extend({
	        wrapAll: function wrapAll(html) {
	            if (jQuery.isFunction(html)) {
	                return this.each(function (i) {
	                    jQuery(this).wrapAll(html.call(this, i));
	                });
	            }

	            if (this[0]) {

	                // The elements to wrap the target around
	                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

	                if (this[0].parentNode) {
	                    wrap.insertBefore(this[0]);
	                }

	                wrap.map(function () {
	                    var elem = this;

	                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
	                        elem = elem.firstChild;
	                    }

	                    return elem;
	                }).append(this);
	            }

	            return this;
	        },

	        wrapInner: function wrapInner(html) {
	            if (jQuery.isFunction(html)) {
	                return this.each(function (i) {
	                    jQuery(this).wrapInner(html.call(this, i));
	                });
	            }

	            return this.each(function () {
	                var self = jQuery(this),
	                    contents = self.contents();

	                if (contents.length) {
	                    contents.wrapAll(html);
	                } else {
	                    self.append(html);
	                }
	            });
	        },

	        wrap: function wrap(html) {
	            var isFunction = jQuery.isFunction(html);

	            return this.each(function (i) {
	                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
	            });
	        },

	        unwrap: function unwrap() {
	            return this.parent().each(function () {
	                if (!jQuery.nodeName(this, "body")) {
	                    jQuery(this).replaceWith(this.childNodes);
	                }
	            }).end();
	        }
	    });

	    function getDisplay(elem) {
	        return elem.style && elem.style.display || jQuery.css(elem, "display");
	    }

	    function filterHidden(elem) {
	        while (elem && elem.nodeType === 1) {
	            if (getDisplay(elem) === "none" || elem.type === "hidden") {
	                return true;
	            }
	            elem = elem.parentNode;
	        }
	        return false;
	    }

	    jQuery.expr.filters.hidden = function (elem) {

	        // Support: Opera <= 12.12
	        // Opera reports offsetWidths and offsetHeights less than zero on some elements
	        return support.reliableHiddenOffsets() ? elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && !elem.getClientRects().length : filterHidden(elem);
	    };

	    jQuery.expr.filters.visible = function (elem) {
	        return !jQuery.expr.filters.hidden(elem);
	    };

	    var r20 = /%20/g,
	        rbracket = /\[\]$/,
	        rCRLF = /\r?\n/g,
	        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	        rsubmittable = /^(?:input|select|textarea|keygen)/i;

	    function buildParams(prefix, obj, traditional, add) {
	        var name;

	        if (jQuery.isArray(obj)) {

	            // Serialize array item.
	            jQuery.each(obj, function (i, v) {
	                if (traditional || rbracket.test(prefix)) {

	                    // Treat each array item as a scalar.
	                    add(prefix, v);
	                } else {

	                    // Item is non-scalar (array or object), encode its numeric index.
	                    buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
	                }
	            });
	        } else if (!traditional && jQuery.type(obj) === "object") {

	            // Serialize object item.
	            for (name in obj) {
	                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
	            }
	        } else {

	            // Serialize scalar item.
	            add(prefix, obj);
	        }
	    }

	    // Serialize an array of form elements or a set of
	    // key/values into a query string
	    jQuery.param = function (a, traditional) {
	        var prefix,
	            s = [],
	            add = function add(key, value) {

	            // If value is a function, invoke it and return its value
	            value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
	            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	        };

	        // Set traditional to true for jQuery <= 1.3.2 behavior.
	        if (traditional === undefined) {
	            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	        }

	        // If an array was passed in, assume that it is an array of form elements.
	        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

	            // Serialize the form elements
	            jQuery.each(a, function () {
	                add(this.name, this.value);
	            });
	        } else {

	            // If traditional, encode the "old" way (the way 1.3.2 or older
	            // did it), otherwise encode params recursively.
	            for (prefix in a) {
	                buildParams(prefix, a[prefix], traditional, add);
	            }
	        }

	        // Return the resulting serialization
	        return s.join("&").replace(r20, "+");
	    };

	    jQuery.fn.extend({
	        serialize: function serialize() {
	            return jQuery.param(this.serializeArray());
	        },
	        serializeArray: function serializeArray() {
	            return this.map(function () {

	                // Can add propHook for "elements" to filter or add form elements
	                var elements = jQuery.prop(this, "elements");
	                return elements ? jQuery.makeArray(elements) : this;
	            }).filter(function () {
	                var type = this.type;

	                // Use .is(":disabled") so that fieldset[disabled] works
	                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
	            }).map(function (i, elem) {
	                var val = jQuery(this).val();

	                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
	                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
	                }) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
	            }).get();
	        }
	    });

	    // Create the request object
	    // (This is still attached to ajaxSettings for backward compatibility)
	    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	    // Support: IE6-IE8
	    function () {

	        // XHR cannot access local files, always use ActiveX for that case
	        if (this.isLocal) {
	            return createActiveXHR();
	        }

	        // Support: IE 9-11
	        // IE seems to error on cross-domain PATCH requests when ActiveX XHR
	        // is used. In IE 9+ always use the native XHR.
	        // Note: this condition won't catch Edge as it doesn't define
	        // document.documentMode but it also doesn't support ActiveX so it won't
	        // reach this code.
	        if (document.documentMode > 8) {
	            return createStandardXHR();
	        }

	        // Support: IE<9
	        // oldIE XHR does not support non-RFC2616 methods (#13240)
	        // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
	        // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
	        // Although this check for six methods instead of eight
	        // since IE also does not support "trace" and "connect"
	        return (/^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR()
	        );
	    } :

	    // For all other browsers, use the standard XMLHttpRequest object
	    createStandardXHR;

	    var xhrId = 0,
	        xhrCallbacks = {},
	        xhrSupported = jQuery.ajaxSettings.xhr();

	    // Support: IE<10
	    // Open requests must be manually aborted on unload (#5280)
	    // See https://support.microsoft.com/kb/2856746 for more info
	    if (window.attachEvent) {
	        window.attachEvent("onunload", function () {
	            for (var key in xhrCallbacks) {
	                xhrCallbacks[key](undefined, true);
	            }
	        });
	    }

	    // Determine support properties
	    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	    xhrSupported = support.ajax = !!xhrSupported;

	    // Create transport if the browser can provide an xhr
	    if (xhrSupported) {

	        jQuery.ajaxTransport(function (options) {

	            // Cross domain only allowed if supported through XMLHttpRequest
	            if (!options.crossDomain || support.cors) {

	                var _callback;

	                return {
	                    send: function send(headers, complete) {
	                        var i,
	                            xhr = options.xhr(),
	                            id = ++xhrId;

	                        // Open the socket
	                        xhr.open(options.type, options.url, options.async, options.username, options.password);

	                        // Apply custom fields if provided
	                        if (options.xhrFields) {
	                            for (i in options.xhrFields) {
	                                xhr[i] = options.xhrFields[i];
	                            }
	                        }

	                        // Override mime type if needed
	                        if (options.mimeType && xhr.overrideMimeType) {
	                            xhr.overrideMimeType(options.mimeType);
	                        }

	                        // X-Requested-With header
	                        // For cross-domain requests, seeing as conditions for a preflight are
	                        // akin to a jigsaw puzzle, we simply never set it to be sure.
	                        // (it can always be set on a per-request basis or even using ajaxSetup)
	                        // For same-domain requests, won't change header if already provided.
	                        if (!options.crossDomain && !headers["X-Requested-With"]) {
	                            headers["X-Requested-With"] = "XMLHttpRequest";
	                        }

	                        // Set headers
	                        for (i in headers) {

	                            // Support: IE<9
	                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
	                            // request header to a null-value.
	                            //
	                            // To keep consistent with other XHR implementations, cast the value
	                            // to string and ignore `undefined`.
	                            if (headers[i] !== undefined) {
	                                xhr.setRequestHeader(i, headers[i] + "");
	                            }
	                        }

	                        // Do send the request
	                        // This may raise an exception which is actually
	                        // handled in jQuery.ajax (so no try/catch here)
	                        xhr.send(options.hasContent && options.data || null);

	                        // Listener
	                        _callback = function callback(_, isAbort) {
	                            var status, statusText, responses;

	                            // Was never called and is aborted or complete
	                            if (_callback && (isAbort || xhr.readyState === 4)) {

	                                // Clean up
	                                delete xhrCallbacks[id];
	                                _callback = undefined;
	                                xhr.onreadystatechange = jQuery.noop;

	                                // Abort manually if needed
	                                if (isAbort) {
	                                    if (xhr.readyState !== 4) {
	                                        xhr.abort();
	                                    }
	                                } else {
	                                    responses = {};
	                                    status = xhr.status;

	                                    // Support: IE<10
	                                    // Accessing binary-data responseText throws an exception
	                                    // (#11426)
	                                    if (typeof xhr.responseText === "string") {
	                                        responses.text = xhr.responseText;
	                                    }

	                                    // Firefox throws an exception when accessing
	                                    // statusText for faulty cross-domain requests
	                                    try {
	                                        statusText = xhr.statusText;
	                                    } catch (e) {

	                                        // We normalize with Webkit giving an empty statusText
	                                        statusText = "";
	                                    }

	                                    // Filter status for non standard behaviors

	                                    // If the request is local and we have data: assume a success
	                                    // (success with no data won't get notified, that's the best we
	                                    // can do given current implementations)
	                                    if (!status && options.isLocal && !options.crossDomain) {
	                                        status = responses.text ? 200 : 404;

	                                        // IE - #1450: sometimes returns 1223 when it should be 204
	                                    } else if (status === 1223) {
	                                        status = 204;
	                                    }
	                                }
	                            }

	                            // Call complete if needed
	                            if (responses) {
	                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
	                            }
	                        };

	                        // Do send the request
	                        // `xhr.send` may raise an exception, but it will be
	                        // handled in jQuery.ajax (so no try/catch here)
	                        if (!options.async) {

	                            // If we're in sync mode we fire the callback
	                            _callback();
	                        } else if (xhr.readyState === 4) {

	                            // (IE6 & IE7) if it's in cache and has been
	                            // retrieved directly we need to fire the callback
	                            window.setTimeout(_callback);
	                        } else {

	                            // Register the callback, but delay it in case `xhr.send` throws
	                            // Add to the list of active xhr callbacks
	                            xhr.onreadystatechange = xhrCallbacks[id] = _callback;
	                        }
	                    },

	                    abort: function abort() {
	                        if (_callback) {
	                            _callback(undefined, true);
	                        }
	                    }
	                };
	            }
	        });
	    }

	    // Functions to create xhrs
	    function createStandardXHR() {
	        try {
	            return new window.XMLHttpRequest();
	        } catch (e) {}
	    }

	    function createActiveXHR() {
	        try {
	            return new window.ActiveXObject("Microsoft.XMLHTTP");
	        } catch (e) {}
	    }

	    // Install script dataType
	    jQuery.ajaxSetup({
	        accepts: {
	            script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
	        },
	        contents: {
	            script: /\b(?:java|ecma)script\b/
	        },
	        converters: {
	            "text script": function textScript(text) {
	                jQuery.globalEval(text);
	                return text;
	            }
	        }
	    });

	    // Handle cache's special case and global
	    jQuery.ajaxPrefilter("script", function (s) {
	        if (s.cache === undefined) {
	            s.cache = false;
	        }
	        if (s.crossDomain) {
	            s.type = "GET";
	            s.global = false;
	        }
	    });

	    // Bind script tag hack transport
	    jQuery.ajaxTransport("script", function (s) {

	        // This transport only deals with cross domain requests
	        if (s.crossDomain) {

	            var script,
	                head = document.head || jQuery("head")[0] || document.documentElement;

	            return {

	                send: function send(_, callback) {

	                    script = document.createElement("script");

	                    script.async = true;

	                    if (s.scriptCharset) {
	                        script.charset = s.scriptCharset;
	                    }

	                    script.src = s.url;

	                    // Attach handlers for all browsers
	                    script.onload = script.onreadystatechange = function (_, isAbort) {

	                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

	                            // Handle memory leak in IE
	                            script.onload = script.onreadystatechange = null;

	                            // Remove the script
	                            if (script.parentNode) {
	                                script.parentNode.removeChild(script);
	                            }

	                            // Dereference the script
	                            script = null;

	                            // Callback if not abort
	                            if (!isAbort) {
	                                callback(200, "success");
	                            }
	                        }
	                    };

	                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
	                    // Use native DOM manipulation to avoid our domManip AJAX trickery
	                    head.insertBefore(script, head.firstChild);
	                },

	                abort: function abort() {
	                    if (script) {
	                        script.onload(undefined, true);
	                    }
	                }
	            };
	        }
	    });

	    var oldCallbacks = [],
	        rjsonp = /(=)\?(?=&|$)|\?\?/;

	    // Default jsonp settings
	    jQuery.ajaxSetup({
	        jsonp: "callback",
	        jsonpCallback: function jsonpCallback() {
	            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
	            this[callback] = true;
	            return callback;
	        }
	    });

	    // Detect, normalize options and install callbacks for jsonp requests
	    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

	        var callbackName,
	            overwritten,
	            responseContainer,
	            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

	        // Handle iff the expected data type is "jsonp" or we have a parameter to set
	        if (jsonProp || s.dataTypes[0] === "jsonp") {

	            // Get callback name, remembering preexisting value associated with it
	            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

	            // Insert callback into url or form data
	            if (jsonProp) {
	                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
	            } else if (s.jsonp !== false) {
	                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
	            }

	            // Use data converter to retrieve json after script execution
	            s.converters["script json"] = function () {
	                if (!responseContainer) {
	                    jQuery.error(callbackName + " was not called");
	                }
	                return responseContainer[0];
	            };

	            // force json dataType
	            s.dataTypes[0] = "json";

	            // Install callback
	            overwritten = window[callbackName];
	            window[callbackName] = function () {
	                responseContainer = arguments;
	            };

	            // Clean-up function (fires after converters)
	            jqXHR.always(function () {

	                // If previous value didn't exist - remove it
	                if (overwritten === undefined) {
	                    jQuery(window).removeProp(callbackName);

	                    // Otherwise restore preexisting value
	                } else {
	                    window[callbackName] = overwritten;
	                }

	                // Save back as free
	                if (s[callbackName]) {

	                    // make sure that re-using the options doesn't screw things around
	                    s.jsonpCallback = originalSettings.jsonpCallback;

	                    // save the callback name for future use
	                    oldCallbacks.push(callbackName);
	                }

	                // Call if it was a function and we have a response
	                if (responseContainer && jQuery.isFunction(overwritten)) {
	                    overwritten(responseContainer[0]);
	                }

	                responseContainer = overwritten = undefined;
	            });

	            // Delegate to script
	            return "script";
	        }
	    });

	    // data: string of html
	    // context (optional): If specified, the fragment will be created in this context,
	    // defaults to document
	    // keepScripts (optional): If true, will include scripts passed in the html string
	    jQuery.parseHTML = function (data, context, keepScripts) {
	        if (!data || typeof data !== "string") {
	            return null;
	        }
	        if (typeof context === "boolean") {
	            keepScripts = context;
	            context = false;
	        }
	        context = context || document;

	        var parsed = rsingleTag.exec(data),
	            scripts = !keepScripts && [];

	        // Single tag
	        if (parsed) {
	            return [context.createElement(parsed[1])];
	        }

	        parsed = buildFragment([data], context, scripts);

	        if (scripts && scripts.length) {
	            jQuery(scripts).remove();
	        }

	        return jQuery.merge([], parsed.childNodes);
	    };

	    // Keep a copy of the old load method
	    var _load = jQuery.fn.load;

	    /**
	     * Load a url into a page
	     */
	    jQuery.fn.load = function (url, params, callback) {
	        if (typeof url !== "string" && _load) {
	            return _load.apply(this, arguments);
	        }

	        var selector,
	            type,
	            response,
	            self = this,
	            off = url.indexOf(" ");

	        if (off > -1) {
	            selector = jQuery.trim(url.slice(off, url.length));
	            url = url.slice(0, off);
	        }

	        // If it's a function
	        if (jQuery.isFunction(params)) {

	            // We assume that it's the callback
	            callback = params;
	            params = undefined;

	            // Otherwise, build a param string
	        } else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
	            type = "POST";
	        }

	        // If we have elements to modify, make the request
	        if (self.length > 0) {
	            jQuery.ajax({
	                url: url,

	                // If "type" variable is undefined, then "GET" method will be used.
	                // Make value of this field explicit since
	                // user can override it through ajaxSetup method
	                type: type || "GET",
	                dataType: "html",
	                data: params
	            }).done(function (responseText) {

	                // Save response for use in complete callback
	                response = arguments;

	                self.html(selector ?

	                // If a selector was specified, locate the right elements in a dummy div
	                // Exclude scripts to avoid IE 'Permission Denied' errors
	                jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

	                // Otherwise use the full result
	                responseText);

	                // If the request succeeds, this function gets "data", "status", "jqXHR"
	                // but they are ignored because response was set above.
	                // If it fails, this function gets "jqXHR", "status", "error"
	            }).always(callback && function (jqXHR, status) {
	                self.each(function () {
	                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
	                });
	            });
	        }

	        return this;
	    };

	    // Attach a bunch of functions for handling common AJAX events
	    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
	        jQuery.fn[type] = function (fn) {
	            return this.on(type, fn);
	        };
	    });

	    jQuery.expr.filters.animated = function (elem) {
	        return jQuery.grep(jQuery.timers, function (fn) {
	            return elem === fn.elem;
	        }).length;
	    };

	    /**
	     * Gets a window from an element
	     */
	    function getWindow(elem) {
	        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	    }

	    jQuery.offset = {
	        setOffset: function setOffset(elem, options, i) {
	            var curPosition,
	                curLeft,
	                curCSSTop,
	                curTop,
	                curOffset,
	                curCSSLeft,
	                calculatePosition,
	                position = jQuery.css(elem, "position"),
	                curElem = jQuery(elem),
	                props = {};

	            // set position first, in-case top/left are set even on static elem
	            if (position === "static") {
	                elem.style.position = "relative";
	            }

	            curOffset = curElem.offset();
	            curCSSTop = jQuery.css(elem, "top");
	            curCSSLeft = jQuery.css(elem, "left");
	            calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;

	            // need to be able to calculate position if either top or left
	            // is auto and position is either absolute or fixed
	            if (calculatePosition) {
	                curPosition = curElem.position();
	                curTop = curPosition.top;
	                curLeft = curPosition.left;
	            } else {
	                curTop = parseFloat(curCSSTop) || 0;
	                curLeft = parseFloat(curCSSLeft) || 0;
	            }

	            if (jQuery.isFunction(options)) {

	                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
	                options = options.call(elem, i, jQuery.extend({}, curOffset));
	            }

	            if (options.top != null) {
	                props.top = options.top - curOffset.top + curTop;
	            }
	            if (options.left != null) {
	                props.left = options.left - curOffset.left + curLeft;
	            }

	            if ("using" in options) {
	                options.using.call(elem, props);
	            } else {
	                curElem.css(props);
	            }
	        }
	    };

	    jQuery.fn.extend({
	        offset: function offset(options) {
	            if (arguments.length) {
	                return options === undefined ? this : this.each(function (i) {
	                    jQuery.offset.setOffset(this, options, i);
	                });
	            }

	            var docElem,
	                win,
	                box = { top: 0, left: 0 },
	                elem = this[0],
	                doc = elem && elem.ownerDocument;

	            if (!doc) {
	                return;
	            }

	            docElem = doc.documentElement;

	            // Make sure it's not a disconnected DOM node
	            if (!jQuery.contains(docElem, elem)) {
	                return box;
	            }

	            // If we don't have gBCR, just use 0,0 rather than error
	            // BlackBerry 5, iOS 3 (original iPhone)
	            if (typeof elem.getBoundingClientRect !== "undefined") {
	                box = elem.getBoundingClientRect();
	            }
	            win = getWindow(doc);
	            return {
	                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
	            };
	        },

	        position: function position() {
	            if (!this[0]) {
	                return;
	            }

	            var offsetParent,
	                offset,
	                parentOffset = { top: 0, left: 0 },
	                elem = this[0];

	            // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
	            // because it is its only offset parent
	            if (jQuery.css(elem, "position") === "fixed") {

	                // we assume that getBoundingClientRect is available when computed position is fixed
	                offset = elem.getBoundingClientRect();
	            } else {

	                // Get *real* offsetParent
	                offsetParent = this.offsetParent();

	                // Get correct offsets
	                offset = this.offset();
	                if (!jQuery.nodeName(offsetParent[0], "html")) {
	                    parentOffset = offsetParent.offset();
	                }

	                // Add offsetParent borders
	                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
	                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
	            }

	            // Subtract parent offsets and element margins
	            // note: when an element has margin: auto the offsetLeft and marginLeft
	            // are the same in Safari causing offset.left to incorrectly be 0
	            return {
	                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
	                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
	            };
	        },

	        offsetParent: function offsetParent() {
	            return this.map(function () {
	                var offsetParent = this.offsetParent;

	                while (offsetParent && !jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static") {
	                    offsetParent = offsetParent.offsetParent;
	                }
	                return offsetParent || documentElement;
	            });
	        }
	    });

	    // Create scrollLeft and scrollTop methods
	    jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
	        var top = /Y/.test(prop);

	        jQuery.fn[method] = function (val) {
	            return access(this, function (elem, method, val) {
	                var win = getWindow(elem);

	                if (val === undefined) {
	                    return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
	                }

	                if (win) {
	                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
	                } else {
	                    elem[method] = val;
	                }
	            }, method, val, arguments.length, null);
	        };
	    });

	    // Support: Safari<7-8+, Chrome<37-44+
	    // Add the top/left cssHooks using jQuery.fn.position
	    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	    // getComputedStyle returns percent when specified for top/left/bottom/right
	    // rather than make the css module depend on the offset module, we just check for it here
	    jQuery.each(["top", "left"], function (i, prop) {
	        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
	            if (computed) {
	                computed = curCSS(elem, prop);

	                // if curCSS returns percentage, fallback to offset
	                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
	            }
	        });
	    });

	    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	    jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
	        jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

	            // margin is only for outerHeight, outerWidth
	            jQuery.fn[funcName] = function (margin, value) {
	                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
	                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

	                return access(this, function (elem, type, value) {
	                    var doc;

	                    if (jQuery.isWindow(elem)) {

	                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
	                        // isn't a whole lot we can do. See pull request at this URL for discussion:
	                        // https://github.com/jquery/jquery/pull/764
	                        return elem.document.documentElement["client" + name];
	                    }

	                    // Get document width or height
	                    if (elem.nodeType === 9) {
	                        doc = elem.documentElement;

	                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
	                        // whichever is greatest
	                        // unfortunately, this causes bug #3838 in IE6/8 only,
	                        // but there is currently no good, small way to fix it.
	                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
	                    }

	                    return value === undefined ?

	                    // Get width or height on the element, requesting but not forcing parseFloat
	                    jQuery.css(elem, type, extra) :

	                    // Set width or height on the element
	                    jQuery.style(elem, type, value, extra);
	                }, type, chainable ? margin : undefined, chainable, null);
	            };
	        });
	    });

	    jQuery.fn.extend({

	        bind: function bind(types, data, fn) {
	            return this.on(types, null, data, fn);
	        },
	        unbind: function unbind(types, fn) {
	            return this.off(types, null, fn);
	        },

	        delegate: function delegate(selector, types, data, fn) {
	            return this.on(types, selector, data, fn);
	        },
	        undelegate: function undelegate(selector, types, fn) {

	            // ( namespace ) or ( selector, types [, fn] )
	            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
	        }
	    });

	    // The number of elements contained in the matched element set
	    jQuery.fn.size = function () {
	        return this.length;
	    };

	    jQuery.fn.andSelf = jQuery.fn.addBack;

	    // Register as a named AMD module, since jQuery can be concatenated with other
	    // files that may use define, but not via a proper concatenation script that
	    // understands anonymous AMD modules. A named AMD is safest and most robust
	    // way to register. Lowercase jquery is used because AMD module names are
	    // derived from file names, and jQuery is normally delivered in a lowercase
	    // file name. Do this after creating the global so that if an AMD module wants
	    // to call noConflict to hide this version of jQuery, it will work.

	    // Note that for maximum portability, libraries that are not jQuery should
	    // declare themselves as anonymous modules, and avoid setting a global if an
	    // AMD loader is present. jQuery is a special case. For more information, see
	    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return jQuery;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }

	    var

	    // Map over jQuery in case of overwrite
	    _jQuery = window.jQuery,


	    // Map over the $ in case of overwrite
	    _$ = window.$;

	    jQuery.noConflict = function (deep) {
	        if (window.$ === jQuery) {
	            window.$ = _$;
	        }

	        if (deep && window.jQuery === jQuery) {
	            window.jQuery = _jQuery;
	        }

	        return jQuery;
	    };

	    // Expose jQuery and $ identifiers, even in
	    // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	    // and CommonJS for browser emulators (#13566)
	    if (!noGlobal) {
	        window.jQuery = window.$ = jQuery;
	    }

	    return jQuery;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(4, function() {
				var newContent = __webpack_require__(4);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "/*!\r\n * Bootstrap v3.3.5 (http://getbootstrap.com)\r\n * Copyright 2011-2015 Twitter, Inc.\r\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\r\n */\r\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\r\nhtml {\r\n  font-family: sans-serif;\r\n  -webkit-text-size-adjust: 100%;\r\n      -ms-text-size-adjust: 100%;\r\n}\r\nbody {\r\n  margin: 0;\r\n}\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmain,\r\nmenu,\r\nnav,\r\nsection,\r\nsummary {\r\n  display: block;\r\n}\r\naudio,\r\ncanvas,\r\nprogress,\r\nvideo {\r\n  display: inline-block;\r\n  vertical-align: baseline;\r\n}\r\naudio:not([controls]) {\r\n  display: none;\r\n  height: 0;\r\n}\r\n[hidden],\r\ntemplate {\r\n  display: none;\r\n}\r\na {\r\n  background-color: transparent;\r\n}\r\na:active,\r\na:hover {\r\n  outline: 0;\r\n}\r\nabbr[title] {\r\n  border-bottom: 1px dotted;\r\n}\r\nb,\r\nstrong {\r\n  font-weight: bold;\r\n}\r\ndfn {\r\n  font-style: italic;\r\n}\r\nh1 {\r\n  margin: .67em 0;\r\n  font-size: 2em;\r\n}\r\nmark {\r\n  color: #000;\r\n  background: #ff0;\r\n}\r\nsmall {\r\n  font-size: 80%;\r\n}\r\nsub,\r\nsup {\r\n  position: relative;\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  vertical-align: baseline;\r\n}\r\nsup {\r\n  top: -.5em;\r\n}\r\nsub {\r\n  bottom: -.25em;\r\n}\r\nimg {\r\n  border: 0;\r\n}\r\nsvg:not(:root) {\r\n  overflow: hidden;\r\n}\r\nfigure {\r\n  margin: 1em 40px;\r\n}\r\nhr {\r\n  height: 0;\r\n  box-sizing: content-box;\r\n}\r\npre {\r\n  overflow: auto;\r\n}\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: monospace, monospace;\r\n  font-size: 1em;\r\n}\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  margin: 0;\r\n  font: inherit;\r\n  color: inherit;\r\n}\r\nbutton {\r\n  overflow: visible;\r\n}\r\nbutton,\r\nselect {\r\n  text-transform: none;\r\n}\r\nbutton,\r\nhtml input[type=\"button\"],\r\ninput[type=\"reset\"],\r\ninput[type=\"submit\"] {\r\n  -webkit-appearance: button;\r\n  cursor: pointer;\r\n}\r\nbutton[disabled],\r\nhtml input[disabled] {\r\n  cursor: default;\r\n}\r\nbutton::-moz-focus-inner,\r\ninput::-moz-focus-inner {\r\n  padding: 0;\r\n  border: 0;\r\n}\r\ninput {\r\n  line-height: normal;\r\n}\r\ninput[type=\"checkbox\"],\r\ninput[type=\"radio\"] {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n}\r\ninput[type=\"number\"]::-webkit-inner-spin-button,\r\ninput[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\ninput[type=\"search\"] {\r\n  box-sizing: content-box;\r\n  -webkit-appearance: textfield;\r\n}\r\ninput[type=\"search\"]::-webkit-search-cancel-button,\r\ninput[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\nfieldset {\r\n  padding: .35em .625em .75em;\r\n  margin: 0 2px;\r\n  border: 1px solid #c0c0c0;\r\n}\r\nlegend {\r\n  padding: 0;\r\n  border: 0;\r\n}\r\ntextarea {\r\n  overflow: auto;\r\n}\r\noptgroup {\r\n  font-weight: bold;\r\n}\r\ntable {\r\n  border-spacing: 0;\r\n  border-collapse: collapse;\r\n}\r\ntd,\r\nth {\r\n  padding: 0;\r\n}\r\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\r\n@media print {\r\n  *,\r\n  *:before,\r\n  *:after {\r\n    color: #000 !important;\r\n    text-shadow: none !important;\r\n    background: transparent !important;\r\n    box-shadow: none !important;\r\n  }\r\n  a,\r\n  a:visited {\r\n    text-decoration: underline;\r\n  }\r\n  a[href]:after {\r\n    content: \" (\" attr(href) \")\";\r\n  }\r\n  abbr[title]:after {\r\n    content: \" (\" attr(title) \")\";\r\n  }\r\n  a[href^=\"#\"]:after,\r\n  a[href^=\"javascript:\"]:after {\r\n    content: \"\";\r\n  }\r\n  pre,\r\n  blockquote {\r\n    border: 1px solid #999;\r\n\r\n    page-break-inside: avoid;\r\n  }\r\n  thead {\r\n    display: table-header-group;\r\n  }\r\n  tr,\r\n  img {\r\n    page-break-inside: avoid;\r\n  }\r\n  img {\r\n    max-width: 100% !important;\r\n  }\r\n  p,\r\n  h2,\r\n  h3 {\r\n    orphans: 3;\r\n    widows: 3;\r\n  }\r\n  h2,\r\n  h3 {\r\n    page-break-after: avoid;\r\n  }\r\n  .navbar {\r\n    display: none;\r\n  }\r\n  .btn > .caret,\r\n  .dropup > .btn > .caret {\r\n    border-top-color: #000 !important;\r\n  }\r\n  .label {\r\n    border: 1px solid #000;\r\n  }\r\n  .table {\r\n    border-collapse: collapse !important;\r\n  }\r\n  .table td,\r\n  .table th {\r\n    background-color: #fff !important;\r\n  }\r\n  .table-bordered th,\r\n  .table-bordered td {\r\n    border: 1px solid #ddd !important;\r\n  }\r\n}\r\n@font-face {\r\n  font-family: 'Glyphicons Halflings';\r\n\r\n  /*src: url('../fonts/glyphicons-halflings-regular.eot');\r\n  src: url('../fonts/glyphicons-halflings-regular.eot') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg') format('svg');*/\r\n}\r\n.glyphicon {\r\n  position: relative;\r\n  top: 1px;\r\n  display: inline-block;\r\n  font-family: 'Glyphicons Halflings';\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.glyphicon-asterisk:before {\r\n  content: \"*\";\r\n}\r\n.glyphicon-plus:before {\r\n  content: \"+\";\r\n}\r\n.glyphicon-euro:before,\r\n.glyphicon-eur:before {\r\n  content: \"\\20AC\";\r\n}\r\n.glyphicon-minus:before {\r\n  content: \"\\2212\";\r\n}\r\n.glyphicon-cloud:before {\r\n  content: \"\\2601\";\r\n}\r\n.glyphicon-envelope:before {\r\n  content: \"\\2709\";\r\n}\r\n.glyphicon-pencil:before {\r\n  content: \"\\270F\";\r\n}\r\n.glyphicon-glass:before {\r\n  content: \"\\E001\";\r\n}\r\n.glyphicon-music:before {\r\n  content: \"\\E002\";\r\n}\r\n.glyphicon-search:before {\r\n  content: \"\\E003\";\r\n}\r\n.glyphicon-heart:before {\r\n  content: \"\\E005\";\r\n}\r\n.glyphicon-star:before {\r\n  content: \"\\E006\";\r\n}\r\n.glyphicon-star-empty:before {\r\n  content: \"\\E007\";\r\n}\r\n.glyphicon-user:before {\r\n  content: \"\\E008\";\r\n}\r\n.glyphicon-film:before {\r\n  content: \"\\E009\";\r\n}\r\n.glyphicon-th-large:before {\r\n  content: \"\\E010\";\r\n}\r\n.glyphicon-th:before {\r\n  content: \"\\E011\";\r\n}\r\n.glyphicon-th-list:before {\r\n  content: \"\\E012\";\r\n}\r\n.glyphicon-ok:before {\r\n  content: \"\\E013\";\r\n}\r\n.glyphicon-remove:before {\r\n  content: \"\\E014\";\r\n}\r\n.glyphicon-zoom-in:before {\r\n  content: \"\\E015\";\r\n}\r\n.glyphicon-zoom-out:before {\r\n  content: \"\\E016\";\r\n}\r\n.glyphicon-off:before {\r\n  content: \"\\E017\";\r\n}\r\n.glyphicon-signal:before {\r\n  content: \"\\E018\";\r\n}\r\n.glyphicon-cog:before {\r\n  content: \"\\E019\";\r\n}\r\n.glyphicon-trash:before {\r\n  content: \"\\E020\";\r\n}\r\n.glyphicon-home:before {\r\n  content: \"\\E021\";\r\n}\r\n.glyphicon-file:before {\r\n  content: \"\\E022\";\r\n}\r\n.glyphicon-time:before {\r\n  content: \"\\E023\";\r\n}\r\n.glyphicon-road:before {\r\n  content: \"\\E024\";\r\n}\r\n.glyphicon-download-alt:before {\r\n  content: \"\\E025\";\r\n}\r\n.glyphicon-download:before {\r\n  content: \"\\E026\";\r\n}\r\n.glyphicon-upload:before {\r\n  content: \"\\E027\";\r\n}\r\n.glyphicon-inbox:before {\r\n  content: \"\\E028\";\r\n}\r\n.glyphicon-play-circle:before {\r\n  content: \"\\E029\";\r\n}\r\n.glyphicon-repeat:before {\r\n  content: \"\\E030\";\r\n}\r\n.glyphicon-refresh:before {\r\n  content: \"\\E031\";\r\n}\r\n.glyphicon-list-alt:before {\r\n  content: \"\\E032\";\r\n}\r\n.glyphicon-lock:before {\r\n  content: \"\\E033\";\r\n}\r\n.glyphicon-flag:before {\r\n  content: \"\\E034\";\r\n}\r\n.glyphicon-headphones:before {\r\n  content: \"\\E035\";\r\n}\r\n.glyphicon-volume-off:before {\r\n  content: \"\\E036\";\r\n}\r\n.glyphicon-volume-down:before {\r\n  content: \"\\E037\";\r\n}\r\n.glyphicon-volume-up:before {\r\n  content: \"\\E038\";\r\n}\r\n.glyphicon-qrcode:before {\r\n  content: \"\\E039\";\r\n}\r\n.glyphicon-barcode:before {\r\n  content: \"\\E040\";\r\n}\r\n.glyphicon-tag:before {\r\n  content: \"\\E041\";\r\n}\r\n.glyphicon-tags:before {\r\n  content: \"\\E042\";\r\n}\r\n.glyphicon-book:before {\r\n  content: \"\\E043\";\r\n}\r\n.glyphicon-bookmark:before {\r\n  content: \"\\E044\";\r\n}\r\n.glyphicon-print:before {\r\n  content: \"\\E045\";\r\n}\r\n.glyphicon-camera:before {\r\n  content: \"\\E046\";\r\n}\r\n.glyphicon-font:before {\r\n  content: \"\\E047\";\r\n}\r\n.glyphicon-bold:before {\r\n  content: \"\\E048\";\r\n}\r\n.glyphicon-italic:before {\r\n  content: \"\\E049\";\r\n}\r\n.glyphicon-text-height:before {\r\n  content: \"\\E050\";\r\n}\r\n.glyphicon-text-width:before {\r\n  content: \"\\E051\";\r\n}\r\n.glyphicon-align-left:before {\r\n  content: \"\\E052\";\r\n}\r\n.glyphicon-align-center:before {\r\n  content: \"\\E053\";\r\n}\r\n.glyphicon-align-right:before {\r\n  content: \"\\E054\";\r\n}\r\n.glyphicon-align-justify:before {\r\n  content: \"\\E055\";\r\n}\r\n.glyphicon-list:before {\r\n  content: \"\\E056\";\r\n}\r\n.glyphicon-indent-left:before {\r\n  content: \"\\E057\";\r\n}\r\n.glyphicon-indent-right:before {\r\n  content: \"\\E058\";\r\n}\r\n.glyphicon-facetime-video:before {\r\n  content: \"\\E059\";\r\n}\r\n.glyphicon-picture:before {\r\n  content: \"\\E060\";\r\n}\r\n.glyphicon-map-marker:before {\r\n  content: \"\\E062\";\r\n}\r\n.glyphicon-adjust:before {\r\n  content: \"\\E063\";\r\n}\r\n.glyphicon-tint:before {\r\n  content: \"\\E064\";\r\n}\r\n.glyphicon-edit:before {\r\n  content: \"\\E065\";\r\n}\r\n.glyphicon-share:before {\r\n  content: \"\\E066\";\r\n}\r\n.glyphicon-check:before {\r\n  content: \"\\E067\";\r\n}\r\n.glyphicon-move:before {\r\n  content: \"\\E068\";\r\n}\r\n.glyphicon-step-backward:before {\r\n  content: \"\\E069\";\r\n}\r\n.glyphicon-fast-backward:before {\r\n  content: \"\\E070\";\r\n}\r\n.glyphicon-backward:before {\r\n  content: \"\\E071\";\r\n}\r\n.glyphicon-play:before {\r\n  content: \"\\E072\";\r\n}\r\n.glyphicon-pause:before {\r\n  content: \"\\E073\";\r\n}\r\n.glyphicon-stop:before {\r\n  content: \"\\E074\";\r\n}\r\n.glyphicon-forward:before {\r\n  content: \"\\E075\";\r\n}\r\n.glyphicon-fast-forward:before {\r\n  content: \"\\E076\";\r\n}\r\n.glyphicon-step-forward:before {\r\n  content: \"\\E077\";\r\n}\r\n.glyphicon-eject:before {\r\n  content: \"\\E078\";\r\n}\r\n.glyphicon-chevron-left:before {\r\n  content: \"\\E079\";\r\n}\r\n.glyphicon-chevron-right:before {\r\n  content: \"\\E080\";\r\n}\r\n.glyphicon-plus-sign:before {\r\n  content: \"\\E081\";\r\n}\r\n.glyphicon-minus-sign:before {\r\n  content: \"\\E082\";\r\n}\r\n.glyphicon-remove-sign:before {\r\n  content: \"\\E083\";\r\n}\r\n.glyphicon-ok-sign:before {\r\n  content: \"\\E084\";\r\n}\r\n.glyphicon-question-sign:before {\r\n  content: \"\\E085\";\r\n}\r\n.glyphicon-info-sign:before {\r\n  content: \"\\E086\";\r\n}\r\n.glyphicon-screenshot:before {\r\n  content: \"\\E087\";\r\n}\r\n.glyphicon-remove-circle:before {\r\n  content: \"\\E088\";\r\n}\r\n.glyphicon-ok-circle:before {\r\n  content: \"\\E089\";\r\n}\r\n.glyphicon-ban-circle:before {\r\n  content: \"\\E090\";\r\n}\r\n.glyphicon-arrow-left:before {\r\n  content: \"\\E091\";\r\n}\r\n.glyphicon-arrow-right:before {\r\n  content: \"\\E092\";\r\n}\r\n.glyphicon-arrow-up:before {\r\n  content: \"\\E093\";\r\n}\r\n.glyphicon-arrow-down:before {\r\n  content: \"\\E094\";\r\n}\r\n.glyphicon-share-alt:before {\r\n  content: \"\\E095\";\r\n}\r\n.glyphicon-resize-full:before {\r\n  content: \"\\E096\";\r\n}\r\n.glyphicon-resize-small:before {\r\n  content: \"\\E097\";\r\n}\r\n.glyphicon-exclamation-sign:before {\r\n  content: \"\\E101\";\r\n}\r\n.glyphicon-gift:before {\r\n  content: \"\\E102\";\r\n}\r\n.glyphicon-leaf:before {\r\n  content: \"\\E103\";\r\n}\r\n.glyphicon-fire:before {\r\n  content: \"\\E104\";\r\n}\r\n.glyphicon-eye-open:before {\r\n  content: \"\\E105\";\r\n}\r\n.glyphicon-eye-close:before {\r\n  content: \"\\E106\";\r\n}\r\n.glyphicon-warning-sign:before {\r\n  content: \"\\E107\";\r\n}\r\n.glyphicon-plane:before {\r\n  content: \"\\E108\";\r\n}\r\n.glyphicon-calendar:before {\r\n  content: \"\\E109\";\r\n}\r\n.glyphicon-random:before {\r\n  content: \"\\E110\";\r\n}\r\n.glyphicon-comment:before {\r\n  content: \"\\E111\";\r\n}\r\n.glyphicon-magnet:before {\r\n  content: \"\\E112\";\r\n}\r\n.glyphicon-chevron-up:before {\r\n  content: \"\\E113\";\r\n}\r\n.glyphicon-chevron-down:before {\r\n  content: \"\\E114\";\r\n}\r\n.glyphicon-retweet:before {\r\n  content: \"\\E115\";\r\n}\r\n.glyphicon-shopping-cart:before {\r\n  content: \"\\E116\";\r\n}\r\n.glyphicon-folder-close:before {\r\n  content: \"\\E117\";\r\n}\r\n.glyphicon-folder-open:before {\r\n  content: \"\\E118\";\r\n}\r\n.glyphicon-resize-vertical:before {\r\n  content: \"\\E119\";\r\n}\r\n.glyphicon-resize-horizontal:before {\r\n  content: \"\\E120\";\r\n}\r\n.glyphicon-hdd:before {\r\n  content: \"\\E121\";\r\n}\r\n.glyphicon-bullhorn:before {\r\n  content: \"\\E122\";\r\n}\r\n.glyphicon-bell:before {\r\n  content: \"\\E123\";\r\n}\r\n.glyphicon-certificate:before {\r\n  content: \"\\E124\";\r\n}\r\n.glyphicon-thumbs-up:before {\r\n  content: \"\\E125\";\r\n}\r\n.glyphicon-thumbs-down:before {\r\n  content: \"\\E126\";\r\n}\r\n.glyphicon-hand-right:before {\r\n  content: \"\\E127\";\r\n}\r\n.glyphicon-hand-left:before {\r\n  content: \"\\E128\";\r\n}\r\n.glyphicon-hand-up:before {\r\n  content: \"\\E129\";\r\n}\r\n.glyphicon-hand-down:before {\r\n  content: \"\\E130\";\r\n}\r\n.glyphicon-circle-arrow-right:before {\r\n  content: \"\\E131\";\r\n}\r\n.glyphicon-circle-arrow-left:before {\r\n  content: \"\\E132\";\r\n}\r\n.glyphicon-circle-arrow-up:before {\r\n  content: \"\\E133\";\r\n}\r\n.glyphicon-circle-arrow-down:before {\r\n  content: \"\\E134\";\r\n}\r\n.glyphicon-globe:before {\r\n  content: \"\\E135\";\r\n}\r\n.glyphicon-wrench:before {\r\n  content: \"\\E136\";\r\n}\r\n.glyphicon-tasks:before {\r\n  content: \"\\E137\";\r\n}\r\n.glyphicon-filter:before {\r\n  content: \"\\E138\";\r\n}\r\n.glyphicon-briefcase:before {\r\n  content: \"\\E139\";\r\n}\r\n.glyphicon-fullscreen:before {\r\n  content: \"\\E140\";\r\n}\r\n.glyphicon-dashboard:before {\r\n  content: \"\\E141\";\r\n}\r\n.glyphicon-paperclip:before {\r\n  content: \"\\E142\";\r\n}\r\n.glyphicon-heart-empty:before {\r\n  content: \"\\E143\";\r\n}\r\n.glyphicon-link:before {\r\n  content: \"\\E144\";\r\n}\r\n.glyphicon-phone:before {\r\n  content: \"\\E145\";\r\n}\r\n.glyphicon-pushpin:before {\r\n  content: \"\\E146\";\r\n}\r\n.glyphicon-usd:before {\r\n  content: \"\\E148\";\r\n}\r\n.glyphicon-gbp:before {\r\n  content: \"\\E149\";\r\n}\r\n.glyphicon-sort:before {\r\n  content: \"\\E150\";\r\n}\r\n.glyphicon-sort-by-alphabet:before {\r\n  content: \"\\E151\";\r\n}\r\n.glyphicon-sort-by-alphabet-alt:before {\r\n  content: \"\\E152\";\r\n}\r\n.glyphicon-sort-by-order:before {\r\n  content: \"\\E153\";\r\n}\r\n.glyphicon-sort-by-order-alt:before {\r\n  content: \"\\E154\";\r\n}\r\n.glyphicon-sort-by-attributes:before {\r\n  content: \"\\E155\";\r\n}\r\n.glyphicon-sort-by-attributes-alt:before {\r\n  content: \"\\E156\";\r\n}\r\n.glyphicon-unchecked:before {\r\n  content: \"\\E157\";\r\n}\r\n.glyphicon-expand:before {\r\n  content: \"\\E158\";\r\n}\r\n.glyphicon-collapse-down:before {\r\n  content: \"\\E159\";\r\n}\r\n.glyphicon-collapse-up:before {\r\n  content: \"\\E160\";\r\n}\r\n.glyphicon-log-in:before {\r\n  content: \"\\E161\";\r\n}\r\n.glyphicon-flash:before {\r\n  content: \"\\E162\";\r\n}\r\n.glyphicon-log-out:before {\r\n  content: \"\\E163\";\r\n}\r\n.glyphicon-new-window:before {\r\n  content: \"\\E164\";\r\n}\r\n.glyphicon-record:before {\r\n  content: \"\\E165\";\r\n}\r\n.glyphicon-save:before {\r\n  content: \"\\E166\";\r\n}\r\n.glyphicon-open:before {\r\n  content: \"\\E167\";\r\n}\r\n.glyphicon-saved:before {\r\n  content: \"\\E168\";\r\n}\r\n.glyphicon-import:before {\r\n  content: \"\\E169\";\r\n}\r\n.glyphicon-export:before {\r\n  content: \"\\E170\";\r\n}\r\n.glyphicon-send:before {\r\n  content: \"\\E171\";\r\n}\r\n.glyphicon-floppy-disk:before {\r\n  content: \"\\E172\";\r\n}\r\n.glyphicon-floppy-saved:before {\r\n  content: \"\\E173\";\r\n}\r\n.glyphicon-floppy-remove:before {\r\n  content: \"\\E174\";\r\n}\r\n.glyphicon-floppy-save:before {\r\n  content: \"\\E175\";\r\n}\r\n.glyphicon-floppy-open:before {\r\n  content: \"\\E176\";\r\n}\r\n.glyphicon-credit-card:before {\r\n  content: \"\\E177\";\r\n}\r\n.glyphicon-transfer:before {\r\n  content: \"\\E178\";\r\n}\r\n.glyphicon-cutlery:before {\r\n  content: \"\\E179\";\r\n}\r\n.glyphicon-header:before {\r\n  content: \"\\E180\";\r\n}\r\n.glyphicon-compressed:before {\r\n  content: \"\\E181\";\r\n}\r\n.glyphicon-earphone:before {\r\n  content: \"\\E182\";\r\n}\r\n.glyphicon-phone-alt:before {\r\n  content: \"\\E183\";\r\n}\r\n.glyphicon-tower:before {\r\n  content: \"\\E184\";\r\n}\r\n.glyphicon-stats:before {\r\n  content: \"\\E185\";\r\n}\r\n.glyphicon-sd-video:before {\r\n  content: \"\\E186\";\r\n}\r\n.glyphicon-hd-video:before {\r\n  content: \"\\E187\";\r\n}\r\n.glyphicon-subtitles:before {\r\n  content: \"\\E188\";\r\n}\r\n.glyphicon-sound-stereo:before {\r\n  content: \"\\E189\";\r\n}\r\n.glyphicon-sound-dolby:before {\r\n  content: \"\\E190\";\r\n}\r\n.glyphicon-sound-5-1:before {\r\n  content: \"\\E191\";\r\n}\r\n.glyphicon-sound-6-1:before {\r\n  content: \"\\E192\";\r\n}\r\n.glyphicon-sound-7-1:before {\r\n  content: \"\\E193\";\r\n}\r\n.glyphicon-copyright-mark:before {\r\n  content: \"\\E194\";\r\n}\r\n.glyphicon-registration-mark:before {\r\n  content: \"\\E195\";\r\n}\r\n.glyphicon-cloud-download:before {\r\n  content: \"\\E197\";\r\n}\r\n.glyphicon-cloud-upload:before {\r\n  content: \"\\E198\";\r\n}\r\n.glyphicon-tree-conifer:before {\r\n  content: \"\\E199\";\r\n}\r\n.glyphicon-tree-deciduous:before {\r\n  content: \"\\E200\";\r\n}\r\n.glyphicon-cd:before {\r\n  content: \"\\E201\";\r\n}\r\n.glyphicon-save-file:before {\r\n  content: \"\\E202\";\r\n}\r\n.glyphicon-open-file:before {\r\n  content: \"\\E203\";\r\n}\r\n.glyphicon-level-up:before {\r\n  content: \"\\E204\";\r\n}\r\n.glyphicon-copy:before {\r\n  content: \"\\E205\";\r\n}\r\n.glyphicon-paste:before {\r\n  content: \"\\E206\";\r\n}\r\n.glyphicon-alert:before {\r\n  content: \"\\E209\";\r\n}\r\n.glyphicon-equalizer:before {\r\n  content: \"\\E210\";\r\n}\r\n.glyphicon-king:before {\r\n  content: \"\\E211\";\r\n}\r\n.glyphicon-queen:before {\r\n  content: \"\\E212\";\r\n}\r\n.glyphicon-pawn:before {\r\n  content: \"\\E213\";\r\n}\r\n.glyphicon-bishop:before {\r\n  content: \"\\E214\";\r\n}\r\n.glyphicon-knight:before {\r\n  content: \"\\E215\";\r\n}\r\n.glyphicon-baby-formula:before {\r\n  content: \"\\E216\";\r\n}\r\n.glyphicon-tent:before {\r\n  content: \"\\26FA\";\r\n}\r\n.glyphicon-blackboard:before {\r\n  content: \"\\E218\";\r\n}\r\n.glyphicon-bed:before {\r\n  content: \"\\E219\";\r\n}\r\n.glyphicon-apple:before {\r\n  content: \"\\F8FF\";\r\n}\r\n.glyphicon-erase:before {\r\n  content: \"\\E221\";\r\n}\r\n.glyphicon-hourglass:before {\r\n  content: \"\\231B\";\r\n}\r\n.glyphicon-lamp:before {\r\n  content: \"\\E223\";\r\n}\r\n.glyphicon-duplicate:before {\r\n  content: \"\\E224\";\r\n}\r\n.glyphicon-piggy-bank:before {\r\n  content: \"\\E225\";\r\n}\r\n.glyphicon-scissors:before {\r\n  content: \"\\E226\";\r\n}\r\n.glyphicon-bitcoin:before {\r\n  content: \"\\E227\";\r\n}\r\n.glyphicon-btc:before {\r\n  content: \"\\E227\";\r\n}\r\n.glyphicon-xbt:before {\r\n  content: \"\\E227\";\r\n}\r\n.glyphicon-yen:before {\r\n  content: \"\\A5\";\r\n}\r\n.glyphicon-jpy:before {\r\n  content: \"\\A5\";\r\n}\r\n.glyphicon-ruble:before {\r\n  content: \"\\20BD\";\r\n}\r\n.glyphicon-rub:before {\r\n  content: \"\\20BD\";\r\n}\r\n.glyphicon-scale:before {\r\n  content: \"\\E230\";\r\n}\r\n.glyphicon-ice-lolly:before {\r\n  content: \"\\E231\";\r\n}\r\n.glyphicon-ice-lolly-tasted:before {\r\n  content: \"\\E232\";\r\n}\r\n.glyphicon-education:before {\r\n  content: \"\\E233\";\r\n}\r\n.glyphicon-option-horizontal:before {\r\n  content: \"\\E234\";\r\n}\r\n.glyphicon-option-vertical:before {\r\n  content: \"\\E235\";\r\n}\r\n.glyphicon-menu-hamburger:before {\r\n  content: \"\\E236\";\r\n}\r\n.glyphicon-modal-window:before {\r\n  content: \"\\E237\";\r\n}\r\n.glyphicon-oil:before {\r\n  content: \"\\E238\";\r\n}\r\n.glyphicon-grain:before {\r\n  content: \"\\E239\";\r\n}\r\n.glyphicon-sunglasses:before {\r\n  content: \"\\E240\";\r\n}\r\n.glyphicon-text-size:before {\r\n  content: \"\\E241\";\r\n}\r\n.glyphicon-text-color:before {\r\n  content: \"\\E242\";\r\n}\r\n.glyphicon-text-background:before {\r\n  content: \"\\E243\";\r\n}\r\n.glyphicon-object-align-top:before {\r\n  content: \"\\E244\";\r\n}\r\n.glyphicon-object-align-bottom:before {\r\n  content: \"\\E245\";\r\n}\r\n.glyphicon-object-align-horizontal:before {\r\n  content: \"\\E246\";\r\n}\r\n.glyphicon-object-align-left:before {\r\n  content: \"\\E247\";\r\n}\r\n.glyphicon-object-align-vertical:before {\r\n  content: \"\\E248\";\r\n}\r\n.glyphicon-object-align-right:before {\r\n  content: \"\\E249\";\r\n}\r\n.glyphicon-triangle-right:before {\r\n  content: \"\\E250\";\r\n}\r\n.glyphicon-triangle-left:before {\r\n  content: \"\\E251\";\r\n}\r\n.glyphicon-triangle-bottom:before {\r\n  content: \"\\E252\";\r\n}\r\n.glyphicon-triangle-top:before {\r\n  content: \"\\E253\";\r\n}\r\n.glyphicon-console:before {\r\n  content: \"\\E254\";\r\n}\r\n.glyphicon-superscript:before {\r\n  content: \"\\E255\";\r\n}\r\n.glyphicon-subscript:before {\r\n  content: \"\\E256\";\r\n}\r\n.glyphicon-menu-left:before {\r\n  content: \"\\E257\";\r\n}\r\n.glyphicon-menu-right:before {\r\n  content: \"\\E258\";\r\n}\r\n.glyphicon-menu-down:before {\r\n  content: \"\\E259\";\r\n}\r\n.glyphicon-menu-up:before {\r\n  content: \"\\E260\";\r\n}\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n*:before,\r\n*:after {\r\n  box-sizing: border-box;\r\n}\r\nhtml {\r\n  font-size: 10px;\r\n\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\nbody {\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #333;\r\n  background-color: #fff;\r\n}\r\ninput,\r\nbutton,\r\nselect,\r\ntextarea {\r\n  font-family: inherit;\r\n  font-size: inherit;\r\n  line-height: inherit;\r\n}\r\na {\r\n  color: #337ab7;\r\n  text-decoration: none;\r\n}\r\na:hover,\r\na:focus {\r\n  color: #23527c;\r\n  text-decoration: underline;\r\n}\r\na:focus {\r\n  outline: thin dotted;\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px;\r\n}\r\nfigure {\r\n  margin: 0;\r\n}\r\nimg {\r\n  vertical-align: middle;\r\n}\r\n.img-responsive,\r\n.thumbnail > img,\r\n.thumbnail a > img,\r\n.carousel-inner > .item > img,\r\n.carousel-inner > .item > a > img {\r\n  display: block;\r\n  max-width: 100%;\r\n  height: auto;\r\n}\r\n.img-rounded {\r\n  border-radius: 6px;\r\n}\r\n.img-thumbnail {\r\n  display: inline-block;\r\n  max-width: 100%;\r\n  height: auto;\r\n  padding: 4px;\r\n  line-height: 1.42857143;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 4px;\r\n  -webkit-transition: all .2s ease-in-out;\r\n          transition: all .2s ease-in-out;\r\n}\r\n.img-circle {\r\n  border-radius: 50%;\r\n}\r\nhr {\r\n  margin-top: 20px;\r\n  margin-bottom: 20px;\r\n  border: 0;\r\n  border-top: 1px solid #eee;\r\n}\r\n.sr-only {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  padding: 0;\r\n  margin: -1px;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n  border: 0;\r\n}\r\n.sr-only-focusable:active,\r\n.sr-only-focusable:focus {\r\n  position: static;\r\n  width: auto;\r\n  height: auto;\r\n  margin: 0;\r\n  overflow: visible;\r\n  clip: auto;\r\n}\r\n[role=\"button\"] {\r\n  cursor: pointer;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\n.h1,\r\n.h2,\r\n.h3,\r\n.h4,\r\n.h5,\r\n.h6 {\r\n  font-family: inherit;\r\n  font-weight: 500;\r\n  line-height: 1.1;\r\n  color: inherit;\r\n}\r\nh1 small,\r\nh2 small,\r\nh3 small,\r\nh4 small,\r\nh5 small,\r\nh6 small,\r\n.h1 small,\r\n.h2 small,\r\n.h3 small,\r\n.h4 small,\r\n.h5 small,\r\n.h6 small,\r\nh1 .small,\r\nh2 .small,\r\nh3 .small,\r\nh4 .small,\r\nh5 .small,\r\nh6 .small,\r\n.h1 .small,\r\n.h2 .small,\r\n.h3 .small,\r\n.h4 .small,\r\n.h5 .small,\r\n.h6 .small {\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  color: #777;\r\n}\r\nh1,\r\n.h1,\r\nh2,\r\n.h2,\r\nh3,\r\n.h3 {\r\n  margin-top: 20px;\r\n  margin-bottom: 10px;\r\n}\r\nh1 small,\r\n.h1 small,\r\nh2 small,\r\n.h2 small,\r\nh3 small,\r\n.h3 small,\r\nh1 .small,\r\n.h1 .small,\r\nh2 .small,\r\n.h2 .small,\r\nh3 .small,\r\n.h3 .small {\r\n  font-size: 65%;\r\n}\r\nh4,\r\n.h4,\r\nh5,\r\n.h5,\r\nh6,\r\n.h6 {\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\nh4 small,\r\n.h4 small,\r\nh5 small,\r\n.h5 small,\r\nh6 small,\r\n.h6 small,\r\nh4 .small,\r\n.h4 .small,\r\nh5 .small,\r\n.h5 .small,\r\nh6 .small,\r\n.h6 .small {\r\n  font-size: 75%;\r\n}\r\nh1,\r\n.h1 {\r\n  font-size: 36px;\r\n}\r\nh2,\r\n.h2 {\r\n  font-size: 30px;\r\n}\r\nh3,\r\n.h3 {\r\n  font-size: 24px;\r\n}\r\nh4,\r\n.h4 {\r\n  font-size: 18px;\r\n}\r\nh5,\r\n.h5 {\r\n  font-size: 14px;\r\n}\r\nh6,\r\n.h6 {\r\n  font-size: 12px;\r\n}\r\np {\r\n  margin: 0 0 10px;\r\n}\r\n.lead {\r\n  margin-bottom: 20px;\r\n  font-size: 16px;\r\n  font-weight: 300;\r\n  line-height: 1.4;\r\n}\r\n@media (min-width: 768px) {\r\n  .lead {\r\n    font-size: 21px;\r\n  }\r\n}\r\nsmall,\r\n.small {\r\n  font-size: 85%;\r\n}\r\nmark,\r\n.mark {\r\n  padding: .2em;\r\n  background-color: #fcf8e3;\r\n}\r\n.text-left {\r\n  text-align: left;\r\n}\r\n.text-right {\r\n  text-align: right;\r\n}\r\n.text-center {\r\n  text-align: center;\r\n}\r\n.text-justify {\r\n  text-align: justify;\r\n}\r\n.text-nowrap {\r\n  white-space: nowrap;\r\n}\r\n.text-lowercase {\r\n  text-transform: lowercase;\r\n}\r\n.text-uppercase {\r\n  text-transform: uppercase;\r\n}\r\n.text-capitalize {\r\n  text-transform: capitalize;\r\n}\r\n.text-muted {\r\n  color: #777;\r\n}\r\n.text-primary {\r\n  color: #337ab7;\r\n}\r\na.text-primary:hover,\r\na.text-primary:focus {\r\n  color: #286090;\r\n}\r\n.text-success {\r\n  color: #3c763d;\r\n}\r\na.text-success:hover,\r\na.text-success:focus {\r\n  color: #2b542c;\r\n}\r\n.text-info {\r\n  color: #31708f;\r\n}\r\na.text-info:hover,\r\na.text-info:focus {\r\n  color: #245269;\r\n}\r\n.text-warning {\r\n  color: #8a6d3b;\r\n}\r\na.text-warning:hover,\r\na.text-warning:focus {\r\n  color: #66512c;\r\n}\r\n.text-danger {\r\n  color: #a94442;\r\n}\r\na.text-danger:hover,\r\na.text-danger:focus {\r\n  color: #843534;\r\n}\r\n.bg-primary {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n}\r\na.bg-primary:hover,\r\na.bg-primary:focus {\r\n  background-color: #286090;\r\n}\r\n.bg-success {\r\n  background-color: #dff0d8;\r\n}\r\na.bg-success:hover,\r\na.bg-success:focus {\r\n  background-color: #c1e2b3;\r\n}\r\n.bg-info {\r\n  background-color: #d9edf7;\r\n}\r\na.bg-info:hover,\r\na.bg-info:focus {\r\n  background-color: #afd9ee;\r\n}\r\n.bg-warning {\r\n  background-color: #fcf8e3;\r\n}\r\na.bg-warning:hover,\r\na.bg-warning:focus {\r\n  background-color: #f7ecb5;\r\n}\r\n.bg-danger {\r\n  background-color: #f2dede;\r\n}\r\na.bg-danger:hover,\r\na.bg-danger:focus {\r\n  background-color: #e4b9b9;\r\n}\r\n.page-header {\r\n  padding-bottom: 9px;\r\n  margin: 40px 0 20px;\r\n  border-bottom: 1px solid #eee;\r\n}\r\nul,\r\nol {\r\n  margin-top: 0;\r\n  margin-bottom: 10px;\r\n}\r\nul ul,\r\nol ul,\r\nul ol,\r\nol ol {\r\n  margin-bottom: 0;\r\n}\r\n.list-unstyled {\r\n  padding-left: 0;\r\n  list-style: none;\r\n}\r\n.list-inline {\r\n  padding-left: 0;\r\n  margin-left: -5px;\r\n  list-style: none;\r\n}\r\n.list-inline > li {\r\n  display: inline-block;\r\n  padding-right: 5px;\r\n  padding-left: 5px;\r\n}\r\ndl {\r\n  margin-top: 0;\r\n  margin-bottom: 20px;\r\n}\r\ndt,\r\ndd {\r\n  line-height: 1.42857143;\r\n}\r\ndt {\r\n  font-weight: bold;\r\n}\r\ndd {\r\n  margin-left: 0;\r\n}\r\n@media (min-width: 768px) {\r\n  .dl-horizontal dt {\r\n    float: left;\r\n    width: 160px;\r\n    overflow: hidden;\r\n    clear: left;\r\n    text-align: right;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n  }\r\n  .dl-horizontal dd {\r\n    margin-left: 180px;\r\n  }\r\n}\r\nabbr[title],\r\nabbr[data-original-title] {\r\n  cursor: help;\r\n  border-bottom: 1px dotted #777;\r\n}\r\n.initialism {\r\n  font-size: 90%;\r\n  text-transform: uppercase;\r\n}\r\nblockquote {\r\n  padding: 10px 20px;\r\n  margin: 0 0 20px;\r\n  font-size: 17.5px;\r\n  border-left: 5px solid #eee;\r\n}\r\nblockquote p:last-child,\r\nblockquote ul:last-child,\r\nblockquote ol:last-child {\r\n  margin-bottom: 0;\r\n}\r\nblockquote footer,\r\nblockquote small,\r\nblockquote .small {\r\n  display: block;\r\n  font-size: 80%;\r\n  line-height: 1.42857143;\r\n  color: #777;\r\n}\r\nblockquote footer:before,\r\nblockquote small:before,\r\nblockquote .small:before {\r\n  content: '\\2014   \\A0';\r\n}\r\n.blockquote-reverse,\r\nblockquote.pull-right {\r\n  padding-right: 15px;\r\n  padding-left: 0;\r\n  text-align: right;\r\n  border-right: 5px solid #eee;\r\n  border-left: 0;\r\n}\r\n.blockquote-reverse footer:before,\r\nblockquote.pull-right footer:before,\r\n.blockquote-reverse small:before,\r\nblockquote.pull-right small:before,\r\n.blockquote-reverse .small:before,\r\nblockquote.pull-right .small:before {\r\n  content: '';\r\n}\r\n.blockquote-reverse footer:after,\r\nblockquote.pull-right footer:after,\r\n.blockquote-reverse small:after,\r\nblockquote.pull-right small:after,\r\n.blockquote-reverse .small:after,\r\nblockquote.pull-right .small:after {\r\n  content: '\\A0   \\2014';\r\n}\r\naddress {\r\n  margin-bottom: 20px;\r\n  font-style: normal;\r\n  line-height: 1.42857143;\r\n}\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\r\n}\r\ncode {\r\n  padding: 2px 4px;\r\n  font-size: 90%;\r\n  color: #c7254e;\r\n  background-color: #f9f2f4;\r\n  border-radius: 4px;\r\n}\r\nkbd {\r\n  padding: 2px 4px;\r\n  font-size: 90%;\r\n  color: #fff;\r\n  background-color: #333;\r\n  border-radius: 3px;\r\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\r\n}\r\nkbd kbd {\r\n  padding: 0;\r\n  font-size: 100%;\r\n  font-weight: bold;\r\n  box-shadow: none;\r\n}\r\npre {\r\n  display: block;\r\n  padding: 9.5px;\r\n  margin: 0 0 10px;\r\n  font-size: 13px;\r\n  line-height: 1.42857143;\r\n  color: #333;\r\n  word-break: break-all;\r\n  word-wrap: break-word;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid #ccc;\r\n  border-radius: 4px;\r\n}\r\npre code {\r\n  padding: 0;\r\n  font-size: inherit;\r\n  color: inherit;\r\n  white-space: pre-wrap;\r\n  background-color: transparent;\r\n  border-radius: 0;\r\n}\r\n.pre-scrollable {\r\n  max-height: 340px;\r\n  overflow-y: scroll;\r\n}\r\n.container {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .container {\r\n    width: 750px;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .container {\r\n    width: 970px;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .container {\r\n    width: 1170px;\r\n  }\r\n}\r\n.container-fluid {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n.row {\r\n  margin-right: -15px;\r\n  margin-left: -15px;\r\n}\r\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\r\n  position: relative;\r\n  min-height: 1px;\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\r\n  float: left;\r\n}\r\n.col-xs-12 {\r\n  width: 100%;\r\n}\r\n.col-xs-11 {\r\n  width: 91.66666667%;\r\n}\r\n.col-xs-10 {\r\n  width: 83.33333333%;\r\n}\r\n.col-xs-9 {\r\n  width: 75%;\r\n}\r\n.col-xs-8 {\r\n  width: 66.66666667%;\r\n}\r\n.col-xs-7 {\r\n  width: 58.33333333%;\r\n}\r\n.col-xs-6 {\r\n  width: 50%;\r\n}\r\n.col-xs-5 {\r\n  width: 41.66666667%;\r\n}\r\n.col-xs-4 {\r\n  width: 33.33333333%;\r\n}\r\n.col-xs-3 {\r\n  width: 25%;\r\n}\r\n.col-xs-2 {\r\n  width: 16.66666667%;\r\n}\r\n.col-xs-1 {\r\n  width: 8.33333333%;\r\n}\r\n.col-xs-pull-12 {\r\n  right: 100%;\r\n}\r\n.col-xs-pull-11 {\r\n  right: 91.66666667%;\r\n}\r\n.col-xs-pull-10 {\r\n  right: 83.33333333%;\r\n}\r\n.col-xs-pull-9 {\r\n  right: 75%;\r\n}\r\n.col-xs-pull-8 {\r\n  right: 66.66666667%;\r\n}\r\n.col-xs-pull-7 {\r\n  right: 58.33333333%;\r\n}\r\n.col-xs-pull-6 {\r\n  right: 50%;\r\n}\r\n.col-xs-pull-5 {\r\n  right: 41.66666667%;\r\n}\r\n.col-xs-pull-4 {\r\n  right: 33.33333333%;\r\n}\r\n.col-xs-pull-3 {\r\n  right: 25%;\r\n}\r\n.col-xs-pull-2 {\r\n  right: 16.66666667%;\r\n}\r\n.col-xs-pull-1 {\r\n  right: 8.33333333%;\r\n}\r\n.col-xs-pull-0 {\r\n  right: auto;\r\n}\r\n.col-xs-push-12 {\r\n  left: 100%;\r\n}\r\n.col-xs-push-11 {\r\n  left: 91.66666667%;\r\n}\r\n.col-xs-push-10 {\r\n  left: 83.33333333%;\r\n}\r\n.col-xs-push-9 {\r\n  left: 75%;\r\n}\r\n.col-xs-push-8 {\r\n  left: 66.66666667%;\r\n}\r\n.col-xs-push-7 {\r\n  left: 58.33333333%;\r\n}\r\n.col-xs-push-6 {\r\n  left: 50%;\r\n}\r\n.col-xs-push-5 {\r\n  left: 41.66666667%;\r\n}\r\n.col-xs-push-4 {\r\n  left: 33.33333333%;\r\n}\r\n.col-xs-push-3 {\r\n  left: 25%;\r\n}\r\n.col-xs-push-2 {\r\n  left: 16.66666667%;\r\n}\r\n.col-xs-push-1 {\r\n  left: 8.33333333%;\r\n}\r\n.col-xs-push-0 {\r\n  left: auto;\r\n}\r\n.col-xs-offset-12 {\r\n  margin-left: 100%;\r\n}\r\n.col-xs-offset-11 {\r\n  margin-left: 91.66666667%;\r\n}\r\n.col-xs-offset-10 {\r\n  margin-left: 83.33333333%;\r\n}\r\n.col-xs-offset-9 {\r\n  margin-left: 75%;\r\n}\r\n.col-xs-offset-8 {\r\n  margin-left: 66.66666667%;\r\n}\r\n.col-xs-offset-7 {\r\n  margin-left: 58.33333333%;\r\n}\r\n.col-xs-offset-6 {\r\n  margin-left: 50%;\r\n}\r\n.col-xs-offset-5 {\r\n  margin-left: 41.66666667%;\r\n}\r\n.col-xs-offset-4 {\r\n  margin-left: 33.33333333%;\r\n}\r\n.col-xs-offset-3 {\r\n  margin-left: 25%;\r\n}\r\n.col-xs-offset-2 {\r\n  margin-left: 16.66666667%;\r\n}\r\n.col-xs-offset-1 {\r\n  margin-left: 8.33333333%;\r\n}\r\n.col-xs-offset-0 {\r\n  margin-left: 0;\r\n}\r\n@media (min-width: 768px) {\r\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\r\n    float: left;\r\n  }\r\n  .col-sm-12 {\r\n    width: 100%;\r\n  }\r\n  .col-sm-11 {\r\n    width: 91.66666667%;\r\n  }\r\n  .col-sm-10 {\r\n    width: 83.33333333%;\r\n  }\r\n  .col-sm-9 {\r\n    width: 75%;\r\n  }\r\n  .col-sm-8 {\r\n    width: 66.66666667%;\r\n  }\r\n  .col-sm-7 {\r\n    width: 58.33333333%;\r\n  }\r\n  .col-sm-6 {\r\n    width: 50%;\r\n  }\r\n  .col-sm-5 {\r\n    width: 41.66666667%;\r\n  }\r\n  .col-sm-4 {\r\n    width: 33.33333333%;\r\n  }\r\n  .col-sm-3 {\r\n    width: 25%;\r\n  }\r\n  .col-sm-2 {\r\n    width: 16.66666667%;\r\n  }\r\n  .col-sm-1 {\r\n    width: 8.33333333%;\r\n  }\r\n  .col-sm-pull-12 {\r\n    right: 100%;\r\n  }\r\n  .col-sm-pull-11 {\r\n    right: 91.66666667%;\r\n  }\r\n  .col-sm-pull-10 {\r\n    right: 83.33333333%;\r\n  }\r\n  .col-sm-pull-9 {\r\n    right: 75%;\r\n  }\r\n  .col-sm-pull-8 {\r\n    right: 66.66666667%;\r\n  }\r\n  .col-sm-pull-7 {\r\n    right: 58.33333333%;\r\n  }\r\n  .col-sm-pull-6 {\r\n    right: 50%;\r\n  }\r\n  .col-sm-pull-5 {\r\n    right: 41.66666667%;\r\n  }\r\n  .col-sm-pull-4 {\r\n    right: 33.33333333%;\r\n  }\r\n  .col-sm-pull-3 {\r\n    right: 25%;\r\n  }\r\n  .col-sm-pull-2 {\r\n    right: 16.66666667%;\r\n  }\r\n  .col-sm-pull-1 {\r\n    right: 8.33333333%;\r\n  }\r\n  .col-sm-pull-0 {\r\n    right: auto;\r\n  }\r\n  .col-sm-push-12 {\r\n    left: 100%;\r\n  }\r\n  .col-sm-push-11 {\r\n    left: 91.66666667%;\r\n  }\r\n  .col-sm-push-10 {\r\n    left: 83.33333333%;\r\n  }\r\n  .col-sm-push-9 {\r\n    left: 75%;\r\n  }\r\n  .col-sm-push-8 {\r\n    left: 66.66666667%;\r\n  }\r\n  .col-sm-push-7 {\r\n    left: 58.33333333%;\r\n  }\r\n  .col-sm-push-6 {\r\n    left: 50%;\r\n  }\r\n  .col-sm-push-5 {\r\n    left: 41.66666667%;\r\n  }\r\n  .col-sm-push-4 {\r\n    left: 33.33333333%;\r\n  }\r\n  .col-sm-push-3 {\r\n    left: 25%;\r\n  }\r\n  .col-sm-push-2 {\r\n    left: 16.66666667%;\r\n  }\r\n  .col-sm-push-1 {\r\n    left: 8.33333333%;\r\n  }\r\n  .col-sm-push-0 {\r\n    left: auto;\r\n  }\r\n  .col-sm-offset-12 {\r\n    margin-left: 100%;\r\n  }\r\n  .col-sm-offset-11 {\r\n    margin-left: 91.66666667%;\r\n  }\r\n  .col-sm-offset-10 {\r\n    margin-left: 83.33333333%;\r\n  }\r\n  .col-sm-offset-9 {\r\n    margin-left: 75%;\r\n  }\r\n  .col-sm-offset-8 {\r\n    margin-left: 66.66666667%;\r\n  }\r\n  .col-sm-offset-7 {\r\n    margin-left: 58.33333333%;\r\n  }\r\n  .col-sm-offset-6 {\r\n    margin-left: 50%;\r\n  }\r\n  .col-sm-offset-5 {\r\n    margin-left: 41.66666667%;\r\n  }\r\n  .col-sm-offset-4 {\r\n    margin-left: 33.33333333%;\r\n  }\r\n  .col-sm-offset-3 {\r\n    margin-left: 25%;\r\n  }\r\n  .col-sm-offset-2 {\r\n    margin-left: 16.66666667%;\r\n  }\r\n  .col-sm-offset-1 {\r\n    margin-left: 8.33333333%;\r\n  }\r\n  .col-sm-offset-0 {\r\n    margin-left: 0;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\r\n    float: left;\r\n  }\r\n  .col-md-12 {\r\n    width: 100%;\r\n  }\r\n  .col-md-11 {\r\n    width: 91.66666667%;\r\n  }\r\n  .col-md-10 {\r\n    width: 83.33333333%;\r\n  }\r\n  .col-md-9 {\r\n    width: 75%;\r\n  }\r\n  .col-md-8 {\r\n    width: 66.66666667%;\r\n  }\r\n  .col-md-7 {\r\n    width: 58.33333333%;\r\n  }\r\n  .col-md-6 {\r\n    width: 50%;\r\n  }\r\n  .col-md-5 {\r\n    width: 41.66666667%;\r\n  }\r\n  .col-md-4 {\r\n    width: 33.33333333%;\r\n  }\r\n  .col-md-3 {\r\n    width: 25%;\r\n  }\r\n  .col-md-2 {\r\n    width: 16.66666667%;\r\n  }\r\n  .col-md-1 {\r\n    width: 8.33333333%;\r\n  }\r\n  .col-md-pull-12 {\r\n    right: 100%;\r\n  }\r\n  .col-md-pull-11 {\r\n    right: 91.66666667%;\r\n  }\r\n  .col-md-pull-10 {\r\n    right: 83.33333333%;\r\n  }\r\n  .col-md-pull-9 {\r\n    right: 75%;\r\n  }\r\n  .col-md-pull-8 {\r\n    right: 66.66666667%;\r\n  }\r\n  .col-md-pull-7 {\r\n    right: 58.33333333%;\r\n  }\r\n  .col-md-pull-6 {\r\n    right: 50%;\r\n  }\r\n  .col-md-pull-5 {\r\n    right: 41.66666667%;\r\n  }\r\n  .col-md-pull-4 {\r\n    right: 33.33333333%;\r\n  }\r\n  .col-md-pull-3 {\r\n    right: 25%;\r\n  }\r\n  .col-md-pull-2 {\r\n    right: 16.66666667%;\r\n  }\r\n  .col-md-pull-1 {\r\n    right: 8.33333333%;\r\n  }\r\n  .col-md-pull-0 {\r\n    right: auto;\r\n  }\r\n  .col-md-push-12 {\r\n    left: 100%;\r\n  }\r\n  .col-md-push-11 {\r\n    left: 91.66666667%;\r\n  }\r\n  .col-md-push-10 {\r\n    left: 83.33333333%;\r\n  }\r\n  .col-md-push-9 {\r\n    left: 75%;\r\n  }\r\n  .col-md-push-8 {\r\n    left: 66.66666667%;\r\n  }\r\n  .col-md-push-7 {\r\n    left: 58.33333333%;\r\n  }\r\n  .col-md-push-6 {\r\n    left: 50%;\r\n  }\r\n  .col-md-push-5 {\r\n    left: 41.66666667%;\r\n  }\r\n  .col-md-push-4 {\r\n    left: 33.33333333%;\r\n  }\r\n  .col-md-push-3 {\r\n    left: 25%;\r\n  }\r\n  .col-md-push-2 {\r\n    left: 16.66666667%;\r\n  }\r\n  .col-md-push-1 {\r\n    left: 8.33333333%;\r\n  }\r\n  .col-md-push-0 {\r\n    left: auto;\r\n  }\r\n  .col-md-offset-12 {\r\n    margin-left: 100%;\r\n  }\r\n  .col-md-offset-11 {\r\n    margin-left: 91.66666667%;\r\n  }\r\n  .col-md-offset-10 {\r\n    margin-left: 83.33333333%;\r\n  }\r\n  .col-md-offset-9 {\r\n    margin-left: 75%;\r\n  }\r\n  .col-md-offset-8 {\r\n    margin-left: 66.66666667%;\r\n  }\r\n  .col-md-offset-7 {\r\n    margin-left: 58.33333333%;\r\n  }\r\n  .col-md-offset-6 {\r\n    margin-left: 50%;\r\n  }\r\n  .col-md-offset-5 {\r\n    margin-left: 41.66666667%;\r\n  }\r\n  .col-md-offset-4 {\r\n    margin-left: 33.33333333%;\r\n  }\r\n  .col-md-offset-3 {\r\n    margin-left: 25%;\r\n  }\r\n  .col-md-offset-2 {\r\n    margin-left: 16.66666667%;\r\n  }\r\n  .col-md-offset-1 {\r\n    margin-left: 8.33333333%;\r\n  }\r\n  .col-md-offset-0 {\r\n    margin-left: 0;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\r\n    float: left;\r\n  }\r\n  .col-lg-12 {\r\n    width: 100%;\r\n  }\r\n  .col-lg-11 {\r\n    width: 91.66666667%;\r\n  }\r\n  .col-lg-10 {\r\n    width: 83.33333333%;\r\n  }\r\n  .col-lg-9 {\r\n    width: 75%;\r\n  }\r\n  .col-lg-8 {\r\n    width: 66.66666667%;\r\n  }\r\n  .col-lg-7 {\r\n    width: 58.33333333%;\r\n  }\r\n  .col-lg-6 {\r\n    width: 50%;\r\n  }\r\n  .col-lg-5 {\r\n    width: 41.66666667%;\r\n  }\r\n  .col-lg-4 {\r\n    width: 33.33333333%;\r\n  }\r\n  .col-lg-3 {\r\n    width: 25%;\r\n  }\r\n  .col-lg-2 {\r\n    width: 16.66666667%;\r\n  }\r\n  .col-lg-1 {\r\n    width: 8.33333333%;\r\n  }\r\n  .col-lg-pull-12 {\r\n    right: 100%;\r\n  }\r\n  .col-lg-pull-11 {\r\n    right: 91.66666667%;\r\n  }\r\n  .col-lg-pull-10 {\r\n    right: 83.33333333%;\r\n  }\r\n  .col-lg-pull-9 {\r\n    right: 75%;\r\n  }\r\n  .col-lg-pull-8 {\r\n    right: 66.66666667%;\r\n  }\r\n  .col-lg-pull-7 {\r\n    right: 58.33333333%;\r\n  }\r\n  .col-lg-pull-6 {\r\n    right: 50%;\r\n  }\r\n  .col-lg-pull-5 {\r\n    right: 41.66666667%;\r\n  }\r\n  .col-lg-pull-4 {\r\n    right: 33.33333333%;\r\n  }\r\n  .col-lg-pull-3 {\r\n    right: 25%;\r\n  }\r\n  .col-lg-pull-2 {\r\n    right: 16.66666667%;\r\n  }\r\n  .col-lg-pull-1 {\r\n    right: 8.33333333%;\r\n  }\r\n  .col-lg-pull-0 {\r\n    right: auto;\r\n  }\r\n  .col-lg-push-12 {\r\n    left: 100%;\r\n  }\r\n  .col-lg-push-11 {\r\n    left: 91.66666667%;\r\n  }\r\n  .col-lg-push-10 {\r\n    left: 83.33333333%;\r\n  }\r\n  .col-lg-push-9 {\r\n    left: 75%;\r\n  }\r\n  .col-lg-push-8 {\r\n    left: 66.66666667%;\r\n  }\r\n  .col-lg-push-7 {\r\n    left: 58.33333333%;\r\n  }\r\n  .col-lg-push-6 {\r\n    left: 50%;\r\n  }\r\n  .col-lg-push-5 {\r\n    left: 41.66666667%;\r\n  }\r\n  .col-lg-push-4 {\r\n    left: 33.33333333%;\r\n  }\r\n  .col-lg-push-3 {\r\n    left: 25%;\r\n  }\r\n  .col-lg-push-2 {\r\n    left: 16.66666667%;\r\n  }\r\n  .col-lg-push-1 {\r\n    left: 8.33333333%;\r\n  }\r\n  .col-lg-push-0 {\r\n    left: auto;\r\n  }\r\n  .col-lg-offset-12 {\r\n    margin-left: 100%;\r\n  }\r\n  .col-lg-offset-11 {\r\n    margin-left: 91.66666667%;\r\n  }\r\n  .col-lg-offset-10 {\r\n    margin-left: 83.33333333%;\r\n  }\r\n  .col-lg-offset-9 {\r\n    margin-left: 75%;\r\n  }\r\n  .col-lg-offset-8 {\r\n    margin-left: 66.66666667%;\r\n  }\r\n  .col-lg-offset-7 {\r\n    margin-left: 58.33333333%;\r\n  }\r\n  .col-lg-offset-6 {\r\n    margin-left: 50%;\r\n  }\r\n  .col-lg-offset-5 {\r\n    margin-left: 41.66666667%;\r\n  }\r\n  .col-lg-offset-4 {\r\n    margin-left: 33.33333333%;\r\n  }\r\n  .col-lg-offset-3 {\r\n    margin-left: 25%;\r\n  }\r\n  .col-lg-offset-2 {\r\n    margin-left: 16.66666667%;\r\n  }\r\n  .col-lg-offset-1 {\r\n    margin-left: 8.33333333%;\r\n  }\r\n  .col-lg-offset-0 {\r\n    margin-left: 0;\r\n  }\r\n}\r\ntable {\r\n  background-color: transparent;\r\n}\r\ncaption {\r\n  padding-top: 8px;\r\n  padding-bottom: 8px;\r\n  color: #777;\r\n  text-align: left;\r\n}\r\nth {\r\n  text-align: left;\r\n}\r\n.table {\r\n  width: 100%;\r\n  max-width: 100%;\r\n  margin-bottom: 20px;\r\n}\r\n.table > thead > tr > th,\r\n.table > tbody > tr > th,\r\n.table > tfoot > tr > th,\r\n.table > thead > tr > td,\r\n.table > tbody > tr > td,\r\n.table > tfoot > tr > td {\r\n  padding: 8px;\r\n  line-height: 1.42857143;\r\n  vertical-align: top;\r\n  border-top: 1px solid #ddd;\r\n}\r\n.table > thead > tr > th {\r\n  vertical-align: bottom;\r\n  border-bottom: 2px solid #ddd;\r\n}\r\n.table > caption + thead > tr:first-child > th,\r\n.table > colgroup + thead > tr:first-child > th,\r\n.table > thead:first-child > tr:first-child > th,\r\n.table > caption + thead > tr:first-child > td,\r\n.table > colgroup + thead > tr:first-child > td,\r\n.table > thead:first-child > tr:first-child > td {\r\n  border-top: 0;\r\n}\r\n.table > tbody + tbody {\r\n  border-top: 2px solid #ddd;\r\n}\r\n.table .table {\r\n  background-color: #fff;\r\n}\r\n.table-condensed > thead > tr > th,\r\n.table-condensed > tbody > tr > th,\r\n.table-condensed > tfoot > tr > th,\r\n.table-condensed > thead > tr > td,\r\n.table-condensed > tbody > tr > td,\r\n.table-condensed > tfoot > tr > td {\r\n  padding: 5px;\r\n}\r\n.table-bordered {\r\n  border: 1px solid #ddd;\r\n}\r\n.table-bordered > thead > tr > th,\r\n.table-bordered > tbody > tr > th,\r\n.table-bordered > tfoot > tr > th,\r\n.table-bordered > thead > tr > td,\r\n.table-bordered > tbody > tr > td,\r\n.table-bordered > tfoot > tr > td {\r\n  border: 1px solid #ddd;\r\n}\r\n.table-bordered > thead > tr > th,\r\n.table-bordered > thead > tr > td {\r\n  border-bottom-width: 2px;\r\n}\r\n.table-striped > tbody > tr:nth-of-type(odd) {\r\n  background-color: #f9f9f9;\r\n}\r\n.table-hover > tbody > tr:hover {\r\n  background-color: #f5f5f5;\r\n}\r\ntable col[class*=\"col-\"] {\r\n  position: static;\r\n  display: table-column;\r\n  float: none;\r\n}\r\ntable td[class*=\"col-\"],\r\ntable th[class*=\"col-\"] {\r\n  position: static;\r\n  display: table-cell;\r\n  float: none;\r\n}\r\n.table > thead > tr > td.active,\r\n.table > tbody > tr > td.active,\r\n.table > tfoot > tr > td.active,\r\n.table > thead > tr > th.active,\r\n.table > tbody > tr > th.active,\r\n.table > tfoot > tr > th.active,\r\n.table > thead > tr.active > td,\r\n.table > tbody > tr.active > td,\r\n.table > tfoot > tr.active > td,\r\n.table > thead > tr.active > th,\r\n.table > tbody > tr.active > th,\r\n.table > tfoot > tr.active > th {\r\n  background-color: #f5f5f5;\r\n}\r\n.table-hover > tbody > tr > td.active:hover,\r\n.table-hover > tbody > tr > th.active:hover,\r\n.table-hover > tbody > tr.active:hover > td,\r\n.table-hover > tbody > tr:hover > .active,\r\n.table-hover > tbody > tr.active:hover > th {\r\n  background-color: #e8e8e8;\r\n}\r\n.table > thead > tr > td.success,\r\n.table > tbody > tr > td.success,\r\n.table > tfoot > tr > td.success,\r\n.table > thead > tr > th.success,\r\n.table > tbody > tr > th.success,\r\n.table > tfoot > tr > th.success,\r\n.table > thead > tr.success > td,\r\n.table > tbody > tr.success > td,\r\n.table > tfoot > tr.success > td,\r\n.table > thead > tr.success > th,\r\n.table > tbody > tr.success > th,\r\n.table > tfoot > tr.success > th {\r\n  background-color: #dff0d8;\r\n}\r\n.table-hover > tbody > tr > td.success:hover,\r\n.table-hover > tbody > tr > th.success:hover,\r\n.table-hover > tbody > tr.success:hover > td,\r\n.table-hover > tbody > tr:hover > .success,\r\n.table-hover > tbody > tr.success:hover > th {\r\n  background-color: #d0e9c6;\r\n}\r\n.table > thead > tr > td.info,\r\n.table > tbody > tr > td.info,\r\n.table > tfoot > tr > td.info,\r\n.table > thead > tr > th.info,\r\n.table > tbody > tr > th.info,\r\n.table > tfoot > tr > th.info,\r\n.table > thead > tr.info > td,\r\n.table > tbody > tr.info > td,\r\n.table > tfoot > tr.info > td,\r\n.table > thead > tr.info > th,\r\n.table > tbody > tr.info > th,\r\n.table > tfoot > tr.info > th {\r\n  background-color: #d9edf7;\r\n}\r\n.table-hover > tbody > tr > td.info:hover,\r\n.table-hover > tbody > tr > th.info:hover,\r\n.table-hover > tbody > tr.info:hover > td,\r\n.table-hover > tbody > tr:hover > .info,\r\n.table-hover > tbody > tr.info:hover > th {\r\n  background-color: #c4e3f3;\r\n}\r\n.table > thead > tr > td.warning,\r\n.table > tbody > tr > td.warning,\r\n.table > tfoot > tr > td.warning,\r\n.table > thead > tr > th.warning,\r\n.table > tbody > tr > th.warning,\r\n.table > tfoot > tr > th.warning,\r\n.table > thead > tr.warning > td,\r\n.table > tbody > tr.warning > td,\r\n.table > tfoot > tr.warning > td,\r\n.table > thead > tr.warning > th,\r\n.table > tbody > tr.warning > th,\r\n.table > tfoot > tr.warning > th {\r\n  background-color: #fcf8e3;\r\n}\r\n.table-hover > tbody > tr > td.warning:hover,\r\n.table-hover > tbody > tr > th.warning:hover,\r\n.table-hover > tbody > tr.warning:hover > td,\r\n.table-hover > tbody > tr:hover > .warning,\r\n.table-hover > tbody > tr.warning:hover > th {\r\n  background-color: #faf2cc;\r\n}\r\n.table > thead > tr > td.danger,\r\n.table > tbody > tr > td.danger,\r\n.table > tfoot > tr > td.danger,\r\n.table > thead > tr > th.danger,\r\n.table > tbody > tr > th.danger,\r\n.table > tfoot > tr > th.danger,\r\n.table > thead > tr.danger > td,\r\n.table > tbody > tr.danger > td,\r\n.table > tfoot > tr.danger > td,\r\n.table > thead > tr.danger > th,\r\n.table > tbody > tr.danger > th,\r\n.table > tfoot > tr.danger > th {\r\n  background-color: #f2dede;\r\n}\r\n.table-hover > tbody > tr > td.danger:hover,\r\n.table-hover > tbody > tr > th.danger:hover,\r\n.table-hover > tbody > tr.danger:hover > td,\r\n.table-hover > tbody > tr:hover > .danger,\r\n.table-hover > tbody > tr.danger:hover > th {\r\n  background-color: #ebcccc;\r\n}\r\n.table-responsive {\r\n  min-height: .01%;\r\n  overflow-x: auto;\r\n}\r\n@media screen and (max-width: 767px) {\r\n  .table-responsive {\r\n    width: 100%;\r\n    margin-bottom: 15px;\r\n    overflow-y: hidden;\r\n    -ms-overflow-style: -ms-autohiding-scrollbar;\r\n    border: 1px solid #ddd;\r\n  }\r\n  .table-responsive > .table {\r\n    margin-bottom: 0;\r\n  }\r\n  .table-responsive > .table > thead > tr > th,\r\n  .table-responsive > .table > tbody > tr > th,\r\n  .table-responsive > .table > tfoot > tr > th,\r\n  .table-responsive > .table > thead > tr > td,\r\n  .table-responsive > .table > tbody > tr > td,\r\n  .table-responsive > .table > tfoot > tr > td {\r\n    white-space: nowrap;\r\n  }\r\n  .table-responsive > .table-bordered {\r\n    border: 0;\r\n  }\r\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\r\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\r\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\r\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\r\n    border-left: 0;\r\n  }\r\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\r\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\r\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\r\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\r\n    border-right: 0;\r\n  }\r\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\r\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\r\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\r\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\r\n    border-bottom: 0;\r\n  }\r\n}\r\nfieldset {\r\n  min-width: 0;\r\n  padding: 0;\r\n  margin: 0;\r\n  border: 0;\r\n}\r\nlegend {\r\n  display: block;\r\n  width: 100%;\r\n  padding: 0;\r\n  margin-bottom: 20px;\r\n  font-size: 21px;\r\n  line-height: inherit;\r\n  color: #333;\r\n  border: 0;\r\n  border-bottom: 1px solid #e5e5e5;\r\n}\r\nlabel {\r\n  display: inline-block;\r\n  max-width: 100%;\r\n  margin-bottom: 5px;\r\n  font-weight: bold;\r\n}\r\ninput[type=\"search\"] {\r\n  box-sizing: border-box;\r\n}\r\ninput[type=\"radio\"],\r\ninput[type=\"checkbox\"] {\r\n  margin: 4px 0 0;\r\n  margin-top: 1px \\9;\r\n  line-height: normal;\r\n}\r\ninput[type=\"file\"] {\r\n  display: block;\r\n}\r\ninput[type=\"range\"] {\r\n  display: block;\r\n  width: 100%;\r\n}\r\nselect[multiple],\r\nselect[size] {\r\n  height: auto;\r\n}\r\ninput[type=\"file\"]:focus,\r\ninput[type=\"radio\"]:focus,\r\ninput[type=\"checkbox\"]:focus {\r\n  outline: thin dotted;\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px;\r\n}\r\noutput {\r\n  display: block;\r\n  padding-top: 7px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #555;\r\n}\r\n.form-control {\r\n  display: block;\r\n  width: 100%;\r\n  height: 34px;\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #555;\r\n  background-color: #fff;\r\n  background-image: none;\r\n  border: 1px solid #ccc;\r\n  border-radius: 4px;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\r\n  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\r\n          -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\r\n          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\r\n}\r\n.form-control:focus {\r\n  border-color: #66afe9;\r\n  outline: 0;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);\r\n}\r\n.form-control::-moz-placeholder {\r\n  color: #999;\r\n  opacity: 1;\r\n}\r\n.form-control:-ms-input-placeholder {\r\n  color: #999;\r\n}\r\n.form-control::-webkit-input-placeholder {\r\n  color: #999;\r\n}\r\n.form-control[disabled],\r\n.form-control[readonly],\r\nfieldset[disabled] .form-control {\r\n  background-color: #eee;\r\n  opacity: 1;\r\n}\r\n.form-control[disabled],\r\nfieldset[disabled] .form-control {\r\n  cursor: not-allowed;\r\n}\r\ntextarea.form-control {\r\n  height: auto;\r\n}\r\ninput[type=\"search\"] {\r\n  -webkit-appearance: none;\r\n}\r\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\r\n  input[type=\"date\"].form-control,\r\n  input[type=\"time\"].form-control,\r\n  input[type=\"datetime-local\"].form-control,\r\n  input[type=\"month\"].form-control {\r\n    line-height: 34px;\r\n  }\r\n  input[type=\"date\"].input-sm,\r\n  input[type=\"time\"].input-sm,\r\n  input[type=\"datetime-local\"].input-sm,\r\n  input[type=\"month\"].input-sm,\r\n  .input-group-sm input[type=\"date\"],\r\n  .input-group-sm input[type=\"time\"],\r\n  .input-group-sm input[type=\"datetime-local\"],\r\n  .input-group-sm input[type=\"month\"] {\r\n    line-height: 30px;\r\n  }\r\n  input[type=\"date\"].input-lg,\r\n  input[type=\"time\"].input-lg,\r\n  input[type=\"datetime-local\"].input-lg,\r\n  input[type=\"month\"].input-lg,\r\n  .input-group-lg input[type=\"date\"],\r\n  .input-group-lg input[type=\"time\"],\r\n  .input-group-lg input[type=\"datetime-local\"],\r\n  .input-group-lg input[type=\"month\"] {\r\n    line-height: 46px;\r\n  }\r\n}\r\n.form-group {\r\n  margin-bottom: 15px;\r\n}\r\n.radio,\r\n.checkbox {\r\n  position: relative;\r\n  display: block;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n.radio label,\r\n.checkbox label {\r\n  min-height: 20px;\r\n  padding-left: 20px;\r\n  margin-bottom: 0;\r\n  font-weight: normal;\r\n  cursor: pointer;\r\n}\r\n.radio input[type=\"radio\"],\r\n.radio-inline input[type=\"radio\"],\r\n.checkbox input[type=\"checkbox\"],\r\n.checkbox-inline input[type=\"checkbox\"] {\r\n  position: absolute;\r\n  margin-top: 4px \\9;\r\n  margin-left: -20px;\r\n}\r\n.radio + .radio,\r\n.checkbox + .checkbox {\r\n  margin-top: -5px;\r\n}\r\n.radio-inline,\r\n.checkbox-inline {\r\n  position: relative;\r\n  display: inline-block;\r\n  padding-left: 20px;\r\n  margin-bottom: 0;\r\n  font-weight: normal;\r\n  vertical-align: middle;\r\n  cursor: pointer;\r\n}\r\n.radio-inline + .radio-inline,\r\n.checkbox-inline + .checkbox-inline {\r\n  margin-top: 0;\r\n  margin-left: 10px;\r\n}\r\ninput[type=\"radio\"][disabled],\r\ninput[type=\"checkbox\"][disabled],\r\ninput[type=\"radio\"].disabled,\r\ninput[type=\"checkbox\"].disabled,\r\nfieldset[disabled] input[type=\"radio\"],\r\nfieldset[disabled] input[type=\"checkbox\"] {\r\n  cursor: not-allowed;\r\n}\r\n.radio-inline.disabled,\r\n.checkbox-inline.disabled,\r\nfieldset[disabled] .radio-inline,\r\nfieldset[disabled] .checkbox-inline {\r\n  cursor: not-allowed;\r\n}\r\n.radio.disabled label,\r\n.checkbox.disabled label,\r\nfieldset[disabled] .radio label,\r\nfieldset[disabled] .checkbox label {\r\n  cursor: not-allowed;\r\n}\r\n.form-control-static {\r\n  min-height: 34px;\r\n  padding-top: 7px;\r\n  padding-bottom: 7px;\r\n  margin-bottom: 0;\r\n}\r\n.form-control-static.input-lg,\r\n.form-control-static.input-sm {\r\n  padding-right: 0;\r\n  padding-left: 0;\r\n}\r\n.input-sm {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\nselect.input-sm {\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\ntextarea.input-sm,\r\nselect[multiple].input-sm {\r\n  height: auto;\r\n}\r\n.form-group-sm .form-control {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\n.form-group-sm select.form-control {\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\n.form-group-sm textarea.form-control,\r\n.form-group-sm select[multiple].form-control {\r\n  height: auto;\r\n}\r\n.form-group-sm .form-control-static {\r\n  height: 30px;\r\n  min-height: 32px;\r\n  padding: 6px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n}\r\n.input-lg {\r\n  height: 46px;\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\nselect.input-lg {\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\ntextarea.input-lg,\r\nselect[multiple].input-lg {\r\n  height: auto;\r\n}\r\n.form-group-lg .form-control {\r\n  height: 46px;\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\n.form-group-lg select.form-control {\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\n.form-group-lg textarea.form-control,\r\n.form-group-lg select[multiple].form-control {\r\n  height: auto;\r\n}\r\n.form-group-lg .form-control-static {\r\n  height: 46px;\r\n  min-height: 38px;\r\n  padding: 11px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n}\r\n.has-feedback {\r\n  position: relative;\r\n}\r\n.has-feedback .form-control {\r\n  padding-right: 42.5px;\r\n}\r\n.form-control-feedback {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  pointer-events: none;\r\n}\r\n.input-lg + .form-control-feedback,\r\n.input-group-lg + .form-control-feedback,\r\n.form-group-lg .form-control + .form-control-feedback {\r\n  width: 46px;\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\n.input-sm + .form-control-feedback,\r\n.input-group-sm + .form-control-feedback,\r\n.form-group-sm .form-control + .form-control-feedback {\r\n  width: 30px;\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\n.has-success .help-block,\r\n.has-success .control-label,\r\n.has-success .radio,\r\n.has-success .checkbox,\r\n.has-success .radio-inline,\r\n.has-success .checkbox-inline,\r\n.has-success.radio label,\r\n.has-success.checkbox label,\r\n.has-success.radio-inline label,\r\n.has-success.checkbox-inline label {\r\n  color: #3c763d;\r\n}\r\n.has-success .form-control {\r\n  border-color: #3c763d;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\r\n}\r\n.has-success .form-control:focus {\r\n  border-color: #2b542c;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;\r\n}\r\n.has-success .input-group-addon {\r\n  color: #3c763d;\r\n  background-color: #dff0d8;\r\n  border-color: #3c763d;\r\n}\r\n.has-success .form-control-feedback {\r\n  color: #3c763d;\r\n}\r\n.has-warning .help-block,\r\n.has-warning .control-label,\r\n.has-warning .radio,\r\n.has-warning .checkbox,\r\n.has-warning .radio-inline,\r\n.has-warning .checkbox-inline,\r\n.has-warning.radio label,\r\n.has-warning.checkbox label,\r\n.has-warning.radio-inline label,\r\n.has-warning.checkbox-inline label {\r\n  color: #8a6d3b;\r\n}\r\n.has-warning .form-control {\r\n  border-color: #8a6d3b;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\r\n}\r\n.has-warning .form-control:focus {\r\n  border-color: #66512c;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;\r\n}\r\n.has-warning .input-group-addon {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n  border-color: #8a6d3b;\r\n}\r\n.has-warning .form-control-feedback {\r\n  color: #8a6d3b;\r\n}\r\n.has-error .help-block,\r\n.has-error .control-label,\r\n.has-error .radio,\r\n.has-error .checkbox,\r\n.has-error .radio-inline,\r\n.has-error .checkbox-inline,\r\n.has-error.radio label,\r\n.has-error.checkbox label,\r\n.has-error.radio-inline label,\r\n.has-error.checkbox-inline label {\r\n  color: #a94442;\r\n}\r\n.has-error .form-control {\r\n  border-color: #a94442;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\r\n}\r\n.has-error .form-control:focus {\r\n  border-color: #843534;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;\r\n}\r\n.has-error .input-group-addon {\r\n  color: #a94442;\r\n  background-color: #f2dede;\r\n  border-color: #a94442;\r\n}\r\n.has-error .form-control-feedback {\r\n  color: #a94442;\r\n}\r\n.has-feedback label ~ .form-control-feedback {\r\n  top: 25px;\r\n}\r\n.has-feedback label.sr-only ~ .form-control-feedback {\r\n  top: 0;\r\n}\r\n.help-block {\r\n  display: block;\r\n  margin-top: 5px;\r\n  margin-bottom: 10px;\r\n  color: #737373;\r\n}\r\n@media (min-width: 768px) {\r\n  .form-inline .form-group {\r\n    display: inline-block;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .form-control {\r\n    display: inline-block;\r\n    width: auto;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .form-control-static {\r\n    display: inline-block;\r\n  }\r\n  .form-inline .input-group {\r\n    display: inline-table;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .input-group .input-group-addon,\r\n  .form-inline .input-group .input-group-btn,\r\n  .form-inline .input-group .form-control {\r\n    width: auto;\r\n  }\r\n  .form-inline .input-group > .form-control {\r\n    width: 100%;\r\n  }\r\n  .form-inline .control-label {\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .radio,\r\n  .form-inline .checkbox {\r\n    display: inline-block;\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .radio label,\r\n  .form-inline .checkbox label {\r\n    padding-left: 0;\r\n  }\r\n  .form-inline .radio input[type=\"radio\"],\r\n  .form-inline .checkbox input[type=\"checkbox\"] {\r\n    position: relative;\r\n    margin-left: 0;\r\n  }\r\n  .form-inline .has-feedback .form-control-feedback {\r\n    top: 0;\r\n  }\r\n}\r\n.form-horizontal .radio,\r\n.form-horizontal .checkbox,\r\n.form-horizontal .radio-inline,\r\n.form-horizontal .checkbox-inline {\r\n  padding-top: 7px;\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n}\r\n.form-horizontal .radio,\r\n.form-horizontal .checkbox {\r\n  min-height: 27px;\r\n}\r\n.form-horizontal .form-group {\r\n  margin-right: -15px;\r\n  margin-left: -15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .form-horizontal .control-label {\r\n    padding-top: 7px;\r\n    margin-bottom: 0;\r\n    text-align: right;\r\n  }\r\n}\r\n.form-horizontal .has-feedback .form-control-feedback {\r\n  right: 15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .form-horizontal .form-group-lg .control-label {\r\n    padding-top: 14.333333px;\r\n    font-size: 18px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .form-horizontal .form-group-sm .control-label {\r\n    padding-top: 6px;\r\n    font-size: 12px;\r\n  }\r\n}\r\n.btn {\r\n  display: inline-block;\r\n  padding: 6px 12px;\r\n  margin-bottom: 0;\r\n  font-size: 14px;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n  -ms-touch-action: manipulation;\r\n      touch-action: manipulation;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n}\r\n.btn:focus,\r\n.btn:active:focus,\r\n.btn.active:focus,\r\n.btn.focus,\r\n.btn:active.focus,\r\n.btn.active.focus {\r\n  outline: thin dotted;\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px;\r\n}\r\n.btn:hover,\r\n.btn:focus,\r\n.btn.focus {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n.btn:active,\r\n.btn.active {\r\n  background-image: none;\r\n  outline: 0;\r\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\r\n}\r\n.btn.disabled,\r\n.btn[disabled],\r\nfieldset[disabled] .btn {\r\n  cursor: not-allowed;\r\n  filter: alpha(opacity=65);\r\n  box-shadow: none;\r\n  opacity: .65;\r\n}\r\na.btn.disabled,\r\nfieldset[disabled] a.btn {\r\n  pointer-events: none;\r\n}\r\n.btn-default {\r\n  color: #333;\r\n  background-color: #fff;\r\n  border-color: #ccc;\r\n}\r\n.btn-default:focus,\r\n.btn-default.focus {\r\n  color: #333;\r\n  background-color: #e6e6e6;\r\n  border-color: #8c8c8c;\r\n}\r\n.btn-default:hover {\r\n  color: #333;\r\n  background-color: #e6e6e6;\r\n  border-color: #adadad;\r\n}\r\n.btn-default:active,\r\n.btn-default.active,\r\n.open > .dropdown-toggle.btn-default {\r\n  color: #333;\r\n  background-color: #e6e6e6;\r\n  border-color: #adadad;\r\n}\r\n.btn-default:active:hover,\r\n.btn-default.active:hover,\r\n.open > .dropdown-toggle.btn-default:hover,\r\n.btn-default:active:focus,\r\n.btn-default.active:focus,\r\n.open > .dropdown-toggle.btn-default:focus,\r\n.btn-default:active.focus,\r\n.btn-default.active.focus,\r\n.open > .dropdown-toggle.btn-default.focus {\r\n  color: #333;\r\n  background-color: #d4d4d4;\r\n  border-color: #8c8c8c;\r\n}\r\n.btn-default:active,\r\n.btn-default.active,\r\n.open > .dropdown-toggle.btn-default {\r\n  background-image: none;\r\n}\r\n.btn-default.disabled,\r\n.btn-default[disabled],\r\nfieldset[disabled] .btn-default,\r\n.btn-default.disabled:hover,\r\n.btn-default[disabled]:hover,\r\nfieldset[disabled] .btn-default:hover,\r\n.btn-default.disabled:focus,\r\n.btn-default[disabled]:focus,\r\nfieldset[disabled] .btn-default:focus,\r\n.btn-default.disabled.focus,\r\n.btn-default[disabled].focus,\r\nfieldset[disabled] .btn-default.focus,\r\n.btn-default.disabled:active,\r\n.btn-default[disabled]:active,\r\nfieldset[disabled] .btn-default:active,\r\n.btn-default.disabled.active,\r\n.btn-default[disabled].active,\r\nfieldset[disabled] .btn-default.active {\r\n  background-color: #fff;\r\n  border-color: #ccc;\r\n}\r\n.btn-default .badge {\r\n  color: #fff;\r\n  background-color: #333;\r\n}\r\n.btn-primary {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n  border-color: #2e6da4;\r\n}\r\n.btn-primary:focus,\r\n.btn-primary.focus {\r\n  color: #fff;\r\n  background-color: #286090;\r\n  border-color: #122b40;\r\n}\r\n.btn-primary:hover {\r\n  color: #fff;\r\n  background-color: #286090;\r\n  border-color: #204d74;\r\n}\r\n.btn-primary:active,\r\n.btn-primary.active,\r\n.open > .dropdown-toggle.btn-primary {\r\n  color: #fff;\r\n  background-color: #286090;\r\n  border-color: #204d74;\r\n}\r\n.btn-primary:active:hover,\r\n.btn-primary.active:hover,\r\n.open > .dropdown-toggle.btn-primary:hover,\r\n.btn-primary:active:focus,\r\n.btn-primary.active:focus,\r\n.open > .dropdown-toggle.btn-primary:focus,\r\n.btn-primary:active.focus,\r\n.btn-primary.active.focus,\r\n.open > .dropdown-toggle.btn-primary.focus {\r\n  color: #fff;\r\n  background-color: #204d74;\r\n  border-color: #122b40;\r\n}\r\n.btn-primary:active,\r\n.btn-primary.active,\r\n.open > .dropdown-toggle.btn-primary {\r\n  background-image: none;\r\n}\r\n.btn-primary.disabled,\r\n.btn-primary[disabled],\r\nfieldset[disabled] .btn-primary,\r\n.btn-primary.disabled:hover,\r\n.btn-primary[disabled]:hover,\r\nfieldset[disabled] .btn-primary:hover,\r\n.btn-primary.disabled:focus,\r\n.btn-primary[disabled]:focus,\r\nfieldset[disabled] .btn-primary:focus,\r\n.btn-primary.disabled.focus,\r\n.btn-primary[disabled].focus,\r\nfieldset[disabled] .btn-primary.focus,\r\n.btn-primary.disabled:active,\r\n.btn-primary[disabled]:active,\r\nfieldset[disabled] .btn-primary:active,\r\n.btn-primary.disabled.active,\r\n.btn-primary[disabled].active,\r\nfieldset[disabled] .btn-primary.active {\r\n  background-color: #337ab7;\r\n  border-color: #2e6da4;\r\n}\r\n.btn-primary .badge {\r\n  color: #337ab7;\r\n  background-color: #fff;\r\n}\r\n.btn-success {\r\n  color: #fff;\r\n  background-color: #5cb85c;\r\n  border-color: #4cae4c;\r\n}\r\n.btn-success:focus,\r\n.btn-success.focus {\r\n  color: #fff;\r\n  background-color: #449d44;\r\n  border-color: #255625;\r\n}\r\n.btn-success:hover {\r\n  color: #fff;\r\n  background-color: #449d44;\r\n  border-color: #398439;\r\n}\r\n.btn-success:active,\r\n.btn-success.active,\r\n.open > .dropdown-toggle.btn-success {\r\n  color: #fff;\r\n  background-color: #449d44;\r\n  border-color: #398439;\r\n}\r\n.btn-success:active:hover,\r\n.btn-success.active:hover,\r\n.open > .dropdown-toggle.btn-success:hover,\r\n.btn-success:active:focus,\r\n.btn-success.active:focus,\r\n.open > .dropdown-toggle.btn-success:focus,\r\n.btn-success:active.focus,\r\n.btn-success.active.focus,\r\n.open > .dropdown-toggle.btn-success.focus {\r\n  color: #fff;\r\n  background-color: #398439;\r\n  border-color: #255625;\r\n}\r\n.btn-success:active,\r\n.btn-success.active,\r\n.open > .dropdown-toggle.btn-success {\r\n  background-image: none;\r\n}\r\n.btn-success.disabled,\r\n.btn-success[disabled],\r\nfieldset[disabled] .btn-success,\r\n.btn-success.disabled:hover,\r\n.btn-success[disabled]:hover,\r\nfieldset[disabled] .btn-success:hover,\r\n.btn-success.disabled:focus,\r\n.btn-success[disabled]:focus,\r\nfieldset[disabled] .btn-success:focus,\r\n.btn-success.disabled.focus,\r\n.btn-success[disabled].focus,\r\nfieldset[disabled] .btn-success.focus,\r\n.btn-success.disabled:active,\r\n.btn-success[disabled]:active,\r\nfieldset[disabled] .btn-success:active,\r\n.btn-success.disabled.active,\r\n.btn-success[disabled].active,\r\nfieldset[disabled] .btn-success.active {\r\n  background-color: #5cb85c;\r\n  border-color: #4cae4c;\r\n}\r\n.btn-success .badge {\r\n  color: #5cb85c;\r\n  background-color: #fff;\r\n}\r\n.btn-info {\r\n  color: #fff;\r\n  background-color: #5bc0de;\r\n  border-color: #46b8da;\r\n}\r\n.btn-info:focus,\r\n.btn-info.focus {\r\n  color: #fff;\r\n  background-color: #31b0d5;\r\n  border-color: #1b6d85;\r\n}\r\n.btn-info:hover {\r\n  color: #fff;\r\n  background-color: #31b0d5;\r\n  border-color: #269abc;\r\n}\r\n.btn-info:active,\r\n.btn-info.active,\r\n.open > .dropdown-toggle.btn-info {\r\n  color: #fff;\r\n  background-color: #31b0d5;\r\n  border-color: #269abc;\r\n}\r\n.btn-info:active:hover,\r\n.btn-info.active:hover,\r\n.open > .dropdown-toggle.btn-info:hover,\r\n.btn-info:active:focus,\r\n.btn-info.active:focus,\r\n.open > .dropdown-toggle.btn-info:focus,\r\n.btn-info:active.focus,\r\n.btn-info.active.focus,\r\n.open > .dropdown-toggle.btn-info.focus {\r\n  color: #fff;\r\n  background-color: #269abc;\r\n  border-color: #1b6d85;\r\n}\r\n.btn-info:active,\r\n.btn-info.active,\r\n.open > .dropdown-toggle.btn-info {\r\n  background-image: none;\r\n}\r\n.btn-info.disabled,\r\n.btn-info[disabled],\r\nfieldset[disabled] .btn-info,\r\n.btn-info.disabled:hover,\r\n.btn-info[disabled]:hover,\r\nfieldset[disabled] .btn-info:hover,\r\n.btn-info.disabled:focus,\r\n.btn-info[disabled]:focus,\r\nfieldset[disabled] .btn-info:focus,\r\n.btn-info.disabled.focus,\r\n.btn-info[disabled].focus,\r\nfieldset[disabled] .btn-info.focus,\r\n.btn-info.disabled:active,\r\n.btn-info[disabled]:active,\r\nfieldset[disabled] .btn-info:active,\r\n.btn-info.disabled.active,\r\n.btn-info[disabled].active,\r\nfieldset[disabled] .btn-info.active {\r\n  background-color: #5bc0de;\r\n  border-color: #46b8da;\r\n}\r\n.btn-info .badge {\r\n  color: #5bc0de;\r\n  background-color: #fff;\r\n}\r\n.btn-warning {\r\n  color: #fff;\r\n  background-color: #f0ad4e;\r\n  border-color: #eea236;\r\n}\r\n.btn-warning:focus,\r\n.btn-warning.focus {\r\n  color: #fff;\r\n  background-color: #ec971f;\r\n  border-color: #985f0d;\r\n}\r\n.btn-warning:hover {\r\n  color: #fff;\r\n  background-color: #ec971f;\r\n  border-color: #d58512;\r\n}\r\n.btn-warning:active,\r\n.btn-warning.active,\r\n.open > .dropdown-toggle.btn-warning {\r\n  color: #fff;\r\n  background-color: #ec971f;\r\n  border-color: #d58512;\r\n}\r\n.btn-warning:active:hover,\r\n.btn-warning.active:hover,\r\n.open > .dropdown-toggle.btn-warning:hover,\r\n.btn-warning:active:focus,\r\n.btn-warning.active:focus,\r\n.open > .dropdown-toggle.btn-warning:focus,\r\n.btn-warning:active.focus,\r\n.btn-warning.active.focus,\r\n.open > .dropdown-toggle.btn-warning.focus {\r\n  color: #fff;\r\n  background-color: #d58512;\r\n  border-color: #985f0d;\r\n}\r\n.btn-warning:active,\r\n.btn-warning.active,\r\n.open > .dropdown-toggle.btn-warning {\r\n  background-image: none;\r\n}\r\n.btn-warning.disabled,\r\n.btn-warning[disabled],\r\nfieldset[disabled] .btn-warning,\r\n.btn-warning.disabled:hover,\r\n.btn-warning[disabled]:hover,\r\nfieldset[disabled] .btn-warning:hover,\r\n.btn-warning.disabled:focus,\r\n.btn-warning[disabled]:focus,\r\nfieldset[disabled] .btn-warning:focus,\r\n.btn-warning.disabled.focus,\r\n.btn-warning[disabled].focus,\r\nfieldset[disabled] .btn-warning.focus,\r\n.btn-warning.disabled:active,\r\n.btn-warning[disabled]:active,\r\nfieldset[disabled] .btn-warning:active,\r\n.btn-warning.disabled.active,\r\n.btn-warning[disabled].active,\r\nfieldset[disabled] .btn-warning.active {\r\n  background-color: #f0ad4e;\r\n  border-color: #eea236;\r\n}\r\n.btn-warning .badge {\r\n  color: #f0ad4e;\r\n  background-color: #fff;\r\n}\r\n.btn-danger {\r\n  color: #fff;\r\n  background-color: #d9534f;\r\n  border-color: #d43f3a;\r\n}\r\n.btn-danger:focus,\r\n.btn-danger.focus {\r\n  color: #fff;\r\n  background-color: #c9302c;\r\n  border-color: #761c19;\r\n}\r\n.btn-danger:hover {\r\n  color: #fff;\r\n  background-color: #c9302c;\r\n  border-color: #ac2925;\r\n}\r\n.btn-danger:active,\r\n.btn-danger.active,\r\n.open > .dropdown-toggle.btn-danger {\r\n  color: #fff;\r\n  background-color: #c9302c;\r\n  border-color: #ac2925;\r\n}\r\n.btn-danger:active:hover,\r\n.btn-danger.active:hover,\r\n.open > .dropdown-toggle.btn-danger:hover,\r\n.btn-danger:active:focus,\r\n.btn-danger.active:focus,\r\n.open > .dropdown-toggle.btn-danger:focus,\r\n.btn-danger:active.focus,\r\n.btn-danger.active.focus,\r\n.open > .dropdown-toggle.btn-danger.focus {\r\n  color: #fff;\r\n  background-color: #ac2925;\r\n  border-color: #761c19;\r\n}\r\n.btn-danger:active,\r\n.btn-danger.active,\r\n.open > .dropdown-toggle.btn-danger {\r\n  background-image: none;\r\n}\r\n.btn-danger.disabled,\r\n.btn-danger[disabled],\r\nfieldset[disabled] .btn-danger,\r\n.btn-danger.disabled:hover,\r\n.btn-danger[disabled]:hover,\r\nfieldset[disabled] .btn-danger:hover,\r\n.btn-danger.disabled:focus,\r\n.btn-danger[disabled]:focus,\r\nfieldset[disabled] .btn-danger:focus,\r\n.btn-danger.disabled.focus,\r\n.btn-danger[disabled].focus,\r\nfieldset[disabled] .btn-danger.focus,\r\n.btn-danger.disabled:active,\r\n.btn-danger[disabled]:active,\r\nfieldset[disabled] .btn-danger:active,\r\n.btn-danger.disabled.active,\r\n.btn-danger[disabled].active,\r\nfieldset[disabled] .btn-danger.active {\r\n  background-color: #d9534f;\r\n  border-color: #d43f3a;\r\n}\r\n.btn-danger .badge {\r\n  color: #d9534f;\r\n  background-color: #fff;\r\n}\r\n.btn-link {\r\n  font-weight: normal;\r\n  color: #337ab7;\r\n  border-radius: 0;\r\n}\r\n.btn-link,\r\n.btn-link:active,\r\n.btn-link.active,\r\n.btn-link[disabled],\r\nfieldset[disabled] .btn-link {\r\n  background-color: transparent;\r\n  box-shadow: none;\r\n}\r\n.btn-link,\r\n.btn-link:hover,\r\n.btn-link:focus,\r\n.btn-link:active {\r\n  border-color: transparent;\r\n}\r\n.btn-link:hover,\r\n.btn-link:focus {\r\n  color: #23527c;\r\n  text-decoration: underline;\r\n  background-color: transparent;\r\n}\r\n.btn-link[disabled]:hover,\r\nfieldset[disabled] .btn-link:hover,\r\n.btn-link[disabled]:focus,\r\nfieldset[disabled] .btn-link:focus {\r\n  color: #777;\r\n  text-decoration: none;\r\n}\r\n.btn-lg,\r\n.btn-group-lg > .btn {\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\n.btn-sm,\r\n.btn-group-sm > .btn {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\n.btn-xs,\r\n.btn-group-xs > .btn {\r\n  padding: 1px 5px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\n.btn-block {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n.btn-block + .btn-block {\r\n  margin-top: 5px;\r\n}\r\ninput[type=\"submit\"].btn-block,\r\ninput[type=\"reset\"].btn-block,\r\ninput[type=\"button\"].btn-block {\r\n  width: 100%;\r\n}\r\n.fade {\r\n  opacity: 0;\r\n  -webkit-transition: opacity .15s linear;\r\n          transition: opacity .15s linear;\r\n}\r\n.fade.in {\r\n  opacity: 1;\r\n}\r\n.collapse {\r\n  display: none;\r\n}\r\n.collapse.in {\r\n  display: block;\r\n}\r\ntr.collapse.in {\r\n  display: table-row;\r\n}\r\ntbody.collapse.in {\r\n  display: table-row-group;\r\n}\r\n.collapsing {\r\n  position: relative;\r\n  height: 0;\r\n  overflow: hidden;\r\n  -webkit-transition-timing-function: ease;\r\n          transition-timing-function: ease;\r\n  -webkit-transition-duration: .35s;\r\n          transition-duration: .35s;\r\n  -webkit-transition-property: height, visibility;\r\n          transition-property: height, visibility;\r\n}\r\n.caret {\r\n  display: inline-block;\r\n  width: 0;\r\n  height: 0;\r\n  margin-left: 2px;\r\n  vertical-align: middle;\r\n  border-top: 4px dashed;\r\n  border-top: 4px solid \\9;\r\n  border-right: 4px solid transparent;\r\n  border-left: 4px solid transparent;\r\n}\r\n.dropup,\r\n.dropdown {\r\n  position: relative;\r\n}\r\n.dropdown-toggle:focus {\r\n  outline: 0;\r\n}\r\n.dropdown-menu {\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 0;\r\n  z-index: 1000;\r\n  display: none;\r\n  float: left;\r\n  min-width: 160px;\r\n  padding: 5px 0;\r\n  margin: 2px 0 0;\r\n  font-size: 14px;\r\n  text-align: left;\r\n  list-style: none;\r\n  background-color: #fff;\r\n  background-clip: padding-box;\r\n  border: 1px solid #ccc;\r\n  border: 1px solid rgba(0, 0, 0, .15);\r\n  border-radius: 4px;\r\n  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\r\n}\r\n.dropdown-menu.pull-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.dropdown-menu .divider {\r\n  height: 1px;\r\n  margin: 9px 0;\r\n  overflow: hidden;\r\n  background-color: #e5e5e5;\r\n}\r\n.dropdown-menu > li > a {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  clear: both;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  color: #333;\r\n  white-space: nowrap;\r\n}\r\n.dropdown-menu > li > a:hover,\r\n.dropdown-menu > li > a:focus {\r\n  color: #262626;\r\n  text-decoration: none;\r\n  background-color: #f5f5f5;\r\n}\r\n.dropdown-menu > .active > a,\r\n.dropdown-menu > .active > a:hover,\r\n.dropdown-menu > .active > a:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  background-color: #337ab7;\r\n  outline: 0;\r\n}\r\n.dropdown-menu > .disabled > a,\r\n.dropdown-menu > .disabled > a:hover,\r\n.dropdown-menu > .disabled > a:focus {\r\n  color: #777;\r\n}\r\n.dropdown-menu > .disabled > a:hover,\r\n.dropdown-menu > .disabled > a:focus {\r\n  text-decoration: none;\r\n  cursor: not-allowed;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\r\n}\r\n.open > .dropdown-menu {\r\n  display: block;\r\n}\r\n.open > a {\r\n  outline: 0;\r\n}\r\n.dropdown-menu-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.dropdown-menu-left {\r\n  right: auto;\r\n  left: 0;\r\n}\r\n.dropdown-header {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  font-size: 12px;\r\n  line-height: 1.42857143;\r\n  color: #777;\r\n  white-space: nowrap;\r\n}\r\n.dropdown-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 990;\r\n}\r\n.pull-right > .dropdown-menu {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.dropup .caret,\r\n.navbar-fixed-bottom .dropdown .caret {\r\n  content: \"\";\r\n  border-top: 0;\r\n  border-bottom: 4px dashed;\r\n  border-bottom: 4px solid \\9;\r\n}\r\n.dropup .dropdown-menu,\r\n.navbar-fixed-bottom .dropdown .dropdown-menu {\r\n  top: auto;\r\n  bottom: 100%;\r\n  margin-bottom: 2px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-right .dropdown-menu {\r\n    right: 0;\r\n    left: auto;\r\n  }\r\n  .navbar-right .dropdown-menu-left {\r\n    right: auto;\r\n    left: 0;\r\n  }\r\n}\r\n.btn-group,\r\n.btn-group-vertical {\r\n  position: relative;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n.btn-group > .btn,\r\n.btn-group-vertical > .btn {\r\n  position: relative;\r\n  float: left;\r\n}\r\n.btn-group > .btn:hover,\r\n.btn-group-vertical > .btn:hover,\r\n.btn-group > .btn:focus,\r\n.btn-group-vertical > .btn:focus,\r\n.btn-group > .btn:active,\r\n.btn-group-vertical > .btn:active,\r\n.btn-group > .btn.active,\r\n.btn-group-vertical > .btn.active {\r\n  z-index: 2;\r\n}\r\n.btn-group .btn + .btn,\r\n.btn-group .btn + .btn-group,\r\n.btn-group .btn-group + .btn,\r\n.btn-group .btn-group + .btn-group {\r\n  margin-left: -1px;\r\n}\r\n.btn-toolbar {\r\n  margin-left: -5px;\r\n}\r\n.btn-toolbar .btn,\r\n.btn-toolbar .btn-group,\r\n.btn-toolbar .input-group {\r\n  float: left;\r\n}\r\n.btn-toolbar > .btn,\r\n.btn-toolbar > .btn-group,\r\n.btn-toolbar > .input-group {\r\n  margin-left: 5px;\r\n}\r\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\r\n  border-radius: 0;\r\n}\r\n.btn-group > .btn:first-child {\r\n  margin-left: 0;\r\n}\r\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\r\n  border-top-right-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n}\r\n.btn-group > .btn:last-child:not(:first-child),\r\n.btn-group > .dropdown-toggle:not(:first-child) {\r\n  border-top-left-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.btn-group > .btn-group {\r\n  float: left;\r\n}\r\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\r\n  border-radius: 0;\r\n}\r\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\r\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\r\n  border-top-right-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n}\r\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\r\n  border-top-left-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.btn-group .dropdown-toggle:active,\r\n.btn-group.open .dropdown-toggle {\r\n  outline: 0;\r\n}\r\n.btn-group > .btn + .dropdown-toggle {\r\n  padding-right: 8px;\r\n  padding-left: 8px;\r\n}\r\n.btn-group > .btn-lg + .dropdown-toggle {\r\n  padding-right: 12px;\r\n  padding-left: 12px;\r\n}\r\n.btn-group.open .dropdown-toggle {\r\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\r\n}\r\n.btn-group.open .dropdown-toggle.btn-link {\r\n  box-shadow: none;\r\n}\r\n.btn .caret {\r\n  margin-left: 0;\r\n}\r\n.btn-lg .caret {\r\n  border-width: 5px 5px 0;\r\n  border-bottom-width: 0;\r\n}\r\n.dropup .btn-lg .caret {\r\n  border-width: 0 5px 5px;\r\n}\r\n.btn-group-vertical > .btn,\r\n.btn-group-vertical > .btn-group,\r\n.btn-group-vertical > .btn-group > .btn {\r\n  display: block;\r\n  float: none;\r\n  width: 100%;\r\n  max-width: 100%;\r\n}\r\n.btn-group-vertical > .btn-group > .btn {\r\n  float: none;\r\n}\r\n.btn-group-vertical > .btn + .btn,\r\n.btn-group-vertical > .btn + .btn-group,\r\n.btn-group-vertical > .btn-group + .btn,\r\n.btn-group-vertical > .btn-group + .btn-group {\r\n  margin-top: -1px;\r\n  margin-left: 0;\r\n}\r\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\r\n  border-radius: 0;\r\n}\r\n.btn-group-vertical > .btn:first-child:not(:last-child) {\r\n  border-top-right-radius: 4px;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.btn-group-vertical > .btn:last-child:not(:first-child) {\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n  border-bottom-left-radius: 4px;\r\n}\r\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\r\n  border-radius: 0;\r\n}\r\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\r\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.btn-group-justified {\r\n  display: table;\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: separate;\r\n}\r\n.btn-group-justified > .btn,\r\n.btn-group-justified > .btn-group {\r\n  display: table-cell;\r\n  float: none;\r\n  width: 1%;\r\n}\r\n.btn-group-justified > .btn-group .btn {\r\n  width: 100%;\r\n}\r\n.btn-group-justified > .btn-group .dropdown-menu {\r\n  left: auto;\r\n}\r\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\r\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\r\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\r\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\r\n  position: absolute;\r\n  clip: rect(0, 0, 0, 0);\r\n  pointer-events: none;\r\n}\r\n.input-group {\r\n  position: relative;\r\n  display: table;\r\n  border-collapse: separate;\r\n}\r\n.input-group[class*=\"col-\"] {\r\n  float: none;\r\n  padding-right: 0;\r\n  padding-left: 0;\r\n}\r\n.input-group .form-control {\r\n  position: relative;\r\n  z-index: 2;\r\n  float: left;\r\n  width: 100%;\r\n  margin-bottom: 0;\r\n}\r\n.input-group-lg > .form-control,\r\n.input-group-lg > .input-group-addon,\r\n.input-group-lg > .input-group-btn > .btn {\r\n  height: 46px;\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\nselect.input-group-lg > .form-control,\r\nselect.input-group-lg > .input-group-addon,\r\nselect.input-group-lg > .input-group-btn > .btn {\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\ntextarea.input-group-lg > .form-control,\r\ntextarea.input-group-lg > .input-group-addon,\r\ntextarea.input-group-lg > .input-group-btn > .btn,\r\nselect[multiple].input-group-lg > .form-control,\r\nselect[multiple].input-group-lg > .input-group-addon,\r\nselect[multiple].input-group-lg > .input-group-btn > .btn {\r\n  height: auto;\r\n}\r\n.input-group-sm > .form-control,\r\n.input-group-sm > .input-group-addon,\r\n.input-group-sm > .input-group-btn > .btn {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\nselect.input-group-sm > .form-control,\r\nselect.input-group-sm > .input-group-addon,\r\nselect.input-group-sm > .input-group-btn > .btn {\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\ntextarea.input-group-sm > .form-control,\r\ntextarea.input-group-sm > .input-group-addon,\r\ntextarea.input-group-sm > .input-group-btn > .btn,\r\nselect[multiple].input-group-sm > .form-control,\r\nselect[multiple].input-group-sm > .input-group-addon,\r\nselect[multiple].input-group-sm > .input-group-btn > .btn {\r\n  height: auto;\r\n}\r\n.input-group-addon,\r\n.input-group-btn,\r\n.input-group .form-control {\r\n  display: table-cell;\r\n}\r\n.input-group-addon:not(:first-child):not(:last-child),\r\n.input-group-btn:not(:first-child):not(:last-child),\r\n.input-group .form-control:not(:first-child):not(:last-child) {\r\n  border-radius: 0;\r\n}\r\n.input-group-addon,\r\n.input-group-btn {\r\n  width: 1%;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n}\r\n.input-group-addon {\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  color: #555;\r\n  text-align: center;\r\n  background-color: #eee;\r\n  border: 1px solid #ccc;\r\n  border-radius: 4px;\r\n}\r\n.input-group-addon.input-sm {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  border-radius: 3px;\r\n}\r\n.input-group-addon.input-lg {\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  border-radius: 6px;\r\n}\r\n.input-group-addon input[type=\"radio\"],\r\n.input-group-addon input[type=\"checkbox\"] {\r\n  margin-top: 0;\r\n}\r\n.input-group .form-control:first-child,\r\n.input-group-addon:first-child,\r\n.input-group-btn:first-child > .btn,\r\n.input-group-btn:first-child > .btn-group > .btn,\r\n.input-group-btn:first-child > .dropdown-toggle,\r\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\r\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\r\n  border-top-right-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n}\r\n.input-group-addon:first-child {\r\n  border-right: 0;\r\n}\r\n.input-group .form-control:last-child,\r\n.input-group-addon:last-child,\r\n.input-group-btn:last-child > .btn,\r\n.input-group-btn:last-child > .btn-group > .btn,\r\n.input-group-btn:last-child > .dropdown-toggle,\r\n.input-group-btn:first-child > .btn:not(:first-child),\r\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\r\n  border-top-left-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.input-group-addon:last-child {\r\n  border-left: 0;\r\n}\r\n.input-group-btn {\r\n  position: relative;\r\n  font-size: 0;\r\n  white-space: nowrap;\r\n}\r\n.input-group-btn > .btn {\r\n  position: relative;\r\n}\r\n.input-group-btn > .btn + .btn {\r\n  margin-left: -1px;\r\n}\r\n.input-group-btn > .btn:hover,\r\n.input-group-btn > .btn:focus,\r\n.input-group-btn > .btn:active {\r\n  z-index: 2;\r\n}\r\n.input-group-btn:first-child > .btn,\r\n.input-group-btn:first-child > .btn-group {\r\n  margin-right: -1px;\r\n}\r\n.input-group-btn:last-child > .btn,\r\n.input-group-btn:last-child > .btn-group {\r\n  z-index: 2;\r\n  margin-left: -1px;\r\n}\r\n.nav {\r\n  padding-left: 0;\r\n  margin-bottom: 0;\r\n  list-style: none;\r\n}\r\n.nav > li {\r\n  position: relative;\r\n  display: block;\r\n}\r\n.nav > li > a {\r\n  position: relative;\r\n  display: block;\r\n  padding: 10px 15px;\r\n}\r\n.nav > li > a:hover,\r\n.nav > li > a:focus {\r\n  text-decoration: none;\r\n  background-color: #eee;\r\n}\r\n.nav > li.disabled > a {\r\n  color: #777;\r\n}\r\n.nav > li.disabled > a:hover,\r\n.nav > li.disabled > a:focus {\r\n  color: #777;\r\n  text-decoration: none;\r\n  cursor: not-allowed;\r\n  background-color: transparent;\r\n}\r\n.nav .open > a,\r\n.nav .open > a:hover,\r\n.nav .open > a:focus {\r\n  background-color: #eee;\r\n  border-color: #337ab7;\r\n}\r\n.nav .nav-divider {\r\n  height: 1px;\r\n  margin: 9px 0;\r\n  overflow: hidden;\r\n  background-color: #e5e5e5;\r\n}\r\n.nav > li > a > img {\r\n  max-width: none;\r\n}\r\n.nav-tabs {\r\n  border-bottom: 1px solid #ddd;\r\n}\r\n.nav-tabs > li {\r\n  float: left;\r\n  margin-bottom: -1px;\r\n}\r\n.nav-tabs > li > a {\r\n  margin-right: 2px;\r\n  line-height: 1.42857143;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px 4px 0 0;\r\n}\r\n.nav-tabs > li > a:hover {\r\n  border-color: #eee #eee #ddd;\r\n}\r\n.nav-tabs > li.active > a,\r\n.nav-tabs > li.active > a:hover,\r\n.nav-tabs > li.active > a:focus {\r\n  color: #555;\r\n  cursor: default;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n  border-bottom-color: transparent;\r\n}\r\n.nav-tabs.nav-justified {\r\n  width: 100%;\r\n  border-bottom: 0;\r\n}\r\n.nav-tabs.nav-justified > li {\r\n  float: none;\r\n}\r\n.nav-tabs.nav-justified > li > a {\r\n  margin-bottom: 5px;\r\n  text-align: center;\r\n}\r\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\r\n  top: auto;\r\n  left: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-tabs.nav-justified > li {\r\n    display: table-cell;\r\n    width: 1%;\r\n  }\r\n  .nav-tabs.nav-justified > li > a {\r\n    margin-bottom: 0;\r\n  }\r\n}\r\n.nav-tabs.nav-justified > li > a {\r\n  margin-right: 0;\r\n  border-radius: 4px;\r\n}\r\n.nav-tabs.nav-justified > .active > a,\r\n.nav-tabs.nav-justified > .active > a:hover,\r\n.nav-tabs.nav-justified > .active > a:focus {\r\n  border: 1px solid #ddd;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-tabs.nav-justified > li > a {\r\n    border-bottom: 1px solid #ddd;\r\n    border-radius: 4px 4px 0 0;\r\n  }\r\n  .nav-tabs.nav-justified > .active > a,\r\n  .nav-tabs.nav-justified > .active > a:hover,\r\n  .nav-tabs.nav-justified > .active > a:focus {\r\n    border-bottom-color: #fff;\r\n  }\r\n}\r\n.nav-pills > li {\r\n  float: left;\r\n}\r\n.nav-pills > li > a {\r\n  border-radius: 4px;\r\n}\r\n.nav-pills > li + li {\r\n  margin-left: 2px;\r\n}\r\n.nav-pills > li.active > a,\r\n.nav-pills > li.active > a:hover,\r\n.nav-pills > li.active > a:focus {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n}\r\n.nav-stacked > li {\r\n  float: none;\r\n}\r\n.nav-stacked > li + li {\r\n  margin-top: 2px;\r\n  margin-left: 0;\r\n}\r\n.nav-justified {\r\n  width: 100%;\r\n}\r\n.nav-justified > li {\r\n  float: none;\r\n}\r\n.nav-justified > li > a {\r\n  margin-bottom: 5px;\r\n  text-align: center;\r\n}\r\n.nav-justified > .dropdown .dropdown-menu {\r\n  top: auto;\r\n  left: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-justified > li {\r\n    display: table-cell;\r\n    width: 1%;\r\n  }\r\n  .nav-justified > li > a {\r\n    margin-bottom: 0;\r\n  }\r\n}\r\n.nav-tabs-justified {\r\n  border-bottom: 0;\r\n}\r\n.nav-tabs-justified > li > a {\r\n  margin-right: 0;\r\n  border-radius: 4px;\r\n}\r\n.nav-tabs-justified > .active > a,\r\n.nav-tabs-justified > .active > a:hover,\r\n.nav-tabs-justified > .active > a:focus {\r\n  border: 1px solid #ddd;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-tabs-justified > li > a {\r\n    border-bottom: 1px solid #ddd;\r\n    border-radius: 4px 4px 0 0;\r\n  }\r\n  .nav-tabs-justified > .active > a,\r\n  .nav-tabs-justified > .active > a:hover,\r\n  .nav-tabs-justified > .active > a:focus {\r\n    border-bottom-color: #fff;\r\n  }\r\n}\r\n.tab-content > .tab-pane {\r\n  display: none;\r\n}\r\n.tab-content > .active {\r\n  display: block;\r\n}\r\n.nav-tabs .dropdown-menu {\r\n  margin-top: -1px;\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.navbar {\r\n  position: relative;\r\n  min-height: 50px;\r\n  margin-bottom: 20px;\r\n  border: 1px solid transparent;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar {\r\n    border-radius: 4px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-header {\r\n    float: left;\r\n  }\r\n}\r\n.navbar-collapse {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n  overflow-x: visible;\r\n  -webkit-overflow-scrolling: touch;\r\n  border-top: 1px solid transparent;\r\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\r\n}\r\n.navbar-collapse.in {\r\n  overflow-y: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-collapse {\r\n    width: auto;\r\n    border-top: 0;\r\n    box-shadow: none;\r\n  }\r\n  .navbar-collapse.collapse {\r\n    display: block !important;\r\n    height: auto !important;\r\n    padding-bottom: 0;\r\n    overflow: visible !important;\r\n  }\r\n  .navbar-collapse.in {\r\n    overflow-y: visible;\r\n  }\r\n  .navbar-fixed-top .navbar-collapse,\r\n  .navbar-static-top .navbar-collapse,\r\n  .navbar-fixed-bottom .navbar-collapse {\r\n    padding-right: 0;\r\n    padding-left: 0;\r\n  }\r\n}\r\n.navbar-fixed-top .navbar-collapse,\r\n.navbar-fixed-bottom .navbar-collapse {\r\n  max-height: 340px;\r\n}\r\n@media (max-device-width: 480px) and (orientation: landscape) {\r\n  .navbar-fixed-top .navbar-collapse,\r\n  .navbar-fixed-bottom .navbar-collapse {\r\n    max-height: 200px;\r\n  }\r\n}\r\n.container > .navbar-header,\r\n.container-fluid > .navbar-header,\r\n.container > .navbar-collapse,\r\n.container-fluid > .navbar-collapse {\r\n  margin-right: -15px;\r\n  margin-left: -15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .container > .navbar-header,\r\n  .container-fluid > .navbar-header,\r\n  .container > .navbar-collapse,\r\n  .container-fluid > .navbar-collapse {\r\n    margin-right: 0;\r\n    margin-left: 0;\r\n  }\r\n}\r\n.navbar-static-top {\r\n  z-index: 1000;\r\n  border-width: 0 0 1px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-static-top {\r\n    border-radius: 0;\r\n  }\r\n}\r\n.navbar-fixed-top,\r\n.navbar-fixed-bottom {\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  z-index: 1030;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-fixed-top,\r\n  .navbar-fixed-bottom {\r\n    border-radius: 0;\r\n  }\r\n}\r\n.navbar-fixed-top {\r\n  top: 0;\r\n  border-width: 0 0 1px;\r\n}\r\n.navbar-fixed-bottom {\r\n  bottom: 0;\r\n  margin-bottom: 0;\r\n  border-width: 1px 0 0;\r\n}\r\n.navbar-brand {\r\n  float: left;\r\n  height: 50px;\r\n  padding: 15px 15px;\r\n  font-size: 18px;\r\n  line-height: 20px;\r\n}\r\n.navbar-brand:hover,\r\n.navbar-brand:focus {\r\n  text-decoration: none;\r\n}\r\n.navbar-brand > img {\r\n  display: block;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar > .container .navbar-brand,\r\n  .navbar > .container-fluid .navbar-brand {\r\n    margin-left: -15px;\r\n  }\r\n}\r\n.navbar-toggle {\r\n  position: relative;\r\n  float: right;\r\n  padding: 9px 10px;\r\n  margin-top: 8px;\r\n  margin-right: 15px;\r\n  margin-bottom: 8px;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n}\r\n.navbar-toggle:focus {\r\n  outline: 0;\r\n}\r\n.navbar-toggle .icon-bar {\r\n  display: block;\r\n  width: 22px;\r\n  height: 2px;\r\n  border-radius: 1px;\r\n}\r\n.navbar-toggle .icon-bar + .icon-bar {\r\n  margin-top: 4px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-toggle {\r\n    display: none;\r\n  }\r\n}\r\n.navbar-nav {\r\n  margin: 7.5px -15px;\r\n}\r\n.navbar-nav > li > a {\r\n  padding-top: 10px;\r\n  padding-bottom: 10px;\r\n  line-height: 20px;\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-nav .open .dropdown-menu {\r\n    position: static;\r\n    float: none;\r\n    width: auto;\r\n    margin-top: 0;\r\n    background-color: transparent;\r\n    border: 0;\r\n    box-shadow: none;\r\n  }\r\n  .navbar-nav .open .dropdown-menu > li > a,\r\n  .navbar-nav .open .dropdown-menu .dropdown-header {\r\n    padding: 5px 15px 5px 25px;\r\n  }\r\n  .navbar-nav .open .dropdown-menu > li > a {\r\n    line-height: 20px;\r\n  }\r\n  .navbar-nav .open .dropdown-menu > li > a:hover,\r\n  .navbar-nav .open .dropdown-menu > li > a:focus {\r\n    background-image: none;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-nav {\r\n    float: left;\r\n    margin: 0;\r\n  }\r\n  .navbar-nav > li {\r\n    float: left;\r\n  }\r\n  .navbar-nav > li > a {\r\n    padding-top: 15px;\r\n    padding-bottom: 15px;\r\n  }\r\n}\r\n.navbar-form {\r\n  padding: 10px 15px;\r\n  margin-top: 8px;\r\n  margin-right: -15px;\r\n  margin-bottom: 8px;\r\n  margin-left: -15px;\r\n  border-top: 1px solid transparent;\r\n  border-bottom: 1px solid transparent;\r\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-form .form-group {\r\n    display: inline-block;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .form-control {\r\n    display: inline-block;\r\n    width: auto;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .form-control-static {\r\n    display: inline-block;\r\n  }\r\n  .navbar-form .input-group {\r\n    display: inline-table;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .input-group .input-group-addon,\r\n  .navbar-form .input-group .input-group-btn,\r\n  .navbar-form .input-group .form-control {\r\n    width: auto;\r\n  }\r\n  .navbar-form .input-group > .form-control {\r\n    width: 100%;\r\n  }\r\n  .navbar-form .control-label {\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .radio,\r\n  .navbar-form .checkbox {\r\n    display: inline-block;\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .radio label,\r\n  .navbar-form .checkbox label {\r\n    padding-left: 0;\r\n  }\r\n  .navbar-form .radio input[type=\"radio\"],\r\n  .navbar-form .checkbox input[type=\"checkbox\"] {\r\n    position: relative;\r\n    margin-left: 0;\r\n  }\r\n  .navbar-form .has-feedback .form-control-feedback {\r\n    top: 0;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-form .form-group {\r\n    margin-bottom: 5px;\r\n  }\r\n  .navbar-form .form-group:last-child {\r\n    margin-bottom: 0;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-form {\r\n    width: auto;\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n    margin-right: 0;\r\n    margin-left: 0;\r\n    border: 0;\r\n    box-shadow: none;\r\n  }\r\n}\r\n.navbar-nav > li > .dropdown-menu {\r\n  margin-top: 0;\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\r\n  margin-bottom: 0;\r\n  border-top-left-radius: 4px;\r\n  border-top-right-radius: 4px;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.navbar-btn {\r\n  margin-top: 8px;\r\n  margin-bottom: 8px;\r\n}\r\n.navbar-btn.btn-sm {\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n.navbar-btn.btn-xs {\r\n  margin-top: 14px;\r\n  margin-bottom: 14px;\r\n}\r\n.navbar-text {\r\n  margin-top: 15px;\r\n  margin-bottom: 15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-text {\r\n    float: left;\r\n    margin-right: 15px;\r\n    margin-left: 15px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-left {\r\n    float: left !important;\r\n  }\r\n  .navbar-right {\r\n    float: right !important;\r\n    margin-right: -15px;\r\n  }\r\n  .navbar-right ~ .navbar-right {\r\n    margin-right: 0;\r\n  }\r\n}\r\n.navbar-default {\r\n  background-color: #f8f8f8;\r\n  border-color: #e7e7e7;\r\n}\r\n.navbar-default .navbar-brand {\r\n  color: #777;\r\n}\r\n.navbar-default .navbar-brand:hover,\r\n.navbar-default .navbar-brand:focus {\r\n  color: #5e5e5e;\r\n  background-color: transparent;\r\n}\r\n.navbar-default .navbar-text {\r\n  color: #777;\r\n}\r\n.navbar-default .navbar-nav > li > a {\r\n  color: #777;\r\n}\r\n.navbar-default .navbar-nav > li > a:hover,\r\n.navbar-default .navbar-nav > li > a:focus {\r\n  color: #333;\r\n  background-color: transparent;\r\n}\r\n.navbar-default .navbar-nav > .active > a,\r\n.navbar-default .navbar-nav > .active > a:hover,\r\n.navbar-default .navbar-nav > .active > a:focus {\r\n  color: #555;\r\n  background-color: #e7e7e7;\r\n}\r\n.navbar-default .navbar-nav > .disabled > a,\r\n.navbar-default .navbar-nav > .disabled > a:hover,\r\n.navbar-default .navbar-nav > .disabled > a:focus {\r\n  color: #ccc;\r\n  background-color: transparent;\r\n}\r\n.navbar-default .navbar-toggle {\r\n  border-color: #ddd;\r\n}\r\n.navbar-default .navbar-toggle:hover,\r\n.navbar-default .navbar-toggle:focus {\r\n  background-color: #ddd;\r\n}\r\n.navbar-default .navbar-toggle .icon-bar {\r\n  background-color: #888;\r\n}\r\n.navbar-default .navbar-collapse,\r\n.navbar-default .navbar-form {\r\n  border-color: #e7e7e7;\r\n}\r\n.navbar-default .navbar-nav > .open > a,\r\n.navbar-default .navbar-nav > .open > a:hover,\r\n.navbar-default .navbar-nav > .open > a:focus {\r\n  color: #555;\r\n  background-color: #e7e7e7;\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\r\n    color: #777;\r\n  }\r\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\r\n    color: #333;\r\n    background-color: transparent;\r\n  }\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\r\n    color: #555;\r\n    background-color: #e7e7e7;\r\n  }\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\r\n    color: #ccc;\r\n    background-color: transparent;\r\n  }\r\n}\r\n.navbar-default .navbar-link {\r\n  color: #777;\r\n}\r\n.navbar-default .navbar-link:hover {\r\n  color: #333;\r\n}\r\n.navbar-default .btn-link {\r\n  color: #777;\r\n}\r\n.navbar-default .btn-link:hover,\r\n.navbar-default .btn-link:focus {\r\n  color: #333;\r\n}\r\n.navbar-default .btn-link[disabled]:hover,\r\nfieldset[disabled] .navbar-default .btn-link:hover,\r\n.navbar-default .btn-link[disabled]:focus,\r\nfieldset[disabled] .navbar-default .btn-link:focus {\r\n  color: #ccc;\r\n}\r\n.navbar-inverse {\r\n  background-color: #222;\r\n  border-color: #080808;\r\n}\r\n.navbar-inverse .navbar-brand {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-brand:hover,\r\n.navbar-inverse .navbar-brand:focus {\r\n  color: #fff;\r\n  background-color: transparent;\r\n}\r\n.navbar-inverse .navbar-text {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-nav > li > a {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-nav > li > a:hover,\r\n.navbar-inverse .navbar-nav > li > a:focus {\r\n  color: #fff;\r\n  background-color: transparent;\r\n}\r\n.navbar-inverse .navbar-nav > .active > a,\r\n.navbar-inverse .navbar-nav > .active > a:hover,\r\n.navbar-inverse .navbar-nav > .active > a:focus {\r\n  color: #fff;\r\n  background-color: #080808;\r\n}\r\n.navbar-inverse .navbar-nav > .disabled > a,\r\n.navbar-inverse .navbar-nav > .disabled > a:hover,\r\n.navbar-inverse .navbar-nav > .disabled > a:focus {\r\n  color: #444;\r\n  background-color: transparent;\r\n}\r\n.navbar-inverse .navbar-toggle {\r\n  border-color: #333;\r\n}\r\n.navbar-inverse .navbar-toggle:hover,\r\n.navbar-inverse .navbar-toggle:focus {\r\n  background-color: #333;\r\n}\r\n.navbar-inverse .navbar-toggle .icon-bar {\r\n  background-color: #fff;\r\n}\r\n.navbar-inverse .navbar-collapse,\r\n.navbar-inverse .navbar-form {\r\n  border-color: #101010;\r\n}\r\n.navbar-inverse .navbar-nav > .open > a,\r\n.navbar-inverse .navbar-nav > .open > a:hover,\r\n.navbar-inverse .navbar-nav > .open > a:focus {\r\n  color: #fff;\r\n  background-color: #080808;\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\r\n    border-color: #080808;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\r\n    background-color: #080808;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\r\n    color: #9d9d9d;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\r\n    color: #fff;\r\n    background-color: transparent;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\r\n    color: #fff;\r\n    background-color: #080808;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\r\n    color: #444;\r\n    background-color: transparent;\r\n  }\r\n}\r\n.navbar-inverse .navbar-link {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-link:hover {\r\n  color: #fff;\r\n}\r\n.navbar-inverse .btn-link {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .btn-link:hover,\r\n.navbar-inverse .btn-link:focus {\r\n  color: #fff;\r\n}\r\n.navbar-inverse .btn-link[disabled]:hover,\r\nfieldset[disabled] .navbar-inverse .btn-link:hover,\r\n.navbar-inverse .btn-link[disabled]:focus,\r\nfieldset[disabled] .navbar-inverse .btn-link:focus {\r\n  color: #444;\r\n}\r\n.breadcrumb {\r\n  padding: 8px 15px;\r\n  margin-bottom: 20px;\r\n  list-style: none;\r\n  background-color: #f5f5f5;\r\n  border-radius: 4px;\r\n}\r\n.breadcrumb > li {\r\n  display: inline-block;\r\n}\r\n.breadcrumb > li + li:before {\r\n  padding: 0 5px;\r\n  color: #ccc;\r\n  content: \"/\\A0\";\r\n}\r\n.breadcrumb > .active {\r\n  color: #777;\r\n}\r\n.pagination {\r\n  display: inline-block;\r\n  padding-left: 0;\r\n  margin: 20px 0;\r\n  border-radius: 4px;\r\n}\r\n.pagination > li {\r\n  display: inline;\r\n}\r\n.pagination > li > a,\r\n.pagination > li > span {\r\n  position: relative;\r\n  float: left;\r\n  padding: 6px 12px;\r\n  margin-left: -1px;\r\n  line-height: 1.42857143;\r\n  color: #337ab7;\r\n  text-decoration: none;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n}\r\n.pagination > li:first-child > a,\r\n.pagination > li:first-child > span {\r\n  margin-left: 0;\r\n  border-top-left-radius: 4px;\r\n  border-bottom-left-radius: 4px;\r\n}\r\n.pagination > li:last-child > a,\r\n.pagination > li:last-child > span {\r\n  border-top-right-radius: 4px;\r\n  border-bottom-right-radius: 4px;\r\n}\r\n.pagination > li > a:hover,\r\n.pagination > li > span:hover,\r\n.pagination > li > a:focus,\r\n.pagination > li > span:focus {\r\n  z-index: 3;\r\n  color: #23527c;\r\n  background-color: #eee;\r\n  border-color: #ddd;\r\n}\r\n.pagination > .active > a,\r\n.pagination > .active > span,\r\n.pagination > .active > a:hover,\r\n.pagination > .active > span:hover,\r\n.pagination > .active > a:focus,\r\n.pagination > .active > span:focus {\r\n  z-index: 2;\r\n  color: #fff;\r\n  cursor: default;\r\n  background-color: #337ab7;\r\n  border-color: #337ab7;\r\n}\r\n.pagination > .disabled > span,\r\n.pagination > .disabled > span:hover,\r\n.pagination > .disabled > span:focus,\r\n.pagination > .disabled > a,\r\n.pagination > .disabled > a:hover,\r\n.pagination > .disabled > a:focus {\r\n  color: #777;\r\n  cursor: not-allowed;\r\n  background-color: #fff;\r\n  border-color: #ddd;\r\n}\r\n.pagination-lg > li > a,\r\n.pagination-lg > li > span {\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n}\r\n.pagination-lg > li:first-child > a,\r\n.pagination-lg > li:first-child > span {\r\n  border-top-left-radius: 6px;\r\n  border-bottom-left-radius: 6px;\r\n}\r\n.pagination-lg > li:last-child > a,\r\n.pagination-lg > li:last-child > span {\r\n  border-top-right-radius: 6px;\r\n  border-bottom-right-radius: 6px;\r\n}\r\n.pagination-sm > li > a,\r\n.pagination-sm > li > span {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n}\r\n.pagination-sm > li:first-child > a,\r\n.pagination-sm > li:first-child > span {\r\n  border-top-left-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.pagination-sm > li:last-child > a,\r\n.pagination-sm > li:last-child > span {\r\n  border-top-right-radius: 3px;\r\n  border-bottom-right-radius: 3px;\r\n}\r\n.pager {\r\n  padding-left: 0;\r\n  margin: 20px 0;\r\n  text-align: center;\r\n  list-style: none;\r\n}\r\n.pager li {\r\n  display: inline;\r\n}\r\n.pager li > a,\r\n.pager li > span {\r\n  display: inline-block;\r\n  padding: 5px 14px;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 15px;\r\n}\r\n.pager li > a:hover,\r\n.pager li > a:focus {\r\n  text-decoration: none;\r\n  background-color: #eee;\r\n}\r\n.pager .next > a,\r\n.pager .next > span {\r\n  float: right;\r\n}\r\n.pager .previous > a,\r\n.pager .previous > span {\r\n  float: left;\r\n}\r\n.pager .disabled > a,\r\n.pager .disabled > a:hover,\r\n.pager .disabled > a:focus,\r\n.pager .disabled > span {\r\n  color: #777;\r\n  cursor: not-allowed;\r\n  background-color: #fff;\r\n}\r\n.label {\r\n  display: inline;\r\n  padding: .2em .6em .3em;\r\n  font-size: 75%;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #fff;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: baseline;\r\n  border-radius: .25em;\r\n}\r\na.label:hover,\r\na.label:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n.label:empty {\r\n  display: none;\r\n}\r\n.btn .label {\r\n  position: relative;\r\n  top: -1px;\r\n}\r\n.label-default {\r\n  background-color: #777;\r\n}\r\n.label-default[href]:hover,\r\n.label-default[href]:focus {\r\n  background-color: #5e5e5e;\r\n}\r\n.label-primary {\r\n  background-color: #337ab7;\r\n}\r\n.label-primary[href]:hover,\r\n.label-primary[href]:focus {\r\n  background-color: #286090;\r\n}\r\n.label-success {\r\n  background-color: #5cb85c;\r\n}\r\n.label-success[href]:hover,\r\n.label-success[href]:focus {\r\n  background-color: #449d44;\r\n}\r\n.label-info {\r\n  background-color: #5bc0de;\r\n}\r\n.label-info[href]:hover,\r\n.label-info[href]:focus {\r\n  background-color: #31b0d5;\r\n}\r\n.label-warning {\r\n  background-color: #f0ad4e;\r\n}\r\n.label-warning[href]:hover,\r\n.label-warning[href]:focus {\r\n  background-color: #ec971f;\r\n}\r\n.label-danger {\r\n  background-color: #d9534f;\r\n}\r\n.label-danger[href]:hover,\r\n.label-danger[href]:focus {\r\n  background-color: #c9302c;\r\n}\r\n.badge {\r\n  display: inline-block;\r\n  min-width: 10px;\r\n  padding: 3px 7px;\r\n  font-size: 12px;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #fff;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n  background-color: #777;\r\n  border-radius: 10px;\r\n}\r\n.badge:empty {\r\n  display: none;\r\n}\r\n.btn .badge {\r\n  position: relative;\r\n  top: -1px;\r\n}\r\n.btn-xs .badge,\r\n.btn-group-xs > .btn .badge {\r\n  top: 0;\r\n  padding: 1px 5px;\r\n}\r\na.badge:hover,\r\na.badge:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n.list-group-item.active > .badge,\r\n.nav-pills > .active > a > .badge {\r\n  color: #337ab7;\r\n  background-color: #fff;\r\n}\r\n.list-group-item > .badge {\r\n  float: right;\r\n}\r\n.list-group-item > .badge + .badge {\r\n  margin-right: 5px;\r\n}\r\n.nav-pills > li > a > .badge {\r\n  margin-left: 3px;\r\n}\r\n.jumbotron {\r\n  padding-top: 30px;\r\n  padding-bottom: 30px;\r\n  margin-bottom: 30px;\r\n  color: inherit;\r\n  background-color: #eee;\r\n}\r\n.jumbotron h1,\r\n.jumbotron .h1 {\r\n  color: inherit;\r\n}\r\n.jumbotron p {\r\n  margin-bottom: 15px;\r\n  font-size: 21px;\r\n  font-weight: 200;\r\n}\r\n.jumbotron > hr {\r\n  border-top-color: #d5d5d5;\r\n}\r\n.container .jumbotron,\r\n.container-fluid .jumbotron {\r\n  border-radius: 6px;\r\n}\r\n.jumbotron .container {\r\n  max-width: 100%;\r\n}\r\n@media screen and (min-width: 768px) {\r\n  .jumbotron {\r\n    padding-top: 48px;\r\n    padding-bottom: 48px;\r\n  }\r\n  .container .jumbotron,\r\n  .container-fluid .jumbotron {\r\n    padding-right: 60px;\r\n    padding-left: 60px;\r\n  }\r\n  .jumbotron h1,\r\n  .jumbotron .h1 {\r\n    font-size: 63px;\r\n  }\r\n}\r\n.thumbnail {\r\n  display: block;\r\n  padding: 4px;\r\n  margin-bottom: 20px;\r\n  line-height: 1.42857143;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 4px;\r\n  -webkit-transition: border .2s ease-in-out;\r\n          transition: border .2s ease-in-out;\r\n}\r\n.thumbnail > img,\r\n.thumbnail a > img {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\na.thumbnail:hover,\r\na.thumbnail:focus,\r\na.thumbnail.active {\r\n  border-color: #337ab7;\r\n}\r\n.thumbnail .caption {\r\n  padding: 9px;\r\n  color: #333;\r\n}\r\n.alert {\r\n  padding: 15px;\r\n  margin-bottom: 20px;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n}\r\n.alert h4 {\r\n  margin-top: 0;\r\n  color: inherit;\r\n}\r\n.alert .alert-link {\r\n  font-weight: bold;\r\n}\r\n.alert > p,\r\n.alert > ul {\r\n  margin-bottom: 0;\r\n}\r\n.alert > p + p {\r\n  margin-top: 5px;\r\n}\r\n.alert-dismissable,\r\n.alert-dismissible {\r\n  padding-right: 35px;\r\n}\r\n.alert-dismissable .close,\r\n.alert-dismissible .close {\r\n  position: relative;\r\n  top: -2px;\r\n  right: -21px;\r\n  color: inherit;\r\n}\r\n.alert-success {\r\n  color: #3c763d;\r\n  background-color: #dff0d8;\r\n  border-color: #d6e9c6;\r\n}\r\n.alert-success hr {\r\n  border-top-color: #c9e2b3;\r\n}\r\n.alert-success .alert-link {\r\n  color: #2b542c;\r\n}\r\n.alert-info {\r\n  color: #31708f;\r\n  background-color: #d9edf7;\r\n  border-color: #bce8f1;\r\n}\r\n.alert-info hr {\r\n  border-top-color: #a6e1ec;\r\n}\r\n.alert-info .alert-link {\r\n  color: #245269;\r\n}\r\n.alert-warning {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n  border-color: #faebcc;\r\n}\r\n.alert-warning hr {\r\n  border-top-color: #f7e1b5;\r\n}\r\n.alert-warning .alert-link {\r\n  color: #66512c;\r\n}\r\n.alert-danger {\r\n  color: #a94442;\r\n  background-color: #f2dede;\r\n  border-color: #ebccd1;\r\n}\r\n.alert-danger hr {\r\n  border-top-color: #e4b9c0;\r\n}\r\n.alert-danger .alert-link {\r\n  color: #843534;\r\n}\r\n@-webkit-keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0;\r\n  }\r\n  to {\r\n    background-position: 0 0;\r\n  }\r\n}\r\n@keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0;\r\n  }\r\n  to {\r\n    background-position: 0 0;\r\n  }\r\n}\r\n.progress {\r\n  height: 20px;\r\n  margin-bottom: 20px;\r\n  overflow: hidden;\r\n  background-color: #f5f5f5;\r\n  border-radius: 4px;\r\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);\r\n}\r\n.progress-bar {\r\n  float: left;\r\n  width: 0;\r\n  height: 100%;\r\n  font-size: 12px;\r\n  line-height: 20px;\r\n  color: #fff;\r\n  text-align: center;\r\n  background-color: #337ab7;\r\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);\r\n  -webkit-transition: width .6s ease;\r\n          transition: width .6s ease;\r\n}\r\n.progress-striped .progress-bar,\r\n.progress-bar-striped {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-size: 40px 40px;\r\n}\r\n.progress.active .progress-bar,\r\n.progress-bar.active {\r\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\r\n          animation: progress-bar-stripes 2s linear infinite;\r\n}\r\n.progress-bar-success {\r\n  background-color: #5cb85c;\r\n}\r\n.progress-striped .progress-bar-success {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n}\r\n.progress-bar-info {\r\n  background-color: #5bc0de;\r\n}\r\n.progress-striped .progress-bar-info {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n}\r\n.progress-bar-warning {\r\n  background-color: #f0ad4e;\r\n}\r\n.progress-striped .progress-bar-warning {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n}\r\n.progress-bar-danger {\r\n  background-color: #d9534f;\r\n}\r\n.progress-striped .progress-bar-danger {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n}\r\n.media {\r\n  margin-top: 15px;\r\n}\r\n.media:first-child {\r\n  margin-top: 0;\r\n}\r\n.media,\r\n.media-body {\r\n  overflow: hidden;\r\n  zoom: 1;\r\n}\r\n.media-body {\r\n  width: 10000px;\r\n}\r\n.media-object {\r\n  display: block;\r\n}\r\n.media-object.img-thumbnail {\r\n  max-width: none;\r\n}\r\n.media-right,\r\n.media > .pull-right {\r\n  padding-left: 10px;\r\n}\r\n.media-left,\r\n.media > .pull-left {\r\n  padding-right: 10px;\r\n}\r\n.media-left,\r\n.media-right,\r\n.media-body {\r\n  display: table-cell;\r\n  vertical-align: top;\r\n}\r\n.media-middle {\r\n  vertical-align: middle;\r\n}\r\n.media-bottom {\r\n  vertical-align: bottom;\r\n}\r\n.media-heading {\r\n  margin-top: 0;\r\n  margin-bottom: 5px;\r\n}\r\n.media-list {\r\n  padding-left: 0;\r\n  list-style: none;\r\n}\r\n.list-group {\r\n  padding-left: 0;\r\n  margin-bottom: 20px;\r\n}\r\n.list-group-item {\r\n  position: relative;\r\n  display: block;\r\n  padding: 10px 15px;\r\n  margin-bottom: -1px;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n}\r\n.list-group-item:first-child {\r\n  border-top-left-radius: 4px;\r\n  border-top-right-radius: 4px;\r\n}\r\n.list-group-item:last-child {\r\n  margin-bottom: 0;\r\n  border-bottom-right-radius: 4px;\r\n  border-bottom-left-radius: 4px;\r\n}\r\na.list-group-item,\r\nbutton.list-group-item {\r\n  color: #555;\r\n}\r\na.list-group-item .list-group-item-heading,\r\nbutton.list-group-item .list-group-item-heading {\r\n  color: #333;\r\n}\r\na.list-group-item:hover,\r\nbutton.list-group-item:hover,\r\na.list-group-item:focus,\r\nbutton.list-group-item:focus {\r\n  color: #555;\r\n  text-decoration: none;\r\n  background-color: #f5f5f5;\r\n}\r\nbutton.list-group-item {\r\n  width: 100%;\r\n  text-align: left;\r\n}\r\n.list-group-item.disabled,\r\n.list-group-item.disabled:hover,\r\n.list-group-item.disabled:focus {\r\n  color: #777;\r\n  cursor: not-allowed;\r\n  background-color: #eee;\r\n}\r\n.list-group-item.disabled .list-group-item-heading,\r\n.list-group-item.disabled:hover .list-group-item-heading,\r\n.list-group-item.disabled:focus .list-group-item-heading {\r\n  color: inherit;\r\n}\r\n.list-group-item.disabled .list-group-item-text,\r\n.list-group-item.disabled:hover .list-group-item-text,\r\n.list-group-item.disabled:focus .list-group-item-text {\r\n  color: #777;\r\n}\r\n.list-group-item.active,\r\n.list-group-item.active:hover,\r\n.list-group-item.active:focus {\r\n  z-index: 2;\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n  border-color: #337ab7;\r\n}\r\n.list-group-item.active .list-group-item-heading,\r\n.list-group-item.active:hover .list-group-item-heading,\r\n.list-group-item.active:focus .list-group-item-heading,\r\n.list-group-item.active .list-group-item-heading > small,\r\n.list-group-item.active:hover .list-group-item-heading > small,\r\n.list-group-item.active:focus .list-group-item-heading > small,\r\n.list-group-item.active .list-group-item-heading > .small,\r\n.list-group-item.active:hover .list-group-item-heading > .small,\r\n.list-group-item.active:focus .list-group-item-heading > .small {\r\n  color: inherit;\r\n}\r\n.list-group-item.active .list-group-item-text,\r\n.list-group-item.active:hover .list-group-item-text,\r\n.list-group-item.active:focus .list-group-item-text {\r\n  color: #c7ddef;\r\n}\r\n.list-group-item-success {\r\n  color: #3c763d;\r\n  background-color: #dff0d8;\r\n}\r\na.list-group-item-success,\r\nbutton.list-group-item-success {\r\n  color: #3c763d;\r\n}\r\na.list-group-item-success .list-group-item-heading,\r\nbutton.list-group-item-success .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-success:hover,\r\nbutton.list-group-item-success:hover,\r\na.list-group-item-success:focus,\r\nbutton.list-group-item-success:focus {\r\n  color: #3c763d;\r\n  background-color: #d0e9c6;\r\n}\r\na.list-group-item-success.active,\r\nbutton.list-group-item-success.active,\r\na.list-group-item-success.active:hover,\r\nbutton.list-group-item-success.active:hover,\r\na.list-group-item-success.active:focus,\r\nbutton.list-group-item-success.active:focus {\r\n  color: #fff;\r\n  background-color: #3c763d;\r\n  border-color: #3c763d;\r\n}\r\n.list-group-item-info {\r\n  color: #31708f;\r\n  background-color: #d9edf7;\r\n}\r\na.list-group-item-info,\r\nbutton.list-group-item-info {\r\n  color: #31708f;\r\n}\r\na.list-group-item-info .list-group-item-heading,\r\nbutton.list-group-item-info .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-info:hover,\r\nbutton.list-group-item-info:hover,\r\na.list-group-item-info:focus,\r\nbutton.list-group-item-info:focus {\r\n  color: #31708f;\r\n  background-color: #c4e3f3;\r\n}\r\na.list-group-item-info.active,\r\nbutton.list-group-item-info.active,\r\na.list-group-item-info.active:hover,\r\nbutton.list-group-item-info.active:hover,\r\na.list-group-item-info.active:focus,\r\nbutton.list-group-item-info.active:focus {\r\n  color: #fff;\r\n  background-color: #31708f;\r\n  border-color: #31708f;\r\n}\r\n.list-group-item-warning {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n}\r\na.list-group-item-warning,\r\nbutton.list-group-item-warning {\r\n  color: #8a6d3b;\r\n}\r\na.list-group-item-warning .list-group-item-heading,\r\nbutton.list-group-item-warning .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-warning:hover,\r\nbutton.list-group-item-warning:hover,\r\na.list-group-item-warning:focus,\r\nbutton.list-group-item-warning:focus {\r\n  color: #8a6d3b;\r\n  background-color: #faf2cc;\r\n}\r\na.list-group-item-warning.active,\r\nbutton.list-group-item-warning.active,\r\na.list-group-item-warning.active:hover,\r\nbutton.list-group-item-warning.active:hover,\r\na.list-group-item-warning.active:focus,\r\nbutton.list-group-item-warning.active:focus {\r\n  color: #fff;\r\n  background-color: #8a6d3b;\r\n  border-color: #8a6d3b;\r\n}\r\n.list-group-item-danger {\r\n  color: #a94442;\r\n  background-color: #f2dede;\r\n}\r\na.list-group-item-danger,\r\nbutton.list-group-item-danger {\r\n  color: #a94442;\r\n}\r\na.list-group-item-danger .list-group-item-heading,\r\nbutton.list-group-item-danger .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-danger:hover,\r\nbutton.list-group-item-danger:hover,\r\na.list-group-item-danger:focus,\r\nbutton.list-group-item-danger:focus {\r\n  color: #a94442;\r\n  background-color: #ebcccc;\r\n}\r\na.list-group-item-danger.active,\r\nbutton.list-group-item-danger.active,\r\na.list-group-item-danger.active:hover,\r\nbutton.list-group-item-danger.active:hover,\r\na.list-group-item-danger.active:focus,\r\nbutton.list-group-item-danger.active:focus {\r\n  color: #fff;\r\n  background-color: #a94442;\r\n  border-color: #a94442;\r\n}\r\n.list-group-item-heading {\r\n  margin-top: 0;\r\n  margin-bottom: 5px;\r\n}\r\n.list-group-item-text {\r\n  margin-bottom: 0;\r\n  line-height: 1.3;\r\n}\r\n.panel {\r\n  margin-bottom: 20px;\r\n  background-color: #fff;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\r\n}\r\n.panel-body {\r\n  padding: 15px;\r\n}\r\n.panel-heading {\r\n  padding: 10px 15px;\r\n  border-bottom: 1px solid transparent;\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel-heading > .dropdown .dropdown-toggle {\r\n  color: inherit;\r\n}\r\n.panel-title {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  font-size: 16px;\r\n  color: inherit;\r\n}\r\n.panel-title > a,\r\n.panel-title > small,\r\n.panel-title > .small,\r\n.panel-title > small > a,\r\n.panel-title > .small > a {\r\n  color: inherit;\r\n}\r\n.panel-footer {\r\n  padding: 10px 15px;\r\n  background-color: #f5f5f5;\r\n  border-top: 1px solid #ddd;\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .list-group,\r\n.panel > .panel-collapse > .list-group {\r\n  margin-bottom: 0;\r\n}\r\n.panel > .list-group .list-group-item,\r\n.panel > .panel-collapse > .list-group .list-group-item {\r\n  border-width: 1px 0;\r\n  border-radius: 0;\r\n}\r\n.panel > .list-group:first-child .list-group-item:first-child,\r\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\r\n  border-top: 0;\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel > .list-group:last-child .list-group-item:last-child,\r\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\r\n  border-bottom: 0;\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.panel-heading + .list-group .list-group-item:first-child {\r\n  border-top-width: 0;\r\n}\r\n.list-group + .panel-footer {\r\n  border-top-width: 0;\r\n}\r\n.panel > .table,\r\n.panel > .table-responsive > .table,\r\n.panel > .panel-collapse > .table {\r\n  margin-bottom: 0;\r\n}\r\n.panel > .table caption,\r\n.panel > .table-responsive > .table caption,\r\n.panel > .panel-collapse > .table caption {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n.panel > .table:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child {\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel > .table:first-child > thead:first-child > tr:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\r\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\r\n  border-top-left-radius: 3px;\r\n}\r\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\r\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel > .table:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child {\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .table:last-child > tbody:last-child > tr:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\r\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\r\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\r\n  border-bottom-right-radius: 3px;\r\n}\r\n.panel > .panel-body + .table,\r\n.panel > .panel-body + .table-responsive,\r\n.panel > .table + .panel-body,\r\n.panel > .table-responsive + .panel-body {\r\n  border-top: 1px solid #ddd;\r\n}\r\n.panel > .table > tbody:first-child > tr:first-child th,\r\n.panel > .table > tbody:first-child > tr:first-child td {\r\n  border-top: 0;\r\n}\r\n.panel > .table-bordered,\r\n.panel > .table-responsive > .table-bordered {\r\n  border: 0;\r\n}\r\n.panel > .table-bordered > thead > tr > th:first-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\r\n.panel > .table-bordered > tbody > tr > th:first-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\r\n.panel > .table-bordered > tfoot > tr > th:first-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\r\n.panel > .table-bordered > thead > tr > td:first-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\r\n.panel > .table-bordered > tbody > tr > td:first-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\r\n.panel > .table-bordered > tfoot > tr > td:first-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\r\n  border-left: 0;\r\n}\r\n.panel > .table-bordered > thead > tr > th:last-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\r\n.panel > .table-bordered > tbody > tr > th:last-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\r\n.panel > .table-bordered > tfoot > tr > th:last-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\r\n.panel > .table-bordered > thead > tr > td:last-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\r\n.panel > .table-bordered > tbody > tr > td:last-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\r\n.panel > .table-bordered > tfoot > tr > td:last-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\r\n  border-right: 0;\r\n}\r\n.panel > .table-bordered > thead > tr:first-child > td,\r\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\r\n.panel > .table-bordered > tbody > tr:first-child > td,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\r\n.panel > .table-bordered > thead > tr:first-child > th,\r\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\r\n.panel > .table-bordered > tbody > tr:first-child > th,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\r\n  border-bottom: 0;\r\n}\r\n.panel > .table-bordered > tbody > tr:last-child > td,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\r\n.panel > .table-bordered > tfoot > tr:last-child > td,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\r\n.panel > .table-bordered > tbody > tr:last-child > th,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\r\n.panel > .table-bordered > tfoot > tr:last-child > th,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\r\n  border-bottom: 0;\r\n}\r\n.panel > .table-responsive {\r\n  margin-bottom: 0;\r\n  border: 0;\r\n}\r\n.panel-group {\r\n  margin-bottom: 20px;\r\n}\r\n.panel-group .panel {\r\n  margin-bottom: 0;\r\n  border-radius: 4px;\r\n}\r\n.panel-group .panel + .panel {\r\n  margin-top: 5px;\r\n}\r\n.panel-group .panel-heading {\r\n  border-bottom: 0;\r\n}\r\n.panel-group .panel-heading + .panel-collapse > .panel-body,\r\n.panel-group .panel-heading + .panel-collapse > .list-group {\r\n  border-top: 1px solid #ddd;\r\n}\r\n.panel-group .panel-footer {\r\n  border-top: 0;\r\n}\r\n.panel-group .panel-footer + .panel-collapse .panel-body {\r\n  border-bottom: 1px solid #ddd;\r\n}\r\n.panel-default {\r\n  border-color: #ddd;\r\n}\r\n.panel-default > .panel-heading {\r\n  color: #333;\r\n  background-color: #f5f5f5;\r\n  border-color: #ddd;\r\n}\r\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #ddd;\r\n}\r\n.panel-default > .panel-heading .badge {\r\n  color: #f5f5f5;\r\n  background-color: #333;\r\n}\r\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #ddd;\r\n}\r\n.panel-primary {\r\n  border-color: #337ab7;\r\n}\r\n.panel-primary > .panel-heading {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n  border-color: #337ab7;\r\n}\r\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #337ab7;\r\n}\r\n.panel-primary > .panel-heading .badge {\r\n  color: #337ab7;\r\n  background-color: #fff;\r\n}\r\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #337ab7;\r\n}\r\n.panel-success {\r\n  border-color: #d6e9c6;\r\n}\r\n.panel-success > .panel-heading {\r\n  color: #3c763d;\r\n  background-color: #dff0d8;\r\n  border-color: #d6e9c6;\r\n}\r\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #d6e9c6;\r\n}\r\n.panel-success > .panel-heading .badge {\r\n  color: #dff0d8;\r\n  background-color: #3c763d;\r\n}\r\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #d6e9c6;\r\n}\r\n.panel-info {\r\n  border-color: #bce8f1;\r\n}\r\n.panel-info > .panel-heading {\r\n  color: #31708f;\r\n  background-color: #d9edf7;\r\n  border-color: #bce8f1;\r\n}\r\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #bce8f1;\r\n}\r\n.panel-info > .panel-heading .badge {\r\n  color: #d9edf7;\r\n  background-color: #31708f;\r\n}\r\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #bce8f1;\r\n}\r\n.panel-warning {\r\n  border-color: #faebcc;\r\n}\r\n.panel-warning > .panel-heading {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n  border-color: #faebcc;\r\n}\r\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #faebcc;\r\n}\r\n.panel-warning > .panel-heading .badge {\r\n  color: #fcf8e3;\r\n  background-color: #8a6d3b;\r\n}\r\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #faebcc;\r\n}\r\n.panel-danger {\r\n  border-color: #ebccd1;\r\n}\r\n.panel-danger > .panel-heading {\r\n  color: #a94442;\r\n  background-color: #f2dede;\r\n  border-color: #ebccd1;\r\n}\r\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #ebccd1;\r\n}\r\n.panel-danger > .panel-heading .badge {\r\n  color: #f2dede;\r\n  background-color: #a94442;\r\n}\r\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #ebccd1;\r\n}\r\n.embed-responsive {\r\n  position: relative;\r\n  display: block;\r\n  height: 0;\r\n  padding: 0;\r\n  overflow: hidden;\r\n}\r\n.embed-responsive .embed-responsive-item,\r\n.embed-responsive iframe,\r\n.embed-responsive embed,\r\n.embed-responsive object,\r\n.embed-responsive video {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  border: 0;\r\n}\r\n.embed-responsive-16by9 {\r\n  padding-bottom: 56.25%;\r\n}\r\n.embed-responsive-4by3 {\r\n  padding-bottom: 75%;\r\n}\r\n.well {\r\n  min-height: 20px;\r\n  padding: 19px;\r\n  margin-bottom: 20px;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid #e3e3e3;\r\n  border-radius: 4px;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);\r\n}\r\n.well blockquote {\r\n  border-color: #ddd;\r\n  border-color: rgba(0, 0, 0, .15);\r\n}\r\n.well-lg {\r\n  padding: 24px;\r\n  border-radius: 6px;\r\n}\r\n.well-sm {\r\n  padding: 9px;\r\n  border-radius: 3px;\r\n}\r\n.close {\r\n  float: right;\r\n  font-size: 21px;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #000;\r\n  text-shadow: 0 1px 0 #fff;\r\n  filter: alpha(opacity=20);\r\n  opacity: .2;\r\n}\r\n.close:hover,\r\n.close:focus {\r\n  color: #000;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  filter: alpha(opacity=50);\r\n  opacity: .5;\r\n}\r\nbutton.close {\r\n  -webkit-appearance: none;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n  border: 0;\r\n}\r\n.modal-open {\r\n  overflow: hidden;\r\n}\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1050;\r\n  display: none;\r\n  overflow: hidden;\r\n  -webkit-overflow-scrolling: touch;\r\n  outline: 0;\r\n}\r\n.modal.fade .modal-dialog {\r\n  -webkit-transition: -webkit-transform .3s ease-out;\r\n          transition: -webkit-transform .3s ease-out;\r\n          transition: transform .3s ease-out;\r\n          transition:         transform .3s ease-out, -webkit-transform .3s ease-out;\r\n  -webkit-transform: translate(0, -25%);\r\n          transform: translate(0, -25%);\r\n}\r\n.modal.in .modal-dialog {\r\n  -webkit-transform: translate(0, 0);\r\n          transform: translate(0, 0);\r\n}\r\n.modal-open .modal {\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n}\r\n.modal-dialog {\r\n  position: relative;\r\n  width: auto;\r\n  margin: 10px;\r\n}\r\n.modal-content {\r\n  position: relative;\r\n  background-color: #fff;\r\n  background-clip: padding-box;\r\n  border: 1px solid #999;\r\n  border: 1px solid rgba(0, 0, 0, .2);\r\n  border-radius: 6px;\r\n  outline: 0;\r\n  box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\r\n}\r\n.modal-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1040;\r\n  background-color: #000;\r\n}\r\n.modal-backdrop.fade {\r\n  filter: alpha(opacity=0);\r\n  opacity: 0;\r\n}\r\n.modal-backdrop.in {\r\n  filter: alpha(opacity=50);\r\n  opacity: .5;\r\n}\r\n.modal-header {\r\n  min-height: 16.42857143px;\r\n  padding: 15px;\r\n  border-bottom: 1px solid #e5e5e5;\r\n}\r\n.modal-header .close {\r\n  margin-top: -2px;\r\n}\r\n.modal-title {\r\n  margin: 0;\r\n  line-height: 1.42857143;\r\n}\r\n.modal-body {\r\n  position: relative;\r\n  padding: 15px;\r\n}\r\n.modal-footer {\r\n  padding: 15px;\r\n  text-align: right;\r\n  border-top: 1px solid #e5e5e5;\r\n}\r\n.modal-footer .btn + .btn {\r\n  margin-bottom: 0;\r\n  margin-left: 5px;\r\n}\r\n.modal-footer .btn-group .btn + .btn {\r\n  margin-left: -1px;\r\n}\r\n.modal-footer .btn-block + .btn-block {\r\n  margin-left: 0;\r\n}\r\n.modal-scrollbar-measure {\r\n  position: absolute;\r\n  top: -9999px;\r\n  width: 50px;\r\n  height: 50px;\r\n  overflow: scroll;\r\n}\r\n@media (min-width: 768px) {\r\n  .modal-dialog {\r\n    width: 600px;\r\n    margin: 30px auto;\r\n  }\r\n  .modal-content {\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\r\n  }\r\n  .modal-sm {\r\n    width: 300px;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .modal-lg {\r\n    width: 900px;\r\n  }\r\n}\r\n.tooltip {\r\n  position: absolute;\r\n  z-index: 1070;\r\n  display: block;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-size: 12px;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  text-align: left;\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-shadow: none;\r\n  text-transform: none;\r\n  letter-spacing: normal;\r\n  word-break: normal;\r\n  word-spacing: normal;\r\n  word-wrap: normal;\r\n  white-space: normal;\r\n  filter: alpha(opacity=0);\r\n  opacity: 0;\r\n\r\n  line-break: auto;\r\n}\r\n.tooltip.in {\r\n  filter: alpha(opacity=90);\r\n  opacity: .9;\r\n}\r\n.tooltip.top {\r\n  padding: 5px 0;\r\n  margin-top: -3px;\r\n}\r\n.tooltip.right {\r\n  padding: 0 5px;\r\n  margin-left: 3px;\r\n}\r\n.tooltip.bottom {\r\n  padding: 5px 0;\r\n  margin-top: 3px;\r\n}\r\n.tooltip.left {\r\n  padding: 0 5px;\r\n  margin-left: -3px;\r\n}\r\n.tooltip-inner {\r\n  max-width: 200px;\r\n  padding: 3px 8px;\r\n  color: #fff;\r\n  text-align: center;\r\n  background-color: #000;\r\n  border-radius: 4px;\r\n}\r\n.tooltip-arrow {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  border-color: transparent;\r\n  border-style: solid;\r\n}\r\n.tooltip.top .tooltip-arrow {\r\n  bottom: 0;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000;\r\n}\r\n.tooltip.top-left .tooltip-arrow {\r\n  right: 5px;\r\n  bottom: 0;\r\n  margin-bottom: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000;\r\n}\r\n.tooltip.top-right .tooltip-arrow {\r\n  bottom: 0;\r\n  left: 5px;\r\n  margin-bottom: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000;\r\n}\r\n.tooltip.right .tooltip-arrow {\r\n  top: 50%;\r\n  left: 0;\r\n  margin-top: -5px;\r\n  border-width: 5px 5px 5px 0;\r\n  border-right-color: #000;\r\n}\r\n.tooltip.left .tooltip-arrow {\r\n  top: 50%;\r\n  right: 0;\r\n  margin-top: -5px;\r\n  border-width: 5px 0 5px 5px;\r\n  border-left-color: #000;\r\n}\r\n.tooltip.bottom .tooltip-arrow {\r\n  top: 0;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000;\r\n}\r\n.tooltip.bottom-left .tooltip-arrow {\r\n  top: 0;\r\n  right: 5px;\r\n  margin-top: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000;\r\n}\r\n.tooltip.bottom-right .tooltip-arrow {\r\n  top: 0;\r\n  left: 5px;\r\n  margin-top: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000;\r\n}\r\n.popover {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1060;\r\n  display: none;\r\n  max-width: 276px;\r\n  padding: 1px;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  text-align: left;\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-shadow: none;\r\n  text-transform: none;\r\n  letter-spacing: normal;\r\n  word-break: normal;\r\n  word-spacing: normal;\r\n  word-wrap: normal;\r\n  white-space: normal;\r\n  background-color: #fff;\r\n  background-clip: padding-box;\r\n  border: 1px solid #ccc;\r\n  border: 1px solid rgba(0, 0, 0, .2);\r\n  border-radius: 6px;\r\n  box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\r\n\r\n  line-break: auto;\r\n}\r\n.popover.top {\r\n  margin-top: -10px;\r\n}\r\n.popover.right {\r\n  margin-left: 10px;\r\n}\r\n.popover.bottom {\r\n  margin-top: 10px;\r\n}\r\n.popover.left {\r\n  margin-left: -10px;\r\n}\r\n.popover-title {\r\n  padding: 8px 14px;\r\n  margin: 0;\r\n  font-size: 14px;\r\n  background-color: #f7f7f7;\r\n  border-bottom: 1px solid #ebebeb;\r\n  border-radius: 5px 5px 0 0;\r\n}\r\n.popover-content {\r\n  padding: 9px 14px;\r\n}\r\n.popover > .arrow,\r\n.popover > .arrow:after {\r\n  position: absolute;\r\n  display: block;\r\n  width: 0;\r\n  height: 0;\r\n  border-color: transparent;\r\n  border-style: solid;\r\n}\r\n.popover > .arrow {\r\n  border-width: 11px;\r\n}\r\n.popover > .arrow:after {\r\n  content: \"\";\r\n  border-width: 10px;\r\n}\r\n.popover.top > .arrow {\r\n  bottom: -11px;\r\n  left: 50%;\r\n  margin-left: -11px;\r\n  border-top-color: #999;\r\n  border-top-color: rgba(0, 0, 0, .25);\r\n  border-bottom-width: 0;\r\n}\r\n.popover.top > .arrow:after {\r\n  bottom: 1px;\r\n  margin-left: -10px;\r\n  content: \" \";\r\n  border-top-color: #fff;\r\n  border-bottom-width: 0;\r\n}\r\n.popover.right > .arrow {\r\n  top: 50%;\r\n  left: -11px;\r\n  margin-top: -11px;\r\n  border-right-color: #999;\r\n  border-right-color: rgba(0, 0, 0, .25);\r\n  border-left-width: 0;\r\n}\r\n.popover.right > .arrow:after {\r\n  bottom: -10px;\r\n  left: 1px;\r\n  content: \" \";\r\n  border-right-color: #fff;\r\n  border-left-width: 0;\r\n}\r\n.popover.bottom > .arrow {\r\n  top: -11px;\r\n  left: 50%;\r\n  margin-left: -11px;\r\n  border-top-width: 0;\r\n  border-bottom-color: #999;\r\n  border-bottom-color: rgba(0, 0, 0, .25);\r\n}\r\n.popover.bottom > .arrow:after {\r\n  top: 1px;\r\n  margin-left: -10px;\r\n  content: \" \";\r\n  border-top-width: 0;\r\n  border-bottom-color: #fff;\r\n}\r\n.popover.left > .arrow {\r\n  top: 50%;\r\n  right: -11px;\r\n  margin-top: -11px;\r\n  border-right-width: 0;\r\n  border-left-color: #999;\r\n  border-left-color: rgba(0, 0, 0, .25);\r\n}\r\n.popover.left > .arrow:after {\r\n  right: 1px;\r\n  bottom: -10px;\r\n  content: \" \";\r\n  border-right-width: 0;\r\n  border-left-color: #fff;\r\n}\r\n.carousel {\r\n  position: relative;\r\n}\r\n.carousel-inner {\r\n  position: relative;\r\n  width: 100%;\r\n  overflow: hidden;\r\n}\r\n.carousel-inner > .item {\r\n  position: relative;\r\n  display: none;\r\n  -webkit-transition: .6s ease-in-out left;\r\n          transition: .6s ease-in-out left;\r\n}\r\n.carousel-inner > .item > img,\r\n.carousel-inner > .item > a > img {\r\n  line-height: 1;\r\n}\r\n@media all and (transform-3d), (-webkit-transform-3d) {\r\n  .carousel-inner > .item {\r\n    -webkit-transition: -webkit-transform .6s ease-in-out;\r\n            transition: -webkit-transform .6s ease-in-out;\r\n            transition: transform .6s ease-in-out;\r\n            transition:         transform .6s ease-in-out, -webkit-transform .6s ease-in-out;\r\n\r\n    -webkit-backface-visibility: hidden;\r\n            backface-visibility: hidden;\r\n    -webkit-perspective: 1000px;\r\n            perspective: 1000px;\r\n  }\r\n  .carousel-inner > .item.next,\r\n  .carousel-inner > .item.active.right {\r\n    left: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n            transform: translate3d(100%, 0, 0);\r\n  }\r\n  .carousel-inner > .item.prev,\r\n  .carousel-inner > .item.active.left {\r\n    left: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n            transform: translate3d(-100%, 0, 0);\r\n  }\r\n  .carousel-inner > .item.next.left,\r\n  .carousel-inner > .item.prev.right,\r\n  .carousel-inner > .item.active {\r\n    left: 0;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n.carousel-inner > .active,\r\n.carousel-inner > .next,\r\n.carousel-inner > .prev {\r\n  display: block;\r\n}\r\n.carousel-inner > .active {\r\n  left: 0;\r\n}\r\n.carousel-inner > .next,\r\n.carousel-inner > .prev {\r\n  position: absolute;\r\n  top: 0;\r\n  width: 100%;\r\n}\r\n.carousel-inner > .next {\r\n  left: 100%;\r\n}\r\n.carousel-inner > .prev {\r\n  left: -100%;\r\n}\r\n.carousel-inner > .next.left,\r\n.carousel-inner > .prev.right {\r\n  left: 0;\r\n}\r\n.carousel-inner > .active.left {\r\n  left: -100%;\r\n}\r\n.carousel-inner > .active.right {\r\n  left: 100%;\r\n}\r\n.carousel-control {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: 15%;\r\n  font-size: 20px;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);\r\n  filter: alpha(opacity=50);\r\n  opacity: .5;\r\n}\r\n.carousel-control.left {\r\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\r\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, .0001)));\r\n  background-image:         linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\r\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\r\n  background-repeat: repeat-x;\r\n}\r\n.carousel-control.right {\r\n  right: 0;\r\n  left: auto;\r\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\r\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .0001)), to(rgba(0, 0, 0, .5)));\r\n  background-image:         linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\r\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\r\n  background-repeat: repeat-x;\r\n}\r\n.carousel-control:hover,\r\n.carousel-control:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  filter: alpha(opacity=90);\r\n  outline: 0;\r\n  opacity: .9;\r\n}\r\n.carousel-control .icon-prev,\r\n.carousel-control .icon-next,\r\n.carousel-control .glyphicon-chevron-left,\r\n.carousel-control .glyphicon-chevron-right {\r\n  position: absolute;\r\n  top: 50%;\r\n  z-index: 5;\r\n  display: inline-block;\r\n  margin-top: -10px;\r\n}\r\n.carousel-control .icon-prev,\r\n.carousel-control .glyphicon-chevron-left {\r\n  left: 50%;\r\n  margin-left: -10px;\r\n}\r\n.carousel-control .icon-next,\r\n.carousel-control .glyphicon-chevron-right {\r\n  right: 50%;\r\n  margin-right: -10px;\r\n}\r\n.carousel-control .icon-prev,\r\n.carousel-control .icon-next {\r\n  width: 20px;\r\n  height: 20px;\r\n  font-family: serif;\r\n  line-height: 1;\r\n}\r\n.carousel-control .icon-prev:before {\r\n  content: '\\2039';\r\n}\r\n.carousel-control .icon-next:before {\r\n  content: '\\203A';\r\n}\r\n.carousel-indicators {\r\n  position: absolute;\r\n  bottom: 10px;\r\n  left: 50%;\r\n  z-index: 15;\r\n  width: 60%;\r\n  padding-left: 0;\r\n  margin-left: -30%;\r\n  text-align: center;\r\n  list-style: none;\r\n}\r\n.carousel-indicators li {\r\n  display: inline-block;\r\n  width: 10px;\r\n  height: 10px;\r\n  margin: 1px;\r\n  text-indent: -999px;\r\n  cursor: pointer;\r\n  background-color: #000 \\9;\r\n  background-color: rgba(0, 0, 0, 0);\r\n  border: 1px solid #fff;\r\n  border-radius: 10px;\r\n}\r\n.carousel-indicators .active {\r\n  width: 12px;\r\n  height: 12px;\r\n  margin: 0;\r\n  background-color: #fff;\r\n}\r\n.carousel-caption {\r\n  position: absolute;\r\n  right: 15%;\r\n  bottom: 20px;\r\n  left: 15%;\r\n  z-index: 10;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);\r\n}\r\n.carousel-caption .btn {\r\n  text-shadow: none;\r\n}\r\n@media screen and (min-width: 768px) {\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .glyphicon-chevron-right,\r\n  .carousel-control .icon-prev,\r\n  .carousel-control .icon-next {\r\n    width: 30px;\r\n    height: 30px;\r\n    margin-top: -15px;\r\n    font-size: 30px;\r\n  }\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .icon-prev {\r\n    margin-left: -15px;\r\n  }\r\n  .carousel-control .glyphicon-chevron-right,\r\n  .carousel-control .icon-next {\r\n    margin-right: -15px;\r\n  }\r\n  .carousel-caption {\r\n    right: 20%;\r\n    left: 20%;\r\n    padding-bottom: 30px;\r\n  }\r\n  .carousel-indicators {\r\n    bottom: 20px;\r\n  }\r\n}\r\n.clearfix:before,\r\n.clearfix:after,\r\n.dl-horizontal dd:before,\r\n.dl-horizontal dd:after,\r\n.container:before,\r\n.container:after,\r\n.container-fluid:before,\r\n.container-fluid:after,\r\n.row:before,\r\n.row:after,\r\n.form-horizontal .form-group:before,\r\n.form-horizontal .form-group:after,\r\n.btn-toolbar:before,\r\n.btn-toolbar:after,\r\n.btn-group-vertical > .btn-group:before,\r\n.btn-group-vertical > .btn-group:after,\r\n.nav:before,\r\n.nav:after,\r\n.navbar:before,\r\n.navbar:after,\r\n.navbar-header:before,\r\n.navbar-header:after,\r\n.navbar-collapse:before,\r\n.navbar-collapse:after,\r\n.pager:before,\r\n.pager:after,\r\n.panel-body:before,\r\n.panel-body:after,\r\n.modal-footer:before,\r\n.modal-footer:after {\r\n  display: table;\r\n  content: \" \";\r\n}\r\n.clearfix:after,\r\n.dl-horizontal dd:after,\r\n.container:after,\r\n.container-fluid:after,\r\n.row:after,\r\n.form-horizontal .form-group:after,\r\n.btn-toolbar:after,\r\n.btn-group-vertical > .btn-group:after,\r\n.nav:after,\r\n.navbar:after,\r\n.navbar-header:after,\r\n.navbar-collapse:after,\r\n.pager:after,\r\n.panel-body:after,\r\n.modal-footer:after {\r\n  clear: both;\r\n}\r\n.center-block {\r\n  display: block;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n.pull-right {\r\n  float: right !important;\r\n}\r\n.pull-left {\r\n  float: left !important;\r\n}\r\n.hide {\r\n  display: none !important;\r\n}\r\n.show {\r\n  display: block !important;\r\n}\r\n.invisible {\r\n  visibility: hidden;\r\n}\r\n.text-hide {\r\n  font: 0/0 a;\r\n  color: transparent;\r\n  text-shadow: none;\r\n  background-color: transparent;\r\n  border: 0;\r\n}\r\n.hidden {\r\n  display: none !important;\r\n}\r\n.affix {\r\n  position: fixed;\r\n}\r\n@-ms-viewport {\r\n  width: device-width;\r\n}\r\n.visible-xs,\r\n.visible-sm,\r\n.visible-md,\r\n.visible-lg {\r\n  display: none !important;\r\n}\r\n.visible-xs-block,\r\n.visible-xs-inline,\r\n.visible-xs-inline-block,\r\n.visible-sm-block,\r\n.visible-sm-inline,\r\n.visible-sm-inline-block,\r\n.visible-md-block,\r\n.visible-md-inline,\r\n.visible-md-inline-block,\r\n.visible-lg-block,\r\n.visible-lg-inline,\r\n.visible-lg-inline-block {\r\n  display: none !important;\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs {\r\n    display: block !important;\r\n  }\r\n  table.visible-xs {\r\n    display: table !important;\r\n  }\r\n  tr.visible-xs {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-xs,\r\n  td.visible-xs {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm {\r\n    display: block !important;\r\n  }\r\n  table.visible-sm {\r\n    display: table !important;\r\n  }\r\n  tr.visible-sm {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-sm,\r\n  td.visible-sm {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md {\r\n    display: block !important;\r\n  }\r\n  table.visible-md {\r\n    display: table !important;\r\n  }\r\n  tr.visible-md {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-md,\r\n  td.visible-md {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg {\r\n    display: block !important;\r\n  }\r\n  table.visible-lg {\r\n    display: table !important;\r\n  }\r\n  tr.visible-lg {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-lg,\r\n  td.visible-lg {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .hidden-xs {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .hidden-sm {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .hidden-md {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .hidden-lg {\r\n    display: none !important;\r\n  }\r\n}\r\n.visible-print {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print {\r\n    display: block !important;\r\n  }\r\n  table.visible-print {\r\n    display: table !important;\r\n  }\r\n  tr.visible-print {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-print,\r\n  td.visible-print {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n.visible-print-block {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print-block {\r\n    display: block !important;\r\n  }\r\n}\r\n.visible-print-inline {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n.visible-print-inline-block {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media print {\r\n  .hidden-print {\r\n    display: none !important;\r\n  }\r\n}", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(8, function() {
				var newContent = __webpack_require__(8);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	exports.i(__webpack_require__(9), "");

	// module
	exports.push([module.id, "ul {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\nbody, html {\r\n    height: 100%;\r\n    font-family: 'Arial', 'Microsoft YaHei';\r\n}\r\n\r\nbody {\r\n    background-color: #eceeee;\r\n}\r\n\r\nimg {\r\n    border: none;\r\n}\r\n\r\n.banner {\r\n\r\n    background: url(" + __webpack_require__(14) + ") no-repeat center top;\r\n    height: 210px;\r\n    width: 100%;\r\n    display: block;\r\n    overflow: hidden;\r\n    clear: both;\r\n}\r\n\r\n.wrapper {\r\n    position: relative;\r\n    width: 1200px;\r\n    min-height: 100%;\r\n    height: auto;\r\n    margin: 0 auto;\r\n    overflow: hidden;\r\n    background: #f0f0f0;\r\n}\r\n\r\n.sidebar {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 210px;\r\n    width: 200px;\r\n    overflow: hidden;\r\n    height: calc(100% - 210px);\r\n    border-right: solid 1px #c4c4c4;\r\n    background-color: #f5f5f5;\r\n}\r\n\r\n.sidebar .nav .has-sub {\r\n    position: relative;\r\n    padding: 10px 0 10px 30px;\r\n    line-height: 25px;\r\n    text-align: left;\r\n    border-bottom: solid 1px #ffffff;\r\n}\r\n\r\n.sidebar .nav .has-sub:after {\r\n    content: '';\r\n    position: absolute;\r\n    margin-top: 9px;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 1px;\r\n    background: #dcdcdc;\r\n}\r\n\r\n.sidebar .nav .has-sub:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 15px;\r\n    top: 12px;\r\n    width: 4px;\r\n    height: 20px;\r\n    background: #e94709;\r\n}\r\n\r\n.sidebar .nav .has-sub a {\r\n    padding: 0;\r\n    display: block;\r\n    color: #333333;\r\n    font-weight: normal;\r\n    font-size: 16px;\r\n    text-decoration: none;\r\n    text-align: left;\r\n}\r\n\r\n.sidebar .nav .has-sub a:focus {\r\n    background: transparent;\r\n}\r\n\r\n.sidebar .nav .has-sub .sub-menu {\r\n    display: none;\r\n}\r\n\r\n.sidebar .nav .has-sub .sub-menu li {\r\n    padding: 3px 0;\r\n}\r\n\r\n.sidebar .nav .has-sub .sub-menu a {\r\n    color: #6b6b6b;\r\n    font-size: 14px;\r\n    font-weight: normal;\r\n    text-decoration: none;\r\n}\r\n\r\n.sidebar .nav .has-sub .sub-menu a.active {\r\n    color: #ff6600;\r\n}\r\n\r\n.sidebar .nav .has-sub.active .sub-menu {\r\n    display: block;\r\n}\r\n\r\nmain {\r\n    margin: 5px 0 10px 210px;\r\n    min-height: 500px;\r\n    height: auto;\r\n    overflow: hidden;\r\n    background: #ffffff;\r\n}\r\n\r\nmain.outline {\r\n    border: solid 1px #c1c1c1;\r\n    padding: 23px;\r\n}\r\n\r\npre {\r\n    display: block;\r\n    padding: 9.5px;\r\n    margin: 0 0 10px;\r\n    font-size: 13px;\r\n    word-break: break-all;\r\n    word-wrap: break-word;\r\n    border: 1px solid #ccc;\r\n}", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "\r\n@font-face {font-family: \"iconfont\";\r\n  src: url(" + __webpack_require__(10) + "); /* IE9*/\r\n  src: url(" + __webpack_require__(10) + ") format('embedded-opentype'), \r\n  url(" + __webpack_require__(11) + ") format('woff'), \r\n  url(" + __webpack_require__(12) + ") format('truetype'), \r\n  url(" + __webpack_require__(13) + ") format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -webkit-text-stroke-width: 0.2px;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.icon-biaoqian:before { content: \"\\E600\"; }\r\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/font/iconfont-1853d273.eot";

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:application/font-woff;base64,d09GRgABAAAAAAwIABAAAAAAE4AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABbAAAABoAAAAccumkukdERUYAAAGIAAAAHAAAACAAMgAET1MvMgAAAaQAAABMAAAAYFcOXDhjbWFwAAAB8AAAAEoAAAFKy5whr2N2dCAAAAI8AAAAFAAAACQMlf+2ZnBnbQAAAlAAAAT8AAAJljD3npVnYXNwAAAHTAAAAAgAAAAIAAAAEGdseWYAAAdUAAACIQAAAyCthzCFaGVhZAAACXgAAAAwAAAANgm9ReBoaGVhAAAJqAAAAB0AAAAkBzID52htdHgAAAnIAAAAFAAAABQKtACSbG9jYQAACdwAAAAMAAAADAGMAeBtYXhwAAAJ6AAAACAAAAAgAScCDG5hbWUAAAoIAAABQAAAAj24cJyDcG9zdAAAC0gAAAAlAAAANEyRn89wcmVwAAALcAAAAJUAAACVpbm+ZnicY2BgYGQAgjO2i86D6MthDF9hNABJRQa4AAB4nGNgZGBg4ANiCQYQYGJgBEIWMAbxGAAEdgA3eJxjYGH+wviFgZWBgWkm0xkGBoZ+CM34msGYkRMoysDGzAADjAIMCBCQ5prCcICh4hkDc8P/BoYYZgkGeZAakByQDQIKDIwA0GYM7nicY2BgYGaAYBkGRgYQcAHyGMF8FgYNIM0GpBkZmBgqnjH8/w/kg+n/3VIsUPVAwMjGAOcwMgEJJgZUwMhAM8BMO6NJAgAbmQkzAAB4nGNgQANGDEbMEv8fImMAQ4AIUXicnVVpd9NGFJW8ZE/aksRQRNsxE6c0GpmwBQMuBCmyC+niQGgl6CInMV34A3zsZ/2ap9Ce04/8tN47XhJaek7bHEvvvpk7b9N7E3GMqOx5IK5RR0pe96Sy/lQq8bOkrutenijp9ZK6bKeekhZRK02VzMX9I7lEdS5WskmwScbrXqKeqzzvg9JLMqwoSyLaItrKvCxNU08cP021OL1kkKaBlIyCnUqjjxCqUS+Rqg5lSodevZ6KmwVSNhrxqKOiehAq7hzPOaWNOmCkcpXDXLFZbeR7Sdbz+o/SRKfY236cYMNj9CNXgVSMzMD2NB6HTyTT0V4iM5F/7LhOlIVSG1wAr2qwx6BK8aG48UG2E8jUeM3xdVGpNDIV57rPstksHY+VEOXB39ihlBu6v4Oz06aoVmNx+8AzBjkplCh6SBaADlOZp/YI2jy0QGaN+qPiHPB1CC+yEGUqz5Qs6FAHMmd295Ni2t1J12RxoF8GMm9295Ldx8NFr471Zbu+YApnMXqSFIuLEdyHMuunTLvUCEcZF3PAxTxe4ta0QsjIAoxKI8xRW/ie2ahrnB1jb3Qej9VTZNJF/N1Mfj04qVjhOMt6R9xInLvHruvCVSCLCKca7yeOLOpQZbD6+9KS6yw4YZhnxULFlxe+dxH5LzFuP5B3TOFSvmuKEuV7pihTnjFFhXIZhaVcMcUU5aoppilrppihPGuKWcpzRqb9f+n7ffg+hzPn4ZvSg2/KC/BN+QF8U34I35QfwTelgm/KOnxTXoRvSm3gbSlTEaqYsXT47SVataFqOTO4wD4PZM2I9kVvBNIwSnXVSSl1v6VV/iT566LHY+uTkro1aWyIu7pps/j4dMZvbl0y6oadq0+MI+WhPXT12DShU/vN4d/OXd0qLrmriGrDqDYimASANui3AvFN82w7EPOWXXz8QzAC1M+pNVRTde3UlRoP8ryruxie5MDjiGOgjeuursBLE1NWQ/PhZykyFfuDvKmVauewdflkWzWHNqTC2yL2lWScpu295FVJlZX3qrRePp+GIXp6FteEtmzdyaQSoVEzzvHwripF2ZGWctQ/QueXor4HnHF2QevDMe5E3UG1Nex0+PlmI2sLJoamtL0ToGQsXRVjUeVZnGN0DWsdb9wSnq6nJxbxKTaZj8JKdX2Uj24jzSt2WWbRqEp1dJf2WeyrNv0yO2hYHWc/aao27uphW40qUj1Vvga0B3ZW3fhQDys+6qBRVTXb6NrIYzQua8Z/DMhiXPnrRqsm0+/glmqnzWLNXUFz35gs904vb73JfivnppGm/1ajLSOX/RyO+W0R4N85KHZT1kC9NWmIcQHZCxgu1UTnDs3dxiDiOvsfndP9b83CIDmrbY3ZPPXh6ukokjtMeZxlm1nW9SjNUbSTxD5FYqvDicFNjeFYbsoGBuTuP6zfwz3griyLD7xtJIC4z9rEqJ7q4O4eVyM07Cu5DxiZY8e5DbAD4BLE5ti1Kx0Au9Il5w7AZ+QQPCCH4CE5BLvk3AT4nByCL8gh+JIcgq/IuQXQI4dgjxyCR+QQPCanDbBPDsETcgi+JofgG3JaAAk5BCk5BE/JIXhmZHNS5m+pyHWg7yy6AfS97RooW1B+MHJlws6oWHbfIrIPLCL10MjVCfWIiqUOLCL1uUWk/mjk2oT6ExVL/dkiUn+xiNQXxpeZgZTXei95Rwd/Aiu+rH4AAQAB//8AD3icndLBjtJgEAfwmWn7UUr7QVtoocACZWmXgAQKLBGiNq4eXFZdIFGIhsTEkPgEe/GwFxMPHnwEY0xM9rQPsHcv+xJGz8YXWPQ7ezCryRwmk//8kkkGCHwAjOgMJEhAMw4AQCKQngIh0hSI8LEsOjwASDBFFjHJVNKtvlkzw75Z9zHz4/KSzq6e+LQRuwq0f32VLqQ8ONCFMcxhjSfTc/t4GR8SgsEN4BuQOHJpDaiq+DyDSVVjybWJOpOZvoaUnHqVRhWYrrIlaAmF5JQmryzk3JiBYWj8bnF67gpx+hdRTWqbfyTzgjy6HilvrmXGj/7gcCM8jurL/wNXq1W8t1hMJlHPdRfrxfrZcjKfzKcHo2FvHI3drtudmb28uZeLbaeFrIU+pzLWhoNgOOhQC3M1JZd1spzqLGhhWEuIROh36Ba6Pss6/Wh/ELgswaUdnLBoP+xgGIQ4HNymCUZOGbFQ9BZWo2RJ71HLhztvtof0EXOVOucVXr2xfdAu+9lCoWqrJ7pl6YZlvVOZkpJJTvPGwew43nWdpJJUFLb9pKS93EWlSRXUC6F31MyUZKNatF68HbjjccNNIp6eol2s8s93TM8U9dpz7F2eMdS8Z9RNO4sn31N5Wy8H38QLwz24KV3QF+BQjj2OCBiLMcJD8ZU4EwG8P+xRpoVBveaznCmurUUjm36WulfbcDQKibqlS/oQjoJtOxiFWBWLvwFljWWdAAAAeJxjYGRgYADiR4Xmi+P5bb4yyLMwgMDlMIavcFrp/0PmPcwSQC4HAxNIFAA55wsUeJxjYGRgYJb4/5AhhoUBBJj3MDAyoAJWAFNQAyIAAAABdgAiAAAAAAFVAAAD6QAsBAAARAAAACgAKAAoAWQBkAABAAAABQBfAAUAAAAAAAIAJgA0AGwAAACKAXcAAAAAeJx9kL1uwkAQhMdgEJFSoLRpVk4DxVlny474qWOqtOkR2GCJ2JJ/gIegThXlEdLm9TI+Lk0KbN3ed7fj3VkDuMcHHHSPgxEeLPcwxNRyH084W3ap+bY8QOK8WB5i5HxR6bh3vBmbrzrusf6j5T4SaMsuNZ+WB7jgx/IQY+eCHBuUKJCZ2AD5piyysiC9IsWWghbvPKTbvOWeWF23V9hRIgjhs5tgwfW/3vV2DoWYK6QuwDPLsENSVrtUQl/LQv66EucqVqEOKLrh7Y2NK9SUdClh0auFJVfDN8Oavhtm99RcjUxwpManmYg/XGjnwDgzVDHGpoLCyoyk7elsqkeGT4we8545ZSbWNJNWdV4WEnCUpTRNtm6bcp9zmslR+/NoKuogM1GVxFrUSkLN7SxBJOok3soTlYmqb837CxG3WQV4nGNgYgCD/80MRgzYACsQMzIwMUQzMrGX5mW6mhkYAABZUARLAAAAS7gAyFJYsQEBjlm5CAAIAGMgsAEjRCCwAyNwsA5FICBLuAAOUUuwBlNaWLA0G7AoWWBmIIpVWLACJWGwAUVjI2KwAiNEswoJBQQrswoLBQQrsw4PBQQrWbIEKAlFUkSzCg0GBCuxBgFEsSQBiFFYsECIWLEGA0SxJgGIUVi4BACIWLEGAURZWVlZuAH/hbAEjbEFAEQAAAA="

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "data:application/x-font-ttf;base64,AAEAAAAPAIAAAwBwRkZUTXLppLoAAAD8AAAAHE9TLzJXDlw4AAABGAAAAGBjbWFwy5whrwAAAXgAAAFKY3Z0IAyV/7YAAAjoAAAAJGZwZ20w956VAAAJDAAACZZnYXNwAAAAEAAACOAAAAAIZ2x5Zq2HMIUAAALEAAADHmhlYWQJqUXgAAAF5AAAADZoaGVhBzID5wAABhwAAAAkaG10eAq0AJIAAAZAAAAAFGxvY2EBjAHfAAAGVAAAAAxtYXhwAScKKwAABmAAAAAgbmFtZV1JHDQAAAaAAAACK3Bvc3RMkZ/PAAAIrAAAADRwcmVwpbm+ZgAAEqQAAACVAAAAAQAAAADMPaLPAAAAANNWAPUAAAAA01YA9QAEA/QB9AAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAgAGAwAAAAAAAAAAAAEQAAAAAAAAAAAAAABQZkVkAMAAeOYAA4D/gABcAxgAHwAAAAEAAAAAAxgAAAAAACAAAQAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAgB45gD//wAAAHjmAP///4saBAABAAAAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAIgAAATICqgADAAcAKUAmAAAAAwIAA1cAAgEBAksAAgIBTwQBAQIBQwAABwYFBAADAAMRBQ8rMxEhESczESMiARDuzMwCqv1WIgJmAAAABQAs/+EDvAMYABYAMAA6AFIAXgF3S7ATUFhASgIBAA0ODQAOZgADDgEOA14AAQgIAVwQAQkICgYJXhEBDAYEBgxeAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CG0uwF1BYQEsCAQANDg0ADmYAAw4BDgNeAAEICAFcEAEJCAoICQpmEQEMBgQGDF4ACwQLaQ8BCAAGDAgGWAAKBwUCBAsKBFkSAQ4ODVEADQ0KDkIbS7AYUFhATAIBAA0ODQAOZgADDgEOA14AAQgIAVwQAQkICggJCmYRAQwGBAYMBGYACwQLaQ8BCAAGDAgGWAAKBwUCBAsKBFkSAQ4ODVEADQ0KDkIbQE4CAQANDg0ADmYAAw4BDgMBZgABCA4BCGQQAQkICggJCmYRAQwGBAYMBGYACwQLaQ8BCAAGDAgGWAAKBwUCBAsKBFkSAQ4ODVEADQ0KDkJZWVlAKFNTOzsyMRcXU15TXltYO1I7UktDNzUxOjI6FzAXMFERMRgRKBVAExYrAQYrASIOAh0BITU0JjU0LgIrARUhBRUUFhQOAiMGJisBJyEHKwEiJyIuAj0BFyIGFBYzMjY0JhcGBw4DHgE7BjI2Jy4BJyYnATU0PgI7ATIWHQEBGRsaUxIlHBIDkAEKGCcehf5KAqIBFR8jDg4fDiAt/kksHSIUGRkgEwh3DBISDA0SEowIBgULBAIEDw4lQ1FQQCQXFgkFCQUFBv6kBQ8aFbwfKQIfAQwZJxpMKRAcBA0gGxJhiDQXOjolFwkBAYCAARMbIA6nPxEaEREaEXwaFhMkDhANCBgaDSMRExQBd+QLGBMMHSbjAAABAEQAOQO8AscADgAdQBoOAQEAAUAAAAEBAE0AAAABUQABAAFFNTECECsBJiMhIgYVERQWMyEyNxMC8Bww/f4nNzcnAgIwHMwCoCc3Jv4sJjcnASAAAAAAAQAAAAEAAOCSq2tfDzz1AAsEAAAAAADTVgD1AAAAANNWAPUAIv/hA7wDGAAAAAgAAgAAAAAAAAABAAADGP/hAFwEAAAAAAADvAABAAAAAAAAAAAAAAAAAAAABQF2ACIAAAAAAVUAAAPpACwEAABEAAAAKAAoACgBZAGPAAEAAAAFAF8ABQAAAAAAAgAmADQAbAAAAIoJlgAAAAAAAAAMAJYAAQAAAAAAAQAIAAAAAQAAAAAAAgAGAAgAAQAAAAAAAwAjAA4AAQAAAAAABAAIADEAAQAAAAAABQBGADkAAQAAAAAABgAIAH8AAwABBAkAAQAQAIcAAwABBAkAAgAMAJcAAwABBAkAAwBGAKMAAwABBAkABAAQAOkAAwABBAkABQCMAPkAAwABBAkABgAQAYVpY29uZm9udE1lZGl1bUZvbnRGb3JnZSAyLjAgOiBpY29uZm9udCA6IDktNS0yMDE2aWNvbmZvbnRWZXJzaW9uIDEuMCA7IHR0ZmF1dG9oaW50ICh2MC45NCkgLWwgOCAtciA1MCAtRyAyMDAgLXggMTQgLXcgIkciIC1mIC1zaWNvbmZvbnQAaQBjAG8AbgBmAG8AbgB0AE0AZQBkAGkAdQBtAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAAaQBjAG8AbgBmAG8AbgB0ACAAOgAgADkALQA1AC0AMgAwADEANgBpAGMAbwBuAGYAbwBuAHQAVgBlAHIAcwBpAG8AbgAgADEALgAwACAAOwAgAHQAdABmAGEAdQB0AG8AaABpAG4AdAAgACgAdgAwAC4AOQA0ACkAIAAtAGwAIAA4ACAALQByACAANQAwACAALQBHACAAMgAwADAAIAAtAHgAIAAxADQAIAAtAHcAIAAiAEcAIgAgAC0AZgAgAC0AcwBpAGMAbwBuAGYAbwBuAHQAAAIAAAAAAAD/gwAyAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAEAAgBbAQIHdW5pRTYwMAABAAH//wAPAAAAAAAAAAAAAAAAAAAAAAAyADIDGP/hAxj/4QMY/+EDGP/hsAAssCBgZi2wASwgZCCwwFCwBCZasARFW1ghIyEbilggsFBQWCGwQFkbILA4UFghsDhZWSCwCkVhZLAoUFghsApFILAwUFghsDBZGyCwwFBYIGYgiophILAKUFhgGyCwIFBYIbAKYBsgsDZQWCGwNmAbYFlZWRuwACtZWSOwAFBYZVlZLbACLCBFILAEJWFkILAFQ1BYsAUjQrAGI0IbISFZsAFgLbADLCMhIyEgZLEFYkIgsAYjQrIKAAIqISCwBkMgiiCKsAArsTAFJYpRWGBQG2FSWVgjWSEgsEBTWLAAKxshsEBZI7AAUFhlWS2wBCywCCNCsAcjQrAAI0KwAEOwB0NRWLAIQyuyAAEAQ2BCsBZlHFktsAUssABDIEUgsAJFY7ABRWJgRC2wBiywAEMgRSCwACsjsQQEJWAgRYojYSBkILAgUFghsAAbsDBQWLAgG7BAWVkjsABQWGVZsAMlI2FERC2wByyxBQVFsAFhRC2wCCywAWAgILAKQ0qwAFBYILAKI0JZsAtDSrAAUlggsAsjQlktsAksILgEAGIguAQAY4ojYbAMQ2AgimAgsAwjQiMtsAosS1RYsQcBRFkksA1lI3gtsAssS1FYS1NYsQcBRFkbIVkksBNlI3gtsAwssQANQ1VYsQ0NQ7ABYUKwCStZsABDsAIlQrIAAQBDYEKxCgIlQrELAiVCsAEWIyCwAyVQWLAAQ7AEJUKKiiCKI2GwCCohI7ABYSCKI2GwCCohG7AAQ7ACJUKwAiVhsAgqIVmwCkNHsAtDR2CwgGIgsAJFY7ABRWJgsQAAEyNEsAFDsAA+sgEBAUNgQi2wDSyxAAVFVFgAsA0jQiBgsAFhtQ4OAQAMAEJCimCxDAQrsGsrGyJZLbAOLLEADSstsA8ssQENKy2wECyxAg0rLbARLLEDDSstsBIssQQNKy2wEyyxBQ0rLbAULLEGDSstsBUssQcNKy2wFiyxCA0rLbAXLLEJDSstsBgssAcrsQAFRVRYALANI0IgYLABYbUODgEADABCQopgsQwEK7BrKxsiWS2wGSyxABgrLbAaLLEBGCstsBsssQIYKy2wHCyxAxgrLbAdLLEEGCstsB4ssQUYKy2wHyyxBhgrLbAgLLEHGCstsCEssQgYKy2wIiyxCRgrLbAjLCBgsA5gIEMjsAFgQ7ACJbACJVFYIyA8sAFgI7ASZRwbISFZLbAkLLAjK7AjKi2wJSwgIEcgILACRWOwAUViYCNhOCMgilVYIEcgILACRWOwAUViYCNhOBshWS2wJiyxAAVFVFgAsAEWsCUqsAEVMBsiWS2wJyywByuxAAVFVFgAsAEWsCUqsAEVMBsiWS2wKCwgNbABYC2wKSwAsANFY7ABRWKwACuwAkVjsAFFYrAAK7AAFrQAAAAAAEQ+IzixKAEVKi2wKiwgPCBHILACRWOwAUViYLAAQ2E4LbArLC4XPC2wLCwgPCBHILACRWOwAUViYLAAQ2GwAUNjOC2wLSyxAgAWJSAuIEewACNCsAIlSYqKRyNHI2EgWGIbIVmwASNCsiwBARUUKi2wLiywABawBCWwBCVHI0cjYbAGRStlii4jICA8ijgtsC8ssAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgsAlDIIojRyNHI2EjRmCwBEOwgGJgILAAKyCKimEgsAJDYGQjsANDYWRQWLACQ2EbsANDYFmwAyWwgGJhIyAgsAQmI0ZhOBsjsAlDRrACJbAJQ0cjRyNhYCCwBEOwgGJgIyCwACsjsARDYLAAK7AFJWGwBSWwgGKwBCZhILAEJWBkI7ADJWBkUFghGyMhWSMgILAEJiNGYThZLbAwLLAAFiAgILAFJiAuRyNHI2EjPDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA=="

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+DQpDcmVhdGVkIGJ5IEZvbnRGb3JnZSAyMDEyMDczMSBhdCBNb24gTWF5ICA5IDE2OjU1OjE3IDIwMTYNCiBCeSBhZG1pbg0KPC9tZXRhZGF0YT4NCjxkZWZzPg0KPGZvbnQgaWQ9Imljb25mb250IiBob3Jpei1hZHYteD0iMzc0IiA+DQogIDxmb250LWZhY2UgDQogICAgZm9udC1mYW1pbHk9Imljb25mb250Ig0KICAgIGZvbnQtd2VpZ2h0PSI1MDAiDQogICAgZm9udC1zdHJldGNoPSJub3JtYWwiDQogICAgdW5pdHMtcGVyLWVtPSIxMDI0Ig0KICAgIHBhbm9zZS0xPSIyIDAgNiAzIDAgMCAwIDAgMCAwIg0KICAgIGFzY2VudD0iODk2Ig0KICAgIGRlc2NlbnQ9Ii0xMjgiDQogICAgeC1oZWlnaHQ9Ijc5MiINCiAgICBiYm94PSIzNCAtMzEgOTU2IDc5MiINCiAgICB1bmRlcmxpbmUtdGhpY2tuZXNzPSI1MCINCiAgICB1bmRlcmxpbmUtcG9zaXRpb249Ii0xMDAiDQogICAgdW5pY29kZS1yYW5nZT0iVSswMDc4LUU2MDAiDQogIC8+DQo8bWlzc2luZy1nbHlwaCANCmQ9Ik0zNCAwdjY4MmgyNzJ2LTY4MmgtMjcyek02OCAzNGgyMDR2NjE0aC0yMDR2LTYxNHoiIC8+DQogICAgPGdseXBoIGdseXBoLW5hbWU9Ii5ub3RkZWYiIA0KZD0iTTM0IDB2NjgyaDI3MnYtNjgyaC0yNzJ6TTY4IDM0aDIwNHY2MTRoLTIwNHYtNjE0eiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm51bGwiIGhvcml6LWFkdi14PSIwIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJub25tYXJraW5ncmV0dXJuIiBob3Jpei1hZHYteD0iMzQxIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4IiB1bmljb2RlPSJ4IiBob3Jpei1hZHYteD0iMTAwMSIgDQpkPSJNMjgxIDU0M3EtMjcgLTEgLTUzIC0xaC04M3EtMTggMCAtMzYuNSAtNnQtMzIuNSAtMTguNXQtMjMgLTMydC05IC00NS41di03Nmg5MTJ2NDFxMCAxNiAtMC41IDMwdC0wLjUgMThxMCAxMyAtNSAyOXQtMTcgMjkuNXQtMzEuNSAyMi41dC00OS41IDloLTEzM3YtOTdoLTQzOHY5N3pNOTU1IDMxMHYtNTJxMCAtMjMgMC41IC01MnQwLjUgLTU4dC0xMC41IC00Ny41dC0yNiAtMzB0LTMzIC0xNnQtMzEuNSAtNC41cS0xNCAtMSAtMjkuNSAtMC41DQp0LTI5LjUgMC41aC0zMmwtNDUgMTI4aC00MzlsLTQ0IC0xMjhoLTI5aC0zNHEtMjAgMCAtNDUgMXEtMjUgMCAtNDEgOS41dC0yNS41IDIzdC0xMy41IDI5LjV0LTQgMzB2MTY3aDkxMXpNMTYzIDI0N3EtMTIgMCAtMjEgLTguNXQtOSAtMjEuNXQ5IC0yMS41dDIxIC04LjVxMTMgMCAyMiA4LjV0OSAyMS41dC05IDIxLjV0LTIyIDguNXpNMzE2IDEyM3EtOCAtMjYgLTE0IC00OHEtNSAtMTkgLTEwLjUgLTM3dC03LjUgLTI1dC0zIC0xNXQxIC0xNC41DQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+DQogICAgPGdseXBoIGdseXBoLW5hbWU9InVuaUU2MDAiIHVuaWNvZGU9IiYjeGU2MDA7IiBob3Jpei1hZHYteD0iMTAyNCIgDQpkPSJNNzUyIDY3MnEtMjggMzkgLTc2IDM5aC01MTRxLTM5IDAgLTY2LjUgLTI3LjV0LTI3LjUgLTY1LjV2LTQ2OHEwIC0zOCAyNy41IC02NS41dDY2LjUgLTI3LjVoNTE0cTQ4IDAgNzYgMzlsMjA0IDI4OHoiIC8+DQogIDwvZm9udD4NCjwvZGVmcz48L3N2Zz4NCg=="

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/img/banner-img-6489cfff.jpg";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./css/index": 7,
		"./css/index.css": 7,
		"./font/iconfont": 16,
		"./font/iconfont.css": 16,
		"./font/iconfont.eot": 10,
		"./font/iconfont.svg": 13,
		"./font/iconfont.ttf": 12,
		"./font/iconfont.woff": 11,
		"./html/home.html": 18,
		"./html/hrm.html": 19,
		"./html/menu1.html": 20,
		"./html/menu2.html": 21,
		"./html/menu3.html": 22,
		"./html/menu5.html": 23,
		"./html/menu6.html": 24,
		"./img/banner-img": 14,
		"./img/banner-img.jpg": 14,
		"./index.html": 25,
		"./js/home": 26,
		"./js/home.js": 26,
		"./js/hrm": 27,
		"./js/hrm.js": 27,
		"./js/index": 28,
		"./js/index.js": 28,
		"./js/menu1": 29,
		"./js/menu1.js": 29,
		"./js/menu2": 30,
		"./js/menu2.js": 30,
		"./js/menu3": 31,
		"./js/menu3.js": 31,
		"./js/menu5": 32,
		"./js/menu5.js": 32,
		"./js/menu6": 33,
		"./js/menu6.js": 33
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 15;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(17, function() {
				var newContent = __webpack_require__(17);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "\r\n@font-face {font-family: \"iconfont\";\r\n  src: url(" + __webpack_require__(10) + "); /* IE9*/\r\n  src: url(" + __webpack_require__(10) + ") format('embedded-opentype'), \r\n  url(" + __webpack_require__(11) + ") format('woff'), \r\n  url(" + __webpack_require__(12) + ") format('truetype'), \r\n  url(" + __webpack_require__(13) + ") format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -webkit-text-stroke-width: 0.2px;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.icon-biaoqian:before { content: \"\\E600\"; }\r\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div style=\"font-size:20px;\">\r\n    <div>\r\n        <span>▍About this webpack single page project</span><br />\r\n        <a target=\"_blank\" href=\"https://github.com/huangshuwei/webpackForSPA\">view on github</a>\r\n        <br /> <br />\r\n\r\n        <span>▍Useful links</span><br />\r\n        <a target=\"_blank\" href=\"https://webpack.github.io/docs/\">webpack official site</a><br />\r\n        <a target=\"_blank\" href=\"https://github.com/webpack/webpack/tree/master/examples/\">webpack official example</a>\r\n        <br /> <br/>\r\n    </div>\r\n</div>";

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div style=\"font-size:20px;\">\r\n    <div id=\"serverData\"></div>\r\n</div>";

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"title\"></h1>";

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<h2 id=\"title\"></h2>";

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<h3 id=\"title\"></h3>";

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<h5 id=\"title\"></h5>";

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<h6 id=\"title\"></h6>";

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<!doctype html>\r\n<html>\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <title>taoSPA</title>\r\n</head>\r\n\r\n<body style=\"overflow-y: scroll;\">\r\n    <div class=\"wrapper\">\r\n        <section class=\"banner\"></section>\r\n\r\n        <div class=\"sidebar\">\r\n            <ul class=\"nav\">\r\n                <li class=\"has-sub\">\r\n                    <a href=\"javascript:javascript:void(0);\">HOME</a>\r\n                    <ul class=\"sub-menu\">\r\n                        <li><a href=\"#home\">home</a></li>\r\n                        <li><a href=\"#hrm\">HRM</a></li>\r\n                    </ul>\r\n                </li>\r\n                <li class=\"has-sub\">\r\n                    <a href=\"javascript:javascript:void(0);\">MENU</a>\r\n                    <ul class=\"sub-menu\">\r\n                        <li><a href=\"#menu1\">menu1</a></li>\r\n                        <li><a href=\"#menu2\">menu2</a></li>\r\n                        <li><a href=\"#menu3\">menu3</a></li>\r\n                    </ul>\r\n                </li>\r\n                <li class=\"has-sub\">\r\n                    <a href=\"javascript:javascript:void(0);\">OTHERMENU</a>\r\n                    <ul class=\"sub-menu\">\r\n                        <li><a href=\"#menu5\">menu5</a></li>\r\n                        <li><a href=\"#menu6\">menu6</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <!--main content Start-->\r\n        <main class=\"outline\" id=\"container\">\r\n\r\n        </main>\r\n        <!--main content End-->\r\n    </div>\r\n</body>\r\n</html>\r\n\r\n\r\n";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function initialize(params) {
	    if (true) {
	        console.log(params);
	        console.log("homexxxhome");
	    }
	}

	module.exports = {
	    init: initialize
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	function getServer() {
	    /// <summary>
	    /// get backend server
	    /// </summary>
	    if (__DEVAPI__ !== '') {

	        $.ajax({
	            url: __DEVAPI__ + 'http://localhost:8888/',
	            data: {},
	            type: 'get',
	            dataType: 'text',
	            success: function success(text) {
	                $("#serverData").html(text);
	            }, error: function error() {

	                var text = '';
	                text += '▍if you see that,It means you have some trouble to get data by backend server. <br /> maybe it\'s the reason below:<br /> ';
	                text += '1、you should start the nodejs server,cd to \'mockServer\' folder,then \' node server.js\' to start the server. like this:<br /> ';
	                text += ' <pre>$ node server.js</pre>';
	                text += 'then refresh the broswer.<br /><br />';
	                text += '2、if first step is no use,may be Port 8888 is occupied! change Port 8888 to another one. then refresh the broswer.';

	                $("#serverData").html(text);
	            }

	        });
	    } else {

	        var text = 'if you want to test "Hot Module Replacement" with backend server,please make sure to use hrm mode :';
	        text += ' <pre>$ npm run dev-hrm</pre>';

	        $("#serverData").html(text);
	    }
	}

	function initialize(params) {

	    if (true) {
	        console.log(params);
	        console.log("hrmhrmtxj");
	    }

	    // getServer();
	}

	module.exports = {

	    init: initialize
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	// reference css
	__webpack_require__(3);

	__webpack_require__(7);

	var pageDatas = {
	    params: {}, // params
	    defaultRoute: 'home' // default Route
	};

	function initMenu() {
	    /// <summary>
	    /// init menu
	    /// </summary>

	    var modName = window.location.href.split('#')[1];

	    modName = modName || pageDatas.defaultRoute;

	    $("ul[class=sub-menu] li a").each(function (e) {
	        if ('#' + modName === $(this).attr('href')) {
	            $(this).addClass("active");
	            $(this).parent().parent().show(300);
	        }
	    });

	    loadHtml(modName);
	}

	function bindMenu() {
	    /// <summary>
	    /// bind menu
	    /// </summary>

	    $(document).on('click', '.sidebar .nav .has-sub', function (e) {
	        e.stopPropagation();

	        $(this).children(".sub-menu").toggle(300);
	    });

	    $("ul[class=sub-menu] li a").on('click', function (e) {
	        e.stopPropagation();

	        if ($(this).hasClass("active")) {
	            return false;
	        }

	        $("ul[class=sub-menu] li a").removeClass("active");
	        $(this).addClass("active");

	        var modName = $(this).attr('href');
	        modName = modName.split('#')[1];

	        loadHtml(modName);
	    });
	}

	function loadHtml(modName) {
	    /// <summary>
	    /// load html
	    /// </summary>
	    /// <param name="modName" type="type">modName</param>

	    pageDatas.params = null;

	    var htmlPath = './html/' + modName + '.html';
	    var jsPath = './' + modName;

	    $.get(htmlPath, [], function (html) {
	        $("#container").html(html);
	        loadJs(jsPath);
	    });
	}

	function loadJs(jsPath) {
	    /// <summary>
	    /// load js mod
	    /// </summary>
	    /// <param name="jsPath" type="type">js path</param>

	    var currentMod;
	    if (jsPath === './home') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(26);
	            currentMod.init();
	        }(__webpack_require__));
	    } else if (jsPath === './hrm') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(27);
	            currentMod.init(pageDatas.params);
	        }(__webpack_require__));
	    } else if (jsPath === './menu1') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(29);
	            currentMod.init(pageDatas.params);
	        }(__webpack_require__));
	    } else if (jsPath === './menu2') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(30);
	            currentMod.init(pageDatas.params);
	        }(__webpack_require__));
	    } else if (jsPath === './menu3') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(31);
	            currentMod.init(pageDatas.params);
	        }(__webpack_require__));
	    } else if (jsPath === './menu5') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(32);
	            currentMod.init(pageDatas.params);
	        }(__webpack_require__));
	    } else if (jsPath === './menu6') {
	        !/* require.ensure */(function (require) {
	            currentMod = __webpack_require__(33);
	            currentMod.init(pageDatas.params);
	        }(__webpack_require__));
	    } else {
	        if (true) {
	            console.log('no request mod');
	        }
	    }
	}

	function initialize() {
	    initMenu();

	    bindMenu();
	}

	$(function () {
	    initialize();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	function initialize(params) {

	    if (true) {
	        console.log(params);
	    }

	    $("#title").html('this is menu1');
	}

	module.exports = {
	    init: initialize
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	function initialize(params) {

	    if (true) {
	        console.log(params);
	    }

	    $("#title").html('this is menu2');
	}

	module.exports = {

	    init: initialize
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	function initialize(params) {

	    if (true) {
	        console.log(params);
	    }

	    $("#title").html('this is menu3');
	}

	module.exports = {

	    init: initialize
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	function initialize(params) {

	    if (true) {
	        console.log(params);
	    }

	    $("#title").html('this is menu5');
	}

	module.exports = {

	    init: initialize
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	function initialize(params) {

	    if (true) {
	        console.log(params);
	    }

	    $("#title").html('this is menu6');
	}

	module.exports = {

	    init: initialize
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
/******/ ]);