
    var myApp = angular.module('myApp', []);

    myApp.controller('myController', ['$scope', function ($course) {
           
            $course.testing = false;
            $course.create = function () 
            {
                if (angular.isDefined($course.name) != '' ) 
                {
                   
                   
                    // ADD A NEW ELEMENT.
                    $course.list.push({name: $course.name});
                    
                    // CLEAR THE FIELDS.
                    $course.name = ''; 
                 
                }
            }


            $course.test = function()
            {
                $scope.testing = true;
            }

        }]
    );

/* 


$course.create = function() {
    var newItem = {};
    newItem.name = $course.item.name;
    $course.contact.items.push(newItem);
    console.log( $course.contact.items);
};












*/