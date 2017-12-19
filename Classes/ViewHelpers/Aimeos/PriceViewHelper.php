<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\Aimeos;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class PriceViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    const PRICE_STATUS_ACTIVE = 1;

    public function initializeArguments()
    {
        $this->registerArgument('productItem', 'Aimeos\MShop\Product\Item\Standard', 'Aimeos ProductItem', true);
    }

    public function render()
    {
        $iface = '\Aimeos\MW\View\Iface';
        $view  = $this->templateVariableContainer->get('_aimeos_view');

        if (!is_object($view) || !($view instanceof $iface)) {
            throw new Exception('Aimeos view object is missing');
        }

        if (!isset($this->arguments['productItem'])) {
            throw new Exception('Attribute "productItem" missing for Aimeos Price view helper');
        }

        $productItem = $this->arguments['productItem'];

        $priceArr = $productItem->getRefItems('price', null, 'default');
        $price    = 0;
        if (count($priceArr)) {
            $priceObj = array_shift(array_values($priceArr));
            if ($priceObj) {
                if ($priceObj->getStatus()) {
                    $price = $priceObj->getValue();
                }
            }
        }

        return $price;
    }
}