/*! 
  glChosen v(0.0.1) 
  (c) 2013-2015
  https://gluenetworks.kilnhg.com/Code/Web-Development
  Release Date: 2015-03-31 
*/
"use strict";

angular.module("glChosen", []), angular.module("glChosen", []), function() {
    /**
 * @ngdoc directive
 * @name glChosen.directive:glChosen
 * @restrict A
 *
 * @description
 * This replaces angular-chosen-localytics which has some logic that breaks glMultiSelect.
 *
 * @param {settings} angular expression evaluating to a settings hash.
 * - TODO fill me out...
 */
    var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
        return -1;
    };
    angular.module("glChosen").directive("chosen", [ "$timeout", function($timeout) {
        var CHOSEN_OPTION_WHITELIST, NG_OPTIONS_REGEXP, isEmpty, snakeCase;
        return NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/, 
        CHOSEN_OPTION_WHITELIST = [ "noResultsText", "allowSingleDeselect", "disableSearchThreshold", "disableSearch", "enableSplitWordSearch", "inheritSelectClasses", "maxSelectedOptions", "placeholderTextMultiple", "placeholderTextSingle", "searchContains", "singleBackstrokeDelete", "displayDisabledOptions", "displaySelectedOptions", "width" ], 
        snakeCase = function(input) {
            return input.replace(/[A-Z]/g, function($1) {
                return "_" + $1.toLowerCase();
            });
        }, isEmpty = function(value) {
            var key;
            if (angular.isArray(value)) return 0 === value.length;
            if (angular.isObject(value)) for (key in value) if (value.hasOwnProperty(key)) return !1;
            return !0;
        }, {
            restrict: "A",
            require: "?ngModel",
            terminal: !0,
            link: function(scope, element, attr, ngModel) {
                var chosen, defaultText, disableWithMessage, empty, initOrUpdate, match, options, origRender, removeEmptyMessage, startLoading, stopLoading, valuesExpr, viewWatch;
                // removing disable attr because it breaks initial disabled state loading in glMultiSelect
                return element.addClass("localytics-chosen"), options = scope.$eval(attr.chosen) || {}, 
                angular.forEach(attr, function(value, key) {
                    return __indexOf.call(CHOSEN_OPTION_WHITELIST, key) >= 0 ? options[snakeCase(key)] = scope.$eval(value) : void 0;
                }), startLoading = function() {
                    return element.addClass("loading").trigger("chosen:updated");
                }, stopLoading = function() {
                    return element.removeClass("loading").trigger("chosen:updated");
                }, chosen = null, defaultText = null, empty = !1, initOrUpdate = function() {
                    return chosen ? element.trigger("chosen:updated") : (chosen = element.chosen(options).data("chosen"), 
                    defaultText = chosen.default_text);
                }, removeEmptyMessage = function() {
                    return empty = !1, element.attr("data-placeholder", defaultText);
                }, disableWithMessage = function() {
                    return empty = !0, element.attr("data-placeholder", chosen.results_none_found).attr("disabled", !0).trigger("chosen:updated");
                }, ngModel ? (origRender = ngModel.$render, ngModel.$render = function() {
                    return origRender(), initOrUpdate();
                }, attr.multiple && (viewWatch = function() {
                    return ngModel.$viewValue;
                }, scope.$watch(viewWatch, ngModel.$render, !0))) : initOrUpdate(), attr.$observe("disabled", function() {
                    return element.trigger("chosen:updated");
                }), attr.ngOptions && ngModel ? (match = attr.ngOptions.match(NG_OPTIONS_REGEXP), 
                valuesExpr = match[7], scope.$watchCollection(valuesExpr, function(newVal, oldVal) {
                    var timer;
                    return timer = $timeout(function() {
                        return angular.isUndefined(newVal) ? startLoading() : (empty && removeEmptyMessage(), 
                        stopLoading(), isEmpty(newVal) ? disableWithMessage() : void 0);
                    });
                }), scope.$on("$destroy", function(event) {
                    return "undefined" != typeof timer && null !== timer ? $timeout.cancel(timer) : void 0;
                })) : void 0;
            }
        };
    } ]);
}.call(this);