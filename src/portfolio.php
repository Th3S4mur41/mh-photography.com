<?php
header('Content-Type: application/json');

$path	= "assets/images/portfolio/";
$dir  = "./" . $path;

$list = array(); //main array

if(is_dir($dir)){
    if($dh = opendir($dir)){
        while(($file = readdir($dh)) != false){

            if(is_dir($path . $file)) {
                // do nothing
            } else if ($file == "." or $file == "..") {
            		// do nothing
            } else {
            		$image_path = $path . $file;
                $image_path_parts = pathinfo($file);
								$image_info = getimagesize($dir . $file);

            		//create object with two fields
                $list3 = array(
                'name' => $image_path_parts['filename'],
								'extension' => $image_path_parts['extension'],
								'mime' => $image_info['mime'],
                'file' => $image_path,
								'size' => filesize($path . $file),
								'width' => $image_info[0],
								'height' => $image_info[1]
								);
								array_push($list, $list3);
						}
				}
		}

		$return_array = array('portfolio'=> $list);

		echo json_encode($return_array, JSON_UNESCAPED_SLASHES);
}

?>
