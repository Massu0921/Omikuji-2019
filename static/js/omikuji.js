const elArrow = document.querySelector('#arrow img');

// DeviceMotion Event
window.addEventListener('devicemotion', deviceMotionHandler);

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

// 加速度が変化
function deviceMotionHandler(event) {

  // 加速度
  // X軸
  const x = event.acceleration.x;
  // Y軸
  const y = event.acceleration.y;
  // Z軸
  const z = event.acceleration.z;

  const bound = 7;
  if (x > bound) { // 右
    elArrow.style.transform = 'rotate(90deg)';
  }
  else if (x < -bound) { // 左
    elArrow.style.transform = 'rotate(-90deg)';
  }
  else if (y > bound) { // 上
    elArrow.style.transform = 'rotate(0deg)';
    cnt++;
    sendjson(cnt);
  }
  else if (y < -bound) { // 下
    elArrow.style.transform = 'rotate(180deg)';
    cnt++;
    sendjson(cnt);
  }
  //console.log(cnt)
}