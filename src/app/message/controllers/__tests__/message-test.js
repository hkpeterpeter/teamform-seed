import message from '../../';
describe('MessageController', () => {
    let $controller, $scope, $spys = [];
    beforeEach(() => {
        angular.mock.module(message);
        inject((_$rootScope_, _$controller_) => {
            $scope = _$rootScope_.$new();
            $controller = _$controller_('MessageCtrl', {$scope: $scope});
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('init', () => {
        $scope.$broadcast('messageChanged');
    });

    it('should resolve updateMessages', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService, MessageService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({uid: 1})));
            $spys.push(spyOn(MessageService, 'getMessages').and.returnValue(Promise.resolve({
                getSent: () => {
                    return [{
                        id: 1,
                        data: {
                            createAt: Date.now()
                        },
                        getSender: () => {
                            return {$id: 1};
                        },
                        getReceiver: () => {
                            return {$id: 1};
                        }
                    }];
                },
                getRecv: () => {
                    return [{
                        id: 2,
                        data: {
                            createAt: Date.now()
                        },
                        getSender: () => {
                            return {$id: 1};
                        },
                        getReceiver: () => {
                            return {$id: 1};
                        }
                    }];
                }
            })));
        });
        await $controller.updateMessages();
        console.log($controller.conversations);
        $timeout.flush();
        expect($controller.conversations).not.toBe(null);
        $controller.conversation = {user: {$id: 1, name: 'haha'}};
        await $controller.updateMessages();
        $timeout.flush();
        done();
    });

    it('should reject updateMessages', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService, MessageService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(MessageService, 'getMessages').and.returnValue(Promise.reject(new Error('Fail to Get Messages'))));
        });
        await $controller.updateMessages();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Get Messages');
        done();
    });

    it('should resolve sendMessage', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService, MessageService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({uid: 1})));
            $spys.push(spyOn(MessageService, 'sendMessage').and.returnValue(Promise.resolve({key: 1})));
        });
        $controller.messageContent = 'test';
        $controller.conversation = {user: {$id: 1}};
        await $controller.sendMessage();
        $timeout.flush();
        expect($controller.messageContent).toEqual('');
        done();
    });

    it('should reject sendMessage', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService, MessageService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({uid: 1})));
            $spys.push(spyOn(MessageService, 'sendMessage').and.returnValue(Promise.reject(new Error('Fail to Send Message'))));
        });
        $controller.messageContent = 'test';
        $controller.conversation = {user: {$id: 1}};
        await $controller.sendMessage();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Send Message');
        done();
    });

    it('getConversation', () => {
        let $timeout;
        inject((_$timeout_) => {
            $timeout = _$timeout_;
        });
        $controller.conversations = [{user: {$id: 1, name: 'haha'}}, {user: {$id: 2, name: 'hehe'}}];
        $controller.getConversation(1);
        $timeout.flush();
        expect($controller.conversation.user.name).toEqual('haha');
        $controller.getConversation(-1);
    });

});
