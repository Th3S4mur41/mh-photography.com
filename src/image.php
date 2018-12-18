<?php
// $config = json_decode(include 'config.php');
$image_cache = "assets/cache/";
$supported_ext = array("jpg", "jpeg", "png", "webp");

function error($error_code) {
	http_response_code($error_code);
	exit(0);
}

function create_image_from_file($file, $src_properties) {
	$image_type = $src_properties[2];

	if( $image_type == IMAGETYPE_JPEG ) {
		$src_image = imagecreatefromjpeg($file);
	}
	elseif( $image_type == IMAGETYPE_PNG ) {
		$src_image = imagecreatefrompng($file);
	}
	elseif( $image_type == IMAGETYPE_WEBP ) {
		$src_image = imagecreatefromwebp($file);
	}

	return $src_image;
}

function checkSourceImage () {
	if (strlen(urldecode($_GET['path'])) <= 0) {
		error(400);
	} else {
		$path = urldecode($_GET['path']);
		if (!file_exists($path)) {
			error(404);
		}
		// Check if image is in project path
		if (!substr(realpath($path), 0, strlen(realpath(""))) === realpath("")) {
			error(401);
		}
		// Check if extension is supported
		$extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
		if (!in_array($extension, $GLOBALS['supported_ext'])) {
			error(401);
		}
	}
	$properties = getimagesize($path);
	$modified = filemtime ($path);

	return [
		"path" => $path,
		"format" => $extension,
		"properties" => $properties,
		"width" => $properties[0],
		"height" => $properties[1],
		"ratio" => $properties[0] / $properties[1],
		"modified" => $modified,
	];
}

function checkDestinationImage ($src) {
	$exists = false;
	$filename = str_replace("/", "-", $src["path"]);
	$filename = str_replace(".", "_", $filename);

	switch(strtolower(urldecode($_GET['format']))) {
		case 'webp';
			$format = "webp";
			break;
		case 'heif';
		case 'jpg';
		case 'jpeg';
		default;
			$format = "jpg";
			break;
	}

	$width = intval(urldecode($_GET["width"]));
	$height = intval(urldecode($_GET["height"]));

	// Verify maximal and minimal sizes
	if ($width > $src["width"]) {
		$width = $src["width"];
	}
	if ($height > $src["height"]) {
		$height = $src["height"];
	}
	if ($width === 0 && $height === 0) {
		$width = $src["width"];
		$height = $src["height"];
	} else if ($width === 0 || $height > 0) {
		$width = $height;
	} else if ($height === 0 || $width > 0) {
		$height = $width;
	}
	// Adapt target sizes to ratio
	if ($src["ratio"] < 1) {
		$width = $height * $src["ratio"];
	} else {
		$height = $width / $src["ratio"];
	}

	$path = $GLOBALS["image_cache"] . $filename . "_" . intval($width) . "x" . intval($height) . "." . $format;
	// check if cache directory exists
	if (!is_dir($GLOBALS["image_cache"])) {
		mkdir($GLOBALS["image_cache"]);
	}
	if (file_exists($path)) {
		// disable for debug
		$exists = true;
	}

	return [
		"path" => $path,
		"filename" => $filename,
		"format" => $format,
		"width" => $width,
		"height" => $height,
		"quality" => 80,
		"exists" => $exists,
	];
}

function createPicture($src, $dest) {
	$src_image =  create_image_from_file($src["path"], $src["properties"]);

	$image = imagecreatetruecolor($dest["width"], $dest["height"]);
	imagecopyresampled($image, $src_image, 0, 0, 0, 0, $dest["width"], $dest["height"], $src["width"], $src["height"]);

	$dest = saveImageToCache($image, $dest);
	// cleanup
	imageDestroy($src_image);
	imageDestroy($image);

	return $dest;
}

function saveImageToCache($image, $dest) {
	// save image to file system (cache)
	try {
		switch ($dest['format']) {
			case 'webp';
				if (!imagewebp($image, $dest["path"], $dest["quality"])) {
					error(500);
				}
				break;
			case 'heif';
			case 'jpg';
			default;
				if (!imagejpeg($image, $dest["path"], $dest["quality"])) {
					error(500);
				}
				break;
		}
		$dest['exists'] = true;
	} catch (Exception $e) {
		// in case of error fallback to default jpg format
		if (!imagejpeg($image, $dest["path"], $dest["quality"])) {
			error(500);
		}
		$dest["format"] = "jpg";
		$dest['exists'] = true;
	}

	return $dest;
}

function getPicture($dest) {
	// send the right headers
	// TODO: need to replace jpg through jpeg for correct mime type
	header("Content-Type: image/" . $dest["format"]);
	header("Content-Length: " . filesize($dest["path"]));
	header_remove("X-Powered-By"); // for security reason
	$fp = fopen($dest["path"], 'rb');
	// dump the picture and stop the script
	fpassthru($fp);
	exit;
}

	$src = checkSourceImage();
	$dest = checkDestinationImage($src);
	if (!$dest['exists']) {
		$dest = createPicture($src, $dest);
	}
	// return image from cache
	getPicture($dest);
	exit;
?>
