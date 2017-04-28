<?php
/***************************************************************
 *  created: 26.01.17 - 05:33
 *  Copyright notice
 *  (c) 2017 Gregory Jo Erdmann <gregory.jo@gjo-se.com>
 *  All rights reserved
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

namespace Gjo\GjoBoilerplate\Utility;

use \TYPO3\CMS\Core\Utility\File\ExtendedFileUtility;

class FileUtility extends ExtendedFileUtility
{

    const READ_LEN = 4096;

    public function __construct()
    {
        $this->init(array(), $GLOBALS['TYPO3_CONF_VARS']['BE']['fileExtensions']);
        $this->start(array());
    }

    /**
     * This creates a new file. (action=8)
     * $cmds['data'] (string): The new file name
     * $cmds['target'] (string): The path where to create it.
     * + example "2:targetpath/targetfolder/"
     *
     * @param array $cmds Command details as described above
     * @return \TYPO3\CMS\Core\Resource\File Returns the new filename upon success
     */
    public function createFile(array $cmds)
    {
        //** @var \TYPO3\CMS\Core\Resource\File $fileObject */
        $fileObject = parent::func_newfile($cmds);

        return $fileObject;
    }

    /**
     * Renaming files or foldes (action=5)
     *
     * $cmds['data'] (string): The file/folder to copy
     * + example "4:mypath/tomyfolder/myfile.jpg")
     * + for backwards compatibility: the identifier was the path+filename
     * $cmds['target'] (string): New name of the file/folder
     *
     * @param array $cmds Command details as described above
     * @return \TYPO3\CMS\Core\Resource\File Returns the new file upon success
     */
    public function renameFileOrFolder($cmds)
    {
        return parent::func_rename($cmds);
    }

    /**
     * @param string $file1
     * @param string $file2
     *
     * @return bool
     */
    public function checkFilesAreIdentical($file1, $file2) {

        if(filetype($file1) !== filetype($file2)){
            return false;
        }

        if(filesize($file1) !== filesize($file2)){
            return false;
        }

        if(!$content1 = fopen($file1, 'rb')){
            return false;
        }

        if(!$content2 = fopen($file2, 'rb')) {
            fclose($content1);
            return false;
        }

        return true;

    }
}