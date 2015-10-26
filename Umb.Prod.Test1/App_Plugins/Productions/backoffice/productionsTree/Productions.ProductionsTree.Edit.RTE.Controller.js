
    function ProductionsRTEController($scope) {
        $scope.properties = [{
            label: 'bodyText',
            description: '',
            view: 'rte',
            config: {
                editor: {
                    toolbar: ["code", "undo", "redo", "cut", "styleselect", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "umbmediapicker", "umbmacro", "table", "umbembeddialog"],
                    stylesheets: [],
                    dimensions: { height: 400, width: 650 }
                }, // empty for now
                hideLabel: true
            }, hideLabel: true
        }];
    }