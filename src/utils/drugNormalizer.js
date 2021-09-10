export const normalizeDrugList = (drugList) => {
  return drugList.reduce((acc, val) => {
    acc.drugs[val.id] = {
      id: val.id,
      name: val.name,
      prices: val.prices.map(price => price.id) 
    };
      for (let price of val.prices ) {
        acc.prices[price.id] = price;
      }
      return acc;
    },
    { drugs: {}, prices: {} });
}
