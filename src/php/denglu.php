<?php
header('content-type:text/html;charset=utf-8;');
$uname = $_GET['username'];//获取前端传递的用户名
$upass = $_GET['password'];//获取前端传递的密码
$expires = $_GET['expires'];//获取前端传递的免登陆时间


$conn = mysqli_connect('localhost','root','root','user');
$sql = "SELECT * FROM `info` WHERE `username`='$uname' AND `password`='$upass'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
mysqli_close($conn);
if($row){
    //如果登陆成功
    if($expires){
        //给浏览器写入cookie,有效期是10天
        setcookie('name',$uname,time()+10*24*60*60);
    }else{
        //给浏览器写入cookie,会话时效
        setcookie('name',$uname);
    }
    
    header('location:../pages/che.html');
}else{
    header('location:../pages/err.html');
}
?>