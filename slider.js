(function () {
	'use strict';

	var cssSlider = {

			// CSS-Slider selectors
			selectors: {
				container: 'slider-wrapper',
				sliderItems: '.slider-content > li',
				firstSlide: '.slider-content > li:first-child',
				activeSlide: '.slider-content > .active',
				clickFrame: '.slider-clickframe',
				activeBullet: '.slider--bullets .active',
				allBulletLinks: 'a[href^="#slide-"]',
			},

			// Object to remove the class attr of 1st child if 1st child isn't active
			sliderRemoveFirstClass: function() {

				var hash = window.location.hash;

				if(hash != "" && hash !== '#slide-1') {
					document.querySelector(cssSlider.selectors.firstSlide).removeAttribute('class');
				}

			},

			setClickFrame: function() {

				var getContainer = document.getElementsByClassName(cssSlider.selectors.container);
				var newNode = document.createElement("a");

				var hash = window.location.hash;
				var getHashId = 1; // Set initial value to 1 as this the 1st is always loaded

				if(hash !== '') {
					getHashId = hash.match(/\d+(\.\d+)?/g);
					getHashId = parseInt(getHashId[0]);
				}

				var maxCount = document.querySelectorAll(cssSlider.selectors.sliderItems).length;
				var nextItem;

				if(getHashId < maxCount) {
					nextItem = getHashId+1;
				} else {
					nextItem = 1;
				}

				newNode.setAttribute('class', 'slider-clickframe');
				newNode.setAttribute('href', '#slide-'+nextItem);

				getContainer[0].appendChild(newNode);

			},

			changeClickFrame: function() {

				var getClickFrame = document.querySelector(cssSlider.selectors.clickFrame);

				var hash = window.location.hash;
				var getHashId = hash.match(/\d+(\.\d+)?/g);

				var maxCount = document.querySelectorAll(cssSlider.selectors.sliderItems).length;
				var nextItem;

				getHashId = parseInt(getHashId[0]);

				if(getHashId < maxCount) {
					nextItem = getHashId+1;
				} else {
					nextItem = 1;
				}

				getClickFrame.setAttribute('href', '#slide-'+nextItem);

			},

			setActiveItems: function() {

				var hash = window.location.hash;

				// Set active Slide
				var getActiveSlide = document.querySelector(cssSlider.selectors.activeSlide);

				if (getActiveSlide !== null) {
					getActiveSlide.removeAttribute('class');
				}

				// Set active Bullet
				var activeSlideBullet = document.querySelector(cssSlider.selectors.activeBullet);
				var sliderBulletArray = document.querySelectorAll(cssSlider.selectors.allBulletLinks);

				// Remove old active Class
				activeSlideBullet.removeAttribute('class');

				// Set new active Class
				document.querySelector('a[href="'+hash+'"]').setAttribute('class', 'active');
			},

			init: function() {
				var hash = window.location.hash;

				// Set clickable frame on Slider
				window.addEventListener('DOMContentLoaded', cssSlider.setClickFrame);
				window.addEventListener('hashchange', cssSlider.changeClickFrame);

				// Set active item
				window.addEventListener('hashchange', cssSlider.setActiveItems);

				if(hash.indexOf("slide-") >= 0) {
					window.addEventListener('DOMContentLoaded', cssSlider.setActiveItems);
				}

			}

	};

	// Initialize cssSlider
	cssSlider.init();
}());
