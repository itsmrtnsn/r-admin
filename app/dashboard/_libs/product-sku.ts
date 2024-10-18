const generateUniqueSKU = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_=+{/!$';
  const length = 16; // Fixed length of 10
  let sku = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters[randomIndex];
  }

  return sku;
};

export default generateUniqueSKU;
