<h1>我的餐廳清單 </h1>

<span>這個專案主在建構呈現美食清單、搜尋、閱覽餐廳詳細資訊(地址、電話、餐廳介紹)。</span>

<h2>功能列表</h2>

```bash
有基本的 C R U D
```
<li>餐廳清單上有基本的資訊</li>
<li>搜尋可依餐廳名字或是餐廳類別作搜尋</li>
<li>可增加自己喜歡的餐廳</li>
<li>清單上增加檢視詳細資訊、編輯、刪除</li>
<li>增加mongoDB資料庫來儲存使用者資料</li>

<h2>安裝</h2>
<span>1.開啟終端機，輸入以下的指令並執行</span>

```bash
git clone https://github.com/ioiowax2020/Menu.git
```

<span>2.安裝相關專案工具</span>
```bash
cd menu-List //切換到專案的資料夾
```
```bash
npm install //安裝相關套件（express,nodemon,exeress-handlebars,body-parser,mongoose)
```

<span>3.安裝好後，終端機輸入</span>
```bash
nodemon app.js //可開啟此專案
```
```bash
npm run seed //可載入種子資料
```

<h2>環境建置與需求</h2>
<li>Visual Studio Code 2 -開發環境</li>
<li>Express ^4.17.1 - 應用程式架構</li>
<li>Express-handlebars ^5.3.0 - 模板引擎</li>
<li>MongoDB </li>
<li>RoBo 3T 圖形介面 - 查看資料庫內容</li>
