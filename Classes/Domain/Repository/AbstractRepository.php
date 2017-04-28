<?php
namespace Gjo\GjoBoilerplate\Domain\Repository;

/***************************************************************
 *  created: 19.01.17 - 10:03
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

use \TYPO3\CMS\Extbase\Persistence\Repository;
use \TYPO3\CMS\Extbase\Object\ObjectManagerInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\QueryInterface;

class AbstractRepository extends Repository
{
    const SEARCH_BY_LIKE = '~';

    const SEARCH_BY_NEGATION = '!';

    /**
     * @var \TYPO3\CMS\Core\Database\DatabaseConnection
     */
    protected $db;

    /**
     * @var \PDO
     */
    protected $pdoDatabaseHandle;

    /**
     * @var \TYPO3\CMS\Extbase\Persistence\QueryInterface
     */
    protected $query;

    /**
     * @var array
     */
    protected $where;

    /**
     * @inject
     * @var \TYPO3\CMS\Extbase\Persistence\Generic\Mapper\DataMapFactory
     */
    protected $dataMapFactory;

    /**
     * @param \TYPO3\CMS\Extbase\Object\ObjectManagerInterface $objectManager
     */
    public function __construct(ObjectManagerInterface $objectManager)
    {
        parent::__construct($objectManager);

        $this->defaultQuerySettings = GeneralUtility::makeInstance(
            'TYPO3\CMS\Extbase\Persistence\Generic\Typo3QuerySettings'
        );
        $this->defaultQuerySettings->setRespectStoragePage(false);

        $this->setDatabaseHandle();
        $this->setPdoDatabaseHandle();
    }

    protected function clearQuery()
    {
        $this->query = $this->createQuery();
        $this->where = array();
    }

    public function initializeObject()
    {
        $this->clearQuery();
    }

    /**
     * @return string
     */
    protected function getExtKey()
    {
        list(, $extensionName) = explode('\\', $this->getRepositoryClassName());
        $extKey = GeneralUtility::camelCaseToLowerCaseUnderscored($extensionName);

        return $extKey;
    }

    /**
     * @return \TYPO3\CMS\Extbase\Persistence\QueryResultInterface
     */
    public function findAll()
    {
        if (!empty($this->where)) {
            $this->query->matching(
                $this->query->logicalAnd(
                    $this->where
                )
            );
        }

        $return = $this->query->execute();

        $this->clearQuery();

        return $return;
    }

    /**
     * @return array
     */
    public function findAllAsArrayByUid()
    {
        $arrByUids = array();

        $result = $this->findAll();
        foreach ($result as $singleResult) {
            $arrByUids[$singleResult->getUid()] = $singleResult;
        }

        return $arrByUids;
    }

    /**
     * @return string
     */
    protected function getTableName()
    {
                // TODO: das ging in 6.2 noch, aber nicht mehr in 7.6
//        $tableName = $this->persistenceManager->getBackend()->getDataMapper()->getDataMap($this->getRepositoryClassName())->getTableName();

        // TODO: so Grundsätzlich schon richtig, aber $this bezieht sich aufs repo, ich brauch aber das Model
//        $dataMap = $this->dataMapFactory->buildDataMap(get_class($this);
//        $tableName = $dataMap->getTableName();

        // TODO: so kann es gehen: => ich muss dann erllerdings noch das Objekt instanziieren
//        protected function getPersistentObject($uid,$object) {
//        if (class_exists($object)) {
//            $repositoryName = str_replace('Model','Repository',$object).'Repository';
//            if (class_exists($repositoryName)) {
//                /* @var $repository \TYPO3\CMS\Extbase\Persistence\Repository */
//                $repository = $this->objectManager->get($repositoryName);
//                return $repository->findByUid($uid);
//            }
//        }
//        return NULL;
//    }

//        return $tableName;
    }

    /**
     * @param bool $clearState
     */
    public function persist($clearState = true)
    {
        $this->persistenceManager->persistAll();

        if ($clearState) {
            $this->persistenceManager->clearState();
        }
    }

    public function setDatabaseHandle()
    {
        $this->db = $GLOBALS['TYPO3_DB'];
    }

    public function setPdoDatabaseHandle()
    {
        $this->pdoDatabaseHandle = new \PDO('mysql:host=' . TYPO3_db_host . ';dbname=' . TYPO3_db, TYPO3_db_username, TYPO3_db_password);
    }

    /**
     * @param int $limit
     *
     * @return object
     */
    public function findLatests($limit = 1)
    {
        $query = $this->createQuery();

        $query->setOrderings(
            array('uid' => QueryInterface::ORDER_DESCENDING)
        );

        $limit = (int)$limit;
        if ($limit > 0) {
            $query->setLimit($limit);
        }

        $result = $query->execute();

        return $result->getFirst();
    }

    /**
     * @param int  $uid
     * @param bool $includeHidden
     *
     * @return object
     */
    public function findByUid($uid, $includeHidden = false)
    {
        $query = $this->createQuery();

        if ($includeHidden) {
            $query->getQuerySettings()->setIgnoreEnableFields(true);
        }

        $query->matching($query->equals('uid', $uid));

        return $query->execute()->getFirst();
    }

    /**
     * @param array $uids
     * @param bool  $includeHidden
     *
     * @return \TYPO3\CMS\Extbase\Persistence\QueryResultInterface
     */
    public function findByUids(array $uids, $includeHidden = false)
    {
        $query = $this->createQuery();

        if ($includeHidden) {
            $query->getQuerySettings()->setIgnoreEnableFields(true);
        }

        $query->matching($query->in('uid', $uids));

        return $query->execute();
    }

    /**
     * @param array  $arguments
     * @param int    $limit
     * @param string $linkage
     *
     * @return \TYPO3\CMS\Extbase\Persistence\QueryResultInterface
     * @internal
     */
    protected function internalMultipleFind($arguments, $limit = -1, $linkage = 'and')
    {
        $query = $this->createQuery();

        $where = array();
        foreach ($arguments as $column => $value) {
            if (!is_array($value)) {

                if (substr($value, 0, 1) == self::SEARCH_BY_LIKE) {
                    $value   = substr($value, 1);
                    $where[] = $query->like($column, $value);
                }
                if (substr($value, 0, 1) == self::SEARCH_BY_NEGATION) {
                    $value   = substr($value, 1);
                    $where[] = $query->logicalNot($query->equals($column, $value ? $value : ''));
                } else {
                    $where[] = $query->equals($column, $value);
                }
            } else {
                if (in_array(null, $value)) {
                    $whereOr   = array();
                    $whereOr[] = $query->equals($column, null);
                    $whereOr[] = $query->in($column, $value);

                    $where[] = $query->logicalOr($whereOr);
                } else {
                    $where[] = $query->in($column, $value);
                }
            }
        }

        switch ($linkage) {
            case 'or':
                $query->matching($query->logicalOr($where));
                break;
            default:
                $query->matching($query->logicalAnd($where));
        }

        $limit = (int)$limit;
        if ($limit > 0) {
            $query->setLimit($limit);
        }

        return $query->execute();
    }

    /**
     * @param array  $arguments
     * @param string $linkage
     *
     * @return object
     */
    public function multipleFindOneBy($arguments, $linkage = 'and')
    {
        return $this->internalMultipleFind($arguments, 1, $linkage)->getFirst();
    }

    /**
     * @param array  $arguments
     * @param string $linkage
     *
     * @return \TYPO3\CMS\Extbase\Persistence\QueryResultInterface
     */
    public function multipleFindAllBy($arguments, $linkage = 'and')
    {
        return $this->internalMultipleFind($arguments, -1, $linkage);
    }

    /**
     * @param array  $arguments
     * @param string $linkage
     *
     * @return int
     */
    public function multipleCountBy($arguments, $linkage = 'and')
    {
        return $this->internalMultipleFind($arguments, -1, $linkage)->count();
    }

    /**
     * @param array  $arguments
     * @param string $fields
     * @param string $linkage
     * @param string $table
     * @param bool   $singleRow
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     * @internal
     */
    protected function internalRawMultipleFindBy($arguments = null, $fields = '*', $table = null, $linkage = 'and', $singleRow = false, $orderBy = '', $limit = '')
    {
        if ($table === null) {
            $table = $this->getTableName();
        }

        $where = array();
        if ($arguments !== null) {
            foreach ($arguments as $column => $value) {
                if (is_numeric($column)) {
                    $where[] = $value;
                } else {
                    if (!is_array($value)) {
                        if (substr($value, 0, 1) == self::SEARCH_BY_LIKE) {
                            $value   = substr($value, 1);
                            $where[] = $column . ' LIKE ' . $this->db->fullQuoteStr($value, $table);
                        } elseif (substr($value, 0, 1) == self::SEARCH_BY_NEGATION) {
                            $value   = substr($value, 1);
                            $where[] = $column . '!=' . $this->db->fullQuoteStr($value, $table);
                        } else {
                            $where[] = $column . '=' . $this->db->fullQuoteStr($value, $table);
                        }
                    } else {
                        $where[] = $column . ' IN (\'' . implode('\',\'', $value) . '\')';
                    }
                }
            }
        }

        if ($singleRow) {
            return $this->db->exec_SELECTgetSingleRow($fields, $table, implode(' ' . $linkage . ' ', $where), '', $orderBy);
        } else {
            return $this->db->exec_SELECTgetRows($fields, $table, implode(' ' . $linkage . ' ', $where), '', $orderBy, $limit);
        }
    }

    /**
     * @param string $key
     * @param string $value
     * @param string $fields
     * @param string $table
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     */
    public function rawFindOneBy($key, $value, $fields = '*', $table = null, $orderBy = '', $limit = '')
    {
        return $this->internalRawMultipleFindBy(array($key => $value), $fields, $table, 'and', true, $orderBy, $limit);
    }

    /**
     * @param string $key
     * @param string $value
     * @param string $fields
     * @param string $table
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     */
    public function rawFindAllBy($key, $value, $fields = '*', $table = null, $orderBy = '', $limit = '')
    {
        return $this->internalRawMultipleFindBy(array($key => $value), $fields, $table, 'and', false, $orderBy, $limit);
    }

    /**
     * @param string $fields
     * @param string $table
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     */
    public function rawFindAll($fields = '*', $table = null, $orderBy = '', $limit = '')
    {
        return $this->internalRawMultipleFindBy($this->where, $fields, $table, 'and', false, $orderBy, $limit);
    }

    /**
     * @param array  $arguments
     * @param string $fields
     * @param string $linkage
     * @param string $table
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     */
    public function rawMultipleFindOneBy(array $arguments, $fields = '*', $table = null, $linkage = 'and', $orderBy = '', $limit = '')
    {
        return $this->internalRawMultipleFindBy($arguments, $fields, $table, $linkage, true, $orderBy, $limit);
    }

    /**
     * @param array  $arguments
     * @param string $fields
     * @param string $table
     * @param string $linkage
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     */
    public function rawMultipleFindAllBy(array $arguments, $fields = '*', $table = null, $linkage = 'and', $orderBy = '', $limit = '')
    {
        return $this->internalRawMultipleFindBy($arguments, $fields, $table, $linkage, false, $orderBy, $limit);
    }

    /**
     * @param array  $arguments
     * @param string $linkage
     * @param string $table
     * @param string $orderBy
     * @param string $limit
     *
     * @return array
     */
    public function rawMultipleCountBy($arguments, $table = null, $linkage = 'and', $orderBy = '', $limit = '')
    {
        $data = $this->internalRawMultipleFindBy($arguments, 'COUNT(*) as count', $table, $linkage, true, $orderBy, $limit);

        return $data['count'];
    }

    /**
     * @param int    $uid
     * @param string $table
     * @param string $mmTable
     * @param string $fields
     * @param bool   $reverse
     *
     * @return array|NULL
     */
    public function rawFindAllByMMRelation($uid, $table = null,  $mmTable, $fields = '*', $reverse = false)
    {
        if (!$reverse) {
            $column         = 'uid_local';
            $oppositeColumn = 'uid_foreign';
        } else {
            $oppositeColumn = 'uid_local';
            $column         = 'uid_foreign';
        }

        if ($table === null) {
            $table = $this->getTableName();
        }

        $result = $this->rawMultipleFindAllBy(
            array(
                $column => $uid
            ),
            $oppositeColumn,
            $mmTable
        );

        if ($result) {
            $where = array();
            foreach ($result as $row) {
                $where[] = 'uid=' . $row[$oppositeColumn];
            }

            $result = $this->db->exec_SELECTgetRows($fields, $table, implode(' OR ', $where));
        }

        return $result;
    }

    /**
     * @param array  $rows
     * @param string $table
     *
     * @internal
     */
    protected function internalRawInsert($rows, $table = null)
    {
        $rows = array_values($rows);

        if ($table === null) {
            $table = $this->getTableName();
        }

        $this->db->exec_INSERTmultipleRows($table, array_keys($rows[0]), $rows);
    }

    /**
     * @param array  $row
     * @param string $table
     *
     * @return int
     */
    public function rawInsert(array $row, $table = null)
    {
        $this->internalRawInsert(array($row), $table);

        return $this->db->sql_insert_id();
    }

    /**
     * @param array  $rows
     * @param string $table
     */
    public function rawMultipleInsert($rows, $table = null)
    {
        $this->internalRawInsert($rows, $table);
    }

    /**
     * @param string $where
     * @param string $table
     *
     * @return bool|\mysqli_result|object MySQLi result object / DBAL object
     */
    public function rawDelete($where, $table = null)
    {
        if ($table === null) {
            $table = $this->getTableName();
        }

        return $this->db->exec_DELETEquery($table, $where);
    }

    /**
     * @param int    $uid
     * @param array  $row
     * @param string $table
     *
     * @return bool|\mysqli_result|object MySQLi result object / DBAL object
     */
    public function rawUpdate($uid, array $row, $table = null)
    {
        if ($table === null) {
            $table = $this->getTableName();
        }

        return $this->db->exec_UPDATEquery($table, 'uid=' . $uid, $row);
    }

    public function createTmpTable($table = null)
    {

        if ($table === null) {
            $table = $this->getTableName();
        }

        $statement = 'CREATE TABLE IF NOT EXISTS ' . $table . '_tmp LIKE ' . $table;

        $this->pdoDatabaseHandle->exec($statement);

    }

    public function deleteTable($table = null)
    {

        if ($table === null) {
            $table = $this->getTableName();
        }

        $statement = 'DROP TABLE ' . $table;

        $this->pdoDatabaseHandle->exec($statement);

    }

    public function renameTmpTableToTable($table = null)
    {

        if ($table === null) {
            $table = $this->getTableName();
        }

        $tmpTable = $table . '_tmp';

        $statement = 'ALTER TABLE ' . $tmpTable;
        $statement .= ' RENAME TO ' . $table;

        $this->pdoDatabaseHandle->exec($statement);

    }
}