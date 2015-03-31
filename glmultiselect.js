/*! 
  glMultiSelect v(0.0.6) 
  (c) 2013-2015
  https://gluenetworks.kilnhg.com/Code/Web-Development
  Release Date: 2015-03-30 
*/
angular.module("glMultiSelect", [ "localytics.directives" ]), angular.module("glMultiSelect").directive("glMultiSelect", [ "$compile", "$timeout", function($compile) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            settings: "=",
            api: "="
        },
        link: function(scope, element) {
            function setEditMode() {
                element.children().remove(), scope.api._data.editable = !0;
                scope.api._data.optionsMaxHeight, angular.isUndefined(scope.api._data.multiple) ? "" : "multiple";
                templateSelect = '<select class="jason" style="width: 100%;" chosen ' + chosenAttrOptions + ' data-ng-model="api._data.value" data-ng-options="option.value as option.label group by option.group for option in api._data.options"><option value=""></option></select>', 
                elementSelect = angular.element(templateSelect), //elementSelect.chosen({inherit_select_classes:true});
                element.append($compile(elementSelect)(childScope)), errorMsgCheck(), elementSelect.on("chosen:ready", function() {
                    processEmptiness(scope.api._data.value), element.find(".chosen-results").attr("data-gl-super-scroll", "data-gl-super-scroll");
                });
            }
            function processEmptiness(value) {
                var c = element.children(".chosen-container");
                (angular.isString(value) || angular.isArray(value)) && value.length ? c.removeClass("gl-empty") : c.addClass("gl-empty");
            }
            function setViewMode() {
                element.children().remove(), scope.api._data.editable = !1, templateView = '<label class="gl-multi-select-label" data-ng-bind="api._data.label"></label><p class="gl-multi-select-value" data-ng-bind="api._data.value"></p>', 
                elementView = angular.element(templateView), element.append($compile(elementView)(childScope));
            }
            function errorMsgCheck() {
                angular.isUndefined(elementError) || elementError.remove(), scope.api._data.editable && (scope.api._data.valid ? (elementSelect.removeClass(classInvalid), 
                element.find(".chosen-container").removeClass(classInvalid)) : (elementSelect.addClass(classInvalid), 
                element.find(".chosen-container").addClass(classInvalid), angular.isString(scope.api._data.error) && (elementError = $compile(angular.element(templateError))(scope), 
                element.append(elementError))));
            }
            var elementSelect, elementView, elementError, templateSelect, templateError, templateView, childScope = scope.$new(), classInvalid = "gl-invalid";
            templateError = '<p class="gl-error-msg" data-ng-bind="api._data.error"></p>';
            var chosenAttrs = {
                noResultsText: "no-results-text",
                allowSingleDeselect: "allow-single-deselect",
                disableSearchThreshold: "disable-search-threshold",
                disableSearch: "disable-search",
                enableSplitWordSearch: "enable-split-word-search",
                inheritSelectClasses: "inherit-select-classes",
                maxSelectedOptions: "max-selected-options",
                searchContains: "search-contains",
                singleBackstrokeDelete: "single-backstroke-delete",
                displayDisabledOptions: "display-disabled-options",
                displaySelectedOptions: "display-selected-options",
                multiple: "multiple"
            };
            scope.api = scope.api || {}, scope.api._data = {}, scope.api._data.value = angular.isUndefined(scope.settings.value) ? void 0 : scope.settings.value, 
            scope.api._data.autoClose = angular.isUndefined(scope.settings.autoClose) ? !1 : scope.settings.autoClose, 
            scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? !0 : scope.settings.valid, 
            scope.api._data.name = angular.isUndefined(scope.settings.name) ? void 0 : scope.settings.name, 
            scope.api._data.label = angular.isUndefined(scope.settings.label) ? void 0 : scope.settings.label, 
            scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? !1 : scope.settings.disabled, 
            scope.api._data.placeholder = angular.isUndefined(scope.settings.placeholder) ? void 0 : scope.settings.placeholder, 
            scope.api._data.error = angular.isUndefined(scope.settings.error) ? void 0 : scope.settings.error, 
            scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? !0 : scope.settings.editable, 
            scope.api._data.options = angular.isUndefined(scope.settings.options) ? void 0 : scope.settings.options, 
            scope.api._data.onChange = angular.isFunction(scope.settings.onChange) ? scope.settings.onChange : void 0;
            var chosenAttrOptions = "";
            angular.forEach(chosenAttrs, function(val, key) {
                angular.isUndefined(scope.settings[key]) || 1 != scope.settings[key] || angular.isUndefined(val) || (chosenAttrOptions += val + " ");
            }), angular.isString(scope.settings.placeholder) && (chosenAttrOptions += 'data-placeholder="' + scope.settings.placeholder + '" '), 
            scope.api.setLabel = function(label) {
                scope.api._data.label = label;
            }, scope.api.getLabel = function() {
                return scope.api._data.label;
            }, scope.api.view = function() {
                setViewMode();
            }, scope.api.edit = function() {
                setEditMode();
            }, scope.api.setInvalid = function(msg) {
                scope.api._data.valid = !1, scope.api._data.error = angular.isString(msg) ? msg : void 0, 
                errorMsgCheck();
            }, scope.api.setValid = function() {
                scope.api._data.valid = !0, errorMsgCheck();
            }, scope.api.setValue = function(val) {
                scope.api._data.value = val;
            }, scope.api.getValue = function() {
                return scope.api._data.value;
            }, scope.api.setOptions = function(options) {
                scope.api._data.options = options;
            }, scope.api.getOptions = function() {
                return scope.api._data.options;
            }, scope.api.disable = function() {
                scope.api._data.disabled = !0, elementSelect.attr("disabled", !0).trigger("chosen:updated");
            }, scope.api.enable = function() {
                scope.api._data.disabled = !1, elementSelect.removeAttr("disabled").trigger("chosen:updated");
            }, scope.$watch("api._data.value", function(n, o) {
                angular.isFunction(scope.api._data.onChange) && (scope.api._data.onChange(n, o), 
                processEmptiness(n));
            }), // INIT
            angular.isUndefined(scope.settings.view) || 1 != scope.settings.view ? setEditMode() : setViewMode();
        }
    };
} ]);