'use strict';
var emailAutofill = angular.module('bw-emailAutofill', []);

emailAutofill.directive('emailTypeahead', function ($compile, typeahead) {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function (element) {
      element.after('<input type="text" name="hint" readonly="readonly" ng-model="typeaheadHint" class="typeahead-hint">');

      return function(scope, element, attr, ngModel) {
        var onEmailUpdated;
        var suggestedEmail;

        element.bind('keydown', function (event) {
          if((event.which === 13 || event.which === 9) && suggestedEmail) {
            ngModel.$setViewValue(suggestedEmail);
            ngModel.$render();
          }
        });

        element.bind('blur', function (event) {
          scope.typeaheadHint = '';
          scope.$apply();
        });

        element.bind('focus', function (event) {
          onEmailUpdated(ngModel.$viewValue);
          scope.$apply();
        });

        onEmailUpdated = function (email) {
          element.val(email); // set input value to ng-model value, helps mitigate whitespace weirdness as model has ng-trim by default

          if (email) {
            var currentlyTypedDomain;
            var hint;
            var suggestion;
            var emailDomainRegex = /.*@(.*)/;
            var domainMatches = emailDomainRegex.exec(email);
            var readyToSuggest = (email.indexOf('@') > -1);

            if (readyToSuggest) {
              currentlyTypedDomain = domainMatches[1];
              suggestion = typeahead.getSuggestion(currentlyTypedDomain);
              hint = (suggestion) ? suggestion.substr(currentlyTypedDomain.length) : '';
              suggestedEmail = email + hint;
              scope.typeaheadHint = suggestedEmail;
            } else {
              scope.typeaheadHint = '';
              suggestedEmail = undefined;
            }
          }
        };

        scope.$watch(function () {return ngModel.$viewValue;}, onEmailUpdated);
      };
    }
  };
});

emailAutofill.factory('typeahead', function () {
  var emailList = [ //priority order!!
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'aol.com',
    'comcast.net',
    'me.com',
    'msn.com',
    'live.com',
    'sbcglobal.net',
    'ymail.com',
    'att.net',
    'mac.com',
    'cox.net',
    'verizon.net',
    'hotmail.co.uk',
    'rocketmail.com',
    'aim.com',
    'yahoo.co.uk',
    'earthlink.net',
    'charter.net',
    'optonline.net',
    'shaw.ca',
    'yahoo.ca',
    'googlemail.com',
    'mail.com',
    'qq.com',
    'btinternet.com',
    'mail.ru',
    'live.co.uk',
    'naver.com',
    'rogers.com',
    'juno.com',
    'yahoo.com.tw',
    'live.ca',
    'walla.com',
    '163.com',
    'roadrunner.com',
    'telus.net',
    'embarqmail.com',
    'hotmail.fr',
    'pacbell.net',
    'sky.com',
    'sympatico.ca',
    'cfl.rr.com',
    'tampabay.rr.com',
    'q.com',
    'yahoo.co.in',
    'yahoo.fr',
    'hotmail.ca',
    'windstream.net',
    'hotmail.it',
    'web.de',
    'asu.edu',
    'gmx.de',
    'gmx.com',
    'insightbb.com',
    'netscape.net',
    'icloud.com',
    'frontier.com',
    '126.com',
    'hanmail.net',
    'suddenlink.net',
    'netzero.net',
    'mindspring.com',
    'ail.com',
    'windowslive.com',
    'netzero.com',
    'yahoo.com.hk',
    'yandex.ru',
    'mchsi.com',
    'cableone.net',
    'yahoo.com.cn',
    'yahoo.es',
    'yahoo.com.br',
    'cornell.edu',
    'ucla.edu',
    'us.army.mil',
    'excite.com',
    'ntlworld.com',
    'usc.edu',
    'nate.com',
    'outlook.com',
    'nc.rr.com',
    'prodigy.net',
    'wi.rr.com',
    'videotron.ca',
    'yahoo.it',
    'yahoo.com.au',
    'umich.edu',
    'ameritech.net',
    'libero.it',
    'yahoo.de',
    'rochester.rr.com',
    'cs.com',
    'frontiernet.net',
    'swbell.net',
    'msu.edu',
    'ptd.net',
    'proxymail.facebook.com',
    'hotmail.es',
    'austin.rr.com',
    'nyu.edu',
    'sina.com',
    'centurytel.net',
    'usa.net',
    'nycap.rr.com',
    'uci.edu',
    'hotmail.de',
    'yahoo.com.sg',
    'email.arizona.edu',
    'yahoo.com.mx',
    'ufl.edu',
    'bigpond.com',
    'unlv.nevada.edu',
    'yahoo.cn',
    'ca.rr.com',
    'google.com',
    'yahoo.co.id',
    'inbox.com',
    'fuse.net',
    'hawaii.rr.com',
    'talktalk.net',
    'gmx.net',
    'walla.co.il',
    'ucdavis.edu',
    'carolina.rr.com',
    'comcast.com',
    'live.fr',
    'live.cn',
    'cogeco.ca',
    'abv.bg',
    'tds.net',
    'centurylink.net',
    'yahoo.com.vn',
    'uol.com.br',
    'osu.edu',
    'san.rr.com',
    'rcn.com',
    'umn.edu',
    'live.nl',
    'live.com.au',
    'tx.rr.com',
    'eircom.net',
    'sasktel.net',
    'post.harvard.edu',
    'snet.net',
    'wowway.com',
    'live.it',
    'hoteltonight.com',
    'att.com',
    'vt.edu',
    'rambler.ru',
    'temple.edu',
    'bloomandwild.com',
    'cinci.rr.com'
  ];

  var getSuggestion = function (partialEmail) {
    if (partialEmail.length === 0) {
      return emailList[0];
    } else {
      return _.find(emailList, function(emailCandidate) {
        return _.startsWith(emailCandidate, partialEmail);
      });
    }
  };

  return {
    getSuggestion: getSuggestion
  };
});
