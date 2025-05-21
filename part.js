    const total = Number(sessionStorage.getItem('total') || '0');
    const pepleNumber = document.getElementById('peple');
    const number = document.getElementById('number');
    const form = document.getElementById('add');
    const memberInput = document.getElementById('member');

    let current = 1;

    // ポジションの初期値表示
    const position = [];
    const result = [];
    const resultGender = [];

    const left = sessionStorage.getItem('left') || '0';
    const middle = sessionStorage.getItem('middle') || '0';
    const right = sessionStorage.getItem('right') || '0';

    create(left, 'レフト');
    create(middle, 'ミドル');
    create(right, 'ライト');

    number.textContent = `${current}人目：` + `${position[current - 1]}`;
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // フォームの送信を防ぐ

      const name = memberInput.value;
      const gender = form.querySelector('input[name="gender"]:checked');

      if (!name || !gender) {
        alert("すべての項目を入力してください。");
        return;
      }

      // 「◯人目」の表示
      const p = document.createElement('p');
      p.textContent = `${current}人目：${name} (${gender.value === '1' ? '男性' : '女性'})`;
      pepleNumber.appendChild(p);

      result.push(name);
      resultGender.push(gender);

      // 次の人へ
      current++;
      number.textContent = `${current}人目：` + `${position[current - 1]}`;
      memberInput.value ='';

      // 指定人数を超えたら入力を終了
      if (current > total) {
        // part.htmlへ遷移
        if (current > total) {
          sessionStorage.setItem('result', JSON.stringify(result));
          sessionStorage.setItem('resultGender', JSON.stringify(resultGender));
          sessionStorage.setItem('position',JSON.stringify(position))
          window.location.href = 'result.html';
        }

      }
    });






    function create(count, moji) {
      for (let i = 1; i <= count; i++) {
        position.push(moji);
      }
    }

    console.log(position);
