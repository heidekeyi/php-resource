<?php

namespace daily\utils\ResponseUtil;

use JetBrains\PhpStorm\NoReturn;

trait ResponseUtil
{
    #[NoReturn] private function response(string $message, bool $status, mixed $data)
    {
        exit(json_encode([
            'message' => $message,
            'status' => $status,
            'data' => $data
        ]));
    }

    #[NoReturn] private function responseSuccess(string $message, mixed $data)
    {
        $this->response($message, true, $data);
    }

    #[NoReturn] private function responseError(string $message)
    {
        $this->response($message, false, '');
    }
}