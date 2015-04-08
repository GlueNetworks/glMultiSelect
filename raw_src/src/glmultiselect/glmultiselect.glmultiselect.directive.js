angular.module('glMultiSelect').directive('glMultiSelect', ["$compile", "$timeout", function ($compile, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {
            settings: '=',
            api: '='
        },

        link: function (scope, element, attrs, controller) {

            var childScope = scope.$new();
            var elementSelect;
            var elementView;
            var elementError;
            var templateSelect;
            var templateError;
            var templateView;
            var classInvalid = "gl-invalid";

            templateError = '<p class="gl-error-msg" data-ng-bind="api._data.error"></p>';

            var chosenAttrs = {
                noResultsText: 'no-results-text',
                allowSingleDeselect: 'allow-single-deselect',
                disableSearchThreshold: 'disable-search-threshold',
                disableSearch: 'disable-search',
                enableSplitWordSearch: 'enable-split-word-search',
                inheritSelectClasses: 'inherit-select-classes',
                maxSelectedOptions: 'max-selected-options',
                searchContains: 'search-contains',
                singleBackstrokeDelete: 'single-backstroke-delete',
                displayDisabledOptions: 'display-disabled-options',
                displaySelectedOptions: 'display-selected-options',
                multiple: 'multiple'
                 //width: 'width'   // set width in containing elmeents style
            }

            scope.api = scope.api || {};
            scope.api._data = {};

            scope.api._data.value = angular.isUndefined(scope.settings.value) ? undefined : scope.settings.value;
            scope.api._data.autoClose = angular.isUndefined(scope.settings.autoClose) ? false : scope.settings.autoClose;
            scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? true : scope.settings.valid;
            scope.api._data.name = angular.isUndefined(scope.settings.name) ? undefined : scope.settings.name;
            scope.api._data.id = angular.isUndefined(scope.settings.id) ? undefined : scope.settings.id;
            scope.api._data.label = angular.isUndefined(scope.settings.label) ? undefined : scope.settings.label;
            scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? false : scope.settings.disabled;
            scope.api._data.placeholder = angular.isString(scope.settings.placeholder) ? scope.settings.placeholder : "&nbsp;";  // &nbsp; HACK for image placeholder as chosen puts in its own text if you dont supply a placeholder
            scope.api._data.error = angular.isUndefined(scope.settings.error) ? undefined : scope.settings.error;
            scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? true : scope.settings.editable;
            scope.api._data.options = angular.isUndefined(scope.settings.options) ? undefined : scope.settings.options;
            scope.api._data.onChange = angular.isFunction(scope.settings.onChange) ? function(val){ scope.settings.onChange(val, {id:scope.api._data.id,name:scope.api._data.name,settings:scope.settings} ); } : undefined;

            var id = angular.isUndefined(scope.api._data.id) ? "" : "id="+scope.api._data.id+'"';
            var chosenAttrOptions = "";

            angular.forEach(chosenAttrs, function (val, key) {
                if (!angular.isUndefined(scope.settings[key]) && scope.settings[key] == true && !angular.isUndefined(val)) {
                    chosenAttrOptions += val + " ";
                }
            });

            chosenAttrOptions += 'data-placeholder="' + scope.api._data.placeholder + '" '

            function setEditMode() {
                element.children().remove();
                scope.api._data.editable = true;
                templateSelect = '<select '+id+' style="width: 100%;" chosen ' + chosenAttrOptions + ' data-ng-model="api._data.value" data-ng-options="option.value as option.label group by option.group for option in api._data.options"><option value=""></option></select>';
                elementSelect = angular.element(templateSelect);
                if(scope.api._data.disabled){ elementSelect.attr('disabled',true) }
                element.append($compile(elementSelect)(childScope));
                elementSelect.on('chosen:ready',function(){
                    processEmptiness(scope.api._data.value);
                    element.find('.chosen-results').attr('data-gl-super-scroll', 'data-gl-super-scroll');
                    errorMsgCheck();
                })
            }

            function processEmptiness(value){
                var c = element.children('.chosen-container');
                if( (angular.isString(value) || angular.isArray(value) ) && value.length){
                    c.removeClass('gl-empty');
                }else{
                    c.addClass('gl-empty');
                }
            }

            function setViewMode() {
                element.children().remove();
                scope.api._data.editable = false;
                templateView = '<label class="gl-multi-select-label" data-ng-bind="api._data.label"></label><p class="gl-multi-select-value" data-ng-bind="api._data.value"></p>';
                elementView = angular.element(templateView);
                element.append($compile(elementView)(childScope));
            }

            scope.api.setLabel = function (label) {
                scope.api._data.label = label;
            }
            scope.api.getLabel = function () {
                return scope.api._data.label;
            }

            scope.api.view = function () {
                setViewMode();
            }
            scope.api.edit = function () {
                setEditMode();
            }

            scope.api.setInvalid = function (msg) {
                scope.api._data.valid = false;
                if (angular.isString(msg)) {
                    scope.api._data.error = msg;
                } else {
                    scope.api._data.error = undefined;
                }
                errorMsgCheck();
            }

            scope.api.setValid = function () {
                scope.api._data.valid = true;
                errorMsgCheck();
            }

            scope.api.setValue = function (val) {
                scope.api._data.value = val;
            }
            scope.api.getValue = function () {
                return scope.api._data.value;
            }

            scope.api.setOptions = function (options) {
                scope.api._data.options = options;
            }
            scope.api.getOptions = function () {
                return scope.api._data.options;
            }

            scope.api.disable = function () {
                scope.api._data.disabled = true;
                elementSelect.attr('disabled', true).trigger("chosen:updated");
            }

            scope.api.enable = function () {
                scope.api._data.disabled = false;
                elementSelect.removeAttr('disabled').trigger("chosen:updated");
            }

            function errorMsgCheck() {
                if (!angular.isUndefined(elementError)) {
                    elementError.remove();
                }
                if (scope.api._data.editable) {
                    if (scope.api._data.valid) {
                        elementSelect.removeClass(classInvalid);
                        element.find('.chosen-container').removeClass(classInvalid);
                    } else {
                        elementSelect.addClass(classInvalid);
                        element.find('.chosen-container').addClass(classInvalid);
                        if (angular.isString(scope.api._data.error)) {
                            elementError = $compile(angular.element(templateError))(scope)
                            element.append(elementError);
                        }
                    }
                }
            }

            scope.$watch('api._data.value', function (n, o) {
                if (angular.isFunction(scope.api._data.onChange)) {
                    scope.api._data.onChange(n, o);
                    processEmptiness(n);
                }
            });



            // INIT
            if (!angular.isUndefined(scope.settings.view) && scope.settings.view == true) {
                setViewMode();
            } else {
                setEditMode();
            }

        }

    };
}]);
