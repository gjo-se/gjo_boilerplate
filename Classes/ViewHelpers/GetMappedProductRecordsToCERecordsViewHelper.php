<?php

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetMappedProductRecordsToCERecordsViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'productSet',
            'GjoSe\GjoTiger\Domain\Model\ProductSet',
            'ProductSet',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['productSet'])) {
            throw new Exception('Attribute "productSet" missing for GetMappedProductRecordsToCERecordsViewHelper');
        }

        $productSet = $this->arguments['productSet'];
        $productSetVariantGroups = $productSet->getProductSetVariantGroups();

        $mappedRecords = array();

        if($productSetVariantGroups){
            foreach ($productSetVariantGroups as $productSetVariantGroup) {
                $products = $productSetVariantGroup->getProducts();

                if($products){

                    foreach ($products as $key => $record) {

                        $subheader = '';
                        if($record->getArticleNumber() && $record->getAdditionalInformation()){
                            $subheader = $record->getArticleNumber() . ', ' . $record->getAdditionalInformation();
                        }
                        if($record->getArticleNumber() && !$record->getAdditionalInformation()){
                            $subheader = $record->getArticleNumber();
                        }
                        if(!$record->getArticleNumber() && $record->getAdditionalInformation()){
                            $subheader = $record->getAdditionalInformation();
                        }

                        $currentImage = $record->getImage()->current();
                        $bodytext = '';
                        if($currentImage){
                            $bodytext = $currentImage->getOriginalResource()->getDescription();
                        }

                        $mappedRecords[$key]['data']['header'] = $record->getName();
                        $mappedRecords[$key]['data']['sub_header'] = $subheader;
                        $mappedRecords[$key]['data']['bodytext'] = $bodytext;
                        $mappedRecords[$key]['images'] = $record->getImage();

                    }
                }
            }
        }

        return $mappedRecords;
    }
}