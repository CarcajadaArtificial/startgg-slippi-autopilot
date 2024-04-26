import { type Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  /**
    This endpoint is a POST method that receives set data and updates the live startgg set.

    @returns 
      The set report confirmation object.
   */
  async POST(req, ctx) {
    await console.log('api/startgg/updateSet', req, ctx);
    return new Response('api/startgg/updateSet');
  },
};
