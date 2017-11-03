<?php
/***************************************************************
 *  created: 19.01.17 - 08:08
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

namespace GjoSe\GjoBoilerplate\Domain\Model;

use TYPO3\CMS\Extbase\DomainObject\AbstractEntity;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Class AbstractModel
 * @package GjoSe\GjoBoilerplate\Domain\Model
 */
abstract class AbstractModel extends AbstractEntity
{
    /**
     * @var bool
     */
    protected $hidden = false;

    /**
     * @var bool
     */
    protected $deleted = false;

    /**
     * @var int
     */
    protected $starttime = 0;

    /**
     * @var int
     */
    protected $endtime = 0;

    /**
     * @var int
     */
    protected $tstamp = 0;

    /**
     * @var int
     */
    protected $crdate = 0;

    /**
     * @var \GjoSe\GjoBoilerplate\Domain\Model\BackendUser
     */
    protected $cruserId = null;

    /**
     * @return bool
     */
    public function getHidden()
    {
        return $this->hidden;
    }

    /**
     * @param bool $hidden
     *
     * @return void
     */
    public function setHidden($hidden)
    {
        $this->hidden = $hidden;
    }

    /**
     * @return bool
     */
    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * @param bool $deleted
     *
     * @return void
     */
    public function setDeleted($deleted)
    {
        $this->deleted = $deleted;
    }

    /**
     * @return int
     */
    public function getStarttime()
    {
        return $this->starttime;
    }

    /**
     * @param int $starttime
     *
     * @return void
     */
    public function setStarttime($starttime)
    {
        $this->starttime = $starttime;
    }

    /**
     * @return int
     */
    public function getEndtime()
    {
        return $this->endtime;
    }

    /**
     * @param int $endtime
     *
     * @return void
     */
    public function setEndtime($endtime)
    {
        $this->endtime = $endtime;
    }

    /**
     * @return int
     */
    public function getTstamp()
    {
        return $this->tstamp;
    }

    /**
     * @param int $tstamp
     *
     * @return void
     */
    public function setTstamp($tstamp)
    {
        $this->tstamp = $tstamp;
    }

    /**
     * @return int
     */
    public function getCrdate()
    {
        return $this->crdate;
    }

    /**
     * @param int $crdate
     *
     * @return void
     */
    public function setCrdate($crdate)
    {
        $this->crdate = $crdate;
    }

    /**
     * @return \GjoSe\GjoBoilerplate\Domain\Model\BackendUser
     */
    public function getCruserId()
    {
        return $this->cruserId;
    }

    /**
     * @param \GjoSe\GjoBoilerplate\Domain\Model\BackendUser $cruserId
     *
     * @return void
     */
    public function setCruserId($cruserId)
    {
        $this->cruserId = $cruserId;
    }

    /**
     * @return bool whether this user is activated as far as the start date and time is concerned
     */
    protected function isActivatedViaStartDateAndTime()
    {
        if ($this->getStarttime() === null) {
            return true;
        }
        $now = new \DateTime('now');

        return $this->getStarttime() <= $now;
    }

    /**
     * @return bool whether this user is activated as far as the end date and time is concerned
     */
    protected function isActivatedViaEndDateAndTime()
    {
        if ($this->getEndtime() === null) {
            return true;
        }
        $now = new \DateTime('now');

        return $now <= $this->getEndtime();
    }

}

