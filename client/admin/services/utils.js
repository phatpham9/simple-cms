'use strict';

angular.module('simple-cms')

.service('utils', function() {
    return {
        slugify: function(str) {
            return str ? str.trim().toLowerCase().replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : '';
        }
    };
})

.filter('numWords', function() {
    return function(text) {
        if (text && (typeof text === 'string')) {
            return text.trim().split(/\s+/).length;
        } else {
            return 0;
        }
    };
})

.filter('readingSpeed', function() {
    return function(numWords) {
        if (numWords && (typeof numWords === 'number')) {
            var secs = numWords / 250 * 60;

            var hours = Math.floor(secs / (60 * 60));
            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);
            var divisor_for_seconds = divisor_for_minutes % 60;
            if (divisor_for_seconds > 30) {
                minutes++;
            }

            if (hours == 0 && minutes == 0) {
                return 'a second';
            } else {
                return [hours > 0 ? hours + (hours > 1 ? ' hours' : 'hour') : '', minutes > 0 ? minutes + (minutes > 1 ? ' minutes' : ' minute') : ''].join('');
            }
        } else {
            return 'a second';
        }
    };
})

.filter('htmlToText', function() {
    return function(html) {
        return String(html).replace(/<[^>]+>/gm, ''); //return angular.element('<div>').html(html).text().trim();
    };
});