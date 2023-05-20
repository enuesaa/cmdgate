export const use = () => {
  let state = 0;

  return {
    state: () => { return state },
    add: () => { state++; },
  }
}

const a = use();
a.add()
console.log(a.state());

// see https://qiita.com/takeharu/items/4975031faf6f7baf077a

