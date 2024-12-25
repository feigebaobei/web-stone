# 环境变量

<!-- prettier-ignore-start -->
|                             |                                     |     |
| --------------------------- | ----------------------------------- | --- |
| %ALLUSERSPROFILE%           | C:\ProgramData                      |     |
| %APPDATA%                   | C:\Users\用户名\AppData\Roaming     |     |
| %COMMONPROGRAMFILE%         | C:\Program Files\Common Files       |     |
| %COMMONPROGRAMFILE(x86)%    | C:\Program Files (x86)\Common Files |     |
| %COMSPEC%                   | C:\Windows\System32\cmd.exe         |     |
| %HOMEEDRIVE%和%SystemDrive% | C:\|                                |
| %HOMEPATH%                  | C:\Users\用户名                     |     |
| %LOCALAPPDATA%              | C:\Users\用户名\AppData\Local       |     |
| %PROGRAMDATA%               | C:\ProgramData                      |     |
| %PROGRAMFILES%              | C:\Program Files                    |     |
| %PROGRAMFILES(X86)%         | C:\Program Files (x86)              |     |
| %PUBLIC%                    | C:\UsersPublic                      |     |
| %SystemRoot%                | C:\Windows                          |     |
| %TEMP%和%TMP%               | C:\Users\用户名\AppData\LocalTemp   |     |
| %USERPROFILE%               | C:\Users\用户名                     |     |
| %WINDIR%                    | C:\Windows                          |     |
<!-- prettier-ignore-end -->

# 链接

<!-- prettier-ignore-start -->
| 名称               | 英文名称       | 存在方式  | 适用范围                                    |     |
| ------------------ | -------------- | --------- | ------------------------------------------- | --- |
| 硬链接             | hard link      | -         | 只适用于文件。只能使用绝对路径。            |     |
| 符号链接           | symbolic link  | .SYMLINK  | 文件、目录。文件大小为 0 字节，不占用空间。 |     |
| 软链接（目录链接） | junction point | -         | 只适用于目录。只能使用绝对路径。            |     |
| 快捷方式           | shortcut       | .lnk 文件 | 文件、目录。只能和绝对路径                  |     |
<!-- prettier-ignore-end -->

```shell
mklink [[/D]|[/H]|[/J]] Link Target
# /D 创建目录的符号链接
# /H 创建硬链接
# /J 创建目录的软链接
# Link   链接名称
# Target 源目录（相对或绝对）
```
