'use strict';

var instagram = (function (self, $) {

  var feed = new Instafeed({
    get: 'user',
    userId: '182331352',
    accessToken: '182331352.c523153.150a20d01bb549c6911f6d188976a612'
  });

////////////////////////////////
// Set up
////////////////////////////////

  window.onload = function () {
    feed.run();
  };

  return self;
}(instagram || {}, jQuery));
