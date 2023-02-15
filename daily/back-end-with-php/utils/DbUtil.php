<?php

namespace daily\utils\DbUtil;

use \PDO;
use \Exception;
use daily\utils\ResponseUtil\ResponseUtil;

class DbUtil
{
    use ResponseUtil;

    private PDO $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO(
                'mysql:127.0.0.1;port=3306;dbname=db1;charset=utf8',//dsn
                'root',//username
                ''//password
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $_) {
        	echo $_;die;
            $this->responseError('db connect error');
        }
    }

    public function insert($sql, $data): string
    {
        $this->execute($sql, array_values($data));
        return $this->pdo->lastInsertId();
    }

    public function update($sql, $values): void
    {
        $this->execute($sql, $values);
    }

    public function select($sql, $values): array
    {
        return $this->query($sql, $values);
    }

    public function delete($sql, $values): void
    {
        $this->execute($sql, $values);
    }

    private function execute($sql, $values): void
    {
        try {
            $this->pdo->prepare($sql)->execute($values);
        } catch (Exception $_) {
            $this->responseError($_);
//            $this->responseError($sql);
        }
    }

    private function query($sql, $values): array
    {
        $result = [];
        try {
            $sth = $this->pdo->prepare($sql);
            $sth->execute($values);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $_) {
//            $this->responseError($sql);
            $this->responseError($_);
        }
        return $result;
    }
}