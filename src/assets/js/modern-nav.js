$(document).ready(function() {
  // Define Elements
  var $navToggle = $(".modern-nav-toggle");
  var $modernNav = $(".modern-nav");
  var $modernNavOverlay = $(".modern-nav-overlay");
  var $navParentLink = $(".modern-nav-parent-item").find(".modern-nav-list-item-link");
  var $subMenu = ".modern-nav-sub";

  // Hide/Show Navbar on Mobile
  var navStatus = "default"; // accepts strings 'default' or 'vertical'
  $navToggle.on("click", function() {
    console.log("clicked");
    $modernNav.toggleClass("modern-nav-open");
    $modernNavOverlay.toggleClass("modern-nav-overlay-open");
  })

  // Open sub nav lists on mobile
  $navParentLink.on("click", function(){
    if ( $modernNav.is(".modern-nav-open") ) {
      $(this).next(".modern-nav-sub").slideToggle(300);
    }
  })
  $modernNavOverlay.on("click", function(){
    $modernNavOverlay.removeClass("modern-nav-overlay-open");
    $modernNav.removeClass("modern-nav-open");
  })
});
