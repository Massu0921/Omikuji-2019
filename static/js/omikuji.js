const omikuji_img = document.querySelector('#omikuji img');

// 加速度変化を監視
window.addEventListener('devicemotion', motion);

// カウント用
var cnt = 0;
var cnt_old = 0;
const cntmax = 128;

// json送信
function sendjson(cnt){
  var json = {
    cnt: cnt
  };

  $.ajax({
    url: '/send',
    type: 'post',
    data: JSON.stringify(json),
    contentType: 'application/JSON',
    dataType: 'JSON'
  });
}

// 加速度変化時
function motion(event) {

  // 加速度取得
  const x = event.acceleration.x;
  const y = event.acceleration.y;
  const z = event.acceleration.z;

  const bound = 7;
  // 上下のみカウント
  if (x > bound) { // 右
    omikuji_img.style.transform = 'rotate(90deg)';
  }
  else if (x < -bound) { // 左
    omikuji_img.style.transform = 'rotate(-90deg)';
  }
  else if (y > bound) { // 上
    omikuji_img.style.transform = 'rotate(0deg)';
    cnt++;
    sendjson(cnt);
  }
  else if (y < -bound) { // 下
    omikuji_img.style.transform = 'rotate(180deg)';
    cnt++;
    sendjson(cnt);
  }
  //console.log(cnt)
}