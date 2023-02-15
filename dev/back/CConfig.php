<?php

namespace CConfig;

class CConfig
{
    static protected array $msConfig = [
        'driver' => 'mysql',
        'host' => '127.0.0.1',
        'port' => '3306',
        'dbname' => '',//development|production
        'charset' => 'utf8mb4',
        'username' => 'root',
        'password' => '',
        'project' => 'daily',
        'env' => false,
    ];

    public function driver(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    public function host(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    public function port(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    public function dbname(): string
    {
        return $this->env() ? $this->production() : $this->development();
    }

    public function charset(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    public function username(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    public function password(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    public function project(): string
    {
        return $this->retrieve(__FUNCTION__);
    }

    protected function retrieve($field): string
    {
        return static::$msConfig[$field];
    }

    protected function production(): string
    {
        return __FUNCTION__;
    }

    protected function development(): string
    {
        return __FUNCTION__;
    }

    protected function env()
    {
        return static::$msConfig[__FUNCTION__];
    }
}