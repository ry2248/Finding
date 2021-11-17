const APPLICATION_KEY = "6cb1375d895d639274094e83f0d938f60cd7cefd7384fa1519499c92ac4b1bf3";
const CLIENT_KEY = "708019a2c6032cfa269b2a99470fa679176298e5d8244e6dc1397251be41c566";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "GameClass";

  let GameClass = ncmb.DataStore(DBName);

let timer = null;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random() * q.length);

  for(let i=0;i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num" + i);
    s.addEventListener("click", function(){
      if(this.textContent == q[qNum][1]){
        // alert("正解");
        correct.play();

        Max++;
        if(Max==4){
          alert("クリアです.あなたはクリアするまで、" + timer + "秒かかりました");
          save();
          load();
          stop();
        }

        while(cells.firstChild ){
          cells.removeChild(cells. firstChild);
        }
        gameStart();
      }else{
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size == size - 1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
}
    let p = Math.floor(Math.random() * size * size);
    let ans = document.getElementById("num" + p);
    ans.textContent = q[qNum][1];

}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime()-start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()",1000);
}

function stop(){
  clearTimeout(timer);
}

function save(){
  let test = new GameClass();
  let key = "score";
  let value = timer;


  test.set(key, parseInt(value));
  test.save()
  .then(function(){
  console.log("成功");
})
  .catch(function(err){
  console.log("エラー発生:" + err);
  });
}

function load(){
  GameClass
  .order("score")
  .fetchAll()
  .then(function(results){
    if(timer<results[0].score){
      alert("ハイスコア");
    }else{
      alert("クリア");
    }
  })
  .catch(function(err){
    console.log("エラー発生："+ err);
  })

}
