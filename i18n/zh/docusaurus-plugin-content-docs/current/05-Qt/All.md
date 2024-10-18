---
sidebar_position: 8
---

# 5. Qt 跨平台開發環境

## 5-1 目的 

以 PC/ Ubuntu 22.04 為開發環境, 執行 Qt Crreator 等開發工具, 建立並編譯成為 Aarch64 的應用程式可執行檔, 並傳送到 Renesas RZ/G2L 上執行

由於 PC 效能較佳, 我們在 PC 上進行軟體開發流程會更有效率. 
當軟體開發進行當相當的程度時, 我們可以編譯一個版本, 放到 Renesas RZ/G2L, 
執行驗證. 因此, 可以在 Windows 11 或是 Ubuntu 22.04 上進行開發, 
最後在 Ubuntu 22.04 上編譯產生 RZ/G2L 上的執行軟體, 最後傳送到
 RZ/G2L 上執行.

架構如下圖

![img](/img/Qt563_platform.png)

以下我們將說明在 Ubuntu 22.04 環境下建立 Qt 開發環境, 而 Windows 11 的部份
比較簡單, 請自行下載及安裝 Qt5.6.3 即可.

## 5-2. 環境準備

以下是我們進行的步驟, 

- Ubuntu 22.04 
- Docker  
- 建立一個 Docker Container - Ubuntu 20.04 
- 準備 Yocto 編譯環境
- 下載 Renesas RZ/G2L BSP 

請先參考以下 Renesas 官方文件, 建立 Docker container 以編譯 Yocto project
詳細說明也可以參考本教學網站的 03-Yocto 下的說明文件.

