var resized = false;
const navList = jQuery('#navList');
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var deviceWidth = iOS ? screen.width : jQuery(document).outerWidth();

jQuery(window).on('load', function() {
	
	if (deviceWidth < 1170) {
		hideElements()
		if (navList.find('.navigation__item._hidden').length) {
			jQuery('#hamburger').addClass('_shown') 
		} else {
			jQuery('#hamburger').removeClass('_shown')
		}
	}
	
})

jQuery(window).resize(function() {
	if (resized) return 0;
	hideElements()
	resized = true;

	deviceWidth = iOS ? screen.width : jQuery(document).outerWidth();
	const nav = jQuery('#nav');
	if (nav.hasClass('_full-screen')) {
		navList.find('.navigation__item._hidden').show()
	}
	
	if (navList.find('.navigation__item._hidden').length) {
		jQuery('#hamburger').addClass('_shown') 
	} else {
		jQuery('#hamburger').removeClass('_shown')
	}
})

setInterval(function() {
	resized = false
}, 350)

function hideElements() {
	const navWidth = deviceWidth > 870 ? navList.outerWidth() - 95 : navList.outerWidth();
	if (deviceWidth < 420) {
		navList.find('.navigation__item').each(function(index, element) {
			if (index < 2) return true;
			if (index === (navList.find('.navigation__item').length - 1)) {
				jQuery(element).show().removeClass('_hidden')
				return true;
			}
			jQuery(element).hide().addClass('_hidden');
		})
		return true;
	} else {
		if (navList.find('.navigation__item').eq(2).hasClass('_hidden')) {
			navList.find('.navigation__item').eq(2).removeClass('_hidden').show();
		}
	}
	navList.find('.navigation__item').each(function(index, element) {
		if (jQuery(element).hasClass('_hidden')) {
			if (parseInt(jQuery(element).attr('data-width')) < navWidth) {
				jQuery(element).removeClass('_hidden').show().removeAttr('data-width');
			}
		} else {
			const itemWidth = jQuery(element).outerWidth(),
				  itemPosition = jQuery(element).offset().left;
			if (navWidth < (itemWidth + itemPosition)) {
				jQuery(element).addClass('_hidden').attr('data-width', itemWidth + itemPosition);
				setTimeout(function() {
					jQuery(element).hide();
				}, 300)
			} else {
				if ((jQuery(element).find('.navigation__submenu').outerWidth() + itemPosition) > deviceWidth) {
					jQuery(element).addClass('_right');
				} else {
					jQuery(element).removeClass('_right')
				}
			}
		}
	});
}

jQuery('.has_submenu .navigation__link').click(function() {
	
	if (jQuery('#nav').hasClass('_full-screen')) {
		jQuery(this).parent().toggleClass('_shown')
	}

})

jQuery('#hamburger').click(function() {

	const nav = jQuery('#nav');

	if (nav.hasClass('_full-screen')) {
	
		nav.animate({'top': '-100%'}, 500);
		navList.find('.navigation__item._hidden').hide();
		setTimeout(function() {
			nav.removeClass('_full-screen');	
			jQuery('html').removeClass('modalOpened');
			nav.animate({top: 0}, 300)
		}, 500)

	} else {

		nav.animate({'top': `-100%`}, 300);
		navList.find('.navigation__item._hidden').show()
		setTimeout(function() {
			nav.addClass('_full-screen');
			jQuery('html').addClass('modalOpened')
			nav.animate({top: 0}, 500)
		}, 300)

	}

})
