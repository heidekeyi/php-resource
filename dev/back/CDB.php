<?php

namespace CDB;

use CResult\CResult;
use \Exception;
use \PDO;
use CConfig\CConfig;

class CDB
{
    private PDO $PDO;

    public function __construct()
    {
        $this->result = new CResult([]);
        try {
            $config = new CConfig();
            $pdo = new PDO(
                $this->dsn($config),
                $config->username(),
                $config->password()
            );
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->PDO = $pdo;
        } catch (Exception) {
            $this->result->error('db connect error');
        }
    }

    private function dsn(CConfig $config): string
    {
        $dsn = [
            $config->driver() . ':' . $config->host(),
            'port=' . $config->port(),
            'dbname=' . $config->dbname(),
            'charset=' . $config->charset()
        ];
        return implode(';', $dsn);
    }

    public function insert(string $sql, array $values): CResult
    {
        if (!$this->result->getStatus()) {
            return $this->result;
        }
        $this->execute($sql, $values);
        if (!$this->result->getStatus()) {
            return $this->result;
        }
        $this->result->setData($this->PDO->lastInsertId());
        return $this->result;
    }

    public function update(string $sql, array $values): CResult
    {
        if (!$this->result->getStatus()) {
            return $this->result;
        }
        $this->execute($sql, $values);
        return $this->result;
    }

    public function delete(string $sql, array $values): CResult
    {
        if (!$this->result->getStatus()) {
            return $this->result;
        }
        $this->execute($sql, $values);
        return $this->result;
    }

    private function execute($sql, $values): void
    {
        if (!$this->result->getStatus()) {
            return;
        }
        try {
            $sth = $this->PDO->prepare($sql);
            $sth->execute($values);
            $this->result->setData($sth->rowCount());
        } catch (Exception) {
            $this->result->error(__FUNCTION__ . '(db): ' . $sql);
        }
    }

    public function select(string $sql, array $values): CResult
    {
        if (!$this->result->getStatus()) {
            return $this->result;
        }
        try {
            $sth = $this->PDO->prepare($sql);
            $sth->execute($values);
            $this->result->setData($sth->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception) {
            $this->result->error(__FUNCTION__ . '(db): ' . $sql);
        }
        return $this->result;
    }

    private CResult $result;
}