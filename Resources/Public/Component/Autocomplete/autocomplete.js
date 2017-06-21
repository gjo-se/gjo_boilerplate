var gjoSe = gjoSe || {};

// Libs:
// https://github.com/corejavascript/typeahead.js
// https://github.com/corejavascript/typeahead.js/blob/master/doc/bloodhound.md
// https://github.com/corejavascript/typeahead.js/blob/master/doc/jquery_typeahead.md
// https://maxfavilli.com/jquery-tag-manager

gjoSe.autocomplete = {

    // TODO: Ajax
    // - vorbereiten

    // TODO: Locals
    // - vorbereiten

    // TODO: Cache
    //  - klären: kann ich vom BE aus, wenn neue Daten vorhanden sind, den FE Cache löschen? Server / Client
    //  - bloodhoundDataset.clearPrefetchCache(); localstorage.clear o.ä. (nur den einen CacheKey)


    $selector: '#' + autocomplete['id'],
    sourcesPath: 'typo3conf/ext/' + autocomplete.extensionName + '/Resources/Public/Data/',
    fileExtension: '.json',
    bloodhoundDatasets: [],
    prefetch: [],
    config: {
        minLength: 1,
        limit: 5,
        hint: false,
        highlight: true
    },
    tagsManager: {
        delimiters: [9, 13, 44],
        replace: true,
        backspace: [8],
        tagsContainerID: '#tagsContainer',
        blinkBGColor_1: '#FFFF9C',
        blinkBGColor_2: '#CDE69C',
        onlyTagList: true
    },

    locals: [{
        dataset: 'countries',
        template: {
            header: '<strong class="suggestionhead">Countries</strong>',
            suggestion: 'ohne Handlebars' //Handlebars.compile('<span  class="tt-name image" style="display: block"><a href="index.php?id={{link}}">{{name}}</a></span>')
        }
    }, {
        dataset: 'states',
        template: {
            header: '<strong class="suggestionhead">Countries</strong>',
            suggestion: 'ohne Handlebars' //Handlebars.compile('<span  class="tt-name image" style="display: block"><a href="index.php?id={{link}}">{{name}}</a></span>')
        }
    }],

    _getMinLength(){
        var minLength;

        if (autocomplete.config.minLength) {
            minLength = autocomplete.config.minLength;
        } else {
            minLength = this.config.minLength;
        }

        return minLength;
    },

    _getLimit(){
        var limit;

        if (autocomplete.config.limit) {
            limit = autocomplete.config.limit;
        } else {
            limit = this.config.limit;
        }

        return limit;
    },

    _isHint(){
        var hint;
        if (autocomplete.config.hint) {
            hint = autocomplete.config.hint;
        } else {
            hint = this.config.hint;
        }

        return this._getRealBoolean(hint);
    },

    _isHighlight(){
        var highlight;
        if (autocomplete.config.highlight) {
            highlight = autocomplete.config.highlight;
        } else {
            highlight = this.config.highlight;
        }

        return this._getRealBoolean(highlight);
    },

    _getTagsContainerID(){
        var tagsContainerID;
        if (autocomplete.tagsManager.tagsContainerID) {
            tagsContainerID = autocomplete.tagsManager.tagsContainerID;
        } else {
            tagsContainerID = this.tagsManager.tagsContainerID;
        }

        return tagsContainerID;
    },

    

    _getBlinkBGColor_1(){
        var blinkBGColor_1;
        if (autocomplete.tagsManager.blinkBGColor_1) {
            blinkBGColor_1 = autocomplete.tagsManager.blinkBGColor_1;
        } else {
            blinkBGColor_1 = this.tagsManager.blinkBGColor_1;
        }

        return blinkBGColor_1;
    },

    _getBlinkBGColor_2(){
        var blinkBGColor_2;
        if (autocomplete.tagsManager.blinkBGColor_2) {
            blinkBGColor_2 = autocomplete.tagsManager.blinkBGColor_2;
        } else {
            blinkBGColor_2 = this.tagsManager.blinkBGColor_2;
        }

        return blinkBGColor_2;
    },

    _getRealBoolean(value){

        if (value == 'true') {
            value = true
        } else {
            value = false
        }

        return value;
    },

    initializeDatasets: function () {

        var prefetch = this.prefetch;

        autocomplete.datasets.forEach(function (dataset, index) {

            prefetch[index] = [];
            prefetch[index]['source'] = dataset['source'];

            prefetch[index]['templates'] = [];
            prefetch[index]['templates']['header'] = '<h3 class="tt-suggestion-header">' + dataset['templates']['header'] + '</h3>';
            prefetch[index]['templates']['empty'] = prefetch[index]['templates']['header'] + '<div class="tt-suggestion-no-data">' + dataset['templates']['empty'] + '</div>';

            if (autocomplete.suggestionLink) {
                prefetch[index]['templates']['suggestion'] = Handlebars.compile('<span  class="tt-suggestion"><a href="{{link}}">' + dataset['templates']['suggestion'] + '</a></span>');
            } else {
                prefetch[index]['templates']['suggestion'] = Handlebars.compile('<span  class="tt-suggestion">' + dataset['templates']['suggestion'] + '</span>');
            }
        });


    },

    initializeBloodhound: function () {

        this.initializeDatasets();

        var locals = this.locals;
        var prefetch = this.prefetch;
        var sourcePath = this.sourcesPath;
        var fileExtension = this.fileExtension;
        var bloodhoundDatasets = [];


        // TODO: Loacls lauffähig machen
        // an Prefetch anpassen
        if (locals.length >= 0) {

            locals.forEach(function (local, index) {
                var dataset_2 = window.states;
                var dataset_2_Bloodhound = new Bloodhound({
                    datumTokenizer: function (d) {
                        var test = Bloodhound.tokenizers.whitespace(d.value);
                        $.each(test, function (k, v) {
                            i = 0;
                            while ((i + 1) < v.length) {
                                test.push(v.substr(i, v.length));
                                i++;
                            }
                        })
                        return test;
                    },
                    queryTokenizer: function (query) {
                        var normalized = gjoSe.autocomplete.normalize(query);
                        return Bloodhound.tokenizers.whitespace(normalized);
                    },
                    local: $.map(dataset_2, function (name) {
                        var normalized = gjoSe.autocomplete.normalize(name);
                        return {
                            value: normalized,
                            displayValue: name
                        };
                    })
                    // TODO: man acht ehier auf die fehlende Anonyme Funktion => und dann ohne 2. Return
                    // local: $.map(dataset_1, function (name) {
                    //     // var normalized = gjoSe.autocomplete.normalize(name);
                    //     // console.log('Local: ' + JSON.stringify(name, null, 4));
                    //     datum = {
                    //         value: gjoSe.autocomplete.normalize(name),
                    //         displayValue: name + index
                    //     };
                    //
                    //     return datum;
                    // }),
                });
            });

        }

        prefetch.forEach(function (dataset, index) {

            var url = sourcePath + dataset.source + fileExtension;
            var bloodhoundDataset = 'dataset_' + index + '_Bloodhound';

            var bloodhoundDataset = new Bloodhound({

                datumTokenizer: function (filteredValues) {
                    var datumToken = Bloodhound.tokenizers.whitespace(filteredValues.value);
                    $.each(datumToken, function (key, value) {
                        i = 0;
                        while ((i + 1) < value.length) {
                            datumToken.push(value.substr(i, value.length));
                            i++;
                        }
                    })
                    return datumToken;
                },
                queryTokenizer: function (query) {
                    var normalized = gjoSe.autocomplete.normalize(query);
                    return Bloodhound.tokenizers.whitespace(normalized);
                },
                prefetch: {
                    url: url,
                    filter: function (values) {
                        var filteredValues = $.map(values, function (value) {
                            return {
                                value: gjoSe.autocomplete.normalize(value['displayName']),
                                displayKey: value['displayName'],
                                meta: value['meta']
                            };
                        });

                        return filteredValues;

                    }

                },

            });


            // bloodhoundDataset.clearPrefetchCache();
            bloodhoundDataset.initialize();
            bloodhoundDatasets.push(bloodhoundDataset);
        });

        this.bloodhoundDatasets = bloodhoundDatasets;

    },

    normalize: function (input) {
        $.each(diacritics, function (unnormalizedChar, normalizedChar) {
            var regex = new RegExp(unnormalizedChar, 'gi');
            input = input.replace(regex, normalizedChar);
        });

        return input;
    },

    initializeTypeahead: function () {
        var $selector = this.$selector;
        var prefetch = this.prefetch;
        var minLength = parseInt(this._getMinLength());
        var limit = parseInt(this._getLimit());
        var hint = this._isHint();
        var highlight = this._isHighlight();
        var displayKey = 'displayKey';


        if (this.bloodhoundDatasets.length == 1) {
            $($selector).typeahead({
                    minLength: minLength,
                    hint: hint,
                    highlight: highlight
                }, {
                    limit: limit,
                    displayKey: displayKey,
                    source: this.bloodhoundDatasets[0],
                    templates: prefetch[0].templates
                }
            );
        }

        if (this.bloodhoundDatasets.length == 2) {
            $($selector).typeahead({
                    minLength: minLength,
                    hint: hint,
                    highlight: highlight
                }, {
                    limit: limit,
                    displayKey: displayKey,
                    source: this.bloodhoundDatasets[0],
                    templates: prefetch[0].templates
                }, {
                    limit: limit,
                    displayKey: displayKey,
                    source: this.bloodhoundDatasets[1],
                    templates: prefetch[1].templates
                }
            );
        }

    },

    initializeTagmanager: function () {
        var $selector = this.$selector;
        var delimiters = this.tagsManager.delimiters;
        var tagsContainerID = this._getTagsContainerID();
        var blinkBGColor_1 = this._getBlinkBGColor_1();
        var blinkBGColor_2 = this._getBlinkBGColor_2();

        var tagApi = $($selector).tagsManager({
            delimiters: delimiters,
            tagsContainer: tagsContainerID,
            blinkBGColor_1: blinkBGColor_1,
            blinkBGColor_2: blinkBGColor_2,
            replace: true,
            backspace: [8],
            onlyTagList: true
        });

        $($selector).on('typeahead:selected', function (e, d) {
            tagApi.tagsManager("pushTag", d.displayKey);
        });
    },

    init: function () {
        this.initializeBloodhound();
        this.initializeTypeahead();

        if(autocomplete.tagsManager.initialize){
            this.initializeTagmanager();
        }
    }

}

$(document).ready(function () {
    gjoSe.autocomplete.init()
});