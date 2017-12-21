<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\Aimeos;

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class DeliveryTextViewHelper extends AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument('serviceItem', 'Aimeos\MShop\Service\Item\Standard', 'Aimeos ServiceItem', true);
    }

    public function render()
    {
        $iface = '\Aimeos\MW\View\Iface';
        $view  = $this->templateVariableContainer->get('_aimeos_view');

        if (!is_object($view) || !($view instanceof $iface)) {
            throw new Exception('Aimeos view object is missing');
        }

        if (!isset($this->arguments['serviceItem'])) {
            throw new Exception('Attribute "serviceItem" missing for Aimeos DeliveryText view helper');
        }

        $serviceItem = $this->arguments['serviceItem'];
        $serviceArr = $serviceItem->getRefItems('text', 'short', 'default');

        $text    = 0;
        if (count($serviceArr)) {

            foreach ($serviceArr as $serviceObj) {
//                TODO: Internationalisierung - wo kommt der Code aus der View?!
                if($serviceObj->getLanguageid() == 'de'){
                    $text = $serviceObj->getLabel();
                }
            }

        }

        return $text;
    }
}