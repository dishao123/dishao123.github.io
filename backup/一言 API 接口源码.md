搭建一个自己的一言 API 接口，搭配上[语句采集代码](https://blog.xwdev.com/post/14.html)直接起飞

源码如下
```php
<?php
//获取句子文件的绝对路径
$path = dirname(__FILE__);
$file = file($path."/hitokoto.txt");

//随机读取一行
$arr  = mt_rand( 0, count( $file ) - 1 );
$content  = trim($file[$arr]);

//编码判断，用于输出相应的响应头部编码
if (isset($_GET['charset']) && !empty($_GET['charset'])) {
    $charset = $_GET['charset'];
    if (strcasecmp($charset,"gbk") == 0 ) {
        $content = mb_convert_encoding($content,'gbk', 'utf-8');
    }
} else {
    $charset = 'utf-8';
}

//格式化判断，输出js或纯文本
if ($_GET['encode'] === 'js') {
    echo "function api(){document.write('" . $content ."');}";
}else if($_GET['encode'] === 'json'){
    $content = array('text'=>$content);
    echo json_encode($content, JSON_UNESCAPED_UNICODE);
}else {
    echo $content;
}
?>
```