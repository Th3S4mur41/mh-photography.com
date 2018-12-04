<?php
header('Content-Type: application/json');

$config = new stdClass();
// TODO: Change from portfolio to gallery
$gallery_path	= "assets/images/portfolio/";
$gallery_cache = "assets/cache/";

/**
 * @return an array of supported image formats
 */
function getSupportedImageFormats () {
	global $gallery_cache;
	$formats = array();
	// Create a blank image
	$image = imagecreatetruecolor(1, 1);

	try {
		if (imagejpeg($image, $gallery_cache . 'test_image.jpg')) {
			array_push($formats, "jpeg");
		}
	} catch (Exception $e) {
		// ignore
	}
	try {
		if (imagewebp($image, $gallery_cache . 'test_image.webp')) {
			array_push($formats, "webp");
		}
	} catch (Exception $e) {
		// ignore
	}

  // Free up memory
  imagedestroy($image);

  return $formats;
}

/**
 * @param {string} - path to the image gallery
 * @return {array)} - Array of the images
 */
function getImageGallery ($path) {
	$dir  = "./" . $path;
	$list = array(); //main array

	if(is_dir($dir)){
    if($dh = opendir($dir)){
        while($file = readdir($dh)){

            if(is_dir($path . $file)) {
                // do nothing
            } else if ($file == "." || $file == "..") {
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
		return $list;
	}
}

@$config->gallery_path = $gallery_path;
@$config->gallery_cache = $gallery_cache;
@$config->image_formats = getSupportedImageFormats();
@$config->image_gallery = getImageGallery($gallery_path);

echo json_encode($config, JSON_UNESCAPED_SLASHES);
exit;
?>
