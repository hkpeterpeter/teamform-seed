jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/background.jpg");
    
    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	var x = 0;
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
                x++;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}            
    	});
    	if(x == 0){
            angular.element($('#student')).scope().loginUser();
        };
    });
    
    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], .login-form input[type="password"],.registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
        var x = 0;
    	$(this).find('input[type="text"],input[type="password"],textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
                x++;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
        if(x == 0){
            angular.element($('#registerModal')).scope().createUser();
        };
    	
    });
    
    
});
