/**
 * global locallang object for JS localisation
 * nicht fertig umgesetzt - siehe https://www.typo3.net/forum/thematik/zeige/thema/108390/
 */
locallang = {
    translations: [],
    set: function(key, value) {
        this.translations[key] = value;
    },
    setMultiple: function(list) {
        for(el in list) {
            this.translations[list[el][key]] = list[el][value];
        }
    },
    translate: function(key) {
        return this.translations[key];
    }
}