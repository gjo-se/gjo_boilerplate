<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetLowestPriceViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    const PRICE_STATUS_ACTIVE = 1;

    public function initializeArguments()
    {
        $this->registerArgument(
            'productSetVariantGroups',
            'TYPO3\CMS\Extbase\Persistence\ObjectStorage',
            'productSetVariantGroups',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['productSetVariantGroups'])) {
            throw new Exception('Attribute "productSetVariantGroups" missing for GetLowestPriceViewHelper');
        }

        $productSetVariantGroups = $this->arguments['productSetVariantGroups'];
        $prices                  = array();
        $lowestPrice             = null;

        foreach ($productSetVariantGroups as $productSetVariantGroup) {

            $productSetVariants = $productSetVariantGroup->getProductSetVariants();
            if ($productSetVariants) {

                foreach ($productSetVariants as $key => $productSetVariant) {
                    array_push($prices, $productSetVariant->getPrice());
                }

                if ($prices) {
                    $lowestPrice = min($prices);
                }
            }
        }

        return $lowestPrice;
    }
}