ej.base.registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEViXntYcnVSQmhZ');

// Initializing colour object for adding a new lab
var colorObj = new ej.inputs.ColorPicker({
    mode: 'Palette',
    modeSwitcher: false,
    inline: true,
    showButtons: false,
    columns: 12,
    value: '#dbb0cc',
    presetColors: {
        'custom': ['#dbb0cc', '#ea8bb6', '#eb7c8d', '#eb7b6c', '#f09f53', '#f5c674', '#efd894',
                '#c4d784', '#90c8a2', '#98d0d0', '#8cc2db', '#8486ba']
    },
    beforeTileRender: function (args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(ej.base.createElement('span', {
            className: 'e-circle-selection'
        }));
    },
});
colorObj.appendTo('#circle-palette');

export {colorObj};