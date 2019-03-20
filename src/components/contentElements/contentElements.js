jQuery(document).ready(function() {
	jQuery(window).on('load', function() {
		element()
	})
	jQuery(window).on('scroll', function() {
		element()
	})
	function element() {
		const winTop = jQuery(window).scrollTop();
		const winHeight = jQuery(window).height();
		jQuery('.content-element').each(function(index, element) {
			if (winTop > (jQuery(element).offset().top - winHeight)) {
				jQuery(element).addClass('_animated')
			}
		})
	}
})