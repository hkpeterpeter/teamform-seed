import angular from 'angular';
import nouislider from 'nouislider';
export default class TeamListCtrl {
    constructor($filter, $location, $state, $timeout, NgTableParams, teamService, eventService) {
        this.$filter = $filter;
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.eventService = eventService;
        this.teams = [];
        this.events = [];
        this.error = null;
        this.teamListTableParams = new NgTableParams({
            page: 1,
            count: 2
        }, {
            filterOptions: {
                'filterFn': (...args) => this.teamFilter(...args)
            },
            counts: [],
            dataset: []
        });
        this.getTeams();
        this.getEvents();
        this.vacancyFilterDef = {
            min: {
                id: 'number'
            },
            max: {
                id: 'number'
            }
        };
    }
    initSlider() {
        angular.element('.slider-range')[0].style.height = '10px';
        nouislider.create(angular.element('.slider-range')[0], {
            range: {
                min: 0,
                max: 20
            },
            format: {
                to: (value) => {
                    return value;
                },
                from: (value) => {
                    return value;
                }
            },
            tooltips: true,
            start: [
                0, 20
            ],
            step: 1,
            connect: true
        });
        angular.element('.slider-range')[0].noUiSlider.on('change', (values) => {
            let filter = {
                min: values[0],
                max: values[1]
            };
            angular.extend(this.teamListTableParams.filter(), filter);
            this.teamListTableParams.reload();
        });
    }
    async getTeams() {
        try {
            let teams = await this.teamService.getTeams();
            this.$timeout(() => {
                this.teams = teams;
                this.teamListTableParams.settings({dataset: this.teams});
                teams.$watch(() => {
                    this.teamListTableParams.reload();
                });
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async getEvents() {
        try {
            let events = await this.eventService.getEvents();
            this.$timeout(() => {
                this.events = events;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    teamFilter(teams, filterValues) {
        let min = filterValues.min || Number.MIN_VALUE;
        let max = filterValues.max || Number.MAX_VALUE;
        delete filterValues.min;
        delete filterValues.max;
        return this.$filter('filter')(teams, filterValues).filter((team) => {
            return team.getVacancy() >= min && team.getVacancy() <= max;
        });
    }
}

TeamListCtrl.$inject = [
    '$filter',
    '$location',
    '$state',
    '$timeout',
    'NgTableParams',
    'TeamService',
    'EventService'
];