[Linux Start-up Guide](https://www.renesas.cn/cn/zh/document/gde/smarc-evk-rzg2l-rzg2lc-rzg2ul-linux-start-guide-rev103?r=1467981)

請先確定您PC環境可以透過以下命令, 編譯出 image, 寫入 SD Card 並順利開機後, 再開始進行以下步驟

`MACHINE=smarc-rzg2l bitbake core-image-qt`


## 5-3. 準備開發工具庫( ToolChain )

系統中安裝工具庫的目的, 是要讓 Qt 可以在 PC 的環境中, 編譯出 Renesas 平台
的執行檔. 先準備好開發工具庫, 以便在之後的 Qt Creator 中設定工具庫的位置.

請先參考上述 Renesas 文件 Page 39 `Building the SDK` 開始,

於 Docker ubuntu 20.04 container 中編譯, 編譯命令如下, 請注意後面加上 '-c polulate_sdk'

```
`MACHINE=smarc-rzg2l bitbake core-image-qt -c populate_sdk`
```

編譯完成之後, 所產生可供執行安裝 Script 位於

```
`<work_dir>/build/tmp/deploy/sdk/poky-glibc-x86_64-core-image-qt-aarch64-smarc-rzg2l-toolchain-3.1.26.sh`
```

先以滑鼠點擊右鍵後勾選 `Permission/ Allow executing file as program`
可以在本機 (ubuntu 22.04 ) 下執行此安裝檔案 

```
sudo sh ./poky-glibc-x86_64-core-image-weston-sdk-aarch64-toolchain-3.1.26.sh
```

安裝完成之後, 預設所安裝的檔案位於以下目錄

`/opt/poky/3.1.26`

此目錄下工具將應用於之後 Qt Creator 的設定過程. 

## 5-4. 安裝及設定 Qt Creator

請下載安裝 Qt Creator 到 Ubuntu 22.04 下, 以下有兩個版本, 
我們主要使用 5.6.3, 可以建立及編譯與 Renesas RZ/G2L 環境完全相容
的執行檔. 而 5.12.10 則提供了很多範例專案可供參考, 可以選擇性安裝.   

[Qt Creator 5.6.3 下載](https://download.qt.io/new_archive/qt/5.6/5.6.3/)

[Qt Creator 5.12.10 下載](https://download.qt.io/archive/qt/5.12/5.12.10/)

:::tip[Qt 多版本切換]

若是安裝多個 Qt 版本, 需要注意不同版本會將設定寫入同一個目錄, 在執行另一個版本前
需要備份前一次所執行 Qt 版本的設定.

`Linux:  ~/.config/QtProject`

`Windows:  %appdata%/QtProject `

:::

 
每次系統重新開機後執行 Qt Creator 之前, 需要設定環境變數, 請先在 Terminal 中執行以下命令, 
以便在之後的編譯動作中找到跨平台的函式庫

```
unset LD_LIBRARY_PATH
source /opt/poky/3.1.26/environment-setup-aarch64-poky-linux
```

執行 Qtcreator ( Qt5.6.3 ) 
```
cd ~/Qt5.6.3/Tools/QtCreator/bin/
./qtcreator
```

選取功能表 Tools/ External/ Configure 

左側選取 Devices 右側輸入RZ/G2L 的 IP, 此時 RZ/G2L 須處於開機狀態, 點選右側 Test 連線看看是否成功


![img](/img/Qt563_Devices.png)

**設定 Kits**

點選畫面左側的 Build & Run, 上方選取 Kits, 然後點選 Add, 設定 Name 為 "RZ/G2L", 設定 C/C++ Compiler, Debugger, Qt Version 等參數, 可以從右側的 Manager.. 按鍵點進去新增 及設定路徑, 或是從上方的 Tab (Qt Versions/ Compiler/ Debuggers ) 點選分別新增一份 Renesas RX/G2L 所用的設定

![img](/img/Qt563_Kits.png)

各項設定如下

:::tip[Qt Kits 設定]

Device : 
選取前一步驟所設定之 Device

Sysroot : 
/opt/poky/3.1.26/sysroots/aarch64-poky-linux

C Compiler :
/opt/poky/3.1.26/sysroots/x86_64-pokysdk-linux/usr/bin/aarch64-poky-linux/aarch64-poky-linux-gcc

C++ Compiler :
/opt/poky/3.1.26/sysroots/x86_64-pokysdk-linux/usr/bin/aarch64-poky-linux/aarch64-poky-linux-g++

Debugger : 
/opt/poky/3.1.26/sysroots/x86_64-pokysdk-linux/usr/bin/aarch64-poky-linux/aarch64-poky-linux-gdb

Qt Version :
/opt/poky/3.1.26/sysroots/x86_64-pokysdk-linux/usr/bin/qt5/qmake

cmake :
/opt/poky/3.1.26/sysroots/x86_64-pokysdk-linux/usr/bin/cmake
:::

各種設定請參考以下畫面

![img](/img/At563_QtVersions.png)

![img](/img/Qt563_Compiliers.png)

![img](/img/Qt563_Debuggers.png)



上述設定完成後, 必須在 Kits 下確認此編譯設定的圖示旁邊無驚嘆號, 否則需要再檢查一下有無錯誤

## 5-5. 在 Ubuntu 22.04 上建立及編譯 Qt 專案

我們要開始建立專案, 可以從範例練習或是建立空白專案, 

**範例**

Qt Creator 左側點選 Welcome, 選取 Examples
可以開啟範例專案, 開啟現有專案, 或是自行建立空白專案.

**建立空白專案** 

功能表中選取 ```File/ New File or Project/``` 

選取 ```"Application"/ "Qt Quick Control Application"```

輸入專案名稱 例如 ```ex01```

在 "Kit" 選取畫面, 先選取 "Desktop Qt 5.6.3 GCC 64bit"

按左下角 或 F5 或 Ctrl-R 執行

因為目前使用 Desktop 的編譯工具程式庫, 可以在本機執行, 
程式執行後, 會顯示以下畫面

![img](/img/Qt563_ex01.png)

此時執行檔案應該是在

原始專案同一層的另一個目錄下, 名稱為

```/build-ex01-Desktop_Qt_5_6_3_GCC_64bit-Debug ```

其中的 ex01 為執行檔

以上流程, 代表開發環境已經完整建立.
之後可以一直重複上述流程以進行軟體開發的工作. 

建議可以開始修改程式, 例如加入新的 control 元件（ 例如 button), 
熟悉程式的修改及測試. 於網路上搜尋Qt 開發相關知識, 以學習 Qt 程式開發技巧.

可以從以下主題開始學習

- QML

QML (Qt Markup Language) 是基於JavaScript 的程式語言, 用於設計圖形使用者介面為主的應用程式.QML 主要用於行動應用程式，注重觸控輸入和使用者體驗.

- Qt Quick

有別於 Qt Wedget, 
Qt Quick 是 QML 的 Class 和 Functions 的函數庫, 以 QML 語言來開發圖形介面.

- Qt Quick Controls

是 Qt 框架中的介面模組, 提供了一套視覺化的使用者控制元件. 包含了如按鍵, 文字輸入框, 滑桿等等. 


## 5-6. 編譯 RZ/G2L 執行檔

我們程式開發到一定階段之後, 想要編譯為 Renesas RZ/G2L
上的執行檔案, 

首先, 在Qt Creator 畫面左側點選 Projects

![img](/img/Qt563_Projects.png)

左上方選取 Add Kits, RZ/G2L

![img](/img/Q563_Projects_Add.png)

點選左下角編譯, 所產生的執行檔應該會在以下目錄中

build-ex01-RZG2L-Debug/ex01 

![img](/img/Qt563_RZG2L.png)

請將檔案以 scp 命令傳送到 RZ/G2L 中執行

**在 Renesas RZ/G2L 上執行**

以 Yocto 參數 core-image-qt 編譯的 linux image 已經包含 ssh 連線功能. 因為新版的 openssh 的 ssh client 預設會禁用 ssh-rsa 算法 如果 如果 ssh 連線或是 scp 檔案傳輸出現問題, 可以在指令中加上參數, 例如

```
ssh -v -oHostKeyAlgorithms=+ssh-rsa root@192.168.0.216
```

或是編輯 ~/.ssh/config, 加入以下內容

```
Host *
 ServerAliveInterval 10
 HostKeyAlgorithms +ssh-rs
 PubkeyAcceptedKeyTypes +ssh-rsa
```

## 5-7. 咖啡機範例

**下載咖啡機範例**

```
git clone https://github.com/yourskc/moil_coffee.git
```
本範例取自 Qt5.12.10, 經過修改, 可以在 Qt5.6.3 執行



**編譯與執行**

請參考前述流程分別在 Ubuntu 22.04 編譯執行

**在 RX/G2L 執行** 

請參考本章說明, 編譯成 RZ/G2L 可以執行的版本, 傳送到 RZ/G2L 上執行看看

除了用滑鼠操作, 可以接上觸控螢幕操作

影片連結如下

請參考此專案的素材檔案使用, 
