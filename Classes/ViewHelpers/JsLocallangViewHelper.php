<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @package   TYPO3
 */

//Idee von hier: https://www.typo3.net/forum/thematik/zeige/thema/108390/
//nicht fertig gedacht

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;
use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;

class JsLocallangViewHelper extends AbstractViewHelper
{

    /**
     * Renders a script tag with JS locallang
     *
     * @param string $key a single locallang key
     * @param array $keys a list of locallang keys
     * @return string script tag
     */
    public function render($keys) {
        $extensionName = 'gjo_introduction';

        $langKeys = '';
        if($keys && is_array($keys)) {
            foreach($keys as $key) {
                $langKeys .= 'locallang.set(\''.$key.'\',\''.\TYPO3\CMS\Extbase\Uility\LocalizationUtility::translate($key, $extensionName).'\');'."\n";
            }
        }
        return '<script>'."\n".$langKeys.'</script>';
    }
}