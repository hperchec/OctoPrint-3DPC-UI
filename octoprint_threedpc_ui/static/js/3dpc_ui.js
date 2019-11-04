/*
 * View model for OctoPrint-Threedpcui
 *
 * Author: Hervé PERCHEC
 * License: AGPLv3
 */
$(function() {
    function ThreedpcuiViewModel(parameters) {
        var self = this;

        self.settingsViewModel = parameters[0];

        // Beautiful output to console
        self.log = function (str) {
            console.log('[3DPC UI Plugin] : ' + str)
        }

        // this will hold the displayed status of 3DPC UI 'div' container
        self.uiStatus = ko.observable(true); // Set to true by default

        // Switch the interface
        self.switchUi = function () {
            // Define the inverse
            self.uiStatus(!self.uiStatus())
            // If true, show
            if (self.uiStatus()) {
                self.log('Switch to 3DPC UI')
                $('#threedpc_ui_container').show()
            } else {
                // Else, hide
                self.log('Switch to OctoPrint standard UI')
                $('#threedpc_ui_container').hide()
            }
        }
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: ThreedpcuiViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [ /* "loginStateViewModel", "settingsViewModel" */ ],
        // Elements to bind to, e.g. #settings_plugin_threedpcui, #tab_plugin_threedpcui, ...
        elements: [ "#navbar_plugin_threedpc_ui" ]
    });
});

const GET_THREEDPC_UI_SWITCH_BUTTON_VM = function () {
    // See jinja2 template for <a> element that is linked to this id
    // -> target [0] element to the object returned by $('...')
    return ko.dataFor($('#navbar_plugin_threedpc_ui_button')[0])
}