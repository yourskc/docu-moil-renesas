# 文件網站架設

本網站以 [Docusaurus](https://docusaurus.io/) 建立.
可以在 Ubuntu 22.04 下或是在 Windows 11 下編修網站內容.

本網站發布於以下位址 :

http://140.112.12.82/docu-moil-renesas


### 安裝

```
$ git clone https://github.com/yourskc/docu-moil-renesas.git

$ npm install
```

### 本機開發環境

```
$ npm run serve
```

將開啟 Chrome 瀏覽器於以下位址 : 

http://localhost:3000/docu-moil-renesas/

### 編譯 ( Build )

```
$ npm run build
```

產生網站內容到 /build 目錄


### 發布 ( Deploy )

將 /build 目錄 copy 或 上傳到網站即可

目前的設定是發布於網站的 /docu-moil-renesas 目錄下

例如發布到 http://140.112.12.82

從外面用瀏覽器連線網址為 http://140.112.12.82/docu-moil-renesas

### Markdown

- 本教學網站支援中英文切換, 英文版本文件都放在 /docs 目錄下

- 對應的中文版本文件放在  i18n/zh/docusaurus-plugin-content-docs/current 目錄下, 檔名與英文版本相同

- Markdown 文件所用到的圖檔或其他附加檔案, 放在 /static 目錄下, 在文件中有兩種方式引用, 例如把圖檔 image.png 放在 /static/img/ 目錄下, 第二種 Html 方式可以指定圖片顯示大小, 但必須在前面加上 baseUrl ( 在 docusaurus.config.js 中定義 )

**標題**

```
#   大標題
##  中標題
### 小標題
```

**粗體**

\*\*XXX\*\*

**斜體**

\*X\*

or

\_X\_

**程式段落**

\```

Program 

\```

**圖片**

```
![img](/img/image.png)

or

<img src="/docu-moil-renesas/img/image.png" width="800" />
```

**Youtube影片**

```
[![Demo](https://img.youtube.com/vi/xxxxxx/0.jpg)](https://www.youtube.com/watch?v=xxxxxx)
```

**Markdown 線上編輯測試**

https://stackedit.io/app#
