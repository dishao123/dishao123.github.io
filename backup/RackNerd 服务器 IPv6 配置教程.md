RackNerd 洛杉矶 (DC 2) 服务器支持免费申请 100 个 IPv6 地址。申请后需要手动配置网络才能正常使用。以下是详细的配置步骤

## 配置教程

### 编辑网络配置文件
1. 使用编辑器例如 `nano` 打开以下文件
```
/etc/sysctl.conf
```

2. 在文件的最后一行添加以下内容
```
net.ipv6.conf.all.autoconf = 0
net.ipv6.conf.all.accept_ra = 0
net.ipv6.conf.eth0.autoconf = 0
net.ipv6.conf.eth0.accept_ra = 0
```

#### 注释禁用 IPv6 的配置（如果存在）
部分操作系统（例如 Debian 12）需要注释掉以下内容
```
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
```

修改为
```
# net.ipv6.conf.all.disable_ipv6 = 1
# net.ipv6.conf.default.disable_ipv6 = 1
# net.ipv6.conf.lo.disable_ipv6 = 1
```

3. 保存文件后执行以下命令以应用配置
```
sysctl -p
```

### 重启网络服务
执行以下命令重启网络
```
systemctl restart networking
```
如果执行后出现报错，请查看[解决方法](#%E6%8A%A5%E9%94%99%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95)

### 重启服务器
如果没有异常，重启服务器
```
reboot
```

### 在控制面板中重置网络
1. 登陆 VM 面板
`Gmeek-html<img src="https://img.xwdev.com/file/racknerd-vm-panel-login.png" alt="racknerd-vm-panel-login.png" width=100% />`

2. 点击重置网络选项
`Gmeek-html<img src="https://img.xwdev.com/file/racknerd-vm-panel-network.png" alt="racknerd-vm-panel-network.png" width=100%>`

3. 点击 `Yes` 按纽，稍等片刻
`Gmeek-html<img src="https://img.xwdev.com/file/racknerd-vm-panel-network-yes.png" alt="racknerd-vm-panel-network-yes.png" width=100% />`

4. 弹出该页面后，点击 `Ok` 按纽即可
`Gmeek-html<img src="https://img.xwdev.com/file/racknerd-vm-panel-network-ok.png" alt="racknerd-vm-panel-network-ok.png" width=100% />`

### 测试 IPv6 是否正常
执行以下命令
```
curl ip.me -6
```
如果返回 IPv6 地址，则配置成功

---

## 报错解决方法
如果在执行 `systemctl restart networking` 后出现以下错误
```
Job for networking.service failed because the control process exited with error code.
See "systemctl status networking.service" and "journalctl -xeu networking.service" for details.
```
请尝试以下步骤解决

### 编辑网关配置文件
1. 使用编辑器例如 `nano` 打开以下文件
```
/etc/network/interfaces
```

2. 找到以下内容并删除
```
up ip -6 route add 2607:0000:0000:0000:0000:0000:0000:0001 dev eth0
```

3. 保存文件并重启服务器
```
reboot
```

### 再次尝试重启网络
执行以下命令重启网络
```
systemctl restart networking
```

### 测试 IPv6
最后测试 IPv6 是否正常
```
curl ip.me -6
```
如果返回 IPv6 地址，则配置成功