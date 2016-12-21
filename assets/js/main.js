"use strict";

(function($){
	var TM = TweenMax;

	/**
 	 * App
 	 * @ Requires Modules { Ticketer, JSON, listing, Preloader }
 	 */
 	function App()
 	{
 		var that = this;

 		Ticketer.apply(this, arguments);

 		this.$footer 	  = $('footer');
		this.$unavaliable = $('#unavaliable');
		that.unavaliableVisible = false;

 		this.pages = {
 			$home 	 : $('#home'),
 			$listing : $('#listing'),
 			$search  : $('#search')
 		};

 		this.JSON    = new JSON();
 		this.listing = new Listing(this);

 		this.onPage = 0;

 		this.$backBtn = $('#back_btn');

 		this.showBackBtn = function() {
 			TM.to(that.$backBtn, 0.5, { left: '	=24%','display' : 'block' });
 		};

 		this.hideBackBtn = function() {
 			if (that.$backBtn.css('display') != 'none') {
 				TM.to(that.$backBtn, 0.5, { left: '-=24%', 'display' : 'none' });
 			}
 		};

 		$(window).on('hashChange', this.detectPage);

 		this.hashMatch = function(value, cb) {
 			var matches = (window.location.href.indexOf(value) > -1);
 			if (matches) cb();
 			return matches;
 		}

 		this.detectPage = function() {
 			var location = window.location.hash;

 			switch(location) {
 				case '' :
 					// history.pushState(null, null, null);
 					break
 			}
 		}

 		this.setUpFooterLinks = function() {
			that.$footer.find('#footer_tickets').on('click', that.showUnavaliable);
			that.$footer.find('#footer_settings').on('click', that.showUnavaliable);
		};

		this.showUnavaliable = function() {
			if(that.unavaliableVisible) return;

			that.unavaliableVisible = true;

			that.$unavaliable.fadeIn().delay(3000).fadeOut(function() {
				that.unavaliableVisible = false;
			});
		};

 		this.init = function() 
	 	{	
			var preloader = new Preloader();
			preloader.onComplete(function() {
				TM.to($('#main'), 0.5, { opacity: 1 });
			});	

			// On Complete;
			that.search = new Search();
		 	that.search.init();

		 	that.home = new Home();
		 	that.home.init();
		 	
		 	that.setUpFooterLinks();
		}

 	}

 	/**
 	 * Preloader
 	 * 
 	 */
 	function Preloader(_$preloader) {
		var $preloader = $("#preloader");
		var siteLoaded = false;
		var imageContainer = [];

 		var $logo = $preloader.find('#preloader_logo');
 		var $cube = $preloader.find('.cube-wrapper');

		var preloaded = 0;
		var allImages = [	
			"img/homeslider/slide_01.jpg",
			"img/homeslider/slide_02.jpg",
			"img/homeslider/slide_03.jpg",
			"img/homeslider/slide_04.jpg",
			"img/icons/add.svg",
			"img/icons/back.svg",
			"img/icons/cancel.svg",
			"img/icons/diamond.png",
			"img/icons/home.svg",
			"img/icons/location.svg",
			"img/icons/search-white.svg",
			"img/icons/search.svg",
			"img/icons/settings.png",
			"img/icons/ticket.png",
			"img/icons/ticket.svg",
			"img/icons/ticket_icon.png",
			"img/icons/tickets.svg",
			"img/icons/triangle.svg",
			"img/icons/triangle_pink.svg",
			"img/listing/listing_01.jpg",
			"img/novatix_logo.svg",
			"img/novatix_logo_blue.png",
			"img/novatix_logo_blue.svg",
			"img/posts/adele-featured-image.jpg",
			"img/posts/ariana-featured-image.jpg",
			"img/posts/beyonce-featured-image.jpg",
			"img/posts/ed_sheeran-featured-image.jpg",
			"img/posts/eminem-featured-image.jpg",
			"img/posts/justin_bieber-featured-image.jpg",
			"img/posts/weeknd-featured-image.jpg",
			"img/results/adele-search-icon.jpg",
			"img/results/ariana-search-icon.jpg",
			"img/results/beyonce-search-icon.jpg",
			"img/results/ed_sheeran-search-icon.jpg",
			"img/results/eminem-search-icon.jpg",
			"img/results/justin_bieber-search-icon.jpg",
			"img/results/justin_timberlake-search-icon.jpg",
			"img/results/result_01.jpg",
			"img/results/result_02.jpg",

		];
		var that = this;

		this.onComplete = function(_cb) {
			$.each(allImages, function(index, value){
				var img = new Image();
				img.src = "assets/" + value;

				imageContainer.push(img);

				img.onload = function(){
					that.preloadProgress(_cb);
				}

				img.onerror = function(){
					console.log("Error: " + this.src);
					that.preloadProgress(_cb);
				}
			});
		}

		this.preloadProgress = function(_cb){
			preloaded ++;
			var percent = preloaded / allImages.length;
			percent = Math.round(percent * 100);

			if(percent >= 100) {
				siteLoaded = true;
				TM.to($preloader, 0.5, {opacity: 0, display: "none", delay: 1, onComplete: _cb });
			}
		}
 	}
	/**
	 * Data Module
	 * Retrives Data
	 */
	var JSON = function() 
	{
		this.data = {};

		this.fetchData = function(_url, _cb, _err) {

			$.ajax({
				type: 'GET', 
			    url: 'assets/js/' + _url,
			    dataType: 'json',
			    success: (_cb != undefined) ? _cb : null,
			    error: (_err != undefined) ? _err : null
			});

			return false;
		}
	}

	/**
	 * Home Module
	 * @ Requires { TodayModule, App };
	 */
 	var Home = function() 
 	{	
 		// Import
		this.todayModule = new TodayModule('#module-home_today');

 		this.$container  = $(this.$home);

 		this.bindEvents = function() {
 			this.slider.attachEvents();
 			this.slider.startAutoplay();
 		};

 		this.unbindEvents = function() {
 			this.slider.detachEvents();
 			this.slider.stopAutoplay();
 		};

 		this.init = function() {
			this.slider = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				preloadImages: true,
				loop: true,
				autoplay: 2500,
				autoplayDisableOnInteraction: false,
				centeredSlides: true,
			});

			// Init Today Module
			this.todayModule.init();
		};
 	}

	/**
	 * Search Module
	 * @ Requires { App }
	 */
	var Search = function() 
	{
		var that = this;

		// Import
		App.apply(this, arguments);

		this.searchPage      = $(this.pages.$search);
		this.searchResults   = $('#search_results');
		this.$header    	 = $('header');
		this.$search    	 = $('#search-btn');
		this.$logo 	    	 = this.$header.find('.logo'); 
		this.$searchbox 	 = $('#search-box');
		this.$blinkingcursor = this.$header.find('.blinking');
		this.$cancel         = this.$header.find('.cancel').hide();
		this.$clear          = this.$header.find('.clear').hide();
		this.headerVisible   = false;
		this.onPage			 = 'listing';

		// JSON Data
		this.data 			 = [];

		this.init = function() {
			that.JSON.fetchData('events.json', that.handleData);

			that.jqueryRegEx();
		};

		this.bindEvents = function() {
			// Show Search
			this.$search
				.on('click', that.showSearch);

			// Hide Search
			this.$cancel
				.on('click', that.hideSearch);

			// Clear Search
			this.$clear
				.on('click', that.clearSearch);

			// Filter Results
			this.$searchbox
				.on('keyup', that.filterResults);

			// Go Back
			this.$backBtn
				.on('click', that.goBack);

			
			this.$footer
				.find("#footer_home")
					.on('click', function() {
						if(that.$backBtn.position().left > 0) that.goHome();
					});

			this.$footer
				.find("#footer_search")
					.on('click', that.showSearch);

			this.searchPage.find('.result').on('click', that.showPost);
		};

		this.showSearch = function(e) {
			if(!that.headerVisible) {
				// Show Blinking Cursor
				that.$searchbox.focus();

				// Animate Logo to the Top
				TM.to(that.$logo, 0.5, { 
					top: '-=100%', 
					onComplete: function() {
						// Show clear and cancel
						that.$cancel.fadeIn();
						that.$clear.fadeIn();
					} 
				});

				// Back Logo to the Left
				that.hideBackBtn();

				// Animate Search bar in
				TM.to(that.$search, 0.5, { 
					right: '90%', 
					onComplete: function() { 
						TM.to(that.$searchbox, 0.5, { width: '50%' }); 
					} 
				});

				// Fade In Search Page
				TM.to(that.searchPage, 0.2, { display: 'block', 'opacity' : "1" });

				// Stop Scroll On Background
				TM.set($("#main"), { height: '90%', 'position' : 'absolute' });

				that.headerVisible = true;
			}

			e.preventDefault();
			e.stopPropagation();
		};

		this.hideSearch = function(e) {
			if(that.headerVisible){
				// Hide Blinking Cursor
				that.$searchbox.blur();

				// Animate 
				that.$cancel.fadeOut();
				that.$clear.fadeOut();

				TM.to(that.$searchbox, 0.2, { 
					width: 0, 
					onComplete: function() {  
						TM.to(that.$search, 0.2, { right: '5%', onComplete: function() {
							TM.to(that.$logo, 0.2, { top: '+=100%' });
							that.$searchbox[0].value = "";

							// Reset Search Data
							that.resetResults();
						} });
					} 
				}); 

				// Fade Out Search Page
				TM.to(that.searchPage, 0.2, { display: 'none', 'opacity' : "0" });

				// Start Scroll On Background
				TM.set($("#main"), { height: '', 'position' : '' });

				that.headerVisible = false;
			}

			if(e) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		this.hideBlinkingCursor = function() {
			that.$blinkingcursor.hide();

			return false;
		};

		this.clearSearch = function(e) {
			that.$searchbox[0].value = "";
			e.preventDefault();

			return false;
		};

		this.handleData = function(_data) {
			that.data = _data;

			var source   = $("#result-template").html();
			var template = Handlebars.compile(source);

			that.searchResults.append(template( that.data ));

			that.bindEvents();

			return false;
		};

		this.jqueryRegEx = function() {
			$.expr[':'].containsLower = function (a, i, m) {
			  if (m[3] === '') {
			    return true;
			  }
			  var re = new RegExp('(^' + m[3].toUpperCase() + '[^ ]+) | (' + m[3].toUpperCase() + '.*$)');
			  return a.textContent.toUpperCase().trim().match(re) != null;
			};

			return false;
		}

		this.filterResults = function(e) {
			that.searchResults.find('.result').hide().filter(':containsLower("' + this.value + '")').show();
			return false;
		}

		this.resetResults = function() {
			that.searchResults.find('.result').show();
			return false;
		}

		this.showPost = function() {
 			var postID = $(this).data('id');
 			var listing = [];

 			that.data.events.forEach(function(_data) {
 				(_data.id == postID) ? listing.push(_data) : false;
 			});

 			that.listing.show(listing[0]);

 			that.hideSearch();
 		};

 		this.goBack = function() {
 			var $checkout = $('#listing .checkout');
 			if($checkout.position().top > 0) {
 				that.listing.slideOut();
 			} else {
 				TM.to($checkout, 0.5, {top: '100%'});
 			}
 		}

 		this.goHome = function() {
 			var $checkout = $('#listing .checkout');
 			if($checkout.position().top > 0) {
 				that.listing.slideOut();
 			} else {
 				TM.to($checkout, 0.5, {top: '100%', onComplete: function() {
 					that.listing.slideOut();
 				}});
 			}
 		}
	};

	/**
	 * Today Module
	 *@ Requires { App }
	 */
 	var TodayModule = function(_container) 
 	{
 		var that = this;

 		// Import
 		App.apply(this, arguments);

		this.$container = $(_container);
		this.$results   = this.$container.find('.results');
		this.$template  = $("#today_events-template");
 		this.data 		= [];

 		this.init = function() {
 			that.JSON.fetchData('events.json', that.handleData);
 		};

 		this.handleData = function(_data) {
 			// Only Display 3
 			for(var i = 0; i < 3; i++) {
 				//var randomEvent = Math.round(Math.random() * (_data.events.length - 1) );
 				that.data[i] = _data.events[i];
 			};

 			// Filter Dates
 			that.data.forEach(function(data, i) {
 				var day   = data.date.match(/[^%,]*/i)[0];
 				var date  = data.date.match(/[^,]*$/i)[0];

 				data.day  = day;
 				data.date = date;
 			});

 			// Make Source
			var source   = that.$template.html();
			var template = Handlebars.compile(source);

			// Append Data
			that.$results.append(template( that.data ));

			that.bindEvents();
 		};

 		this.bindEvents = function() {
 			that.$results.find('.post').on('click', that.showPost);
 		};

 		this.unbindEvents = function() {
 			that.$results.find('.post').off('click', that.showPost);
 			that.listing.slideOut();
 		};

 		this.showPost = function() {
 			var postID = $(this).data('id');
 			var listing = [];

 			that.data.forEach(function(_data) {
 				(_data.id == postID) ? listing.push(_data) : false;
 			});
 			
 			that.listing.slideIn(listing[0]);
 		};
 	}
	
	/**
	 * Buy Tickets Module
	 *
	 */
	var Ticketer = function() {
		var that = this;

 		this.$checkOutContainer = $('#listing .checkout');
 		this.$headContent 		= this.$checkOutContainer.find('.head_content');
 		this.$btnWhite    		= this.$checkOutContainer.find('.button.white');
 		this.$checkoutBtn    	= $('#checkout_btn');

 		this.$ticketer 			= $('#ticket_counter');
		this.$plus    			= this.$ticketer.find('.plus');
		this.$minus    			= this.$ticketer.find('.minus');
		this.$counter 			= this.$ticketer.find('.counter');
		this.ticketCounter 		= 0;

		this.show = function() {
			// Slide Ticketer In
	 		TM.to(this.$checkOutContainer, 0.5, { top: '-=100%', onComplete: function() {
	 			that.$checkoutBtn.fadeIn();

	 			TM.to(that.$headContent, 0.5, { top: '-=36%', onComplete: function() {
	 				TM.to(that.$btnWhite, 0.5, { opacity : 1 });
	 			} });
	 		} });

	 		$('#listing').animate({ scrollTop: 0 }, 200);

	 		this.bindEvents();
		};

		this.hideTicketer = function(cb) {
			TM.to(that.$btnWhite, 0.5, { opacity : 0 });

			TM.to(that.$headContent, 0.5, { top: '+=36%', onComplete: function() {
 				that.$checkoutBtn.fadeOut();

 				// Slide Ticketer In
		 		TM.to(this.$checkOutContainer, 0.5, { top: '+=100%', onComplete: function() {
		 			cb();
		 		} });
	 		}});

	 		this.unbindEvents();
		};

		this.bindEvents = function(){
			this.$plus.on('click', this.addTicket.bind(that, this));
	 		this.$minus.on('click', this.deleteTicket.bind(that, this));
		};

		this.unbindEvents = function(){
			this.$plus.off('click', this.addTicket);
	 		this.$minus.off('click', this.deleteTicket);
		};

		this.addTicket = function() {
 			this.ticketCounter++;
 			this.$counter.html(this.ticketCounter);
 			this.$minus.show();
	 	};

	 	this.deleteTicket = function() {
 			(this.ticketCounter < 1) ? this.ticketCounter = 0 : this.ticketCounter--;

	 		this.$counter.html(this.ticketCounter);
	 	};

	 	this.resetTickets = function() {
	 		this.counter = 0;
	 	}
 	}

 	/**
	 * Listing Module
	 * @ Dependency: Class = Data
	 */
 	function Listing(app) 
 	{	
 		var app = app;
 		var $home = app.pages.$home;
 		var that = this;

		this.$container = $('#listing');
		this.$result    = this.$container.find('.result');
 		this.$template  = $("#listing-template");
 		that.$buyNow 	= this.$container.find('#buynow');
 		this.ticketer 	= null;

 		// Make Source
		var source   = this.$template.html();
		var template = Handlebars.compile(source);
		

 		this.slideIn = function(data) {
 			// Append Data
			this.$result.append(template(data));
			
			TM.to($home, 0.5, { left: '-=100%' });
			TM.to(that.$buyNow, 0.5, {left : '-=95%'} );
			TM.to(that.$container, 0.5, { left: '-=100%'});

			// Back Logo to the Left
			app.showBackBtn();

			this.bindEvents();
			//app.home.unbindEvents(); // UnBind Home Events
	 	};

	 	this.empty = function() {
			this.$result.html('');
	 	};

		this.slideOut = function() {
			TM.to($home, 0.5, { left: '+=100%' });
			TM.to(that.$buyNow, 0.5, {left : '+=95%'} );
			
			app.hideBackBtn();
			
			TM.to(this.$container, 0.5, { left: '+=100%', onComplete: function() {
				that.$result.html('');
				that.unbindEvents();

				//app.home.bindEvents(); // Bind Home Events
			} });

			if(this.ticketer != null) {
				this.ticketer.hide(function() {
					this.ticketer = null;
				});
			}
		};

		this.show = function(data) {
			// Append Data
			this.$result.html('');
			this.$result.append(template(data));

			TM.set($home, { left : '-100%' });
			TM.set(this.$container, { left: 0 });

			TM.set(that.$buyNow, { 'left' : '5%' });

			this.bindEvents();

			// Back Logo to the Left
			app.showBackBtn();
	 	};

		this.hide = function() {
			this.$result.html('');
			this.unbindEvents();

			TM.set($home, { left: 0 });
			TM.set(that.$buyNow, { 'left' : '100%' });
			TM.set(this.$container, { left: '100%' });

			// Back Logo to the Left
			app.hideBackBtn();

			if(this.ticketer != null) this.ticketer = null;
	 	};

	 	this.bindEvents = function() {
			that.$buyNow.on('click', that.showCheckOut);
	 	};

	 	this.unbindEvents = function() {
			that.$buyNow.off('click', that.showCheckOut);
	 	};

	 	this.showCheckOut = function() {
	 		this.ticketer = new Ticketer();
	 		this.ticketer.show();
	 	};
 	}

 	/**
	 * Init App
	 *
	 */
	var novatix = new App();
	novatix.init();

})(jQuery);