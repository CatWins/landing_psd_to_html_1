jQuery(document).ready(function() {
  jQuery('.toggle-menu').click(function(e) {
    jQuery(this).toggleClass('menu-active');
    jQuery('header nav ul').toggleClass('menu-active');
    e.preventDefault();
  });
});
