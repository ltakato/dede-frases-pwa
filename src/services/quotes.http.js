import { http } from './http';

const quotesService = () => {
  const resource = 'frases';
  const getAll = () => http.get(resource);
  
  return { getAll };
};

export default quotesService(); 