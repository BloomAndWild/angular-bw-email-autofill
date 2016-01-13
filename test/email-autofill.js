'use strict';

describe('Directive: emailAutofill', function() {
  beforeEach(module('bw-emailAutofill'));

	var element, scope;

	beforeEach(inject(function($rootScope, $compile) {
		element = angular.element('<div class="input-wrapper">' +
      '<input ng-model="data.email" email-typeahead class="typeahead" placeholder="Please start typing an email" />' +
    '</div>');

		scope = $rootScope;
    scope.data = {
      email: ''
    };

		$compile(element)(scope);
		scope.$digest();
	}));

	it("should have 2 input elements in the container", function() {
		var inputs = element.find('input');
		expect(inputs.length).toBe(2);
	});

  it("should provide a suggestion in the hint input", function() {
		var emailEl = angular.element(element.find('input')[0]);
		var hintEl = angular.element(element.find('input')[1]);
    scope.data.email = 'bowie@';
    emailEl.triggerHandler("focus");
		expect(hintEl.val()).toBe('bowie@gmail.com');
	});

  it("should strip whitespace", function() {
		var emailEl = angular.element(element.find('input')[0]);
		var hintEl = angular.element(element.find('input')[1]);
    scope.data.email = ' bowie@';
    emailEl.triggerHandler("focus");
    expect(scope.data.email).toBe('bowie@');
		expect(hintEl.val()).toBe('bowie@gmail.com');
	});
});
