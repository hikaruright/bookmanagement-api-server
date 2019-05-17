# BookManagement向け APIサーバー

## はじめに

このプロジェクトは、社内学習用に用意したAPIサーバです。

### 使用技術

- サーバ：Node.js

- データベース：NeDB

- Webフレームワーク：express

## 利用手順

### Node.jsのインストール

Node.jsがインストールされていない場合、
インストールを行なってください。
Angularなどの学習を行なっている場合、この手順は不要です。

#### Windowsの場合

以下のサイトから最新版をダウンロードします。

[Node.js Official Site](https://nodejs.org/ja/)

#### Macの場合

ターミナルから以下のコマンドを実行します

```shell
$ brew install node
```

ここでは割愛しますが、バージョン管理などをしっかりしたい方はnodebrewなどの導入を検討してください。

### リポジトリをクローンする

このリポジトリをGitクライアントを利用してクローンします。
<br>
Gitの使い方については割愛します。

### ターミナルを開き、クローンしたリポジトリに移動する

```
$ cd <<クローンを行なったカレントディレクトリ>>
$ cd bookmanagement-api-server
```

### 必要なnode用パッケージをインストールする

```
$ npm install
```

## 実行する

npm installを行なったディレクトリ内で以下のコマンドを実行します。

```
$ npm start
```

### 実行確認

ブラウザで以下にアクセスします。

[http://localhost:4300/create](http://localhost:4300/create)

以下のようなJSONファイルを表示したら、
起動は完了です。

```json
[{"id":"sample","password":"password","fullname":"佐藤太郎","department":"1001","_id":"kxVWU7hVtpoTs49Q"}]
```

このユーザが初期ユーザですので、このidとpasswordを使用してログインします。