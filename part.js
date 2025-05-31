    const total = Number(sessionStorage.getItem('total') || '0');
    const pepleNumber = document.getElementById('peple');
    const number = document.getElementById('number');
    const form = document.getElementById('add');
    const memberInput = document.getElementById('member');
    const receive = document.getElementById("receive");
    const tosu = document.getElementById("tosu");

    let current = 1;

    // ポジションの初期値表示
    const position = [];
    const result = [];
    const resultGender = [];
    

    const left = Number(sessionStorage.getItem('left') || '0');
    const middle = Number(sessionStorage.getItem('middle') || '0');
    const right = Number(sessionStorage.getItem('right') || '0');
    const ribelo = Number(sessionStorage.getItem('ribelo') || '0');

    create(left, 'レフト');
    create(middle, 'ミドル');
    if(right < 2){
      create(right,'セッター');
    }else{
      create(right-2, 'ライト');
      create(2,'セッター');
    }
    create(ribelo,'リベロ');
    

    number.textContent = `${current}人目：` + `${position[current - 1]}`;
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // フォームの送信を防ぐ

      const name = memberInput.value;
      const gender = form.querySelector('input[name="gender"]:checked');

      if (!name || !gender) {
        alert("*の項目を入力してください。");
        return;
      }

      // 「◯人目」の表示
      const p = document.createElement('p');
      p.textContent = `${current}人目：${name} (${position[current - 1]})`;
      // 女性（value が '2'）なら文字を赤に
      if (gender.value === '2') {
      p.style.color = 'red';
      }
      pepleNumber.appendChild(p);

      result.push(name);
      resultGender.push(gender.value);
      

      // 次の人へ
      current++;
      number.textContent = `${current}人目：` + `${position[current - 1]}`;
      memberInput.value ='';

        // 選ばれた<option>を非表示にする
      const selectedOption = memberInput.querySelector(`option[value="${name}"]`);
      if (selectedOption) {
      selectedOption.hidden = true;
      }

      // 指定人数を超えたら入力を終了
      if (current > total) {
        // part.htmlへ遷移
        if (current > total) {
          sessionStorage.setItem('result', JSON.stringify(result));
          sessionStorage.setItem('resultGender', JSON.stringify(resultGender));
          sessionStorage.setItem('position',JSON.stringify(position));
          sessionStorage.setItem('total',total);
          if(ribelo < 1){
            window.location.href = 'result.html';
          }else{
            window.location.href = 'result_Libero.html';

          }
          
        }

      }
    });






    function create(count, moji) {
      for (let i = 1; i <= count; i++) {
        position.push(moji);
      }
    }

