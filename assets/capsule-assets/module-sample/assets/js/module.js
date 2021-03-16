
$(function () {
  colorchip('.js-color-tone-chip');
});


function colorchip(target) {
  var type, parentClass, bgRGB, hexColor;
  $(target).each(function () {
    type = $(this).data('color-name');
    parentClass = 'color-tone-chip ' + 'is-color-' + type;
    $(this).append('<dl>').find('dl').addClass(parentClass).append('<dt><dd>').find('dd').append('<ul>').append('<ul>');
    bgRGB = $(this).find('dt').css('backgroundColor');
    hexColor = rgb2hex(bgRGB);
    $(this).find('dt').append('<span>$color-' + type + '</span><br /><small>' + hexColor + '</small>');
    for (var i = 0; i < 9; i++) {
      var toneNumber = ((i + 1) * 100);
      $(this).find('ul').append('<li>');
      bgRGB = $(this).find('li').eq(i).css('backgroundColor');
      hexColor = rgb2hex(bgRGB);
      $(this).find('ul').eq(0).find('li').eq(i).append('<span>$color-' + type + '-' + toneNumber + '</span><br /><small>' + hexColor + '</small>');
      $(this).find('ul').eq(1).find('li').eq(i).append('<span>$color-' + type + '-' + toneNumber + '</span>');
    }
  });
}


function rgb2hex(colorval) {
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete(parts[0]);
  for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
  }
  console.log(parts);
  color = '#' + parts.join('');
  return color;
}