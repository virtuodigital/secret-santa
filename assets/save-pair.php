<?php
/* /////////////////////////////////////////////////////////////   

Copyright (C) 2016 Diego Guzman (diego@virtuodigital.com)

The code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.   

/////////////////////////////////////////////////////////////*/



// get data from pairs.json
$json = file_get_contents('pairs.json');
$pairs = json_decode($json, true);

// the file is empty create an array
if (empty($pairs)){
	$pairs = array();
}

// assign the names accordingly
$giver = $_POST['giver'];
$receiver = $_POST['receiver'];

// push to array
$new_item = array(
	'giver' => $giver,
	'receiver' => $receiver
	);
array_push($pairs, $new_item);

// encode and save
$encoded = json_encode($pairs);
file_put_contents('pairs.json', $encoded);

?>
