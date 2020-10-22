<?php
header('content-type:text/html;charset=utf-8;');

$uname = $_POST['username'];//获取前端传递的用户名
$upass = $_POST['password'];//获取前端传递的密码
$conn = mysqli_connect('127.0.0.1','root','root','user');
$sql = "INSERT INTO `info` (`username`,`password`) VALUES ('$uname','$upass')";
$res = mysqli_query($conn,$sql);
mysqli_close($conn);

if($res){
    //注册成功跳转到登录页面
    header('location:../pages/denglu.html');
}else{
    echo "服务器错误";
}
?>