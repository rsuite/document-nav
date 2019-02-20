const fs = require('fs');

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;
let article = '';

const randomBoolean = (p = 0.5) => Math.random() <= p;

const getH = (level = 1) =>
  Array(level)
    .fill('#')
    .join('');

const addTitle = (index, level, parentTitle, p) => {
  if (index > 10 || level > 6) {
    return;
  }
  const title = parentTitle ? `${parentTitle}-${index}` : index;
  if (randomBoolean(p)) {
    article = `${article}

${getH(level)} Title ${title}

${lorem}`;

    // 子级
    addTitle(1, level + 1, title);

    // 兄弟
    if (parentTitle) {
      addTitle(index + 1, level, parentTitle);
    }
  }
};

for (let i = 1; i <= 10; i++) {
  addTitle(i, 2, '', 1);
}

fs.writeFileSync(`${__dirname}//md/demo.md`, article);
