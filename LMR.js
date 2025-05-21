
    const totalInput = document.getElementById("total");
    const manInput = document.getElementById("man");
    const femaleInput = document.getElementById("female");
    const leftInput = document.getElementById("left");
    const middleInput = document.getElementById("middle");
    const rightInput = document.getElementById("right");
    const error = document.getElementById("error");
    const number = document.getElementById("number");
    const shareArray = [];

    //合計が入ったら計算を行う
    totalInput.addEventListener("input", function () {
      const total = parseInt(totalInput.value, 10);

      //totalが空でなければ
      if (!isNaN(total)) {
        const man = Math.round(total / 2);
        const female = total - man;

        manInput.value = man;
        femaleInput.value = female;

        //レフト、ミドル、ライトの数を入力
        const lmr = Math.trunc(total / 3);
        leftInput.value = lmr;
        middleInput.value = lmr;
        rightInput.value = lmr;
        number.textContent = `　数(L+M+R)：${lmr*3}`;

      } else {
        manInput.value = '';
        femaleInput.value = '';
        leftInput.value = '';
        middleInput.value = '';
        rightInput.value = '';
      }
    });
 

      // 男子人数変更 → 女子 = 合計 - 男子
      manInput.addEventListener("input", function () {
        const total = parseInt(totalInput.value, 10);
        const man = parseInt(manInput.value, 10);

        if (!isNaN(total) && !isNaN(man)) {
          const female = total - man;
          femaleInput.value = female >= 0 ? female : 0;
        } else {
          femaleInput.value = '';
        }
      });

        function updateNumberDisplay() {
  const left = Number(leftInput.value);
  const middle = Number(middleInput.value);
  const right = Number(rightInput.value);
  const sum = left + middle + right;
  number.textContent = `　数(L+M+R)： ${sum}`;
}

// 各入力にイベントを追加
leftInput.addEventListener("input", updateNumberDisplay);
middleInput.addEventListener("input", updateNumberDisplay);
rightInput.addEventListener("input", updateNumberDisplay);



       // フォームの送信処理
    document.getElementById('positionForm').addEventListener('submit', function(event) {
      event.preventDefault(); // フォームの送信を防ぐ（ページリロードを防止）

// 入力値取得
    const total = Number(totalInput.value);
    const left = Number(leftInput.value);
    const middle = Number(middleInput.value);
    const right = Number(rightInput.value);

      if(total !== (left+middle+right)){
        error.textContent = '合計と数字が合いません。';
        return;
      }

      //エラーをクリア
      error.textContent ='';
     
// 変更後（これが必要）
sessionStorage.setItem('total', total);
sessionStorage.setItem('left', left);
sessionStorage.setItem('middle', middle);
sessionStorage.setItem('right', right);


  // part.htmlへ遷移
  window.location.href = 'part.html';

    });
