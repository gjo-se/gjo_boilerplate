<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\Aimeos;

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class DeliveryViewHelper extends AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument('serviceItem', 'Aimeos\MShop\Service\Item\Standard', 'Aimeos ServiceItem', true);
        $this->registerArgument('property', 'String', 'Property: price | short-text', true);
    }

    public function render()
    {
        $iface = '\Aimeos\MW\View\Iface';
        $view  = $this->templateVariableContainer->get('_aimeos_view');

        if (!is_object($view) || !($view instanceof $iface)) {
            throw new Exception('Aimeos view object is missing');
        }

        if (!isset($this->arguments['serviceItem'])) {
            throw new Exception('Attribute "serviceItem" missing for Aimeos Delivery view helper');
        }

        if (!isset($this->arguments['property'])) {
            throw new Exception('Attribute "property" missing for Aimeos Delivery view helper');
        }

        $serviceItem = $this->arguments['serviceItem'];

        switch ($this->arguments['property']) {
            case 'price':
                $property = $this->getPrice($serviceItem);
                break;
            case 'short-text':
                $property = $this->getShortText($serviceItem);
                break;
            default:
                $property = NULL;
        }


        return $property;
    }

    private function getPrice($serviceItem)
    {
        $priceArr = $serviceItem->getRefItems('price', null, 'default');

        $price    = 0;
        if (count($priceArr)) {

            foreach ($priceArr as $priceObj) {
                // TODO: Internationalisierung - wo kommt der Code aus der View?!
                if($priceObj->getCurrencyid() == 'EUR'){
                    $price = $priceObj->getCosts();
                }
            }

        }

        return $price;
    }

    private function getShortText($serviceItem)
    {
        $serviceArr = $serviceItem->getRefItems('text', 'short', 'default');

        $text    = 0;
        if (count($serviceArr)) {

            foreach ($serviceArr as $serviceObj) {
                // TODO: Internationalisierung - wo kommt der Code aus der View?!
                if($serviceObj->getLanguageid() == 'de'){
                    $text = $serviceObj->getLabel();
                }
            }

        }

        return $text;
    }
}