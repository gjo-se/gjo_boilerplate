<?php
//https://github.com/dmitryd/typo3-realurl/wiki

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array(
    '_DEFAULT'          => array(
        'cache'         => array(
            'disable' => true
        ),
        'init'          => array(),
        'pagePath'      => array(
            'rootpage_id' => 1
        ),
        'preVars'       => array(),
        'fixedPostVars' => array(),
        'postVarSets'   => array(),
        'fileName'      => array()

    ),
    'dev.mediamarkt.at' => array(

        'cache' => array(
            'disable' => true
        ),

        'init' => array(
            'appendMissingSlash'     => 'ifNotFile,redirect[301]', // 301, 302, 303, 307,
            'emptySegmentValue'      => 'empty', // => ist DefaultValue: empty
            'emptyUrlReturnValue'    => '/', // DefaultValue: /
            'postVarSet_failureMode' => '', // DefaultValue: '', Alternativen: redirect_goodUpperDir, ignore
            'reapplyAbsRefPrefix'    => false, // DefaultValue: false, config.absRefPrefix. linking across domains - Use only "/" as prefix
        ),

        'pagePath' => array(
            'rootpage_id' => 1,
            'expireDays'  => 10 // The time the old URL of a page whose pagetitle changed will still be remembered (in days)
        ),

        'preVars'       => array(
            array(
                'GETvar'   => 'no_cache',
                'valueMap' => array(
                    'no_cache' => 1,
                ),
                'noMatch'  => 'bypass', // | null
            ),
            array(
                'GETvar'       => 'L',
                'valueMap'     => array(
                    'de' => '1',
                    'en' => '2'
                ),
                'noMatch'      => 'bypass',
                'valueDefault' => 'de', // Prüfen, ob das mit noMatch einen Sinn ergibt
            ),
        ),

        // The example is designed for the typo3.org Extension Repository
        'fixedPostVars' => array(
            'testPlaceHolder' => array(
                array(
                    'GETvar'   => 'tx_extrepmgm_pi1[mode]',
                    'valueMap' => array(
                        'new'        => 1,
                        'categories' => 2,
                        'popular'    => 3,
                        'reviewed'   => 4,
                        'state'      => 7,
                        'list'       => 5,
                    )
                ),
                array(
                    'cond'     => array(
                        'prevValueInList' => '2'
                    ),
                    'GETvar'   => 'tx_extrepmgm_pi1[display_cat]',
                    'valueMap' => array(
                        'docs' => 10,
                    ),
                ),
                array(
                    'GETvar'      => 'tx_extrepmgm_pi1[showUid]',
                    'lookUpTable' => array(
                        'table'          => 'tx_extrep_keytable',
                        'id_field'       => 'uid',
                        'alias_field'    => 'extension_key',
                        'addWhereClause' => ' AND NOT deleted'
                    )
                ),
                array(
                    'GETvar' => 'tx_extrepmgm_pi1[cmd]',
                )
            ),
            '1383'            => 'testPlaceHolder',
        ),

        'postVarSets' => array(
            '_DEFAULT' => array(
                'plaintext' => array(
                    'type'      => 'single',    // Special feature of postVars
                    'keyValues' => array(
                        'type' => 99
                    )
                ),
                'ext'       => array(
                    array(
                        'GETvar' => 'tx_myExt[p1]',
                    ),
                    array(
                        'GETvar' => 'tx_myExt[p2]',
                    ),
                    array(
                        'GETvar' => 'tx_myExt[p3]',
                    ),
                ),
                'tt_news'   => array(
                    array(
                        'GETvar'   => 'tx_mininews[mode]',
                        'valueMap' => array(
                            'list'    => 1,
                            'details' => 2,
                        )
                    ),
                    array(
                        'GETvar' => 'tx_mininews[showUid]',
                    ),
                ),
                'news'      => array(
                    0 => array(
                        'GETvar'      => 'tx_news_pi1[news]',
                        'lookUpTable' => array(
                            'table'               => 'tx_news_domain_model_news',
                            'id_field'            => 'uid',
                            'alias_field'         => 'title',
                            'useUniqueCache'      => 1,
                            'useUniqueCache_conf' => array(
                                'strtolower'     => 1,
                                'spaceCharacter' => '-',
                            ),
                        ),
                    ),
                ),
            ),
        ),

        'fileName' => array(
            'index' => array(
                'print.html' => array(
                    'keyValues' => array(
                        'type' => 98,
                    )
                ),
                'index.html' => array(
                    'keyValues' => array()
                ),
            ),
        ),
    ),
    // Multidomain: (GeneralUtility::getIndpEnv('TYPO3_HOST_ONLY'))
    'www.typo3.org'     => array(
        'pagePath' => array(
            'rootpage_id' => 111
        ),
        //...
    ),
    'www.typo3.com'     => 'www.typo3.org',
    'typo3.com'         => 'www.typo3.org',
    '192.168.1.123'     => '_DEFAULT',
    'localhost'         => '_DEFAULT',
);

