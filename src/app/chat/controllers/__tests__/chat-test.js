import chat from '../../';

describe('ChatController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(chat);
        inject((_$controller_) => {
            $controller = _$controller_('ChatCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve getMessages', async(done) => {
        let $timeout;
        inject((_$timeout_, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(ChatService, 'getMessages').and.returnValue(Promise.resolve({message: 'test', createdBy: 'me'})));
        });
        await $controller.getMessages();
        $timeout.flush();
        expect($controller.messages.message).toEqual('test');
        expect($controller.messages.createdBy).toEqual('me');
        done();
    });

    it('should reject getMessages', async(done) => {
        let $timeout;
        inject((_$timeout_, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(ChatService, 'getMessages').and.returnValue(Promise.reject(new Error('Fail to Get Messages'))));
        });
        await $controller.getMessages();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Get Messages');
        done();
    });

    it('should resolve send', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({email: 'test@test.com'})));
            $spys.push(spyOn(ChatService, 'sendMessage').and.returnValue(Promise.resolve({key: 1})));
        });
        $controller.message.data = 'test';
        $controller.message.createdAt = '0';
        await $controller.send();
        $timeout.flush();
        expect($controller.message).toEqual({});
        done();
    });

    it('should reject send', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({email: 'test@test.com'})));
            $spys.push(spyOn(ChatService, 'sendMessage').and.returnValue(Promise.reject(new Error('Fail to Send Messages'))));
        });
        $controller.message.data = 'test';
        $controller.message.createdAt = '0';
        await $controller.send();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Send Messages');
        done();
    });

    it('should resolve getChatrooms', async(done) => {
        let $timeout;
        inject((_$timeout_, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(ChatService, 'getChatrooms').and.returnValue(Promise.resolve([{id: 1}])));
        });
        await $controller.getChatrooms();
        $timeout.flush();
        expect($controller.chatrooms[0].id).toEqual(1);
        done();
    });

    it('should reject getChatrooms', async(done) => {
        let $timeout;
        inject((_$timeout_, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(ChatService, 'getChatrooms').and.returnValue(Promise.reject(new Error('Fail to Get Chatroom'))));
        });
        await $controller.getChatrooms();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Get Chatroom');
        done();
    });

    it('should resolve create', async(done) => {
        let $timeout;
        inject((_$timeout_, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(ChatService, 'createChatroom').and.returnValue(Promise.resolve([{id: 1}])));
        });
        $controller.chatroom.name = 'test';
        await $controller.create();
        $timeout.flush();
        expect($controller.chatroom).toEqual({});
        done();
    });

    it('should reject create', async(done) => {
        let $timeout;
        inject((_$timeout_, ChatService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(ChatService, 'createChatroom').and.returnValue(Promise.reject(new Error('Fail to Create Chatroom'))));
        });
        $controller.chatroom.name = 'test';
        await $controller.create();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Create Chatroom');
        done();
    });
});
