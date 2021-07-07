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
        var action = showPassword;
        if(options.type !== ALWAYS) {
            if(options.changeCursor)
                el.style = 'cursor: pointer;';

            action = options.type === BUTTON
                ? showBox
                : addEvents;
        }

        action(el);
    }

    function addEvents(el) {
        var currentMouseEnter = el.onmouseenter;
        el.onmouseenter = function onMouseEnter(e) {
            showPassword(el);
            if(currentMouseEnter) currentMouseEnter(e);
        }

        var currentMouseLeave = el.onmouseleave;
        el.onmouseleave = function onMouseLeave(e) {
            hidePassword(el);
            if(currentMouseLeave) currentMouseLeave(e);
        }
    }

    function showBox(el) {
        var shownText = 'ab12',
            hiddenText = '****';

        var div = document.createElement('div');
        div.id = Math.random().toString(36).substr(2, 9);
        div.style = 'position: absoulte;' +
            'display: inline-block;' +
            'margin-left: -36px;' +
            'z-index: 9999;';
        
        var button = document.createElement('button');
        button.type = 'button';
        button.innerText = el.dataset.show === 'true'
            ? shownText
            : hiddenText;
        button.onclick = function boxClick(e) {
            e.preventDefault();
            e.stopPropagation();
            var show = !(el.dataset.show === 'true');
            el.dataset.show = show;
            button.innerText = show ? shownText : hiddenText;
            
            var action = show ? showPassword : hidePassword;
            action(el);
        };

        div.appendChild(button);
        el.parentElement.appendChild(div);
        el.dataset.showBoxId = div.id;
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
