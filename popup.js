'use strict';

(function startOptions() {
    var changeCursorOption = document.getElementById('change-cursor-option');
    var typeOptions = document.getElementsByName('type-option');

    chrome.storage.sync.get(['changeCursor', 'type'], function (result) {
        result.changeCursor = result.changeCursor === undefined || result.changeCursor;
        changeCursorOption.checked = result.changeCursor;

        result.type = result.type === undefined ? 'BUTTON' : result.type;
        for (var i = typeOptions.length; i--;)
            typeOptions[i].checked = typeOptions[i].value === result.type;
    });

    changeCursorOption.onchange = function changeCursorChange(e) {
        chrome.storage.sync.set({
            changeCursor: e.currentTarget.checked
        });
    };
    function typeChange(e) {
        chrome.storage.sync.set({
            type: e.currentTarget.value
        });
    }
    for (var i = typeOptions.length; i--;)
        typeOptions[i].onchange = typeChange;
})();