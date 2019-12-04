var arrLang = {
    'de': {
        'back_button': "Blätter zurück",
        'forward_button': "Blätter Forwärts",

        'confirm_delete': 'Wollen sie das To Do wirklich löschen?'
    },
    'bobo': {
        'back_button': "Hab ich was verpennt?",
        'forward_button': "Wasn noch?",

        'confirm_delete': 'Ey Fauler, haste das wirklich gemacht?',
    }
};

// Process translation
$(function () {
    $('.translate').click(function () {
        selectedLanguage = $(this).attr('id');
        setSelectedLanguage(selectedLanguage);
    });
});

function setSelectedLanguage(language) {
    $('.language').each(function (index, item) {
        $(this).text(arrLang[language][$(this).attr('key')]);
    });
    localStorage.setItem("language", language);
}

function getTranslatedText(key) {
    return arrLang[selectedLanguage][key];
}