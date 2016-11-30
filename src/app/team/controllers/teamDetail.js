export default class TeamDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, ngNotify, authService, teamService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.ngNotify = ngNotify;
        this.authService = authService;
        this.teamService = teamService;
        this.team = null;
        this.error = null;
        this.getTeam();
    }
    async getTeam() {
        try {
            let team = await this.teamService.getTeam(this.$stateParams.teamId);
            this.$timeout(() => {
                this.team = team;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.ngNotify.set(error.message, {type: 'error'});
            });
        }
    }
    async joinTeam(positionId, message) {
        try {
            let teamUsers = await this.teamService.joinTeam(this.$stateParams.teamId, positionId, message);
            this.$timeout(() => {
                this.ngNotify.set('Joined Team Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    async confirmTeamPosition(positionId) {
        try {
            let teamUsers = await this.teamService.confirmTeamPosition(this.$stateParams.teamId, positionId);
            this.$timeout(() => {
                this.ngNotify.set('Confirmed User Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.ngNotify.set(error.message, {type: 'error'});
            });
        }
    }
    async rejectConfirmTeamPosition(positionId) {
        try {
            let teamUsers = await this.teamService.rejectConfirmTeamPosition(this.$stateParams.teamId, positionId);
            this.$timeout(() => {
                this.ngNotify.set('Rejected User Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    async acceptTeamPosition(positionId) {
        try {
            let teamUsers = await this.teamService.acceptTeamPosition(this.$stateParams.teamId, positionId);
            this.$timeout(() => {
                this.ngNotify.set('Accepted Invite Successfully!');
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    async rejectAcceptTeamPosition(positionId) {
        try {
            let teamUsers = await this.teamService.rejectAcceptTeamPosition(this.$stateParams.teamId, positionId);
            this.$timeout(() => {
                this.ngNotify.set('Rejected Invite Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    async cancelRequestTeamPosition(positionId) {
        try {
            let teamUsers = await this.teamService.cancelRequestTeamPosition(this.$stateParams.teamId, positionId);
            this.$timeout(() => {
                this.ngNotify.set('Canceled Team Request Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    async removeTeamPosition(positionId) {
        try {
            let teamUsers = await this.teamService.removeTeamPosition(this.$stateParams.teamId, positionId);
            this.$timeout(() => {
                this.ngNotify.set('Removed Member Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    canManage() {
        let user = this.authService.getUserSync();
        return user && user.uid == this.team.data.createdBy;
    }
    canAccept(positionId) {
        return this.isMe(this.team.data.users[positionId].id);
    }
    isMe(userId) {
        let user = this.authService.getUserSync();
        return user && user.uid == userId;
    }
    filterJoined(user) {
        return user.id != null && user.pending !== true && user.confirmed !== false;
    }
    filterAvailable(user) {
        return user.id == null;
    }
    filterWaitingList(user) {
        return user.pending === true && (user.confirmed === false || user.accepted === false);
    }
}

TeamDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'ngNotify', 'AuthService', 'TeamService'];
