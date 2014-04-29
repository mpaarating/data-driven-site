function PostsCtrlAjax($scope, $http) {
    $http({method: 'POST', url: 'data/data.json'}).success(function(data)
    {
        $scope.posts = data; // response data
    });
}