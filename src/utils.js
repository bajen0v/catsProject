export const printNumerals = (number, arr) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return arr[2];
    }
    n %= 10;
    if (n === 1) {
      return arr[0];
    }
    if (n >= 2 && n <= 4) {
      return arr[1];
    }
    return arr[2];
  }

  export function generateRate(rate) {
    const catRate = []
    for(let i = 1; i <= 10; i++) {
        if(i <= rate){
            catRate.push('<i class="fa-solid fa-star"></i>')
        } else if (i === Math.ceil(rate)) {
            catRate.push('<i class="fa-solid fa-star-half-stroke"></i>')
        } else {
            catRate.push('<i class="fa-regular fa-star"></i>')
        }
    }
    return catRate.join('')
  }