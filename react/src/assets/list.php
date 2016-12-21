<?php
$directory = (isset($_GET["dir"]) ? $_GET["dir"] : NULL);
$dots = (isset($_GET["pre"]) ? $_GET["pre"] : './');

if($directory != NULL) {
	$ignore = array('.', '..', '.DS_Store');

	function is_valid_file($name) {
		global $ignore;

		foreach($ignore as $i) {
			if($name === $i) {
				return false;
			}
		}

		return true;
	}

	function files_in_directory($path) {
		$dir_path = $path.'/';
		$dir_files = scandir($dir_path);
		$sorted_files = array();

		foreach($dir_files as $df) {
			$df_full = $dir_path.$df;

			if(is_valid_file($df)) {
				if(!is_dir($df_full)) {
					array_push($sorted_files, $df_full);
				} else {
					$sub_files = files_in_directory($df_full);
					$sorted_files = array_merge($sorted_files, $sub_files);
				}
			}
		}

		return $sorted_files;
	}

	$files = files_in_directory($directory);

	foreach($files as $file) {
		echo '"'.$dots.$file.'",<br />';
	}
}
?>