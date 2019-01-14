# aed-map

WAEDオープンデータAPIとNuxt.js、Leafletを使用したAEDマップです。

## 使用言語・ライブラリ

- AEDオープンデータAPI http://hatsunejournal.jp/w8/AEDOpendata/
- Nuxt.js(Vue.js)
- Vuetify
- vue2-leaflet

## 環境構築アプリケーション

- Docker
- Docker Compose
- direnv
- git

## セットアップ

```shell
$ git clone git@github.com:greendrop/aed-map.git
$ cd aed-map
$ vi .envrc
$ direnv allow
$ cp .env.example .env
$ docker-compose pull
$ docker-compose build
$ docker-compose run --rm front bash
$ yarn install
$ exit
$ docker-compose up
```

### .envrc

```
export USER_ID=`id -u`
export GROUP_ID=`id -g`
```

### .env

APIのURL
以下URLにはレスポンスヘッダーに`Access-Control-Allow-Origin`が設定されていないため、localhost以外ではAPIを中継してレスポンスヘッダーを設定するものを用意

Netlify Lambdaの使用例 https://github.com/greendrop/netlify-lambda-aed

```
API_URL=https://aed.azure-mobile.net/api/AEDSearch
```

## ブラウザで表示

http://localhost:3000
