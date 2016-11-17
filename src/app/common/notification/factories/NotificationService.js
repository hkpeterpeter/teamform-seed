export default class NotificationService {
    constructor($window) {
        this.$window = window;
        this.supported = ('Notification' in this.$window);
        this.requestPermission();
        console.log(this.supported);
    }
    requestPermission() {
        if (this.supported) {
            this.$window.Notification.requestPermission();
        }
    }
    create(title, body, timeout = 7000) {
        console.log(this.$window.Notification.permission);
        if (this.supported && this.$window.Notification.permission === 'granted') {
            console.log('create');
            let notification = new this.$window.Notification(title, {
                body: body,
                vibrate: [
                    200, 100, 200
                ],
                timestamp: Math.floor(Date.now() / 1000)
            });
            notification.onclick = () => {
                this.$window.focus();
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
        if (!NotificationService.Instance) {
            NotificationService.Instance = new NotificationService(...args);
        }
        return NotificationService.Instance;
    }
}
NotificationService.Instance = null;
NotificationService.$inject = ['$window'];
