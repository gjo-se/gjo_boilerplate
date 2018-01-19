<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class FeUserViewHelper extends AbstractViewHelper
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

        $userData = $GLOBALS['TSFE']->fe_user->user;
        $feGroup = $GLOBALS['TSFE']->fe_user->groupData;

        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($userData);
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($feGroup);
//        exit;

        if (null === $userData) {
            return null;
        }

        return $userData[$property];
    }
}