// Begin: RealURL Cache
// $TYPO3_CONF_VARS[‚SC_OPTIONS‘][‚t3lib/class.t3lib_tcemain.php‘][‚clearAllCache_additionalTables‘][‚tx_realurl_urldecodecache‘] = ‚tx_realurl_urldecodecache‘;
// $TYPO3_CONF_VARS[‚SC_OPTIONS‘][‚t3lib/class.t3lib_tcemain.php‘][‚clearAllCache_additionalTables‘][‚tx_realurl_urlencodecache‘] = ‚tx_realurl_urlencodecache‘;
// $TYPO3_CONF_VARS[‚SC_OPTIONS‘][‚t3lib/class.t3lib_tcemain.php‘][‚clearAllCache_additionalTables‘][‚tx_realurl_pathcache‘] = ‚tx_realurl_pathcache‘;
// End: RealURL Cache

$TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT'] = array(

    'init' => array(
        'useCHashCache'             => '1',
        'enableCHashCache'          => 1,
        'respectSimulateStaticURLs' => 'TRUE',
        'appendMissingSlash'        => 'ifNotFile',
        'enableUrlDecodeCache'      => '1',
        'enableUrlEncodeCache'      => '1',
    ),

    'preVars' => array(
        array(
            'GETvar'   => 'no_cache',
            'valueMap' => array(
                'no_cache' => 1,
                'nc'       => 1,
            ),
            'noMatch'  => 'bypass',
        ),
        array(
            'GETvar'   => 'L',
            'valueMap' => array(
                'de' => '0',
                'en' => '1',
            ),
            'noMatch'  => 'bypass',
        ),
    ),

    'pagePath' => array(
        'type'              => 'user',
        'userFunc'          => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
        'spaceCharacter'    => '-',
        'segTitleFieldList' => 'alias,tx_realurl_pathsegment,nav_title,title',
        'languageGetVar'    => 'L',
        'expireDays'        => 1,
        'disablePathCache'  => 1,
        'rootpage_id'       => 1,
    ),

    'fileName' => array(
        'index' => array(
            'rss.xml'    => array(
                'keyValues' => array(
                    'type' => 100,
                ),
            ),
            'rss091.xml' => array(
                'keyValues' => array(
                    'type' => 101,
                ),
            ),
            'rdf.xml'    => array(
                'keyValues' => array(
                    'type' => 102,
                ),
            ),
            'atom.xml'   => array(
                'keyValues' => array(
                    'type' => 103,
                ),
            ),
        ),
    ),

    'postVarSets' => array(
        '_DEFAULT' => array(

            'browse' => array(
                array('GETvar' => 'tx_ttnews[pointer]', 'valueMap' => array('weiter' => '1', 'weiter' => '2',)),
            ),

            // news kategorien

            'kategorie' => array(
                array('GETvar'      => 'tx_ttnews[cat]',
                      'lookUpTable' => array('table'               => 'tt_news_cat',
                                             'id_field'            => 'uid',
                                             'alias_field'         => 'title',
                                             'addWhereClause'      => ' AND NOT deleted',
                                             'useUniqueCache'      => 1,
                                             'useUniqueCache_conf' => array('strtolower' => 1, 'spaceCharacter' => '-',),
                      ),
                ),
            ),

            // news artikel

            'datum' => array(
                array('GETvar' => 'tx_ttnews[year]',),

                array('GETvar' => 'tx_ttnews[month]',),
                array('GETvar' => 'tx_ttnews[day]',),
                array('GETvar'      => 'tx_ttnews[tt_news]',
                      'lookUpTable' => array('table'               => 'tt_news',
                                             'id_field'            => 'uid',
                                             'alias_field'         => 'title',
                                             'addWhereClause'      => ' AND NOT deleted',
                                             'useUniqueCache'      => 1,
                                             'useUniqueCache_conf' => array('strtolower' => 1, 'spaceCharacter' => '-',),
                      ),
                ),
            ),

        ),
    ),
);