jQuery(document).ready(function() {
	
	jQuery('.fancybox').fancybox({

	});
	jQuery('#gallerySlider').slick({
		dots: false,
		arrows: true,
		infinite: false,
		fade: true,
  		asNavFor: '#gallerySliderNav'
	})
	jQuery('#gallerySliderNav').slick({
	  	slidesToShow: 6,
	  	slidesToScroll: 1,
	  	asNavFor: '#gallerySlider',
	  	dots: false,
	  	arrows: false,
	  	focusOnSelect: true,
	  	infinite: false,
	  	responsive: [
    		{
    		  	breakpoint: 1170,
    		  	settings: {
    		    	slidesToShow: 5,
    		  	}
    		},
    		{
    		  	breakpoint: 768,
    		  	settings: {
    		    	slidesToShow: 4,
    		  	}
    		},
    		{
    		  	breakpoint: 480,
    		  	settings: {
    		    	slidesToShow: 3,
    		  	}
    		},
    	]
	});
})