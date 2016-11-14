  describe('#changePassword', function() {
    it('should invoke callback on success', function() {
      var spy = sinon.spy();
      var user = auth.getUser('password', {email: 'email@firebase.com'});
      auth.changePassword('email@firebase.com', user.password, 'spiffy', spy);
      auth.flush();
      expect(spy.callCount).equals(1);
      var call = spy.getCall(0);
      expect(call.args[0]).equals(null);
      expect(call.args[1]).equals(true);
    });
