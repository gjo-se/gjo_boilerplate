<?php
/***************************************************************
 *  created: 19.01.17 - 08:26
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

namespace Gjo\GjoBoilerplate\Domain\Model;

class BackendUser extends AbstractModel
{

    /**
     * @var string
     * @validate notEmpty
     */
    protected $userName = '';

    /**
     * @var string
     */
    protected $description = '';

    /**
     * @var bool
     */
    protected $isAdministrator = false;

    /**
     * @var string
     */
    protected $email = '';

    /**
     * @var string
     */
    protected $realName = '';

    /**
     * @var \DateTime|NULL
     */
    protected $lastLoginDateAndTime;

    /**
     * @var bool
     */
    protected $ipLockIsDisabled = false;

    /**
     * @var bool
     */
    protected $disabled = false;

    /**
     * @return string the user name, will not be empty
     */
    public function getUserName()
    {
        return $this->userName;
    }

    /**
     * @param string $userName the user name to set, must not be empty
     *
     * @return void
     */
    public function setUserName($userName)
    {
        $this->userName = $userName;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return bool whether this user is an administrator
     */
    public function getIsAdministrator()
    {
        return $this->isAdministrator;
    }

    /**
     * @param bool $isAdministrator whether this user should be an administrator
     *
     * @return void
     */
    public function setIsAdministrator($isAdministrator)
    {
        $this->isAdministrator = $isAdministrator;
    }

    /**
     * @return bool whether this user is disabled
     */
    public function getDisable()
    {
        return $this->disabled;
    }

    /**
     * @param bool $disabled whether this user is disabled
     *
     * @return void
     */
    public function setDisable($disabled)
    {
        $this->disabled = $disabled;
    }

    /**
     * @return string the e-mail address, might be empty
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email the e-mail address, may be empty
     *
     * @return void
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return string the real name. might be empty
     */
    public function getRealName()
    {
        return $this->realName;
    }

    /**
     * @param string $name the user's real name, may be empty.
     */
    public function setRealName($name)
    {
        $this->realName = $name;
    }

    /**
     * @return bool whether this user is currently activated
     */
    public function isActivated()
    {
        return !$this->getDisable() && $this->isActivatedViaStartDateAndTime() && $this->isActivatedViaEndDateAndTime();
    }

    /**
     * @param bool $disableIpLock whether the IP lock for this user is disabled
     *
     * @return void
     */
    public function setIpLockIsDisabled($disableIpLock)
    {
        $this->ipLockIsDisabled = $disableIpLock;
    }

    /**
     * @return bool whether the IP lock for this user is disabled
     */
    public function getIpLockIsDisabled()
    {
        return $this->ipLockIsDisabled;
    }

    /**
     * @return \DateTime|NULL this user's last login date and time, will be NULL if this user has never logged in before
     */
    public function getLastLoginDateAndTime()
    {
        return $this->lastLoginDateAndTime;
    }

    /**
     * @param \DateTime|NULL $dateAndTime this user's last login date and time
     *
     * @return void
     */
    public function setLastLoginDateAndTime(\DateTime $dateAndTime = null)
    {
        $this->lastLoginDateAndTime = $dateAndTime;
    }
}