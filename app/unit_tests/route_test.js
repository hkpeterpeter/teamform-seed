
describe('TestRoute', function() {
   
  var  $route;

   beforeEach(module('mainApp'));
   beforeEach(inject(function(_$route_){
   		$route = _$route_;
   		
   }));

   it('test_MyProfile_page', function(){

    expect($route.routes['/'].templateUrl).
      toEqual('MyProfile.html');


  });

   it('test_MyNotifications_page', function(){

    expect($route.routes['/MyNotifications'].templateUrl).
      toEqual('MyNotifications.html');


  });

   it('test_MyEvents_page', function(){

    expect($route.routes['/MyEvents/:p'].templateUrl).
      toEqual('MyEvents.html');
    expect($route.routes['/MyEvents/:p'].controller).
      toEqual('EventController');      


  });

   it('test_MyConversations_page', function(){

    expect($route.routes['/MyConversation/:p'].templateUrl).
      toEqual('MyConversations.html');
    expect($route.routes['/MyConversation/:p'].controller).
      toEqual('ConversationController');      


  });


}); 