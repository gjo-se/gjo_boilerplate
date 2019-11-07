<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @package   TYPO3
 */

//TODO: hier ist eine Abhängigkeit zur gjo_tiger?!
namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetDisplayPriceViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    const PRICE_STATUS_ACTIVE = 1;

    public function initializeArguments()
    {
        $this->registerArgument(
            'productSetVariant',
            'GjoSe\GjoTiger\Domain\Model\ProductSetVariant',
            'productSetVariant',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['productSetVariant'])) {
            throw new Exception('Attribute "productSetVariant" missing for GetDisplayPriceViewHelper');
        }

        $productSetVariant = $this->arguments['productSetVariant'];

        // TODO: MWST Berechnung nach Kundengruppe steuern!
        $price = $productSetVariant->getPrice() + ($productSetVariant->getPrice() * $productSetVariant->getTax() / 100);

        return $price;
    }
}