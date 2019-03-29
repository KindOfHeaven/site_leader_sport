jQuery(document).ready(function() {

	const  event = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 'touchstart' : 'click';
	jQuery('#galleryDropdown').bind(event, function() {
		jQuery(this).parent().toggleClass('_opened')
	})

})


