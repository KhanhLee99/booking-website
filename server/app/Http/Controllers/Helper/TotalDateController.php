<?php

namespace App\Http\Controllers\Helper;

use App\Http\Controllers\Controller;
use DateInterval;
use DatePeriod;
use DateTime;

class TotalDateController extends Controller
{
    function number_of_working_days($startDate, $endDate)
    {
        $workingDays = 0;
        $startTimestamp = strtotime($startDate);
        $endTimestamp = strtotime($endDate);
        for ($i = $startTimestamp; $i <= $endTimestamp; $i = $i + (60 * 60 * 24)) {
            if (date("N", $i) <= 5) $workingDays = $workingDays + 1;
        }
        return $workingDays;
    }

    function number_of_weekend_days($startDate, $endDate)
    {
        $weekendDays = 0;
        $startTimestamp = strtotime($startDate);
        $endTimestamp = strtotime($endDate);
        for ($i = $startTimestamp; $i <= $endTimestamp; $i = $i + (60 * 60 * 24)) {
            if (date("N", $i) > 5) $weekendDays = $weekendDays + 1;
        }
        return $weekendDays;
    }

    function nights_of_weekennd_days($startDate, $endDate)
    {
        $begin = new DateTime($startDate);
        $end = new DateTime($endDate);

        $interval = new DateInterval('P1D');
        $daterange = new DatePeriod($begin, $interval, $end);
        $weekends = [];

        foreach ($daterange as $date) {
            if (in_array($date->format('N'), [6, 7])) {
                $weekends[$date->format('W')][] = $date->format('Y-m-d');
            }
        }

        return count($weekends, COUNT_RECURSIVE) - count($weekends);
    }
}
