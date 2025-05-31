  // データ取得
  
  const total = Number(sessionStorage.getItem('total') || '0');
  const result = JSON.parse(sessionStorage.getItem('result') || '[]');
  const resultGender = JSON.parse(sessionStorage.getItem('resultGender') || '[]');
  const leftCount = parseInt(sessionStorage.getItem('left') || '0');
  const middleCount = parseInt(sessionStorage.getItem('middle') || '0');
  const rightCount = parseInt(sessionStorage.getItem('right') || '0'); 
  const position = JSON.parse(sessionStorage.getItem('position') || '[]');

  // ポジションごとの配列に分ける
const left = result.slice(0, leftCount);
const left_gen = resultGender.slice(0, leftCount);
const left_posi = position.slice(0, leftCount);

const middle = result.slice(leftCount, leftCount + middleCount);
const middle_gen = resultGender.slice(leftCount, leftCount + middleCount);
const middle_posi = position.slice(leftCount, leftCount + middleCount);

const rightStart = leftCount + middleCount;
const rightEnd = rightCount >= 2 ? rightStart + rightCount - 2 : rightStart;

const setterStart = rightEnd;
const setterEnd = rightStart + rightCount;

const right = result.slice(rightStart, rightEnd);
const right_gen = resultGender.slice(rightStart, rightEnd);
const right_posi = position.slice(rightStart, rightEnd);

const setter = result.slice(setterStart, setterEnd);
const setter_gen = resultGender.slice(setterStart, setterEnd);
const setter_posi = position.slice(setterStart, setterEnd);

  let A = [];
  let B = [];
 

function splitTeam(positionNameArray, genderArray, positionArray) {
  const a = [];
  const b = [];

  
  for (let i = positionNameArray.length; i > 0; i--) {
    const name = positionNameArray[i - 1];
    const gender = genderArray[i - 1];
    const position = positionArray[i - 1];

    // 性別が女性なら赤文字に
    const displayName = gender === '2'
      ? `<span style="color:red">${name}</span>`
      : name;

    const j = Math.floor(Math.random() * 2);
    if (j === 0) {
      a.push(`${displayName}:${position}`);
    } else {
      b.push(`${displayName}:${position}`);
    }
  }


  if (Math.abs(a.length - b.length) <= 1) {
    A.push(...a);
    B.push(...b);
  } else {
    splitTeam(positionNameArray, genderArray, positionArray); // 再帰呼び出し時も genderArray を渡す必要あり
  }
}
  

  function decide(){
  // 各ポジションを分ける
  splitTeam(left,left_gen,left_posi);
  splitTeam(middle,middle_gen,middle_posi);
  splitTeam(right,right_gen,right_posi);
  splitTeam(setter,setter_gen,setter_posi);

  if(Math.abs(A.length-B.length) <=1){
      
    }else{
      A = [];
      B = [];
      decide();
    }

  }

  decide();
  
  // チームA表示
  const teamADiv = document.getElementById("teamA");
  A.forEach(member => {
    const p = document.createElement("p");
    p.innerHTML = member;
    teamADiv.appendChild(p);
  });

  // チームB表示
  const teamBDiv = document.getElementById("teamB");
  B.forEach(member => {
    const p = document.createElement("p");
    p.innerHTML = member;
    teamBDiv.appendChild(p);
  });
