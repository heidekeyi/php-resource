<?php

namespace daily\utils\TimeUtil;

use daily\utils\ResponseUtil\ResponseUtil;

class TimeUtil
{
    use ResponseUtil;

    static protected string $pattern = '/^\d{4}(-\d{1,2}){0,2}(\s+\d{1,2}(:\d{1,2}){0,2})?$/';
    private string $field = '';

    public function timestamp($field, string $value): string
    {
        $value = trim($value);
        $date = +$this->range($field, $value)[0];
        $values = explode(' ', $value);
        if (1 === count($values)) {
            return $date;
        }
        $values = explode(':', $values[1]);
        $len = count($values);
        if ($len >= 1) {
            $hour = +$values[0];
            if ($hour >= 24) {
                $this->responseError($field . ': max hour value is 23');
            }
            $date += $hour * 60 * 60;
        }
        if ($len >= 2) {
            $minute = +$values[1];
            if ($minute >= 60) {
                $this->responseError($field . ': max minute value is 59');
            }
            $date += $minute * 60;
        }
        if ($len === 3) {
            $second = +$values[2];
            if ($second >= 60) {
                $this->responseError($field . ': max second value is 59');
            }
            $date += $second;
        }
        return $date . '';
    }

    public function range(string $field, string $value): array
    {
        $value = trim($value);
        $this->field = $field;
        if (!preg_match(static::$pattern, $value)) {
            $this->responseError($this->field . ' = ' . $value . ' is not a time format');
        }
        $values = explode('-', explode(' ', $value)[0]);
        $len = count($values);
        //year
        $year = +$values[0];
        if ($year < 1970) {
            $this->responseError($this->field . ': year < 1970');
        }
        if ($len === 1) {
            $beg = implode('-', [$year . '', '1', '1']);
            $end = implode('-', [($year + 1) . '', '1', '1']);
            return [strtotime($beg), strtotime($end)];
        }
        //month
        $month = +$values[1];
        if ($month < 1) {
            $this->responseError($this->field . ': month < 1');
        }
        if ($month > 12) {
            $this->responseError($this->field . ': month > 12');
        }
        if ($len === 2) {
            $beg = implode('-', [$year, $month, '1']);
            list($year, $month) = $this->nextMonth($year, $month);
            $end = implode('-', [$year, $month, '1']);
            return [strtotime($beg), strtotime($end)];
        }
        //date
        $date = +$values[2];
        if ($date < 1) {
            $this->responseError($this->field . ': date < 1');
        }
        $d31 = [1, 3, 5, 7, 8, 10, 12];
        $d30 = [4, 6, 9, 11];
        if (in_array($month, $d31)) {
            $beg = implode('-', [$year, $month, $date]);
            list($year, $month, $date) = $this->nextDate($year, $month, $date, 31);
            $end = implode('-', [$year, $month, $date]);
        } else if (in_array($month, $d30)) {
            $beg = implode('-', [$year, $month, $date]);
            list($year, $month, $date) = $this->nextDate($year, $month, $date, 30);
            $end = implode('-', [$year, $month, $date]);
        } else {
            $beg = implode('-', [$year, $month, $date]);
            if ($this->hasDate29($year)) {
                list($year, $month, $date) = $this->nextDate($year, $month, $date, 29);
            } else {
                list($year, $month, $date) = $this->nextDate($year, $month, $date, 28);
            }
            $end = implode('-', [$year, $month, $date]);
        }
        return [strtotime($beg) . '', strtotime($end) . ''];
    }

    private function hasDate29($year): bool
    {
        if ($year % 400 === 0) {
            return true;
        }
        return ($year % 4 === 0) && ($year % 100 !== 0);
    }

    private function nextMonth($year, $month): array
    {
        if ($month === 12) {
            $month = 1;
            $year += 1;
        } else {
            $month += 1;
        }
        return [$year, $month];
    }

    private function nextDate($year, $month, $date, $max): array
    {
        if ($date > $max) {
            $this->responseError($this->field . ': date > ' . $max);
        }
        if ($date === $max) {
            $date = 1;
            list($year, $month) = $this->nextMonth($year, $month);
        } else {
            $date += 1;
        }
        return [$year, $month, $date];
    }
}