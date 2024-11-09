const { slideCombine, combineValues, mapCombinations, smallerChangeFor, closestCombinationAbove } = require("./functions");

test('combinações a partir de um index para frente', () => {
  const values = [1, 2, 3, 4, 5];
  // slideCombine(values).forEach((v) => console.log(v));
  expect(slideCombine(values)).toEqual([
    [1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 2, 3],
    [1, 2, 4],
    [1, 2, 5],
    [1, 2, 3, 4],
    [1, 2, 3, 5],
    [1, 2, 3 , 4 , 5]
  ]);
});

test("retorna todas as combinações possíveis", () => {
  const values = [1, 2, 3, 4];

  expect(combineValues(values)).toEqual([
    [1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 2, 3],
    [1, 2, 4],
    [1, 2, 3, 4],
    [2],
    [2, 3],
    [2, 4],
    [2, 3, 4],
    [3],
    [3, 4],
    [4]
  ])
});

test('transforma as combinações em objetos com sua soma', () => {
  const values = [1, 2, 3, 4];
  expect(mapCombinations(combineValues(values))).toEqual([
    {
      values: [1],
      sum: 1,
    },
    {
      values: [1, 2],
      sum: 3,
    },
    {
      values: [1, 3],
      sum: 4,
    },
    {
      values: [1, 4],
      sum: 5,
    },
    {
      values: [1, 2, 3],
      sum: 6,
    },
    {
      values: [1, 2, 4],
      sum: 7,
    },
    {
      values: [1, 2, 3, 4],
      sum: 10,
    },
    {
      values: [2],
      sum: 2,
    },
    {
      values: [2, 3],
      sum: 5,
    },
    {
      values: [2, 4],
      sum: 6,
    },
    {
      values: [2, 3, 4],
      sum: 9,
    },
    {
      values: [3],
      sum: 3,
    },
    {
      values: [3, 4],
      sum: 7,
    },
    {
      values: [4],
      sum: 4,
    },
  ])
});

describe('encontra a combinação com menor troco', () => {
  test('para valor exato', () => {
    const values = [1, 2, 3, 4];
    const combinations = mapCombinations(combineValues(values));
    const best = smallerChangeFor(combinations, 4);
    expect(best).toEqual([
      {
        values: [1, 3],
        sum: 4
      },
      {
        values: [4],
        sum: 4
      }
    ],)
  });

  test('para valor maior', () => {
    const values = [1, 2, 3, 4];
    const combinations = mapCombinations(combineValues(values));
    const best = smallerChangeFor(combinations, 11);
    expect(best).toEqual([
      {
        values: [1, 2, 3, 4],
        sum: 10
      },
    ],)
  })

  test('para valor fracionado menor', () => {
    const values = [1, 2, 3, 4];
    const combinations = mapCombinations(combineValues(values));
    const best = smallerChangeFor(combinations, 3.5);
    expect(best).toEqual([
      {
        values: [1, 2],
        sum: 3
      },
      {
        values: [3],
        sum: 3
      },
    ],)
  })
});

describe('encontra a combinação com menor complemento', () => {
  test('para valor exato', () => {
    const values = [1, 2, 3, 4];
    const combinations = mapCombinations(combineValues(values));
    const best = closestCombinationAbove(combinations, 4);
    expect(best).toEqual([
      {
        values: [1, 3],
        sum: 4
      },
      {
        values: [4],
        sum: 4
      }
    ],)
  });

  test('para valor menor', () => {
    const values = [1, 2, 3, 4];
    const combinations = mapCombinations(combineValues(values));
    const best = closestCombinationAbove(combinations, 3);
    expect(best).toEqual([
      {
        values: [1, 2],
        sum: 3
      },
      {
        values: [3],
        sum: 3
      },
    ],)
  })

  test('para valor fracionado menor', () => {
    const values = [1, 2, 3, 4];
    const combinations = mapCombinations(combineValues(values));
    const best = closestCombinationAbove(combinations, 2.99);
    expect(best).toEqual([
      {
        values: [1, 2],
        sum: 3
      },
      {
        values: [3],
        sum: 3
      },
    ],)
  })
})
