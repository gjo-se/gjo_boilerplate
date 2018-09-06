<?php

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetMappedImageEngineeringDrawingRecordsToCERecordsViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'imageEngineeringDrawings',
            'TYPO3\CMS\Extbase\Persistence\Generic\LazyObjectStorage',
            'ImageEngineeringDrawing',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['imageEngineeringDrawings'])) {
            throw new Exception('Attribute "imageEngineeringDrawings" missing for GetMappedImageEngineeringDrawingRecordsToCERecordsViewHelper');
        }

        $imageEngineeringDrawingRecords = $this->arguments['imageEngineeringDrawings'];
        $mappedRecords = array();

        if($imageEngineeringDrawingRecords){

            foreach ($imageEngineeringDrawingRecords as $key => $record) {

                                $mappedRecords[$key]['data']['isNews'] = true;
                $mappedRecords[$key]['data']['newsId'] = $record->getUid();
                $mappedRecords[$key]['data']['header'] = $record->getOriginalResource()->getTitle();
                $mappedRecords[$key]['data']['bodytext'] = $record->getOriginalResource()->getDescription();
                $mappedRecords[$key]['image'] = $record;

            }
        }

        return $mappedRecords;
    }
}