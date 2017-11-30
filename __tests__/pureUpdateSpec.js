import pureUpdate from "../src/util/pure";

describe('pureUpdate test', () => {
  it ('', () => {
    expect(pureUpdate.call({
      props: {
        id: 10
      },
      state: {
        text: 'hhh'
      },
      context: {
        active: true
      }
    }, { id: 10 }, { text: 'hhh' }, { active: true })).toEqual(false);
  });

  it ('', () => {
    expect(pureUpdate.call({
      state: {
        id: 10
      }
    }, undefined, { id: 11 })).toEqual(true);
  });

  it ('', () => {
    expect(pureUpdate.call({
      props: {
        arr: []
      }
    }, { arr: [] })).toEqual(false);
  });
});