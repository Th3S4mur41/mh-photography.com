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

	if (function_exists('imagejpeg') && is_callable('imagejpeg')) {
		array_push($formats, "jpeg");
	}
	if (function_exists('imagewebp') && is_callable('imagewebp')) {
		array_push($formats, "webp");
	}

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
