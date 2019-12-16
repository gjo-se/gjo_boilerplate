<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @package   TYPO3
 */

//TODO: hier gibt es eine Abhänigkeit zu femanager
// sollte ich die ViewHelper nicht in die entsprechenden EXT verlagern?!
// und jeweils den Pfad für den Namespace erweitern
namespace GjoSe\GjoBoilerplate\ViewHelpers\FeUser;

use GjoSe\GjoBoilerplate\ViewHelpers\FeUser\AbstractFeUserViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class FeUserViewHelper extends AbstractFeUserViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'property',
            'String',
            'property of feUser',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['property'])) {
            throw new Exception('Attribute "property" missing for ' . __CLASS__);
        }

        $property = $this->arguments['property'];
        $GLOBALS["TSFE"]->set_no_cache();
        $userData = $GLOBALS['TSFE']->fe_user->user;

        if (null === $userData) {
            return null;
        }

        return $userData[$property];
    }
}