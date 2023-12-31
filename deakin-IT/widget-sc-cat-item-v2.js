//# sourceURL=widget-sc-cat-item-v2.js
api.controller=function ($scope, $http, spScUtil, spUtil, nowAttachmentHandler, $rootScope, $sanitize, $window, $sce, i18n, $timeout, $log, spAriaUtil, $document, spModal, $q, spAtf, $location, spAriaFocusManager, spSCNavStateManager, cabrillo, snAnalytics) {
	var c = this;
	c.isNative = cabrillo.isNative() && c.data.isMEE == 'true';
	c.isAgentApp = navigator.userAgent.indexOf('Agent') > -1;
	var webAnalyticsMsgSuffix = c.isNative ? " - NOW Mobile" : "";
	if (c.data.sc_cat_item && $scope.data.hasOwnProperty("_generatedItemGUID")) {
		c.data.sc_cat_item._attachmentGUID = $scope.data._generatedItemGUID;
	}
	c.isAccessibilityEnabled = $window.g_accessibility;
	$scope.isSCCartFixed = (c.options.display_cart_on_right === 'true' && c.isAccessibilityEnabled == 'false');
	$rootScope.isSCCartFixed = $scope.isSCCartFixed;
	$scope.setDefaultValue = !$scope.data.is_cart_item && !$scope.data.is_wishlist_item;
	
	$scope.disableControls = function(){
		return $scope.submitting || $scope.submitted || c.data.isPreview;
	}
	if (c.data.isPreview) {
		spUtil.recordWatch($scope, "sc_item_produced_record", "record_key=" + c.data.sys_id, function(response, data) {
			$window.location.reload();
		});
	}
	$scope.getFocus = function(field) {
		var focusVar = (field.type == "reference") ? "sp_formfield_reference_" : "sp_formfield_";
		focusVar += (field.name.startsWith("IO:") ? field._children[0]:field.name);
		var elem = document.getElementById(focusVar);
		if (field.type == "url" && elem.style.display == "none")
			elem = document.getElementById(focusVar+"_unlock");
		else if (field.type == "sc_multi_row")
			elem = document.getElementById(field.sys_id+"_add_row");
		else if (field.type == "sc_attachment") {
			var buttonElem = angular.element(elem).find('button')[0];
			if (buttonElem)
				elem = buttonElem;
		} else if (field.type != "html") {
			var inputElem = angular.element(elem).find('input')[0];
			if (inputElem)
				elem = inputElem;
		}
		if (elem)
			elem.focus();
	}
	c.quantity = c.data.quantity ? c.data.quantity + "" : "1";
	c.mandatory = [];
	$scope.stickyHeaderTop = '0px';
	c.widget._debugContextMenu = [
		[ i18n.getMessage("Open") + " sc_cat_item", function() {
			var item = c.data.sc_cat_item;
$window.open("/sp_config?id=form&table=" + item.table + "&sys_id=" + item.sys_id); }]
	];
	
 spUtil.recordWatch($scope, "sys_attachment", "table_sys_id=" + $scope.data._generatedItemGUID, function(response, data) {
		$scope.attachmentHandler.getAttachmentList();
			if (response.data) {
				var options = {};
				options.operation = response.data.operation;
				options.filename = response.data.display_value;
				options.state = (response.data.record && response.data.record.state) ? response.data.record.state.value : "";
			if (options.operation === 'update' && options.state === 'not_available')
				$rootScope.$broadcast("$$uiNotification", {type: 'error', message: i18n.getMessage('Upload file scan failed').withValues([options.filename])});
		}
	});
	
	$rootScope.$on('spModel.gForm.rendered', function() {
		$timeout(function() {
							spAtf.init().then(function(atf) {
								$scope._atf = atf;
								atf.expose('catalog_util', catalogUtil);
							});
		}, 10);
	});
	
	var catalogUtil = {
		updateGform: function() {
			$scope._atf.expose('g_form', spAtf.augmentForm(g_form));
		},
		
		addRow: function(fieldId, timeoutInMS) {
			if (timeoutInMS <= 0)
				timeoutInMS = 1000;
			var deferred = $q.defer();
			$scope.$broadcast("$sp.sc_multi_row.create_row", fieldId, $scope.data.sc_cat_item.sys_id);
			$scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
				if (gFormInstance.getSysId() == fieldId)
					deferred.resolve();
			});
			$timeout(function() {
				deferred.reject();
			}, timeoutInMS);
			return deferred.promise;
		},
		
		submit: function (timeout) {
			var deferred = $q.defer();
			$scope.triggerOnSubmit(timeout);
			var cleanup = $scope.$on('$sp.service_catalog.form_submit_failed', function() {
					cleanup();
					deferred.reject("Can't submit form");
			});
			if (g_form) {
					g_form.$private.events.on('submitted', function() {
			var cleanUp = $scope.$on('$sp.sc_cat_item.submitted', function(o, result) {
						$timeout(function() {
							cleanUp();
							deferred.resolve(result);
						}, 10);
					});
				});
			}
			else
				deferred.reject('g_form not initialized');
			
			return deferred.promise;
		},
		
		addToCart: function(timeout) {
			var defer = $q.defer();
			$scope.triggerAddToCart(timeout);
			var cleanup = $scope.$on('$sp.service_catalog.form_submit_failed', function() {
					cleanup();
					defer.reject("Can't submit form");
			});
			if (g_form) {
				g_form.$private.events.on('submitted', function() {
						var cleanup = $scope.$on('$sp.sc_cat_item.add_to_cart', function(o, result) {
						$timeout(function() {
							cleanup();
							defer.resolve(result);
						}, 10);
					});
				});
			}
			else
				defer.reject('g_form not initialized');			
			return defer.promise;
		},
		
		submitCatItem: function(timeout) {
			var defer = $q.defer();
			$scope.triggerOnSubmit(timeout);
			var cleanup = $scope.$on('$sp.service_catalog.form_submit_failed', function() {
					cleanup();
					defer.reject("Can't submit form");
			});
			if (g_form) {
				g_form.$private.events.on('submitted', function() {
					if ($scope.data.sys_properties.twostep && $scope.data.sc_cat_item.request_method != "submit") {
						defer.resolve();
					}
else {
						if (cleanup && typeof cleanup === 'function')
							cleanup();
						var cleanUp = $scope.$on('$sp.sc_cat_item.submitted', function(o, result) {
							$timeout(function() {
								cleanUp();
								result.single_step = true;
								defer.resolve(result);
							}, 10);
						});
						var failedSubmitCleanUp = $scope.$on('$sp.sc_cat_item.submit_failed', function() {
							failedSubmitCleanUp();
							defer.reject("Can't submit form");
						});
					}
				});
			} else
				defer.reject('g_form not initialized');
			return defer.promise;
		},
		
		setQuantity: function(quantity) {
			if ($scope.c.data.sc_cat_item.sys_class_name !== "sc_cat_item_producer" && $scope.c.data.sc_cat_item.sys_class_name !== "std_change_record_producer") {
				$scope.c.quantity = quantity;
				$scope.$apply();
			}
		},
		
		getQuantity: function() {
			return $scope.c.quantity;
		},
		
		getPrice: function() {
			var obj = {};
			obj.price = $scope.data.sc_cat_item.price_display;
			obj.recurring_price = $scope.data.sc_cat_item.recurring_price_display;
			obj.recurring_frequency = $scope.data.sc_cat_item.recurring_frequency;
			return obj;
		}
	}
	
	c.showAddCartBtn = function() {
		return !$scope.submitted &&
		  c.options.show_add_cart_button &&
			c.data.sc_cat_item.sys_class_name !== "sc_cat_item_producer" &&
			c.data.sc_cat_item.sys_class_name !== "std_change_record_producer" &&
			!c.data.sc_cat_item.no_cart && !c.data.is_cart_item;
	}
	
	c.showPrice = function() {
		return c.data.showPrices && 
			((c.data.sc_cat_item.price ? true : false) || 
			(c.data.sc_cat_item.recurring_price ? true : false));
	}
	
	c.showDeliveryTime = function() {
		return !c.data.hideDeliveryTime && 
			!c.data.sc_cat_item.no_delivery_time && 
			(c.data.sc_cat_item.estimated_delivery_time ? true : false);
	}
	var i18nQuantity = i18n.getMessage("Quantity {0}");
	c.showQuantitySelector = function() {
		if (c.data.isMEE == 'true' && $('#catItemQuantity') != null) {
			var quantityElement = $('#catItemQuantity');
			$timeout(function() {
				var prevDiv = quantityElement.prev();
				var anchor = prevDiv.find('.select2-choice');
				anchor.attr('role','button').attr('tabindex','0').attr('aria-label', i18nQuantity.withValues(['']));
				prevDiv.find('.select2-search-choice-close').attr('aria-hidden','true');
			}, 100);
		}
		
		return c.data.sc_cat_item.sys_class_name !== "sc_cat_item_producer" &&
			c.data.sc_cat_item.sys_class_name !== "std_change_record_producer" &&
			!c.data.sc_cat_item.no_quantity && !c.data.sc_cat_item.read_only_quantity &&
			(c.data.sc_cat_item.cart_guide === undefined || c.data.sc_cat_item.cart_guide === null)&&
			(!c.data.sc_cat_item.no_order_now || !c.data.sc_cat_item.no_cart);
	}
	c.showOrderNowButton = function() {
		return !$scope.data.is_cart_item && (c.data.sc_cat_item.use_sc_layout || !c.data.sc_cat_item.no_order_now);
	}
	c.showAddToWishlist = function () {
		return !$scope.submitted  && 
			(c.data.showWishlist && 
			 !c.data.sc_cat_item.no_wishlist && 
			 !c.data.is_cart_item && 
			 c.options.show_add_to_wishlist_button === 'true');
	}
	c.allowOrder = function() {
		if (c.data.sc_cat_item.use_sc_layout)
			return true;
		if (c.data.sc_cat_item.no_order)
			return false;
		if (c.data.sc_cat_item.no_order_now && c.data.sc_cat_item.no_cart)
			return false;
		return true;
	}
	
	c.showCart = function() {
		return c.data.can_create_cart_item && (c.data.is_cart_item || 
			c.showPrice() || c.showDeliveryTime() || c.showAddCartBtn() ||
			c.showOrderNowButton() || c.showAddToWishlist());
	}
	
	c.hideCartMsg = function () {
		$scope.data.showMsg = false;
	}
	c.showAttachments = function() {
		return !$scope.submitted &&
			c.data.sc_cat_item && !c.data.sc_cat_item.no_attachments &&
			c.data.sc_cat_item.sys_class_name !== "std_change_record_producer";
	};
	
	c.updateQuantity = function(item) {
		spAriaUtil.sendLiveMessage(c.data.msgs.updatedMsg + " " + item.name + " " + c.data.msgs.quantityToMsg + " " + c.quantity);
	}
	
	$scope.$on('dialog.upload_too_large.show', function(e){
		$log.error($scope.m.largeAttachmentMsg);
		spUtil.addErrorMessage($scope.m.largeAttachmentMsg);
	});
	$scope.m = $scope.data.msgs;
	var ah = $scope.attachmentHandler = new nowAttachmentHandler(setAttachments, appendError);
	function appendError(error) {
		spUtil.addErrorMessage(error.msg + error.fileName);
	}
	ah.setParams($scope.data._attachmentTable, $scope.data._generatedItemGUID, 1024 * 1024 * $scope.data.maxAttachmentSize);
	function setAttachments(attachments, action) {
		if (!angular.equals($scope.attachments, attachments)) 
			$scope.attachments = attachments;			
		if (action === "added") {
			spAriaUtil.sendLiveMessage($scope.m.attachmentAddedMsg);
			if ($scope.attachments.length > 0)
			 $scope.data.sc_cat_item.attachment_submitted = true;
		}
		if (action === "renamed")
			spAriaUtil.sendLiveMessage($scope.m.renameSuccessMsg);
		if (action === "deleted") {
			spAriaUtil.sendLiveMessage($scope.m.deleteSuccessMsg);
			if ($scope.attachments.length == 0)
				$scope.data.sc_cat_item.attachment_submitted = false;
		}
		$scope.data.sc_cat_item.attachment_action_in_progress = false;
		spUtil.get($scope,{action:"from_attachment"});
	}
	if (c.showAttachments() && 
			(c.data.is_cart_item || c.data.is_wishlist_item))
	$scope.attachmentHandler.getAttachmentList();
	$scope.confirmDeleteAttachment = function(attachment) {
		if (c.isNative) {
			if (confirm($scope.data.msgs.delete_attachment)) {
				$scope.data.sc_cat_item.attachment_action_in_progress = true;
				$scope.attachmentHandler.deleteAttachment(attachment);
				$scope.setFocusToAttachmentButton();
			}			
		} else {
			spModal.confirm($scope.data.msgs.delete_attachment).then(function() {
				$scope.data.sc_cat_item.attachment_action_in_progress = true;
				$scope.attachmentHandler.deleteAttachment(attachment);
				$scope.setFocusToAttachmentButton();
			});
		}
	}
	$scope.dismissWishListMessage = function() {
		$scope.is_update_wishlist = false;
	}
	
  if ($scope.data.sc_cat_item) {
		
		
		$scope.data.sc_cat_item.trusted_description = $sce.trustAsHtml($scope.data.sc_cat_item.description);
		if (!$scope.data.sc_cat_item._fields || angular.equals($scope.data.sc_cat_item._fields, {}))
				$scope.data.no_fields = true;
		if ($scope.data.sc_cat_item.sys_class_name !== "sc_cat_item_producer" && 
				$scope.data.sc_cat_item.sys_class_name !== "std_change_record_producer") {	
			if ($scope.data.sc_cat_item.request_method == "request")
				$scope.submitButtonMsg = $scope.m.requestMsg;
			else if ($scope.data.sc_cat_item.request_method == "submit")
				$scope.submitButtonMsg = $scope.m.submitMsg;
		else
				$scope.submitButtonMsg = $scope.m.orderNowMsg;
		} else {
			if ($scope.data.sc_cat_item.sys_class_name == "sc_cat_item_producer" && $scope.data.record_producer_label) 
				$scope.submitButtonMsg = $scope.data.record_producer_label;
			else
				$scope.submitButtonMsg = $scope.m.submitMsg;
		}
		
		if (!$scope.data.categories)
			$scope.data.categories = [];
		$scope.data.categories.forEach(function(category, index, categories) {
			categories[index].url = category.url + '&catalog_id=' + $scope.data.catalog_id;
		});
		if ($scope.data.is_wishlist_item) {
			$scope.data.categories.unshift({label: $scope.m.wishlistMsg, url: '?id=sc_wishlist'});
			$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
		}
		else if ($scope.data.is_cart_item) {
			$scope.data.categories.unshift({label: $scope.m.cartMsg, url: '?id=sc_cart'});
			$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
		}
		else if ($scope.data.categories.length > 0) {
			$scope.data.categories.unshift({label: $scope.data.sc_catalog || $scope.page.title, url: '?id=' + $scope.data.sc_category_page + "&catalog_id=" + $scope.data.catalog_id});
			$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
			if ($scope.data.all_catalog_msg) {
				$scope.data.categories.unshift({label: $scope.data.all_catalog_msg, url: '?id=' + $scope.data.sc_category_page + "&catalog_id=-1"});
			}
		}
		else {
			$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
		}
		
		$timeout(function() {
			$scope.$emit('sp.update.breadcrumbs', $scope.data.categories);
		});
		spUtil.setSearchPage('sc');
		if (c.isNative)
			cabrillo.viewLayout.setTitle($scope.data.sc_cat_item.name);
		else if ($scope.options.isServiceWorkspace)
			$window.postMessage({
				msg:'CATALOG_ITEM_SET_TITLE',
				title: $scope.data.sc_cat_item.name
			}, $location.origin);
	} else {
		var notFoundBC = [{label: $scope.page.title, url: '?id=' + $scope.data.sc_catalog_page}];
		$timeout(function() {
			$scope.$emit('sp.update.breadcrumbs', notFoundBC);
		});
		spUtil.setSearchPage('sc');
	}
	c.getItemId = function () {
		return $scope.data.sc_cat_item ? $scope.data.sc_cat_item.sys_id : -1;
	};
	
	function showNativeMobileButtons(){
		if ($scope.data.sc_cat_item.sys_class_name == 'sc_cat_item_content')
			return;
		if (c.isNative) {
			cabrillo.viewLayout.setTitle($scope.data.sc_cat_item.name);
			if ($scope.data.is_cart_item)
				addUpdateButton();
			else if ($scope.data.sc_cat_item.sys_class_name == "sc_cat_item_producer" || $scope.data.sc_cat_item.sys_class_name == "std_change_record_producer")
				addRPButton();
			else
				addOrderButtons();
		}
	}
	
	function nativeGoBackToCart() {
		cabrillo.viewLayout.setNavigationBarButtons();
		var button = [{
			imageName: 'back',
			buttonStyle: cabrillo.viewLayout.REPLACE_BACK_BUTTON_STYLE,
			enabled: true
		}];
		cabrillo.viewLayout.setNavigationBarButtons(button, function() {
			$location.search('id=sc_cart');
		});
	}
	
	function displayNativeButtons() {
		if (c.isNative && !$scope.orderConfirmation) {
			cabrillo.viewLayout.setTitle($scope.data.sc_cat_item.name);
			showNativeMobileButtons();
			cabrillo.viewLayout.showBackButton();
			if ($scope.data.is_cart_item) {
				cabrillo.viewLayout.hideBackButton();
				cabrillo.viewLayout.setNavigationBarButtons();
				nativeGoBackToCart();
			}
		}
	}
	
	var mespClosePopupUnregister = $rootScope.$on("mesp.popup.close", function() {
		$timeout(function(){
			displayNativeButtons();
		});
	});
	
	var mespOpenPopupUnregister = $rootScope.$on("mesp.popup.open", function() {
		$timeout(function(){
			removeCabrilloButtons();
		});
	});
	
	if ($scope.options.isServiceWorkspace && $window.frameElement) {
		var workspaceParams = {};
		workspaceParams.sysparm_parent_table = $window.frameElement.getAttribute('parent-table') || $window.frameElement.dataParentTable;
		workspaceParams.sysparm_parent_sys_id = $window.frameElement.getAttribute('parent-sys-id') || $window.frameElement.dataParentSysId;
		var urlParams = new URLSearchParams($window.frameElement.src);
		var params = Object.fromEntries(urlParams);
		if (params.query)
			workspaceParams.target_query = params.query;
		$scope.data.parentParams = workspaceParams;
	} else if (!$scope.options.isServiceWorkspace && $scope.options.parentTable && $scope.options.parentSysId) {
		var portalParentParams = {};
		portalParentParams.sysparm_parent_table = $scope.options.parentTable;
		portalParentParams.sysparm_parent_sys_id = $scope.options.parentSysId;
		$scope.data.parentParams = portalParentParams;
	}
	var g_form;	
	$scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
		if (gFormInstance.getSysId() != -1 && gFormInstance.getSysId() != c.getItemId())
			return;
		g_form = gFormInstance;
		spSCNavStateManager.register(g_form);
		spSCNavStateManager.isNative(c.isNative);
		spSCNavStateManager.isPreview(c.data.isPreview);
			
		if (c.isNative) {
			cabrillo.viewLayout.setTitle($scope.data.sc_cat_item.name);
			$rootScope.$on('spModel.gForm.showNativeMobileButtons', displayNativeButtons);
		}
    		if ($scope.setDefaultValue && c.options.requested_for_id && c.options.requested_for_display && $scope.data.sc_cat_item.requested_for_variable_name) {
			$scope.setDefaultValue = false;
			$scope.data.sc_cat_item.hideAlsoRequestFor = true;	
			setValueInNextDigestCycle(g_form, c.options.requested_for_id, c.options.requested_for_display);
		} else if ($scope.setDefaultValue && $scope.data.parentParams && $scope.data.parentParams.sysparm_parent_table && $scope.data.parentParams.sysparm_parent_sys_id) {
			$scope.setDefaultValue = false;
			$scope.data.sc_cat_item.hideAlsoRequestFor = true;
			$scope.server.get({
				action: 'get_requested_for',
				parentParams : $scope.data.parentParams
			}).then(function(response) {
				if (response.data.requested_for) {
					$scope.data.requested_for = response.data.requested_for;
					setValueInNextDigestCycle(g_form, response.data.requested_for.id, response.data.requested_for.displayValue);
				}
			});
		}
		$timeout(function() {
			$rootScope.$emit('spModel.gForm.rendered', g_form);
			showNativeMobileButtons();
		}, 175);
		g_form.$private.events.on('submitted', function(){
			cleanFailedSubmit();
			$scope.submitting = true;
			if ($scope.data.sc_cat_item.item_action === "order")
				getOne();
			else if ($scope.data.sc_cat_item.item_action === "add_to_cart")
				addToCart();
			else if ($scope.data.sc_cat_item.item_action == "update_cart")
				updateCart();
			
			spUtil.simulateFakeFormSubmitForAutoComplete('catalog-form', $scope.data.sc_cat_item._fields);
		});
	});
	function setValueInNextDigestCycle(g_form, value, displayValue) {
		$timeout(function() {
				g_form.setValue($scope.data.sc_cat_item.requested_for_variable_name, value, displayValue);
			});
	}
	function getVarData(fields) {
		var reqData = {};
		for(var obj in fields)
			reqData[fields[obj].name] = fields[obj].value;
		return reqData;
	}
	function getValidatedVarData(fields) {
		var validFields = Object.values(fields).filter(function(field) { return !(field.type == 'masked' && field.useConfirmation && field.value != field.confirmPassword); });
		return getVarData(validFields);
	}
	function addLink(url, msg, elem_id) {
return "<a id=" + elem_id + " class='link alert-link' href=" + url + ">" + msg + "</a>";
	}
		
	function getAlsoRequestForValue(fields) {
		if ($scope.data.sc_cat_item.requested_for_variable_name)
			return fields[$scope.data.sc_cat_item.requested_for_variable_name].also_request_for_value;
	}
	
	$scope.triggerAddToWishlist = function() {
		$scope.submitting = true;	
		var alsoRequestFor = getAlsoRequestForValue($scope.data.sc_cat_item._fields);
		if (alsoRequestFor) {
			spModal.confirm($scope.m.addToWishlistConfirmMsg).then(addToWishlist, function(){
				$scope.submitting = false;
			});
		}
		else 
			addToWishlist();
	}
	
	function addToWishlist() {
		spAriaUtil.sendLiveMessage($scope.m.submittingMsg);
		var wishlistMsg = $scope.data.is_wishlist_item ? $scope.m.wishlistUpdateMsg : $scope.m.wishlistAddMsg;
		$scope.m.actionMsg = wishlistMsg + addLink('?id=sc_wishlist', $scope.m.viewWishListMsg,"view_wishlist");
$scope.m.actionMsg += '<i class="fa fa-close pull-right pointer close-notification" aria-label="Close Notification" tabindex="0" ng-click="c.hideCartMsg()"/>';
		$scope.m.actionMsg = $sce.trustAsHtml($scope.m.actionMsg);
		$scope.is_update_wishlist = false;
		spScUtil.addToWishlist($scope.data.sc_cat_item.sys_id, c.quantity, getValidatedVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID).then(function(response){
			var cartItemId = "";
			for (var i=0; i<response.data.result.items.length; i++) {
				var item = response.data.result.items[i];
				if (item.catalog_item_id === $scope.data.sc_cat_item.sys_id) {
					cartItemId = item.cart_item_id;
					break;
				}
			}
			$rootScope.$broadcast("$sp.service_catalog.wishlist.add_item");
			$rootScope.$broadcast("$sp.service_catalog.wishlist.update", cartItemId);
			if (!$scope.data.is_wishlist_item) 	
				$scope.clearAttachmentFields();
			g_form.$private.userState.clearModifiedFields();
			$scope.data.showMsg = $scope.is_update_wishlist = true;
			$scope.data.is_wishlist_item = true;
			$scope.data.sc_cat_item.isCartItem = true;
			$scope.data.show_wishlist_msg = false;
			$scope.submitting = false;
			spUtil.scrollTo('#sc_cat_item', 300);
			$scope.focusElement("view_wishlist", wishlistMsg);
		}, function(response) {
			handleFailure(response);
		});
	}
	$scope.clearAttachmentFields = function() {
		var fields = $scope.data.sc_cat_item._fields;	
		for (var x in fields) {
			if (fields[x].type == 'sc_attachment')
				g_form.clearValue(fields[x].name);	
		}
	}
	$scope.triggerAddToCart = function(timeout) {
		$scope.data.sc_cat_item.item_action = "add_to_cart";
		$scope.data.sc_cat_item.quantity = c.quantity;
		$scope.$evalAsync(function (){
			if (g_form && !$scope.submitting) {
				$scope.submitting = true;
				spAriaUtil.sendLiveMessage($scope.m.submittingMsg);
				if (!spScUtil.isRegexDone($scope.data.sc_cat_item._fields)) {
					$scope.submitting = false;
					$scope.validating = true;
				} else if (!g_form.submit()) {
					timeout = timeout || 1000;
					$timeout(function () {
						$scope.$broadcast('$sp.service_catalog.form_submit_failed', {action_name: 'submit'});
					}, timeout);
				}
				if (!$scope.data.is_wishlist_item)
					window.GlideWebAnalytics.trackEvent('Service Catalog', 'Catalog Cart' + webAnalyticsMsgSuffix, 'Catalog Item Added to Cart', 0, 0);
			}
		})
	}
	$scope.triggerUpdateCart = function(timeout) {
		$scope.data.sc_cat_item.item_action = "update_cart";
		$scope.data.sc_cat_item.quantity = c.quantity;
		$scope.$evalAsync(function (){
			if (g_form && !$scope.submitting) {
				$scope.submitting = true;
				spAriaUtil.sendLiveMessage($scope.m.submittingMsg);
				if (!spScUtil.isRegexDone($scope.data.sc_cat_item._fields)) {
					$scope.submitting = false;
					$scope.validating = true;
				} else if (!g_form.submit()) {
					timeout = timeout || 1000;
					$timeout(function () {
						$scope.$broadcast('$sp.service_catalog.form_submit_failed', {action_name: 'submit'});
					}, timeout);
				}
			}
			window.GlideWebAnalytics.trackEvent('Service Catalog', 'Catalog Cart' + webAnalyticsMsgSuffix, 'Catalog Cart Updated', 0, 0);
		})
		return false;
	}
	$scope.triggerOnSubmit = function(timeout) {
		if (c.data.isPreview) return;
		
		$scope.data.sc_cat_item.item_action = "order";
		$scope.data.sc_cat_item.quantity = c.quantity;
		$scope.$evalAsync(function () {
			if (g_form && !$scope.submitting) {
				$scope.submitting = true;
				spAriaUtil.sendLiveMessage($scope.m.submittingMsg);
				if (!spScUtil.isRegexDone($scope.data.sc_cat_item._fields)) {
					$scope.submitting = false;
					$scope.validating = true;
				} else if (!g_form.submit()) {
					timeout = timeout || 1000;
					$timeout(function () {
						$scope.$broadcast('$sp.service_catalog.form_submit_failed', {action_name: 'submit'});
					}, timeout);
				}
			}
		})
		return false;
	}
	
	function setFieldsReadonly() {
		var allFields = g_form.getFieldNames();
		for (var fieldName in allFields) {
			g_form.setReadonly(allFields[fieldName], true);
		}
	}
	function getOne() {
		var requested_for_id = "";
		var requested_for_display = "";
		if ($scope.data.requested_for && $scope.data.requested_for.id && $scope.data.requested_for.displayValue) {
			requested_for_id = $scope.data.requested_for.id;
			requested_for_display = $scope.data.requested_for.displayValue;
		}
		var embeddedWidgetOptions = {
			"auto_redirect" : "true",
			"requested_for_id" : requested_for_id,
			"requested_for_display" : requested_for_display
		};
		if ($scope.data.sc_cat_item.sys_class_name != "sc_cat_item_producer" && $scope.data.sc_cat_item.sys_class_name != "std_change_record_producer") {
			if ($scope.data.sys_properties.twostep && $scope.data.sc_cat_item.request_method != "submit") {
				var payload = {
					cart: 'cart_' + $scope.data.sc_cat_item.sys_id,
					itemDetails: {
						sys_id: $scope.data.sc_cat_item.sys_id,
						name: $scope.data.sc_cat_item.name,
						sys_class_name: $scope.data.sc_cat_item.sys_class_name,
						quantity: $scope.data.sc_cat_item.quantity, 
						fields: getVarData($scope.data.sc_cat_item._fields), 
						newRecordID: $scope.data._generatedItemGUID,
						request_method : $scope.data.sc_cat_item.request_method
					},
					action: $scope.data.is_wishlist_item ? "order_wishlist_item" : "order_item",
					parentParams: $scope.data.parentParams
				};
				for (var embeddedOption in embeddedWidgetOptions) {
					payload[embeddedOption] = c.options[embeddedOption] || embeddedWidgetOptions[embeddedOption];
				}
				$scope.server.get(payload).then(function(response) {
					var orderItemModalCtrl;
					var unregister = $scope.$on('$sp.service_catalog.cart.cancel_order', function() {
						$scope.submitting = false;
						$scope.orderConfirmation = false;
						registerSubmitListeners();
						$timeout(function () {
							if (orderItemModalCtrl)
								orderItemModalCtrl.close();
							displayNativeButtons();
						});
					});
					var closeModalOnSubmit = $scope.$on('$sp.service_catalog.cart.submitted', function() {
						orderItemModalCtrl.close();
						setFieldsReadonly();
						$scope.submitted = true;
					});
					var orderItemModal = angular.copy(response.data.orderItemModal);
					orderItemModal.options.afterOpen = function(ctrl){
						orderItemModalCtrl = ctrl;
						if (c.data.isMEE == 'true') {
							spAriaUtil.sendLiveMessage($scope.m.checkoutDialogMsg);
						}
					};
					orderItemModal.options.afterClose = function() {
							unregister();
							closeModalOnSubmit();
							c.orderItemModal = null;
							orderItemModalCtrl = null;
							$('#submit-btn').focus();
						};
						c.orderItemModal = orderItemModal;
					});
				$scope.orderConfirmation = true;
			} else {
				var additionalParms = {};
				if ($scope.data.parentParams) {
					additionalParms.sysparm_parent_sys_id = $scope.data.parentParams.sysparm_parent_sys_id;
					additionalParms.sysparm_parent_table = $scope.data.parentParams.sysparm_parent_table;
				}
				additionalParms.engagement_channel = $scope.data.engagement_channel;
				additionalParms.referrer = $scope.data.referrer;
				$scope.submitting = true;
				showPageLoader();
				addOrderButtons();
				if ($scope.data.is_wishlist_item) {
					spScUtil.orderWishlistedItem($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, additionalParms).then(function(response) {
						$scope.server.get({
							action: 'log_order_one_step',
							itemDetails: {
								sys_id: $scope.data.sc_cat_item.sys_id,
								name: $scope.data.sc_cat_item.name,
								sys_class_name: $scope.data.sc_cat_item.sys_class_name
							}
						});
						var a = response.data.result;
						$scope.$emit("$$uiNotification", a.$$uiNotification);
						$scope.$emit("$sp.sc_cat_item.submitted", a);
						$rootScope.$broadcast("$sp.service_catalog.wishlist.update");
						if (c.options.auto_redirect == 'false') {
							setFieldsReadonly();
							$scope.submitting = false;
							$scope.submitted = true;
							$rootScope.$broadcast("$sp.service_catalog.cart.submitted", true);
							spUtil.addInfoMessage($scope.m.requestSubmitted);
							return;
						} else {
							if(a.universal_request && !c.options.native_mobile && !c.options.isServiceWorkspace) 
								$location.search('id=standard_ticket&is_new_order=true&table=universal_request&sys_id=' + a.universal_request);
							else 
							$location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + a.sys_id);
						}				
					});
				}
				else {
					spScUtil.orderNow($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, additionalParms, getAlsoRequestForValue($scope.data.sc_cat_item._fields)).then(function(response) {
							$scope.server.get({
								action: 'log_order_one_step',
								itemDetails: {
									sys_id: $scope.data.sc_cat_item.sys_id,
									name: $scope.data.sc_cat_item.name,
									sys_class_name: $scope.data.sc_cat_item.sys_class_name
								}
							});
							var a = response.data.result;
							$scope.$emit("$$uiNotification", a.$$uiNotification);
							$scope.$emit("$sp.sc_cat_item.submitted", a);
							if (c.options.auto_redirect == 'false') {
								hidePageLoader();
								setFieldsReadonly();
								$scope.submitting = false;
								$scope.submitted = true;
								$rootScope.$broadcast("$sp.service_catalog.cart.submitted", true);
								spUtil.addInfoMessage($scope.m.requestSubmitted);
								return;
							} else if (!$scope._atf) {
								removeCabrilloButtons();
								if(a.universal_request && !c.options.native_mobile && !c.options.isServiceWorkspace) 
									$location.search('id=standard_ticket&is_new_order=true&table=universal_request&sys_id=' + a.universal_request);
								else 
								$location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + a.sys_id);
							}
					}, function(response) {
						$scope.$emit('$sp.sc_cat_item.submit_failed');
						handleFailure(response);
					});
				}
			}
		} else {
			postCatalogFormRequest().then(function(response) {
				var a = response.data.result;
				
				if ($scope.data.sys_properties.stopNavigationOnError || $scope.options.isServiceWorkspace) {
if (a.sys_id == -1) {
						if (a.$$uiNotification.length > 0) {
							var errorNotify = a.$$uiNotification.find(function(elem) {
								if (elem.type == 'error')
									return true;
							});
							if (errorNotify) {
								$scope.$emit("$$uiNotification", a.$$uiNotification);
								$scope.submitted = false;
								$scope.submitting = false;
								if ($scope.data.record_producer_label) 
									$scope.submitButtonMsg = $scope.data.record_producer_label;
								else
									$scope.submitButtonMsg = $scope.m.submitMsg;
								return;
							}
						}
					}
				}
				$scope.server.get({
					action: 'log_request_producer',
					itemDetails: {
						sys_id: $scope.data.sc_cat_item.sys_id,
												name: $scope.data.sc_cat_item.name,
						sys_class_name: $scope.data.sc_cat_item.sys_class_name
					}
				});
				
				if (!$scope.options.isServiceWorkspace)
					$scope.$emit("$$uiNotification", a.$$uiNotification);
				$scope.$emit("$sp.sc_cat_item.submitted", a);
				if ($scope.data.is_wishlist_item)
					$rootScope.$broadcast("$sp.service_catalog.wishlist.update");
				hidePageLoader();
				if (c.options.auto_redirect == 'false') {
					setFieldsReadonly();
					$scope.submitted = true;
					$scope.submitting = false;
					$scope.submitButtonMsg = $scope.m.submittedMsg;
				} else if (!$scope._atf)
						handleRedirect(a.number, a.table, a.sys_id, a.redirect_to, a.redirect_portal_url);
				
			});
		}
	}
	function addToCart() {
		$scope.server.get({
			action: 'log_request_cart',
			itemDetails: {sys_id: $scope.data.sc_cat_item.sys_id, 
										name: $scope.data.sc_cat_item.name,
										sys_class_name: $scope.data.sc_cat_item.sys_class_name}
		});
		
		postCatalogFormRequest().then(function(response) {
			$rootScope.$broadcast("$sp.service_catalog.cart.add_item");
			$rootScope.$broadcast("$sp.service_catalog.cart.update");
			$scope.$emit("$sp.sc_cat_item.add_to_cart", $scope.data._generatedItemGUID);
			g_form.$private.userState.clearModifiedFields();
			if ($scope.data.is_wishlist_item) {
				$rootScope.$broadcast("$sp.service_catalog.wishlist.update");
				$scope.data.is_wishlist_item = false;
				$scope.data.sc_cat_item.isCartItem = false;
				if ($location.$$search.edit === "wishlist") {
					$location.search("id=sc_wishlist");
					return;
				}
			}		
			c.status = i18n.getMessage("Added item to shopping cart");
			var cartResponse = response;
			$scope.server.get({action: 'init_item'}).then(function(response) {
				$scope.data._generatedItemGUID = response.data._generatedItemGUID;
				$scope.data.sc_cat_item._attachmentGUID = response.data._generatedItemGUID;
				ah.setParams($scope.data._attachmentTable, $scope.data._generatedItemGUID, 1024 * 1024 * $scope.data.maxAttachmentSize);
				$scope.attachmentHandler.getAttachmentList();
				$scope.attachments= [];
				$scope.clearAttachmentFields();
				$scope.data.sc_cat_item.attachment_action_in_progress = false;
				$scope.data.sc_cat_item.attachment_submitted = false;
				if (!c.isNative) {
					$scope.m.actionMsg = $scope.m.cartAddMsg + $scope.m.cartMakeChangesMsg + addLink('?id=sc_cart', $scope.m.viewCartMsg, "view_cart");
$scope.m.actionMsg += '<i class="fa fa-close pull-right pointer close-notification" aria-label="Close Notification" tabindex="0" ng-click="c.hideCartMsg()"/>';
					$scope.m.actionMsg = $sce.trustAsHtml($scope.m.actionMsg);
					$scope.data.showMsg = true;
				} else {
						cabrillo.message.showMessage(cabrillo.message.SUCCESS_MESSAGE_STYLE, c.status);
						if (cartResponse && cartResponse.data && cartResponse.data.result) {
								var items = cartResponse.data.result.items || [];
								$scope.showCabrilloCart = true;
								$scope.cartItemCount = items.length;
								showCartButton();
						}
				}
				$scope.submitting = false;
				hidePageLoader();
				cleanFailedSubmit = $scope.$on('$sp.service_catalog.form_submit_failed', function() { $scope.submitting = false; });
				spUtil.scrollTo('#sc_cat_item', 300);
				$scope.focusElement("view_cart", $scope.m.cartAddMsg);
			});
		});
	}
	function updateCart() {
		postCatalogFormRequest().then(function(response) {
			g_form.$private.userState.clearModifiedFields();
			c.status = i18n.getMessage("Updated Item to shopping cart");
			if (c.isNative)
				cabrillo.message.showMessage(cabrillo.message.SUCCESS_MESSAGE_STYLE, c.status);
			removeCabrilloButtons();
			$location.search('id=sc_cart');
		})
	}
	function postCatalogFormRequest() {
		$scope.submitting = true;
		showPageLoader();
		if ($scope.data.sc_cat_item.item_action !== "add_to_cart")
			addOrderButtons();
		
		var additionalParms = {};
		if($scope.data.parentParams) {
			mergeMap($scope.data.parentParams, additionalParms);
		}
		additionalParms.engagement_channel = $scope.data.engagement_channel;
		additionalParms.referrer = $scope.data.referrer;
		
		if ($scope.data.is_wishlist_item) {
			$scope.is_update_wishlist = false;
			$scope.data.show_wishlist_msg = false;
			if ($scope.data.sc_cat_item.sys_class_name === "sc_cat_item_producer")
				return spScUtil.submitWishlistedProducer($scope.data.sc_cat_item.sys_id, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, additionalParms);
			else if ($scope.data.sc_cat_item.item_action === "add_to_cart") {
				if ($scope.data.sc_cat_item.sys_class_name=='sc_cat_item_guide')
					window.GlideWebAnalytics.trackEvent("Service Catalog", "Catalog Cart" + webAnalyticsMsgSuffix, "Order Guide Added to Cart", 0, 0);
				else if ($scope.data.sc_cat_item.sys_class_name=='sc_cat_item_producer')
					window.GlideWebAnalytics.trackEvent("Service Catalog", "Catalog Cart" + webAnalyticsMsgSuffix, "Record Producer Added to Cart", 0, 0);
				else if ($scope.data.sc_cat_item.sys_class_name == "sc_cat_item" || $scope.data.sc_cat_item.sys_class_name == "pc_hardware_cat_item" || $scope.data.sc_cat_item.sys_class_name == "pc_software_cat_item")
					window.GlideWebAnalytics.trackEvent("Service Catalog", "Catalog Cart", "Catalog Item Added to Cart" + webAnalyticsMsgSuffix, 0, 0);
				return spScUtil.addWishlistedItemToCart($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID).then(null, function(response) {
					return handleFailure(response);
				});
			}
		}
		else if ($scope.data.is_cart_item) {
			return spScUtil.updateCart($scope.data._generatedItemGUID, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data.sc_cat_item.sys_id).then(null, function(response) {
				return handleFailure(response);
			});
		}
		else if ($scope.data.sc_cat_item.sys_class_name === "sc_cat_item_producer") {
			return spScUtil.submitProducer($scope.data.sc_cat_item.sys_id, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, additionalParms).then(null, function(response) {
				return handleFailure(response);
			});
		}
		else if ($scope.data.sc_cat_item.sys_class_name === "std_change_record_producer") {
				return spScUtil.submitStdChgProducer($scope.data.sc_cat_item.sys_id, $scope.data.stdChg.twoStep, $scope.data.stdChg.currentVersion, $scope.data._generatedItemGUID, $scope.portal.url_suffix, additionalParms, $scope.data.stdChg.chgModel);
		}
		else if ($scope.data.sc_cat_item.item_action === "add_to_cart") {
			return spScUtil.addToCart($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, getAlsoRequestForValue($scope.data.sc_cat_item._fields)).then(null, function(response) {
				return handleFailure(response);
			});
		}
	}
	$scope.hasMandatory = function() {
		return c.mandatory && c.mandatory.length > 0;
	};
	var cleanFailedSubmit;
	var validationComplete;
	function registerSubmitListeners() {
		cleanFailedSubmit = $scope.$on('$sp.service_catalog.form_submit_failed', function() { 
			$scope.submitting = false; 
		});
		validationComplete = $rootScope.$on('$sp.service_catalog.form_validation_complete', function() { 
			$scope.validating = false; 
		});
	}
	registerSubmitListeners();
	$scope.$on("$sp.sc_cat_item.submitted", function() {
		$rootScope.$broadcast("$sp.sc_cat_item.rp_submitted");
		if ($scope.data.sc_cat_item.item_action == "order") {
			if ($scope.data.sc_cat_item.sys_class_name == "sc_cat_item" || $scope.data.sc_cat_item.sys_class_name == "pc_hardware_cat_item" || $scope.data.sc_cat_item.sys_class_name == "pc_software_cat_item")
				window.GlideWebAnalytics.trackEvent("Service Catalog", "Catalog Item Request" + webAnalyticsMsgSuffix, "Catalog Request Submitted", 1, 0);
			else if (scope.data.sc_cat_item.sys_class_name == "sc_cat_item_producer")
				window.GlideWebAnalytics.trackEvent("Service Catalog", "Record Producer Request" + webAnalyticsMsgSuffix, "Catalog Request Submitted", 0, 0);
		}
		g_form.$private.userState.clearModifiedFields();
		if	(c.options.auto_redirect == 'false') 
			spAriaUtil.sendLiveMessage($scope.m.formSubmittedMsg);
		var payload = {};
		payload.name = "Submit Record Producer Request";
		payload.data = {};
		payload.data["Record Item"] = $scope.data.sc_cat_item.name;
		payload.data["Record ID"] = $scope.data.sc_cat_item.sys_id;
		snAnalytics.addEvent(payload);
	});
	$scope.$on("$sp.service_catalog.wishlist.update", function(evt, item) {
		if (item === $scope.data.sys_id)
			$scope.data.show_wishlist_msg = false;
	});
	var unregister = $scope.$on('$sp.list.click', onListClick);
	$scope.$on("$destroy", function() {
		$rootScope.$broadcast("$sp.service_catalog.item.close");
		unregister();
		mespClosePopupUnregister();
		mespOpenPopupUnregister();
		validationComplete();
	});
	$rootScope.$on('spModel.gForm.rendered', function() {
	    spAriaUtil.sendLiveMessage($scope.m.catItemOpenedMsg);
	});
	function onListClick(evt, arg) {
		$scope.data.sys_id = arg.sys_id;
		spUtil.update($scope);
	}
	
	function formatRedirectUrl(page, table, sys_id) {
		var url;
		var paramObj = {page: page, table: table, sys_id: sys_id};
		url = spUtil.format(c.options.url, paramObj);
		return url;
	}
	
	function handleRedirect(n, table, sys_id, redirectTo, redirectUrl) {
		var page = 'form';
		if (table == 'sc_request')
			page = 'sc_request';
		else if (n)
			page = 'ticket';
		
		if (sys_id == -1)
			sys_id = undefined;
		
		if (redirectTo == 'catalog_home') 
			page = 'sc_home';
		if ($scope.data.sc_cat_item.sys_class_name === "std_change_record_producer") {
			if ($scope.options.isServiceWorkspace == 'true') {
				var params = {};
				params.msg = 'TARGET_RECORD_SELECTED';
				params.target_table = table;
				params.target_sys_id = '-1';
				if (sys_id)
					params.target_sys_id = sys_id;
				if ($scope.data.stdChg.twoStep) {
var genURL = new URL($window.location.origin + "/" + redirectUrl).searchParams;
					params.target_query = genURL.get("query");
				}
				window.postMessage(params, $window.location.origin);
				return;
			} else
				page = 'form';
		}
		removeCabrilloButtons();
		if (c.options.page) {page = c.options.page;}
		if (c.options.table) {table = c.options.table;}
		var url = formatRedirectUrl(page, table, sys_id);
		if ($scope.data.sc_cat_item.sys_class_name === "sc_cat_item_producer" || $scope.data.sc_cat_item.sys_class_name === "std_change_record_producer") {
			if (redirectUrl) {
				if (isPortalURL(redirectUrl)) {
                    var queryParamURL = getQueryParams(redirectUrl);
                    var currentParamURL = getQueryParams($location.$$url);
                    if (queryParamURL == currentParamURL)
                        $location.search(queryParamURL + '&' + Date.now());
                    else
                        $location.search(queryParamURL);
                } else
                    $window.location.href = redirectUrl;
			} else {
				var newURL = $location.search(url);
		    spAriaFocusManager.navigateToLink(newURL.url());
			}
			return;
		}
		$location.search(formatRedirectUrl('sc_request', 'sc_request', sys_id));
		return;
	}
    function isPortalURL(url) {
var currentPortalName = $location.path().replace('/','');
		var paramIndex = getQueryParameterIndex(url)	
var redirectPortalName = url.substr(0, paramIndex).replace('/', '');
		return currentPortalName === redirectPortalName;	
	}	
	function getQueryParams(url){	
		var paramIndex = getQueryParameterIndex(url);	
		return url.substr(paramIndex+1, url.length);	
	}	
	function getQueryParameterIndex(url){	
var paramIndex = url.search(/\?/);
		return paramIndex > 0 ? paramIndex : url.length;		
	}
	
    $timeout(function() {
        if ($document[0].getElementsByClassName('sc-sticky-item-header').length > 0) {
            var titleHeight = $document[0].getElementsByClassName('sc-sticky-item-header')[0].clientHeight;
            $scope.stickyHeaderTop = '-' + (titleHeight - 20 - $document[0].getElementsByClassName('sc-cat-item-short-description')[0].clientHeight) + 'px;';
        }
    });
		
	function addOrderButtons() {
		if (!c.isNative) return;
		showCartButton();
		var buttons = [];
		if ($scope.c.data.sys_properties.cartEnabled && $scope.c.showAddCartBtn()) {
			buttons.push({
				title: $scope.m.addToCart,
				enabled: !$scope.submitting,
				backgroundColor: '#f7f7f7',
				textColor: '#000000'
			});
		}
		buttons.push({
			title: $scope.submitting? $scope.m.submittingMsg : $scope.submitButtonMsg,
			enabled: !$scope.submitting,
			backgroundColor: $scope.data.sys_properties.mobileNativeColor,
			textColor: '#FFFFFF'
		});
		cabrillo.viewLayout.setBottomButtons(buttons, function(buttonIndex) {
			if ($scope.c.data.sys_properties.cartEnabled && $scope.c.showAddCartBtn()) {
				if (buttonIndex == 0) {
					$timeout(function() {	
						$scope.triggerAddToCart();
					},500);					
				}
				else {
					$timeout(function() {	
						$scope.triggerOnSubmit();
					},500);
				}			
			}
			else {
				$timeout(function() {	
					$scope.triggerOnSubmit();
				},500);
			}
		});
	}
	
	function addRPButton() {
		if (!c.isNative) return;
		var buttons = [
			{
				title: $scope.submitButtonMsg,
				enabled: true,
				backgroundColor: $scope.data.sys_properties.mobileNativeColor,
				textColor: '#FFFFFF'
			}
		];
		cabrillo.viewLayout.setBottomButtons(buttons, function(buttonIndex) {
			$timeout(function() {	
				$scope.triggerOnSubmit();
			},500);
		});
	}
	
	function showCartButton() {
		if (!c.isNative || !$scope.showCabrilloCart) return;
		var button = [{
				imageName: 'cart',
				badgeCount: $scope.cartItemCount,
				backgroundColor: '#2ff5f9',
				textColor: '#FFFFFF',
				enabled: true
				}];
		cabrillo.viewLayout.setNavigationBarButtons(button, function(index) {
				$location.search('id=sc_cart');
			});
	}
	function addUpdateButton() {
		if (!c.isNative) return;
		var buttons = [
			{
				title: $scope.m.updateCart,
				enabled: !$scope.submitting,
				backgroundColor: $scope.data.sys_properties.mobileNativeColor,
				textColor: '#FFFFFF'
			}
		];
		cabrillo.viewLayout.setBottomButtons(buttons, function(buttonIndex) {
			$timeout(function() {	
				$scope.triggerUpdateCart();
			},500);
		});
		nativeGoBackToCart();
	}
	
	function removeCabrilloButtons() {
			if (!c.isNative) return;
			cabrillo.viewLayout.setBottomButtons();
	}
	
	function showPageLoader() {
		if (!c.isNative) return;
		cabrillo.viewLayout.showSpinner();
	}
	
	function hidePageLoader() {
		if (!c.isNative) return;
		cabrillo.viewLayout.hideSpinner();
	}
	
	function handleFailure(response) {
		registerSubmitListeners();
		
		$scope.submitting = false;
		hidePageLoader();
		if ($scope.data.sc_cat_item.item_action !== "add_to_cart")
			addOrderButtons();
		if (response.data.result && response.data.result.errMsg)
			spUtil.addErrorMessage(response.data.result.errMsg);
		
		return $q.reject(response);
	}
	
	function mergeMap(fromMap, toMap) {
		for(var key in fromMap) {
			toMap[key] = fromMap[key];
		}
	}
	$scope.sendLiveMessage = function(message, timeout) {
		if (!message)
			return;
		
		if (!timeout)
			timeout = 0;
		
		setTimeout(function() {
			spAriaUtil.sendLiveMessage(message);
		}, timeout);
	}
	$window.onpageshow = function(){
		if(c.isNative)
			$scope.$emit('spModel.gForm.showNativeMobileButtons');
	};
	var favoriteEvent = $rootScope.$on('favorite', function(e, favorite) {
        $scope.showFavorite = favorite.showFavorite;
        $scope.isFavorite = favorite.isFavorite;
    });
	$scope.$on("$destroy", favoriteEvent);
	
	$scope.toggleFavorite = function($event){
		$event.preventDefault();
		$event.stopPropagation();
		$scope.$broadcast('toggleFavorite');
	}
}
