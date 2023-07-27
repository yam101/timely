ej.base.registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEViXntYcnVSQmhZ');

// Initialize toast objects
var toastObj = new ej.notifications.Toast({
    position: {
        X: 'Right'
    }, 
    target: document.body
});
toastObj.appendTo('#toast_type');

var toasts = [
    { title: 'Warning', content: 'Not allowed to edit this booking', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
    { title: 'Error', content: 'Time slot is already filled!', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
    { title: 'Success', content: 'Successfully added booking.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
    { title: 'Success', content: 'Successfully imported file', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
    { title: 'Success', content: 'Deleted booking', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
    { title: 'Success', content: 'Edited booking', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
];

export {toastObj, toasts};