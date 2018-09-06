<?php

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetMappedProductRecordsToCERecordsViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'products',
            'TYPO3\CMS\Extbase\Persistence\Generic\LazyObjectStorage',
            'ProductSet:Products',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['products'])) {
            throw new Exception('Attribute "products" missing for GetMappedProductRecordsToCERecordsViewHelper');
        }

        $products = $this->arguments['products'];
        $mappedRecords = array();

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

                $mappedRecords[$key]['data']['header'] = $record->getName();
                $mappedRecords[$key]['data']['sub_header'] = $subheader;
                $mappedRecords[$key]['data']['bodytext'] = $record->getImage()->current()->getOriginalResource()->getDescription();
                $mappedRecords[$key]['images'] = $record->getImage();

            }
        }

        return $mappedRecords;
    }
}