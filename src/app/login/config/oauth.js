export default ['$authProvider', ($authProvider) => {
    $authProvider.oauth2({
        name: 'ust',
        url: '/oauth',
        defaultUrlParams: null,
        redirectUri: window.location.origin,
        requiredUrlParams: ['service'],
        service: encodeURIComponent(ENV.ITSC_SERVICE_URL + '?redirect_uri=' + window.location.origin),
        authorizationEndpoint: ENV.ITSC_AUTH_URL,
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
