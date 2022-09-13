<?php

$start_time = microtime(true);
$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];
$time = $_GET['time'];
$result = (checkCircle($x, $y, $r) or checkSquare($x, $y, $r) or checkTriangle($x, $y, $r));
$end_time = microtime(true) - $start_time;

$response = array(
    'x' => $x,
    'y' => $y,
    'r' => $r,
    'time' => $time,
    'result' => $result,
    'execution' => $end_time
);

echo json_encode($response);

function checkCircle($x, $y, $r)
{
    return (pow($x, 2) + pow($y, 2) <= pow($r, 2) and ($y >= 0 and $x <= 0));

}

function checkSquare($x, $y, $r)
{
    return (($x <= $r / 2) and ($y <= $r) and ($x >= 0 and $y >= 0));
}

function checkTriangle($x, $y, $r)
{
    return ($y >= -((-$x + $r) / 2)) and ($y >= (-$r / 2) and $y <= 0) and ($x >= 0 and $x <= $r);
}
