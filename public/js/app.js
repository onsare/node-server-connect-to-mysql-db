  var app = angular.module('app',[]);
        app.controller('app', function ($scope,$http,$timeout) { 
            
            var TypeTimer;                
            var TypingInterval = 1000;

            $scope.keyup = function() {
                $timeout.cancel(TypeTimer);
                TypeTimer=$timeout( function(){ get_data(); }, TypingInterval);
            };

            $scope.keydown = function(){
                $timeout.cancel(TypeTimer);
            };

            function get_data(){
                var Firstname=$scope.Firstname;
                $http.post('/get_data',{Firstname:Firstname}).success(function(data, status, headers, config) {
                   $scope.data_server=data;
                }).error(function(data, status) {
                    alert("Connection Error");
                });
            }            
        });