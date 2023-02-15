<?php

namespace CRouter;

use CHeader\CHeader;
use CResult\CResult;
use CValidator\CValidator;

class CRouter
{
    static public function boostrap():void{
        $router = new static();
        echo json_encode($router->route());
    }

    public function route(): array
    {
        CHeader::header();
        $router = new CRouter();
        $router->uri();
        if (!$router->result->getStatus()) {
            return $router->result->serialize();
        }
        if ($router->type === 'options') {
            return $router->result->setMessage('pass')->serialize();
        }
        $router->type();
        if (!$router->result->getStatus()) {
            return $router->result->serialize();
        }
        $router->controller();
        if (!$router->result->getStatus()) {
            return $router->result->serialize();
        }
        $router->method();
        if (!$router->result->getStatus()) {
            return $router->result->serialize();
        }
        $controller = $router->controller;
        $method = $router->method;
        $id = preg_replace('/\D+/', '', $router->uri);
        $router->result = call_user_func([new $controller(), $method], $id);
        return $router->result->serialize();
    }

    private function __construct()
    {
        $this->uri = trim($_SERVER['PATH_INFO'] ?? '', '/');
        $this->type = strtolower($_SERVER['REQUEST_METHOD'] ?? '');
        $this->controller = '';
        $this->method = '';
        $this->result = new CResult('');
        $this->hasId = preg_match('/\d+$/', $this->uri);
    }

    private function uri(): void
    {
        $this->result = (new CValidator(__FUNCTION__, $this->uri))
            ->empty()
            ->regular('/^[a-z]{3,18}(\/[a-z]{3,18}){0,3}(\/[1-9]\d{0,8})*$/')
            ->result();
    }

    private function type(): void
    {
        $type = $this->type;
        $this->result = (new CValidator(__FUNCTION__, $type))->empty()->result();
        if (!$this->result->getStatus()) {
            return;
        }
        $message = __FUNCTION__ . ': ' . $type . ' error';
        if ($type === 'post') {
            if ($this->hasId) {
                $this->result->error($message);
            }
            return;
        }
        if ($type === 'put' || $type === 'delete') {
            if (!$this->hasId) {
                $this->result->error($message);
            }
            return;
        }
        if ($type !== 'get') {
            $this->result->error($message);
        }
    }

    private function controller(): void
    {
        $uri = preg_replace('/(\/\d+)?$/', '', $this->uri);
        $name = ucwords($uri, '/');
        $name = str_replace('/', '', $name);
        $name = 'C' . $name . 'Controller';
        $cls = preg_replace('/\w+$/', $name, $uri);
        $cls = str_replace('/', '\\', $cls);
        $cls = 'controller' . '\\' . $cls . '\\' . $name;
        if (class_exists($cls)) {
            $this->controller = $cls;
        } else {
            $this->result->error(__FUNCTION__ . ' is not exist');
        }
    }

    private function method(): void
    {
        $type = $this->type;
        if ($type == 'get' && !$this->hasId) {
            $type = 'list';
        }
        $map = [
            'get' => 'select',
            'delete' => 'delete',
            'put' => 'update',
            'list' => 'list',
            'post' => 'insert'
        ];
        $method = $map[$type];
        if (method_exists($this->controller, $method)) {
            $this->method = $method;
        } else {
            $this->result->error(__FUNCTION__ . ' is not exist');
        }
    }

    readonly private string $uri;
    readonly private string $type;
    private string $controller;
    private string $method;
    private CResult $result;
    readonly private bool $hasId;
}