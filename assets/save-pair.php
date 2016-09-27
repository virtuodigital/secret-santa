<?php

$json = file_get_contents('pairs.json');
$pairs = json_decode($json, true);

if (empty($pairs)){
	$pairs = array();
}

$giver = $_POST['giver'];
$receiver = $_POST['receiver'];

$new_item = array(
	'giver' => $giver,
	'receiver' => $receiver
	);

array_push($pairs, $new_item);

$encoded = json_encode($pairs);
file_put_contents('pairs.json', $encoded);

?>