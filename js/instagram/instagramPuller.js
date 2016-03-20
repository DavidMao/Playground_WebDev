'use strict';

var instagram = (function(self, $) {
////////////////////////////////
// Globals
////////////////////////////////
  var clientId = 'a1b3ba62c6714660b1f62c03f6c90c73';
  var accessToken = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";

////////////////////////////////
// Main
////////////////////////////////

  self.submitClicked = function() {
    var tag = $('#textbox-tag').val();
    self.getTag(tag);
  }

  self.callSuccess = function(data) {
    console.log (data.data);
    console.log('hm');
  }

  self.getTag = function(tag) {

    var accessParameters = {
      access_token: accessToken
    };

    $.ajax({
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + 40,
      data: accessParameters,
      type: 'GET',
      cache: false,
      success: function(instagram_data) {
        var target = $("#target");
        //console.log(instagram_data);
        if (instagram_data.meta.code == 200) {
            var photos = instagram_data.data;
            //console.log(photos);
            if (photos.length > 0) {
                target.empty();
                for (var key in photos) {
                    var photo = photos[key];
                    target.append('<a href="' + photo.link + '"><img src="' + photo.images.thumbnail.url + '"></a>')
                }
            } else {
                target.html("nothing found");
            }
        } else {
            var error = instagram_data.meta.error_message;
            target.html(error);
        }
      },
      fail: function() {
        console.log('oops');
      }
    });    
  }

////////////////////////////////
// Set up
////////////////////////////////

//  $( window ).resize(function() {
//    displayTables(false);
//  });

  return self;
}(instagram || {}, jQuery));
