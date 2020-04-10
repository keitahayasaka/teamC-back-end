# teamC-back-end

●index.html
・upserver関数:カメラ画像からbase64エンコードされたデータを取得.
・sendblob関数:formDataにbase64をappendしてAjaxで送信.

●requestHandler.js
・upload関数:sendblob関数でポストが実行されると,ポストされたformdataの内容からbase64の中身だけを変数に入れて.tempフォルダにjpeg形式で保存.
複数回撮影された場合は,一応撮影した回数をファイル名に加えて別ファイルとして保存してます.

