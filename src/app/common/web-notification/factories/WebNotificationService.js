export default class WebNotificationService {
    constructor($window) {
        this.$window = window;
        this.supported = ('Notification' in this.$window);
        this.requestPermission();
    }
    requestPermission() {
        if (this.supported) {
            this.$window.Notification.requestPermission();
        }
    }
    create(title, body, onClick, timeout = 7000) {
        if (this.supported && this.$window.Notification.permission === 'granted') {
            let notification = new this.$window.Notification(title, {
                body: body,
                vibrate: [
                    200, 100, 200
                ],
                timestamp: Math.floor(Date.now() / 1000)
            });
            notification.onclick = () => {
                if(onClick) {
                    onClick(notification);
                }
                notification.close();
            };
            let closeTimeout = setTimeout(() => {
                notification.close();
            }, timeout);
            notification.onclose = () => {
                clearTimeout(closeTimeout);
            };
        }
    }
    static instance(...args) {
        if (!WebNotificationService.Instance) {
            WebNotificationService.Instance = new WebNotificationService(...args);
        }
        return WebNotificationService.Instance;
    }
}
WebNotificationService.Instance = null;
WebNotificationService.$inject = ['$window'];
