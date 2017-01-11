var thumbnails = $('.thumbnail').not($('.img-responsive'));
var thumbs = [];
for (var i = 0; i < thumbnails.length; i++) { thumbs.push(thumbnails[i]['src']); }