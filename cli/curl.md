<table cellspacing="0" style="width:511pt;">
    <tbody>
        <tr>
            <td style="vertical-align:middle;width:21pt;"><span style="color:#000000;">1</span></td>
            <td style="vertical-align:middle;width:137pt;"><span style="color:#000000;">CURLE_UNSUPPORTED_PROTOCOL
                    (1)&nbsp;</span></td>
            <td style="vertical-align:middle;width:137pt;"><span style="color:#000000;">错误的协议</span></td>
            <td colspan="4" style="vertical-align:middle;width:216pt;"><span style="color:#000000;">您传送给 libcurl 的网址使用了此
                    libcurl 不支持的协议。 可能是您没有使用的编译时选项造成了这种情况（可能是协议字符串拼写有误，或没有指定协议 libcurl 代码）。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">2</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FAILED_INIT (2)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">初始化代码失败</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">非常早期的初始化代码失败。 可能是内部错误或问题。</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">3</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_URL_MALFORMAT (3)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">URL格式不正确</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">网址格式不正确。</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">4</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;"><span style="color:#000000;">请求协议错误</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">5</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_COULDNT_RESOLVE_PROXY (5)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法解析代理</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法解析代理服务器。
                    指定的代理服务器主机无法解析。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">6</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_COULDNT_RESOLVE_HOST (6)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法解析主机地址</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法解析主机。 指定的远程主机无法解析。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">7</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_COULDNT_CONNECT (7)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法连接到主机</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法通过 connect()
                    连接至主机或代理服务器。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">8</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_WEIRD_SERVER_REPLY
                    (8)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">远程服务器不可用</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在连接到 FTP 服务器后，libcurl 需要收到特定的回复。
                    此错误代码表示收到了不正常或不正确的回复。 指定的远程服务器可能不是正确的 FTP 服务器。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">9</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_REMOTE_ACCESS_DENIED (9)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">访问资源错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">我们无法访问网址中指定的资源。 对于
                    FTP，如果尝试更改为远程目录，就会发生这种情况。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">11</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_WEIRD_PASS_REPLY (11)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">FTP密码错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在将 FTP 密码发送到服务器后，libcurl
                    需要收到正确的回复。 此错误代码表示返回的是意外的代码。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">13</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_WEIRD_PASV_REPLY (13)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">结果错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">libcurl 无法从服务器端收到有用的结果，作为对 PASV
                    或 EPSV 命令的响应。 服务器有问题。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">14</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_WEIRD_227_FORMAT (14)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">FTP回应PASV命令</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">FTP 服务器返回 227 行作为对 PASV 命令的响应。如果
                    libcurl 无法解析此行，就会返回此代码。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">15</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_CANT_GET_HOST (15)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">内部故障</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在查找用于新连接的主机时出现内部错误。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">17</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_COULDNT_SET_TYPE (17)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">设置传输模式为二进制</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在尝试将传输模式设置为二进制或 ascii
                    时发生错误。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">18</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_PARTIAL_FILE (18)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">文件传输短或大于预期</span></td>
            <td colspan="4" style="vertical-align:middle;"><span
                    style="color:#000000;">文件传输尺寸小于或大于预期。当服务器先报告了一个预期的传输尺寸，然后所传送的数据与先前指定尺寸不相符时，就会发生此错误。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">19</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_COULDNT_RETR_FILE
                    (19)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">RETR命令传输完成</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">‘RETR’
                    命令收到了不正常的回复，或完成的传输尺寸为零字节。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">21</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_QUOTE_ERROR (21)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">命令成功完成</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在向远程服务器发送自定义 “QUOTE”
                    命令时，其中一个命令返回的错误代码为 400 或更大的数字（对于 FTP），或以其他方式表明命令无法成功完成。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">22</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_HTTP_RETURNED_ERROR (22)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">返回正常</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">如果 CURLOPT_FAILONERROR 设置为
                    TRUE，且 HTTP 服务器返回 &gt;= 400 的错误代码，就会返回此代码。 （此错误代码以前又称为 CURLE_HTTP_NOT_FOUND。）</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">23</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_WRITE_ERROR (23)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">数据写入失败</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在向本地文件写入所收到的数据时发生错误，或由写入回调
                    (write callback) 向 libcurl 返回了一个错误。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">25</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_UPLOAD_FAILED (25)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法启动上传</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法开始上传。 对于 FTP，服务器通常会拒绝执行 STOR
                    命令。错误缓冲区通常会提供服务器对此问题的说明。 （此错误代码以前又称为 CURLE_FTP_COULDNT_STOR_FILE。）</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">26</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_READ_ERROR (26)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">回调错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">读取本地文件时遇到问题，或由读取回调 (read
                    callback) 返回了一个错误。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">27</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_OUT_OF_MEMORY (27)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">内存分配请求失败</span></td>
            <td colspan="4" style="vertical-align:middle;"><span
                    style="color:#000000;">内存分配请求失败。此错误比较严重，若发生此错误，则表明出现了非常严重的问题。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">28</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_OPERATION_TIMEDOUT (28)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">访问超时</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">操作超时。 已达到根据相应情况指定的超时时间。</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">30</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_PORT_FAILED (30)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">FTP端口错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">FTP PORT 命令返回错误。 在没有为 libcurl
                    指定适当的地址使用时，最有可能发生此问题。 请参阅 CURLOPT_FTPPORT。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">31</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_COULDNT_USE_REST (31)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">FTP错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">FTP REST
                    命令返回错误。如果服务器正常，则应当不会发生这种情况。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">33</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_RANGE_ERROR (33)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">不支持请求</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">服务器不支持或不接受范围请求。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">34</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_HTTP_POST_ERROR (34)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">内部发生错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">此问题比较少见，主要由内部混乱引发。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">35</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_CONNECT_ERROR (35)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">SSL/TLS握手失败</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">同时使用 SSL/TLS
                    时可能会发生此错误。您可以访问错误缓冲区查看相应信息，其中会对此问题进行更详细的介绍。可能是证书（文件格式、路径、许可）、密码及其他因素导致了此问题。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">36</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FTP_BAD_DOWNLOAD_RESUME
                    (36)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">下载无法恢复</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">尝试恢复超过文件大小限制的 FTP 连接。</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">37</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FILE_COULDNT_READ_FILE
                    (37)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">文件权限错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法打开 FILE://
                    路径下的文件。原因很可能是文件路径无法识别现有文件。 建议您检查文件的访问权限。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">38</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_LDAP_CANNOT_BIND (38)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">LDAP可没有约束力</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">LDAP 无法绑定。LDAP 绑定操作失败。</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">39</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_LDAP_SEARCH_FAILED (39)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">LDAP搜索失败</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">LDAP 搜索无法进行。</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">41</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FUNCTION_NOT_FOUND (41)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">函数没有找到</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">找不到函数。 找不到必要的 zlib 函数。</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">42</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_ABORTED_BY_CALLBACK (42)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">中止的回调</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">由回调中止。 回调向 libcurl 返回了
                    “abort”。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">43</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_BAD_FUNCTION_ARGUMENT
                    (43)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">内部错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">内部错误。 使用了不正确的参数调用函数。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">45</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_INTERFACE_FAILED (45)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">接口错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">界面错误。 指定的外部界面无法使用。 请通过
                    CURLOPT_INTERFACE 设置要使用哪个界面来处理外部连接的来源 IP 地址。 （此错误代码以前又称为 CURLE_HTTP_PORT_FAILED。）</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">47</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TOO_MANY_REDIRECTS (47)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">过多的重定向</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">重定向过多。 进行重定向时，libcurl
                    达到了网页点击上限。请使用 CURLOPT_MAXREDIRS 设置上限。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">48</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_UNKNOWN_TELNET_OPTION
                    (48)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法识别选项</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法识别以 CURLOPT_TELNETOPTIONS
                    设置的选项。 请参阅相关文档。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">49</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TELNET_OPTION_SYNTAX (49)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">TELNET格式错误</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">telnet 选项字符串的格式不正确。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">51</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_PEER_FAILED_VERIFICATION
                    (51)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">远程服务器的SSL证书</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">远程服务器的 SSL 证书或 SSH md5
                    指纹不正确。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">52</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_GOT_NOTHING (52)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">服务器无返回内容</span></td>
            <td colspan="4" style="vertical-align:middle;"><span
                    style="color:#000000;">服务器未返回任何数据，在相应情况下，未返回任何数据就属于出现错误。</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">53</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_ENGINE_NOTFOUND (53)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">加密引擎未找到</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">找不到指定的加密引擎。</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">54</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_ENGINE_SETFAILED (54)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">设定默认SSL加密失败</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法将选定的 SSL 加密引擎设为默认选项。</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">55</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SEND_ERROR (55)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法发送网络数据</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">无法发送网络数据。</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">56</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_RECV_ERROR (56)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">衰竭接收网络数据</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">接收网络数据失败。</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">58</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_CERTPROBLEM (58)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">本地证书有问题</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">本地客户端证书有问题</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">59</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_CIPHER (59)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法使用密码</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">无法使用指定的密钥</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">60</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_CACERT (60)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">凭证无法验证</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">无法使用已知的 CA 证书验证对等证书</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">61</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_BAD_CONTENT_ENCODING (61)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法识别的传输编码</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">无法识别传输编码</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">62</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_LDAP_INVALID_URL (62)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无效的LDAP URL</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">LDAP 网址无效</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">63</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_FILESIZE_EXCEEDED (63)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">文件超过最大大小</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">超过了文件大小上限</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">64</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_USE_SSL_FAILED (64)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">FTP失败</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">请求的 FTP SSL 级别失败</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">65</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SEND_FAIL_REWIND (65)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">倒带操作失败</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">进行发送操作时，curl
                    必须回转数据以便重新传输，但回转操作未能成功</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">66</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_ENGINE_INITFAILED
                    (66)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">SSL引擎失败</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">SSL 引擎初始化失败</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">67</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_LOGIN_DENIED (67)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">服务器拒绝登录</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">远程服务器拒绝 curl 登录（7.13.1
                    新增功能）</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">68</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TFTP_NOTFOUND (68)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">未找到文件</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">在 TFTP 服务器上找不到文件</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">69</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TFTP_PERM (69)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无权限</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">在 TFTP 服务器上遇到权限问题</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">70</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_REMOTE_DISK_FULL (70)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">超出服务器磁盘空间</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">服务器磁盘空间不足</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">71</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TFTP_ILLEGAL (71)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">非法TFTP操作</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">TFTP 操作非法</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">72</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TFTP_UNKNOWNID (72)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">未知TFTP传输的ID</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">TFTP 传输 ID 未知</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">73</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_REMOTE_FILE_EXISTS (73)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">文件已经存在</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">文件已存在，无法覆盖</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">74</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_TFTP_NOSUCHUSER (74)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">错误TFTP服务器</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">运行正常的 TFTP 服务器不会返回此错误</span>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">75</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_CONV_FAILED (75)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">字符转换失败</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">字符转换失败</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">76</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_CONV_REQD (76)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">必须记录回调</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">调用方必须注册转换回调</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">77</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_CACERT_BADFILE (77)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CA证书权限</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">读取 SSL CA
                    证书时遇到问题（可能是路径错误或访问权限问题）</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">78</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_REMOTE_FILE_NOT_FOUND
                    (78)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">URL中引用资源不存在</span></td>
            <td colspan="3" style="vertical-align:middle;"><span style="color:#000000;">网址中引用的资源不存在</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">79</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSH (79)&nbsp;</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">错误发生在SSH会话</span></td>
            <td colspan="4" style="vertical-align:middle;"><span style="color:#000000;">SSH 会话中发生无法识别的错误</span></td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">80</span></td>
            <td style="vertical-align:middle;"><span style="color:#000000;">CURLE_SSL_SHUTDOWN_FAILED (80)&nbsp;</span>
            </td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法关闭SSL连接</span></td>
            <td colspan="2" style="vertical-align:middle;"><span style="color:#000000;">无法终止 SSL 连接</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">81</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;"><span style="color:#000000;">服务未准备</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">82</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;"><span style="color:#000000;">无法载入CRL文件</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
        <tr>
            <td style="vertical-align:middle;"><span style="color:#000000;">83</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;"><span style="color:#000000;">发行人检查失败</span></td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
            <td style="vertical-align:middle;">&nbsp;</td>
        </tr>
    </tbody>
</table>
