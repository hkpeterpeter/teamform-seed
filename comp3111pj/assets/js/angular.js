angular.module("Demo", [] )
	.controller(
            "DemoController",
            function( $scope, friendService ) {
                // I contain the list of friends to be rendered.
                $scope.friends = [];
                // I contain the ngModel values for form interaction.
                $scope.form = {
                    name: ""
                };
                loadRemoteData();
                // ---
                // PUBLIC METHODS.
                // ---
                // I process the add-friend form.
                $scope.addFriend = function() {

                	friendService.addFriend( $scope.form.name )
                        .then(
                            loadRemoteData,
                            function( errorMessage ) {
                                console.warn( errorMessage );

                                            }
                        )
                    ;
                    // Reset the form once values have been consumed.
                    $scope.form.name = "pppp";
                };
                // I remove the given friend from the current collection.
                $scope.removeFriend = function( friend ) {
                    // Rather than doing anything clever on the client-side, I'm just
                    // going to reload the remote data.
                    friendService.removeFriend( friend.id )
                        .then( loadRemoteData )
                    ;
                };

                function applyRemoteData( newFriends ) {

                	$scope.friends = newFriends;
                }
                // I load the remote data from the server.
                function loadRemoteData() {
                    // The friendService returns a promise.
                    friendService.getFriends()
                        .then(
                            function( friends ) {
                                applyRemoteData( friends );
                            }
                        )
                    ;
                }
            }
        );

			// I act a repository for the remote friend collection.
        app.service(
            "friendService",
            function( $http, $q ) {
                // Return public API.
                return({
                    addFriend: addFriend,
                    getFriends: getFriends,
                    removeFriend: removeFriend
                });
                // ---
                // PUBLIC METHODS.
                // ---
                // I add a friend with the given name to the remote collection.
                function addFriend( name ) {
                    var request = $http({
                        method: "post",
                        url: "api/index.cfm",
                        params: {
                            action: "add"
                        },
                        data: {
                            name: name
                        }
                    });
                    return( request.then( handleSuccess, handleError ) );
                }

                // I get all of the friends in the remote collection.
                function getFriends() {
                    var request = $http({
                        method: "get",
                        url: "api/index.cfm",
                        params: {
                            action: "get"
                        }
                    });
                    return( request.then( handleSuccess, handleError ) );
                }
                // I remove the friend with the given ID from the remote collection.
                function removeFriend( id ) {
                    var request = $http({
                        method: "delete",
                        url: "api/index.cfm",
                        params: {
                            action: "delete"
                        },
                        data: {
                            id: id
                        }
                    });
                    return( request.then( handleSuccess, handleError ) );
                }
                // ---
                // PRIVATE METHODS.
                // ---
                // I transform the error response, unwrapping the application dta from
                // the API response payload.
                function handleError( response ) {
                    // The API response from the server should be returned in a
                    // nomralized format. However, if the request was not handled by the
                    // server (or what not handles properly - ex. server error), then we
                    // may have to normalize it on our end, as best we can.
                    if (
                        ! angular.isObject( response.data ) ||
                        ! response.data.message
                        ) {
                        return( $q.reject( "An unknown error occurred." ) );
                    }
                    // Otherwise, use expected error message.
                    return( $q.reject( response.data.message ) );
                }
                // I transform the successful response, unwrapping the application data
                // from the API response payload.
                function handleSuccess( response ) {
                    return( response.data );
                }
            }
        );
	













