/**
 * Dado o vetor values = [1, 2, 3, 4] fará todas as
 * combinações possíveis com slideCombine, para cada
 * valor do vetor.
 * @param {number[]} values
 * @param {number[]} result
 * @returns
 */
function combineValues(values = [], result = []) {
  if (values.length === 0) {
    return result;
  }

  result = result.concat(slideCombine(values));
  return combineValues(values.slice(1), result);
}
/**
 * Dado o vetor de valores values = [1, 2, 3, 4], a função
 * fará combinações do 1 com o 2, 3 e 4. Então,
 * recursivamente fará combinações do [1, 2] com o 3 e o 4,
 * do [1, 3] com o 4 e assim por diante.
 * @param {number[]} values
 * @param {number[]} result
 * @param {number} index
 * @returns
 */
function slideCombine(values = [], result = [], index = 0) {
  const length = values.length;
  if (index === length) {
    return result;
  }

  const base = values.slice(0, index + 1);
  if (index === 0) {
    result.push(base);
  }
  for (let i = index + 1; i < length; i++) {
    const tmp = base.concat(values[i]);
    result = result.concat([tmp])
  }

  return slideCombine(values, result, index + 1);
}

function mapCombinations(combinations = []) {
  return combinations.map(
    (values) => {
      return {
        values,
        sum: values.reduce(
          (r, value) => r + value, 0
        )
      }
    }
  );
}

function smallerChangeFor(combinations = [], value = 0) {
  let closestValueCombinations = combinations.reduce(
    (r, combination) => combination.sum > value
     ? r
     : r.concat(combination), []
  );

  let result = [];
  let smallerDiff = value;

  for(let i = 0; i < closestValueCombinations.length; i++) {
    const item = closestValueCombinations[i];
    const diff = value - item.sum;
    if (diff < smallerDiff) {
      result = [ item ];
      smallerDiff = diff;
      continue;
    }

    if (diff === smallerDiff) {
      result.push(item);
    }
  }

  return result;
}

function closestCombinationAbove(combinations = [], value = 0) {
  let combinationsGreateThan = combinations.reduce(
    (r, combination) => combination.sum >= value
     ? r.concat(combination)
     : r, []
  );

  let result = [];
  let smallerDiff = value;

  for(let i = 0; i < combinationsGreateThan.length; i++) {
    const item = combinationsGreateThan[i];
    const diff = item.sum - value;
    if (diff < smallerDiff) {
      result = [ item ];
      smallerDiff = diff;
      continue;
    }

    if (diff === smallerDiff) {
      result.push(item);
    }
  }

  return result;
}

module.exports = {
  combineValues,
  mapCombinations,
  slideCombine,
  smallerChangeFor,
  closestCombinationAbove
}
