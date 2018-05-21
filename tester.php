<?php
session_start();
session_regenerate_id();

if (isset($_GET['username'])) {
  $_SESSION['username'] = $_GET['username'];
}

echo $_SESSION['username'];
