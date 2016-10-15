var app = angular.module("homepage", []);

app.component('feature', {
    // isolated scope binding
    bindings: {
        data: '='
    },

    // Inline template which is binded to message variable
    // in the component controller
    // templateUrl: 'feature.html',
    template: `<div class="container">
<img src="./images/feature1.png" style="width: 70px; height: 70px; float: left; display: inline;" />
<h1>{{ $ctrl.data }}</h1>
    </div>`,

    // The controller that handles our component logic
    // controller: function () {
    //     this.data = "HHhhHH";
    // }
});

app.component('developerinfo', {
    bindings: {
        data: '='
    },

    template: `<div class="container">
        <div class="col-md-5" style="border: 2px solid grey; margin: 5px;padding: 8px;">
            <img src="./images/teammember1.png" style="width: 90px; height: 90px; float: left; display: inline;" />
            <p>Basic information about the team member {{ $ctrl.data }}. adkfjlksaf kjfka j fa jkfjkd jkjkjfj jdkjf kjkdsjf k jfdsjfk</p>
        </div>
    </div>
    `,

});