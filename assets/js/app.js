//this module is designed to work with the whole applicatione
var app = angular.module('mattca', ['JSONService','ngAnimate']);

//root variable keeps track of initial load (probably a better way of doing this)
app.run(function($rootScope) {
	//count how many items are initially loaded, so that they can be faded in at once (without all sliding down)
	$rootScope.initialAnimationItems;
})

//animation for fading in new links
app.animation('.gs-animation', function($rootScope) {
	return {
		enter: function(element, done) {
			if ($rootScope.initialAnimationItems > 0) {
				$rootScope.initialAnimationItems--;
				TweenLite.from(element, 1, {opacity:0, onComplete:function(){
					done();
				}});
			} else {
				var ulMarginTop = parseInt(element.parent('ul').css('margin-top').replace("px", ""))-(parseInt(element.height())+parseInt(element.css('margin-top').replace("px", "")));
				TweenLite.fromTo(element.parent('ul'), 1, {marginTop: ulMarginTop+'px'}, {marginTop: '0', onComplete:function(){
					done();
				}});
			}
			return function(cancelled) {
				//this (optional) function will be called when the animation
				//completes or when the animation is cancelled (the cancelled
				//flag will be set to true if cancelled).
			};
		},
		leave: function(element, done) { 
			element.remove();
		},
		move: function(element, done) { },
		
		//animation that can be triggered before the class is added
		beforeAddClass: function(element, className, done) { },
		
		//animation that can be triggered after the class is added
		addClass: function(element, className, done) { },
		
		//animation that can be triggered before the class is removed
		beforeRemoveClass: function(element, className, done) { },
		
		//animation that can be triggered after the class is removed
		removeClass: function(element, className, done) { }
	};
	
});