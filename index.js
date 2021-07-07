function passwordGadgetInit(options) {
    var ALWAYS = 'ALWAYS', HOVER = 'HOVER', BUTTON = 'BUTTON';

    options = options || {
        type: BUTTON, // ALWAYS, HOVER, BUTTON
        changeCursor: true, // If true the cursor over the input on HOVER and BUTTON types will change to "pointer"
    };

    var inputs = document.getElementsByTagName('input');
    
    for(var i = inputs.length; i--;)
        if(inputs[i].type === 'password')
            configureInput(inputs[i]);

    function configureInput(el) {
        if(options.type === ALWAYS)
            showPassword(el);
        else {    
            if(options.changeCursor)
                el.style = 'cursor: pointer;';
            
            addEvents(el);
        }
    }

    function addEvents(el) {
        var currentMouseEnter = el.onmouseenter;
        el.onmouseenter = function onMouseEnter(e) {
            var enterAction = options.type === HOVER
                ? showPassword
                : showBox;

            enterAction(el);
            if(currentMouseEnter) currentMouseEnter(e);
        }

        var currentMouseLeave = el.onmouseleave;
        el.onmouseleave = function onMouseLeave(e) {
            var leaveAction = options.type === HOVER
                ? hidePassword
                : hideBox;
                
            leaveAction(el);
            if(currentMouseLeave) currentMouseLeave(e);
        }
    }

    function showBox(el) {
        // TODO show button
        showPassword(el);
    }

    function hideBox(el) {
        // TODO hide button
        hidePassword(el);
    }

    function showPassword(el) {
        el.type = 'text';
    }

    function hidePassword(el) {
        el.type = 'password';
    }
}

chrome.storage.sync.get(['changeCursor', 'type'], function(result) {
    passwordGadgetInit(result);
});
