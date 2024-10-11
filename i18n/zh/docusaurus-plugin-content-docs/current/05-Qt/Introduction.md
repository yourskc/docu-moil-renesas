---
sidebar_position: 1
---

# 建立 Renesas RZ/G2L 跨平台 Qt 開發環境

## 目的 

以 PC/ Ubuntu 22.04 為開發環境, 執行 Qt Crreator 等開發工具, 建立並編譯成為 Aarch64 的應用程式可執行檔, 並傳送到 Renesas RZ/G2L 上執行

## 環境準備

- 本機 Ubuntu 22.04 
- 安裝 Docker  

請先參考以下 Renesas 官方文件, 建立 Docker container 以編譯 Yocto project

[Linux Start-up Guide](https://www.renesas.cn/cn/zh/document/gde/smarc-evk-rzg2l-rzg2lc-rzg2ul-linux-start-guide-rev103?r=1467981)

確定可以透過以下命令

`MACHINE=smarc-rzg2l bitbake core-image-qt`

編譯出 image, 寫入 SD Card 並順利開機後, 再開始進行以下步驟

## 1. 準備開發工具庫( ToolChain )

請先參考上述 Renesas 文件 Page 39 `Building the SDK` 開始,

於 Docker ubuntu 20.04 container 中編譯, 編譯命令如下, 請注意後面加上 '-c polulate_sdk'

`MACHINE=smarc-rzg2l bitbake core-image-qt -c populate_sdk`

編譯完成之後, 所產生可供執行安裝 Script 位於

`<work_dir>/build/tmp/deploy/sdk/poky-glibc-x86_64-core-image-qt-aarch64-smarc-rzg2l-toolchain-3.1.26.sh`

可以在本機 (ubuntu 22.04 ) 中執行此安裝檔案 ( 先以滑鼠點擊右鍵後勾選 `Permission/ Allow executing file as program` 再執行 ）

sudo sh ./poky-glibc-x86_64-core-image-weston-sdk-aarch64-toolchain-3.1.26.sh

The default installed folder would be 

`/opt/poky/3.1.26`


## 2. 安裝, 執行及設定 Qt Creator

請下載安裝 Qt Creator 到 Ubuntu 22.04 下, 以下有兩個版本, 
我們主要使用 5.6.3, 可以建立及編譯與 Target board 環境完全相容
的執行檔, 而 5.12.10 則提供很多範例專案可供參考, 可以選擇性安裝.   

[Qt Creator 5.6.3 下載位址](https://download.qt.io/new_archive/qt/5.6/5.6.3/)

[Qt Creator 5.12.10 下載](https://download.qt.io/archive/qt/5.12/5.12.10/)

:::tip[Qt 多版本切換]

以上Qt版本可以擇一安裝, 若是安裝多個版本, 需要注意不同版本共用設定目錄, 必須在更換版本前手動備份

`Linux:  ~/.config/QtProject`
`Windows:  %appdata%/QtProject `

:::



Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page).
