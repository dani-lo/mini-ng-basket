/**
*
* DaniDevBasket.services
*/
angular.module("DaniDevBasket.services", [])
.factory("ProductsListService", ["$http", "APPCONFIG",  function ($http, APPCONFIG) {
	//
	"use strict";
	//
	return {
		getProducts: function () {
			return $http.get(APPCONFIG.endpoints.products.list);
		}
	};
}]);
/**
*
* DaniDevBasket.controllers
*/
angular.module("DaniDevBasket.controllers", [])
.controller("ProductsListCtrl", ["$scope", "$rootScope", "ProductsListService", function ($scope, $rootScope, ProductsListService) {
	//
	"use strict";
	//
	$scope.isloaded = false;
	$scope.products = [];

	ProductsListService.getProducts().then(function (d) {

		var products = d.data;

		products.forEach(function (product) {
			//
			product.inbasket = false;
		});

		$scope.products = d.data;

		setTimeout(function () {
			//
			$scope.isloaded = true;
			$scope.$apply();
		}, 1000);
	});

	$scope.itemToBasket = function (item_id) {
		//
		var item = getItem(item_id);

		$scope.products[$scope.products.indexOf(item)].inbasket = true;

		$rootScope.$emit("basket:add", item);
	}

	$scope.itemFromBasket = function (item_id) {
		//
		var item = getItem(item_id);

		$scope.products[$scope.products.indexOf(item)].inbasket = false;

		$rootScope.$emit("basket:remove", item);
	}

	function getItem (item_id) {
		return $scope.products.find(function (itemLoop) {
			return itemLoop.item_id === item_id;
		});
	}
}])
.controller("ProductsBasketCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
	//
	"use strict";
	//
	$scope.basket = {
		products: [],
		total: 0,
		price: 0
	};

	$scope.isloaded = false;

	$scope.isproducts = false;

	$scope.showBasketProducts = function () {
		//
		$scope.isproducts = true;
	}

	$scope.hideBasketProducts = function () {
		$scope.isproducts = false;
	}

	function addProduct (product) {
		//
		$scope.basket.products.push(product);
		$scope.basket.total++;
		$scope.basket.price += parseInt(product.price, 10);
	}

	function removeProduct (product) {
		//
		$scope.basket.products.splice($scope.basket.products.indexOf(product), 1);
		$scope.basket.total--;
		$scope.basket.price -= parseInt(product.price, 10);

		console.log($scope.basket.products);
	}

	$rootScope.$on("basket:add", function () {
		//
		addProduct(arguments[1]);
	});

	$rootScope.$on("basket:remove", function () {
		//
		removeProduct(arguments[1]);
	});

	setTimeout(function () {
		//
		$scope.isloaded = true;
		$scope.$apply();
	}, 1000);
}])
/**
*
* DaniDevBasket.directives
*/
angular.module("DaniDevBasket.directives", [])
.directive("a", function () {
	//
	"use strict";
	
	return {
		restrict: "E",
		link: function (scope, elem, attrs) {
			if (attrs.href === "#_") {

				elem.on("click", function (e) {
					e.preventDefault();
				});
			}
		}
	};
})