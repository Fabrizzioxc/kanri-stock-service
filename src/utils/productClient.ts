import axios from 'axios';

const PRODUCT_SERVICE_URL = 'http://localhost:3001'; // Ajusta si usas Docker

export const getProductStock = async (productId: string): Promise<number> => {
  const res = await axios.get<{ stock: number }>(`${PRODUCT_SERVICE_URL}/products/${productId}`);
  return res.data.stock;
};

export const incrementProductStock = async (productId: string, quantity: number) => {
  await axios.patch(`${PRODUCT_SERVICE_URL}/products/${productId}/increment`, { quantity });
};

export const decrementProductStock = async (productId: string, quantity: number) => {
  await axios.patch(`${PRODUCT_SERVICE_URL}/products/${productId}/decrement`, { quantity });
};

// ✅ Nueva función: validar existencia del producto
export const checkProductExists = async (productId: string): Promise<boolean> => {
  try {
    await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
    return true;
  } catch (error: any) {
    if (error.response?.status === 404) return false;
    throw new Error('Error al verificar producto: ' + error.message);
  }
};
