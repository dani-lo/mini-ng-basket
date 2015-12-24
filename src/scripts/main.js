angular.module("DaniDevBasket", [
	"DaniDevBasket.controllers",
	"DaniDevBasket.directives",
    "DaniDevBasket.services"])
.constant("APPCONFIG", {
    version: "0.1",
    imgBase: "public/images",
    endpoints : {
        products : {
            list: "/assets/products.json",
            type: "GET"
        }
    }
});