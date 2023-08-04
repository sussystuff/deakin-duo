//# sourceURL=typeahead-search.js
api.controller=function ($http, $filter, $location,spAriaUtil, $window, $scope, spAriaFocusManager, snAnalytics, spAISearchResults) {
	var c = this;
	$scope.$on('$locationChangeSuccess', onLocationChangeSuccess);
	function setSearchTerm(newUrl, oldUrl) {
		try {
			var oldQuery = new URL(oldUrl).searchParams.get("q");
			var newQuery = new URL(newUrl).searchParams.get("q");
			if (oldQuery === newQuery)
				return;
			if (c.data.aisEnabled)
				c.data.q = newQuery;
			else
				c.searchTerm = newQuery;
		} catch (e) {}
	}
var regExpr = /t=.+/;
	function onLocationChangeSuccess(event, newUrl, oldUrl) {
		if (!c.data.aisEnabled && c.searchSourceChanged(newUrl, oldUrl)) {
			var newUrlParams = newUrl.match(regExpr);
			if (!newUrlParams)
				c.searchType = null;
			else
				c.searchType = newUrlParams[0].split("&")[0].substring(2);
		}
		setSearchTerm(newUrl, oldUrl);
	}
	if (c.data.aisEnabled)
		intializeAISearch();
	else
		initializeZingSearch();
	function intializeAISearch() {
		c.aisSubmit = function(payload) {
			var shouldReloadPage = c.data.refreshPageOnSearch && $location.search().id === 'search';
			if (payload.searchTerm) {
				var newUrlObj = {
					id: 'search',
					spa: '1',
					q: payload.searchTerm,
					disableAllSuggestions: c.options.disable_all_suggestions && c.options.disable_all_suggestions.toString(),
					search_application: c.options.search_application || undefined,
					search_results_configuration: c.options.search_results_configuration || undefined,
					searchFilters : $location.search().searchFilters || c.data.aiSearchSourceFilter || undefined,
					disableSpellCheck: 'false'
				};
				if (shouldReloadPage)
					$scope.$emit("sp.page.reload");
				spAISearchResults.locationSearch(newUrlObj);
			}
		}
		c.navigate = spAISearchResults.navigate;
	}
	function initializeZingSearch() {
	c.options.glyph = c.options.glyph || 'search';
	c.options.title = c.options.title || c.data.searchMsg;
	c.options.color = c.options.color || "default";
	c.searchTerm = c.data.q;
	c.searchQuery = "";
	c.pageID = $scope.page && $scope.page.id;
	c.showSuggestions =  c.data.searchTypeBehavior === "suggestions" && c.data.isSuggestionsEnabled === "true";
	c.suggestionsLimit = c.options.limit || "";
	c.latitude = null;
	c.longitude = null;
	c.isGlideSignalsLoaded = false;
	c.isLocationTrackerDisabled = c.data.isLocationTrackerDisabled === "true";
	c.isTypeAheadEnabled = c.data.isTypeAheadEnabled === "true";
	
	c.sendAnalytics = function(type){
		var payload= {};
		payload.name = "Initiate Search";
		payload.data = {};
		payload.data["Keyword"] = (type == 'User Entered' ? c.searchTerm : c.searchQuery);
		payload.data["Type"] = type;
		payload.data["Page ID"] = c.pageID;
		snAnalytics.addEvent(payload);
	};
		if (c.isTypeAheadEnabled) {
		if (window.GlideSignals)
			initializeGlideSignals();
		if (!c.isLocationTrackerDisabled) {
			setUserLocationCoords(function(coords) {
				c.latitude = coords.latitude;
				c.longitude = coords.longitude;
			});
		}
		c.searchType = c.data.searchType;
	function initializeGlideSignals() {
			if (!c.isLocationTrackerDisabled && window.GlideSignals.init)
			window.GlideSignals.init();
			c.isGlideSignalsLoaded = window.GlideSignals.trackEvent || c.isGlideSignalsLoaded;
		}
	c.trackSuggestionsRenderedEvent = function(searchQueryLength, responseTimeInMilliSeconds){
		if(c.isGlideSignalsLoaded)
			GlideSignals.trackEvent('SEARCH_SUGGESTIONS_RENDERED', GlideSignals.priority.INFO,
																	{'applicationId': c.data.portalID,
																	 'searchQueryLength': searchQueryLength,
																	 'totalSuggestionsCount': c.totalSuggestionsCount,
																	 'userHistorySuggestionsCount' : c.userHistorySuggestionsCount,
																	 'instanceHistorySuggestionsCount' : c.instanceHistorySuggestionsCount,
																	 'responseTime': responseTimeInMilliSeconds+' ms'
																	});
	};
	c.trackSearchClickedEvent = function(model){
		if (!c.isGlideSignalsLoaded)
			return;
		if(c.showSuggestions) {
			GlideSignals.trackEvent('SEARCH_SUGGESTION_CLICKED', GlideSignals.priority.INFO,
																	{'applicationId': c.data.portalID,
																	 'searchQueryLength' : c.searchQuery.length,
																	 'suggestionClickedLength': model.name.length,
																	 'totalSuggestionsCount': c.totalSuggestionsCount,
																	 'suggestionClickedType': model.type,
																	 'aggregatedClickIndex': getSearchItemIndex(c.searchItems, model),
																	 'userHistorySuggestionsCount' : c.userHistorySuggestionsCount,
																	 'instanceHistorySuggestionsCount' : c.instanceHistorySuggestionsCount,
																	 'suggestionsDisplayLimit': c.suggestionsLimit,
																	 'relativeClickIndex': getRelativeSearchItemIndex(c.searchItems, model)
																	})
		}
		else {
			GlideSignals.trackEvent('SEARCH_TYPEAHEAD_CLICKED', GlideSignals.priority.INFO,
																	{'applicationId': c.data.portalID,
																		'searchQueryLength' : c.searchQuery.length,
																		'typeaheadClickedLength': model.name && model.name.length,
																		'resultSysId': model.sys_id,
																		'clickIndex': model.query_location != null ? model.query_location : getSearchItemIndex(c.searchItems, model),
																		'sourceId': model.type != null ? model.type : model.table,
																		'typeaheadDisplayLimit': c.options.limit
																	})
	  }
	}
	c.onSelect = function($item, $model, $label) {
		c.sendAnalytics(c.showSuggestions ? "Suggestions" : "Typeahead");
c.searchTerm = "";
		if (c.showSuggestions)
			$item.url = "?id=search&spa=1&q="+encodeURIComponent($item.name);
		if(!$item.url || $item.url === "")
			return;
		if (!c.showSuggestions) {
		    var index = $(".typeahead-popup li.active").data('index');
		    c.trackSearchResultClicked(index + 1);
		}
		c.trackSearchClickedEvent($model);
		if ($item.target)
			window.open($item.url, $item.target);
		else {
			var newUrl = $location.url($item.url);
			spAriaFocusManager.navigateToLink(newUrl.url());
		}
	};
	function recordSuggestionsCount(){
		c.instanceHistorySuggestionsCount = 0;
		c.userHistorySuggestionsCount = 0;
		c.searchItems.forEach(function(item){
			var isInstanceHistory = item.type === 'INSTANCE_HISTORY';
			c.instanceHistorySuggestionsCount += isInstanceHistory;
			c.userHistorySuggestionsCount += !isInstanceHistory;
		});
	}
	function getSearchItemIndex(items, targetItem) {
		return (items || []).findIndex(function(item) {
			return item.name === targetItem.name;
		});
	}
	function getRelativeSearchItemIndex(items, targetItem) {
		var groupedItems = (items || []).filter(function(item) {
			return item.type === targetItem.type;
		});
		return getSearchItemIndex(groupedItems, targetItem);
	}
	c.getSearchSuggestions = function(query) {
		c.searchQuery = query;
		if ($location.search().q == c.searchQuery)
				 return;
		 var payload = {
			 params: {
				 "sysparm_term" : c.searchQuery,
				 "sysparm_sp_portal_id": c.data.portalID,
				 "sysparm_suggestions_limit": c.suggestionsLimit,
				 "sysparm_search_sources": c.data.searchSourceSysIds || ""
			 },
headers : {'Accept' : 'application/json'}
		 };
		 var requestTimeStamp = new Date().getTime();
return $http.get("/api/now/search/sp_suggestions", payload).then(function(response){
			 var responseTimeStamp = new Date().getTime();
			 var responseTimeInMilliSeconds = (responseTimeStamp  - requestTimeStamp);
			 var result = response.data.result;
			 c.totalSuggestionsCount = result != null ? result.entries.length : 0;
			 if (c.totalSuggestionsCount > 0)
			    sendLiveMessage(c.totalSuggestionsCount);
			 c.searchItems = result.entries.map(function(item) {
				 item.query = getQueryToHighlight(item, c.searchQuery);
				 item.glyph = getIcon(item.type);
				 item.term = item.name;
				 return item;
			 });
			 recordSuggestionsCount();
			 c.trackSuggestionsRenderedEvent(query.length, responseTimeInMilliSeconds);
			 return c.searchItems;
		 });
		};
	function getSearchSources(results, c) {
		var sources = {};
		c.data.searchSources.map(function(key) {
			sources[key] = 0;
		});
		results.forEach(function(item) {
			if(sources[item.type])
				sources[item.type]++;
			else
				sources[item.type] = 1;
		});
		var searchSources = [];
		Object.keys(sources).map(function(key) {
			var source_id = c.data.searchSourceConfiguration[key] ? c.data.searchSourceConfiguration[key].sys_id : key;
			searchSources.push({
				source_id: source_id,
				number_of_results: sources[key]
			});
		});
		return searchSources;
	}
	function getSearchResultsSignals(results, c) {
		return results.map(function(item) {
			return {
				record_id: item.sys_id,
				table_name: item.table
			};
		});
	}
	function setUserLocationCoords(cb) {
		var onSuccess = function(pos) {
			return cb({
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			})
		};
		var onError = function() {
			return cb({
				latitude: null,
				longitude: null
			});
		};
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(onSuccess, onError, {
				enableHighAccuracy: true
			});
		}
	}
	function getResultDescription(result){
		return result.name || result.primary || result.sec_title;
	}
	c.trackSearchResultClicked = function(rank) {
			if (!rank || rank < 1) return ;
		var query = c.latestQuery;
		var results = _.get(c.data, 'results', []);
		var result = results[rank-1];
		var sourceTable = result.table || null;
		var payloadObject = {
			action: "GlideSPSearchAnalyticsUpdateRank",
			payload: {
				query: query,
				portal_id: this.data.portalID,
				page_id: this.pageID,
				results_per_source: getSearchSources(results, this),
				search_results: getSearchResultsSignals(results, this),
				refinement_occurred: false,
				signal_type: "CLICK",
				signal_value: rank,
				browser_info: $window.navigator.userAgent,
				location: {
					latitude: c.latitude,
					longitude: c.longitude
				},
				result_event_sys_id : result.sys_id,
				label_description : getResultDescription(result),
				source_table: sourceTable
			}
		};
		$window.spSearchAnalytics = {
			query: query
		};
		c.server.get(payloadObject);
	}
	c.getResults = function(query) {
	  c.searchQuery = query;
		var payload = {
			"query": c.searchQuery,
			"portal": c.data.portalID,
			"page": c.pageID,
			"source": c.data.searchSources,
			"include_facets": false,
			"searchType": "typeahead"
		};
		if (c.options.limit || c.options.limit == 0)
			payload.count = c.options.limit;
return $http.post("/api/now/sp/search?sysparm_cancelable=true", payload).then(function(response) {
			if ($location.search().q == c.searchQuery)
				return;
			var result = response.data.result;
			var resultCount = result != null ? result.results.length : 0
			sendLiveMessage(resultCount);
			c.data.results = result.results;
			c.latestQuery = c.searchQuery;
			c.searchItems = result.results.map(function(item) {
				var config = c.data.searchSourceConfiguration[item.__search_source_id__];
				if (!item.url && config.linkToPage) {
					item.url = "?id=" + config.linkToPage;
					if (item.sys_id)
						item.url += "&sys_id=" + item.sys_id;
					if (item.table)
						item.url += "&table=" + item.table
				}
				if (item.link)
					item.url = item.link.indexOf('sys_attachment.do') != -1 ? item.link : config.linkToPage ? item.url : item.link;
				if (config.type == "ADVANCED") {
					item.templateID = config.template;
				} else {
					item.glyph = config.glyph;
				}
				return item;
			});
			if (c.searchItems.length == 0)
			    c.searchItems = [{"primary": c.data.noResultsFoundMsg}];
			return c.searchItems;
		});
	}
}
		c.searchSourceChanged = function(newUrl, oldUrl) {
			var newUrlParams = newUrl.match(regExpr),
			oldUrlParams = oldUrl.match(regExpr);
		if(!newUrlParams && !oldUrlParams) {
			return false;
		}
		if((!newUrlParams && oldUrlParams) || (newUrlParams && !oldUrlParams)) {
			return true;
		}
		return newUrlParams[0].split("&")[0] !== oldUrlParams[0].split("&")[0];
	}
	c.submitSearch = function() {
		c.sendAnalytics("User Entered");
		var shouldReloadPage = c.data.refreshPageOnSearch && $location.search().id === 'search';
		if (c.searchTerm) {
			var newUrl = $location.search({
				id: 'search',
				spa: '1',
				t: c.searchType,
				q: c.searchTerm
			});
			if (shouldReloadPage)
				$scope.$emit("sp.page.reload");
			spAriaFocusManager.navigateToLink(newUrl.url());
			$window.spSearchAnalytics = {
					page_id: c.pageID
			};
		}
	}
	function sendLiveMessage(resultCount) {
		spAriaUtil.sendLiveMessage(resultCount + " " +
									c.data.resultMsg + " " +
									(resultCount > 0 ? ' ' + c.data.navigationMsg : ''));
	}
	function getIcon(itemType) {
		return itemType === "INSTANCE_HISTORY" ? 'search' : 'clock-o';
	}
	function getQueryToHighlight(item, query) {
		return item.type === "INSTANCE_HISTORY" ? item.name.substring(query.length) : query;
	}
	}
}
