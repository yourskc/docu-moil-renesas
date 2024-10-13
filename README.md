# Website

本網站以 [Docusaurus](https://docusaurus.io/) 建立.
可以在 Ubuntu 22.04 下或是在 Windows 11 下編修網站內容.

本網站


### 安裝

```
$ git clone https://github.com/yourskc/docu-moil-renesas.git

$ npm install
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

or

```
$ npm run serve
```

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.


### Deploy

將 /build 目錄 copy 或 上傳到網站即可

目前的設定是放在網站的 docu-moil-renesas 目錄下

所以從外面用瀏覽器連線網址為 http://ip/docu-moil-renesas

### Markdown

- 本教學網站支援中英文切換, 英文版本文件都放在 /docs 目錄下

- 對應的中文版本文件放在  i18n/zh/docusaurus-plugin-content-docs/current 目錄下, 檔名與英文版本相同

- Markdown 文件所用到的圖檔或其他附加檔案, 放在 /static 目錄下, 在文件中有兩種方式引用, 例如把圖檔 image.png 放在 /static/img/ 目錄下, 第二種 Html 方式可以指定圖片顯示大小, 但必須在前面加上 baseUrl ( 在 docusaurus.config.js 中定義 )

```
![img](/img/image.png)

<img src="/docu-moil-renesas/img/image.png" width="800px">
```

