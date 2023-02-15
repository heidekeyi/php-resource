<?php

namespace daily\Bootstrap;

use daily\utils\RequestUtil\RequestUtil;
use JetBrains\PhpStorm\Pure;

class Bootstrap
{
    use RequestUtil;

    static public function execute()
    {
        (new Bootstrap())
            ->empty()
            ->uri()
            ->controller()
            ->id()
            ->method()
            ->boostrap();
    }

    private string $controller = '';
    private string $id = '';
    private string $method = '';
    private string $pathInfo;

    #[Pure] public function __construct()
    {
        $this->pathInfo = $this->requestPathInfo();
    }

    public function empty(): static
    {
        if (!$this->pathInfo) {
            $this->responseError('uri is empty');
        }
        return $this;
    }

    public function uri(): static
    {
        $pathInfo = $this->requestPathInfo();
        $res = !!preg_match('/(^[a-z]+(\/[a-z]+){0,2})(\/\d+)?$/', $pathInfo);
        if (!$res) {
            $this->responseError('uri only support lower case string rest api');
        }
        return $this;
    }

    public function controller(): static
    {
        $pathInfo = preg_replace('/\d+$/', '', $this->pathInfo);
        $paths = explode('/', $pathInfo);
        foreach ($paths as $index => $path) {
            $paths[$index] = ucwords($path);
        }
        $prefix = 'daily';
        $controller = 'controller';
        $fileName = join('', $paths) . ucwords($controller);
        $className = [$prefix, $controller, $fileName, $fileName];
        $className = join('\\', $className);
        if (!class_exists($className)) {
            $this->responseError('controller is not exist');
        }
        $this->controller = $className;
        return $this;
    }

    public function id(): static
    {
        $paths = explode('/', $this->pathInfo);
        $id = array_pop($paths);
        if (is_numeric($id)) {
            if (+$id < 1) {
                $this->responseError('min rest id value is 1');
            } else {
                $this->id = $id;
            }
        }
        return $this;
    }

    public function method(): static
    {
        switch ($this->requestMethod()) {
            case 'get':
                $method = 'select';
                break;
            case 'post':
                $method = 'insert';
                if ($this->id !== '') {
                    $this->responseError($method . ': id is unnecessary');
                }
                break;
            case 'put':
                $method = 'update';
                if ($this->id === '') {
                    $this->responseError($method . ': is missing id');
                }
                break;
            case 'delete':
                $method = 'delete';
                if ($this->id === '') {
                    $this->responseError($method . ': is missing id');
                }
                break;
            case 'option':
                $this->responseSuccess('option: is ok', '');
            default:
                $this->responseError('other: ' . $this->requestMethod() . ' is not support');
        }
        $this->method = $method;
        return $this;
    }

    public function boostrap()
    {
        $className = $this->controller;
        $method = $this->method;
        if (method_exists($className, $method)) {
            (new $className())->$method($this->id);
        } else {
            $this->responseError($this->requestMethod() . ' is make no sense');
        }
    }
}

Bootstrap::execute();
