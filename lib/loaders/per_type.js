import gravity from '../apis/gravity';
import positron from '../apis/positron';
import { toKey } from '../helpers';
import httpLoader from './http';

// TODO As we’re currently re-using the http loader as it was, it won’t support batching yet.
//      We should rework that once we’ve changed all resolve functions to only use per-type loaders.
const apiLoader = (api, path) => {
  const loader = httpLoader(api);
  return (id, params) => {
    const key = toKey(typeof(path) === 'function' ? path(id) : path, params);
    return loader.load(key);
  };
};
const gravityLoader = apiLoader.bind(null, gravity);
const positronLoader = apiLoader.bind(null, positron);

export default () => {
  return {
    articlesLoader: positronLoader('articles'),
    artistLoader: gravityLoader(id => `artist/${id}`),
    artistArtworksLoader: gravityLoader(id => `artist/${id}/artworks`),
    relatedSalesLoader: gravityLoader('related/sales'),
    relatedShowsLoader: gravityLoader('related/shows'),
    relatedMainArtistsLoader: gravityLoader('related/layer/main/artists'),
    relatedContemporaryArtistsLoader: gravityLoader('related/layer/contemporary/artists'),
    partnerArtistsLoader: gravityLoader(id => `artist/${id}/partner_artists`),
    partnerShowImagesLoader: gravityLoader(id => `partner_show/${id}/images`),
  };
};
