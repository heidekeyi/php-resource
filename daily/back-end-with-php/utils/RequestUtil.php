<?php

namespace daily\utils\RequestUtil;

use daily\utils\ResponseUtil\ResponseUtil;

trait RequestUtil
{
    use ResponseUtil;

    private function requestMethod(): string
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    private function requestPathInfo(): string
    {
        return trim($_SERVER['PATH_INFO'] ?? '', '/');
    }

    private function form(): array
    {
        $res = file_get_contents("php://input");
        $res = json_decode($res, true);
        if (!is_array($res)) {
            $this->responseError('form only support array');
        }
        if (empty($res)) {
            $this->responseError('form is empty');
        }
        return $res;
    }
}