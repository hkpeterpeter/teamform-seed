export default ['$authProvider', ($authProvider) => {
    var serviceUri = ENV.ITSC_SERVICE_URL;
    serviceUri += '?redirect_uri=' + window.location.origin;
    $authProvider.oauth2({
        name: 'ust',
        url: '/oauth',
        defaultUrlParams: null,
        redirectUri: window.location.origin,
        requiredUrlParams: ['service'],
        service: encodeURIComponent(serviceUri),
        authorizationEndpoint: ENV.AUTH_URL,
        responseParams: {
            ticket: 'ticket',
            redirect_uri: 'redirect_uri',
            service_uri: 'service_uri'
        },
        popupOptions: {
            width: 500,
            height: 700
        }
    });
}];
