import { Middleware, PlatformRequest, Req } from '@tsed/common';
import _ from 'lodash';


/**
 * Parse any number-like query into number
 */
@Middleware()
export default class ParseNumberMiddleware {
  use(@Req() req: PlatformRequest): void {
    if (req.query) {
      const parsedQuery = _.mapValues(req.query, v => {
        const parsed = _.toNumber(v);
        if (_.isNaN(parsed)) return v;
        return parsed;
      });

      Object.assign(req.query, parsedQuery);
    }
  }
}
