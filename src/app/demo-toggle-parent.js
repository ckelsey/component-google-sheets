import angular from 'angular'

angular.module('app').directive('demoToggleParent', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.bind('click', function(){
				if(element.parent().hasClass(attr.demoToggleParent)){
					element.parent().removeClass(attr.demoToggleParent);
				}else{
					element.parent().addClass(attr.demoToggleParent);
				}
			});
		}
	};
});
