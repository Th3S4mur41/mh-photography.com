<?php
header('Content-Type: image/jpg');

function create_image_from_file($file, $src_properties) {
	$image_type = $source_properties[2];

	if( $image_type == IMAGETYPE_JPEG ) {
		$src_image = imagecreatefromjpeg($file);
	}
	elseif( $image_type == IMAGETYPE_GIF )  {
		$src_image = imagecreatefromgif($file);
	}
	elseif( $image_type == IMAGETYPE_PNG ) {
		$src_image = imagecreatefrompng($file);
	}
	elseif( $image_tupe == IMAGETYPE_WEBP ) {
		$src_image = imagecreatefromwebp($file);
	}

	return $src_image;
}

function calculate_proportinal_size($w, $h) {
	$DESIRED_WIDTH = 100;
	$proportionalHeight = round(($DESIRED_WIDTH * $imageHeight) / $imageWidth);
}

function resize_image($src_image, $src_properties, $w, $h) {
   $dst_image = imagecreatetruecolor($w, $h);
   imagecopyresampled($dst_image, $src_image, 0, 0, 0, 0, $w, $h, $src_properties[0], $src_properties[1]);
   return $dst;
}

function save_image($dst_image) {
	// save jpg
	imagejpeg($dst_image,"christmas_thump.jpg");
	// save webp
	imagewebp($dst_image, 'php.webp');
}

// get parameters
$path_parts = pathinfo($_SERVER['REQUEST_URI']);
$src_file = $path_parts['filename'], ".jpg";
$dst_width = urldecode($_GET["width"]);
$dst_height = urldecode($_GET["height"]);
$dst_format = $path_parts['extension'];

// get source image
$src_file = "christmas.jpg";
$src_properties = getimagesize($src_file);
$src_image =  create_image_from_file($src_file, $src_properties);

// resize image
$dst_size = { 100, 100 };
calculate_proportinal_size($w, $h);
$dst_file = "christmas_rs.jpg";
$dst_image = resize_image($src_image, $src_properties, $w, $h);

// save image to file system (cache)
// save_image($dst_image)

// cleanup
imageDestroy($src_image);
imageDestroy($dst_image);

return $dst_file;

?>
