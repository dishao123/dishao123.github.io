将别人的一言语句采集下来，然后就拥有了一个自己的一言 API 接口了

采集代码
```php
<?php
$api[] = 'http://api.moleft.cn/yiyan/api.php';
$api[] = 'https://api.moleft.cn/yiyan/api.php';
$contents = file_get_contents($api[mt_rand(0,count($api)-1)]);
if(!empty($contents) && !preg_match('/'.$contents.'/',file_get_contents('./hitokoto.txt'))){
    file_put_contents('./hitokoto.txt',$contents."\n",FILE_APPEND);
    echo 'Success -> '.$contents;
}else{
    echo 'Failed -> 获取数据失败';   
}
?>
```

如需新增接口，按照如下格式，添加代码即可
```php
$api[] = '要采集的 API 地址';
```

代码内有重复判断，不用担心有重复内容，随机采集 API 接口，避免触发风控

最后挂个计划任务，慢慢采集就好了