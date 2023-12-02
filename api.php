<?php

// API Endpoint
$apiUrl = 'http://aitalk.in:8080/api/real-estate/search';

// Get the query parameter from the URL
$query = isset($_GET['query']) ? $_GET['query'] : '';

// Check if the query parameter is empty
if (empty($query)) {
    die('[{"data":{}}]');
}

// Build the full URL with the query parameter
$fullUrl = $apiUrl . '?query=' . urlencode($query);

// Initialize cURL session
$ch = curl_init($fullUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute cURL session and get the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}

// Close cURL session
curl_close($ch);

// Output the API response
echo $response;
?>
