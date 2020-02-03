var fs = require("fs");
var file_num = 1;//撮影された画像ファイルの枚数カウンタ

function start(response) {
  console.log("Request handler 'start' was called.");

  fs.readFile('./index.html', 'utf-8', doReard);

  function doReard(err, data) {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(data);
          response.end();
      }
}


function show(response) {//必要ないので無視して大丈夫です
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      //response.writeHead(200, {"Content-Type": "image/jpeg"});
      response.write(file, "binary");
      response.end();
    }
  });
}


function upload(response,request) {//POSTされたbase64データを画像として保存

  console.log("Request handler 'upload' was called.");

  var base = '';//POSTしたblobのURLを格納する変数
  var tmp = '';

  if (request.method == 'POST') {

      request.on('data', function(chunk) {

          tmp += chunk;//Buffer型オブジェクトのchunkをtmpにいったん格納

      });

    request.on('end', function() {

      //console.log("POST処理終了");

    var string = tmp.toString('utf-8', 0, tmp.length);//Buffer型をstringに変換
    var count = 0;


    for(var i = 0;i < string.length;i++){//postしたFormdataのURL部分のみを切り出すループ

      if((string[i] == "d") && (string[i+1] == "a") && (string[i+2] == "t") && (string[i+3] == "a") && (string[i+4] == ":") && (string[i+5] == "i")){

        while(string.length > i){

          base += string[i];

          if((string[i] == "\r\n") || (string[i] == "\n"))
          break;

          i++;
        }

        count++;//URLが切り出されたらカウント

      }

      if(count == 1)
      break;
    }

    var base64Data = base.replace(/^data:image\/jpeg;base64,/, "");//文字列置換を行わないと保存ファイルが開けない

    fs.writeFile('./tmp/saved' + file_num + '.jpeg', base64Data, 'base64',(err) => {

      if (err) throw err;
      //console.log('正常に書き込みが完了しました');
      file_num++;
    });

  });

  }

  response.end();
}


exports.start = start;
exports.upload = upload;
exports.show = show;
