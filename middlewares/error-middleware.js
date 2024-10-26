/* eslint-disable */
import ApiError from '../exceptions/api-error.js';

export default function (err, req, res, next) {
  console.log('error-middleware', err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: req.t('ERROR.SERVER') });
}
