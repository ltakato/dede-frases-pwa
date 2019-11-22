import { http } from './http';

const quotesService = () => {
  const resource = 'frases';
  const getAll = () => http.get(resource);
  const create = body => http.post(resource, body);

  return { getAll, create };
};

export default quotesService();
