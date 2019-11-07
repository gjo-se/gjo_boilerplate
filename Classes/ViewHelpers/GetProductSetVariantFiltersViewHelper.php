<?php

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetProductSetVariantFiltersViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'productSetVariantGroup',
            'GjoSe\GjoTiger\Domain\Model\ProductSetVariantGroup',
            'ProductSet',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['productSetVariantGroup'])) {
            throw new Exception('Attribute "productSetVariantGroup" missing for GetProductSetVariantFiltersViewHelper');
        }

        $productSetVariantGroup = $this->arguments['productSetVariantGroup'];
        $productSetVariants     = $productSetVariantGroup->getProductSetVariants();
        $variantFilters         = array();

        if ($productSetVariants) {
            foreach ($productSetVariants as $productSetVariant) {

                if ($productSetVariant->getLength()) {
                    $variantFilters['length'][$productSetVariant->getLength()] = $productSetVariant->getLength();
                }
                if ($productSetVariant->getVersion()) {
                    $variantFilters['version'][$productSetVariant->getVersion()] = $productSetVariant->getVersion();
                }
                if ($productSetVariant->getMaterial()) {
                    $variantFilters['material'][$productSetVariant->getMaterial()] = $productSetVariant->getMaterial();
                }
            }
        }

        return $variantFilters;
    }
}