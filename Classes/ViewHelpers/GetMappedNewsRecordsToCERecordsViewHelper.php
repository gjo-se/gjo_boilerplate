<?php

namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class GetMappedNewsRecordsToCERecordsViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'newsRecords',
            'TYPO3\CMS\Extbase\Persistence\Generic\QueryResult',
            'News Records',
            true
        );
    }

    public function render()
    {
        if (!isset($this->arguments['newsRecords'])) {
            throw new Exception('Attribute "newsRecords" missing for GetMappedViewRecordsToCERecordsViewHelper');
        }

        $newsRecords = $this->arguments['newsRecords'];
        $mappedNewsrecords = array();

        if($newsRecords){

            foreach ($newsRecords as $key => $newsRecord) {

                $mappedNewsrecords[$key]['data']['isNews'] = true;
                $mappedNewsrecords[$key]['data']['newsId'] = $newsRecord->getUid();
                $mappedNewsrecords[$key]['data']['header'] = $newsRecord->getTitle();
                $mappedNewsrecords[$key]['data']['datetime'] = $newsRecord->getDatetime();
                $mappedNewsrecords[$key]['data']['bodytext'] = $newsRecord->getTeaser();
                $mappedNewsrecords[$key]['data']['button_text'] = 'Zum Artikel';


                //        - button_link // siehe dazu aktuellen Linkaufbau!!
                //        - Detailseite mit UID

                $mappedNewsrecords[$key]['images'] = $newsRecord->getFalMedia();

            }
        }

//        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($mappedNewsrecords, '$mappedNewsrecords');


        return $mappedNewsrecords;
    }
}