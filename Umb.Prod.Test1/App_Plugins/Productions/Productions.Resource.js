angular.module("umbraco.resources")
.factory("productionResource", function ($http) {
    return {
        getById: function (id) {
            return $http.get("/umbraco/backoffice/Productions/ProductionsApi/GetById?id=" + id);
        },
        save: function (production) {
            return $http.post("/umbraco/backoffice/Productions/ProductionsApi/PostSave", angular.toJson(production));
        },
        deleteById: function (id) {
            return $http.delete("/umbraco/backoffice/Productions/ProductionsApi/DeleteById?id=" + id);
        }
    };
});