## Mac 下 mysql 启动失败

```bash
# Mac OS X的升级或其他原因可能会导致ＭySQL启动或开机自动运行时
# 启动mysql 失败，“Warning:The /usr/local/mysql/data directory is not owned by the 'mysql' or '_mysql' ”
# 这应该是某种情况下导致/usr/local/mysql/data的宿主发生了改变，

# 只需要运行“sudo chown -R mysql /usr/local/mysql/data”即可
# mac 下面运行 “sudo chown -R  _mysql:wheel  /usr/local/mysql/data”


# -c 显示更改的部分的信息
# -f 忽略错误信息
# -h 修复符号链接
# -R 处理指定目录以及其子目录下的所有文件
# -v 显示详细的处理信息
```
